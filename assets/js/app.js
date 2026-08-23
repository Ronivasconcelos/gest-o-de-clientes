
const PHOTOS = {
  1: 'https://image.qwenlm.ai/public_source/f1487430-e86a-4ed8-8b8a-059e9e50495b/192f2821c-007e-4ff3-9d31-24060373a191.png',
  2: 'https://image.qwenlm.ai/public_source/f1487430-e86a-4ed8-8b8a-059e9e50495b/162dd9884-6531-4a26-8fb3-37da8e3b88fa.png',
  3: 'https://image.qwenlm.ai/public_source/f1487430-e86a-4ed8-8b8a-059e9e50495b/15effe213-db9f-4b3f-8fea-58fcbc732063.png',
  4: 'https://image.qwenlm.ai/public_source/f1487430-e86a-4ed8-8b8a-059e9e50495b/17788cb32-bcb6-4465-a166-66f3497a82be.png',
  5: 'https://image.qwenlm.ai/public_source/f1487430-e86a-4ed8-8b8a-059e9e50495b/1a5864b1f-fed4-47bc-b760-a8121583d84f.png',
  6: 'https://image.qwenlm.ai/public_source/f1487430-e86a-4ed8-8b8a-059e9e50495b/1a9689e60-dd6c-43e7-aada-6d9d04e2a6cc.png'
};

const DEFAULT_CLIENTS = [
  {
    id: 1, name: 'André Oliveira Santos', email: 'andre.santos@empresa.com.br',
    cpf: '123.456.789-00', phone: '(11) 98765-4321', company: 'Tech Solutions Ltda',
    position: 'Diretor de TI', address: 'Av. Paulista, 1000 - São Paulo/SP',
    photo: PHOTOS[1], status: 'paid', value: 2500, category: 'Premium',
    date: '2024-03-15', notes: 'Cliente desde 2024. Contrato anual renovado.',
    payments: [
      { date: '2026-08-05', amount: 2500, status: 'paid' },
      { date: '2026-07-05', amount: 2500, status: 'paid' },
      { date: '2026-06-05', amount: 2500, status: 'paid' }
    ]
  },
  {
    id: 2, name: 'Beatriz Costa Lima', email: 'beatriz.lima@corp.com.br',
    cpf: '234.567.890-11', phone: '(21) 97654-3210', company: 'Inovação Digital',
    position: 'Gerente de Marketing', address: 'Rua do Catete, 200 - Rio de Janeiro/RJ',
    photo: PHOTOS[2], status: 'paid', value: 1800, category: 'Standard',
    date: '2024-06-20', notes: 'Interessada em upgrade para Premium.',
    payments: [
      { date: '2026-08-10', amount: 1800, status: 'paid' },
      { date: '2026-07-10', amount: 1800, status: 'paid' }
    ]
  },
  {
    id: 3, name: 'Carlos Eduardo Mendes', email: 'carlos.mendes@global.com.br',
    cpf: '345.678.901-22', phone: '(31) 96543-2109', company: 'Global Imports',
    position: 'CEO', address: 'Av. Afonso Pena, 500 - Belo Horizonte/MG',
    photo: PHOTOS[3], status: 'unpaid', value: 5000, category: 'Empresarial',
    date: '2023-11-10', notes: 'Pagamento em atraso há 30 dias. Contatar departamento financeiro.',
    payments: [
      { date: '2026-08-15', amount: 5000, status: 'unpaid' },
      { date: '2026-07-15', amount: 5000, status: 'paid' }
    ]
  },
  {
    id: 4, name: 'Daniela Ferreira Souza', email: 'daniela.souza@startup.com.br',
    cpf: '456.789.012-33', phone: '(41) 95432-1098', company: 'StartupHub',
    position: 'Fundadora', address: 'Rua XV de Novembro, 800 - Curitiba/PR',
    photo: PHOTOS[4], status: 'paid', value: 1200, category: 'Básico',
    date: '2025-01-08', notes: 'Startup em crescimento. Possível upgrade em breve.',
    payments: [
      { date: '2026-08-08', amount: 1200, status: 'paid' }
    ]
  },
  {
    id: 5, name: 'Eduardo Almeida Rocha', email: 'eduardo.rocha@design.com.br',
    cpf: '567.890.123-44', phone: '(51) 94321-0987', company: 'Rocha Design Studio',
    position: 'Diretor Criativo', address: 'Av. Borges de Medeiros, 300 - Porto Alegre/RS',
    photo: PHOTOS[5], status: 'unpaid', value: 3200, category: 'Premium',
    date: '2024-09-25', notes: 'Contrato de 12 meses. 2 parcelas pendentes.',
    payments: [
      { date: '2026-08-25', amount: 3200, status: 'unpaid' },
      { date: '2026-07-25', amount: 3200, status: 'unpaid' },
      { date: '2026-06-25', amount: 3200, status: 'paid' }
    ]
  },
  {
    id: 6, name: 'Fernanda Rodrigues Alves', email: 'fernanda.alves@consulting.com.br',
    cpf: '678.901.234-55', phone: '(71) 93210-9876', company: 'Alves Consulting',
    position: 'Sócia-Diretora', address: 'Av. Sete de Setembro, 1500 - Salvador/BA',
    photo: PHOTOS[6], status: 'paid', value: 4500, category: 'Empresarial',
    date: '2023-05-12', notes: 'Cliente VIP. Atendimento prioritário.',
    payments: [
      { date: '2026-08-12', amount: 4500, status: 'paid' },
      { date: '2026-07-12', amount: 4500, status: 'paid' },
      { date: '2026-06-12', amount: 4500, status: 'paid' }
    ]
  },
  {
    id: 7, name: 'Gabriel Pereira Lima', email: 'gabriel.lima@tech.com.br',
    cpf: '789.012.345-66', phone: '(81) 92109-8765', company: 'TechBR Sistemas',
    position: 'CTO', address: 'Rua da Aurora, 250 - Recife/PE',
    photo: null, status: 'paid', value: 2800, category: 'Premium',
    date: '2025-02-18', notes: 'Novo cliente. Em período de experiência.',
    payments: [
      { date: '2026-08-18', amount: 2800, status: 'paid' }
    ]
  },
  {
    id: 8, name: 'Helena Martins Barbosa', email: 'helena.barbosa@moda.com.br',
    cpf: '890.123.456-77', phone: '(61) 91098-7654', company: 'Moda & Estilo',
    position: 'Proprietária', address: 'SCN Quadra 2, Bloco A - Brasília/DF',
    photo: null, status: 'unpaid', value: 950, category: 'Básico',
    date: '2025-04-05', notes: 'Pagamento pendente. Aguardando retorno.',
    payments: [
      { date: '2026-08-05', amount: 950, status: 'unpaid' }
    ]
  }
];

