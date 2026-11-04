<script setup lang="ts">
// 线性图标，24 网格、1.75 描边。新增图标在 PATHS 里加一项
defineProps<{ name: string; size?: number }>();
const PATHS: Record<string, string> = {
  github:
    'M9 19c-4.3 1.4-4.3-2.5-6-3 M15 22v-3.9c0-1 .1-1.5-.5-2.1 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.3 5.4 2.6 5.4 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.5 1.2-.5 2.1V22',
  layers: 'M12 3 3 8l9 5 9-5-9-5Z M3 13l9 5 9-5 M3 17.5 12 22l9-4.5',
  palette:
    'M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z M7.5 11.5h.01 M10 7.5h.01 M14.5 7.5h.01 M17 11h.01',
  layout: 'M4 4h16v16H4z M4 9h16 M9 9v11',
  code: 'M8.5 7 3.5 12l5 5 M15.5 7l5 5-5 5',
  box: 'M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z M4 7.5l8 4.5 8-4.5 M12 12v9',
  server: 'M4 4h16v6H4z M4 14h16v6H4z M8 7h.01 M8 17h.01 M12 7h4 M12 17h4',
  plug: 'M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-12 0V8Z M12 17v4',
  file: 'M6 3h8l4 4v14H6z M14 3v4h4 M9 13h6 M9 17h6',
  doc: 'M6 3h8l4 4v14H6z M14 3v4h4 M8.5 11l1.2 5 1.3-4 1.3 4 1.2-5',
  table: 'M4 5h16v14H4z M4 10h16 M4 14.5h16 M10 5v14',
  sparkles: 'M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2 2 M16 16l2 2 M18 6l-2 2 M8 16l-2 2',
  pointer: 'M5 3l13 6.5-5.5 1.6L10.8 17 5 3Z M13 11l6 6',
  message: 'M4 5h16v11H9l-5 4V5Z M8 9.5h8 M8 12.5h5',
  checklist: 'M9 6h11 M9 12h11 M9 18h11 M4 6l1 1 2-2 M4 12l1 1 2-2 M4 18l1 1 2-2',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z M20 20l-4-4',
  copy: 'M9 9h11v11H9z M5 15H4V4h11v1',
  plus: 'M12 5v14 M5 12h14',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6 6l12 12 M18 6 6 18',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  monitor: 'M3 4h18v12H3z M8 20h8 M12 16v4',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  stack: 'M4 7h16 M4 12h16 M4 17h10',
  chevron: 'M9 6l6 6-6 6',
  up: 'M6 15l6-6 6 6',
  trash: 'M4 7h16 M10 11v6 M14 11v6 M6 7l1 13h10l1-13 M9 7V4h6v3',
  book: 'M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4Z M5 16a4 4 0 0 1 4-4h10',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 11v5 M12 8h.01',
  expand: 'M15 4h5v5 M9 20H4v-5 M20 4l-6 6 M4 20l6-6',
  sidebar: 'M4 4h16v16H4z M9 4v16 M13.5 10l-2 2 2 2',
  'sidebar-open': 'M4 4h16v16H4z M9 4v16 M12.5 10l2 2-2 2',
};
</script>

<template>
  <svg
    :width="size ?? 18"
    :height="size ?? 18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="PATHS[name] ?? PATHS.box" />
  </svg>
</template>
