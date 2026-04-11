/* ═══════════════════════════════════════════
   IA na Sala dos Professores — app.js
   ═══════════════════════════════════════════ */

// ═══ DATA — 50+ PROMPTS ═══
const PROMPTS = [
  // PLANEJAMENTO
  { cat: 'planejamento', tag: 'Plano básico',      text: 'Crie um plano de aula de [duração] sobre [tema] para [ano/série] de [disciplina]. Inclua: objetivo, materiais, etapas e forma de avaliar a compreensão.' },
  { cat: 'planejamento', tag: 'Semana completa',   text: 'Crie uma sequência de 5 aulas sobre [tema] para [ano/série], com progressão de dificuldade. Cada aula deve ter 50 minutos e uma atividade prática.' },
  { cat: 'planejamento', tag: 'Sem recursos',      text: 'Crie um plano de aula sobre [tema] para [ano/série] sem usar projetor, internet ou impressora. Apenas lousa e caderno.' },
  { cat: 'planejamento', tag: 'Turma difícil',     text: 'Crie um plano de aula dinâmico sobre [tema] para turma agitada do [ano/série]. Atividades curtas e mudanças de ritmo a cada 10-15 minutos.' },
  { cat: 'planejamento', tag: 'Interdisciplinar',  text: 'Crie uma aula que conecte [disciplina 1] e [disciplina 2] usando o tema [tema]. Para [ano/série].' },
  { cat: 'planejamento', tag: 'Inclusão',          text: 'Adapte este plano de aula para incluir um aluno com [dislexia / TDAH / deficiência visual]. Mesmo objetivo, estratégias diferenciadas.' },
  { cat: 'planejamento', tag: 'Revisão rápida',    text: 'Crie uma atividade de revisão de 15 minutos sobre [tema] para o início da aula. Deve ser dinâmica e cobrir os principais pontos.' },
  { cat: 'planejamento', tag: 'Hora cívica',       text: 'Crie um roteiro criativo para uma hora cívica de 20 minutos sobre [data comemorativa]. Com participação dos alunos.' },

  // ATIVIDADES
  { cat: 'atividades', tag: 'Exercícios',          text: 'Crie 10 exercícios sobre [tema] para [ano/série], com dificuldade crescente. Inclua gabarito no final.' },
  { cat: 'atividades', tag: 'Múltipla escolha',    text: 'Crie 8 questões de múltipla escolha com 4 alternativas sobre [tema] para [ano/série]. Gabarito comentado ao final.' },
  { cat: 'atividades', tag: 'Dissertativas',       text: 'Crie 5 questões dissertativas sobre [tema] para [ano/série]. Inclua o que esperar em cada resposta (critérios de correção).' },
  { cat: 'atividades', tag: 'Três níveis',         text: 'Crie 3 versões do mesmo exercício sobre [tema]: fácil (alunos com dificuldade), médio (maioria) e difícil (alunos avançados).' },
  { cat: 'atividades', tag: 'Cotidiano',           text: 'Crie 5 problemas sobre [tema] usando situações do cotidiano de adolescentes de [região/contexto]. Evite exemplos artificiais.' },
  { cat: 'atividades', tag: 'Completar lacunas',   text: 'Crie um texto sobre [tema] com 10 lacunas para completar. Para [ano/série]. Inclua banco de palavras e gabarito.' },
  { cat: 'atividades', tag: 'Caça-palavras',       text: 'Crie um caça-palavras com 15 termos do tema [tema] para [ano/série]. Liste as palavras e escreva uma definição curta de cada uma.' },
  { cat: 'atividades', tag: 'Relacionar colunas',  text: 'Crie um exercício de relacionar colunas sobre [tema] com 10 pares (conceito + definição). Para [ano/série]. Com gabarito.' },
  { cat: 'atividades', tag: 'Tarefa de casa',      text: 'Crie uma tarefa de casa sobre [tema] que alunos do [ano/série] consigam fazer sozinhos, sem internet. Máximo 20 minutos.' },
  { cat: 'atividades', tag: 'Pesquisa guiada',     text: 'Crie um roteiro de pesquisa sobre [tema] para [ano/série] realizarem em casa. Com perguntas orientadoras e fontes confiáveis sugeridas.' },

  // PROVAS
  { cat: 'provas', tag: 'Prova completa',          text: 'Crie uma prova sobre [tema] para [ano/série] com: 5 questões objetivas, 3 de interpretação e 2 dissertativas. Total 10 pontos. Gabarito e rubrica ao final.' },
  { cat: 'provas', tag: 'Simulado',                text: 'Crie um simulado de 20 questões estilo ENEM sobre [disciplina], cobrindo: [lista de temas]. Com gabarito.' },
  { cat: 'provas', tag: 'Autoavaliação',           text: 'Crie um formulário de autoavaliação para alunos do [ano/série] refletirem sobre seu aprendizado no bimestre. 10 perguntas, linguagem acessível.' },
  { cat: 'provas', tag: 'Recuperação',             text: 'Crie uma atividade de recuperação sobre [tema] para alunos que não atingiram a média. Nível acessível, com exemplos antes dos exercícios.' },
  { cat: 'provas', tag: 'Avaliação oral',          text: 'Crie 10 perguntas para avaliação oral sobre [tema] para [ano/série]. Da mais fácil para a mais complexa. Com o que esperar em cada resposta.' },
  { cat: 'provas', tag: 'Projeto',                 text: 'Crie um roteiro de projeto avaliativo sobre [tema] para [ano/série], para grupos. Com critérios de avaliação e rubrica de pontuação.' },
  { cat: 'provas', tag: 'Análise de erros',        text: 'Os alunos erraram muito as questões [descreva quais]. O que isso indica? Crie 3 atividades de reforço específicas para esses erros.' },
  { cat: 'provas', tag: 'Contextualizada',         text: 'Crie 3 questões sobre [conceito] contextualizadas para a realidade de [cidade/contexto dos alunos]. Avaliação moderna, não apenas memorização.' },

  // CORREÇÃO
  { cat: 'correcao', tag: 'Feedback redação',      text: 'Corrija esta redação de aluno do [ano/série] sobre [tema]. Aponte o que está bom primeiro, depois o que melhorar. Linguagem encorajadora. [cole o texto]' },
  { cat: 'correcao', tag: 'Feedback coletivo',     text: 'Analisei estas 5 respostas sobre [questão]. Identifique os erros mais comuns e escreva uma devolutiva coletiva clara para a turma. [cole as respostas]' },
  { cat: 'correcao', tag: 'Rubrica',               text: 'Crie uma rubrica de correção para [redação/projeto/apresentação] sobre [tema] para [ano/série]. Com 4 níveis de desempenho e critérios claros.' },
  { cat: 'correcao', tag: 'Perguntas orientadoras',text: 'Um aluno escreveu isto: [texto]. Não corrija diretamente — escreva perguntas orientadoras que o ajudem a perceber e corrigir os próprios erros.' },
  { cat: 'correcao', tag: 'Análise de desempenho', text: 'Com base nos erros mais comuns da turma [descreva], identifique lacunas de aprendizagem e sugira estratégias de remediação específicas.' },
  { cat: 'correcao', tag: 'Comentário boletim',    text: 'Escreva um comentário para o boletim do aluno [perfil breve]. Tom profissional, empático e construtivo. Máximo 3 linhas.' },
  { cat: 'correcao', tag: 'Elogio personalizado',  text: 'Escreva 5 modelos de elogio escrito para atividades de alunos, variando o foco: esforço, criatividade, melhora, ajudar colegas e conclusão de desafio difícil.' },
  { cat: 'correcao', tag: 'Critérios claros',      text: 'Transforme estes critérios de correção [descreva] em linguagem que alunos do [ano/série] consigam entender e usar para se autoavaliar.' },

  // ENGAJAMENTO
  { cat: 'engajamento', tag: 'Gancho de aula',     text: 'Crie 3 formas criativas de introduzir o tema [tema] para alunos do [ano/série] que gostam de [interesses]. Duração máxima: 5 minutos cada.' },
  { cat: 'engajamento', tag: 'Quiz rápido',        text: 'Crie um quiz de 10 perguntas sobre [tema] para revisão dinâmica. Formato pergunta + 4 alternativas. Para tornar competitivo em sala.' },
  { cat: 'engajamento', tag: 'Debate',             text: 'Crie um roteiro de debate para [ano/série] sobre [tema controverso]. Com argumentos para os dois lados e perguntas mediadoras.' },
  { cat: 'engajamento', tag: 'História pedagógica',text: 'Crie uma história curta (1 página) que apresenta o conceito de [conceito] de forma envolvente para [ano/série]. Com personagens jovens e situações cotidianas.' },
  { cat: 'engajamento', tag: 'Contextualização',   text: 'Como posso relacionar o tema [tema] com [redes sociais / games / música / esporte]? Dê 5 exemplos práticos para usar em aula.' },
  { cat: 'engajamento', tag: 'Gincana',            text: 'Crie uma gincana educativa sobre [tema] para [ano/série] em 30 minutos em sala. Equipes de 5 alunos. Com sistema de pontuação.' },
  { cat: 'engajamento', tag: 'Desafio extra',      text: 'Crie 3 desafios opcionais sobre [tema] para alunos que terminam antes. Que desenvolvam pensamento crítico e criatividade.' },
  { cat: 'engajamento', tag: 'Rap educativo',      text: 'Crie a letra de um rap curto que ensina [conceito] de forma memorável para [ano/série]. Tom jovem e divertido, sem ser forçado.' },

  // COMUNICAÇÃO
  { cat: 'comunicacao', tag: 'Comunicado pais',    text: 'Escreva um comunicado para pais sobre [reunião/evento/tarefa/comportamento]. Tom cordial e claro. Escola: [nome]. Turma: [turma].' },
  { cat: 'comunicacao', tag: 'Relatório de aluno', text: 'Escreva um relatório pedagógico do aluno com este perfil: [participação, dificuldades, pontos fortes, comportamento]. Tom profissional e construtivo.' },
  { cat: 'comunicacao', tag: 'Carta início de ano',text: 'Escreva uma carta de apresentação para alunos do [ano/série] no início do ano. Tom acolhedor, que gere expectativa positiva e apresente regras de forma gentil.' },
  { cat: 'comunicacao', tag: 'Reunião de pais',    text: 'Crie um roteiro para reunião de pais do [ano/série] com duração de [X minutos], abordando: [temas]. Com tempo estimado para cada parte.' },
  { cat: 'comunicacao', tag: 'Bilhete de elogio',  text: 'Escreva 5 bilhetes de elogio para os pais, destacando: esforço, melhora na nota, ajudar colegas, participação e entrega de trabalhos.' },
  { cat: 'comunicacao', tag: 'Bilhete de alerta',  text: 'Escreva um bilhete para os pais sobre [comportamento preocupante]. Tom respeitoso, sem condenar. Sugerindo parceria família-escola.' },
  { cat: 'comunicacao', tag: 'Ata de reunião',     text: 'Com base nestas informações [descreva o que foi discutido], escreva uma ata de reunião pedagógica formal, clara e completa.' },
  { cat: 'comunicacao', tag: 'Plano de recuperação',text: 'Crie um plano de recuperação para aluno com dificuldade em [área/tema]. Com atividades progressivas, estratégias diferenciadas e metas por semana.' },
];

