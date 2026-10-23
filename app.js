"use strict";

/**
 * Assunto. — Uma roleta de 16 descobertas.
 * Funciona sem bibliotecas e salva histórico/configurações no navegador.
 */
const TOPICS = [
  {
    name: "Jardinagem", label: "Jardinagem", category: "NATUREZA & CULTIVO",
    description: "Cultivar plantas é aprender a construir pequenos ecossistemas, equilibrando solo, luz, água e vida microscópica.",
    questions: ["Por que algumas plantas prosperam na sombra e outras precisam de sol direto?", "O que faz um solo ser fértil e como a compostagem contribui para isso?", "Como montar e manter uma pequena horta em casa?"]
  },
  {
    name: "Micologia", label: "Micologia", category: "BIOLOGIA",
    description: "O estudo dos fungos revela redes subterrâneas, decomposição, medicamentos e relações surpreendentes com outros seres vivos.",
    questions: ["Em que os fungos diferem das plantas e dos animais?", "Como o micélio participa da decomposição e da vida das florestas?", "Que usos dos fungos existem na alimentação, na medicina e na indústria?"]
  },
  {
    name: "Bioluminescência", label: "Luz viva", category: "VIDA NO PLANETA",
    description: "Alguns seres vivos produzem luz por reações químicas: um recurso para atrair, confundir, comunicar e sobreviver.",
    questions: ["Que reação química permite a um organismo produzir luz?", "Por que a bioluminescência é tão comum nas profundezas do oceano?", "Como cientistas usam organismos luminosos em pesquisas?"]
  },
  {
    name: "Cartografia", label: "Cartografia", category: "MUNDO & REPRESENTAÇÃO",
    description: "Um mapa não é simplesmente uma cópia do mundo: ele seleciona, distorce, organiza e comunica informações sobre o espaço.",
    questions: ["Por que não é possível representar uma superfície esférica num plano sem distorções?", "Qual a diferença entre escala, projeção cartográfica e legenda?", "De que maneira mapas influenciaram viagens, fronteiras e relações de poder?"]
  },
  {
    name: "Criptografia", label: "Criptografia", category: "CIÊNCIA & TECNOLOGIA",
    description: "Da troca de mensagens secretas na Antiguidade à segurança digital, a criptografia protege informações por meio de métodos matemáticos.",
    questions: ["Como uma cifra simples transforma uma mensagem legível em código?", "Qual a diferença entre criptografia simétrica e assimétrica?", "Como a criptografia protege conversas e transações online?"]
  },
  {
    name: "Sinestesia", label: "Sinestesia", category: "MENTE & PERCEPÇÃO",
    description: "Para algumas pessoas, letras evocam cores ou sons sugerem formas: experiências perceptivas que desafiam nossas noções de sentidos separados.",
    questions: ["O que caracteriza a sinestesia e quais são seus tipos mais conhecidos?", "Como ela difere de uma metáfora ou de uma associação aprendida?", "Que hipóteses científicas tentam explicar sua origem?"]
  },
  {
    name: "Vulcanologia", label: "Vulcões", category: "CIÊNCIAS DA TERRA",
    description: "Os vulcões revelam o movimento do interior da Terra, a formação de paisagens e os riscos de viver sobre um planeta geologicamente ativo.",
    questions: ["Como o magma se forma e por que alguns vulcões entram em erupção?", "O que distingue vulcões-escudo de estratovulcões?", "Como pesquisadores monitoram os sinais de uma possível erupção?"]
  },
  {
    name: "Etimologia", label: "Etimologia", category: "LÍNGUA & HISTÓRIA",
    description: "Toda palavra tem uma trajetória: mudanças de som, significado e circulação que preservam pistas de encontros entre culturas.",
    questions: ["Como linguistas investigam a origem de uma palavra?", "Que palavras do português têm histórias surpreendentes?", "Por que o significado das palavras muda com o passar do tempo?"]
  },
  {
    name: "Brutalismo", label: "Brutalismo", category: "ARQUITETURA & DESIGN",
    description: "A arquitetura brutalista valoriza estrutura, materialidade e formas expressivas, frequentemente associadas ao concreto aparente.",
    questions: ["De onde vem o nome brutalismo e como o movimento surgiu?", "Quais soluções e ideias aparecem em edifícios brutalistas famosos?", "Por que essa arquitetura desperta tanto admiração quanto rejeição?"]
  },
  {
    name: "Fermentação", label: "Fermentação", category: "QUÍMICA & COTIDIANO",
    description: "Microrganismos transformam açúcares em novas substâncias e ajudam a produzir pão, queijo, iogurte e inúmeros sabores.",
    questions: ["O que leveduras e bactérias fazem durante a fermentação?", "Como o processo muda sabor, textura e conservação dos alimentos?", "Qual a diferença entre fermentação alcoólica e láctica?"]
  },
  {
    name: "Biomimética", label: "Biomimética", category: "INOVAÇÃO & NATUREZA",
    description: "A biomimética observa estratégias da natureza e as transforma em soluções para materiais, edificações, equipamentos e sistemas.",
    questions: ["Como a observação de seres vivos inspira projetos tecnológicos?", "Quais invenções foram influenciadas por plantas ou animais?", "Quais limites existem ao tentar reproduzir uma solução natural?"]
  },
  {
    name: "Oceanografia", label: "Oceano fundo", category: "PLANETA ÁGUA",
    description: "A maior parte do oceano permanece pouco observada diretamente; correntes, pressão e ecossistemas profundos guardam questões fundamentais.",
    questions: ["Por que explorar regiões abissais é tão difícil?", "Como organismos sobrevivem onde não chega luz solar?", "Que papel as correntes oceânicas desempenham no clima terrestre?"]
  },
  {
    name: "Luteria", label: "Luteria", category: "ARTE & ACÚSTICA",
    description: "Construir instrumentos musicais exige sensibilidade artística e conhecimento da madeira, da vibração e das propriedades do som.",
    questions: ["Como a forma e o material de um instrumento influenciam seu timbre?", "Quais são as principais etapas de construção de um violino ou violão?", "Como artesãos conciliam tradição, ajuste acústico e inovação?"]
  },
  {
    name: "Arqueoastronomia", label: "Céu antigo", category: "HISTÓRIA & CÉU",
    description: "A arqueoastronomia investiga como diferentes sociedades observaram os astros e incorporaram seus ciclos a construções e rituais.",
    questions: ["Como povos antigos relacionavam o céu às estações e à agricultura?", "Que evidências permitem investigar alinhamentos astronômicos em monumentos?", "Como evitar interpretações fantasiosas sobre observatórios antigos?"]
  },
  {
    name: "Mitologia comparada", label: "Mitologias", category: "CULTURA & NARRATIVAS",
    description: "Comparar mitos de sociedades distintas ajuda a compreender símbolos, explicações de origem e formas de transmitir valores culturais.",
    questions: ["Que semelhanças e diferenças existem entre mitos de criação?", "Como os mitos refletem as relações sociais e o ambiente de cada povo?", "Por que comparar mitologias não significa afirmar que todas contam a mesma história?"]
  },
  {
    name: "Tipografia", label: "Tipografia", category: "LINGUAGEM VISUAL",
    description: "A forma das letras influencia a legibilidade, a hierarquia e a identidade visual de tudo que lemos, de livros a interfaces digitais.",
    questions: ["Como diferenciar tipografia serifada, sem serifa e monoespaçada?", "Como tamanho, espaçamento e contraste alteram a experiência de leitura?", "Que escolhas tipográficas mudaram a história do design gráfico?"]
  }
];

