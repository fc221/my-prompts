// 文字类条目的示意图（样式在 diagram.css），各领域共用：后端、API、PDF 的示例从 ../../../frontend/_shared/ 引入。
// 每个构造函数返回一段 HTML，draw 把它们放进示例框并缩放到放得下：
//   draw(root, tree(`…`))                      一张图
//   draw(root, [tree(`…`), stack([…])])        并排两张
//   draw(root, page({…}), { title: '版式' })    左上角加一行小标题
// tree 目录树 · stack 分层 · flow 流程 · seq 时序 · rings 同心层 · boxes 模块格 · code / http 报文与代码 · page PDF 页面 · sheet 电子表格

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
const node = (n) => (typeof n === 'string' ? { t: n } : n);
const ico = (d) => `<svg viewBox="0 0 16 16" aria-hidden="true">${d}</svg>`;
const DIR = ico(
  '<path d="M1.5 4.5a1 1 0 0 1 1-1h3.3l1.4 1.5h6.3a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1z" fill="currentColor" opacity=".9"/>',
);
const FILE = ico(
  '<path d="M3.5 1.5h6l3 3v10h-9z M9.5 1.5v3h3" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
);

/** 画进示例框。parts 是一段或几段 HTML（几段时并排）；title 是左上角的小标题；center 让内容垂直居中；min 是最小缩放 */
export function draw(root, parts, { title = '', center = false, min = 0.6 }: any = {}) {
  const host =
    root.querySelector('.dg') || root.appendChild(Object.assign(document.createElement('div'), { className: 'dg' }));
  const list = Array.isArray(parts) ? parts : [parts];
  host.classList.toggle('mid', center);
  host.setAttribute('data-clip', ''); // 缩到下限还放不下时裁掉边缘，测试台不按裁字报错
  host.innerHTML = `<div class="dg-in">${title ? `<p class="dg-t">${esc(title)}</p>` : ''}<div class="dg-row">${list.map((p) => `<div class="dg-col">${p}</div>`).join('')}</div></div>`;
  const inner = host.firstElementChild;
  const fit = () => {
    const cs = getComputedStyle(host);
    const H = host.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const W = host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    host.classList.remove('narrow');
    inner.style.zoom = '1';
    if (W < 400) host.classList.add('narrow');
    for (let i = 0; i < 3; i++) {
      // 缩放后文字会重排，按实际显示尺寸再量两次
      const z = Number(inner.style.zoom) || 1,
        r = inner.getBoundingClientRect();
      const s = z * Math.min(H / r.height, W / Math.max(r.width, inner.scrollWidth * z));
      inner.style.zoom = String(Math.max(min, Math.min(1, s)).toFixed(3));
    }
    host.classList.toggle('more', inner.getBoundingClientRect().height > H + 2); // 缩到下限还放不下：底部渐隐，表示下面还有
    host.classList.toggle('narrow', W < 400); // 卡片宽度：PDF 旁注这类次要内容收起（容器查询会被缩放影响，不用它）
  };
  fit();
  new ResizeObserver(fit).observe(host);
}

/**
 * 目录树：每行一项，缩进 2 个空格一级；名字以 / 结尾是目录；名字后空两格以上写说明。
 * 标重点：“* ”占掉缩进里的两格（下面的 * features/），或者 * 直接贴着名字写（*src/，顶层项用这种）。
 *   src/
 *     app/          路由和全局 Provider
 *   * features/     按业务领域分
 */
export function tree(text) {
  const rows = String(text)
    .replace(/^\n+|\s+$/g, '')
    .split('\n')
    .filter((l) => l.trim());
  const base = Math.min(...rows.map((l) => l.match(/^ */)[0].length));
  return `<div class="tree">${rows
    .map((l) => {
      const acc = /^\s*\*/.test(l);
      const s = l.replace(/^(\s*)\*\s/, '$1  ').replace(/^(\s*)\*(?=\S)/, '$1');
      const lv = Math.floor((s.match(/^ */)[0].length - base) / 2);
      const [, name = '', note = ''] = s.trim().match(/^(\S+(?: \S+)*?)(?:\s{2,}(.*))?$/) || [];
      const dir = name.endsWith('/');
      return `<div class="tn${dir ? ' dir' : ''}${acc ? ' acc' : ''}" style="--lv:${lv}">${dir ? DIR : FILE}<b>${esc(name)}</b></div><div class="tc${acc ? ' acc' : ''}">${esc(note)}</div>`;
    })
    .join('')}</div>`;
}

