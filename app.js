/* ═══════════════════════════════════════════
   IA na Sala dos Professores — app.js
   Versão expandida com conteúdo do MEC
   ═══════════════════════════════════════════ */

// ═══ PROMPTS DATA ═══
const PROMPTS = [
  { cat: 'planejamento', tag: 'Plano básico',      text: 'Crie um plano de aula de [duração] sobre [tema] para [ano/série] de [disciplina]. Inclua: objetivo, materiais, etapas e forma de avaliar a compreensão.' },
  { cat: 'planejamento', tag: 'Semana completa',   text: 'Crie uma sequência de 5 aulas sobre [tema] para [ano/série], com progressão de dificuldade. Cada aula deve ter 50 minutos e uma atividade prática.' },
  { cat: 'planejamento', tag: 'Sem recursos',      text: 'Crie um plano de aula sobre [tema] para [ano/série] sem usar projetor, internet ou impressora. Apenas lousa e caderno.' },
  { cat: 'planejamento', tag: 'Turma difícil',     text: 'Crie um plano de aula dinâmico sobre [tema] para turma agitada do [ano/série]. Atividades curtas e mudanças de ritmo a cada 10-15 minutos.' },
  { cat: 'planejamento', tag: 'Interdisciplinar',  text: 'Crie uma aula que conecte [disciplina 1] e [disciplina 2] usando o tema [tema]. Para [ano/série].' },
  { cat: 'planejamento', tag: 'Inclusão',          text: 'Adapte este plano de aula para incluir um aluno com [dislexia / TDAH / deficiência visual]. Mesmo objetivo, estratégias diferenciadas.' },
  { cat: 'planejamento', tag: 'Revisão rápida',    text: 'Crie uma atividade de revisão de 15 minutos sobre [tema] para o início da aula. Deve ser dinâmica e cobrir os principais pontos.' },
  { cat: 'planejamento', tag: 'IA desplugada',     text: 'Crie uma atividade sobre [tema de IA, ex: algoritmos / vieses / dados] que os alunos do [ano/série] consigam fazer SEM computador ou internet. Use jogos, cartões ou encenações.' },
  { cat: 'atividades', tag: 'Exercícios',          text: 'Crie 10 exercícios sobre [tema] para [ano/série], com dificuldade crescente. Inclua gabarito no final.' },
  { cat: 'atividades', tag: 'Múltipla escolha',    text: 'Crie 8 questões de múltipla escolha com 4 alternativas sobre [tema] para [ano/série]. Gabarito comentado ao final.' },
  { cat: 'atividades', tag: 'Dissertativas',       text: 'Crie 5 questões dissertativas sobre [tema] para [ano/série]. Inclua o que esperar em cada resposta (critérios de correção).' },
  { cat: 'atividades', tag: 'Três níveis',         text: 'Crie 3 versões do mesmo exercício sobre [tema]: fácil (alunos com dificuldade), médio (maioria) e difícil (alunos avançados).' },
  { cat: 'atividades', tag: 'Cotidiano',           text: 'Crie 5 problemas sobre [tema] usando situações do cotidiano de adolescentes de [região/contexto]. Evite exemplos artificiais.' },
  { cat: 'atividades', tag: 'Completar lacunas',   text: 'Crie um texto sobre [tema] com 10 lacunas para completar. Para [ano/série]. Inclua banco de palavras e gabarito.' },
  { cat: 'atividades', tag: 'Relacionar colunas',  text: 'Crie um exercício de relacionar colunas sobre [tema] com 10 pares (conceito + definição). Para [ano/série]. Com gabarito.' },
  { cat: 'atividades', tag: 'Tarefa de casa',      text: 'Crie uma tarefa de casa sobre [tema] que alunos do [ano/série] consigam fazer sozinhos, sem internet. Máximo 20 minutos.' },
  { cat: 'atividades', tag: 'Alfabetização IA',    text: 'Crie uma atividade prática para alunos do [ano/série] identificarem ao menos 3 sistemas de IA que usam no dia a dia (ex: recomendação de vídeos, filtro de spam). Peça para explicarem o que imaginam que acontece "por dentro".' },
  { cat: 'atividades', tag: 'Viés algorítmico',    text: 'Crie uma atividade para o [ano/série] discutir o conceito de viés em IA. Use exemplos de sistemas de reconhecimento facial ou recomendação e peça para os alunos refletirem sobre impactos na vida real.' },
  { cat: 'provas', tag: 'Prova completa',          text: 'Crie uma prova sobre [tema] para [ano/série] com: 5 questões objetivas, 3 de interpretação e 2 dissertativas. Total 10 pontos. Gabarito e rubrica ao final.' },
  { cat: 'provas', tag: 'Simulado',                text: 'Crie um simulado de 20 questões estilo ENEM sobre [disciplina], cobrindo: [lista de temas]. Com gabarito.' },
  { cat: 'provas', tag: 'Autoavaliação',           text: 'Crie um formulário de autoavaliação para alunos do [ano/série] refletirem sobre seu aprendizado no bimestre. 10 perguntas, linguagem acessível.' },
  { cat: 'provas', tag: 'Recuperação',             text: 'Crie uma atividade de recuperação sobre [tema] para alunos que não atingiram a média. Nível acessível, com exemplos antes dos exercícios.' },
  { cat: 'provas', tag: 'Avaliação oral',          text: 'Crie 10 perguntas para avaliação oral sobre [tema] para [ano/série]. Da mais fácil para a mais complexa. Com o que esperar em cada resposta.' },
  { cat: 'provas', tag: 'Análise de erros',        text: 'Os alunos erraram muito as questões [descreva quais]. O que isso indica? Crie 3 atividades de reforço específicas para esses erros.' },
  { cat: 'correcao', tag: 'Feedback redação',      text: 'Corrija esta redação de aluno do [ano/série] sobre [tema]. Aponte o que está bom primeiro, depois o que melhorar. Linguagem encorajadora. [cole o texto]' },
  { cat: 'correcao', tag: 'Feedback coletivo',     text: 'Analisei estas 5 respostas sobre [questão]. Identifique os erros mais comuns e escreva uma devolutiva coletiva clara para a turma. [cole as respostas]' },
  { cat: 'correcao', tag: 'Rubrica',               text: 'Crie uma rubrica de correção para [redação/projeto/apresentação] sobre [tema] para [ano/série]. Com 4 níveis de desempenho e critérios claros.' },
  { cat: 'correcao', tag: 'Perguntas orientadoras',text: 'Um aluno escreveu isto: [texto]. Não corrija diretamente — escreva perguntas orientadoras que o ajudem a perceber e corrigir os próprios erros.' },
  { cat: 'correcao', tag: 'Análise de desempenho', text: 'Com base nos erros mais comuns da turma [descreva], identifique lacunas de aprendizagem e sugira estratégias de remediação específicas.' },
  { cat: 'correcao', tag: 'Comentário boletim',    text: 'Escreva um comentário para o boletim do aluno [perfil breve]. Tom profissional, empático e construtivo. Máximo 3 linhas.' },
  { cat: 'correcao', tag: 'Elogio personalizado',  text: 'Escreva 5 modelos de elogio escrito para atividades de alunos, variando o foco: esforço, criatividade, melhora, ajudar colegas e conclusão de desafio difícil.' },
  { cat: 'engajamento', tag: 'Gancho de aula',     text: 'Crie 3 formas criativas de introduzir o tema [tema] para alunos do [ano/série] que gostam de [interesses]. Duração máxima: 5 minutos cada.' },
  { cat: 'engajamento', tag: 'Quiz rápido',        text: 'Crie um quiz de 10 perguntas sobre [tema] para revisão dinâmica. Formato pergunta + 4 alternativas. Para tornar competitivo em sala.' },
  { cat: 'engajamento', tag: 'Debate IA e ética',  text: 'Crie um roteiro de debate para [ano/série] sobre o tema: "Devemos confiar nas decisões da IA?". Com argumentos para os dois lados, exemplos concretos e perguntas mediadoras.' },
  { cat: 'engajamento', tag: 'História pedagógica',text: 'Crie uma história curta (1 página) que apresenta o conceito de [conceito] de forma envolvente para [ano/série]. Com personagens jovens e situações cotidianas.' },
  { cat: 'engajamento', tag: 'Contextualização',   text: 'Como posso relacionar o tema [tema] com [redes sociais / games / música / esporte]? Dê 5 exemplos práticos para usar em aula.' },
  { cat: 'engajamento', tag: 'Gincana',            text: 'Crie uma gincana educativa sobre [tema] para [ano/série] em 30 minutos em sala. Equipes de 5 alunos. Com sistema de pontuação.' },
  { cat: 'engajamento', tag: 'Desafio extra',      text: 'Crie 3 desafios opcionais sobre [tema] para alunos que terminam antes. Que desenvolvam pensamento crítico e criatividade.' },
  { cat: 'comunicacao', tag: 'Comunicado pais',    text: 'Escreva um comunicado para pais sobre [reunião/evento/tarefa/comportamento]. Tom cordial e claro. Escola: [nome]. Turma: [turma].' },
  { cat: 'comunicacao', tag: 'Relatório de aluno', text: 'Escreva um relatório pedagógico do aluno com este perfil: [participação, dificuldades, pontos fortes, comportamento]. Tom profissional e construtivo.' },
  { cat: 'comunicacao', tag: 'Carta início de ano',text: 'Escreva uma carta de apresentação para alunos do [ano/série] no início do ano. Tom acolhedor, que gere expectativa positiva e apresente regras de forma gentil.' },
  { cat: 'comunicacao', tag: 'Reunião de pais',    text: 'Crie um roteiro para reunião de pais do [ano/série] com duração de [X minutos], abordando: [temas]. Com tempo estimado para cada parte.' },
  { cat: 'comunicacao', tag: 'Bilhete de elogio',  text: 'Escreva 5 bilhetes de elogio para os pais, destacando: esforço, melhora na nota, ajudar colegas, participação e entrega de trabalhos.' },
  { cat: 'comunicacao', tag: 'Bilhete de alerta',  text: 'Escreva um bilhete para os pais sobre [comportamento preocupante]. Tom respeitoso, sem condenar. Sugerindo parceria família-escola.' },
  { cat: 'comunicacao', tag: 'Ata de reunião',     text: 'Com base nestas informações [descreva o que foi discutido], escreva uma ata de reunião pedagógica formal, clara e completa.' },
  { cat: 'comunicacao', tag: 'Plano de recuperação',text: 'Crie um plano de recuperação para aluno com dificuldade em [área/tema]. Com atividades progressivas, estratégias diferenciadas e metas por semana.' },
  { cat: 'ia_mec', tag: 'Discussão sobre IA',      text: 'Crie um roteiro de discussão para alunos do [ano/série] sobre a pergunta: "O que é Inteligência Artificial e onde ela aparece na minha vida?". Inclua exemplos concretos do cotidiano jovem e 5 perguntas para debate em grupo.' },
  { cat: 'ia_mec', tag: 'Privacidade de dados',    text: 'Crie uma atividade prática para o [ano/série] sobre privacidade de dados. Peça que os alunos listem quais dados pessoais compartilham nos apps que usam e reflitam sobre os riscos. Conecte com a LGPD de forma acessível.' },
  { cat: 'ia_mec', tag: 'Pensamento computacional',text: 'Crie uma atividade desplugada (sem computador) de pensamento computacional para o [ano/série] sobre o tema [tema]. Use sequências, decomposição de problemas e reconhecimento de padrões com materiais físicos.' },
  { cat: 'ia_mec', tag: 'Fake news e IA',         text: 'Crie uma atividade para o [ano/série] sobre como a IA generativa pode criar desinformação. Inclua exemplos de deepfake e textos gerados por IA, com perguntas para análise crítica.' },
  { cat: 'ia_mec', tag: 'IA e trabalho futuro',    text: 'Crie um debate estruturado para o Ensino Médio sobre "Como a IA vai mudar as profissões?". Com pesquisa prévia, argumentação e proposta de como se preparar.' },
  { cat: 'ia_mec', tag: 'Ciclo de vida da IA',     text: 'Crie um projeto interdisciplinar para o [ano/série] sobre o impacto ambiental da IA (datacenters, energia, água, mineração de metais). Conecte com Geografia e Ciências.' },
  { cat: 'ia_mec', tag: 'Avaliação com IA',        text: 'Prepare uma rubrica de avaliação para um projeto onde os alunos do [ano/série] usaram IA como ferramenta de apoio. Avalie: pensamento crítico sobre a ferramenta, qualidade do resultado final e processo de trabalho.' },
  { cat: 'ia_mec', tag: 'Autodiagnóstico docente', text: 'Crie um questionário de autoavaliação para professores identificarem seu nível de letramento em IA. Baseie nas dimensões: compreensão técnica básica, uso pedagógico, proteção de dados e bem-estar digital.' },
];