let clients = [];
let currentFilter = 'all';
let currentSearch = '';
let currentAlpha = null;
let selectedId = null;
let editingId = null;
let tempPhoto = null;

function load() {
  const saved = localStorage.getItem('clientes_db');
  if (saved) {
    try { clients = JSON.parse(saved); } catch(e) { clients = [...DEFAULT_CLIENTS]; }
  } else {
    clients = [...DEFAULT_CLIENTS];
  }
}

function save() {
  localStorage.setItem('clientes_db', JSON.stringify(clients));
}

function formatCurrency(v) {
  return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(d) {
  if (!d) return '-';
  const [y,m,dd] = d.split('-');
  return `${dd}/${m}/${y}`;
}

function formatCPF(v) {
  if (!v) return '-';
  return v.replace(/\D/g,'').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatPhone(v) {
  if (!v) return '-';
  const digits = v.replace(/\D/g,'');
  if (digits.length === 11) return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
  return v;
}

function getInitials(name) {
  const parts = name.split(' ').filter(p => p.length > 2);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
}

function getAvatar(client) {
  if (client.photo) {
    return `<img src="${client.photo}" alt="${client.name}">`;
  }
  return getInitials(client.name).toUpperCase();
}

function updateStats() {
  const total = clients.length;
  const paid = clients.filter(c => c.status === 'paid').length;
  const unpaid = clients.filter(c => c.status === 'unpaid').length;
  const revenue = clients.reduce((s,c) => s + (c.status === 'paid' ? (c.value || 0) : 0), 0);
  document.getElementById('statTotal').textContent = total;
  document.getElementById('statPaid').textContent = paid;
  document.getElementById('statUnpaid').textContent = unpaid;
  document.getElementById('statRevenue').textContent = formatCurrency(revenue);
  document.getElementById('countAll').textContent = total;
  document.getElementById('countPaid').textContent = paid;
  document.getElementById('countUnpaid').textContent = unpaid;
}

function getFiltered() {
  let list = [...clients];
  if (currentFilter === 'paid') list = list.filter(c => c.status === 'paid');
  else if (currentFilter === 'unpaid') list = list.filter(c => c.status === 'unpaid');
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.cpf || '').includes(q) ||
      (c.company || '').toLowerCase().includes(q)
    );
  }
  list.sort((a,b) => a.name.localeCompare(b.name, 'pt-BR'));
  return list;
}