/** 分层：从上到下，层与层之间画箭头。layers: [{ t: '接口层', items: ['Controller', 'DTO'], note: '只做…', acc: true }]；arrow 是箭头旁的说明 */
export function stack(layers, { arrow = '' }: any = {}) {
  return `<div class="stk">${layers
    .map((l, i) => {
      const x = node(l);
      const items = (x.items || []).map((it) => `<b>${esc(it)}</b>`).join('');
      const lyr = `<div class="ly${x.acc ? ' acc' : ''}"><span class="lb">${esc(x.t)}</span><div class="its">${items}${x.note ? `<i>${esc(x.note)}</i>` : ''}</div></div>`;
      return (i ? `<div class="ar">↓${arrow && i === 1 ? `<em>${esc(arrow)}</em>` : ''}</div>` : '') + lyr;
    })
    .join('')}</div>`;
}

/**
 * 流程：一行一串步骤，箭头相连；传二维数组就分几行，行间向下。步骤：'下单' 或 { t, note, acc, via: '箭头上的字', bad: true 表示失败分支 }。
 * 下一行的第一步标 bad 时，行间画成拐弯箭头表示失败分支，它的 via 写在箭头旁（如“失败时”）。
 * lanes 给每行起名时，几行是并列的几条流程（如四种渲染模式），行间不画箭头。
 */
export function flow(rows, { lanes = null }: any = {}) {
  const lines = Array.isArray(rows[0]) ? rows : [rows];
  const join = (r) => {
    const f = node(r[0]);
    return f.bad
      ? `<div class="ar br">↳${f.via ? `<em>${esc(f.via)}</em>` : ''}</div>`
      : `<div class="ar">↓${f.via ? `<em>${esc(f.via)}</em>` : ''}</div>`;
  };
  return `<div class="flw${lanes ? ' lanes' : ''}">${lines
    .map(
      (r, ri) =>
        (ri && !lanes ? join(r) : '') +
        `<div class="fr">${lanes ? `<span class="fl">${esc(lanes[ri])}</span>` : ''}${r
          .map((s, i) => {
            const x = node(s);
            return (
              (i ? `<span class="fa">${x.via ? `<em>${esc(x.via)}</em>` : ''}→</span>` : '') +
              `<div class="fs${x.acc ? ' acc' : ''}${x.bad ? ' bad' : ''}"><b>${esc(x.t)}</b>${x.note ? `<i>${esc(x.note)}</i>` : ''}</div>`
            );
          })
          .join('')}</div>`,
    )
    .join('')}</div>`;
}

/**
 * 时序图：actors 是参与方；msgs 每项 [从, 到, 文字, 'r'?]（下标从 0 开始，'r' 画成虚线表示返回；'x' 表示失败），
 * 从和到相同时是一条自身说明。
 */
export function seq(actors, msgs) {
  const n = actors.length;
  const ll = actors.map((_, i) => `<span class="ll" style="left:${((i + 0.5) * 100) / n}%"></span>`).join('');
  const head = `<div class="sq-r sq-h">${actors.map((a) => `<b>${esc(a)}</b>`).join('')}</div>`;
  const body = msgs
    .map(([a, b, t, k = '']) => {
      if (a === b)
        return `<div class="sq-r"><span class="sq-self${a === 0 ? ' l' : a === n - 1 ? ' r' : ''}" style="grid-column:${a + 1}">${esc(t)}</span></div>`; // 最多占两列宽，靠边的那列往里伸
      const lo = Math.min(a, b),
        hi = Math.max(a, b);
      return `<div class="sq-r"><span class="sq-m${b < a ? ' back' : ''}${k.includes('r') ? ' ret' : ''}${k.includes('x') ? ' bad' : ''}" style="grid-column:${lo + 1}/${hi + 2};--k:${hi - lo + 1}"><em>${esc(t)}</em></span></div>`;
    })
    .join('');
  return `<div class="sq" style="--n:${n}">${ll}${head}${body}</div>`;
}