const CAT_LABELS = {
  todos:        'Todos',
  planejamento: '📅 Planejamento',
  atividades:   '📝 Atividades',
  provas:       '📊 Provas',
  correcao:     '✔️ Correção',
  engajamento:  '⚡ Engajamento',
  comunicacao:  '📧 Comunicação',
  ia_mec:       '🏛️ IA na Escola (MEC)',
};

// ═══ SIDEBAR STRUCTURE ═══
const SIDEBAR_STRUCTURE = [
  {
    section: 'MÓDULOS PRÁTICOS',
    items: [
      { id: 'mod1', icon: '🚀', num: '1', text: 'Começando sem complicação' },
      { id: 'mod2', icon: '📅', num: '2', text: 'Planejamento em minutos' },
      { id: 'mod3', icon: '📝', num: '3', text: 'Atividades e provas' },
      { id: 'mod4', icon: '✔️', num: '4', text: 'Correção com IA' },
      { id: 'mod5', icon: '⚡', num: '5', text: 'Engajamento rápido' },
      { id: 'mod6', icon: '🎁', num: '6', text: 'Kit pronto' },
    ]
  },
  {
    section: 'FUNDAMENTOS DO MEC',
    items: [
      { id: 'mec1', icon: '🏛️', num: 'A', text: 'O que é IA na educação?' },
      { id: 'mec2', icon: '📚', num: 'B', text: '12 aprendizagens fundamentais' },
      { id: 'mec3', icon: '⚖️', num: 'C', text: 'Riscos, oportunidades e ética' },
      { id: 'mec4', icon: '👩‍🏫', num: 'D', text: 'Formação de professores' },
      { id: 'mec5', icon: '🛡️', num: 'E', text: 'LGPD, ECA Digital e direitos' },
    ]
  }
];