function renderAlphaIndex(list) {
  const container = document.getElementById('alphaIndex');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const available = new Set(list.map(c => c.name[0].toUpperCase()));
  container.innerHTML = letters.map(l => {
    const active = currentAlpha === l ? 'active' : '';
    const disabled = !available.has(l) ? 'disabled' : '';
    return `<div class="alpha-letter ${active} ${disabled}" data-letter="${l}">${l}</div>`;
  }).join('');
  container.querySelectorAll('.alpha-letter:not(.disabled)').forEach(el => {
    el.addEventListener('click', () => {
      currentAlpha = currentAlpha === el.dataset.letter ? null : el.dataset.letter;
      renderList();
    });
  });
}

function renderList() {
  const list = getFiltered();
  renderAlphaIndex(list);
  const container = document.getElementById('clientList');
  if (list.length === 0) {
    container.innerHTML = '<div class="no-results">Nenhum cliente encontrado</div>';
    return;
  }
  let html = '';
  let currentLetter = '';
  list.forEach(c => {
    const letter = c.name[0].toUpperCase();
    if (currentAlpha && letter !== currentAlpha) return;
    if (letter !== currentLetter) {
      currentLetter = letter;
      html += `<div class="alpha-group-label">${letter}</div>`;
    }
    const active = selectedId === c.id ? 'active' : '';
    html += `
      <div class="client-item ${active}" data-id="${c.id}">
        <div class="client-avatar">${getAvatar(c)}</div>
        <div class="client-info">
          <div class="client-name">${c.name}</div>
          <div class="client-meta">${c.company || c.email}</div>
        </div>
        <div class="status-dot ${c.status}"></div>
      </div>
    `;
  });
  container.innerHTML = html;
  container.querySelectorAll('.client-item').forEach(el => {
    el.addEventListener('click', () => {
      selectedId = parseInt(el.dataset.id);
      renderList();
      renderDetail();
    });
  });
}

