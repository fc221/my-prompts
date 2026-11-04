import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { parseDemoHtml, splitExtras } from './src/adapter/content.ts';

// 条目文件（domains/**/<id>.md）按查询拆成三个模块：
//   ?entry  文字部分（去掉示例和示意图）
//   ?demo   “## 示例”→ { html, css, js }：<link> 引入的共用样式读进来，<style> 合成 css，<script type="module"> 的 export default 就是 js(root)，脚本里的 import 按文件位置解析
//   ?wire   “## 示意图”围栏里的代码，原样作为模块（export const wire / wireMobile）
function kbContent(): Plugin {
  return {
    name: 'kb-content',
    enforce: 'pre',
    load(id) {
      const [file, query] = id.split('?');
      if (!file.endsWith('.md') || !['entry', 'demo', 'wire'].includes(query)) return;
      this.addWatchFile(file);
      const { text, demo, wire } = splitExtras(readFileSync(file, 'utf8'));
      if (query === 'entry') return `export default ${JSON.stringify(text)};\n`;
      if (query === 'wire') return wire ?? 'export const wire = undefined;\n';
      if (!demo) return 'export default undefined;\n';
      const { html, css, script } = parseDemoHtml(demo, (href) => {
        const p = resolve(dirname(file), href);
        this.addWatchFile(p);
        return readFileSync(p, 'utf8');
      });
      const code = script ? script.replace(/^export default /m, 'const __js = ') : 'const __js = undefined;';
      return `${code}\nexport default { html: ${JSON.stringify(html)}, css: ${JSON.stringify(css)}, js: __js };\n`;
    },
  };
}

// 打成单个 HTML（JS、CSS 全部内联）：dist/index.html 双击即可打开，也能直接发布
export default defineConfig({
  base: './',
  plugins: [kbContent(), vue(), viteSingleFile()],
  build: { outDir: 'dist', emptyOutDir: true, chunkSizeWarningLimit: 4000 },
});
