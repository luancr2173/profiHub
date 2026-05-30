const professionals = [
    { name: 'Carlos Mendes', role: 'Pintor', cat: 'pintura', city: 'Brasília - DF', rating: 4.9, reviews: 38, price: 80, desc: 'Especialista em pintura interna, textura e grafiato. Atende residências e comércios.', avail: true, initials: 'CM', bg: '#E6F1FB', color: '#185FA5' },
    { name: 'Ana Lima', role: 'Eletricista', cat: 'eletrica', city: 'Taguatinga', rating: 4.8, reviews: 52, price: 95, desc: 'Instalações elétricas residenciais, quadros de distribuição e SPDA.', avail: true, initials: 'AL', bg: '#EAF3DE', color: '#3B6D11' },
    { name: 'Roberto Silva', role: 'Técnico de Ar-condicionado', cat: 'ar', city: 'Brasília - DF', rating: 4.7, reviews: 29, price: 120, desc: 'Instalação, limpeza e manutenção de splits e janela. Todas as marcas.', avail: false, initials: 'RS', bg: '#E6F1FB', color: '#185FA5' },
    { name: 'Fernanda Costa', role: 'Encanadora', cat: 'hidro', city: 'Ceilândia', rating: 4.9, reviews: 41, price: 90, desc: 'Conserto de vazamentos, instalação de louças sanitárias e caixas d\'água.', avail: true, initials: 'FC', bg: '#EAF3DE', color: '#3B6D11' },
    { name: 'João Moreira', role: 'Marceneiro', cat: 'marcenaria', city: 'Brasília - DF', rating: 4.6, reviews: 17, price: 110, desc: 'Móveis planejados, reformas e reparos em madeira e MDF sob medida.', avail: true, initials: 'JM', bg: '#FAEEDA', color: '#854F0B' },
    { name: 'Patrícia Nunes', role: 'Diarista / Limpeza', cat: 'limpeza', city: 'Taguatinga', rating: 5.0, reviews: 64, price: 60, desc: 'Limpeza residencial, pós-obra e faxina periódica. Produtos incluídos.', avail: true, initials: 'PN', bg: '#FAEEDA', color: '#854F0B' },
];

const skillsByCategory = {
    'Pintura': ['Pintura interna', 'Pintura externa', 'Textura', 'Grafiato', 'Marmorato', 'Estêncil', 'Reparo de paredes', 'Fachada'],
    'Elétrica': ['Instalação elétrica', 'Quadro de distribuição', 'Tomadas e interruptores', 'SPDA', 'Iluminação', 'Ar-condicionado split', 'Alarmes'],
    'Hidráulica': ['Conserto de vazamentos', 'Instalação de louças', 'Caixa d\'água', 'Aquecedor solar', 'Esgoto', 'Fossas'],
    'Ar-condicionado': ['Instalação de split', 'Limpeza de ar-condicionado', 'Manutenção preventiva', 'Carga de gás', 'Janela', 'Central'],
    'Marcenaria': ['Móveis planejados', 'Reformas em madeira', 'Deck', 'Portas e janelas', 'Pergolado', 'Reparo de móveis'],
    'Limpeza': ['Limpeza residencial', 'Limpeza comercial', 'Pós-obra', 'Faxina periódica', 'Higienização de sofá', 'Lavagem de tapetes'],
    'Jardinagem': ['Corte de grama', 'Poda de árvores', 'Paisagismo', 'Irrigação', 'Adubação', 'Jardinagem geral'],
    'Reformas em geral': ['Demolição', 'Alvenaria', 'Assentamento de cerâmica', 'Drywall', 'Forro de gesso', 'Reforma completa'],
    'Informática': ['Formatação', 'Manutenção de computadores', 'Redes Wi-Fi', 'Cabeamento', 'Impressoras', 'Suporte remoto'],
};

function renderHomeGrid(filter) {
    const grid = document.getElementById('pros-grid');
    if (!grid) return;
    const arr = filter ? professionals.filter(p => p.cat === filter) : professionals;
    if (arr.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--gray-400)">Nenhum profissional encontrado nesta categoria.</div>';
        return;
    }
    grid.innerHTML = arr.map(p => `
        <div class="pro-card">
          <div class="pro-avatar" style="background:${p.bg};color:${p.color}">${p.initials}</div>
          <div class="pro-name">${p.name}</div>
          <div class="pro-role">${p.role}</div>
          <div class="pro-rating">
            <span class="stars">★★★★★</span>
            ${p.rating} (${p.reviews} avaliações)
          </div>
          <div class="pro-price">R$ ${p.price}/hora</div>
          ${p.avail
            ? '<div class="badge-avail"><i class="fa-solid fa-circle" style="font-size:7px"></i> Disponível agora</div>'
            : '<div class="badge-busy">Indisponível no momento</div>'}
        </div>
      `).join('');
}

