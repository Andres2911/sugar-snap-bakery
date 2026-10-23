/* ALQUIMIA · Motor de reglas determinista.
   Todo el estado del tablero se valida aquí antes de animar nada.
   Funciona en el navegador (window.Motor) y en Node (require) para el solucionador. */
(function (global) {
  'use strict';

  // Materias: peso (básculas), densidad (0 se hunde, 1 normal, 2 sube)
  var MATERIA = {
    C: { nombre: 'Caramelo Ígneo', prop: 'Calor', peso: 1, dens: 1 },
    M: { nombre: 'Menta Fluida', prop: 'Flujo', peso: 1, dens: 1 },
    G: { nombre: 'Matcha Vital', prop: 'Vida', peso: 1, dens: 1 },
    U: { nombre: 'Uva Galáctica', prop: 'Gravedad', peso: 2, dens: 0 },
    V: { nombre: 'Vapor de Azúcar', prop: 'Empuje', peso: 0, dens: 2 }
  };

  function clone(s) {
    var v = {};
    for (var k in s.v) v[k] = s.v[k].slice();
    var tiene = {};
    for (var t in s.tiene) tiene[t] = typeof s.tiene[t] === 'object' ? Object.assign({}, s.tiene[t]) : s.tiene[t];
    return { v: v, sello: Object.assign({}, s.sello), tiene: tiene,
             hecho: Object.assign({}, s.hecho), fijo: Object.assign({}, s.fijo) };
  }

  function index(nivel) {
    if (nivel._ix) return nivel._ix;
    var ix = { vas: {}, obj: {}, comp: {}, grifo: {} };
    nivel.vasijas.forEach(function (x) { ix.vas[x.id] = x; });
    (nivel.objetivos || []).forEach(function (x) {
      ix.obj[x.id] = x;
      // Pedido combinado: la primera materia da el color principal y 'necesita' es el total
      if (x.pide) { var ks = Object.keys(x.pide); x.materia = ks[0]; x.necesita = ks.reduce(function (a, k) { return a + x.pide[k]; }, 0); }
    });
    (nivel.compuertas || []).forEach(function (x) { ix.comp[x.id] = x; });
    (nivel.grifos || []).forEach(function (x) {
      ix.grifo[x.id] = x;
      x.rutas.forEach(function (r) { r.compuertas = []; });
    });
    // Cada compuerta se coloca sobre una ruta; se atraviesan en orden de avance (en).
    (nivel.compuertas || []).slice().sort(function (a, b) { return a.en - b.en; }).forEach(function (c) {
      ix.grifo[c.ruta[0]].rutas[c.ruta[1]].compuertas.push(c.id);
    });
    Object.defineProperty(nivel, '_ix', { value: ix, enumerable: false });
    return ix;
  }

  function estadoInicial(nivel) {
    var s = { v: {}, sello: {}, tiene: {}, hecho: {}, fijo: {} };
    nivel.vasijas.forEach(function (x) {
      s.v[x.id] = (x.capas || []).slice();
      asentar(s.v[x.id], x.forma === 'alambique');
      if (x.sellada) s.sello[x.id] = true;
    });
    index(nivel);
    (nivel.objetivos || []).forEach(function (o) {
      if (o.pide) { s.tiene[o.id] = {}; Object.keys(o.pide).forEach(function (k) { s.tiene[o.id][k] = 0; }); }
      else s.tiene[o.id] = 0;
    });
    return actualizar(nivel, s, []);
  }

  function peso(capas) {
    var p = 0;
    for (var i = 0; i < capas.length; i++) p += MATERIA[capas[i]].peso;
    return p;
  }

  function basculaActiva(nivel, s, idVasija) {
    var x = index(nivel).vas[idVasija];
    return !!(x && x.bascula && peso(s.v[idVasija]) >= x.bascula.umbral);
  }

  function compuertaAbierta(nivel, s, id) {
    if (s.fijo[id]) return true;
    var vs = nivel.vasijas;
    for (var i = 0; i < vs.length; i++) {
      var b = vs[i].bascula;
      if (b && b.abre.indexOf(id) >= 0 && peso(s.v[vs[i].id]) >= b.umbral) return true;
    }
    return false;
  }

  function racha(capas, desdeAbajo) {
    if (!capas.length) return 0;
    var n = 1;
    if (desdeAbajo) { while (n < capas.length && capas[n] === capas[0]) n++; }
    else { var t = capas.length - 1; while (n < capas.length && capas[t - n] === capas[t]) n++; }
    return n;
  }

  // Densidad y reacciones. Sólo en el alambique (con fuego) Caramelo + Menta -> 2 Vapor.
  // Devuelve cuántas unidades de vapor se han formado.
  function asentar(capas, alambique) {
    var reacc = 0;
    for (;;) {
      ordenar(capas);
      if (!alambique) return reacc;
      var i = -1;
      for (var k = 0; k < capas.length - 1; k++) {
        var a = capas[k], b = capas[k + 1];
        if ((a === 'C' && b === 'M') || (a === 'M' && b === 'C')) { i = k; break; }
      }
      if (i < 0) return reacc;
      var abajo = 1; while (i - abajo >= 0 && capas[i - abajo] === capas[i]) abajo++;
      var arriba = 1; while (i + 1 + arriba < capas.length && capas[i + 1 + arriba] === capas[i + 1]) arriba++;
      var n = Math.min(abajo, arriba);
      for (var j = i - n + 1; j <= i + n; j++) capas[j] = 'V';
      reacc += 2 * n;
    }
  }
  function ordenar(capas) {
    var conIdx = capas.map(function (m, i) { return [MATERIA[m].dens, i, m]; });
    conIdx.sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; });
    for (var i = 0; i < capas.length; i++) capas[i] = conIdx[i][2];
  }

  // Tras cada acción: básculas con enclavamiento, objetivos completados y sus efectos.
  function actualizar(nivel, s, ev) {
    var cambio = true;
    while (cambio) {
      cambio = false;
      nivel.vasijas.forEach(function (x) {
        if (x.bascula && x.bascula.fija && basculaActiva(nivel, s, x.id)) {
          x.bascula.abre.forEach(function (g) { if (!s.fijo[g]) { s.fijo[g] = true; cambio = true; ev.push({ k: 'abre', id: g }); } });
        }
      });
      (nivel.objetivos || []).forEach(function (o) {
        if (!s.hecho[o.id] && completo(o, s)) {
          s.hecho[o.id] = true; cambio = true;
          ev.push({ k: 'restaurado', id: o.id });
          var ef = o.alCompletar || {};
          (ef.abre || []).forEach(function (g) { if (!s.fijo[g]) { s.fijo[g] = true; ev.push({ k: 'abre', id: g, por: o.id }); } });
          (ef.desella || []).forEach(function (v) { if (s.sello[v]) { delete s.sello[v]; ev.push({ k: 'desellado', id: v }); } });
        }
      });
    }
    return s;
  }

  // ¿Tiene ya el objetivo todo lo que pide?
  function completo(o, s) {
    if (!o.pide) return s.tiene[o.id] >= o.necesita;
    for (var k in o.pide) if (s.tiene[o.id][k] < o.pide[k]) return false;
    return true;
  }
  // Total de medidas recibidas (sirve igual para pedidos simples y combinados)
  function recibido(o, s) {
    var t = s.tiene[o.id];
    if (typeof t !== 'object') return t;
    var n = 0; for (var k in t) n += Math.min(t[k], o.pide[k]); return n;
  }
  function accesoSuperior(x) { return x.forma !== 'capsula'; }
  function cuelloEstrecho(x) { return x.forma === 'matraz'; }

  // 'codigo' y 'datos' permiten traducir el mensaje en la interfaz; 'motivo' queda en español como respaldo
  function fallo(motivo, foco, codigo, datos) { return { ok: false, motivo: motivo, foco: foco || [], codigo: codigo || 'otro', datos: datos || {} }; }

  // ---- Acción: trasvasar a mano (de boca a boca) ----
  function trasvasar(nivel, s0, a, b) {
    var ix = index(nivel), va = ix.vas[a], vb = ix.vas[b];
    if (!va || !vb || a === b) return fallo('Elige dos recipientes distintos.', [], 'distintos');
    if (!accesoSuperior(va)) return fallo('La cápsula está cerrada: sólo se llena y vacía por tubos.', [a], 'capsula');
    if (!accesoSuperior(vb)) return fallo('La cápsula está cerrada: sólo recibe materia por tubos.', [b], 'capsula');
    var ca = s0.v[a];
    if (!ca.length) return fallo('Ese recipiente está vacío.', [a], 'vacio');
    if (s0.sello[a]) return fallo('Tiene un sello de chocolate duro. Fúndelo con caramelo.', [a], 'sello_origen');
    var m = ca[ca.length - 1];
    if (m === 'V') return fallo('El vapor no se puede verter: sólo sube por las chimeneas.', [a], 'vapor_verter');
    var s = clone(s0), ev = [];
    var disp = racha(ca, false);
    if (cuelloEstrecho(va) || cuelloEstrecho(vb)) disp = Math.min(disp, 1);
    var fundido = 0;
    if (s.sello[b]) {
      if (m !== 'C') return fallo('Sello de chocolate duro: sólo el Caramelo Ígneo lo funde.', [b], 'sello_destino');
      delete s.sello[b]; fundido = 1; disp -= 1;
      ev.push({ k: 'funde', id: b });
    }
    var hueco = vb.cap - s.v[b].length;
    var n = Math.min(disp, hueco);
    if (n <= 0 && !fundido) return fallo('No cabe: el recipiente está lleno.', [b], 'lleno');
    s.v[a].splice(s.v[a].length - (n + fundido), n + fundido);
    for (var i = 0; i < n; i++) s.v[b].push(m);
    var r = asentar(s.v[b], vb.forma === 'alambique');
    ev.unshift({ k: 'vierte', de: a, a: b, m: m, n: n });
    if (r) ev.push({ k: 'reacciona', id: b, n: r });
    actualizar(nivel, s, ev);
    return { ok: true, estado: s, ev: ev };
  }

  // ---- Acción: abrir un grifo (fondo) o chimenea (boca) siguiendo la ruta de su válvula ----
  function abrirGrifo(nivel, s0, idGrifo, ruta) {
    var ix = index(nivel), g = ix.grifo[idGrifo];
    if (!g) return fallo('Grifo desconocido.');
    var r = g.rutas[ruta || 0];
    var capas = s0.v[g.de];
    if (!capas.length) return fallo('No queda materia en ese recipiente.', [g.de], 'sin_materia');
    var chimenea = g.lado === 'arriba';
    var m = chimenea ? capas[capas.length - 1] : capas[0];
    if (chimenea && s0.sello[g.de]) return fallo('La chimenea está sellada con chocolate duro. Fúndelo con caramelo.', [g.de], 'chimenea_sellada');
    if (chimenea && m !== 'V') return fallo('Por la chimenea sólo sube el vapor.', [g.id], 'chimenea_vapor');
    if (!chimenea && m === 'V') return fallo('El vapor no baja por los tubos: busca una chimenea.', [g.id], 'vapor_baja');
    if (r.cristal && m !== 'M') return fallo('Los tubos de cristal sólo conducen la Menta Fluida.', [g.id], 'cristal');
    var disp = racha(capas, !chimenea);
    var s = clone(s0), ev = [];
    var gastado = 0;
    var comps = r.compuertas || [];
    for (var i = 0; i < comps.length; i++) {
      var c = ix.comp[comps[i]];
      if (compuertaAbierta(nivel, s, c.id)) continue;
      if (c.tipo === 'chocolate' && m === 'C') {
        s.fijo[c.id] = true; gastado += 1; disp -= 1;
        ev.push({ k: 'funde', id: c.id });
        if (disp <= 0) break;
        continue;
      }
      var msg = c.tipo === 'chocolate' ? 'Un bloque de chocolate tapa el tubo: sólo el caramelo lo funde.'
        : c.tipo === 'regaliz' ? 'Falta el puente de regaliz: hay que hacerlo brotar con Matcha.'
        : 'La compuerta está cerrada: busca qué mecanismo la levanta.';
      return fallo(msg, [c.id], 'cerrado_' + c.tipo);
    }
    var n = 0;
    if (disp > 0) {
      if (ix.vas[r.a]) {
        n = Math.min(disp, ix.vas[r.a].cap - s.v[r.a].length);
        if (n <= 0 && !gastado) return fallo('No cabe: el recipiente de destino está lleno.', [r.a], 'lleno');
      } else {
        var o = ix.obj[r.a];
        if (o.pide) {
          if (!o.pide[m]) return fallo((o.nombre || 'El objetivo') + ' rechaza ' + MATERIA[m].nombre + '.', [o.id], 'rechaza', { obj: o.id, m: m });
          n = Math.min(disp, o.pide[m] - s.tiene[o.id][m]);
          if (n <= 0 && !gastado) return fallo('Ya tiene todo el ' + MATERIA[m].nombre + ' que pide.', [o.id], 'sobra', { obj: o.id, m: m });
        } else {
          if (o.materia !== m) return fallo((o.nombre || 'El objetivo') + ' rechaza ' + MATERIA[m].nombre + '.', [o.id], 'rechaza', { obj: o.id, m: m });
          n = Math.min(disp, o.necesita - s.tiene[o.id]);
          if (n <= 0 && !gastado) return fallo('Ya está restaurado: no necesita más.', [o.id], 'completo');
        }
      }
    }
    var quitar = n + gastado;
    if (chimenea) s.v[g.de].splice(capas.length - quitar, quitar);
    else s.v[g.de].splice(0, quitar);
    if (n > 0) {
      if (ix.vas[r.a]) {
        for (var k = 0; k < n; k++) s.v[r.a].push(m);
        var re = asentar(s.v[r.a], ix.vas[r.a].forma === 'alambique');
        if (re) ev.push({ k: 'reacciona', id: r.a, n: re });
      } else if (ix.obj[r.a].pide) s.tiene[r.a][m] += n;
      else s.tiene[r.a] += n;
    }
    ev.unshift({ k: 'fluye', grifo: g.id, ruta: ruta || 0, m: m, n: n, a: r.a, gastado: gastado });
    actualizar(nivel, s, ev);
    return { ok: true, estado: s, ev: ev };
  }

  function aplicar(nivel, s, acc) {
    return acc.t === 'v' ? trasvasar(nivel, s, acc.a, acc.b) : abrirGrifo(nivel, s, acc.g, acc.r);
  }

  function ganado(nivel, s) {
    return (nivel.objetivos || []).every(function (o) { return o.opcional || s.hecho[o.id]; });
  }

  function clave(s) {
    var p = [];
    for (var k in s.v) p.push(s.v[k].join(''));
    p.push(Object.keys(s.sello).sort().join(','));
    for (var t in s.tiene) { var x = s.tiene[t]; p.push(typeof x === 'object' ? Object.keys(x).map(function (k) { return k + x[k]; }).join('') : x); }
    p.push(Object.keys(s.fijo).sort().join(','));
    return p.join('|');
  }

  function acciones(nivel) {
    var lista = [];
    nivel.vasijas.forEach(function (a) {
      nivel.vasijas.forEach(function (b) { if (a !== b) lista.push({ t: 'v', a: a.id, b: b.id }); });
    });
    (nivel.grifos || []).forEach(function (g) {
      g.rutas.forEach(function (_, i) { lista.push({ t: 'g', g: g.id, r: i }); });
    });
    return lista;
  }

  // Búsqueda en anchura: camino más corto hasta la victoria (o null si no hay salida).
  function resolver(nivel, s0, limite) {
    limite = limite || 250000;
    if (ganado(nivel, s0)) return [];
    var accs = acciones(nivel);
    var visto = new Map(); visto.set(clave(s0), null);
    var cola = [s0], padres = [null], movs = [null], cab = 0;
    while (cab < cola.length && cola.length < limite) {
      var s = cola[cab];
      for (var i = 0; i < accs.length; i++) {
        var r = aplicar(nivel, s, accs[i]);
        if (!r.ok) continue;
        var k = clave(r.estado);
        if (visto.has(k)) continue;
        visto.set(k, true);
        cola.push(r.estado); padres.push(cab); movs.push(accs[i]);
        if (ganado(nivel, r.estado)) {
          var camino = [], j = cola.length - 1;
          while (padres[j] !== null) { camino.unshift(movs[j]); j = padres[j]; }
          return camino;
        }
      }
      cab++;
    }
    return null;
  }

  // Análisis completo del nivel: distancia mínima a la victoria de cada estado alcanzable.
  // Los estados que no aparecen en el mapa son callejones sin salida.
  function analizar(nivel, limite) {
    limite = limite || 300000;
    var s0 = estadoInicial(nivel), accs = acciones(nivel);
    var ids = new Map(), estados = [s0], inversas = [[]];
    ids.set(clave(s0), 0);
    for (var i = 0; i < estados.length && estados.length < limite; i++) {
      for (var a = 0; a < accs.length; a++) {
        var r = aplicar(nivel, estados[i], accs[a]);
        if (!r.ok) continue;
        var k = clave(r.estado), j = ids.get(k);
        if (j === undefined) { j = estados.length; ids.set(k, j); estados.push(r.estado); inversas.push([]); }
        inversas[j].push(i);
      }
    }
    var d = new Int32Array(estados.length).fill(-1), cola = [];
    for (var w = 0; w < estados.length; w++) if (ganado(nivel, estados[w])) { d[w] = 0; cola.push(w); }
    for (var c = 0; c < cola.length; c++) {
      var x = cola[c], pre = inversas[x];
      for (var p = 0; p < pre.length; p++) if (d[pre[p]] < 0) { d[pre[p]] = d[x] + 1; cola.push(pre[p]); }
    }
    var dist = new Map();
    ids.forEach(function (idx, k) { if (d[idx] >= 0) dist.set(k, d[idx]); });
    return { dist: dist, estados: estados.length, completo: estados.length < limite };
  }

  var Motor = { MATERIA: MATERIA, analizar: analizar, estadoInicial: estadoInicial, aplicar: aplicar, trasvasar: trasvasar,
    abrirGrifo: abrirGrifo, ganado: ganado, resolver: resolver, peso: peso, compuertaAbierta: compuertaAbierta,
    basculaActiva: basculaActiva, clave: clave, acciones: acciones, index: index, completo: completo, recibido: recibido };
  if (typeof module !== 'undefined' && module.exports) module.exports = Motor;
  else global.Motor = Motor;
})(this);