function renderDetail() {
  const panel = document.getElementById('detailPanel');
  const client = clients.find(c => c.id === selectedId);
  if (!client) {
    panel.innerHTML = `
      <div class="empty-state">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <h2>Selecione um cliente</h2>
        <p>Clique em um cliente na lista ao lado para visualizar seus detalhes completos, histórico de pagamentos e informações de contato.</p>
      </div>`;
    return;
  }
  const paidCount = (client.payments || []).filter(p => p.status === 'paid').length;
  const unpaidCount = (client.payments || []).filter(p => p.status === 'unpaid').length;
  const totalPaid = (client.payments || []).filter(p => p.status === 'paid').reduce((s,p) => s + p.amount, 0);

  panel.innerHTML = `
    <div class="detail-card">
      <div class="detail-header">
        <div class="detail-photo">${client.photo ? `<img src="${client.photo}" alt="${client.name}">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:700;color:#64748b;background:#e2e8f0">${getInitials(client.name).toUpperCase()}</div>`}</div>
        <div class="detail-title">
          <h2>${client.name}</h2>
          <div class="company">${client.position || ''}${client.position && client.company ? ' • ' : ''}${client.company || ''}</div>
          <div style="margin-bottom:14px">
            <span class="status-badge ${client.status}">
              <span class="status-dot ${client.status}" style="width:8px;height:8px"></span>
              ${client.status === 'paid' ? 'Conta em Dia' : 'Pagamento Pendente'}
            </span>
            <span class="status-badge" style="background:#eef2ff;color:#3730a3;margin-left:6px">${client.category}</span>
          </div>
          <div class="detail-actions">
            <button class="btn btn-primary" id="btnEdit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Editar
            </button>
            ${client.status === 'unpaid' ? `
              <button class="btn btn-success" id="btnMarkPaid">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Marcar como Pago
              </button>
            ` : `
              <button class="btn btn-warning" id="btnMarkUnpaid">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Marcar como Pendente
              </button>
            `}
            <button class="btn btn-danger" id="btnDelete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Excluir
            </button>
          </div>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-item">
          <div class="label">CPF</div>
          <div class="value">${formatCPF(client.cpf)}</div>
        </div>
        <div class="info-item">
          <div class="label">E-mail</div>
          <div class="value">${client.email}</div>
        </div>
        <div class="info-item">
          <div class="label">Telefone</div>
          <div class="value">${formatPhone(client.phone)}</div>
        </div>
        <div class="info-item">
          <div class="label">Endereço</div>
          <div class="value">${client.address || '-'}</div>
        </div>
        <div class="info-item">
          <div class="label">Data de Cadastro</div>
          <div class="value">${formatDate(client.date)}</div>
        </div>
        <div class="info-item">
          <div class="label">Valor Mensal</div>
          <div class="value">${formatCurrency(client.value)}</div>
        </div>
      </div>
    </div>

    <div class="detail-card">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Resumo Financeiro
      </div>
      <div class="info-grid">
        <div class="info-item" style="background:#dcfce7;border-color:#bbf7d0">
          <div class="label" style="color:#166534">Total Pago</div>
          <div class="value" style="color:#166534">${formatCurrency(totalPaid)} (${paidCount}x)</div>
        </div>
        <div class="info-item" style="background:#fee2e2;border-color:#fecaca">
          <div class="label" style="color:#991b1b">Pendente</div>
          <div class="value" style="color:#991b1b">${formatCurrency(unpaidCount * (client.value || 0))} (${unpaidCount}x)</div>
        </div>
        <div class="info-item" style="background:#eef2ff;border-color:#c7d2fe">
          <div class="label" style="color:#3730a3">Categoria</div>
          <div class="value" style="color:#3730a3">${client.category}</div>
        </div>
      </div>
    </div>

    <div class="detail-card">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Histórico de Pagamentos
      </div>
      <div class="payment-history">
        ${(client.payments || []).length === 0 ? '<div class="no-results">Nenhum pagamento registrado</div>' :
          client.payments.map(p => `
            <div class="payment-item ${p.status}">
              <div>
                <div class="date">${formatDate(p.date)}</div>
              </div>
              <div class="amount">${formatCurrency(p.amount)}</div>
              <div class="status ${p.status}">${p.status === 'paid' ? '✓ Pago' : '⏳ Pendente'}</div>
            </div>
          `).join('')
        }
      </div>
    </div>

    ${client.notes ? `
    <div class="detail-card">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Observações
      </div>
      <div style="color:#475569;line-height:1.6;font-size:14px">${client.notes}</div>
    </div>
    ` : ''}
  `;

  document.getElementById('btnEdit').addEventListener('click', () => openModal(client));
  document.getElementById('btnDelete').addEventListener('click', () => deleteClient(client.id));
  const mp = document.getElementById('btnMarkPaid');
  const mu = document.getElementById('btnMarkUnpaid');
  if (mp) mp.addEventListener('click', () => toggleStatus(client.id, 'paid'));
  if (mu) mu.addEventListener('click', () => toggleStatus(client.id, 'unpaid'));
}

function toggleStatus(id, status) {
  const c = clients.find(x => x.id === id);
  if (!c) return;
  c.status = status;
  if (status === 'paid') {
    const today = new Date().toISOString().split('T')[0];
    c.payments = c.payments || [];
    c.payments.unshift({ date: today, amount: c.value || 0, status: 'paid' });
  }
  save();
  updateStats();
  renderList();
  renderDetail();
  showToast(status === 'paid' ? '✓ Conta marcada como paga' : '⏳ Conta marcada como pendente', 'success');
}

function deleteClient(id) {
  if (!confirm('Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.')) return;
  clients = clients.filter(c => c.id !== id);
  if (selectedId === id) selectedId = null;
  save();
  updateStats();
  renderList();
  renderDetail();
  showToast('Cliente excluído com sucesso', 'success');
}

function openModal(client) {
  editingId = client ? client.id : null;
  tempPhoto = client?.photo || null;
  document.getElementById('modalTitle').textContent = client ? 'Editar Cliente' : 'Novo Cliente';
  document.getElementById('fName').value = client?.name || '';
  document.getElementById('fCpf').value = client?.cpf || '';
  document.getElementById('fEmail').value = client?.email || '';
  document.getElementById('fPhone').value = client?.phone || '';
  document.getElementById('fCompany').value = client?.company || '';
  document.getElementById('fPosition').value = client?.position || '';
  document.getElementById('fAddress').value = client?.address || '';
  document.getElementById('fDate').value = client?.date || new Date().toISOString().split('T')[0];
  document.getElementById('fValue').value = client?.value || '';
  document.getElementById('fStatus').value = client?.status || 'paid';
  document.getElementById('fCategory').value = client?.category || 'Standard';
  document.getElementById('fNotes').value = client?.notes || '';
  updatePhotoPreview();
  document.getElementById('modal').classList.add('active');
  document.getElementById('modal').setAttribute('aria-hidden', 'false');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('modal').setAttribute('aria-hidden', 'true');
  editingId = null;
  tempPhoto = null;
}

function updatePhotoPreview() {
  const preview = document.getElementById('photoPreview');
  if (tempPhoto) {
    preview.innerHTML = `<img src="${tempPhoto}" alt="preview">`;
  } else {
    const name = document.getElementById('fName').value || '';
    preview.innerHTML = name ? getInitials(name).toUpperCase() : '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
  }
}

function saveClient() {
  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  if (!name || !email) {
    showToast('Preencha nome e e-mail', 'error');
    return;
  }
  const data = {
    name,
    cpf: document.getElementById('fCpf').value.trim(),
    email,
    phone: document.getElementById('fPhone').value.trim(),
    company: document.getElementById('fCompany').value.trim(),
    position: document.getElementById('fPosition').value.trim(),
    address: document.getElementById('fAddress').value.trim(),
    date: document.getElementById('fDate').value,
    value: parseFloat(document.getElementById('fValue').value) || 0,
    status: document.getElementById('fStatus').value,
    category: document.getElementById('fCategory').value,
    notes: document.getElementById('fNotes').value.trim(),
    photo: tempPhoto
  };
  if (editingId) {
    const idx = clients.findIndex(c => c.id === editingId);
    if (idx >= 0) {
      clients[idx] = { ...clients[idx], ...data };
      if (selectedId === editingId) renderDetail();
    }
    showToast('✓ Cliente atualizado com sucesso', 'success');
  } else {
    const newId = Math.max(0, ...clients.map(c => c.id)) + 1;
    clients.push({ id: newId, ...data, payments: [] });
    selectedId = newId;
    renderDetail();
    showToast('✓ Cliente cadastrado com sucesso', 'success');
  }
  save();
  updateStats();
  renderList();
  closeModal();
}

function showToast(msg, type) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + (type || '');
  setTimeout(() => t.classList.remove('show'), 2000);
}

// Events
document.getElementById('searchInput').addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderList();
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderList();
  });
});


function buildPdfReport() {
  const now = new Date();
  const paid = clients.filter(c => c.status === 'paid');
  const unpaid = clients.filter(c => c.status === 'unpaid');
  const revenue = paid.reduce((sum, c) => sum + Number(c.value || 0), 0);
  const pending = unpaid.reduce((sum, c) => sum + Number(c.value || 0), 0);
  const rows = [...clients].sort((a,b) => a.name.localeCompare(b.name, 'pt-BR')).map(c => `
    <tr>
      <td>${escapeHtml(c.name)}</td>
      <td>${escapeHtml(c.company || '-')}</td>
      <td>${escapeHtml(c.email || '-')}</td>
      <td>${escapeHtml(formatPhone(c.phone))}</td>
      <td>${escapeHtml(c.category || '-')}</td>
      <td class="${c.status}">${c.status === 'paid' ? 'Pago' : 'Pendente'}</td>
      <td class="money">${escapeHtml(formatCurrency(c.value))}</td>
    </tr>`).join('');

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Backup PDF - Gestão de Clientes</title>
  <style>
    @page{size:A4 landscape;margin:12mm}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;font-size:11px;margin:0}
    h1{font-size:21px;margin:0 0 4px}p{margin:3px 0;color:#475569}.meta{margin-bottom:14px}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0 16px}.card{border:1px solid #cbd5e1;border-radius:8px;padding:9px}.label{font-size:9px;text-transform:uppercase;color:#64748b}.value{font-size:15px;font-weight:700;margin-top:3px}
    table{width:100%;border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:6px;text-align:left;vertical-align:top}th{background:#f1f5f9;font-size:10px}td.paid{color:#166534;font-weight:700}td.unpaid{color:#b91c1c;font-weight:700}.money{text-align:right;white-space:nowrap}.footer{margin-top:12px;color:#64748b;font-size:9px}
  </style></head><body><h1>Backup de Dados — Gestão de Clientes</h1>
  <div class="meta"><p>Relatório gerado em ${escapeHtml(now.toLocaleString('pt-BR'))}</p><p>Total de clientes: ${clients.length}</p></div>
  <div class="cards"><div class="card"><div class="label">Total</div><div class="value">${clients.length}</div></div><div class="card"><div class="label">Pagos</div><div class="value">${paid.length}</div></div><div class="card"><div class="label">Pendentes</div><div class="value">${unpaid.length}</div></div><div class="card"><div class="label">Valores</div><div class="value">${escapeHtml(formatCurrency(revenue))}</div><div class="label" style="margin-top:4px">Pendente: ${escapeHtml(formatCurrency(pending))}</div></div></div>
  <table><thead><tr><th>Cliente</th><th>Empresa</th><th>E-mail</th><th>Telefone</th><th>Categoria</th><th>Status</th><th>Valor mensal</th></tr></thead><tbody>${rows || '<tr><td colspan="7">Nenhum cliente cadastrado.</td></tr>'}</tbody></table>
  <div class="footer">Documento gerado pelo Sistema Gestão de Clientes. Os dados permanecem armazenados localmente neste dispositivo.</div>
  <script>window.addEventListener('load',()=>setTimeout(()=>window.print(),250));</script></body></html>`;
}

