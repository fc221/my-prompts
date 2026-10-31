// 内容适配层：内容写在 domains/ 下的 Markdown、HTML 文件里，网页只认 src/types.ts 里摊平后的 Domain。
// 目录约定和解析规则见 ./content.ts；内容里的 TS 文件（示意图 *.wire.ts、_shared/ 工具）从 '#kb' 引类型。
export type { Demo, Domain, Entry, KbEntry, MockKind, Section, Wire, WireBox } from '../types.ts';
export {
  buildDomains,
  ENTRY_SECTIONS,
  parseDemoHtml,
  parseEntry,
  splitExtras,
  splitFrontmatter,
  splitSections,
} from './content.ts';
export type { ContentSource, Meta } from './content.ts';