/** 同心层：从外到内。list: [{ t: '框架与驱动', note }, …]；note 写在最下面（如“依赖只指向内层”） */
export function rings(list, note = '') {
  const inner = list.reduceRight((acc, r, i) => {
    const x = node(r);
    return `<div class="rg r${i}"><span>${esc(x.t)}${x.note ? `<i>${esc(x.note)}</i>` : ''}</span>${acc}</div>`;
  }, '');
  return `<div class="rgs">${inner}${note ? `<p class="dg-n">${esc(note)}</p>` : ''}</div>`;
}

/** 模块格：一组方框，每个方框里可以列几项。list: [{ t: '订单服务', items: ['订单库'], acc }]；cols 列数；note 写在下面 */
export function boxes(list, { cols = 3, note = '' }: any = {}) {
  return `<div class="bxs" style="--c:${cols}">${list
    .map((b) => {
      const x = node(b);
      return `<div class="bx${x.acc ? ' acc' : ''}${x.dash ? ' dash' : ''}"><b>${esc(x.t)}</b>${(x.items || []).map((it) => `<span>${esc(it)}</span>`).join('')}</div>`;
    })
    .join('')}</div>${note ? `<p class="dg-n">${esc(note)}</p>` : ''}`;
}

// 报文和代码的轻量高亮：请求行的方法、状态行的状态码、头名、JSON 的键和字符串、SQL 关键字、注释
const KW =
  'SELECT|FROM|WHERE|AND|OR|NOT|NULL|IN|IS|AS|ON|JOIN|LEFT|ORDER BY|GROUP BY|LIMIT|OFFSET|INSERT INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|UNIQUE|PRIMARY KEY|DEFAULT|ALTER|ADD|COLUMN|DROP|BEGIN|COMMIT|ROLLBACK|FOR UPDATE|SKIP LOCKED|RETURNING|REFERENCES|CHECK|EXPLAIN|VERSION';
const TOK = new RegExp(
  `(^\\s*(?:#(?=\\s|$)|--\\s|//).*$)|("(?:[^"\\\\]|\\\\.)*")(\\s*:)?|^((?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\\b)|^((?:HTTP\\/[\\d.]+ )?[1-5]\\d\\d\\b)|^([A-Za-z][\\w-]*)(?=: )|\\b(${KW})\\b`,
  'g',
);
const HDR = /^([A-Za-z][\w-]*)(: .*)$/; // 报文头：只高亮头名，值原样（Allow-Methods 里的 DELETE 不当 SQL 关键字）
const hl = (line) =>
  HDR.test(line) && !/^\s/.test(line)
    ? esc(line).replace(HDR, '<span class="c-hdr">$1</span>$2')
    : esc(line).replace(TOK, (m, cm, str, colon, meth, stat, hdr) => {
        if (cm) return `<span class="c-cm">${m}</span>`;
        if (str) return colon ? `<span class="c-key">${str}</span>${colon}` : `<span class="c-str">${str}</span>`;
        if (meth) return `<span class="c-meth">${m}</span>`;
        if (stat) return `<span class="c-st s${stat.trim().slice(-3, -2)}">${m}</span>`;
        if (hdr) return `<span class="c-hdr">${m}</span>`;
        return `<span class="c-kw">${m}</span>`;
      });

/** 代码 / 报文面板：panes: [{ t: '请求', text }]，几块并排；文字原样显示，前后空行去掉 */
export function code(panes) {
  return `<div class="cds">${panes
    .map(
      (p) =>
        `<div class="cd"><p>${esc(p.t)}</p><pre>${String(p.text)
          .replace(/^\n+|\s+$/g, '')
          .split('\n')
          .map(hl)
          .join('\n')}</pre></div>`,
    )
    .join('')}</div>`;
}
/** 一次请求和它的响应 */
export const http = (req, res) =>
  code([
    { t: '请求', text: req },
    { t: '响应', text: res },
  ]);

