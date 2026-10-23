"use strict";

// Os 16 temas permanecem editáveis aqui.
const TOPICS = [
  {
    "name": "Jardinagem",
    "label": "Jardinagem"
  },
  {
    "name": "Confeitaria",
    "label": "Confeitaria"
  },
  {
    "name": "Religiões",
    "label": "Religiões"
  },
  {
    "name": "História",
    "label": "História"
  },
  {
    "name": "Filosofia",
    "label": "Filosofia"
  },
  {
    "name": "Psicologia",
    "label": "Psicologia"
  },
  {
    "name": "Literatura",
    "label": "Literatura"
  },
  {
    "name": "Gastronomia",
    "label": "Gastronomia"
  },
  {
    "name": "Astronomia",
    "label": "Astronomia"
  },
  {
    "name": "Arquitetura",
    "label": "Arquitetura"
  },
  {
    "name": "Artes",
    "label": "Artes"
  },
  {
    "name": "Música",
    "label": "Música"
  },
  {
    "name": "Cinema",
    "label": "Cinema"
  },
  {
    "name": "Ciência",
    "label": "Ciência"
  },
  {
    "name": "Economia",
    "label": "Economia"
  },
  {
    "name": "Viagens",
    "label": "Viagens"
  }
];
const STORAGE_KEY = "assunto_roleta_minimal_v3";
const wheel = document.querySelector(".wheel");
const wheelSpin = document.querySelector("#wheelSpin");
const wheelSvg = document.querySelector("#wheelSvg");
const spinButton = document.querySelector("#spinButton");
const announcement = document.querySelector("#announcement");

const palettes = ["#ead4b5", "#bd7861", "#53776d", "#c4d2bd", "#d8b48a", "#9e5644", "#40645c", "#ede2cb"];
const lightSegments = new Set([1, 2, 5, 6]);
const sliceAngle = 360 / TOPICS.length;
let rotation = 0;
let spinning = false;
let history = [];
let lastIndex = null;

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saved && typeof saved === "object") {
    if (Array.isArray(saved.history)) {
      history = saved.history.filter(i => Number.isInteger(i) && i >= 0 && i < TOPICS.length).slice(-TOPICS.length);
    }
    if (Number.isInteger(saved.lastIndex) && saved.lastIndex >= 0 && saved.lastIndex < TOPICS.length) {
      lastIndex = saved.lastIndex;
    }
  }
} catch (_) {
  // O sorteio funciona mesmo sem armazenamento local.
}
function saveHistory() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({history, lastIndex})); } catch (_) {}
}
function randomInt(max) {
  if (max <= 0) throw new RangeError("Lista de sorteio vazia");
  if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== "function") {
    return Math.floor(Math.random() * max);
  }
  const bucket = new Uint32Array(1);
  const limit = Math.floor(4294967296 / max) * max;
  do { globalThis.crypto.getRandomValues(bucket); } while (bucket[0] >= limit);
  return bucket[0] % max;
}
function svgNode(tag, attrs = {}, content) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
  if (content !== undefined) node.textContent = content;
  return node;
}
function point(radius, degrees) {
  const angle = degrees * Math.PI / 180;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}
function buildWheel() {
  wheelSvg.replaceChildren();
  wheelSvg.append(svgNode("circle", {r: 291, fill: "#1b2f29", stroke: "#a8865f", "stroke-width": 1}));
  wheelSvg.append(svgNode("circle", {r: 284, fill: "#d9b98b"}));
  TOPICS.forEach((topic, index) => {
    const angle = -90 + index * sliceAngle;
    const start = angle - sliceAngle / 2;
    const end = angle + sliceAngle / 2;
    const [x1, y1] = point(279, start);
    const [x2, y2] = point(279, end);
    const path = `M 0 0 L ${x1.toFixed(3)} ${y1.toFixed(3)} A 279 279 0 0 1 ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;
    wheelSvg.append(svgNode("path", {
      d: path, fill: palettes[index % palettes.length], stroke: "#243b34", "stroke-width": "1.5"
    }));
    const [tx, ty] = point(205, angle);
    const flip = Math.cos(angle * Math.PI / 180) < -0.01;
    const bright = lightSegments.has(index % palettes.length);
    wheelSvg.append(svgNode("text", {
      x: tx.toFixed(3), y: ty.toFixed(3),
      transform: `rotate(${angle + (flip ? 180 : 0)} ${tx.toFixed(3)} ${ty.toFixed(3)})`,
      "text-anchor": "middle", "dominant-baseline": "middle",
      fill: bright ? "#fff5e8" : "#1c332d",
      "font-family": "DM Sans, Arial, sans-serif", "font-size": "17", "font-weight": "700",
      "letter-spacing": ".1"
    }, topic.label));
    const [dx, dy] = point(260, angle);
    wheelSvg.append(svgNode("circle", {
      cx: dx.toFixed(3), cy: dy.toFixed(3), r: "2.3",
      fill: bright ? "#ffedda" : "#283f36", opacity: ".75"
    }));
  });
  wheelSvg.append(svgNode("circle", {r: 279, fill: "none", stroke: "#f5d6a1", "stroke-width": "3"}));
  wheelSvg.append(svgNode("circle", {r: 120, fill: "none", stroke: "#f7e1bc", "stroke-width": "1.4", opacity: ".52"}));
  wheelSvg.append(svgNode("circle", {r: 281, fill: "none", stroke: "#1d302c", "stroke-width": "4"}));
}
function finishSpin(index) {
  spinning = false;
  lastIndex = index;
  history.push(index);
  saveHistory();
  spinButton.disabled = false;
  spinButton.setAttribute("aria-label", `Tema sorteado: ${TOPICS[index].name}. Girar novamente`);
  spinButton.title = TOPICS[index].name;
  announcement.textContent = `Tema sorteado: ${TOPICS[index].name}.`;
}
function spin() {
  if (spinning) return;
  let choices = TOPICS.map((_, i) => i).filter(i => !history.includes(i));
  if (!choices.length) {
    history = [];
    choices = TOPICS.map((_, i) => i);
  }
  const index = choices[randomInt(choices.length)];
  const jitter = (randomInt(1401) - 700) / 100; // +/- 7 graus, dentro do segmento sorteado.
  const target = ((-index * sliceAngle + jitter) % 360 + 360) % 360;
  const normalized = ((rotation % 360) + 360) % 360;
  const delta = (target - normalized + 360) % 360;
  rotation += (5 + randomInt(3)) * 360 + delta;
  spinning = true;
  spinButton.disabled = true;
  spinButton.removeAttribute("title");
  spinButton.setAttribute("aria-label", "Sorteando tema");
  announcement.textContent = "Roleta girando.";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reducedMotion ? 30 : 5000;
  wheelSpin.style.transition = `transform ${duration}ms cubic-bezier(.12, .75, .09, 1)`;
  requestAnimationFrame(() => { wheelSpin.style.transform = `rotate(${rotation}deg)`; });
  setTimeout(() => finishSpin(index), duration + 80);
}

buildWheel();
if (lastIndex !== null) {
  rotation = ((-lastIndex * sliceAngle) % 360 + 360) % 360;
  wheelSpin.style.transform = `rotate(${rotation}deg)`;
  spinButton.setAttribute("aria-label", `Último tema: ${TOPICS[lastIndex].name}. Girar novamente`);
  spinButton.title = TOPICS[lastIndex].name;
}
spinButton.addEventListener("click", spin);
wheel.addEventListener("click", (event) => {
  if (!event.target.closest("button")) spin();
});
