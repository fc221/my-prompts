// 布局 · App 首页的示例共用（样式在 app-phone.css）。
// fit：宽 360 的真实尺寸手机屏按示例框高度缩放，矮框（列表卡片）露 430 高并加 .short，高框（详情）露 680 高；chips：一组互斥的标签按钮。
// 手机屏按示例框高度缩放：矮框（列表卡片）露 430 高的屏幕并加 .short（示例可以据此收紧），高框（详情）露 680 高；框太窄时按宽度缩
export function fit(root) {
  const st = root.querySelector('.st');
  const set = () => {
    const h = st.clientHeight - 24,
      w = st.clientWidth;
    if (h <= 0 || w <= 0) return;
    const s = Math.min(h / (h >= 230 ? 680 : 430), (w - 32) / 360, 1);
    st.classList.toggle('short', h < 230);
    st.style.setProperty('--s', s.toFixed(4));
    st.style.setProperty('--h', Math.round(h / s) + 'px');
  };
  set();
  new ResizeObserver(set).observe(st);
}
// 一组互斥的标签按钮
export const chips = (root) =>
  root
    .querySelectorAll('.chips')
    .forEach((g) =>
      g
        .querySelectorAll('button')
        .forEach((b, i, all) =>
          b.addEventListener('click', () => all.forEach((x) => x.setAttribute('aria-pressed', String(x === b)))),
        ),
    );