/**
 * PDF 页面缩略图（按 1px = 1mm 画 A4，再整体缩放）。
 * spec: { land: true 横版, margin: true 画出页边距虚线, bleed: true 画出血线, pages: [页, …], notes: ['旁注', …] }
 * 页：{ head: '页眉文字', foot: '页脚文字（{p}/{n} 换成页码）', label: '页下方的说明', blocks: [块, …] }
 * 块（字符串简写）：'title:文字' 大标题 · 'h:文字' 小标题 · 'p:3' 三行正文 · 'text:文字' 一行原文 · 'kv:4' 四行字段
 *   · 'table:5' 表头加五行（'table:3:续' 表头标“续”）· 'img' 图片 · 'chart' 图表 · 'total:¥1,280.00' 合计行 · 'sign' 签章区
 *   · 'qr' 二维码 · 'toc:4' 目录 · 'cols' 两栏正文 · 'break' 分页线 · 'gap' 空一行
 */
export function page({ land = false, margin = false, bleed = false, pages = [], notes = [] }: any = {}) {
  const n = pages.length;
  const bar = (w, cls = '') => `<span class="pb ${cls}" style="width:${w}%"></span>`;
  const lines = (k, ws = [100, 96, 88, 92, 70]) =>
    Array.from({ length: k }, (_, i) => bar(i === k - 1 ? 62 : ws[i % ws.length])).join('');
  const block = (b) => {
    const [k, a = '', c = ''] = String(b).split(':');
    switch (k) {
      case 'title':
        return `<p class="pt">${esc(a)}</p>`;
      case 'h':
        return `<p class="ph">${esc(a)}</p>`;
      case 'p':
        return `<div class="pp">${lines(+a || 3)}</div>`;
      case 'text':
        return `<p class="px">${esc(String(b).slice(5))}</p>`;
      case 'kv':
        return `<div class="pkv">${Array.from({ length: +a || 3 }, (_, i) => `<span>${bar(70)}</span><span>${bar([80, 55, 66, 90][i % 4])}</span>`).join('')}</div>`;
      case 'table':
        return `<div class="ptb"><div class="pth">${c ? `<em>${esc(c)}</em>` : ''}${bar(24, 'w')}${bar(18, 'w')}${bar(14, 'w')}</div>${Array.from({ length: +a || 4 }, () => `<div class="ptr">${bar(26)}${bar(20)}${bar(12)}</div>`).join('')}</div>`;
      case 'img':
        return '<div class="pim"></div>';
      case 'chart':
        return `<div class="pch">${[46, 70, 58, 88, 64, 76].map((h) => `<span style="height:${h}%"></span>`).join('')}</div>`;
      case 'total':
        return `<p class="ptot"><span>合计</span><b>${esc(String(b).slice(6))}</b></p>`;
      case 'sign':
        return '<div class="psg"><span>签字</span><span>盖章<i></i></span></div>';
      case 'qr':
        return '<div class="pqr"></div>';
      case 'toc':
        return `<div class="ptoc">${Array.from({ length: +a || 4 }, (_, i) => `<span>${bar([42, 56, 38, 50][i % 4])}<i></i><b>${(i + 1) * 3 - 1}</b></span>`).join('')}</div>`;
      case 'cols':
        return `<div class="pcols"><div class="pp">${lines(5)}</div><div class="pp">${lines(5)}</div></div>`;
      case 'break':
        return '<p class="pbr">分页</p>';
      case 'gap':
        return '<span class="pgap"></span>';
      default:
        return '';
    }
  };
  const one = (pg, i) =>
    `<figure class="pg${land ? ' land' : ''}${margin ? ' mg' : ''}${bleed ? ' bl' : ''}"><div class="pa">${pg.head ? `<p class="phd">${esc(pg.head)}</p>` : ''}<div class="pbd">${(pg.blocks || []).map(block).join('')}</div>${
      pg.foot
        ? `<p class="pft">${esc(
            String(pg.foot)
              .replace('{p}', String(i + 1))
              .replace('{n}', String(n)),
          )}</p>`
        : ''
    }</div>${pg.label ? `<figcaption>${esc(pg.label)}</figcaption>` : ''}</figure>`;
  return `<div class="pgs">${pages.map(one).join('')}${notes.length ? `<ul class="pnt">${notes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}</div>`;
}

/**
 * 电子表格：画出列标、行号、表头和数据，可选编辑栏和工作表标签。
 * spec: {
 *   head: ['日期', '摘要', '收入'],          表头（第 1 行，加底色）
 *   rows: [['10-01', '期初', '12,000.00'], …], 数据行；数字和金额自动右对齐
 *   widths: [60, 120, 80],                    各列宽度（px），不写就平均
 *   fx: ['E3', '=E2+C3-D3'],                  编辑栏：单元格地址和公式，同时选中这一格
 *   marks: { C3: 'good', D4: 'bad', E5: 'warn', B2: 'acc', A6: 'b' },  单元格标记：绿 / 红 / 黄 / 强调色 / 加粗
 *   foot: ['合计', '', '=SUM(C2:C9)'],        合计行（加粗、上边线）
 *   tabs: ['10 月', '11 月', '汇总'],         底部工作表标签，第一个是当前表
 *   freeze: true,                             表头下画冻结线
 * }
 * 单元格内容以 ▾ 结尾画成下拉框（数据验证）；以 ▮ 开头后跟 0–100 的数字画成数据条。
 */
export function sheet({
  head = [],
  rows = [],
  widths = null,
  fx = null,
  marks = {},
  foot = null,
  tabs = null,
  freeze = false,
}: any = {}) {
  const n = Math.max(head.length, ...rows.map((r) => r.length), foot ? foot.length : 0);
  const col = (i) => String.fromCharCode(65 + i);
  const tpl = `28px ${Array.from({ length: n }, (_, i) => (widths && widths[i] ? widths[i] + 'px' : 'minmax(48px,1fr)')).join(' ')}`;
  const num = (v) => /^[-+−]?[¥$€]?\s?[\d,]+(\.\d+)?%?$/.test(String(v).trim());
  const cell = (v, addr, cls = '') => {
    const t = String(v ?? '');
    const m = marks[addr] || '';
    const sel = fx && fx[0] === addr ? ' sel' : '';
    let inner = esc(t);
    if (/^▮\d+/.test(t)) {
      const [, p, rest = ''] = t.match(/^▮(\d+)\s*(.*)$/);
      inner = `<i class="xb" style="width:${Math.min(100, +p)}%"></i><span>${esc(rest)}</span>`;
    } else if (t.endsWith('▾')) inner = `<span class="xdd">${esc(t.slice(0, -1).trim())}</span>`;
    return `<span class="xc ${cls}${num(t) ? ' r' : ''}${m ? ' m-' + m : ''}${sel}">${inner}</span>`;
  };
  const line = (r, ri, cls = '') =>
    `<span class="xn">${ri}</span>${Array.from({ length: n }, (_, ci) => cell(r[ci], col(ci) + ri, cls)).join('')}`;
  const body = [
    head.length ? line(head, 1, 'h') : '',
    ...rows.map((r, i) => line(r, i + (head.length ? 2 : 1))),
    foot ? line(foot, rows.length + (head.length ? 2 : 1), 'f') : '',
  ].join('');
  return `<div class="xs">${fx ? `<div class="xfx"><b>${esc(fx[0])}</b><i>fx</i><span>${esc(fx[1])}</span></div>` : ''}<div class="xg${freeze ? ' fz' : ''}" style="grid-template-columns:${tpl}"><span class="xn"></span>${Array.from({ length: n }, (_, i) => `<span class="xh">${col(i)}</span>`).join('')}${body}</div>${tabs ? `<div class="xt">${tabs.map((t, i) => `<span${i ? '' : ' class="on"'}>${esc(t)}</span>`).join('')}</div>` : ''}</div>`;
}
