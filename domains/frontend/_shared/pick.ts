// 「怎么选」条目的示例外壳：一排种类 + 当前种类的实物 + 一句适用场景
export interface PickItem {
  name: string;
  fit: string;
  html: string;
  init?: (el: HTMLElement) => void; // 实物要能操作时在这里绑事件，切走后元素直接丢弃，不用解绑
}

export function pick(root: any, items: PickItem[], label = '种类') {
  const host =
    root.querySelector('.pk') || root.appendChild(Object.assign(document.createElement('div'), { className: 'pk' }));
  const tabs = items
    .map(
      (x, i) =>
        `<button type="button" role="tab" id="pk-t${i}" aria-controls="pk-p" aria-selected="false" tabindex="-1">${x.name}</button>`,
    )
    .join('');
  host.innerHTML = `<div class="pk-tabs" role="tablist" aria-label="${label}" data-clip>${tabs}</div><div class="pk-stage" id="pk-p" role="tabpanel" tabindex="0"></div><p class="pk-fit"></p>`;
  const btns = [...host.querySelectorAll('[role=tab]')] as HTMLElement[];
  const stage = host.querySelector('.pk-stage');
  const fit = host.querySelector('.pk-fit');
  const show = (i: number, focus = false) => {
    btns.forEach((b, k) => {
      b.setAttribute('aria-selected', String(k === i));
      b.tabIndex = k === i ? 0 : -1;
    });
    stage.setAttribute('aria-labelledby', btns[i].id);
    stage.innerHTML = items[i].html;
    fit.textContent = items[i].fit;
    items[i].init?.(stage);
    btns[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    if (focus) btns[i].focus();
  };
  btns.forEach((b, i) => {
    b.addEventListener('click', () => show(i));
    b.addEventListener('keydown', (e: KeyboardEvent) => {
      const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: btns.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault();
      show((n + btns.length) % btns.length, true);
    });
  });
  show(0);
}
