const WHATSAPP = '5500000000000';

const CATEGORIAS = {
  resina: 'Resina',
  domino: 'Cadernos Domino',
  canetas: 'Canetas e Marcadores',
  acessorios: 'Acessorios'
};

const CORES_IMG = [
  'linear-gradient(135deg, #f6e3cf, #e8c8a4)',
  'linear-gradient(135deg, #e3e9f7, #bcc6e0)',
  'linear-gradient(135deg, #f3e6f8, #dcc4e8)',
  'linear-gradient(135deg, #e8f6ee, #b8dfc9)',
  'linear-gradient(135deg, #fde8e8, #f0bfbf)'
];

const PRODUTOS_BASE = [
  {
    id: 1, nome: 'Porta-Canetas de Resina', categoria: 'resina',
    descricao: 'Porta-canetas artesanal em resina epoxi, brilho cristalino e bordas lisas. Perfeito para mesa de estudos ou presente.',
    preco: 49.90, tags: ['Feito a mao', 'Brilho cristal'],
    emoji: '🖌️'
  },
  {
    id: 2, nome: 'Chaveiro Flor de Resina', categoria: 'resina',
    descricao: 'Chaveiro delicado com flor preservada dentro da resina. Disponivel em rosa, lilas e branco.',
    preco: 19.90, tags: ['Flor preservada', 'Macio ao toque'],
    emoji: '🌸'
  },
  {
    id: 3, nome: 'Base Quadrada de Resina', categoria: 'resina',
    descricao: 'Bandeja/base decorativa em resina com pigmentos terrosos. Ideal para enfeitar mesas e prateleiras.',
    preco: 35.00, tags: ['Pigmento artesanal', 'Lavadavel'],
    emoji: '🧪'
  },
  {
    id: 4, nome: 'Caderno Domino Decorado', categoria: 'domino',
    descricao: 'Caderno Domino 1 materia capa dura personalizada com capa de resina e furacao artesanal.',
    preco: 59.90, tags: ['Capa dura', '1 materia'],
    emoji: '📓'
  },
  {
    id: 5, nome: 'Caderno Domino Planner', categoria: 'domino',
    descricao: 'Planner Domino com marcadores coloridos, capa personalizada e acabamento reforçado com resina.',
    preco: 74.90, tags: ['Planner anual', 'Marcadores inclusos'],
    emoji: '📅'
  },
  {
    id: 6, nome: 'Kit Cadernos Domino 2x', categoria: 'domino',
    descricao: 'Kit com dois cadernos Domino personalizados (escolha as cores na mesa). Excelente para presente.',
    preco: 109.00, tags: ['Kit presente', '2 unidades'],
    oldPreco: 129.00, emoji: '📚'
  },
  {
    id: 7, nome: 'Marcador de Pagina Resinado', categoria: 'canetas',
    descricao: 'Marcador de pagina de acrilico com detalhe em resina metálica. Nao desbota e nao amassa.',
    preco: 12.50, tags: ['Metalico', 'Resistente'],
    emoji: '🔖'
  },
  {
    id: 8, nome: 'Caneta Gel Personalizada', categoria: 'canetas',
    descricao: 'Caneta gel com acabamento em resina escolha a cor. Nome gravado sob encomenda.',
    preco: 9.90, tags: ['Nome gravado', 'Acabamento resina'],
    emoji: '🖊️'
  },
  {
    id: 9, nome: 'Pincel de Decoracao', categoria: 'canetas',
    descricao: 'Kit com 3 pinceis de decoracao para scrapbook e lettering, com cabo resinado.',
    preco: 27.90, tags: ['Kit 3x', 'Lettering'],
    emoji: '🖍️'
  },
  {
    id: 10, nome: 'Organizador de Mesa', categoria: 'acessorios',
    descricao: 'Organizador de mesa em acrilico com detalhes de resina. Deixa tudo no lugar com estilo.',
    preco: 44.90, tags: ['Acrilico', '4 compartimentos'],
    emoji: '🗄️'
  }
];

