'use strict';

const STORAGE_KEY = 'clientes_db_v2';
const LEGACY_STORAGE_KEY = 'clientes_db';

const DEFAULT_CLIENTS = [
  {id:1,name:'André Oliveira Santos',email:'andre.santos@empresa.com.br',cpf:'123.456.789-00',phone:'(11) 98765-4321',company:'Tech Solutions Ltda',position:'Diretor de TI',address:'Av. Paulista, 1000 - São Paulo/SP',photo:null,status:'paid',value:2500,category:'Premium',date:'2024-03-15',notes:'Cliente desde 2024. Contrato anual renovado.',payments:[{date:'2026-08-05',amount:2500,status:'paid'},{date:'2026-07-05',amount:2500,status:'paid'},{date:'2026-06-05',amount:2500,status:'paid'}]},
  {id:2,name:'Beatriz Costa Lima',email:'beatriz.lima@corp.com.br',cpf:'234.567.890-11',phone:'(21) 97654-3210',company:'Inovação Digital',position:'Gerente de Marketing',address:'Rua do Catete, 200 - Rio de Janeiro/RJ',photo:null,status:'paid',value:1800,category:'Standard',date:'2024-06-20',notes:'Interessada em upgrade para Premium.',payments:[{date:'2026-08-10',amount:1800,status:'paid'},{date:'2026-07-10',amount:1800,status:'paid'}]},
  {id:3,name:'Carlos Eduardo Mendes',email:'carlos.mendes@global.com.br',cpf:'345.678.901-22',phone:'(31) 96543-2109',company:'Global Imports',position:'CEO',address:'Av. Afonso Pena, 500 - Belo Horizonte/MG',photo:null,status:'unpaid',value:5000,category:'Empresarial',date:'2023-11-10',notes:'Pagamento em atraso há 30 dias. Contatar departamento financeiro.',payments:[{date:'2026-08-15',amount:5000,status:'unpaid'},{date:'2026-07-15',amount:5000,status:'paid'}]},
  {id:4,name:'Daniela Ferreira Souza',email:'daniela.souza@startup.com.br',cpf:'456.789.012-33',phone:'(41) 95432-1098',company:'StartupHub',position:'Fundadora',address:'Rua XV de Novembro, 800 - Curitiba/PR',photo:null,status:'paid',value:1200,category:'Básico',date:'2025-01-08',notes:'Startup em crescimento. Possível upgrade em breve.',payments:[{date:'2026-08-08',amount:1200,status:'paid'}]},
  {id:5,name:'Eduardo Almeida Rocha',email:'eduardo.rocha@design.com.br',cpf:'567.890.123-44',phone:'(51) 94321-0987',company:'Rocha Design Studio',position:'Diretor Criativo',address:'Av. Borges de Medeiros, 300 - Porto Alegre/RS',photo:null,status:'unpaid',value:3200,category:'Premium',date:'2024-09-25',notes:'Contrato de 12 meses. 2 parcelas pendentes.',payments:[{date:'2026-08-25',amount:3200,status:'unpaid'},{date:'2026-07-25',amount:3200,status:'unpaid'},{date:'2026-06-25',amount:3200,status:'paid'}]},
  {id:6,name:'Fernanda Rodrigues Alves',email:'fernanda.alves@consulting.com.br',cpf:'678.901.234-55',phone:'(71) 93210-9876',company:'Alves Consulting',position:'Sócia-Diretora',address:'Av. Sete de Setembro, 1500 - Salvador/BA',photo:null,status:'paid',value:4500,category:'Empresarial',date:'2023-05-12',notes:'Cliente VIP. Atendimento prioritário.',payments:[{date:'2026-08-12',amount:4500,status:'paid'},{date:'2026-07-12',amount:4500,status:'paid'},{date:'2026-06-12',amount:4500,status:'paid'}]},
  {id:7,name:'Gabriel Pereira Lima',email:'gabriel.lima@tech.com.br',cpf:'789.012.345-66',phone:'(81) 92109-8765',company:'TechBR Sistemas',position:'CTO',address:'Rua da Aurora, 250 - Recife/PE',photo:null,status:'paid',value:2800,category:'Premium',date:'2025-02-18',notes:'Novo cliente. Em período de experiência.',payments:[{date:'2026-08-18',amount:2800,status:'paid'}]},
  {id:8,name:'Helena Martins Barbosa',email:'helena.barbosa@moda.com.br',cpf:'890.123.456-77',phone:'(61) 91098-7654',company:'Moda & Estilo',position:'Proprietária',address:'SCN Quadra 2, Bloco A - Brasília/DF',photo:null,status:'unpaid',value:950,category:'Básico',date:'2025-04-05',notes:'Pagamento pendente. Aguardando retorno.',payments:[{date:'2026-08-05',amount:950,status:'unpaid'}]}
];