function openPdfBackup() {
  const popup = window.open('', '_blank', 'noopener,noreferrer,width=1200,height=800');
  if (!popup) {
    showToast('Permita pop-ups para gerar o Backup PDF.', 'error');
    return;
  }
  popup.document.open();
  popup.document.write(buildPdfReport());
  popup.document.close();
}

document.getElementById('btnBackupPdf').addEventListener('click', openPdfBackup);
document.getElementById('btnAdd').addEventListener('click', () => openModal(null));
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalCancel').addEventListener('click', closeModal);
document.getElementById('clientForm').addEventListener('submit', (e) => { e.preventDefault(); saveClient(); });
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

document.getElementById('photoInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    tempPhoto = ev.target.result;
    updatePhotoPreview();
  };
  reader.readAsDataURL(file);
});

document.getElementById('fName').addEventListener('input', updatePhotoPreview);

// Init
load();
updateStats();
renderList();


// PWA / instalação do aplicativo
let deferredInstallPrompt = null;
const installButton = document.getElementById('btnInstallApp');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installButton) installButton.hidden = false;
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  if (installButton) installButton.hidden = true;
  showToast('✓ Aplicativo instalado com sucesso', 'success');
});

if (installButton) {
  installButton.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const result = await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      if (result.outcome !== 'accepted') showToast('Instalação cancelada', '');
      return;
    }
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      showToast('✓ O aplicativo já está instalado', 'success');
      return;
    }
    showToast('Abra este site no Chrome ou Edge e use o ícone de instalação na barra de endereço.', '');
  });
}

// Registrar Service Worker para permitir instalação PWA e funcionamento offline básico.
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