const CAT_LABELS = {
  todos:        'Todos',
  planejamento: '📅 Planejamento',
  atividades:   '📝 Atividades',
  provas:       '📊 Provas',
  correcao:     '✔️ Correção',
  engajamento:  '⚡ Engajamento',
  comunicacao:  '📧 Comunicação',
};

// ═══ NAVIGATION ═══
function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (btn && btn.classList) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPageSelect(val) {
  const btns = document.querySelectorAll('.nav-btn');
  const map = { visao: 0, modulos: 1, prompts: 2, desafio: 3 };
  showPage(val, btns[map[val]]);
}

// ═══ ACCORDION ═══
function toggleAcc(header) {
  const item   = header.parentElement;
  const body   = item.querySelector('.acc-body');
  const arrow  = header.querySelector('.acc-arrow');
  const isOpen = item.classList.contains('open');

  // Close all open items first
  document.querySelectorAll('.acc-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.acc-body').style.maxHeight = '0';
    i.querySelector('.acc-arrow').style.transform = '';
  });

  if (!isOpen) {
    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
    arrow.style.transform = 'rotate(180deg)';
    // Allow natural height after animation completes
    setTimeout(() => {
      if (item.classList.contains('open')) body.style.maxHeight = 'none';
    }, 450);
  }
}

