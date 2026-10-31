import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { parseDemoHtml } from './src/adapter/content.ts';

// 示例 HTML（domains/**/<id>.html?demo）→ JS 模块 { html, css, js }：
// <link> 引入的共用样式读进来，<style> 合成 css，<script type="module"> 的 export default 就是 js(root)，脚本里的 import 照常按文件位置解析
function kbDemo(): Plugin {
  return {
    name: 'kb-demo',
    enforce: 'pre',
    load(id) {
      const [file, query] = id.split('?');
      if (query !== 'demo' || !file.endsWith('.html')) return;
      this.addWatchFile(file);
      const { html, css, script } = parseDemoHtml(readFileSync(file, 'utf8'), (href) => {
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
  plugins: [kbDemo(), vue(), viteSingleFile()],
  build: { outDir: 'dist', emptyOutDir: true, chunkSizeWarningLimit: 4000 },
});