let categoriaAtiva = 'todos';
let produtos = [];

function carregar() {
  const data = localStorage.getItem('resina_catalogo_produtos');
  produtos = data ? JSON.parse(data) : PRODUTOS_BASE;
  localStorage.setItem('resina_catalogo_produtos', JSON.stringify(produtos));
}

function escapar(texto) {
  const d = document.createElement('div');
  d.textContent = texto;
  return d.innerHTML;
}

function corPorId(id) {
  return CORES_IMG[id % CORES_IMG.length];
}

function formatarPreco(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}

function render() {
  const busca = (document.getElementById('searchInput').value || '').toLowerCase().trim();
  let lista = produtos;

  if (categoriaAtiva !== 'todos') {
    lista = lista.filter(p => p.categoria === categoriaAtiva);
  }
  if (busca) {
    lista = lista.filter(p =>
      p.nome.toLowerCase().includes(busca) ||
      p.descricao.toLowerCase().includes(busca) ||
      p.tags.join(' ').toLowerCase().includes(busca)
    );
  }

  const grid = document.getElementById('grid');
  document.getElementById('emptyState').style.display = lista.length ? 'none' : 'block';
  document.getElementById('resultCount').textContent =
    lista.length + (lista.length === 1 ? ' produto' : ' produtos');

   grid.innerHTML = lista.map((p, i) => `
    <div class="card" style="animation-delay:${Math.min(i * 60, 600)}ms" onclick="abrirModal(${p.id})">
      <div class="card-img" style="background:${corPorId(p.id)}">
        ${p.emoji}
        ${p.oldPreco ? '<span class="card-sale">OFERTA</span>' : ''}
      </div>
      <div class="card-body">
        <span class="card-cat">${escapar(CATEGORIAS[p.categoria] || '')}</span>
        <h3 class="card-titulo">${escapar(p.nome)}</h3>
        <p class="card-desc">${escapar(p.descricao)}</p>
        <p class="card-price">
          ${p.oldPreco ? '<small>' + formatarPreco(p.oldPreco) + ' &rarr; </small>' : ''}
          ${formatarPreco(p.preco)}
        </p>
      </div>
    </div>
  `).join('');
}

function abrirModal(id) {
  const p = produtos.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalImg').textContent = p.emoji;
  document.getElementById('modalImg').style.background = corPorId(p.id);
  document.getElementById('modalTitulo').textContent = p.nome;
  document.getElementById('modalCat').textContent = CATEGORIAS[p.categoria] || '';
  document.getElementById('modalDesc').textContent = p.descricao;
  document.getElementById('modalPrice').innerHTML =
    (p.oldPreco ? '<small>' + formatarPreco(p.oldPreco) + ' &rarr; </small>' : '') +
    formatarPreco(p.preco);

  document.getElementById('modalTags').innerHTML =
    (p.tags || []).map(t => '<span class="tag">' + escapar(t) + '</span>').join('');

  const msg = encodeURIComponent(
    'Olá! Quero pedir: *' + p.nome + '* (' + formatarPreco(p.preco) + ')'
  );
  document.getElementById('whatsBtn').href = 'https://wa.me/' + WHATSAPP + '?text=' + msg;

  document.getElementById('modal').classList.add('show');
}

function fecharModal() {
  document.getElementById('modal').classList.remove('show');
}

document.getElementById('searchInput').addEventListener('input', render);

document.querySelectorAll('.cat').forEach(btn => {
  btn.addEventListener('click', () => {
    categoriaAtiva = btn.dataset.cat;
    document.querySelectorAll('.cat').forEach(b => b.classList.toggle('active', b === btn));
    render();
  });
});

document.getElementById('modalClose').addEventListener('click', fecharModal);
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) fecharModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal();
});

carregar();
render();