// ═══ COPY PROMPT (inside prompt-box) ═══
function copyPrompt(btn) {
  const pre = btn.previousElementSibling || btn.parentElement.querySelector('pre');
  navigator.clipboard.writeText(pre.textContent).catch(() => {});
  btn.textContent = '✓ Copiado!';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = 'Copiar';
    btn.classList.remove('copied');
  }, 2200);
}

// ═══ COPY PROMPT CARD (prompts page) ═══
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
  const cats = cat === 'todos'
    ? ['planejamento', 'atividades', 'provas', 'correcao', 'engajamento', 'comunicacao']
    : [cat];

  let html = '';
  cats.forEach(c => {
    const items = PROMPTS.filter(p => p.cat === c);
    if (!items.length) return;

    html += `
      <div class="prompts-section" data-cat="${c}">
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

// ═══ MODAL ═══
function openModal(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Animate progress bars after a short delay
  setTimeout(() => {
    overlay.querySelectorAll('.progress-fill').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 300);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e, id) {
  if (e.target.id === id) closeModal(id);
}

// ═══ CHALLENGE DAYS ═══
function showDay(n, pill) {
  document.querySelectorAll('.day-pill').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.day-content').forEach(d => d.classList.remove('active'));
  pill.classList.add('active');
  document.getElementById('day-' + n).classList.add('active');
}

// ═══ CAROUSEL ═══
function initCarousel(id) {
  const track = document.getElementById(id);
  if (!track) return;
  const dotsContainer = document.getElementById('dots-' + id);
  const slides = track.querySelectorAll('.carousel-slide');
  if (!dotsContainer || !slides.length) return;

  // Build dots
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
  const dots  = document.querySelectorAll(`#dots-${id} .carousel-dot`);
  if (!track || !dots.length) return;
  const firstSlide = track.querySelector('.carousel-slide');
  if (!firstSlide) return;
  const slideW = firstSlide.offsetWidth + 12;
  const idx = Math.round(track.scrollLeft / slideW);
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  // Render all prompts on load
  renderPrompts('todos');

  // Init all carousels
  ['carousel-day1', 'carousel-day2', 'carousel-day3', 'carousel-day4', 'carousel-day5']
    .forEach(initCarousel);

  // Close modal with Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => {
        m.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });
});