// Track completed lessons
const completed = new Set(JSON.parse(localStorage.getItem('ia_completed') || '[]'));

// ═══ SIDEBAR RENDER ═══
function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  if (!nav) return;

  let html = '';
  SIDEBAR_STRUCTURE.forEach(group => {
    html += `<div class="sidebar-section">
      <div class="sidebar-section-title">${group.section}</div>`;
    group.items.forEach(item => {
      const done = completed.has(item.id);
      html += `<button class="sidebar-item" data-id="${item.id}" onclick="showLesson('${item.id}')">
        <span class="sidebar-item-num">${item.num}</span>
        <span class="sidebar-item-icon">${item.icon}</span>
        <span class="sidebar-item-text">${item.text}</span>
        ${done ? '<span class="sidebar-item-check">✓</span>' : ''}
      </button>`;
    });
    html += '</div>';
  });

  nav.innerHTML = html;
  updateProgress();
}

function updateProgress() {
  const total = SIDEBAR_STRUCTURE.reduce((acc, g) => acc + g.items.length, 0);
  const pct = Math.round((completed.size / total) * 100);
  const fill = document.getElementById('progressFill');
  const pctEl = document.getElementById('progressPct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

function markComplete(id) {
  completed.add(id);
  try { localStorage.setItem('ia_completed', JSON.stringify([...completed])); } catch(e) {}
  renderSidebar();
  showLesson(id); // re-highlight active
}

// ═══ LESSON NAVIGATION ═══
const ALL_LESSON_IDS = SIDEBAR_STRUCTURE.flatMap(g => g.items.map(i => i.id));

function showLesson(id) {
  // Switch main page to 'modulos'
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const modPage = document.getElementById('page-modulos');
  if (modPage) modPage.classList.add('active');
  document.querySelectorAll('.nav-btn')[1]?.classList.add('active');

  // Update sidebar active state
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`.sidebar-item[data-id="${id}"]`)?.classList.add('active');

  // Show lesson block
  document.querySelectorAll('.lesson-block').forEach(el => {
    el.style.display = el.dataset.lessonId === id ? '' : 'none';
  });

  // Scroll top
  window.scrollTo({ top: 60, behavior: 'smooth' });

  // Update nav buttons
  const idx = ALL_LESSON_IDS.indexOf(id);
  const prevBtn = document.getElementById('prevLessonBtn');
  const nextBtn = document.getElementById('nextLessonBtn');
  if (prevBtn) prevBtn.disabled = idx <= 0;
  if (nextBtn) nextBtn.disabled = idx >= ALL_LESSON_IDS.length - 1;
  if (prevBtn) prevBtn.onclick = () => showLesson(ALL_LESSON_IDS[idx - 1]);
  if (nextBtn) nextBtn.onclick = () => { markComplete(id); showLesson(ALL_LESSON_IDS[idx + 1]); };

  // Update breadcrumb
  const crumbEl = document.getElementById('contentBreadcrumb');
  const titleEl = document.getElementById('contentTitle');
  const found = SIDEBAR_STRUCTURE.flatMap(g => g.items).find(i => i.id === id);
  if (found && crumbEl) {
    const section = SIDEBAR_STRUCTURE.find(g => g.items.some(i => i.id === id));
    crumbEl.innerHTML = `${section?.section || 'MÓDULO'} <span>›</span> ${found.text}`;
  }
}

function showFirstLesson() {
  showLesson(ALL_LESSON_IDS[0]);
}

// ═══ NAVIGATION (PAGES) ═══
function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (btn && btn.classList) btn.classList.add('active');

  if (id === 'modulos' && !document.querySelector('.sidebar-item.active')) {
    showFirstLesson();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPageSelect(val) {
  const btns = document.querySelectorAll('.nav-btn');
  const map = { visao: 0, modulos: 1, prompts: 2, desafio: 3 };
  showPage(val, btns[map[val]]);
}

// ═══ COPY PROMPT ═══
function copyPrompt(btn) {
  const pre = btn.previousElementSibling || btn.parentElement.querySelector('pre');
  navigator.clipboard.writeText(pre.textContent).catch(() => {});
  btn.textContent = '✓ Copiado!';
  btn.classList.add('copied');
  setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2200);
}

// ═══ COPY CARD ═══
function copyCard(el) {
  const text = el.querySelector('.prompt-text').textContent;
  navigator.clipboard.writeText(text).catch(() => {});
  el.classList.add('copied');
  el.querySelector('.prompt-card-copy').textContent = '✅';
  setTimeout(() => {
    el.classList.remove('copied');
    el.querySelector('.prompt-card-copy').textContent = '📋';
  }, 1800);
}

// ═══ RENDER PROMPTS ═══
function renderPrompts(cat) {
  const container = document.getElementById('promptsContainer');
  if (!container) return;
  const cats = cat === 'todos'
    ? ['planejamento','atividades','provas','correcao','engajamento','comunicacao','ia_mec']
    : [cat];

  let html = '';
  cats.forEach(c => {
    const items = PROMPTS.filter(p => p.cat === c);
    if (!items.length) return;
    html += `<div class="prompts-section" data-cat="${c}">
      <div class="prompts-section-title">
        ${CAT_LABELS[c]}
        <span style="margin-left:auto;font-size:11px;font-weight:400;color:var(--text-dim)">${items.length} prompts</span>
      </div>
      <div class="prompts-grid">
        ${items.map(p => `
          <div class="prompt-card" onclick="copyCard(this)" title="Clique para copiar">
            <div class="prompt-tag">${p.tag}</div>
            <div class="prompt-text">${p.text}</div>
            <div class="prompt-card-copy">📋</div>
          </div>
        `).join('')}
      </div>
    </div>`;
  });

  container.innerHTML = html;
}

function filterPrompts(cat, btn) {
  document.querySelectorAll('#promptFilter .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderPrompts(cat);
}

// ═══ CHALLENGE DAYS ═══
function showDay(n, pill) {
  document.querySelectorAll('.day-pill').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.day-content').forEach(d => d.classList.remove('active'));
  pill.classList.add('active');
  document.getElementById('day-' + n)?.classList.add('active');
}

// ═══ CAROUSEL ═══
function initCarousel(id) {
  const track = document.getElementById(id);
  if (!track) return;
  const dotsContainer = document.getElementById('dots-' + id);
  const slides = track.querySelectorAll('.carousel-slide');
  if (!dotsContainer || !slides.length) return;

  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(id, i);
    dotsContainer.appendChild(dot);
  });

  track.addEventListener('scroll', () => updateDots(id), { passive: true });
}