const $ = (selector) => document.querySelector(selector);
const $all = (selector) => [...document.querySelectorAll(selector)];
const els = {
  wheelSpin: $("#wheelSpin"), wheelSvg: $("#wheelSvg"), spinButton: $("#spinButton"), spinCenter: $("#spinCenter"),
  spinLabel: $("#spinLabel"), fraction: $("#wheelFraction"), noRepeat: $("#noRepeat"), remaining: $("#remainingCount"),
  idle: $("#idleContent"), result: $("#resultContent"), resultTitle: $("#resultTitle"), resultDescription: $("#resultDescription"),
  resultCategory: $("#resultCategory"), chapter: $("#discoveryChapter"), questions: $("#questionList"), research: $("#researchLink"),
  copyButton: $("#copyButton"), timerDigits: $("#timerDigits"), timerToggle: $("#timerToggle"), timerReset: $("#timerReset"),
  timerNote: $("#timerNote"), toast: $("#toast"), screenReader: $("#screenReaderStatus"), history: $("#historyItems"), resetHistory: $("#resetHistory")
};

const STORAGE_KEY = "assunto_roleta_v1";
let state = { history: [], noRepeat: true, lastIndex: null, minutes: 10 };
try {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (stored && typeof stored === "object") {
    const rawHistory = Array.isArray(stored.history) ? stored.history : [];
    state.history = rawHistory.filter(i => Number.isInteger(i) && i >= 0 && i < TOPICS.length).slice(-120);
    state.noRepeat = stored.noRepeat !== false;
    state.minutes = [5, 10, 15, 20].includes(stored.minutes) ? stored.minutes : 10;
    state.lastIndex = Number.isInteger(stored.lastIndex) && stored.lastIndex >= 0 && stored.lastIndex < TOPICS.length ? stored.lastIndex : null;
  }
} catch (_) { /* Navegação privada ou dados antigos: usar valores padrão. */ }

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* O aplicativo permanece funcional sem armazenamento. */ }
}

