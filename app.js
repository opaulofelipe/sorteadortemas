"use strict";

/**
 * Assunto. — Uma roleta de 16 descobertas.
 * Funciona sem bibliotecas e salva histórico/configurações no navegador.
 */
const TOPICS = [
  {
    "name": "Jardinagem",
    "label": "Jardinagem",
    "category": "PLANTAS & CULTIVO",
    "description": "Aprenda a cuidar de plantas e a criar jardins e hortas, entendendo como luz, água, solo e clima influenciam cada espécie.",
    "questions": [
      "Como escolher plantas adequadas à iluminação e ao clima de um ambiente?",
      "Por que regar em excesso pode prejudicar as raízes?",
      "O que é necessário para começar uma pequena horta em casa?"
    ]
  },
  {
    "name": "Confeitaria",
    "label": "Confeitaria",
    "category": "DOCES & TÉCNICAS",
    "description": "Bolos, massas, cremes e chocolates combinam precisão, criatividade e transformações químicas que explicam texturas e sabores.",
    "questions": [
      "Qual é a função de farinha, ovos, açúcar e fermento na estrutura de um bolo?",
      "Por que a temperatura é importante ao preparar chocolate e caramelo?",
      "O que diferencia massas, recheios e coberturas da confeitaria clássica?"
    ]
  },
  {
    "name": "Religiões",
    "label": "Religiões",
    "category": "FÉ & CULTURA",
    "description": "Investigue as crenças, os rituais, os textos e os contextos históricos de diferentes tradições religiosas, respeitando suas diferenças.",
    "questions": [
      "Quais são as origens e as principais características de duas tradições religiosas?",
      "Como rituais e calendários religiosos se relacionam com a vida social?",
      "Qual é a diferença entre religião, espiritualidade e prática cultural?"
    ]
  },
  {
    "name": "História",
    "label": "História",
    "category": "SOCIEDADES & TEMPO",
    "description": "Explore acontecimentos, personagens e processos para compreender como as sociedades mudaram e por que o passado é interpretado de maneiras distintas.",
    "questions": [
      "Que causas e consequências explicam uma transformação histórica importante?",
      "Como historiadores utilizam documentos, objetos e testemunhos como fontes?",
      "Por que um mesmo acontecimento pode receber interpretações diferentes?"
    ]
  },
  {
    "name": "Filosofia",
    "label": "Filosofia",
    "category": "IDEIAS & ARGUMENTOS",
    "description": "Questione noções como liberdade, conhecimento, justiça e felicidade por meio de argumentos formulados ao longo da história.",
    "questions": [
      "Como dois filósofos diferentes compreendem a ideia de liberdade?",
      "O que distingue uma opinião de um argumento bem fundamentado?",
      "Como uma questão filosófica aparece em decisões do cotidiano?"
    ]
  },
  {
    "name": "Psicologia",
    "label": "Psicologia",
    "category": "MENTE & COMPORTAMENTO",
    "description": "Conheça pesquisas sobre memória, emoções, aprendizagem, percepção e relações humanas, distinguindo evidências científicas de crenças populares.",
    "questions": [
      "Como a memória funciona e por que podemos lembrar de maneira imprecisa?",
      "Que fatores influenciam nossos hábitos e nossas decisões?",
      "Como os psicólogos investigam comportamentos sem depender apenas de impressões pessoais?"
    ]
  },
  {
    "name": "Literatura",
    "label": "Literatura",
    "category": "LIVROS & NARRATIVAS",
    "description": "Descubra gêneros, estilos, movimentos e recursos usados por escritores para construir personagens, conflitos e interpretações do mundo.",
    "questions": [
      "Qual é a diferença entre romance, conto, poesia e crônica?",
      "Como narrador, tempo e ponto de vista modificam a leitura de uma história?",
      "De que maneira uma obra literária dialoga com a sociedade em que foi escrita?"
    ]
  },
  {
    "name": "Gastronomia",
    "label": "Gastronomia",
    "category": "SABORES & TRADIÇÕES",
    "description": "Explore ingredientes, cozinhas regionais e técnicas culinárias, relacionando alimentação à história, à cultura e à ciência.",
    "questions": [
      "Como um prato típico expressa a história e os ingredientes de uma região?",
      "O que muda nos alimentos quando assamos, grelhamos ou cozinhamos?",
      "Como a circulação de pessoas e produtos transformou hábitos alimentares?"
    ]
  },
  {
    "name": "Astronomia",
    "label": "Astronomia",
    "category": "ESPAÇO & UNIVERSO",
    "description": "Investigue planetas, estrelas, galáxias e fenômenos celestes a partir das observações e das explicações da astronomia moderna.",
    "questions": [
      "Qual é a diferença entre planeta, estrela, sistema solar e galáxia?",
      "Como sabemos a composição e a distância de objetos tão remotos?",
      "O que acontece com uma estrela ao longo de sua existência?"
    ]
  },
  {
    "name": "Arquitetura",
    "label": "Arquitetura",
    "category": "ESPAÇOS & CIDADES",
    "description": "Estude como construções e cidades combinam técnica, estética e necessidades sociais, do patrimônio histórico às soluções contemporâneas.",
    "questions": [
      "Como clima e materiais disponíveis influenciam o projeto de um edifício?",
      "Quais características diferenciam duas correntes arquitetônicas?",
      "Como o desenho das cidades afeta a circulação e a convivência das pessoas?"
    ]
  },
  {
    "name": "Artes",
    "label": "Artes",
    "category": "CRIAÇÃO & EXPRESSÃO",
    "description": "Conheça pintura, escultura, gravura e outras linguagens visuais, observando materiais, estilos e o contexto das obras.",
    "questions": [
      "O que distingue movimentos artísticos como Renascimento, Barroco e Modernismo?",
      "Como cor, composição e materialidade podem modificar o sentido de uma obra?",
      "Como a época e o público influenciam a produção e a interpretação artística?"
    ]
  },
  {
    "name": "Música",
    "label": "Música",
    "category": "RITMO & CULTURA",
    "description": "Explore gêneros musicais, instrumentos, formas de composição e a relação entre sons, identidades e transformações sociais.",
    "questions": [
      "Como ritmo, melodia e harmonia contribuem para a construção de uma música?",
      "Como surgiu e se transformou um gênero musical de sua escolha?",
      "Que mudanças ocorreram na música com as tecnologias de gravação e distribuição?"
    ]
  },
  {
    "name": "Cinema",
    "label": "Cinema",
    "category": "IMAGENS & NARRATIVAS",
    "description": "Descubra como roteiro, fotografia, montagem, atuação e som se combinam para contar histórias e provocar diferentes efeitos.",
    "questions": [
      "Como enquadramentos e movimentos de câmera orientam o olhar do espectador?",
      "Qual é o papel da montagem na construção do ritmo e do significado?",
      "Como um gênero cinematográfico reflete valores e conflitos de sua época?"
    ]
  },
  {
    "name": "Ciência",
    "label": "Ciência",
    "category": "DESCOBERTAS & MÉTODOS",
    "description": "Entenda como hipóteses, observações e experimentos produzem conhecimento sobre a natureza e como novas evidências alteram explicações.",
    "questions": [
      "Qual é a diferença entre hipótese, evidência, teoria e lei científica?",
      "Como um experimento pode testar uma explicação e controlar outras variáveis?",
      "Que descoberta científica modificou nosso cotidiano e por qual mecanismo?"
    ]
  },
  {
    "name": "Economia",
    "label": "Economia",
    "category": "TRABALHO & SOCIEDADE",
    "description": "Investigue produção, preços, trabalho, moeda e políticas econômicas para compreender decisões que afetam empresas, famílias e governos.",
    "questions": [
      "Por que o preço de um produto pode variar entre regiões e períodos?",
      "Qual é a diferença entre inflação, juros e poder de compra?",
      "Como decisões do Estado e das empresas influenciam emprego e produção?"
    ]
  },
  {
    "name": "Viagens",
    "label": "Viagens",
    "category": "LUGARES & CULTURAS",
    "description": "Explore destinos, paisagens, costumes e patrimônio, aprendendo a viajar com atenção à história local e aos impactos do turismo.",
    "questions": [
      "Que aspectos históricos e geográficos tornam um destino singular?",
      "Como costumes e tradições locais podem orientar uma visita respeitosa?",
      "Quais efeitos positivos e negativos o turismo pode causar em uma comunidade?"
    ]
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

const STORAGE_KEY = "assunto_roleta_v2";
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

