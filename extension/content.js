const WLB_DATABASE = window.WLB_DATABASE || [];

function renderBadge(item) {
  const badge = document.createElement('div');
  badge.id = `wlb-badge-${item.id}`;
  badge.style.cssText = [
    'position:fixed',
    'bottom:24px',
    'right:24px',
    'z-index:2147483647',
    'background:#ffffff',
    `border:2px solid ${item.color}`,
    'box-shadow:0 10px 25px rgba(0,0,0,0.15)',
    'border-radius:12px',
    'padding:12px 16px',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    'font-size:13px',
    'color:#1e293b',
    'max-width:320px'
  ].join(';');

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;';

  const title = document.createElement('strong');
  title.style.cssText = `font-size:14px;color:${item.color};`;
  title.textContent = item.tier === 'C' ? '⚠️ 双休购 · 避雷警示' : '🛡️ 双休购 · 良心认证';

  const close = document.createElement('span');
  close.textContent = '✕';
  close.style.cssText = 'font-size:11px;cursor:pointer;color:#94a3b8;padding:0 4px;';
  close.addEventListener('click', () => badge.remove());

  header.appendChild(title);
  header.appendChild(close);

  const line1 = document.createElement('div');
  const b1 = document.createElement('strong');
  b1.textContent = item.name;
  line1.append('检测到当前商品涉及品牌：');
  line1.appendChild(b1);

  const line2 = document.createElement('div');
  line2.style.cssText = `margin-top:4px;font-weight:600;color:${item.color};`;
  line2.textContent = `工时评级：${item.tier} 级 (${item.label})`;

  badge.appendChild(header);
  badge.appendChild(line1);
  badge.appendChild(line2);

  if (item.alt) {
    const alt = document.createElement('div');
    alt.style.cssText = 'margin-top:6px;padding:6px;background:#f0fdf4;border-radius:6px;font-size:11px;color:#166534;';
    alt.textContent = item.alt;
    badge.appendChild(alt);
  }

  const foot = document.createElement('div');
  foot.style.cssText = 'margin-top:8px;font-size:11px;color:#64748b;border-top:1px dashed #e2e8f0;padding-top:4px;';
  foot.textContent = '用订单反向考核企业 · 数据来自双休购开源库';
  badge.appendChild(foot);

  document.body.appendChild(badge);
}

function injectWlbBadges() {
  if (!document.body) return;
  const haystack = `${document.title} ${document.body.innerText.slice(0, 6000)}`;
  const matched = WLB_DATABASE.filter((item) => haystack.includes(item.name));
  const byId = {};
  matched.forEach((item) => {
    const current = byId[item.id];
    if (!current || item.name.length > current.name.length) {
      byId[item.id] = item;
    }
  });
  Object.keys(byId).forEach((id) => {
    if (!document.getElementById(`wlb-badge-${id}`)) {
      renderBadge(byId[id]);
    }
  });
}

setTimeout(injectWlbBadges, 1500);