function randomInt(max) {
  if (!Number.isSafeInteger(max) || max < 1) throw new RangeError("Máximo inválido");
  if (!globalThis.crypto || typeof crypto.getRandomValues !== "function") return Math.floor(Math.random() * max);
  const bucket = new Uint32Array(1);
  const limit = Math.floor(4294967296 / max) * max;
  do { crypto.getRandomValues(bucket); } while (bucket[0] >= limit);
  return bucket[0] % max;
}
function svgNode(name, attrs = {}, content) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  if (content !== undefined) node.textContent = content;
  return node;
}
function point(r, deg) {
  const a = deg * Math.PI / 180;
  return [r * Math.cos(a), r * Math.sin(a)];
}
function buildWheel() {
  const svg = els.wheelSvg;
  svg.replaceChildren();
  const palettes = ["#ead4b5", "#bd7861", "#53776d", "#c4d2bd", "#d8b48a", "#9e5644", "#40645c", "#ede2cb"];
  const light = new Set([1, 2, 5, 6]);
  svg.append(svgNode("circle", {r:291, fill:"#1b2f29", stroke:"#a8865f", "stroke-width":1}));
  svg.append(svgNode("circle", {r:284, fill:"#d9b98b"}));
  const step = 360 / TOPICS.length;
  TOPICS.forEach((topic, i) => {
    const theta = -90 + i * step;
    const start = theta - step/2, end = theta + step/2;
    const [x1,y1] = point(279, start), [x2,y2] = point(279, end);
    const path = `M 0 0 L ${x1.toFixed(3)} ${y1.toFixed(3)} A 279 279 0 0 1 ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;
    svg.append(svgNode("path", {d:path, fill:palettes[i%palettes.length], stroke:"#243b34", "stroke-width":"1.5"}));
    const [tx, ty] = point(206, theta);
    const flip = Math.cos(theta*Math.PI/180) < -0.01;
    svg.append(svgNode("text", {
      x:tx.toFixed(3), y:ty.toFixed(3),
      transform:`rotate(${theta+(flip?180:0)} ${tx.toFixed(3)} ${ty.toFixed(3)})`,
      "text-anchor":"middle", "dominant-baseline":"middle", fill:light.has(i%palettes.length)?"#fff5e8":"#1c332d",
      "font-family":"DM Sans, Arial, sans-serif", "font-size":"16.5", "font-weight":"700", "letter-spacing":".15"
    }, topic.label));
    const [dx,dy] = point(260, theta);
    svg.append(svgNode("circle", {cx:dx.toFixed(3), cy:dy.toFixed(3), r:"2.3", fill:light.has(i%palettes.length)?"#ffedda":"#283f36", opacity:".75"}));
  });
  svg.append(svgNode("circle", {r:279, fill:"none", stroke:"#f5d6a1", "stroke-width":"3"}));
  svg.append(svgNode("circle", {r:120, fill:"none", stroke:"#f7e1bc", "stroke-width":"1.4", opacity:".52"}));
  svg.append(svgNode("circle", {r:281, fill:"none", stroke:"#1d302c", "stroke-width":"4"}));
}

let rotation = 0;
let spinning = false;
let toastTimeout;
function notify(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => els.toast.classList.remove("show"), 3500);
}
function available() {
  if (!state.noRepeat) return TOPICS.map((_,i) => i);
  const used = new Set(state.history);
  return TOPICS.map((_,i) => i).filter(i => !used.has(i));
}
function syncStatus() {
  const remaining = available().length;
  els.remaining.textContent = state.noRepeat ? `${remaining} ${remaining===1?"disponível":"disponíveis"}` : "16 disponíveis";
  els.fraction.innerHTML = `${String(Math.min(new Set(state.history).size + 1,16)).padStart(2,"0")} <span>/ 16</span>`;
  els.noRepeat.checked = state.noRepeat;
  els.noRepeat.disabled = spinning;
  els.spinButton.disabled = spinning;
  els.spinCenter.disabled = spinning;
  els.spinLabel.textContent = spinning ? "SORTEANDO..." : "GIRAR A ROLETA";
}
function setLastResult(index, focus=false) {
  if (index === null) return;
  const topic = TOPICS[index];
  els.idle.hidden = true;
  els.result.hidden = false;
  els.resultCategory.textContent = topic.category;
  els.resultTitle.textContent = topic.name;
  els.resultDescription.textContent = topic.description;
  els.questions.replaceChildren();
  for (const question of topic.questions) {
    const li = document.createElement("li");
    li.textContent = question;
    els.questions.appendChild(li);
  }
  els.research.href = `https://www.google.com/search?q=${encodeURIComponent(`${topic.name} o que é como funciona exemplos`)}`;
  els.chapter.textContent = `CAPÍTULO ${String(Math.min(state.history.length, 99)).padStart(2,"0")}`;
  if (focus) {
    els.resultTitle.focus({preventScroll:true});
    if (window.matchMedia("(max-width: 820px)").matches) {
      els.result.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth", block:"start"});
    }
  }
}
function syncHistory() {
  els.history.replaceChildren();
  if (state.history.length === 0) {
    const empty = document.createElement("span"); empty.className = "history-empty";
    empty.textContent = "Suas descobertas aparecerão aqui.";
    els.history.append(empty);
    return;
  }
  state.history.slice(-8).reverse().forEach(i => {
    const chip = document.createElement("span");
    chip.className = "history-chip";
    chip.textContent = TOPICS[i].name;
    els.history.append(chip);
  });
}
function finishSpin(index) {
  spinning = false;
  state.lastIndex = index;
  state.history.push(index);
  save();
  syncStatus();
  syncHistory();
  setLastResult(index, true);
  resetTimer();
  els.screenReader.textContent = `Tema sorteado: ${TOPICS[index].name}. ${TOPICS[index].description}`;
}
function spin() {
  if (spinning) return;
  let choices = available();
  if (choices.length === 0) {
    state.history = [];
    choices = available();
    notify("Todos os 16 temas explorados. Uma nova rodada começou!");
  }
  const index = choices[randomInt(choices.length)];
  const step = 360/TOPICS.length;
  const jitter = (randomInt(1401)-700)/100; // Até 7°, dentro dos 11,25° de cada setor.
  const target = ((-index * step + jitter) % 360 + 360) % 360;
  const normalized = ((rotation % 360) + 360) % 360;
  const delta = (target - normalized + 360) % 360;
  const turns = 5 + randomInt(3);
  rotation += turns*360 + delta;
  spinning = true;
  syncStatus();
  els.screenReader.textContent = "Roleta girando. Aguarde o sorteio.";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reducedMotion ? 25 : 5100;
  els.wheelSpin.style.transition = `transform ${duration}ms cubic-bezier(.12, .75, .09, 1)`;
  // Força a aplicação de transform caso tenha ocorrido uma restauração anterior.
  requestAnimationFrame(() => { els.wheelSpin.style.transform = `rotate(${rotation}deg)`; });
  setTimeout(() => finishSpin(index), duration + 75);
}

// Cronômetro com horário absoluto para permanecer correto mesmo se a aba dormir.
let timerDuration = state.minutes * 60;
let timerRemaining = timerDuration;
let timerDeadline = null;
let timerInterval = null;
let timerRunning = false;
let timerCompleted = false;
function renderTimer() {
  const min = String(Math.floor(timerRemaining/60)).padStart(2,"0");
  const sec = String(timerRemaining%60).padStart(2,"0");
  els.timerDigits.innerHTML = `${min}<span>:</span>${sec}`;
  els.timerDigits.setAttribute("aria-label",`${Math.floor(timerRemaining/60)} minutos e ${timerRemaining%60} segundos restantes`);
  els.timerToggle.innerHTML = timerRunning ? 'PAUSAR TEMPO <span aria-hidden="true">Ⅱ</span>' : timerCompleted ? 'RECOMEÇAR <span aria-hidden="true">→</span>' : timerRemaining===timerDuration ? 'INICIAR TEMPO <span aria-hidden="true">→</span>' : 'CONTINUAR <span aria-hidden="true">→</span>';
  $all(".duration-pill").forEach(btn => {
    const selected = Number(btn.dataset.minutes) === state.minutes;
    btn.classList.toggle("active",selected);
    btn.setAttribute("aria-pressed",String(selected));
  });
}
function stopInterval() { if (timerInterval!==null) {clearInterval(timerInterval);timerInterval=null;} }
function tick() {
  if (!timerRunning || timerDeadline===null) return;
  timerRemaining = Math.max(0,Math.ceil((timerDeadline-Date.now())/1000));
  if (timerRemaining <= 0) {
    timerRunning = false; timerCompleted = true; timerDeadline = null; stopInterval();
    els.timerNote.textContent = "Tempo encerrado. Agora explique com suas palavras!";
    els.screenReader.textContent = "Tempo de pesquisa encerrado. Agora explique o tema.";
    notify("Tempo encerrado! Agora é hora de explicar.");
  }
  renderTimer();
}
function resetTimer() {
  stopInterval(); timerRunning = false; timerCompleted = false; timerDeadline = null;
  timerDuration = state.minutes*60; timerRemaining = timerDuration;
  els.timerNote.textContent = "O aprendizado começa com uma pergunta.";
  renderTimer();
}
function toggleTimer() {
  if (timerRunning) {
    tick(); timerRunning = false; timerDeadline = null; stopInterval();
    els.timerNote.textContent = "Pesquisa pausada.";
  } else {
    if (timerCompleted) {timerRemaining=timerDuration;timerCompleted=false;}
    timerRunning = true; timerDeadline = Date.now()+timerRemaining*1000;
    timerInterval = setInterval(tick, 250);
    els.timerNote.textContent = "Anote apenas o essencial. Depois explique sem ler.";
  }
  renderTimer();
}

// Eventos e restauração.
buildWheel();
if (state.lastIndex !== null && state.history.length) {
  rotation = ((360 - state.lastIndex * 360/TOPICS.length)%360+360)%360;
  els.wheelSpin.style.transform = `rotate(${rotation}deg)`;
  setLastResult(state.lastIndex);
}
syncStatus();
syncHistory();
renderTimer();
els.spinButton.addEventListener("click", spin);
els.spinCenter.addEventListener("click", spin);
els.noRepeat.addEventListener("change", event => {state.noRepeat = event.target.checked;save();syncStatus();});
$all(".duration-pill").forEach(button => button.addEventListener("click", () => {
  state.minutes = Number(button.dataset.minutes); save(); resetTimer();
}));
els.timerToggle.addEventListener("click", toggleTimer);
els.timerReset.addEventListener("click", resetTimer);
els.resetHistory.addEventListener("click", () => {
  if (spinning) return;
  state.history=[];state.lastIndex=null;save();syncHistory();syncStatus();
  els.idle.hidden=false; els.result.hidden=true; els.chapter.textContent="CAPÍTULO 00";
  resetTimer();notify("Histórico limpo. Pronto para uma nova descoberta!");
});
els.copyButton.addEventListener("click", async () => {
  if (state.lastIndex===null) return;
  const topic=TOPICS[state.lastIndex];
  const content=`ASSUNTO: ${topic.name}\n\n${topic.description}\n\nPERGUNTAS PARA PESQUISAR:\n${topic.questions.map((q,i)=>`${i+1}. ${q}`).join("\n")}\n\nDESAFIO: Explique o que é, dê um exemplo concreto e diga por que importa. Tente explicar sem ler.`;
  try {
    await navigator.clipboard.writeText(content);
    notify("Roteiro copiado para a área de transferência.");
  } catch (_) {
    const textarea=document.createElement("textarea");
    textarea.value=content;textarea.style.position="fixed";textarea.style.opacity="0";
    document.body.append(textarea);textarea.select();
    const successful=document.execCommand("copy");textarea.remove();
    notify(successful ? "Roteiro copiado!" : "Não foi possível copiar. Selecione o roteiro manualmente.");
  }
});
document.addEventListener("visibilitychange", () => {if(!document.hidden) tick();});

