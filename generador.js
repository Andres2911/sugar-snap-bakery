/* SUGAR-SNAP BAKERY · Generador de niveles (núcleo compartido).
   Lo usan las herramientas de Node para crear los niveles fijos y el propio juego (en un trabajador en segundo plano)
   para el modo infinito y el reto diario. Cada nivel parte de un plan de dinámicas, construye su tablero con tubos
   trazados por carriles, pone la materia justa para los pedidos y busca el contenido que da el mejor puzle. */
(function (global) {
  'use strict';
  var Motor = global.Motor || (typeof require !== 'undefined' ? require('./motor.js') : null);
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const elegir = (r, a) => a[Math.floor(r() * a.length)];
const barajar = (r, a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const copia = (o) => JSON.parse(JSON.stringify(o));

// ── Geometría (igual que juego.js) ──
const UNIDAD = { frasco: 24, cuenco: 16, matraz: 22, capsula: 22, alambique: 22 };
const ANCHO = { frasco: 50, cuenco: 80, matraz: 60, capsula: 50, alambique: 66 };
function geom(v) { const u = UNIDAD[v.forma], w = ANCHO[v.forma], cu = v.forma === 'matraz' ? 30 : 0, h = v.cap * u + 14 + cu; return { u, w, h, top: v.y - h, izq: v.x - w / 2, der: v.x + w / 2 }; }
function radio(o) { return o.tipo === 'turbina' ? 34 : (o.grande ? 46 : 38); }
function salida(g, v) { const G = geom(v), l = g.sale === 'izq' ? -1 : 1; return g.lado === 'arriba' ? [v.x + l * (G.w / 2 - 12), G.top - 12] : [v.x + l * (G.w / 2 + 6), v.y - 10]; }
function entrada(n, id) { const v = n.vasijas.find(x => x.id === id); if (v) return [v.x, geom(v).top - 2]; const o = n.objetivos.find(x => x.id === id), r = radio(o); return o.materia === 'V' ? [o.x, o.y + r] : [o.x, o.y - r]; }
function puntosRuta(n, g, i) {
  const v = n.vasijas.find(x => x.id === g.de), r = g.rutas[i], pts = [salida(g, v)];
  if (g.valvula) pts.push(g.valvula);
  (r.via || []).forEach(p => pts.push(p)); pts.push(entrada(n, r.a));
  const out = [pts[0]];
  for (let q = 1; q < pts.length; q++) { const a = out[out.length - 1], b = pts[q]; if (a[0] !== b[0] && a[1] !== b[1]) out.push([b[0], a[1]]); out.push(b); }
  return out;
}
const largo = (p) => { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; };

// ── Firma de un nivel: si dos niveles comparten firma, tienen la misma dinámica ──
function firma(n) {
  const vas = n.vasijas, objs = n.objetivos || [], gr = n.grifos || [], co = n.compuertas || [];
  const principales = vas.filter(v => v.y <= 340).map(v => v.forma + (v.sellada ? '*' : '')).sort().join(',');
  const aux = vas.filter(v => v.y > 340).map(v => v.forma + (v.bascula ? '⚖' : '')).sort().join(',');
  const rutas = gr.map(g => (g.lado === 'arriba' ? 'c' : 'g') + g.rutas.length + (g.rutas.some(r => r.cristal) ? 'x' : '')).sort().join(',');
  const subida = gr.some(g => g.rutas.some(r => vas.find(v => v.id === r.a && v.y <= 340))) ? 'sube' : '';
  const ob = objs.map(o => o.tipo === 'turbina' ? 'T' : (o.pide ? 'C' + Object.keys(o.pide).length : 'D') + (o.alCompletar ? '!' : '')).sort().join(',');
  return [principales, aux, rutas, subida, co.map(c => c.tipo).sort().join(','), ob].join('|');
}
const FIRMAS = new Set();

// ── Plan de dinámicas por nivel: todos distintos, cada vez más ricos ──
const DINAMICAS = ['valvula', 'reserva', 'bascula', 'subida', 'matraz', 'capsula', 'alambique', 'sello', 'chocolate', 'cristal', 'regaliz', 'uva', 'combo'];
// Dinámicas de los niveles avanzados: dos básculas con su puente cada una, y una red de dos tuberías entre frascos
const DINAMICAS_AV = DINAMICAS.concat(['bascula2', 'red']);
function plan(id, r) {
  const i = id - 13, t = i / 35;
  const nDin = t < 0.15 ? 1 + Math.floor(r() * 2) : t < 0.55 ? 2 : t < 0.8 ? 2 + Math.floor(r() * 2) : 3;
  let pool = DINAMICAS.slice();
  const din = new Set();
  if (id >= 37) din.add('combo');                 // Región V: la Feria de los Sabores, siempre con pedidos combinados
  else if (id >= 20 && r() < 0.35) din.add('combo');
  while (din.size < nDin) din.add(elegir(r, pool));
  // Incompatibilidades sencillas
  if (din.has('alambique') && din.has('subida')) din.delete('subida');
  if (din.has('capsula') && din.has('matraz') && r() < 0.5) din.delete('matraz');
  const N = t < 0.25 ? elegir(r, [2, 3]) : t < 0.7 ? elegir(r, [2, 3, 3, 4]) : elegir(r, [3, 3, 4]);
  const K = t < 0.2 ? elegir(r, [1, 2]) : elegir(r, [2, 2, 3]);
  const lo = 4 + Math.floor(t * 8), hi = lo + 2 + (t > 0.6 ? 1 : 0);
  return { id, din: [...din], N, K, lo, hi };
}

// Sabores que se van presentando: Fresa (49+), Limón (61+), Arándano (73+)
function poolSabores(t) { const p = ['C', 'M', 'G', 'F']; if (t >= 12) p.push('L'); if (t >= 24) p.push('B'); return p; }
function planAvanzado(t, r, id) {
  const nDin = t < 12 ? 2 : t < 36 ? 2 + (r() < 0.5 ? 1 : 0) : 3 + (r() < 0.35 ? 1 : 0);
  const din = new Set();
  if (r() < 0.6) din.add('combo');
  // Cuanto más difícil, más básculas y más tuberías: más lógica que seguir
  if (t >= 18 && r() < Math.min(0.55, 0.2 + t / 120)) din.add(t >= 30 && r() < 0.5 ? 'bascula2' : 'bascula');
  if (t >= 24 && r() < Math.min(0.5, 0.15 + t / 140)) din.add(t >= 36 && r() < 0.5 ? 'red' : 'subida');
  while (din.size < nDin) din.add(elegir(r, DINAMICAS_AV));
  if (din.has('bascula2')) din.delete('bascula');
  if (din.has('red')) din.delete('subida');
  if (din.has('alambique') && (din.has('subida') || din.has('red'))) { din.delete('subida'); din.delete('red'); }
  if (din.has('capsula') && din.has('matraz') && r() < 0.5) din.delete('matraz');
  // Con dos básculas o red de tuberías, la dificultad viene de la lógica: menos frascos y sabores
  const mecanica = din.has('bascula2') || din.has('red');
  const N = mecanica ? elegir(r, [3, 3, 4]) : t < 12 ? elegir(r, [3, 4]) : t < 36 ? elegir(r, [3, 4, 4, 5]) : elegir(r, [4, 4, 5, 5]);
  const K = din.has('bascula2') ? 2 : t < 6 ? elegir(r, [2, 3]) : elegir(r, [2, 3, 3]);
  const pool = poolSabores(t), nSab = mecanica ? 3 : Math.min(4, 3 + Math.floor(t / 20));
  // El sabor que estrena cada región aparece seguro en sus primeros niveles
  const nuevo = t < 6 ? 'F' : t >= 12 && t < 18 ? 'L' : t >= 24 && t < 30 ? 'B' : null;
  const lo = Math.min(12 + Math.floor(t / 15), 16), hi = lo + 5;
  return { id, t, din: [...din], N, K, lo, hi, pool, nSab, nuevo, maxNecesita: 3, combo3: t >= 30 };
}
const XS = { 1: [180], 2: [95, 265], 3: [60, 180, 300], 4: [45, 135, 225, 315], 5: [30, 105, 180, 255, 330] };
const BAJA = [334, 350, 366, 382], ALTA = [150, 132], AUXL = 432;

// Construye el tablero de un plan (o null si no cabe limpio)
function construir(p, r) {
  const din = new Set(p.din);
  const n = { vasijas: [], grifos: [], compuertas: [], objetivos: [] };
  const nombres = 'ABCEFIJ';
  // Fila principal
  let formas = Array(p.N).fill('frasco');
  const especiales = [];
  if (din.has('alambique')) especiales.push('alambique');
  if (din.has('matraz')) especiales.push('matraz');
  if (din.has('capsula')) especiales.push('capsula');
  const huecos = barajar(r, [...Array(p.N).keys()]);
  especiales.forEach((f, k) => { if (k < huecos.length) formas[huecos[k]] = f; });
  if (formas.every(f => f === 'capsula')) return null;
  formas.forEach((f, k) => {
    const v = { id: nombres[k], forma: f, cap: 3, capas: [], x: XS[p.N][k], y: 300 };
    if (f === 'alambique' && p.N >= 4) v.forma = 'frasco';
    n.vasijas.push(v);
  });
  if (din.has('sello')) { const s = elegir(r, n.vasijas.filter(v => v.forma === 'frasco' || v.forma === 'alambique')); if (s) s.sellada = true; else return null; }
  // Fila de abajo: dulces y recipientes auxiliares
  const abajo = [];
  for (let k = 0; k < p.K; k++) abajo.push({ tipo: 'obj', id: 'T' + (k + 1) });
  if (din.has('reserva')) abajo.push({ tipo: 'aux', forma: 'frasco', id: p.pool ? 'H' : 'D', nombre: 'Reserva' });
  if (din.has('bascula') || din.has('bascula2')) abajo.push({ tipo: 'aux', forma: elegir(r, ['cuenco', 'cuenco', 'capsula']), id: 'S', bascula: true });
  if (din.has('bascula2')) abajo.push({ tipo: 'aux', forma: 'cuenco', id: 'S2', bascula: true });
  if (abajo.length > 4) return null;
  const xsB = barajar(r, XS[abajo.length].slice());
  abajo.forEach((b, k) => { b.x = xsB[k]; });
  abajo.sort((a, b) => a.x - b.x);
  abajo.forEach(b => {
    if (b.tipo === 'obj') n.objetivos.push({ id: b.id, tipo: 'dona', materia: 'C', necesita: 2, x: b.x, y: 505 });
    else n.vasijas.push(Object.assign({ id: b.id, forma: b.forma, cap: b.forma === 'cuenco' ? 4 : 3, capas: [], x: b.x, y: 470 }, b.nombre ? { nombre: b.nombre } : {}, b.bascula ? { bascula: { umbral: 2, abre: [] } } : {}));
  });
  // Alambique: chimenea hacia un molinillo encima
  const alam = n.vasijas.find(v => v.forma === 'alambique');
  if (alam) {
    const lado = alam.x < 180 ? 1 : -1, G = geom(Object.assign({}, alam, { cap: 5 }));
    const cx = alam.x + lado * (G.w / 2 - 12);
    n.objetivos.push({ id: 'TV', tipo: 'turbina', materia: 'V', necesita: 2, x: cx, y: 92 });
    n.grifos.push({ id: 'c' + alam.id, de: alam.id, lado: 'arriba', sale: lado === 1 ? 'der' : 'izq', rutas: [{ a: 'TV', via: [] }] });
  }
  // Rutas: cada destino de abajo recibe de un recipiente principal (preferiblemente el más cercano)
  const principales = n.vasijas.filter(v => v.y === 300 && v.forma !== 'capsula' || (v.y === 300 && v.forma === 'capsula'));
  const destinos = abajo.map(b => b.id);
  const fuentes = {};
  destinos.forEach(d => {
    const bx = (n.objetivos.find(o => o.id === d) || n.vasijas.find(v => v.id === d)).x;
    const orden = principales.slice().sort((a, b) => Math.abs(a.x - bx) - Math.abs(b.x - bx));
    const f = r() < 0.75 ? orden[0] : elegir(r, orden.slice(0, 2));
    (fuentes[f.id] = fuentes[f.id] || []).push(d);
  });
  if (din.has('red')) {
    const usables = principales.filter(v => v.forma !== 'capsula' && v.forma !== 'alambique');
    if (usables.length < 2) return null;
    const pares = [];
    for (let k = 0; k < 2; k++) {
      const a = elegir(r, usables), b = elegir(r, usables.filter(v => v.id !== a.id && !pares.some(p => p[0] === a.id && p[1] === v.id)));
      if (!b) return null; pares.push([a.id, b.id]);
      (fuentes[a.id] = fuentes[a.id] || []).push(b.id);
    }
  }
  // Subida: una ruta de un frasco a la boca de otro
  if (din.has('subida')) {
    const a = elegir(r, principales.filter(v => v.forma !== 'capsula')), b = elegir(r, principales.filter(v => v.id !== a.id && v.forma !== 'alambique'));
    if (!a || !b) return null;
    (fuentes[a.id] = fuentes[a.id] || []).push(b.id);
  }
  // Cápsula principal: no tiene boca, así que alguien la llena por tubo
  const cap = principales.find(v => v.forma === 'capsula');
  if (cap) {
    const otro = elegir(r, principales.filter(v => v.id !== cap.id && v.forma !== 'capsula'));
    if (!otro) return null;
    (fuentes[otro.id] = fuentes[otro.id] || []).push(cap.id);
  }
  // Construir los grifos (válvula si hay varias rutas); no dos grifos en el mismo hueco
  const huecoUsado = {};
  for (const fid of Object.keys(fuentes)) {
    const v = n.vasijas.find(x => x.id === fid), dests = fuentes[fid];
    if (dests.length > 3) return null;
    const xm = dests.map(d => entrada(n, d)[0]).reduce((a, b) => a + b, 0) / dests.length;
    let sale = xm >= v.x ? 'der' : 'izq';
    const idx = principales.indexOf(v);
    const hueco = (s) => s === 'der' ? idx + 0.5 : idx - 0.5;
    if (huecoUsado[hueco(sale)]) sale = sale === 'der' ? 'izq' : 'der';
    if (huecoUsado[hueco(sale)]) return null;
    huecoUsado[hueco(sale)] = true;
    const lado = sale === 'der' ? 1 : -1, sp = [v.x + lado * (ANCHO[v.forma] / 2 + 6), v.y - 10];
    const g = { id: 'g' + v.id, de: v.id, lado: 'abajo', sale, rutas: [] };
    if (dests.length > 1) {
      // Válvula: en filas de 4 sólo cabe en los extremos hacia fuera
      if (p.N >= 4 && !((idx === 0 && sale === 'izq') || (idx === p.N - 1 && sale === 'der'))) return null;
      g.valvula = [sp[0] + lado * 25, sp[1]];
    }
    dests.forEach(d => g.rutas.push({ a: d, via: [] }));
    n.grifos.push(g);
  }
  // Cápsula/cuenco auxiliar con báscula: puede tener grifo hacia un dulce vecino (contrapeso)
  const sAux = n.vasijas.find(v => v.id === 'S');
  if (sAux && sAux.forma === 'capsula') {
    const vecinos = n.objetivos.filter(o => o.tipo !== 'turbina').sort((a, b) => Math.abs(a.x - sAux.x) - Math.abs(b.x - sAux.x));
    if (vecinos[0] && Math.abs(vecinos[0].x - sAux.x) < 120) n.grifos.push({ id: 'gS', de: 'S', lado: 'abajo', sale: vecinos[0].x > sAux.x ? 'der' : 'izq', rutas: [{ a: vecinos[0].id, via: [] }] });
  }
  // Trazar vías por carriles y elegir la asignación de carriles con menos cruces
  const bajas = [], altas = [], auxs = [];
  n.grifos.forEach(g => g.rutas.forEach((ru, i) => {
    if (g.lado === 'arriba') return;
    const de = n.vasijas.find(v => v.id === g.de), dv = n.vasijas.find(v => v.id === ru.a);
    if (de.y > 340) auxs.push([g, i]);
    else if (dv && dv.y === 300) altas.push([g, i]);
    else bajas.push([g, i]);
  }));
  if (bajas.length > BAJA.length || altas.length > ALTA.length || auxs.length > 1) return null;
  const via = (g, i, L) => {
    const de = n.vasijas.find(v => v.id === g.de), lado = g.sale === 'der' ? 1 : -1, sp = salida(g, de);
    const cx = g.valvula ? g.valvula[0] : sp[0] + lado * 12, E = entrada(n, g.rutas[i].a);
    g.rutas[i].via = E[0] === cx ? [[cx, L]] : [[cx, L], [E[0], L]];
  };
  auxs.forEach(([g, i]) => via(g, i, AUXL));
  altas.forEach(([g, i], k) => via(g, i, ALTA[k]));
  let mejor = null;
  for (const perm of permutaciones(bajas.map((_, k) => k))) {
    perm.forEach((k, j) => via(bajas[j][0], bajas[j][1], BAJA[k]));
    const c = cruces(n);
    if (c < 0) continue;
    if (!mejor || c < mejor.c) mejor = { c, perm: perm.slice() };
  }
  if (!mejor || mejor.c > 2) return null;
  mejor.perm.forEach((k, j) => via(bajas[j][0], bajas[j][1], BAJA[k]));
  return n;
}
function permutaciones(a) { if (a.length <= 1) return [a]; const out = []; a.forEach((x, i) => permutaciones(a.slice(0, i).concat(a.slice(i + 1))).forEach(p => out.push([x].concat(p)))); return out; }

// Cruces entre tubos de rutas distintas; -1 si algún tubo atraviesa una pieza que no es su destino
function cruces(n) {
  const segs = [];
  n.grifos.forEach(g => g.rutas.forEach((ru, i) => {
    const pts = puntosRuta(n, g, i);
    for (let k = 1; k < pts.length; k++) segs.push({ a: pts[k - 1], b: pts[k], g: g.id, dest: ru.a, de: g.de, k, ultimo: k === pts.length - 1 });
  }));
  // Choques con piezas
  const cajas = n.vasijas.map(v => { const G = geom(Object.assign({}, v, { cap: v.y === 300 ? 5 : v.cap })); return { id: v.id, x1: G.izq - 3, x2: G.der + 3, y1: G.top - 4, y2: v.y + 8 }; })
    // El quemador del alambique es una pieza aparte: ni su propio tubo puede pasar por él
    .concat(n.vasijas.filter(v => v.forma === 'alambique').map(v => ({ id: 'fuego-' + v.id, x1: v.x - 38, x2: v.x + 38, y1: v.y + 8, y2: v.y + 44 })))
    .concat(n.objetivos.map(o => { const r = radio(o) + 2; return { id: o.id, x1: o.x - r, x2: o.x + r, y1: o.y - r, y2: o.y + r }; }));
  for (const s of segs) for (const c of cajas) {
    if (c.id === s.dest || c.id === s.de) continue;
    const x1 = Math.min(s.a[0], s.b[0]), x2 = Math.max(s.a[0], s.b[0]), y1 = Math.min(s.a[1], s.b[1]), y2 = Math.max(s.a[1], s.b[1]);
    if (x2 >= c.x1 && x1 <= c.x2 && y2 >= c.y1 && y1 <= c.y2) return -1;
  }
  // Tramos paralelos que se solapan (tubos encima de otros) de grifos distintos
  let c = 0;
  for (let i = 0; i < segs.length; i++) for (let j = i + 1; j < segs.length; j++) {
    const s = segs[i], t = segs[j]; if (s.g === t.g) continue;
    const hs = s.a[1] === s.b[1], ht = t.a[1] === t.b[1];
    if (hs === ht) {
      if (hs && Math.abs(s.a[1] - t.a[1]) < 14 && solapa(s.a[0], s.b[0], t.a[0], t.b[0])) return -1;
      if (!hs && Math.abs(s.a[0] - t.a[0]) < 14 && solapa(s.a[1], s.b[1], t.a[1], t.b[1])) return -1;
      continue;
    }
    const h = hs ? s : t, v = hs ? t : s;
    const hx1 = Math.min(h.a[0], h.b[0]), hx2 = Math.max(h.a[0], h.b[0]), vy1 = Math.min(v.a[1], v.b[1]), vy2 = Math.max(v.a[1], v.b[1]);
    if (v.a[0] > hx1 + 2 && v.a[0] < hx2 - 2 && h.a[1] > vy1 + 2 && h.a[1] < vy2 - 2) c++;
  }
  return c;
}
function solapa(a1, a2, b1, b2) { return Math.min(Math.max(a1, a2), Math.max(b1, b2)) - Math.max(Math.min(a1, a2), Math.min(b1, b2)) > 2; }

// Coloca una compuerta en el tramo horizontal más largo de una ruta
function ponerCompuerta(n, g, i, c) {
  // Se prueba a lo largo del tubo y se elige el punto más lejos de recipientes, quemadores y dulces
  const pts = puntosRuta(n, g, i), L = largo(pts);
  const cajas = n.vasijas.map(v => { const G = geom(v); return [G.izq - 4, G.top - 6, G.der + 4, v.y + (v.forma === 'alambique' ? 44 : 10)]; })
    .concat(n.objetivos.map(o => { const r = radio(o); return [o.x - r, o.y - r, o.x + r, o.y + r + 26]; }));
  let mejor = null;
  for (let t = 0.18; t <= 0.86; t += 0.02) {
    let obj = L * t, x = pts[0][0], y = pts[0][1], hor = false;
    for (let k = 1; k < pts.length; k++) { const d = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); if (obj <= d) { const f = d ? obj / d : 0; x = pts[k - 1][0] + (pts[k][0] - pts[k - 1][0]) * f; y = pts[k - 1][1] + (pts[k][1] - pts[k - 1][1]) * f; hor = pts[k][1] === pts[k - 1][1]; break; } obj -= d; }
    let lejos = 1e9; cajas.forEach(b => { const dx = Math.max(b[0] - x, 0, x - b[2]), dy = Math.max(b[1] - y, 0, y - b[3]); lejos = Math.min(lejos, Math.hypot(dx, dy)); });
    const nota = Math.min(lejos, 40) + (hor ? 6 : 0);
    if (!mejor || nota > mejor.nota) mejor = { nota, en: t };
  }
  n.compuertas.push(Object.assign({ ruta: [g.id, i], en: +mejor.en.toFixed(3) }, c));
}

// Mecanismos: báscula+puente, regaliz, molinillo+compuerta, chocolate, cristal
function mecanismos(n, p, r) {
  const din = new Set(p.din);
  const rutasObj = [];
  n.grifos.forEach(g => g.rutas.forEach((ru, i) => { if (n.objetivos.find(o => o.id === ru.a && o.tipo !== 'turbina')) rutasObj.push([g, i]); }));
  const libres = barajar(r, rutasObj);
  const tomar = () => libres.shift();
  if (din.has('bascula')) {
    const S = n.vasijas.find(v => v.id === 'S'); const ru = libres.find(([g]) => g.de !== 'S');
    if (!S || !ru) return false; libres.splice(libres.indexOf(ru), 1);
    ponerCompuerta(n, ru[0], ru[1], { id: 'P', tipo: 'puente' }); S.bascula.abre = ['P'];
  }
  if (din.has('bascula2')) {
    const S = n.vasijas.find(v => v.id === 'S'), S2 = n.vasijas.find(v => v.id === 'S2');
    const ru = libres.find(([g]) => g.de !== 'S' && g.de !== 'S2'); if (!S || !S2 || !ru) return false; libres.splice(libres.indexOf(ru), 1);
    ponerCompuerta(n, ru[0], ru[1], { id: 'P', tipo: 'puente' }); S.bascula.abre = ['P'];
    const ru2 = libres.find(([g]) => g.de !== 'S' && g.de !== 'S2'); if (!ru2) return false; libres.splice(libres.indexOf(ru2), 1);
    ponerCompuerta(n, ru2[0], ru2[1], { id: 'P2', tipo: 'puente' }); S2.bascula.abre = ['P2'];
  }
  const tv = n.objetivos.find(o => o.tipo === 'turbina');
  if (tv) { const ru = tomar(); if (ru) { ponerCompuerta(n, ru[0], ru[1], { id: 'K', tipo: 'compuerta' }); tv.alCompletar = { abre: ['K'] }; } }
  if (din.has('regaliz')) {
    const ru = tomar(); if (!ru) return false;
    const semilla = n.objetivos.find(o => o.tipo !== 'turbina' && o.id !== ru[0].rutas[ru[1]].a);
    if (!semilla) return false;
    semilla.semilla = true; semilla.alCompletar = { abre: ['R'] };
    ponerCompuerta(n, ru[0], ru[1], { id: 'R', tipo: 'regaliz' });
  }
  if (din.has('chocolate')) { const ru = tomar(); if (!ru) return false; ponerCompuerta(n, ru[0], ru[1], { id: 'Q', tipo: 'chocolate' }); ru[0].rutas[ru[1]].choco = true; }
  if (din.has('cristal')) { const ru = rutasObj.find(([g, i]) => !g.rutas[i].choco) || rutasObj[0]; if (!ru) return false; ru[0].rutas[ru[1]].cristal = true; }
  n.grifos.forEach(g => g.rutas.forEach(ru => delete ru.choco));
  return true;
}

// Contenido al azar coherente con las dinámicas
// Contenido: primero los pedidos y después la materia JUSTA para cumplirlos (más lo que se gasta en fundir
// chocolate y hacer vapor), con como mucho una medida de margen. Así no sobra líquido al terminar.
function rellenar(base, p, r) {
  const n = copia(base), din = new Set(p.din);
  let paleta = barajar(r, ['C', 'M', 'G']).slice(0, 2 + (r() < 0.5 ? 1 : 0));
  if (p.pool) {
    paleta = barajar(r, p.pool).slice(0, Math.max(2, p.nSab - (r() < 0.3 ? 1 : 0)));
    if (p.nuevo && paleta.indexOf(p.nuevo) < 0) paleta[0] = p.nuevo;
  }
  if (din.has('uva')) paleta.push('U');
  if (din.has('cristal') && paleta.indexOf('M') < 0) paleta.push('M');
  if ((din.has('chocolate') || din.has('sello') || din.has('alambique')) && paleta.indexOf('C') < 0) paleta.push('C');
  if (din.has('alambique') && paleta.indexOf('M') < 0) paleta.push('M');
  if (din.has('regaliz') && paleta.indexOf('G') < 0) paleta.push('G');
  // 1) Pedidos
  const sinTurb = n.objetivos.filter(o => o.tipo !== 'turbina');
  const combos = din.has('combo') ? 1 + (p.id >= 41 && sinTurb.length > 1 && r() < 0.6 ? 1 : 0) + (p.pool && sinTurb.length > 2 && r() < 0.35 ? 1 : 0) : 0;
  const maxN = p.maxNecesita || 3;
  barajar(r, sinTurb).forEach((o, k) => {
    delete o.pide;
    if (o.semilla) { o.materia = 'G'; o.necesita = 1 + Math.floor(r() * 2); return; }
    if (k < combos && paleta.length >= 2) {
      const tres = p.combo3 && paleta.length >= 3 && r() < 0.45;
      const sab = barajar(r, paleta).slice(0, tres ? 3 : 2);
      o.pide = {}; sab.forEach(m => { o.pide[m] = 1 + Math.floor(r() * (tres ? 1.6 : 2)); });
      delete o.materia; delete o.necesita;
      return;
    }
    o.materia = elegir(r, paleta); o.necesita = 1 + Math.floor(r() * maxN);
  });
  // El sabor nuevo de la región tiene que pedirlo algún dulce
  if (p.nuevo && !sinTurb.some(o => o.materia === p.nuevo || (o.pide && o.pide[p.nuevo]))) { const o = sinTurb.find(x => !x.semilla && !x.pide && !n.grifos.some(g => g.rutas.some(ru => ru.cristal && ru.a === x.id))); if (!o) return null; o.materia = p.nuevo; }
  n.objetivos.filter(o => o.tipo === 'turbina').forEach(o => { o.necesita = elegir(r, [2, 2, 4]); });
  n.grifos.forEach(g => g.rutas.forEach(ru => { if (ru.cristal) { const o = n.objetivos.find(x => x.id === ru.a); if (o && !o.pide && o.materia !== 'M') { o.materia = 'M'; } } }));
  // La uva tiene que pedirla algún dulce (si no, se quedaría sobrando como contrapeso)
  const pideU = sinTurb.some(o => o.materia === 'U' || (o.pide && o.pide.U));
  if (din.has('uva') && !pideU) { const o = sinTurb.find(x => !x.semilla && !x.pide && !n.grifos.some(g => g.rutas.some(ru => ru.cristal && ru.a === x.id))); if (o) o.materia = 'U'; }
  // 2) Materia necesaria
  const cuenta = {};
  const suma = (m, k) => { cuenta[m] = (cuenta[m] || 0) + k; };
  sinTurb.forEach(o => { if (o.pide) for (const m in o.pide) suma(m, o.pide[m]); else suma(o.materia, o.necesita); });
  n.objetivos.filter(o => o.tipo === 'turbina').forEach(o => { suma('C', o.necesita / 2); suma('M', o.necesita / 2); });
  n.vasijas.forEach(v => { if (v.sellada) suma('C', 1); });
  (n.compuertas || []).forEach(c => { if (c.tipo === 'chocolate') suma('C', 1); });
  // Básculas sin grifo: su contrapeso se queda en ellas (es intencionado y se ve), así que se añade aparte
  n.vasijas.filter(v => v.bascula).forEach(v => {
    v.bascula.umbral = 1 + Math.floor(r() * (p.pool ? 3 : 4));
    if (p.pool && !n.grifos.some(g => g.de === v.id)) suma(elegir(r, Object.keys(cuenta).filter(m => m !== 'U').concat(['C']).slice(0, 4)), v.bascula.umbral);
  });
  if (r() < 0.45) suma(elegir(r, Object.keys(cuenta)), 1); // como mucho una medida de margen
  const bolsa = barajar(r, [].concat(...Object.keys(cuenta).map(m => Array(cuenta[m]).fill(m))));
  // 3) Capacidades y reparto en los recipientes de arriba (los de abajo empiezan vacíos casi siempre)
  const arriba = n.vasijas.filter(v => v.y === 300), abajo = n.vasijas.filter(v => v.y !== 300);
  arriba.forEach(v => { v.cap = v.forma === 'frasco' ? elegir(r, p.pool && p.t >= 24 ? [4, 4, 5, 5] : [3, 4, 4, 5]) : v.forma === 'matraz' ? 3 : v.forma === 'alambique' ? elegir(r, [4, 5]) : elegir(r, [3, 4]); v.capas = []; });
  abajo.forEach(v => { v.cap = v.forma === 'cuenco' ? elegir(r, [3, 4]) : 3; v.capas = []; });
  const huecoTotal = n.vasijas.reduce((t, v) => t + v.cap, 0);
  if (bolsa.length > huecoTotal - 3) return null; // hace falta sitio libre para maniobrar
  const destinos = arriba.filter(v => !(v.forma === 'capsula' && r() < 0.6));
  if (!destinos.length) return null;
  for (const m of bolsa) {
    const libres = destinos.filter(v => v.capas.length < v.cap - (v.forma === 'alambique' ? 1 : 0) && (v.forma !== 'alambique' || v.capas.every(x => x === m)));
    const v = libres.length ? elegir(r, libres) : (abajo.filter(x => x.capas.length < x.cap && r() < 0.5)[0]);
    if (!v) return null;
    v.capas.push(m);
  }
  // Niveles avanzados: poco hueco libre en total (3 o 4 medidas). Obliga a pensar el orden y mantiene el
  // número de estados al alcance del análisis, aunque haya muchos frascos y sabores
  if (p.pool) {
    const holgura = 4 + (r() < 0.5 ? 1 : 0);
    n.vasijas.forEach(v => { v.cap = Math.max(v.capas.length + (v.forma === 'alambique' ? 1 : 0), v.forma === 'matraz' ? 2 : 1); });
    let libre = holgura;
    const crecer = n.vasijas.filter(v => v.forma !== 'alambique' || true);
    for (let g = 0; g < 200 && libre > 0; g++) { const v = elegir(r, crecer); if (v.cap < 5) { v.cap++; libre--; } }
    if (libre > 0) return null;
  }
  return n;
}

function azar(n, limite, veces, r) {
  const accs = Motor.acciones(n); let g = 0;
  for (let t = 0; t < veces; t++) {
    let s = Motor.estadoInicial(n);
    for (let m = 0; m < limite; m++) {
      const ok = []; for (const a of accs) { const x = Motor.aplicar(n, s, a); if (x.ok) ok.push(x.estado); }
      if (!ok.length) break;
      s = ok[Math.floor(r() * ok.length)];
      if (Motor.ganado(n, s)) { g++; break; }
    }
  }
  return g / veces;
}
// ¿Usa la solución todas las dinámicas del plan? (que no sobre ningún mecanismo)
function usaTodo(n, sol, p) {
  let s = Motor.estadoInicial(n); const abiertas = new Set(), usadas = new Set();
  for (const a of sol) {
    const r = Motor.aplicar(n, s, a); r.ev.forEach(e => { if (e.k === 'abre') abiertas.add(e.id); if (e.k === 'funde') abiertas.add(e.id); if (e.k === 'reacciona') usadas.add('alambique'); });
    if (a.t === 'g') { const g = n.grifos.find(x => x.id === a.g); usadas.add('ruta:' + g.id + ':' + a.r); if (g.rutas[a.r].cristal) usadas.add('cristal'); const d = n.vasijas.find(v => v.id === g.rutas[a.r].a); if (d && d.y === 300) usadas.add('subida'); }
    else { const d = n.vasijas.find(v => v.id === a.b); if (d && d.nombre === 'Reserva') usadas.add('reserva'); if (n.vasijas.find(v => v.id === a.a).forma === 'matraz' || n.vasijas.find(v => v.id === a.b).forma === 'matraz') usadas.add('matraz'); }
    if (a.t === 'g' && n.grifos.find(x => x.id === a.g).rutas.length > 1) usadas.add('valvula');
    s = r.estado;
  }
  n.grifos.forEach(g => g.rutas.forEach((ru, i) => { const d = n.vasijas.find(v => v.id === ru.a); if (d && d.nombre === 'Reserva' && usadas.has('ruta:' + g.id + ':' + i)) usadas.add('reserva'); if (d && d.forma === 'matraz' && usadas.has('ruta:' + g.id + ':' + i)) usadas.add('matraz'); }));
  (n.compuertas || []).forEach(c => { if (abiertas.has(c.id) || Motor.compuertaAbierta(n, s, c.id)) usadas.add(c.tipo === 'puente' ? 'bascula' : c.tipo === 'regaliz' ? 'regaliz' : c.tipo === 'chocolate' ? 'chocolate' : 'comp'); });
  if (n.vasijas.some(v => v.sellada) && !s.sello[n.vasijas.find(v => v.sellada).id]) usadas.add('sello');
  if (n.vasijas.some(v => v.forma === 'capsula' && v.y === 300)) usadas.add('capsula');
  if (n.objetivos.some(o => o.pide)) usadas.add('combo');
  const puentes = (n.compuertas || []).filter(c => c.tipo === 'puente' && (abiertas.has(c.id) || Motor.compuertaAbierta(n, s, c.id))).length;
  if (puentes >= 2) usadas.add('bascula2');
  let subidas = 0; n.grifos.forEach(g => g.rutas.forEach((ru, i) => { const d = n.vasijas.find(v => v.id === ru.a); if (d && d.y === 300 && usadas.has('ruta:' + g.id + ':' + i)) subidas++; }));
  if (subidas >= 2) usadas.add('red');
  if (JSON.stringify(n).indexOf('"U"') >= 0) usadas.add('uva');
  return p.din.every(d => usadas.has(d) || d === 'uva');
}

const DINAMICAS_USADAS = new Set(), FIJO = {};
// Medidas que quedan en los recipientes al acabar la solución
// (el contrapeso que queda en una báscula no cuenta: es intencionado y se ve)
function sobrante(n, sol) { let s = Motor.estadoInicial(n); sol.forEach(a => { s = Motor.aplicar(n, s, a).estado; }); let t = 0; for (const k in s.v) { const v = n.vasijas.find(x => x.id === k); if (!(v && v.bascula)) t += s.v[k].length; } return t; }
function claveDin(d) { return d.slice().sort().join('+'); }
function generar(id, segundos, opc) {
  opc = opc || {};
  const r = rng(opc.semilla !== undefined ? opc.semilla : id * 104729 + 7), fin = Date.now() + segundos * 1000;
  const hacerPlan = opc.planear || ((id, r) => (id >= 49 ? planAvanzado(id - 49, r, id) : plan(id, r)));
  let mejor = null, intentos = 0;
  const st = opc.stats || {}, cuenta = (k) => { st[k] = (st[k] || 0) + 1; };
  while (Date.now() < fin) {
    const p = hacerPlan(id, r);
    if (FIJO[id]) p.din = FIJO[id].slice(); // se conserva la combinación de dinámicas ya asignada a este nivel
    else if (DINAMICAS_USADAS.has(claveDin(p.din))) continue; // ninguna combinación de dinámicas se repite entre niveles
    const base = construir(p, r);
    if (!base) { cuenta('construir'); continue; }
    if (!mecanismos(base, p, r)) { cuenta('mecanismos'); continue; }
    for (let k = 0; k < 120 && Date.now() < fin; k++) {
      intentos++;
      const n = rellenar(base, p, r); if (!n) { cuenta('rellenar'); continue; }
      const f = firma(n); if (FIRMAS.has(f)) break;
      const s0 = Motor.estadoInicial(n); if (Motor.ganado(n, s0)) continue;
      const sol = Motor.resolver(n, s0, opc.limite || (p.pool ? 60000 : 40000));
      if (!sol) { cuenta('sinSolucion'); continue; }
      if (sol.length < p.lo) { cuenta('corto'); continue; }
      if (sol.length > p.hi) { cuenta('largo'); continue; }
      if (!usaTodo(n, sol, p)) { cuenta('usaTodo'); continue; }
      if (sobrante(n, sol) > 1) { cuenta('sobra'); continue; } // al terminar no puede quedar más de una medida en los recipientes
      const pre = sol.length * 3 + p.din.length * 4;
      if (mejor && pre < mejor.pre - 3) continue;
      const a = Motor.analizar(n, opc.limiteAnalisis || (p.pool ? 80000 : 100000)); if (!a.completo) { cuenta('analisis'); continue; }
      const muertos = a.estados - a.dist.size;
      if (a.estados < 30) continue;
      const lim = sol.length + Math.max(2, Math.ceil(sol.length * 0.6));
      const w = azar(n, lim, opc.partidas || 150, r); if (w > 0.25) { cuenta('azar'); continue; }
      const puntos = sol.length * 3 + p.din.length * 4 + (muertos / a.estados) * 8 - w * 20 + (k % 3 === 0 ? r() : 0);
      if (!mejor || puntos > mejor.puntos) mejor = { n, sol, puntos, pre, plan: p, firma: f, estados: a.estados, muertos, azar: w };
    }
    if (mejor && Date.now() > fin - segundos * 400) break; // con un buen candidato no hace falta agotar el tiempo
    if (mejor && opc.rapido && Date.now() > fin - segundos * 800) break;
  }
  return { mejor, intentos };
}

  // Desde fuera: generar un nivel, la firma, y los conjuntos de firmas y dinámicas ya usadas
  var API = { geom: geom, radio: radio, salida: salida, entrada: entrada, puntosRuta: puntosRuta, cruces: cruces, generar: generar, firma: firma, sobrante: sobrante, claveDin: claveDin, planAvanzado: planAvanzado, plan: plan, rng: rng,
    FIRMAS: FIRMAS, DINAMICAS_USADAS: DINAMICAS_USADAS, FIJO: FIJO, DINAMICAS: DINAMICAS };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.Generador = API;
})(typeof self !== 'undefined' ? self : this);
