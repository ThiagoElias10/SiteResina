const WHATSAPP = '5500000000000';

const CATEGORIAS = {
  resina: 'Resina',
  domino: 'Cadernos Domino',
  canetas: 'Canetas e Marcadores',
  acessorios: 'Acessórios',
  personalizados: 'Personalizados'
};

const CORES_IMG = [
  'linear-gradient(135deg, #f6e3cf, #e8c8a4)',
  'linear-gradient(135deg, #e0e8f6, #b8c8e8)',
  'linear-gradient(135deg, #f3e6f8, #dcc4e8)',
  'linear-gradient(135deg, #e8f6ee, #b8dfc9)',
  'linear-gradient(135deg, #fde8e8, #f0bfbf)',
  'linear-gradient(135deg, #f9efd9, #ecd9a8)'
];

const PRODUTOS_BASE = [
  {
    id: 1, nome: 'Porta-Canetas de Resina', categoria: 'resina',
    descricao: 'Porta-canetas artesanal em resina epóxi, brilho cristalino e bordas lisas. Perfeito para mesa de estudos ou presente.',
    preco: 49.90, tags: ['Feito à mão', 'Brilho cristal'],
    emoji: '🖌️'
  },
  {
    id: 2, nome: 'Chaveiro Flor de Resina', categoria: 'resina',
    descricao: 'Chaveiro delicado com flor preservada dentro da resina. Disponível em rosa, lilás e branco.',
    preco: 19.90, tags: ['Flor preservada', 'Macio ao toque'],
    emoji: '🌸'
  },
  {
    id: 3, nome: 'Base Quadrada de Resina', categoria: 'resina',
    descricao: 'Bandeja/base decorativa em resina com pigmentos terrosos. Ideal para enfeitar mesas e prateleiras.',
    preco: 35.00, tags: ['Pigmento artesanal', 'Lavável'],
    emoji: '🧪'
  },
  {
    id: 4, nome: 'Caderno Domino Decorado', categoria: 'domino',
    descricao: 'Caderno Domino 1 matéria capa dura personalizada com detalhe em resina e furação artesanal.',
    preco: 59.90, tags: ['Capa dura', '1 matéria'],
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
    id: 7, nome: 'Marcador de Página Resinado', categoria: 'canetas',
    descricao: 'Marcador de página de acrílico com detalhe em resina metálica. Não desbota e não amassa.',
    preco: 12.50, tags: ['Metálico', 'Resistente'],
    emoji: '🔖'
  },
  {
    id: 8, nome: 'Caneta Gel Personalizada', categoria: 'canetas',
    descricao: 'Caneta gel com acabamento em resina na cor de sua escolha. Nome gravado sob encomenda.',
    preco: 9.90, tags: ['Nome gravado', 'Acabamento resina'],
    emoji: '🖊️'
  },
  {
    id: 9, nome: 'Pincel de Decoração', categoria: 'canetas',
    descricao: 'Kit com 3 pincéis de decoração para scrapbook e lettering, com cabo resinado.',
    preco: 27.90, tags: ['Kit 3x', 'Lettering'],
    emoji: '🖍️'
  },
  {
    id: 10, nome: 'Organizador de Mesa', categoria: 'acessorios',
    descricao: 'Organizador de mesa em acrílico com detalhes de resina. Deixa tudo no lugar com estilo.',
    preco: 44.90, tags: ['Acrílico', '4 compartimentos'],
    emoji: '🗄️'
  },
  {
    id: 11, nome: 'Luminária de Resina com Flores', categoria: 'acessorios',
    descricao: 'Base luminosa em resina com flores preservadas. Luz quente e ambiente aconchegante.',
    preco: 89.90, tags: ['Flores preservadas', 'Luz quente'],
    emoji: '🪔'
  },
  {
    id: 12, nome: 'Porta-Retrato Personalizado', categoria: 'personalizados',
    descricao: 'Porta-retrato decorado com resina, nome e cores à sua escolha. Edição única para presentear.',
    preco: 42.00, tags: ['Sob encomenda', 'Nome gravado'],
    oldPreco: 52.00, emoji: '🖼️'
  },
  {
    id: 13, nome: 'Caixa de Memórias em Resina', categoria: 'personalizados',
    descricao: 'Caixa personalizada para guardar memórias (fotos, bilhetes, lembranças) com tampa resinada.',
    preco: 79.00, tags: ['Sob encomenda', 'Tampa resinada'],
    emoji: '📦'
  }
];

let categoriaAtiva = 'todos';
let produtos = [];

function carregar() {
  const data = localStorage.getItem('encanto_resina_produtos');
  produtos = data ? JSON.parse(data) : PRODUTOS_BASE;
  localStorage.setItem('encanto_resina_produtos', JSON.stringify(produtos));
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
        <span class="prod-emoji">${p.emoji}</span>
        ${p.oldPreco ? '<span class="card-sale">OFERTA</span>' : ''}
      </div>
      <div class="card-body">
        <span class="card-cat">${escapar(CATEGORIAS[p.categoria] || '')}</span>
        <h3 class="card-titulo">${escapar(p.nome)}</h3>
        <p class="card-desc">${escapar(p.descricao)}</p>
        <p class="card-price">
          ${p.oldPreco ? '<small>' + formatarPreco(p.oldPreco) + ' &rarr;</small>' : ''}
          ${formatarPreco(p.preco)}
        </p>
      </div>
    </div>
  `).join('');
}

function abrirModal(id) {
  const p = produtos.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalImg').innerHTML = '<span class="prod-emoji">' + p.emoji + '</span>';
  document.getElementById('modalImg').style.background = corPorId(p.id);
  document.getElementById('modalTitulo').textContent = p.nome;
  document.getElementById('modalCat').textContent = CATEGORIAS[p.categoria] || '';
  document.getElementById('modalDesc').textContent = p.descricao;
  document.getElementById('modalPrice').innerHTML =
    (p.oldPreco ? '<small>' + formatarPreco(p.oldPreco) + ' &rarr;</small>' : '') +
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