function scrollCarousel(id, dir) {
  const track = document.getElementById(id);
  if (!track) return;
  track.scrollBy({ left: dir * 300, behavior: 'smooth' });
}

function goToSlide(id, idx) {
  const track = document.getElementById(id);
  if (!track) return;
  const slide = track.querySelectorAll('.carousel-slide')[idx];
  if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
}

function updateDots(id) {
  const track = document.getElementById(id);
  const dots = document.querySelectorAll(`#dots-${id} .carousel-dot`);
  if (!track || !dots.length) return;
  const firstSlide = track.querySelector('.carousel-slide');
  if (!firstSlide) return;
  const slideW = firstSlide.offsetWidth + 12;
  const idx = Math.round(track.scrollLeft / slideW);
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

// ═══ ACCORDION (legacy for non-course pages) ═══
function toggleAcc(header) {
  const item   = header.parentElement;
  const body   = item.querySelector('.acc-body');
  const arrow  = header.querySelector('.acc-arrow');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.acc-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.acc-body').style.maxHeight = '0';
    i.querySelector('.acc-arrow').style.transform = '';
  });

  if (!isOpen) {
    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
    arrow.style.transform = 'rotate(180deg)';
    setTimeout(() => { if (item.classList.contains('open')) body.style.maxHeight = 'none'; }, 450);
  }
}

// ═══ LESSON BLOCK TOGGLE ═══
function toggleLessonBlock(header) {
  const block = header.parentElement;
  const body  = block.querySelector('.lesson-block-body');
  const arrow = header.querySelector('.lesson-block-arrow');
  const isOpen = block.classList.contains('open');

  if (!isOpen) {
    block.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 2000 + 'px';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    block.classList.remove('open');
    body.style.maxHeight = '0';
    arrow.style.transform = '';
  }
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  renderPrompts('todos');
  renderSidebar();

  ['carousel-day1','carousel-day2','carousel-day3','carousel-day4','carousel-day5']
    .forEach(initCarousel);

  // ESC closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => {
        m.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  // Auto-open first lesson block
  const firstBlock = document.querySelector('.lesson-block');
  if (firstBlock) {
    firstBlock.classList.add('open');
    const body = firstBlock.querySelector('.lesson-block-body');
    if (body) body.style.maxHeight = '9999px';
    const arrow = firstBlock.querySelector('.lesson-block-arrow');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }
});
