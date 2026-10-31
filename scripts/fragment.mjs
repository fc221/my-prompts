#!/usr/bin/env node
// 把 dist/index.html 转成发布用的片段 dist/artifact.html：去掉文档骨架标签（发布平台会自动包一层），其余原样保留。
// 用法：npm run artifact（先打包再转换）
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
let html = readFileSync(join(dist, 'index.html'), 'utf8');
for (const re of [
  /<!doctype html>\s*/i,
  /<html[^>]*>\s*/i,
  /<\/html>\s*/i,
  /<head>\s*/i,
  /<\/head>\s*/i,
  /<body>\s*/i,
  /<\/body>\s*/i,
  /<meta charset="utf-8"\s*\/?>\s*/i,
  /<meta name="viewport"[^>]*>\s*/i,
])
  html = html.replace(re, '');
writeFileSync(join(dist, 'artifact.html'), html);
console.log(`dist/artifact.html（${(html.length / 1024).toFixed(0)} KB）`);