let clients = [];
let currentFilter = 'all';
let currentSearch = '';
let currentAlpha = null;
let selectedId = null;
let editingId = null;
let tempPhoto = null;
let toastTimer = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const todayLocal = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
};

function normalizeClients(list) {
  if (!Array.isArray(list)) return [...DEFAULT_CLIENTS];
  return list.map((client, index) => ({
    id: Number(client.id) || index + 1,
    name: String(client.name || '').trim(),
    email: String(client.email || '').trim(),
    cpf: String(client.cpf || '').trim(),
    phone: String(client.phone || '').trim(),
    company: String(client.company || '').trim(),
    position: String(client.position || '').trim(),
    address: String(client.address || '').trim(),
    photo: typeof client.photo === 'string' && client.photo.startsWith('data:image/') ? client.photo : null,
    status: client.status === 'unpaid' ? 'unpaid' : 'paid',
    value: Number(client.value) || 0,
    category: String(client.category || 'Standard'),
    date: String(client.date || todayLocal()),
    notes: String(client.notes || '').trim(),
    payments: Array.isArray(client.payments) ? client.payments.map(p => ({
      date: String(p.date || ''), amount: Number(p.amount) || 0, status: p.status === 'unpaid' ? 'unpaid' : 'paid'
    })) : []
  }));
}

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    clients = saved ? normalizeClients(JSON.parse(saved)) : normalizeClients(DEFAULT_CLIENTS);
    save();
  } catch {
    clients = normalizeClients(DEFAULT_CLIENTS);
    showToast('Dados salvos não puderam ser lidos. Dados de exemplo carregados.', 'error');
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch {
    showToast('Não foi possível salvar. O armazenamento do navegador pode estar cheio.', 'error');
  }
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
}
function formatDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '-';
  const [y,m,d] = value.split('-');
  return `${d}/${m}/${y}`;
}
function digits(value){return String(value || '').replace(/\D/g,'');}
function formatCPF(value){const v=digits(value); return v.length===11 ? v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4') : (value || '-');}
function formatPhone(value){const v=digits(value); if(v.length===11)return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`; if(v.length===10)return `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`; return value || '-';}
function getInitials(name){const parts=String(name).split(/\s+/).filter(Boolean); return ((parts[0]?.[0]||'')+(parts[1]?.[0]||'')).toUpperCase() || '?';}
function escapeHtml(value){return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}
function updateStats(){
  const paid = clients.filter(c => c.status === 'paid').length;
  const unpaid = clients.length - paid;
  const revenue = clients.reduce((sum,c) => sum + (c.status === 'paid' ? c.value : 0), 0);
  $('#statTotal').textContent = clients.length;
  $('#statPaid').textContent = paid;
  $('#statUnpaid').textContent = unpaid;
  $('#statRevenue').textContent = formatCurrency(revenue);
  $('#countAll').textContent = clients.length;
  $('#countPaid').textContent = paid;
  $('#countUnpaid').textContent = unpaid;
}

function getFiltered(){
  let list = [...clients];
  if(currentFilter !== 'all') list = list.filter(c => c.status === currentFilter);
  const q = currentSearch.trim().toLocaleLowerCase('pt-BR');
  if(q){
    list = list.filter(c => [c.name,c.email,c.cpf,c.company].some(v => String(v || '').toLocaleLowerCase('pt-BR').includes(q)));
  }
  return list.sort((a,b) => a.name.localeCompare(b.name,'pt-BR'));
}

function renderAlphaIndex(list){
  const container = $('#alphaIndex');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const available = new Set(list.map(c => c.name.trim().charAt(0).toUpperCase()));
  container.innerHTML = letters.map(letter => `<button type="button" class="alpha-letter ${currentAlpha===letter?'active':''} ${available.has(letter)?'':'disabled'}" data-letter="${letter}" ${available.has(letter)?'':'disabled'}>${letter}</button>`).join('');
  $$('.alpha-letter:not(:disabled)').forEach(btn => btn.addEventListener('click',()=>{currentAlpha=currentAlpha===btn.dataset.letter?null:btn.dataset.letter; renderList();}));
}

function avatarMarkup(client, large=false){
  if(client.photo) return `<img src="${escapeHtml(client.photo)}" alt="Foto de ${escapeHtml(client.name)}" loading="lazy">`;
  return `<span class="${large?'avatar-large':''}">${escapeHtml(getInitials(client.name))}</span>`;
}

function renderList(){
  const list = getFiltered();
  renderAlphaIndex(list);
  const container = $('#clientList');
  let visible = currentAlpha ? list.filter(c => c.name.trim().charAt(0).toUpperCase() === currentAlpha) : list;
  if(!visible.length){container.innerHTML='<div class="no-results">Nenhum cliente encontrado.</div>'; return;}
  let html=''; let currentLetter='';
  visible.forEach(client=>{
    const letter=client.name.trim().charAt(0).toUpperCase();
    if(letter!==currentLetter){currentLetter=letter;html+=`<div class="alpha-group-label">${escapeHtml(letter)}</div>`;}
    html+=`<button class="client-item ${selectedId===client.id?'active':''}" type="button" data-id="${client.id}">
      <span class="client-avatar">${avatarMarkup(client)}</span>
      <span class="client-info"><span class="client-name">${escapeHtml(client.name)}</span><span class="client-meta">${escapeHtml(client.company || client.email)}</span></span>
      <span class="status-dot ${client.status}" aria-label="${client.status==='paid'?'Pago':'Pendente'}"></span>
    </button>`;
  });
  container.innerHTML=html;
  $$('.client-item').forEach(item=>item.addEventListener('click',()=>{
    selectedId=Number(item.dataset.id); renderList(); renderDetail();
  }));
}

function renderDetail(){
  const panel=$('#detailPanel');
  const client=clients.find(c=>c.id===selectedId);
  if(!client){panel.innerHTML='<div class="empty-state"><div class="empty-icon">👤</div><h2>Selecione um cliente</h2><p>Escolha um cliente na lista para visualizar dados, pagamentos e ações.</p></div>';return;}
  const paidCount=(client.payments||[]).filter(p=>p.status==='paid').length;
  const unpaidCount=(client.payments||[]).filter(p=>p.status==='unpaid').length;
  const totalPaid=(client.payments||[]).filter(p=>p.status==='paid').reduce((sum,p)=>sum+p.amount,0);
  const totalPending=(client.payments||[]).filter(p=>p.status==='unpaid').reduce((sum,p)=>sum+p.amount,0);
  const payments=[...(client.payments||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date)));

  panel.innerHTML=`
    <section class="detail-card">
      <div class="detail-header">
        <div class="detail-photo">${avatarMarkup(client,true)}</div>
        <div class="detail-title">
          <h2>${escapeHtml(client.name)}</h2>
          <div class="company">${escapeHtml(client.position || '')}${client.position&&client.company?' • ':''}${escapeHtml(client.company || '')}</div>
          <div class="badges"><span class="status-badge ${client.status}"><span class="status-dot ${client.status}"></span>${client.status==='paid'?'Conta em dia':'Pagamento pendente'}</span><span class="status-badge category">${escapeHtml(client.category)}</span></div>
          <div class="detail-actions">
            <button class="btn btn-primary" id="btnEdit" type="button">✎ Editar</button>
            ${client.status==='unpaid' ? '<button class="btn btn-success" id="btnMarkPaid" type="button">✓ Marcar como pago</button>' : '<button class="btn btn-warning" id="btnMarkUnpaid" type="button">! Marcar como pendente</button>'}
            <button class="btn btn-secondary" id="btnPrint" type="button">🖨 Imprimir</button>
            <button class="btn btn-danger" id="btnDelete" type="button">Excluir</button>
          </div>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-item"><div class="label">CPF</div><div class="value">${escapeHtml(formatCPF(client.cpf))}</div></div>
        <div class="info-item"><div class="label">E-mail</div><div class="value">${escapeHtml(client.email)}</div></div>
        <div class="info-item"><div class="label">Telefone</div><div class="value">${escapeHtml(formatPhone(client.phone))}</div></div>
        <div class="info-item"><div class="label">Endereço</div><div class="value">${escapeHtml(client.address || '-')}</div></div>
        <div class="info-item"><div class="label">Data de cadastro</div><div class="value">${escapeHtml(formatDate(client.date))}</div></div>
        <div class="info-item"><div class="label">Valor mensal</div><div class="value">${escapeHtml(formatCurrency(client.value))}</div></div>
      </div>
    </section>

    <section class="detail-card">
      <div class="section-title">▣ Resumo financeiro</div>
      <div class="info-grid">
        <div class="info-item"><div class="label">Total pago</div><div class="value">${escapeHtml(formatCurrency(totalPaid))} (${paidCount}x)</div></div>
        <div class="info-item"><div class="label">Total pendente</div><div class="value">${escapeHtml(formatCurrency(totalPending))} (${unpaidCount}x)</div></div>
        <div class="info-item"><div class="label">Categoria</div><div class="value">${escapeHtml(client.category)}</div></div>
      </div>
    </section>

    <section class="detail-card">
      <div class="section-title">▣ Histórico de pagamentos</div>
      <div class="payment-history">
        ${payments.length ? payments.map(p=>`<div class="payment-item ${p.status}"><div class="date">${escapeHtml(formatDate(p.date))}</div><div class="amount">${escapeHtml(formatCurrency(p.amount))}</div><div class="status ${p.status}">${p.status==='paid'?'✓ Pago':'⏳ Pendente'}</div></div>`).join('') : '<div class="no-results">Nenhum pagamento registrado.</div>'}
      </div>
    </section>

    ${client.notes ? `<section class="detail-card"><div class="section-title">▣ Observações</div><div class="note">${escapeHtml(client.notes)}</div></section>` : ''}`;

  $('#btnEdit').addEventListener('click',()=>openModal(client));
  $('#btnDelete').addEventListener('click',()=>deleteClient(client.id));
  $('#btnPrint').addEventListener('click',()=>window.print());
  const paidButton=$('#btnMarkPaid'); const unpaidButton=$('#btnMarkUnpaid');
  if(paidButton) paidButton.addEventListener('click',()=>toggleStatus(client.id,'paid'));
  if(unpaidButton) unpaidButton.addEventListener('click',()=>toggleStatus(client.id,'unpaid'));
}

function monthKey(date){return String(date).slice(0,7);}
function toggleStatus(id,status){
  const client=clients.find(c=>c.id===id); if(!client) return;
  client.status=status; client.payments=Array.isArray(client.payments)?client.payments:[];
  const key=monthKey(todayLocal());
  const existing=client.payments.find(p=>monthKey(p.date)===key);
  if(existing){existing.status=status; existing.amount=client.value||0; existing.date=todayLocal();}
  else{client.payments.unshift({date:todayLocal(),amount:client.value||0,status});}
  save(); updateStats(); renderList(); renderDetail();
  showToast(status==='paid'?'Conta marcada como paga.':'Conta marcada como pendente.','success');
}

function deleteClient(id){
  const client=clients.find(c=>c.id===id); if(!client) return;
  if(!window.confirm(`Excluir o cliente "${client.name}"? Esta ação não pode ser desfeita.`)) return;
  clients=clients.filter(c=>c.id!==id); if(selectedId===id)selectedId=null; save(); updateStats(); renderList(); renderDetail(); showToast('Cliente excluído com sucesso.','success');
}

function updatePhotoPreview(){
  const preview=$('#photoPreview'); const name=$('#fName').value.trim();
  preview.innerHTML=tempPhoto ? `<img src="${escapeHtml(tempPhoto)}" alt="Pré-visualização">` : escapeHtml(getInitials(name));
}

function openModal(client=null){
  editingId=client?.id ?? null; tempPhoto=client?.photo || null;
  $('#modalTitle').textContent=client?'Editar cliente':'Novo cliente';
  $('#fName').value=client?.name || ''; $('#fCpf').value=client?.cpf || ''; $('#fEmail').value=client?.email || '';
  $('#fPhone').value=client?.phone || ''; $('#fCompany').value=client?.company || ''; $('#fPosition').value=client?.position || '';
  $('#fAddress').value=client?.address || ''; $('#fDate').value=client?.date || todayLocal(); $('#fValue').value=client?.value ?? '';
  $('#fStatus').value=client?.status || 'paid'; $('#fCategory').value=client?.category || 'Standard'; $('#fNotes').value=client?.notes || '';
  $('#photoInput').value=''; updatePhotoPreview(); $('#modal').classList.add('active'); $('#modal').setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; setTimeout(()=>$('#fName').focus(),50);
}
function closeModal(){ $('#modal').classList.remove('active'); $('#modal').setAttribute('aria-hidden','true'); editingId=null; tempPhoto=null; document.body.style.overflow=''; }

function saveClient(){
  const name=$('#fName').value.trim(); const email=$('#fEmail').value.trim();
  if(!name || !email){showToast('Preencha nome e e-mail.','error'); return;}
  const emailOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); if(!emailOk){showToast('Digite um e-mail válido.','error'); return;}
  const data={name,cpf:$('#fCpf').value.trim(),email,phone:$('#fPhone').value.trim(),company:$('#fCompany').value.trim(),position:$('#fPosition').value.trim(),address:$('#fAddress').value.trim(),date:$('#fDate').value||todayLocal(),value:Math.max(0,Number($('#fValue').value)||0),status:$('#fStatus').value==='unpaid'?'unpaid':'paid',category:$('#fCategory').value,notes:$('#fNotes').value.trim(),photo:tempPhoto};
  if(editingId){
    const index=clients.findIndex(c=>c.id===editingId);
    if(index<0)return;
    const old=clients[index]; clients[index]={...old,...data,payments:old.payments||[]};
    selectedId=editingId; showToast('Cliente atualizado com sucesso.','success');
  }else{
    const newId=clients.reduce((max,c)=>Math.max(max,Number(c.id)||0),0)+1;
    const newClient={id:newId,...data,payments:[]}; clients.push(newClient); selectedId=newId; showToast('Cliente cadastrado com sucesso.','success');
    if(data.status==='paid' && data.value>0) clients[clients.length-1].payments.push({date:data.date,amount:data.value,status:'paid'});
  }
  save(); updateStats(); renderList(); renderDetail(); closeModal();
}

function showToast(message,type=''){const t=$('#toast'); clearTimeout(toastTimer); t.textContent=message; t.className=`toast show ${type}`; toastTimer=setTimeout(()=>{t.className='toast';},2600);}


function htmlEscapeForReport(value){
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function buildPdfReportHtml(){
  const total=clients.length;
  const paid=clients.filter(c=>c.status==='paid').length;
  const unpaid=total-paid;
  const revenue=clients.reduce((sum,c)=>sum+(c.status==='paid'?Number(c.value)||0:0),0);
  const rows=clients.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(c=>{
    const payments=Array.isArray(c.payments)?c.payments:[];
    const paidTotal=payments.filter(p=>p.status==='paid').reduce((s,p)=>s+(Number(p.amount)||0),0);
    const pendingTotal=payments.filter(p=>p.status==='unpaid').reduce((s,p)=>s+(Number(p.amount)||0),0);
    return `<tr><td>${htmlEscapeForReport(c.name)}</td><td>${htmlEscapeForReport(c.email)}</td><td>${htmlEscapeForReport(formatPhone(c.phone))}</td><td>${htmlEscapeForReport(c.company||'-')}</td><td>${htmlEscapeForReport(c.category)}</td><td>${c.status==='paid'?'Pago':'Pendente'}</td><td class="money">${htmlEscapeForReport(formatCurrency(c.value))}</td><td class="money">${htmlEscapeForReport(formatCurrency(paidTotal))}</td><td class="money">${htmlEscapeForReport(formatCurrency(pendingTotal))}</td></tr>`;
  }).join('');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Backup de Clientes - ${todayLocal()}</title><style>
  *{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;margin:0;padding:28px;background:#fff}h1{margin:0 0 4px;font-size:24px}h2{margin:28px 0 10px;font-size:16px}.muted{color:#64748b;font-size:12px}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}.card{border:1px solid #e2e8f0;border-radius:10px;padding:12px;background:#f8fafc}.label{display:block;font-size:10px;text-transform:uppercase;color:#64748b;font-weight:bold;margin-bottom:5px}.value{font-size:18px;font-weight:bold}.table-wrap{overflow:visible}table{width:100%;border-collapse:collapse;font-size:9px}th,td{border:1px solid #dbe3ec;padding:6px;text-align:left;vertical-align:top}th{background:#eef2ff;color:#1e3a8a;font-size:9px}.money{text-align:right;white-space:nowrap}.footer{margin-top:18px;font-size:10px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:10px}@media print{body{padding:12mm}.summary{break-inside:avoid}table{page-break-inside:auto}tr{page-break-inside:avoid;page-break-after:auto}thead{display:table-header-group}}
  </style></head><body><h1>Backup de Dados — Gestão de Clientes</h1><div class="muted">Gerado em ${formatDate(todayLocal())} • ${total} cliente(s)</div><div class="summary"><div class="card"><span class="label">Total</span><span class="value">${total}</span></div><div class="card"><span class="label">Pagos</span><span class="value">${paid}</span></div><div class="card"><span class="label">Pendentes</span><span class="value">${unpaid}</span></div><div class="card"><span class="label">Receita mensal</span><span class="value">${htmlEscapeForReport(formatCurrency(revenue))}</span></div></div><h2>Clientes e situação financeira</h2><div class="table-wrap"><table><thead><tr><th>Cliente</th><th>E-mail</th><th>Telefone</th><th>Empresa</th><th>Categoria</th><th>Status</th><th>Mensalidade</th><th>Total pago</th><th>Total pendente</th></tr></thead><tbody>${rows||'<tr><td colspan="9">Nenhum cliente cadastrado.</td></tr>'}</tbody></table></div><div class="footer">Backup gerado pelo aplicativo Gestão de Clientes.</div></body></html>`;
}

async function exportPdf(){
  const html=buildPdfReportHtml();
  if(window.electronAPI?.isDesktop){
    const result=await window.electronAPI.printPdf(html);
    if(result?.ok) showToast('PDF salvo com sucesso.','success');
    else if(!result?.canceled) showToast(result?.error || 'Não foi possível salvar o PDF.','error');
    return;
  }
  const report=window.open('about:blank','_blank','width=1200,height=800,resizable=yes,scrollbars=yes');
  if(!report){showToast('Pop-up bloqueado. Libere pop-ups para este site e tente novamente.','error');return;}
  report.document.write(html + '<script>window.addEventListener("load",()=>setTimeout(()=>window.print(),350));<\\/script>');
  report.document.close();
  showToast('Relatório PDF preparado para salvar/imprimir.','success');
}

function exportData(){
  const blob=new Blob([JSON.stringify(clients,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`clientes-backup-${todayLocal()}.json`; a.click(); URL.revokeObjectURL(url); showToast('Backup exportado.','success');
}
function importData(file){
  const reader=new FileReader(); reader.onload=()=>{try{const data=normalizeClients(JSON.parse(reader.result)); if(!data.length){throw new Error('vazio');} clients=data; selectedId=null; save(); updateStats(); renderList(); renderDetail(); showToast('Backup restaurado com sucesso.','success');}catch{showToast('Arquivo de backup inválido.','error');}}; reader.readAsText(file);
}
function resetData(){
  if(!window.confirm('Restaurar os dados de exemplo? Seus dados atuais serão substituídos.')) return;
  clients=normalizeClients(DEFAULT_CLIENTS); selectedId=null; save(); updateStats(); renderList(); renderDetail(); showToast('Dados de exemplo restaurados.','success');
}

function wireEvents(){
  $('#btnBackupPdf').addEventListener('click',exportPdf);
  $('#searchInput').addEventListener('input',e=>{currentSearch=e.target.value;renderList();});
  $$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{$$('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentFilter=btn.dataset.filter;currentAlpha=null;renderList();}));
  $('#btnAdd').addEventListener('click',()=>openModal()); $('#modalClose').addEventListener('click',closeModal); $('#modalCancel').addEventListener('click',closeModal);
  $('#clientForm').addEventListener('submit',e=>{e.preventDefault();saveClient();});
  $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && $('#modal').classList.contains('active'))closeModal();});
  $('#photoInput').addEventListener('change',e=>{const file=e.target.files?.[0]; if(!file)return; if(file.size>2*1024*1024){showToast('A foto deve ter no máximo 2 MB.','error');e.target.value='';return;} const reader=new FileReader(); reader.onload=ev=>{tempPhoto=String(ev.target.result||'');updatePhotoPreview();}; reader.readAsDataURL(file);});
  $('#removePhoto').addEventListener('click',()=>{tempPhoto=null;$('#photoInput').value='';updatePhotoPreview();}); $('#fName').addEventListener('input',updatePhotoPreview);
  $('#fCpf').addEventListener('input',e=>{let v=digits(e.target.value).slice(0,11);v=v.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');e.target.value=v;});
  $('#fPhone').addEventListener('input',e=>{let v=digits(e.target.value).slice(0,11); if(v.length>10)v=`${v.slice(0,2)}${v.slice(2,7)}${v.slice(7)}`; e.target.value=v.length===11?`(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`:v.length>6?`(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`:v;});
  // Backup e restauração ficam disponíveis no menu de contexto do título.
  $('.logo').title='Use o botão Backup PDF para gerar um relatório ou Ctrl+Shift+B para exportar JSON.';
  document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='b'){e.preventDefault();exportData();} if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='r'){e.preventDefault();resetData();}});
}

load(); updateStats(); renderList(); wireEvents();
