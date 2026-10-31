// 组件 · 导航、反馈与浮层、加载与状态、AI 界面等示例共用（样式在 components-overlay.css）。
// sv / I：24px 线性图标；modal / pop / timed：弹窗（焦点进出、Esc、遮罩）、气泡定位、定时消失。
// 内联图标（不用外部资源）
export const sv = (d, s = 18) =>
  `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const I = {
  search: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>', 16),
  bell: sv('<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>'),
  ok: sv('<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'),
  info: sv('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>', 16),
  warn: sv('<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>', 16),
  err: sv('<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>', 16),
  link: sv(
    '<path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/>',
    16,
  ),
  lock: sv('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  folder: sv(
    '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 11v5M9.5 13.5h5"/>',
  ),
  chev: sv('<path d="m6 9 6 6 6-6"/>', 16),
  clip: sv('<path d="m20 11-8 8a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l7-7"/>'),
  up: sv('<path d="M12 19V5M6 11l6-6 6 6"/>', 16),
  stop: '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor"/></svg>',
};
// 示例共用：模态浮层。打开时背景 inert、焦点进入；Tab 在层内循环；Esc 关闭；关闭后焦点回到触发按钮（onClose 可返回别的元素）
export function modal(root, el, { first, scrim, onClose }: any = {}) {
  let back = null;
  const bg = () => [...el.parentNode.children].filter((n) => n !== el);
  const items = () =>
    [...el.querySelectorAll('button,input,textarea,[tabindex="0"]')].filter(
      (n) => !n.disabled && !n.closest('[hidden]'),
    );
  const close = () => {
    if (!el.hasAttribute('data-open')) return;
    el.removeAttribute('data-open');
    bg().forEach((n) => (n.inert = false));
    const f = (onClose && onClose()) || back;
    if (f) f.focus();
  };
  const open = (trigger) => {
    back = trigger || null;
    el.setAttribute('data-open', '');
    bg().forEach((n) => (n.inert = true));
    const f = first ? el.querySelector(first) : items()[0];
    if (f) f.focus();
  };
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const a = items(),
      i = a.indexOf(root.activeElement);
    if (e.shiftKey ? i <= 0 : i === a.length - 1) {
      e.preventDefault();
      a[e.shiftKey ? a.length - 1 : 0].focus();
    }
  });
  el.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
  if (scrim)
    el.addEventListener('click', (e) => {
      if (e.target === el) close();
    });
  return { open, close };
}
// 示例共用：非模态锚定浮层（菜单、气泡确认、浮层卡片）。点击开关；打开后焦点进入；Esc、点外部关闭；Esc 关闭时焦点回到触发按钮
export function pop(root, btn, el) {
  const set = (open, back?) => {
    el.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      const f = el.querySelector('button');
      if (f) f.focus();
    } else if (back) btn.focus();
  };
  btn.addEventListener('click', () => set(el.hidden));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      set(false, true);
    }
  });
  root.addEventListener('pointerdown', (e) => {
    if (!el.hidden && !e.composedPath().some((n) => n === el || n === btn)) set(false);
  });
  return set;
}
// 示例共用：自动消失计时，鼠标悬停或焦点在内时暂停；CSS 里用 var(--ps) 同步暂停倒计时条。返回取消函数
export function timed(el, ms, done) {
  let left = ms,
    start = 0,
    t = 0;
  const hold = new Set();
  const sync = () => {
    if (hold.size && t) {
      clearTimeout(t);
      t = 0;
      left -= Date.now() - start;
    } else if (!hold.size && !t) {
      start = Date.now();
      t = setTimeout(done, left);
    }
    el.style.setProperty('--ps', hold.size ? 'paused' : 'running');
  };
  for (const [on, off, k] of [
    ['pointerenter', 'pointerleave', 'p'],
    ['focusin', 'focusout', 'f'],
  ]) {
    el.addEventListener(on, () => {
      hold.add(k);
      sync();
    });
    el.addEventListener(off, () => {
      hold.delete(k);
      sync();
    });
  }
  sync();
  return () => {
    clearTimeout(t);
    t = -1;
  };
}