function renderResults(arr) {
    const list = document.getElementById('results-list');
    const count = document.getElementById('results-count');
    if (!list) return;
    if (count) count.textContent = `${arr.length} profissional${arr.length !== 1 ? 'is' : ''} encontrado${arr.length !== 1 ? 's' : ''}`;
    if (arr.length === 0) {
        list.innerHTML = `<div class="no-results"><i class="fa-solid fa-user-slash"></i><p>Nenhum profissional encontrado. Tente outros filtros.</p></div>`;
        return;
    }
    list.innerHTML = arr.map(p => `
        <div class="result-card">
          <div class="result-avatar" style="background:${p.bg};color:${p.color}">${p.initials}</div>
          <div class="result-info">
            <div class="result-name">${p.name}</div>
            <div class="result-role">${p.role}</div>
            <div class="result-desc">${p.desc}</div>
            <div class="result-meta">
              <span class="meta-item"><i class="fa-solid fa-star" style="color:#EF9F27"></i> ${p.rating} (${p.reviews} avaliações)</span>
              <span class="meta-item"><i class="fa-solid fa-location-dot"></i> ${p.city}</span>
              ${p.avail ? '<span class="meta-item avail"><i class="fa-solid fa-circle-check"></i> Disponível agora</span>' : ''}
            </div>
          </div>
          <div class="result-right">
            <div>
              <div class="price-tag">R$ ${p.price}</div>
              <span class="price-unit">por hora</span>
            </div>
            <button class="btn-contact" onclick="contactPro('${p.name}')">
              <i class="fa-solid fa-message"></i> Contatar
            </button>
          </div>
        </div>
      `).join('');
}

function filterResults() {
    const q = (document.getElementById('busca-input')?.value || '').toLowerCase();
    const city = (document.getElementById('busca-city')?.value || '').toLowerCase();
    const cat = (document.getElementById('busca-cat')?.value || '').toLowerCase();
    let arr = professionals.filter(p => {
        const matchQ = !q || p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
        const matchCity = !city || p.city.toLowerCase().includes(city);
        const matchCat = !cat || p.role.toLowerCase().includes(cat.slice(0, 6));
        return matchQ && matchCity && matchCat;
    });
    const sortEl = document.querySelector('.sort-chip.active');
    const sortType = sortEl ? sortEl.dataset.sort : 'avaliacao';
    arr = sortArr(arr, sortType);
    renderResults(arr);
}

function sortArr(arr, type) {
    const a = [...arr];
    if (type === 'preco') return a.sort((x, y) => x.price - y.price);
    if (type === 'avaliacao') return a.sort((x, y) => y.rating - x.rating);
    if (type === 'disponivel') return a.sort((x, y) => (y.avail ? 1 : 0) - (x.avail ? 1 : 0));
    return a;
}

function setSort(el, type) {
    document.querySelectorAll('.sort-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    el.dataset.sort = type;
    filterResults();
}

function filterHomeChip(el, cat) {
    document.querySelectorAll('#home-chips .chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    renderHomeGrid(cat === 'todos' ? null : cat);
}

function doHomeSearch() {
    const q = document.getElementById('home-search').value;
    showPage('busca', null);
    setTimeout(() => {
        const input = document.getElementById('busca-input');
        if (input) { input.value = q; filterResults(); }
    }, 80);
}

function showPage(id, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    if (id === 'busca') { setTimeout(filterResults, 50); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
}

function goStep(n) {
    [1, 2, 3, 4].forEach(i => {
        const el = document.getElementById('cad-s' + i);
        if (el) el.style.display = i === n ? 'block' : 'none';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (n === 4) showToast('Perfil criado com sucesso!', 'success');
}

function toggleSkill(el) { el.classList.toggle('sel'); }

function updateSkillTags() {
    const cat = document.getElementById('f-categoria').value;
    const tags = skillsByCategory[cat] || [];
    document.getElementById('skill-tags').innerHTML = tags.map(t =>
        `<div class="skill-tag" onclick="toggleSkill(this)">${t}</div>`
    ).join('');
}

function switchTab(el) {
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

function doLogin() {
    showToast('Login realizado com sucesso!', 'success');
    setTimeout(() => showPage('home', null), 1200);
}

function contactPro(name) {
    showToast(`Mensagem enviada para ${name}!`, 'success');
}

function showToast(msg, type) {
    const t = document.getElementById('toast');
    const m = document.getElementById('toast-msg');
    t.className = 'toast' + (type ? ' ' + type : '');
    m.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3200);
}

function toggleMenu() {
    const links = document.getElementById('nav-links');
    const icon = document.getElementById('menu-icon');
    links.classList.toggle('open');
    icon.className = links.classList.contains('open') ? 'fa-solid fa-x' : 'fa-solid fa-bars';
}
function closeMenu() {
    const links = document.getElementById('nav-links');
    const icon = document.getElementById('menu-icon');
    links.classList.remove('open');
    icon.className = 'fa-solid fa-bars';
}

renderHomeGrid();
