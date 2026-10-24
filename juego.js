/* SUGAR-SNAP BAKERY · Interfaz, tablero, recompensas, audio e idiomas.
   El tablero se construye una vez por nivel y después sólo se actualiza lo que cambia,
   para que los toques y las animaciones sean fluidos también en tablets. */
(function () {
  'use strict';

  var M = window.Motor, NIVELES = window.NIVELES, REGIONES = window.REGIONES, EN = window.NIVELES_EN, TX = window.TEXTOS;
  var NS = 'http://www.w3.org/2000/svg';
  var $ = function (id) { return document.getElementById(id); };

  // ───────────────────────── Datos de presentación ─────────────────────────
  var COLOR = {
    C: { base: '#f5a524', luz: '#ffd877', sombra: '#c4670f' },
    M: { base: '#3fd0bb', luz: '#a8f5e8', sombra: '#1d9886' },
    G: { base: '#86c443', luz: '#c8ef8f', sombra: '#558c22' },
    U: { base: '#7b52d9', luz: '#b99cff', sombra: '#4b2a9e' },
    V: { base: '#dccbf7', luz: '#f6f0ff', sombra: '#9c7fd0' },
    F: { base: '#ff5f8f', luz: '#ffb3c9', sombra: '#c22c5c' },
    L: { base: '#f7d93b', luz: '#fff3a3', sombra: '#b89a0c' },
    B: { base: '#3d7bf2', luz: '#9ec0ff', sombra: '#1f4fb0' }
  };
  var RETRATO = { grumble: 'assets/grumble.png', miga: 'assets/miga.png', zippy: 'assets/zippy.png', zappy: 'assets/zappy.png' };
  // Posición de cada nivel sobre el mapa ilustrado (porcentaje del ancho/alto de la imagen)
  var NODOS = [[11.1, 88.1], [18.6, 79.5], [27.65, 75.1], [37.5, 76.2], [47.75, 75.7], [51.6, 62.7],
    [56.75, 50.8], [63.85, 46.3], [71.25, 48.1], [78.75, 51.25], [85.85, 47.9], [83.1, 39.2]];
  var UNIDAD = { frasco: 24, cuenco: 16, matraz: 22, capsula: 22, alambique: 22 };
  var ANCHO = { frasco: 50, cuenco: 80, matraz: 60, capsula: 50, alambique: 66 };
  var ICONO = {
    C: 'M-1,-8 C4,-4 6,-1 5,3 C4.5,6.5 -4.5,6.5 -5,3 C-5.5,0 -3.5,-1.5 -3,-4 C-1.5,-2.5 -1,-2 -0.5,-1 C0.5,-3.5 0,-6 -1,-8Z M0,6 C-2.5,6 -3,3.5 -1.5,1.5 C-1,2.5 0,3 0.5,2 C1.5,3.5 2.5,6 0,6Z',
    M: 'M0,-7 C3,-2 5,1 5,3 A5,5 0 0 1 -5,3 C-5,1 -3,-2 0,-7Z',
    G: 'M-5.5,5.5 C-6.5,-3 0,-7.5 6.5,-6.5 C6.5,0 2,6.5 -5.5,5.5Z',
    U: 'M0,-5 A5,5 0 1 1 -0.01,-5Z M-8,2.5 C-4,-1 4,-4 8,-2.5 L8,-1.5 C4,-3 -4,0 -8,3.5Z',
    V: 'M-6,3 A3,3 0 0 1 -5,-2 A4,4 0 0 1 2,-4 A3.5,3.5 0 0 1 6,1 A2.5,2.5 0 0 1 5,4 L-5,4 A2,2 0 0 1 -6,3Z',
    F: 'M0,-3 C3,-6.5 7.5,-4 5.5,1 C4.5,4 1.5,6.5 0,7.5 C-1.5,6.5 -4.5,4 -5.5,1 C-7.5,-4 -3,-6.5 0,-3Z M-1.6,0.2 A0.9,0.9 0 1 0 -1.59,0.2Z M1.8,-0.6 A0.9,0.9 0 1 0 1.81,-0.6Z M0.2,3.2 A0.9,0.9 0 1 0 0.21,3.2Z M-3.6,-6.8 L0,-4.2 L3.6,-6.8 L1.2,-7.4 L0,-9.2 L-1.2,-7.4Z',
    L: 'M0,-6.5 A6.5,6.5 0 1 1 -0.01,-6.5Z M0,-4.6 L3.2,-2.2 L0,0 Z M3.8,-0.6 L3.8,2.8 L0.6,1Z M2.2,4 L-1.6,4.2 L0,1.2Z M-3.6,2.4 L-3.6,-1.2 L-0.6,0.6Z M-2.4,-3.8 L1.2,-4.6 L-0.2,-0.8Z',
    B: 'M0,-4.5 A5.5,5.5 0 1 1 -0.01,-4.5Z M-2.4,-4.2 L0,-1.6 L2.4,-4.2 L0.9,-4 L0,-5.6 L-0.9,-4Z'
  };
  var reducido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ───────────────────────── Progreso (sólo en este navegador) ─────────────────────────
  var CLAVE = 'sugar-snap-bakery-v2';
  var BASE = function () {
    return { v: 2, niveles: {}, vistos: {}, guias: {}, notas: {}, prologo: false, idioma: null,
      musica: true, efectos: true, voces: true, monedas: 0, vitrina: {}, mesa: 'madera', mesas: { madera: true },
      logros: {}, cont: { vapor: 0, fundidos: 0, sinPistas: 0, combos: 0 }, cofre: { ultimo: '', racha: 0 },
      vidas: { n: 5, desde: 0 }, rango: 0, avatar: 0,
      infinito: { nivel: 1, mejor: 0, pts: 0, sal: 0, actual: null }, diario: { fecha: '', hecho: '', racha: 0, pts: 0, nivel: null } };
  };
  var PLAT = window.Plataforma || null;
  var prog = BASE();
  try {
    var g0 = JSON.parse(PLAT ? PLAT.datos : localStorage.getItem(CLAVE));
    if (g0 && g0.v === 2) prog = Object.assign(BASE(), g0);
    else {
      // Migración desde la versión anterior (Alquimia): se conservan niveles, guías y notas
      var viejo = PLAT ? null : JSON.parse(localStorage.getItem('alquimia-fragmentos-v1'));
      if (viejo && viejo.niveles) {
        ['niveles', 'vistos', 'guias', 'notas', 'prologo'].forEach(function (k) { if (viejo[k] !== undefined) prog[k] = viejo[k]; });
        if (viejo.sonido === 0 || viejo.sonido === false) { prog.musica = prog.efectos = prog.voces = false; }
        if (viejo.sonido === 1) prog.musica = false;
        Object.keys(prog.niveles).forEach(function (id) {
          if (prog.niveles[id].res) { prog.monedas += 20; var p = dulceDeNivel(+id); if (p) prog.vitrina[p[0]] = true; }
        });
      }
    }
  } catch (e) { /* sin almacenamiento */ }
  function guardar() {
    if (PLAT) { PLAT.guardar(JSON.stringify(PLAT.enPlayables ? Object.assign({}, prog, { idioma: null }) : prog)); return; } // en YouTube el idioma no va en la nube
    try { localStorage.setItem(CLAVE, JSON.stringify(prog)); } catch (e) { /* sin almacenamiento */ }
  }
  function resuelto(id) { return !!(prog.niveles[id] && prog.niveles[id].res); }
  function desbloqueado(id) { return id === 1 || resuelto(id - 1); }
  function fragmentos() { return NIVELES.filter(function (n) { return n.jefe && n.region <= 4 && resuelto(n.id); }).length; }
  function dulceDeNivel(id) { return TX.VITRINA.filter(function (p) { return p[3] === id; })[0]; }
  function nVitrina() { return Object.keys(prog.vitrina).length; }

  // ───────────────────────── Puntos y rangos ─────────────────────────
  // [nombre ES, nombre EN, puntos necesarios, premio]
  var RANGOS = [
    ['Aprendiz', 'Apprentice', 0, null],
    ['Pinche de cocina', 'Kitchen Helper', 1500, { monedas: 50 }],
    ['Repostero', 'Pastry Cook', 4000, { vidaMax: 1, monedas: 50 }],
    ['Maestro pastelero', 'Master Baker', 8000, { recarga: 10, monedas: 100 }],
    ['Gran alquimista', 'Grand Alchemist', 14000, { vidaMax: 1, monedas: 150 }],
    ['Leyenda de Auralia', 'Legend of Auralia', 22000, { monedas: 300, dulce: 'p30' }],
    ['Guardián del Sabor', 'Flavor Guardian', 40000, { monedas: 300 }],
    ['Alquimista Eterno', 'Eternal Alchemist', 70000, { vidaMax: 1, monedas: 500 }]
  ];
  function puntosTotales() { var t = (prog.infinito.pts || 0) + (prog.diario.pts || 0); for (var id in prog.niveles) t += prog.niveles[id].pts || 0; return t; }
  function rangoDe(pts) { var r = 0; RANGOS.forEach(function (x, i) { if (pts >= x[2]) r = i; }); return r; }
  function nombreRango(i) { return RANGOS[i][IDIOMA === 'en' ? 1 : 0]; }
  function premioTexto(p) {
    if (!p) return T('premio_ninguno');
    var t = [];
    if (p.vidaMax) t.push(T('premio_vida'));
    if (p.recarga) t.push(T('premio_recarga', { n: p.recarga }));
    if (p.dulce) t.push(T('premio_dulce'));
    if (p.monedas) t.push(T('premio_monedas', { n: p.monedas }));
    return t.join(' · ');
  }
  // Aplica los premios de los rangos nuevos; devuelve la lista de rangos conseguidos ahora
  function subirRango() {
    var nuevo = rangoDe(puntosTotales()), conseguidos = [];
    while (prog.rango < nuevo) {
      prog.rango++;
      var pr = RANGOS[prog.rango][3] || {};
      if (pr.monedas) prog.monedas += pr.monedas;
      if (pr.dulce) { if (!prog.vitrina[pr.dulce]) prog.vitrina[pr.dulce] = true; else prog.monedas += 150; }
      if (pr.vidaMax) prog.vidas.n = Math.min(maxVidas(), prog.vidas.n + 1);
      conseguidos.push(prog.rango);
    }
    if (conseguidos.length) guardar();
    return conseguidos;
  }
  function formatoPuntos(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, IDIOMA === 'en' ? ',' : '.'); }

  // ───────────────────────── Vidas ─────────────────────────
  // Se pierde una al perder (o al reiniciar/salir con la partida empezada); se recupera una cada 15 minutos
  function maxVidas() { var m = 5; for (var i = 1; i <= prog.rango; i++) if (RANGOS[i][3] && RANGOS[i][3].vidaMax) m += RANGOS[i][3].vidaMax; return m; }
  function minutosRecarga() { var m = 15; for (var i = 1; i <= prog.rango; i++) if (RANGOS[i][3] && RANGOS[i][3].recarga) m = RANGOS[i][3].recarga; return m; }
  function vidas() {
    var v = prog.vidas, max = maxVidas(), paso = minutosRecarga() * 60000, ahora = Date.now();
    if (v.n >= max) { v.desde = ahora; return v.n; }
    if (!v.desde) v.desde = ahora;
    var ganadas = Math.floor((ahora - v.desde) / paso);
    if (ganadas > 0) { v.n = Math.min(max, v.n + ganadas); v.desde = v.n >= max ? ahora : v.desde + ganadas * paso; guardar(); }
    return v.n;
  }
  function proximaVida() { var paso = minutosRecarga() * 60000; return Math.max(0, prog.vidas.desde + paso - Date.now()); }
  function reloj(ms) { var s = Math.ceil(ms / 1000), m = Math.floor(s / 60); return m + ':' + String(s % 60).padStart(2, '0'); }
  function gastarVida() {
    var max = maxVidas(); vidas();
    if (prog.vidas.n >= max) prog.vidas.desde = Date.now();
    prog.vidas.n = Math.max(0, prog.vidas.n - 1); guardar(); pintarVidas();
  }
  var CORAZON_SVG = '<svg class="corazon-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C5 16 2 12.5 2 8.6 2 5.5 4.4 3.2 7.3 3.2c1.9 0 3.6 1 4.7 2.6 1.1-1.6 2.8-2.6 4.7-2.6 2.9 0 5.3 2.3 5.3 5.4 0 3.9-3 7.4-10 12.4Z" fill="#f2607d" stroke="#8f2440" stroke-width="2" stroke-linejoin="round"/><path d="M6.5 7.5c.6-1.3 1.7-1.9 3-1.9" stroke="#fff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity=".8"/></svg>';
  function pintarVidas() {
    var n = vidas(), max = maxVidas();
    document.querySelectorAll('.chapa-vidas').forEach(function (c) {
      c.innerHTML = CORAZON_SVG + '<b>' + n + '</b>' + (n < max ? '<small>' + reloj(proximaVida()) + '</small>' : '');
      c.classList.toggle('vacias', n === 0);
      c.setAttribute('aria-label', T('vidas_aria', { n: n, m: max }));
    });
    document.querySelectorAll('.chapa-puntos').forEach(function (c) {
      c.innerHTML = '<svg class="estrella-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8Z" fill="#ffd34d" stroke="#9a5e0c" stroke-width="1.8" stroke-linejoin="round"/></svg><b>' + formatoPuntos(puntosTotales()) + '</b>';
      c.setAttribute('aria-label', T('puntos_aria', { n: formatoPuntos(puntosTotales()), r: nombreRango(prog.rango) }));
    });
  }
  setInterval(function () { if (!$('pantalla-portada').hidden || !$('pantalla-mapa').hidden || !$('modal').hidden) pintarVidas(); }, 1000);
  // Ventana cuando no quedan vidas: esperar o recargar con monedas
  var PRECIO_VIDAS = 40;
  function ventanaSinVidas(alRecargar) {
    function dibujar(m) {
      var puede = prog.monedas >= PRECIO_VIDAS;
      m.querySelector('.ventana').innerHTML = '<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button>' +
        '<div class="sin-vidas">' + CORAZON_SVG + '</div><h2>' + T('sin_vidas_t') + '</h2>' +
        '<p class="sub">' + T('sin_vidas', { m: minutosRecarga() }) + '</p>' +
        '<p class="cuenta-vida">' + T('proxima_vida', { t: reloj(proximaVida()) }) + '</p>' +
        '<div class="acciones"><button class="btn" id="b-recargar"' + (puede ? '' : ' disabled') + '>' + T('recargar_vidas') + ' · ' + MONEDA_SVG + PRECIO_VIDAS + '</button></div>' +
        (puede ? '' : '<p class="sub">' + T('vit_falta', { p: PRECIO_VIDAS - prog.monedas }) + '</p>') +
        '<div class="acciones"><button class="enlace" id="b-esperar">' + T('esperar') + '</button></div>';
      m.querySelector('.cerrar').addEventListener('click', function () { SON.toque(); cerrarModal(); });
      m.querySelector('#b-esperar').addEventListener('click', function () { SON.toque(); cerrarModal(); });
      var br = m.querySelector('#b-recargar');
      if (br && puede) br.addEventListener('click', function () {
        prog.monedas -= PRECIO_VIDAS; prog.vidas.n = maxVidas(); prog.vidas.desde = Date.now(); guardar();
        SON.compra(); pintarMonedas(); pintarVidas(); cerrarModal();
        toast('<span class="toast-ic">❤️</span><span><b>' + T('vidas_recargadas') + '</b></span>');
        if (alRecargar) alRecargar();
      });
    }
    abrirModal('', function (m) {
      dibujar(m);
      var t = setInterval(function () {
        if ($('modal').hidden || !m.querySelector('.sin-vidas')) { clearInterval(t); return; }
        if (vidas() > 0) { clearInterval(t); cerrarModal(); pintarVidas(); if (alRecargar) alRecargar(); return; }
        var c = m.querySelector('.cuenta-vida'); if (c) c.textContent = T('proxima_vida', { t: reloj(proximaVida()) });
      }, 1000);
    });
  }
  // Pregunta antes de una acción que cuesta una vida (reiniciar o salir con la partida empezada)
  function confirmarVida(titulo, texto, si, alAceptar) {
    abrirModal('<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button><div class="sin-vidas">' + CORAZON_SVG + '</div><h2>' + titulo + '</h2><p class="sub">' + texto + '</p>' +
      '<p class="cuenta-vida">' + T('vidas_quedan', { n: vidas() }) + '</p>' +
      '<div class="acciones"><button class="btn sec peq" id="b-cv-no">' + T('seguir_jugando') + '</button><button class="btn peq peligro" id="b-cv-si">' + si + '</button></div>', function (m) {
      m.querySelector('#b-cv-no').addEventListener('click', function () { SON.toque(); cerrarModal(); });
      m.querySelector('#b-cv-si').addEventListener('click', function () { SON.toque(); cerrarModal(); alAceptar(); });
    });
  }
  function partidaEmpezada() { return J && !J.fin && J.movs > 0 && !J.n.libre; }

  // ───────────────────────── Ventana de rangos ─────────────────────────
  function ventanaRangos() {
    var pts = puntosTotales(), r = rangoDe(pts), sig = RANGOS[r + 1];
    var lista = RANGOS.map(function (x, i) {
      return '<div class="rango' + (i <= r ? ' hecho' : '') + (i === r ? ' actual' : '') + '"><span class="rango-ic">' + (i <= r ? '★' : '☆') + '</span><div><b>' + nombreRango(i) + '</b><small>' + formatoPuntos(x[2]) + ' ' + T('puntos').toLowerCase() + ' · ' + premioTexto(x[3]) + '</small></div></div>';
    }).join('');
    var prog0 = sig ? Math.round(100 * (pts - RANGOS[r][2]) / (sig[2] - RANGOS[r][2])) : 100;
    abrirModal('<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button><h2>' + T('rangos') + '</h2>' +
      '<p class="sub">' + T('rango_sub') + '</p>' +
      '<div class="rango-resumen"><span class="chapa chapa-puntos"></span><b>' + nombreRango(r) + '</b>' +
      '<span class="barrita"><i style="width:' + prog0 + '%"></i></span><small>' + (sig ? T('siguiente_rango', { n: formatoPuntos(sig[2] - pts), r: nombreRango(r + 1) }) : T('rango_max')) + '</small></div>' +
      '<div class="rangos">' + lista + '</div>', function () { pintarVidas(); });
  }

  // ───────────────────────── Idioma ─────────────────────────
  var IDIOMA = (PLAT && PLAT.idioma) || prog.idioma || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
  function T(clave, v) {
    var s = TX.UI[IDIOMA][clave];
    if (s === undefined) s = TX.UI.es[clave];
    if (s === undefined) return clave;
    if (v) s = s.replace(/\{(\w+)\}/g, function (m, k) { return v[k] !== undefined ? v[k] : m; });
    return s;
  }
  function matNombre(k) { return TX.MATERIAS[IDIOMA][k][0]; }
  function persNombre(q) { return TX.PERSONAJES[IDIOMA][q]; }
  function regionNombre(id) { return IDIOMA === 'en' ? EN.regiones[id] : REGIONES.filter(function (r) { return r.id === id; })[0].nombre; }
  // Textos de un nivel en el idioma activo (mismas posiciones y hablantes que en español)
  function TN(n) {
    var e = IDIOMA === 'en' ? EN[n.id] : null;
    return {
      titulo: e ? e.titulo : n.titulo,
      ensena: e ? e.ensena : n.ensena,
      intro: n.intro.map(function (l, i) { return { id: l.voz || 'n' + n.id + '_intro_' + i, q: l.q, t: e ? e.intro[i] : l.t }; }),
      guia: n.guia.map(function (l, i) { return Object.assign({}, l, { t: e ? e.guia[i] : l.t }); }),
      fin: { id: n.fin.voz || 'n' + n.id + '_fin', q: n.fin.q, t: e ? e.fin : n.fin.t },
      ingenio: e ? e.ingenio : (n.ingenio || {}).txt
    };
  }
  function nombreObj(o) { return IDIOMA === 'en' && J && EN[J.n.id].nombres[o.id] ? EN[J.n.id].nombres[o.id] : o.nombre; }
  function nombreDulce(p) { return IDIOMA === 'en' ? p[2] : p[1]; }
  // Textos fijos de la página: cualquier elemento con data-t="clave"
  function aplicarTextos() {
    document.documentElement.lang = IDIOMA;
    document.querySelectorAll('[data-t]').forEach(function (e) { e.textContent = T(e.getAttribute('data-t')); });
    document.querySelectorAll('[data-t-aria]').forEach(function (e) { e.setAttribute('aria-label', T(e.getAttribute('data-t-aria'))); });
    document.querySelectorAll('.idioma button').forEach(function (b) { b.classList.toggle('activo', b.getAttribute('data-idioma') === IDIOMA); b.setAttribute('aria-pressed', b.getAttribute('data-idioma') === IDIOMA); });
  }
  function cambiarIdioma(id) {
    if (id === IDIOMA) return;
    IDIOMA = id; prog.idioma = id; guardar();
    aplicarTextos(); pintarMonedas(); pintarPortada();
    if (!$('pantalla-mapa').hidden) pintarMapa();
    if (!$('pantalla-nivel').hidden && J) { pintarCabecera(); actualizar(null, false); pintarObjetivos(); if (J.guia) mostrarPaso(); }
    SON.toque();
  }

  // ───────────────────────── Audio: música (Suno), efectos (Suno + sintetizados) y voces (ElevenLabs) ─────────────────────────
  var actx = null, maestro = null, buffers = {}, cargando = {};
  var MUESTRAS = ['vierte', 'fluye', 'valvula', 'coger', 'restaura', 'victoria', 'moneda', 'logro', 'cofre', 'toque', 'error'];
  function audio() {
    try {
      if (!actx) {
        actx = new (window.AudioContext || window.webkitAudioContext)();
        // Compresor suave en la salida: los sonidos que coinciden no se suman en un pico molesto
        var comp = actx.createDynamicsCompressor();
        comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.25;
        maestro = actx.createGain(); maestro.gain.value = 0.85; maestro.connect(comp); comp.connect(actx.destination);
        MUESTRAS.forEach(cargarMuestra);
      }
      if (actx.state === 'suspended') actx.resume();
    } catch (e) { return null; }
    return actx;
  }
  function cargarMuestra(n) {
    if (buffers[n] || cargando[n]) return;
    cargando[n] = true;
    fetch('assets/audio/' + n + '.mp3').then(function (r) { if (!r.ok) throw new Error(); return r.arrayBuffer(); })
      .then(function (b) { return new Promise(function (ok, ko) { actx.decodeAudioData(b, ok, ko); }); })
      .then(function (buf) { buffers[n] = buf; }).catch(function () { /* no existe: se usa el sintetizado */ });
  }
  // Muestra grabada con una pequeña variación de tono para que no suene siempre igual
  var ultimaMuestra = {}, silencioHasta = 0;
  function muestra(n, o) {
    if (!prog.efectos || window.__mudo) return true;
    var a = audio(); if (!a || !buffers[n]) return false;
    o = o || {};
    // La misma muestra no se apila (monedas, burbujas…) y durante la fanfarria sólo suena lo importante
    var ahora = performance.now();
    if (ahora - (ultimaMuestra[n] || 0) < (o.hueco || 90)) return true;
    if (ahora < silencioHasta && !o.prioridad) return true;
    ultimaMuestra[n] = ahora;
    var src = a.createBufferSource(), g = a.createGain(), t = a.currentTime;
    src.buffer = buffers[n];
    src.playbackRate.value = (o.tono || 1) * (1 + (Math.random() - 0.5) * (o.vari === undefined ? 0.08 : o.vari));
    var vol = o.vol || 0.8, dur = Math.min(o.dur || 99, src.buffer.duration - (o.desde || 0));
    g.gain.setValueAtTime(vol, t);
    var cola = Math.min(o.cola || 0.2, dur * 0.6);
    g.gain.setValueAtTime(vol, t + Math.max(0.01, dur - cola));
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    src.connect(g); g.connect(maestro);
    src.start(t, o.desde || 0, dur + 0.05);
    return true;
  }
  function tono(f, dur, tipo, vol, f2, retraso) {
    if (!prog.efectos || window.__mudo) return;
    var a = audio(); if (!a) return;
    var t = a.currentTime + (retraso || 0), o = a.createOscillator(), gn = a.createGain();
    o.type = tipo || 'sine'; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.015);
    gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(gn); gn.connect(maestro); o.start(t); o.stop(t + dur + 0.05);
  }
  function ruido(dur, frec, vol, q) {
    if (!prog.efectos || window.__mudo) return;
    var a = audio(); if (!a) return;
    var n = Math.floor(a.sampleRate * dur), b = a.createBuffer(1, n, a.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    var s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime;
    s.buffer = b; f.type = 'bandpass'; f.frequency.setValueAtTime(frec, t); f.frequency.exponentialRampToValueAtTime(frec * 1.8, t + dur); f.Q.value = q || 1;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(maestro); s.start(t);
  }
  var SON = {
    toque: function () { if (!muestra('toque', { vol: 0.55, dur: 0.5 })) tono(620, 0.07, 'sine', 0.08, 880); },
    coger: function () { if (!muestra('coger', { vol: 0.6, dur: 0.7, cola: 0.25 })) tono(700, 0.06, 'triangle', 0.08, 1100); },
    soltar: function () { tono(520, 0.09, 'sine', 0.07, 330); },
    vierte: function () { if (!muestra('vierte', { vol: 0.75, dur: 1.3, cola: 0.5 })) for (var i = 0; i < 3; i++) tono(240 + i * 40, 0.08, 'sine', 0.09, 150 + i * 30, i * 0.07); },
    fluye: function (seg) { if (!muestra('fluye', { vol: 0.55, dur: Math.max(0.6, Math.min(seg || 1, 2.2)), desde: 0.15 })) for (var i = 0; i < 4; i++) tono(300 + Math.random() * 300, 0.06, 'triangle', 0.06, 200, i * 0.08); },
    valvula: function () { if (!muestra('valvula', { vol: 0.5, dur: 0.5 })) { tono(900, 0.04, 'square', 0.035); tono(650, 0.05, 'square', 0.035, null, 0.05); } },
    error: function () { if (!muestra('error', { vol: 0.5, dur: 0.8, vari: 0.02 })) { tono(330, 0.12, 'sine', 0.09, 220); tono(250, 0.18, 'sine', 0.07, 170, 0.09); } },
    vapor: function () { ruido(0.55, 1800, 0.22, 0.8); },
    restaura: function () { if (!muestra('restaura', { vol: 0.75, vari: 0.04, dur: 1.6, cola: 0.7 })) [523, 659, 784, 1046].forEach(function (f, i) { tono(f, 0.2, 'triangle', 0.09, null, i * 0.07); }); },
    victoria: function () { silencioHasta = performance.now() + 2600; if (!muestra('victoria', { vol: 0.8, vari: 0, dur: 3.4, cola: 1.1, prioridad: true })) [523, 659, 784, 659, 784, 1046].forEach(function (f, i) { tono(f, 0.26, 'triangle', 0.1, null, i * 0.1); }); },
    funde: function () { ruido(0.6, 700, 0.15, 1.4); },
    abre: function () { tono(170, 0.12, 'square', 0.035, 120); tono(300, 0.12, 'triangle', 0.07, 620, 0.08); },
    regaliz: function () { tono(200, 0.4, 'sine', 0.1, 700); },
    burbuja: function () { tono(450 + Math.random() * 350, 0.06, 'sine', 0.035, 950); },
    sello: function (i) { var f = [784, 988, 1175][i || 0]; tono(f, 0.22, 'sine', 0.06); tono(f * 1.5, 0.3, 'sine', 0.035, null, 0.04); },
    moneda: function (vol) { if (!muestra('moneda', { vol: vol || 0.5, dur: 0.7, vari: 0.12, hueco: 120, prioridad: true })) { tono(1320, 0.06, 'square', 0.04); tono(1760, 0.12, 'square', 0.04, null, 0.06); } },
    logro: function () { if (!muestra('logro', { vol: 0.7, vari: 0, cola: 0.8, prioridad: true })) [784, 988, 1175, 1568].forEach(function (f, i) { tono(f, 0.18, 'triangle', 0.08, null, i * 0.08); }); },
    cofre: function () { if (!muestra('cofre', { vol: 0.85, vari: 0 })) { ruido(0.3, 400, 0.1, 1); [659, 880, 1175].forEach(function (f, i) { tono(f, 0.2, 'triangle', 0.08, null, 0.2 + i * 0.08); }); } },
    compra: function () { muestra('moneda', { vol: 0.7, vari: 0, tono: 0.9 }); [880, 1175].forEach(function (f, i) { tono(f, 0.14, 'triangle', 0.08, null, i * 0.08); }); }
  };

  // Música ambiente con fundido entre pistas
  var VOL_MUSICA = 0.3, musica = { el: null, pista: null, deseada: 'portada' }, enPausa = false;
  function fundir(el, objetivo, parar) {
    clearInterval(el._fund);
    var paso = (objetivo - el.volume) / 16;
    el._fund = setInterval(function () {
      var v = el.volume + paso;
      if ((paso >= 0 && v >= objetivo) || (paso < 0 && v <= objetivo)) { v = objetivo; clearInterval(el._fund); if (parar) el.pause(); }
      el.volume = Math.max(0, Math.min(1, v));
    }, 50);
  }
  function ponerMusica(pista) {
    musica.deseada = pista || musica.deseada;
    var quiere = prog.musica && !window.__mudo && !enPausa ? musica.deseada : null;
    if (musica.el && musica.pista === quiere) { if (musica.el.paused) musica.el.play().catch(function () {}); return; }
    if (musica.el) fundir(musica.el, 0, true);
    musica.el = null; musica.pista = null;
    if (!quiere) return;
    var el = new Audio('assets/audio/musica_' + quiere + '.mp3');
    el.loop = true; el.volume = 0;
    el.addEventListener('error', function () { if (quiere !== 'obrador') { musica.pista = null; ponerMusica(quiere === 'helado' ? 'bosque' : quiere === 'feria' ? 'portada' : 'obrador'); } });
    el.play().then(function () { fundir(el, voz ? VOL_MUSICA * 0.35 : VOL_MUSICA); }).catch(function () {});
    musica.el = el; musica.pista = quiere;
  }
  function bajarMusica(si) { if (musica.el) fundir(musica.el, si ? VOL_MUSICA * 0.35 : VOL_MUSICA); }

  // Voces de los personajes; si el archivo no existe en el idioma activo, simplemente no suena
  var voz = null;
  function decir(id) {
    callarVoz();
    if (!id || !prog.voces || window.__mudo || enPausa) return;
    var el = new Audio('assets/voces/' + IDIOMA + '/' + id + '.mp3');
    var fin = function () { if (voz === el) { voz = null; bajarMusica(false); } };
    el.addEventListener('ended', fin); el.addEventListener('error', fin);
    voz = el; bajarMusica(true);
    el.play().catch(fin);
  }
  function callarVoz() { if (voz) { voz.pause(); voz = null; bajarMusica(false); } }
  // Frases cortas (¡Genial!, ¡Uy!…): no interrumpen a quien esté hablando
  var ultimaFrase = 0;
  function frase(clave, forzar) {
    if (!prog.voces || (voz && !forzar)) return;
    var ahora = Date.now(); if (!forzar && ahora - ultimaFrase < 4000) return;
    ultimaFrase = ahora; decir('frase_' + clave);
  }
  document.addEventListener('pointerdown', function primerToque() { audio(); ponerMusica(); document.removeEventListener('pointerdown', primerToque); });

  // ───────────────────────── Pantallas ─────────────────────────
  // Ambiente de cada región (fondo assets/suave_<ambiente>.jpg) y la música que le corresponde
  var AMBIENTES = ['obrador', 'bosque', 'helado', 'ciudad', 'feria', 'mar', 'cumbres', 'selva', 'volcan', 'biblioteca', 'palacio'];
  var MUSICA_DE = { mar: 'helado', cumbres: 'portada', selva: 'bosque', volcan: 'obrador', biblioteca: 'ciudad', palacio: 'feria' };
  function romano(n) { var v = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']], t = ''; v.forEach(function (p) { while (n >= p[0]) { t += p[1]; n -= p[0]; } }); return t; }
  function mostrar(id, fondo, pista) {
    ponerMusica(MUSICA_DE[pista] || pista || 'obrador');
    ['pantalla-portada', 'pantalla-mapa', 'pantalla-nivel'].forEach(function (p) { $(p).hidden = p !== id; });
    $('app').style.setProperty('--fondo', 'url("' + (fondo || 'assets/suave_portada.jpg') + '")');
  }

  // ───────────────────────── Diálogos ─────────────────────────
  var dlgCola = [], dlgFin = null;
  function hablar(lineas) {
    return new Promise(function (ok) {
      if (!lineas || !lineas.length) return ok();
      dlgCola = lineas.slice(); dlgFin = ok; $('dialogo').hidden = false; siguienteLinea();
    });
  }
  function siguienteLinea() {
    var l = dlgCola.shift();
    if (!l) { callarVoz(); $('dialogo').hidden = true; var f = dlgFin; dlgFin = null; if (f) f(); return; }
    $('dlg-retrato').src = RETRATO[l.q]; $('dlg-nombre').textContent = persNombre(l.q); $('dlg-texto').textContent = l.t;
    decir(l.id);
    [$('dlg-retrato'), document.querySelector('.dlg-globo')].forEach(function (e) { e.style.animation = 'none'; void e.offsetWidth; e.style.animation = ''; });
  }
  $('dialogo').addEventListener('click', function (e) {
    if (e.target.id === 'dlg-saltar') dlgCola = [];
    SON.toque(); siguienteLinea();
  });

  var avisoT = null;
  function avisar(texto, quien, ms) {
    $('aviso-img').src = RETRATO[quien || 'zippy'];
    $('aviso-txt').textContent = texto;
    $('aviso').hidden = false;
    clearTimeout(avisoT);
    avisoT = setTimeout(function () { $('aviso').hidden = true; }, ms || Math.max(2600, texto.length * 55));
  }
  function callarAviso() { clearTimeout(avisoT); $('aviso').hidden = true; }

  // Avisos breves de recompensa (logros, monedas) en la parte superior
  var colaToast = [], toastActivo = false;
  function toast(html, sonido) {
    colaToast.push([html, sonido]);
    if (!toastActivo) siguienteToast();
  }
  function siguienteToast() {
    var t = colaToast.shift();
    if (!t) { toastActivo = false; return; }
    toastActivo = true;
    var d = document.createElement('div'); d.className = 'toast'; d.innerHTML = t[0];
    document.querySelector('.escenario').appendChild(d);
    if (t[1]) t[1]();
    setTimeout(function () { d.classList.add('fuera'); }, 2300);
    setTimeout(function () { d.remove(); siguienteToast(); }, 2700);
  }

  // ───────────────────────── Monedas y logros ─────────────────────────
  var MONEDA_SVG = '<svg class="moneda-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="#ffd34d" stroke="#b97a12" stroke-width="2"/><circle cx="12" cy="12" r="6.8" fill="none" stroke="#e8a41a" stroke-width="1.6"/><path d="M14.6 9.2c-.6-.8-1.6-1.2-2.7-1.2-1.6 0-2.7.8-2.7 2 0 2.6 5.6 1.4 5.6 4 0 1.2-1.2 2-2.8 2-1.2 0-2.3-.5-2.9-1.3" fill="none" stroke="#9a5e0c" stroke-width="1.7" stroke-linecap="round"/></svg>';
  function pintarMonedas() {
    document.querySelectorAll('.chapa-monedas').forEach(function (c) { c.innerHTML = MONEDA_SVG + '<b>' + prog.monedas + '</b>'; c.setAttribute('aria-label', prog.monedas + ' ' + T('monedas')); });
  }
  function ganarMonedas(m, desde) {
    if (!m) return;
    prog.monedas += m; guardar();
    pintarMonedas();
    document.querySelectorAll('.chapa-monedas').forEach(function (c) { c.classList.remove('salta'); void c.offsetWidth; c.classList.add('salta'); });
    if (desde) monedasVolando(desde, Math.min(8, Math.ceil(m / 5)));
  }
  // Monedas que vuelan hasta el contador
  function monedasVolando(desde, n) {
    if (reducido) return;
    var esc = document.querySelector('.escenario'), er = esc.getBoundingClientRect();
    var chapa = [].filter.call(document.querySelectorAll('.chapa-monedas'), function (c) { return c.offsetParent; })[0];
    if (!chapa) return;
    var cr = chapa.getBoundingClientRect();
    for (var i = 0; i < n; i++) {
      var d = document.createElement('i'); d.className = 'moneda-vuela'; d.innerHTML = MONEDA_SVG;
      d.style.left = (desde.x - er.left) + 'px'; d.style.top = (desde.y - er.top) + 'px';
      esc.appendChild(d);
      var dx = cr.left + 16 - desde.x, dy = cr.top + 14 - desde.y;
      d.animate([{ transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 }, { transform: 'translate(calc(-50% + ' + ((Math.random() - 0.5) * 60) + 'px), calc(-50% - 40px)) scale(1)', opacity: 1, offset: 0.3 },
        { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) scale(.7)', opacity: 1 }], { duration: 750 + i * 130, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'forwards' });
      setTimeout(function (el, k) { el.remove(); if (k < 4) SON.moneda(0.5 - k * 0.09); }.bind(null, d, i), 750 + i * 130);
    }
  }

  function logroDatos(l) { return IDIOMA === 'en' ? { t: l[3], d: l[4] } : { t: l[1], d: l[2] }; }
  function progresoLogro(id) {
    var c = prog.cont;
    switch (id) {
      case 'sin_ayuda': return c.sinPistas;
      case 'vaporista': return c.vapor;
      case 'infinito10': case 'infinito50': return prog.infinito.mejor || 0;
      case 'diario7': return prog.diario.racha || 0;
      case 'combinador': return c.combos || 0;
      case 'fundidor': return c.fundidos;
      case 'perfeccionista': return NIVELES.filter(function (n) { var p = prog.niveles[n.id]; return p && p.dom && p.ing; }).length;
      case 'estudioso': return Object.keys(prog.notas).length;
      case 'constante': return prog.cofre.racha;
      case 'coleccionista': case 'goloso': return nVitrina();
      default: return 0;
    }
  }
  // Comprueba todos los logros; 'ctx' trae datos del momento (victoria, trasvase…)
  function revisarLogros(ctx) {
    ctx = ctx || {};
    var nuevos = [];
    TX.LOGROS.forEach(function (l) {
      var id = l[0]; if (prog.logros[id]) return;
      var ok = false;
      switch (id) {
        case 'primer_trasvase': ok = !!ctx.trasvase; break;
        case 'despertar': ok = !!ctx.restaurado; break;
        case 'perfecto': ok = !!ctx.tresSellos; break;
        case 'sin_vuelta': ok = !!ctx.sinDeshacer; break;
        case 'rapido': ok = !!ctx.rapido; break;
        case 'region1': ok = [1, 2, 3, 4, 5, 6].every(resuelto); break;
        case 'region2': ok = [7, 8, 9, 10, 11, 12].every(resuelto); break;
        case 'region3': ok = NIVELES.filter(function (n) { return n.region === 3; }).every(function (n) { return resuelto(n.id); }); break;
        case 'region4': ok = NIVELES.filter(function (n) { return n.region === 4; }).every(function (n) { return resuelto(n.id); }); break;
        case 'tenaz': ok = !!ctx.tenaz; break;
        case 'region5': ok = NIVELES.some(function (n) { return n.region === 5; }) && NIVELES.filter(function (n) { return n.region === 5; }).every(function (n) { return resuelto(n.id); }); break;
        case 'rango_maestro': ok = prog.rango >= 3; break;
        case 'leyenda': ok = prog.rango >= 5; break;
        case 'region11': ok = resuelto(120); break;
        case 'eterno': ok = prog.rango >= RANGOS.length - 1; break;
        default: ok = l[6] > 0 && progresoLogro(id) >= l[6];
      }
      if (ok) {
        prog.logros[id] = Date.now(); nuevos.push(l);
        prog.monedas += l[5];
        if (!ctx.silencio) toast('<span class="toast-ic">🏆</span><span><b>' + T('log_toast', { t: logroDatos(l).t }) + '</b><small>+' + l[5] + ' ' + T('monedas').toLowerCase() + '</small></span>', SON.logro);
      }
    });
    if (nuevos.length) { guardar(); pintarMonedas(); if (!ctx.silencio) frase('logro'); }
    return nuevos;
  }

  // ───────────────────────── Cofre diario ─────────────────────────
  function hoy(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function cofreListo() { return prog.cofre.ultimo !== hoy(); }
  function diaRacha() {
    var ayer = new Date(); ayer.setDate(ayer.getDate() - 1);
    return prog.cofre.ultimo === hoy(ayer) ? (prog.cofre.racha % 7) + 1 : 1;
  }
  function pintarCofre() {
    var b = $('b-cofre'); if (!b) return;
    var listo = cofreListo();
    b.classList.toggle('listo', listo);
    b.setAttribute('aria-label', T('cofre') + ': ' + (listo ? T('cofre_listo') : T('cofre_manana')));
    $('cofre-estado').textContent = listo ? T('cofre_listo') : T('cofre_manana');
  }
  function ventanaCofre() {
    var listo = cofreListo(), dia = listo ? diaRacha() : prog.cofre.racha;
    var dias = TX.COFRE.map(function (m, i) {
      var cls = i + 1 < dia || (!listo && i + 1 === dia) ? ' hecho' : (i + 1 === dia ? ' hoy' : '');
      return '<div class="dia' + cls + '"><small>' + (IDIOMA === 'en' ? 'Day ' : 'Día ') + (i + 1) + '</small>' + MONEDA_SVG + '<b>' + m + '</b>' + (i === 6 ? '<em>🍰</em>' : '') + '</div>';
    }).join('');
    abrirModal('<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button><h2>' + T('cofre_titulo') + '</h2>' +
      '<p class="sub">' + T('cofre_explica') + '</p>' +
      '<div class="cofre-grande' + (listo ? ' listo' : '') + '" id="cofre-dibujo">' + COFRE_SVG + '</div>' +
      '<div class="dias">' + dias + '</div>' +
      '<p class="sub" id="cofre-res"></p>' +
      '<div class="acciones">' + (listo ? '<button class="btn" id="b-abrir-cofre">' + T('cofre_abrir') + '</button>' : '<button class="btn sec peq" disabled>' + T('cofre_manana') + '</button>') + '</div>', function (m) {
      var bo = m.querySelector('#b-abrir-cofre');
      if (bo) bo.addEventListener('click', function () {
        if (!cofreListo()) return;
        var d = diaRacha(), premio = TX.COFRE[d - 1];
        prog.cofre = { ultimo: hoy(), racha: d };
        var dib = m.querySelector('#cofre-dibujo'); dib.classList.add('abierto');
        var celda = m.querySelectorAll('.dia')[d - 1]; if (celda) celda.className = 'dia hecho';
        SON.cofre(); frase('cofre', true);
        var r = dib.getBoundingClientRect();
        setTimeout(function () { ganarMonedas(premio, { x: r.left + r.width / 2, y: r.top + r.height / 2 }); }, 350);
        var txt = T('cofre_premio', { m: premio });
        if (d === 7) {
          var regalo = TX.VITRINA.filter(function (p) { return !p[3] && !prog.vitrina[p[0]]; }).sort(function (a, b) { return a[4] - b[4]; })[0];
          if (regalo) { prog.vitrina[regalo[0]] = true; txt += ' ' + T('cofre_dulce', { t: nombreDulce(regalo) }); }
        }
        guardar();
        m.querySelector('#cofre-res').textContent = txt;
        bo.disabled = true; bo.textContent = T('cofre_manana');
        pintarCofre();
        setTimeout(function () { revisarLogros(); }, 900);
      });
    });
  }
  var COFRE_SVG = '<svg viewBox="0 0 120 100" aria-hidden="true"><g class="tapa"><path d="M14 44 Q14 16 60 16 Q106 16 106 44Z" fill="#e3884a" stroke="#5a3324" stroke-width="4" stroke-linejoin="round"/><path d="M24 40 Q26 24 60 24 Q94 24 96 40" fill="none" stroke="#ffd877" stroke-width="5" stroke-linecap="round"/><rect x="52" y="12" width="16" height="32" fill="#ffd34d" stroke="#5a3324" stroke-width="3"/></g><rect x="14" y="44" width="92" height="44" rx="8" fill="#c96c35" stroke="#5a3324" stroke-width="4"/><rect x="52" y="44" width="16" height="44" fill="#ffd34d" stroke="#5a3324" stroke-width="3"/><circle cx="60" cy="58" r="6" fill="#f2607d" stroke="#5a3324" stroke-width="3"/><g class="brillos"><circle cx="30" cy="10" r="4" fill="#ffd877"/><circle cx="90" cy="8" r="3" fill="#fff"/><circle cx="104" cy="26" r="3.5" fill="#ffd877"/><circle cx="16" cy="28" r="3" fill="#fff"/></g></svg>';

  // ───────────────────────── Ventanas ─────────────────────────
  function abrirModal(html, alMontar) {
    var m = $('modal'); m.innerHTML = '<div class="ventana" role="dialog" aria-modal="true">' + html + '</div>'; m.hidden = false;
    var c = m.querySelector('.cerrar'); if (c) c.addEventListener('click', function () { SON.toque(); cerrarModal(); });
    if (alMontar) alMontar(m);
  }
  function cerrarModal() { $('modal').hidden = true; $('modal').innerHTML = ''; if (alCerrarModal) { var f = alCerrarModal; alCerrarModal = null; f(); } }
  var alCerrarModal = null;
  $('modal').addEventListener('click', function (e) { if (e.target.id === 'modal' && $('modal').querySelector('.cerrar')) cerrarModal(); });

  function iconoMateria(m, tam) {
    return '<svg viewBox="-10 -10 20 20" width="' + tam + '" height="' + tam + '"><path fill-rule="evenodd" d="' + ICONO[m] + '" fill="#fff" stroke="rgba(0,0,0,.25)" stroke-width="1"/></svg>';
  }
  var ICONO_HERR = {
    reiniciar: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M37.5 27.5A14 14 0 1 1 33 13.6" fill="none" stroke="#5a3324" stroke-width="9.5" stroke-linecap="round"/><path d="M37.5 27.5A14 14 0 1 1 33 13.6" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M26.5 6.5L39.5 11.5L30.5 21.5Z" fill="#fff" stroke="#5a3324" stroke-width="2.6" stroke-linejoin="round"/></svg>',
    pista: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6C15.5 6 10.5 12.5 10.5 19.5c0 6 4.2 8.8 5.6 14h15.8c1.4-5.2 5.6-8 5.6-14C37.5 12.5 32.5 6 24 6Z" fill="#fff3b0" stroke="#5a3324" stroke-width="2.6" stroke-linejoin="round"/><path d="M17 15.5c1.6-3 4-4.3 7-4.3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M20 33.5v-6l4 3 4-3v6" fill="none" stroke="#e3a83b" stroke-width="2.2" stroke-linejoin="round"/><rect x="16.5" y="33.5" width="15" height="5.5" rx="2.2" fill="#d8cfc4" stroke="#5a3324" stroke-width="2.4"/><path d="M19 42.5h10" stroke="#5a3324" stroke-width="3" stroke-linecap="round"/><path d="M41 9l2.5-2.5M43 18h3.5M5 18H1.5M7 9L4.5 6.5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>',
    cuaderno: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 12C19 8.5 12 8 5 9v28c7-1 14-.5 19 3 5-3.5 12-4 19-3V9c-7-1-14-.5-19 3Z" fill="#fff6ea" stroke="#5a3324" stroke-width="2.6" stroke-linejoin="round"/><path d="M24 12v28" stroke="#5a3324" stroke-width="2.4"/><path d="M10 17c3.5-.6 7-.3 10 1M10 23c3.5-.6 7-.3 10 1M28 18c3-1.3 6.5-1.6 10-1M28 24c3-1.3 6.5-1.6 10-1" stroke="#f2607d" stroke-width="2.2" stroke-linecap="round"/><path d="M34 26l7 11-2.5 3.5-4-1.5L33 30Z" fill="#ffd877" stroke="#5a3324" stroke-width="2" stroke-linejoin="round"/></svg>'
  };
  // Dibujos pequeños de cada control, iguales a las piezas del tablero
  var DIBUJO = {
    trasvasar: '<svg viewBox="0 0 48 40"><rect x="4" y="14" width="14" height="22" rx="4" fill="#ffd877" stroke="#5a3324" stroke-width="2"/><rect x="30" y="14" width="14" height="22" rx="4" fill="#fff6ea" stroke="#5a3324" stroke-width="2"/><path d="M11 10 Q24 -2 37 10" fill="none" stroke="#f2607d" stroke-width="3" stroke-linecap="round"/><path d="M32 6 L37 10 L31 13" fill="none" stroke="#f2607d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    grifo: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="13" fill="#f2607d" stroke="#5a3324" stroke-width="2.5"/><path d="M20 13 C23 17 25 20 25 22 A5 5 0 0 1 15 22 C15 20 17 17 20 13Z" fill="#fff"/></svg>',
    chimenea: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="13" fill="#b69ad6" stroke="#5a3324" stroke-width="2.5"/><path d="M13 23 A3 3 0 0 1 14 18 A4 4 0 0 1 21 16 A3.5 3.5 0 0 1 26 21 A2.5 2.5 0 0 1 25 24 L15 24 A2 2 0 0 1 13 23Z" fill="#fff"/></svg>',
    valvula: '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="#e3a83b" stroke="#5a3324" stroke-width="2.5"/><path d="M14 15 L30 20 L14 25Z" fill="#f2607d" stroke="#5a3324" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="20" r="3" fill="#5a3324"/></svg>',
    puente: '<svg viewBox="0 0 48 40"><rect x="3" y="7" width="24" height="24" rx="6" fill="#e3a83b" stroke="#5a3324" stroke-width="2.2"/><text x="15" y="25" text-anchor="middle" font-size="14" fill="#5a3324">⚖</text><circle cx="38" cy="19" r="9" fill="#6cc24a" stroke="#5a3324" stroke-width="2"/><path d="M34 19 L37 22 L42 16" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pide: '<svg viewBox="0 0 48 40"><rect x="2" y="11" width="44" height="18" rx="9" fill="#fff6ea" stroke="#5a3324" stroke-width="2"/><circle cx="12" cy="20" r="5" fill="#f5a524" stroke="#c4670f" stroke-width="2"/><circle cx="24" cy="20" r="5" fill="#fff" stroke="#c4670f" stroke-width="2"/><circle cx="36" cy="20" r="5" fill="#fff" stroke="#c4670f" stroke-width="2"/></svg>'
  };
  function ventanaCuaderno() {
    var control = function (dib, titulo, txt) { return '<div class="control"><span class="dibujo">' + dib + '</span><div><b>' + titulo + '</b><small>' + txt + '</small></div></div>'; };
    var imgCtl = function (src) { return '<img src="' + src + '" alt="">'; };
    var li = IDIOMA === 'en' ? 2 : 1;
    var vistas = TX.NOTAS.filter(function (x) { return prog.notas[x[0]]; });
    var notas = vistas.length ? vistas.map(function (x) { return '<div class="nota"><b>' + x[li][0] + '</b><small>' + x[li][1] + '</small></div>'; }).join('')
      : '<p class="vacio">' + T('c_vacio') + '</p>';
    var DESDE = { F: 49, L: 61, B: 73 }; // los sabores nuevos aparecen en el cuaderno al llegar a su región
    var mats = ['C', 'M', 'G', 'U', 'V', 'F', 'L', 'B'].filter(function (k) { return !DESDE[k] || desbloqueado(DESDE[k]) || (J && JSON.stringify(J.n.vasijas).indexOf('"' + k + '"') >= 0); }).map(function (k) {
      var d = TX.MATERIAS[IDIOMA][k], c = COLOR[k];
      return '<div class="materia"><span class="gota" style="background:linear-gradient(' + c.luz + ',' + c.base + ' 60%,' + c.sombra + ')">' + iconoMateria(k, 24) +
        '</span><div><b>' + d[0] + ' · ' + d[1] + '</b><small>' + d[2] + '</small></div><em>' + T('peso', { n: M.MATERIA[k].peso }) + '</em></div>';
    }).join('');
    var enNivel = J && J.n.guia && J.n.guia.length;
    $('b-leyenda').classList.remove('con-nota');
    abrirModal('<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button><h2>' + T('c_titulo') + '</h2>' +
      '<p class="sub">' + T('c_sub') + '</p>' +
      (enNivel ? '<div class="acciones" style="margin-top:12px"><button class="btn peq" id="b-repetir-guia">' + T('c_repetir') + '</button></div>' : '') +
      '<div class="leyenda">' +
      '<h3>' + T('c_controles') + '</h3>' +
      control(DIBUJO.trasvasar, T('ctl_mover'), T('ctl_mover_d')) +
      control(DIBUJO.grifo, T('ctl_grifo'), T('ctl_grifo_d')) +
      control(DIBUJO.valvula, T('ctl_valvula'), T('ctl_valvula_d')) +
      control(DIBUJO.chimenea, T('ctl_chimenea'), T('ctl_chimenea_d')) +
      control(DIBUJO.puente, T('ctl_puente'), T('ctl_puente_d')) +
      control(DIBUJO.pide, T('ctl_pide'), T('ctl_pide_d')) +
      control(ICONO_HERR.reiniciar, T('reiniciar'), T('ctl_reiniciar_d')) +
      control(ICONO_HERR.pista, T('pista'), T('ctl_pista_d')) +
      '<h3>' + T('c_notas', { a: vistas.length, b: TX.NOTAS.length }) + '</h3>' + notas +
      '<h3>' + T('c_materias') + '</h3>' + mats +
      '<div class="regla">' + T('c_atajos') + '</div>' +
      '</div>', function (m) {
      var br = m.querySelector('#b-repetir-guia');
      if (br) br.addEventListener('click', function () {
        cerrarModal();
        if (J.ocupado) return;
        J.guia = null; reiniciar(); iniciarGuia();
      });
    });
  }

  // ───────────────────────── Ajustes ─────────────────────────
  function ventanaAjustes() {
    var interruptor = function (id, clave, on) {
      return '<div class="ajuste"><span>' + T(clave) + '</span><button class="interruptor' + (on ? ' on' : '') + '" id="' + id + '" role="switch" aria-checked="' + on + '" aria-label="' + T(clave) + '"><i></i></button></div>';
    };
    abrirModal('<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button><h2>' + T('ajustes') + '</h2>' +
      '<div class="ajustes">' +
      '<div class="ajuste"><span>' + T('aj_idioma') + '</span><div class="idioma"><button data-idioma="es">ES</button><button data-idioma="en">EN</button></div></div>' +
      interruptor('aj-musica', 'aj_musica', prog.musica) + interruptor('aj-efectos', 'aj_efectos', prog.efectos) + interruptor('aj-voces', 'aj_voces', prog.voces) +
      '</div>' +
      '<div class="zona-peligro"><button class="btn sec peq" id="aj-borrar">' + T('aj_borrar') + '</button><div id="aj-confirmar" hidden><p class="sub">' + T('aj_borrar_aviso') + '</p>' +
      '<div class="acciones"><button class="btn sec peq" id="aj-cancelar">' + T('aj_cancelar') + '</button><button class="btn peq peligro" id="aj-si">' + T('aj_borrar_seguro') + '</button></div></div></div>',
    function (m) {
      aplicarTextos();
      m.querySelectorAll('.idioma button').forEach(function (b) { b.addEventListener('click', function () { cambiarIdioma(b.getAttribute('data-idioma')); ventanaAjustes(); }); });
      var alternar = function (id, campo) {
        m.querySelector('#' + id).addEventListener('click', function (e) {
          prog[campo] = !prog[campo]; guardar();
          e.currentTarget.classList.toggle('on', prog[campo]); e.currentTarget.setAttribute('aria-checked', prog[campo]);
          if (campo === 'musica') ponerMusica();
          if (campo === 'voces' && !prog.voces) callarVoz();
          SON.toque();
        });
      };
      alternar('aj-musica', 'musica'); alternar('aj-efectos', 'efectos'); alternar('aj-voces', 'voces');
      m.querySelector('#aj-borrar').addEventListener('click', function () { m.querySelector('#aj-confirmar').hidden = false; m.querySelector('#aj-borrar').hidden = true; });
      m.querySelector('#aj-cancelar').addEventListener('click', function () { m.querySelector('#aj-confirmar').hidden = true; m.querySelector('#aj-borrar').hidden = false; });
      m.querySelector('#aj-si').addEventListener('click', function () {
        var idioma = prog.idioma; prog = BASE(); prog.idioma = idioma; guardar();
        cerrarModal(); pintarMonedas(); pintarPortada(); mostrar('pantalla-portada', null, 'portada'); J = null;
        toast('<span class="toast-ic">🧹</span><span><b>' + T('aj_borrado') + '</b></span>');
      });
    });
  }

  // ───────────────────────── Logros ─────────────────────────
  function ventanaLogros() {
    var lista = TX.LOGROS.map(function (l) {
      var d = logroDatos(l), hecho = !!prog.logros[l[0]], meta = l[6], prc = meta ? Math.min(meta, progresoLogro(l[0])) : 0;
      return '<div class="logro' + (hecho ? ' hecho' : '') + '"><span class="logro-ic">' + (hecho ? '🏆' : '🔒') + '</span><div><b>' + d.t + '</b><small>' + d.d + '</small>' +
        (meta && !hecho ? '<span class="barrita"><i style="width:' + Math.round(100 * prc / meta) + '%"></i></span><small class="cuenta">' + prc + '/' + meta + '</small>' : '') +
        '</div><em>' + (hecho ? T('log_hecho') : MONEDA_SVG + l[5]) + '</em></div>';
    }).join('');
    var n = Object.keys(prog.logros).length;
    abrirModal('<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button><h2>' + T('logros') + '</h2>' +
      '<p class="sub">' + T('log_sub') + ' · ' + n + '/' + TX.LOGROS.length + '</p><div class="logros">' + lista + '</div>');
  }

  // ───────────────────────── Vitrina y tienda ─────────────────────────
  function ventanaVitrina() {
    var confirmar = null;
    function dibujar(m) {
      var celdas = TX.VITRINA.map(function (p) {
        var tiene = !!prog.vitrina[p[0]], rz = p[5];
        var pie = tiene ? '<span class="nombre">' + nombreDulce(p) + '</span>'
          : p[3] ? '<span class="nombre bloq">' + T('vit_nivel', { n: p[3] }) + '</span>'
          : '<button class="comprar' + (confirmar === p[0] ? ' confirmar' : '') + (prog.monedas < p[4] ? ' caro' : '') + '" data-id="' + p[0] + '">' + (confirmar === p[0] ? T('vit_confirmar', { p: p[4] }) : MONEDA_SVG + p[4]) + '</button>';
        return '<div class="estante ' + rz + (tiene ? ' tiene' : '') + '" data-id="' + p[0] + '"><img src="assets/vitrina/' + p[0] + '.png" alt="' + (tiene ? nombreDulce(p) : '') + '" loading="lazy">' +
          '<span class="rareza">' + T('rareza_' + rz) + '</span>' + pie + '</div>';
      }).join('');
      var mesas = TX.MESAS.map(function (x) {
        var tiene = !!prog.mesas[x[0]], usa = prog.mesa === x[0];
        return '<div class="mesa-opcion mesa-' + x[0] + (usa ? ' usa' : '') + '"><span class="muestra"></span><b>' + (IDIOMA === 'en' ? x[2] : x[1]) + '</b>' +
          (usa ? '<em>' + T('vit_en_uso') + '</em>' : tiene ? '<button class="btn sec peq" data-mesa="' + x[0] + '">' + T('vit_usar') + '</button>'
            : '<button class="comprar' + (confirmar === x[0] ? ' confirmar' : '') + (prog.monedas < x[3] ? ' caro' : '') + '" data-mesa-comprar="' + x[0] + '">' + (confirmar === x[0] ? T('vit_confirmar', { p: x[3] }) : MONEDA_SVG + x[3]) + '</button>') + '</div>';
      }).join('');
      m.querySelector('.ventana').innerHTML = '<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button>' +
        '<div class="vit-cab"><h2>' + T('vitrina') + '</h2><span class="chapa chapa-monedas"></span></div>' +
        '<p class="sub">' + T('vit_sub') + '</p><p class="coleccion">' + T('vit_coleccion', { a: nVitrina(), b: TX.VITRINA.length }) + '</p>' +
        '<div class="vitrina">' + celdas + '</div>' +
        '<h3 class="h3-mesas">' + T('vit_mesas') + '</h3><p class="sub izq">' + T('vit_mesas_sub') + '</p><div class="mesas">' + mesas + '</div>' +
        '<div class="lamina" id="lamina" hidden></div>';
      pintarMonedas();
      m.querySelector('.cerrar').addEventListener('click', function () { SON.toque(); cerrarModal(); });
    }
    abrirModal('', function (m) {
      dibujar(m);
      m.addEventListener('click', function (e) {
        var lam = m.querySelector('#lamina');
        if (e.target.closest('#lamina')) { lam.hidden = true; return; }
        var bc = e.target.closest('[data-id].comprar'), bm = e.target.closest('[data-mesa]'), bmc = e.target.closest('[data-mesa-comprar]');
        if (bc || bmc) {
          var id = bc ? bc.getAttribute('data-id') : bmc.getAttribute('data-mesa-comprar');
          var item = bc ? TX.VITRINA.filter(function (p) { return p[0] === id; })[0] : TX.MESAS.filter(function (x) { return x[0] === id; })[0];
          var precio = bc ? item[4] : item[3];
          if (confirmar !== id) { confirmar = id; SON.toque(); dibujar(m); return; }
          if (prog.monedas < precio) { SON.error(); confirmar = null; dibujar(m); toast('<span class="toast-ic">🪙</span><span><b>' + T('vit_falta', { p: precio - prog.monedas }) + '</b></span>'); return; }
          prog.monedas -= precio;
          if (bc) prog.vitrina[id] = true; else { prog.mesas[id] = true; prog.mesa = id; aplicarMesa(); }
          guardar(); confirmar = null; SON.compra(); dibujar(m);
          var cel = m.querySelector('.estante[data-id="' + id + '"]'); if (cel) cel.classList.add('recien');
          toast('<span class="toast-ic">🧁</span><span><b>' + T('vit_comprado', { t: bc ? nombreDulce(item) : (IDIOMA === 'en' ? item[2] : item[1]) }) + '</b></span>');
          revisarLogros();
          return;
        }
        if (bm) { prog.mesa = bm.getAttribute('data-mesa'); guardar(); aplicarMesa(); SON.toque(); dibujar(m); return; }
        var est = e.target.closest('.estante.tiene');
        if (est) {
          var p = TX.VITRINA.filter(function (x) { return x[0] === est.getAttribute('data-id'); })[0];
          lam.innerHTML = '<div class="lamina-in"><img src="assets/vitrina/lamina_' + p[0] + '.jpg" alt="' + nombreDulce(p) + '"><b>' + nombreDulce(p) + '</b><small>' + T('toca_seguir') + '</small></div>';
          lam.hidden = false; SON.toque();
        } else if (confirmar && !e.target.closest('.comprar')) { confirmar = null; dibujar(m); }
      });
    });
  }
  function aplicarMesa() { $('pantalla-nivel').setAttribute('data-mesa', prog.mesa || 'madera'); }

  // ───────────────────────── Portada ─────────────────────────
  function pintarPortada() {
    pintarVidas(); pintarModos();
    var s = siguienteNivel();
    $('b-jugar-sub').textContent = s ? T('seguir_nivel', { n: s.id }) : T('todo_completo');
  }
  var bienvenidaDicha = false;

  // ───────────────────────── Mapa ─────────────────────────
  function abrirMapa() {
    J = null; callarAviso();
    mostrar('pantalla-mapa', 'assets/suave_mapa.jpg', 'obrador');
    pintarMapa(); pintarCofre(); pintarMonedas();
    var actual = siguienteNivel();
    requestAnimationFrame(function () {
      var sc = $('mapa-scroll'), nodo = $('mapa-lienzo').querySelector('.nodo.actual') || $('mapa-lienzo').querySelector('.nodo:last-of-type');
      if (nodo) sc.scrollLeft = Math.max(0, nodo.offsetLeft + nodo.parentNode.offsetLeft - sc.clientWidth / 2);
      if (nodo) sc.scrollTop = Math.max(0, nodo.offsetTop - sc.clientHeight / 2);
      tituloMapa();
      moverAvatar();
    });
    if (!prog.prologo) {
      prog.prologo = true; guardar();
      hablar(TX.HISTORIA[IDIOMA].prologo.map(function (l, i) { return { id: 'prologo_' + i, q: l[0], t: l[1] }; }));
    }
  }
  function siguienteNivel() {
    for (var i = 0; i < NIVELES.length; i++) if (!resuelto(NIVELES[i].id)) return NIVELES[i];
    return null;
  }
  // El mapa son tres paneles: la ilustración original (regiones I y II), su reflejo helado (III) y la ciudad de noche (IV).
  // Cada nivel tiene un panel y un punto del camino; en el reflejo el camino se recorre al revés.
  function posNodo(n) {
    var i = (n.id - 1) % 12, panel = Math.floor((n.id - 1) / 12), espejo = panel % 2 === 1;
    var p = NODOS[espejo ? 11 - i : i];
    return { panel: panel, x: espejo ? 100 - p[0] : p[0], y: p[1] };
  }
  var TONO_PANEL = [null, null, null, null,
    'hue-rotate(185deg) saturate(1.25)', 'hue-rotate(300deg) saturate(.75) brightness(1.12)', 'hue-rotate(70deg) saturate(1.15) brightness(.92)',
    'hue-rotate(-28deg) saturate(1.6) brightness(.95)', 'hue-rotate(215deg) saturate(.85) brightness(1.02)', 'hue-rotate(255deg) saturate(1.3) brightness(.8)'];
  function asegurarPaneles() {
    var lienzo = $('mapa-lienzo'), hay = lienzo.querySelectorAll('.panel-mapa').length, faltan = Math.ceil(NIVELES[NIVELES.length - 1].id / 12);
    for (var k = hay; k < faltan; k++) {
      var espejo = k % 2 === 1, tono = TONO_PANEL[k] || ('hue-rotate(' + (k * 47 % 360) + 'deg)');
      var pn = document.createElement('div'); pn.className = 'panel-mapa p' + (k + 1);
      pn.innerHTML = '<img class="capa mapa-gris" src="assets/mapa.jpg" alt="" draggable="false"><img class="capa mapa-color" src="assets/mapa.jpg" alt="" draggable="false"><i class="caramelo-deco" style="left:' + (espejo ? 16.75 : 83.25) + '%;top:30%"></i>';
      pn.querySelectorAll('img').forEach(function (im) {
        im.style.transform = espejo ? 'scaleX(-1)' : '';
        im.style.filter = tono + (im.classList.contains('mapa-gris') ? ' grayscale(.6)' : '');
      });
      lienzo.insertBefore(pn, $('avatar-mapa'));
    }
  }
  function pintarMapa() {
    asegurarPaneles();
    var paneles = $('mapa-lienzo').querySelectorAll('.panel-mapa');
    paneles.forEach(function (pn) { pn.querySelectorAll('.nodo').forEach(function (e) { e.remove(); }); });
    var actual = siguienteNivel(), mascaras = [].map.call(paneles, function () { return []; });
    NIVELES.forEach(function (n) {
      var p = posNodo(n), b = document.createElement('button'), pr = prog.niveles[n.id] || {};
      b.className = 'nodo' + (n.jefe ? ' jefe' : '') + (desbloqueado(n.id) ? '' : ' bloq') + (actual && actual.id === n.id ? ' actual' : '') + (pr.res ? ' hecho' : '');
      b.style.left = p.x + '%'; b.style.top = p.y + '%';
      b.textContent = n.id;
      b.setAttribute('data-region', n.region); b.setAttribute('data-id', n.id);
      b.setAttribute('aria-label', T('nivel_aria', { n: n.id, t: TN(n).titulo }) + (desbloqueado(n.id) ? '' : ' ' + T('bloqueado')));
      var mc = document.createElement('span'); mc.className = 'marcas';
      mc.innerHTML = '<i class="' + (pr.res ? 'si' : '') + '"></i><i class="' + (pr.dom ? 'si' : '') + '"></i><i class="' + (pr.ing ? 'si' : '') + '"></i>';
      b.appendChild(mc);
      b.addEventListener('click', function () {
        if (arrastreMapa.movido) return;
        if (!desbloqueado(n.id)) { SON.error(); return; }
        SON.toque(); cargarNivel(n.id);
      });
      paneles[p.panel].appendChild(b);
      if (pr.res) mascaras[p.panel].push('radial-gradient(circle at ' + p.x + '% ' + p.y + '%, #000 0, #000 6%, transparent 13%)');
    });
    paneles.forEach(function (pn, i) {
      var col = pn.querySelector('.mapa-color');
      if (mascaras[i].length) { var mk = mascaras[i].join(','); col.style.webkitMaskImage = mk; col.style.maskImage = mk; col.style.opacity = 1; }
      else col.style.opacity = 0;
    });
    pintarVidas();
    $('b-mapa-seguir').textContent = actual ? T('jugar_nivel', { n: actual.id }) : T('reino_restaurado');
    tituloMapa();
  }
  // Miga camina por el mapa hasta el nivel que toca
  function posAvatar(id) {
    var b = $('mapa-lienzo').querySelector('.nodo[data-id="' + id + '"]'); if (!b) return null;
    return { x: b.offsetLeft + b.parentNode.offsetLeft, y: b.offsetTop - b.offsetHeight * 0.55 };
  }
  function moverAvatar() {
    var av = $('avatar-mapa'); if (!av) return;
    var meta = siguienteNivel(), destino = meta ? meta.id : NIVELES[NIVELES.length - 1].id;
    var desde = prog.avatar && prog.avatar < destino && destino - prog.avatar <= 6 ? prog.avatar : destino;
    var p2 = posAvatar(destino); if (!p2) return;
    av.hidden = false;
    var fija = function (p) { av.style.left = p.x + 'px'; av.style.top = p.y + 'px'; };
    prog.avatar = destino; guardar();
    if (desde === destino || reducido) { fija(p2); return; }
    // Camina nodo a nodo, dando un saltito en cada paso
    var p0 = posAvatar(desde), ruta = [], fr = [];
    for (var id = desde; id <= destino; id++) { var p = posAvatar(id); if (p) ruta.push(p); }
    fija(p0);
    ruta.forEach(function (p, i) {
      var tx = (p.x - p0.x).toFixed(1), ty = (p.y - p0.y).toFixed(1);
      if (i > 0) { var q = ruta[i - 1]; fr.push({ offset: (i - 0.5) / (ruta.length - 1), transform: 'translate(' + ((p.x + q.x) / 2 - p0.x).toFixed(1) + 'px,' + ((p.y + q.y) / 2 - p0.y - 26).toFixed(1) + 'px)' }); }
      fr.push({ offset: i / (ruta.length - 1), transform: 'translate(' + tx + 'px,' + ty + 'px)' });
    });
    av.classList.add('andando'); av.classList.toggle('mira-izq', p2.x < p0.x);
    setTimeout(function () {
      av.animate(fr, { duration: 650 * (ruta.length - 1), easing: 'ease-in-out' }).onfinish = function () { fija(p2); av.classList.remove('andando', 'mira-izq'); };
      for (var i = 1; i < ruta.length; i++) setTimeout(function () { SON.burbuja(); }, 650 * i - 120);
    }, 500);
  }
  // Título grande: la región que ocupa el centro de la pantalla
  var regionTitulo = null;
  function tituloMapa() {
    var sc = $('mapa-scroll'); if (!sc || $('pantalla-mapa').hidden) return;
    var centro = sc.scrollLeft + sc.clientWidth / 2, mejor = null, dist = 1e9;
    $('mapa-lienzo').querySelectorAll('.nodo').forEach(function (b) {
      var x = b.offsetLeft + b.parentNode.offsetLeft, d = Math.abs(x - centro);
      if (d < dist) { dist = d; mejor = b; }
    });
    var r = mejor ? Number(mejor.getAttribute('data-region')) : 1;
    if (r === regionTitulo && $('mapa-titulo').textContent) return;
    regionTitulo = r;
    var t = $('mapa-titulo');
    t.innerHTML = '<small>' + T('mapa_region', { n: romano(r) }) + '</small><b>' + regionNombre(r) + '</b>';
    t.setAttribute('data-region', r);
    if (!reducido) t.animate([{ transform: 'translateY(-8px) scale(.96)', opacity: 0.4 }, { transform: 'none', opacity: 1 }], { duration: 320, easing: 'ease-out' });
  }
  // Arrastrar el mapa con el ratón y mover la rueda en vertical también lo desplaza
  var arrastreMapa = { activo: false, movido: false, x: 0, sl: 0 };
  (function () {
    var sc = $('mapa-scroll');
    sc.addEventListener('scroll', function () { tituloMapa(); }, { passive: true });
    sc.addEventListener('wheel', function (e) { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { sc.scrollLeft += e.deltaY; e.preventDefault(); } }, { passive: false });
    sc.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      arrastreMapa = { activo: true, movido: false, x: e.clientX, sl: sc.scrollLeft };
    });
    window.addEventListener('pointermove', function (e) {
      if (!arrastreMapa.activo) return;
      var dx = e.clientX - arrastreMapa.x;
      if (Math.abs(dx) > 5) { arrastreMapa.movido = true; sc.classList.add('arrastrando'); }
      if (arrastreMapa.movido) sc.scrollLeft = arrastreMapa.sl - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!arrastreMapa.activo) return;
      arrastreMapa.activo = false; sc.classList.remove('arrastrando');
      setTimeout(function () { arrastreMapa.movido = false; }, 0);
    });
  })();

  // ───────────────────────── Análisis en segundo plano (pistas instantáneas) ─────────────────────────
  var trabajador = null, sinTrabajador = false, distancias = {};
  function analizarNivel(n) {
    if (n.id in distancias) { J.dist = distancias[n.id]; return; }
    var id = n.id;
    function respaldo() {
      sinTrabajador = true;
      setTimeout(function () {
        if (id in distancias) return;
        var an = M.analizar(n); distancias[id] = an.completo ? an.dist : null; // incompleto: no se puede afirmar que algo sea un callejón
        if (J && J.n.id === id) { J.dist = distancias[id]; revisarCallejon(); }
      }, 80);
    }
    if (sinTrabajador || typeof Worker === 'undefined') return respaldo();
    try {
      if (!trabajador) {
        trabajador = new Worker('analisis.js');
        trabajador.onmessage = function (e) {
          distancias[e.data.id] = e.data.completo ? e.data.dist : null;
          if (J && J.n.id === e.data.id) { J.dist = distancias[e.data.id]; revisarCallejon(); }
        };
        trabajador.onerror = function (ev) { if (ev && ev.preventDefault) ev.preventDefault(); trabajador = null; respaldo(); };
      }
      trabajador.postMessage(n.modo ? { nivel: n } : id);
    } catch (e) { trabajador = null; respaldo(); }
  }

  // ───────────────────────── Nivel: estado ─────────────────────────
  var J = null; // partida en curso

  function cargarNivel(id) {
    var n = typeof id === 'object' ? id : NIVELES.filter(function (x) { return x.id === id; })[0];
    if (!n.libre && vidas() <= 0) { ventanaSinVidas(function () { cargarNivel(id); }); return; }
    $('guia').hidden = true; enfocar([]); // una guía a medias de otro nivel no debe quedarse en pantalla
    var s0 = M.estadoInicial(n);
    var par = n.minimo || (M.resolver(n, s0) || []).length;
    J = { n: n, s: s0, s0: s0, hist: [], movs: 0, sel: null, ocupado: false, pendiente: null, pistas: 0, tramoPista: null,
      valv: {}, trasvases: 0, tocados: {}, par: par, limite: par + (par >= 4 ? 1 : 0), fin: false, dist: null, callejonAvisado: null,
      reinicios: 0, inicio: Date.now(), ultimaAccion: Date.now(), ayudaDada: false, conGuia: false, errores: 0, perdio: false };
    J.max = n.libre ? null : (n.maxMovs || par + Math.max(2, Math.ceil(par * 0.6)));
    (n.grifos || []).forEach(function (g) { J.valv[g.id] = 0; });
    var ambiente = n.ambiente || AMBIENTES[(n.region - 1) % AMBIENTES.length], suave = 'assets/suave_' + ambiente + '.jpg';
    mostrar('pantalla-nivel', suave, ambiente);
    $('pantalla-nivel').setAttribute('data-region', n.region);
    $('pantalla-nivel').style.setProperty('--fondo-nivel', 'url("' + suave + '")');
    aplicarMesa();
    $('b-pista').classList.remove('pulso');
    callarAviso();
    construirTablero();
    pintarCabecera(); construirObjetivos();
    actualizar(null, false);
    encuadrar();
    analizarNivel(n);
    var primera = !prog.vistos[id];
    prog.vistos[id] = true; guardar();
    hablar(primera ? TN(n).intro : []).then(function () { if (J && J.n === n && !prog.guias[id]) iniciarGuia(); });
  }
  function pintarCabecera() {
    var n = J.n, tx = TN(n);
    $('lazo').innerHTML = (n.modo === 'infinito' ? '∞ ' + n.k : n.modo === 'diario' ? T('hoy') : T(n.jefe ? 'desafio' : 'nivel') + ' ' + n.id) + '<small>' + tx.titulo + '</small>';
    $('consejo').textContent = tx.ensena;
    aplicarTextos();
  }
  var MOLINILLO_SVG = '<svg viewBox="-12 -12 24 24" aria-hidden="true">' + [0, 90, 180, 270].map(function (r, i) { return '<path d="M0,0 Q1.5,-10 9,-8 Q6,-2 0,0Z" fill="' + (i % 2 ? '#fff6ea' : '#f2607d') + '" stroke="#5a3324" stroke-width="1.4" transform="rotate(' + r + ')"/>'; }).join('') + '<circle r="2.6" fill="#ffd877" stroke="#5a3324" stroke-width="1.2"/></svg>';
  // Fichas de la cabecera: qué hay que despertar y cuánto falta
  function construirObjetivos() {
    var c = $('objetivos'); c.innerHTML = '';
    (J.n.objetivos || []).forEach(function (o) {
      var b = document.createElement('button'); b.className = 'ficha'; b.setAttribute('data-obj', o.id);
      b.innerHTML = '<span class="ficha-img">' + (o.tipo === 'turbina' ? MOLINILLO_SVG : '<img src="assets/' + o.img + '.png" alt="">') + '</span>' +
        '<span class="ficha-num"></span><span class="ficha-mat" style="background:' + fondoSabores(o) + '">' + (o.pide ? '' : iconoMateria(o.materia, 11)) + '</span>';
      b.addEventListener('click', function () { SON.toque(); anillo(o.id, '#ffffff', false); explicaObjetivo(o); });
      c.appendChild(b);
    });
  }
  // Pedidos combinados: lista de sabores, colores y textos
  function sabores(o) { var l = []; if (o.pide) Object.keys(o.pide).forEach(function (k) { for (var i = 0; i < o.pide[k]; i++) l.push(k); }); else for (var j = 0; j < o.necesita; j++) l.push(o.materia); return l; }
  function fondoSabores(o) {
    if (!o.pide) return COLOR[o.materia].base;
    var ks = Object.keys(o.pide), paso = 360 / ks.length;
    return 'conic-gradient(' + ks.map(function (k, i) { return COLOR[k].base + ' ' + (i * paso) + 'deg ' + ((i + 1) * paso) + 'deg'; }).join(',') + ')';
  }
  function listaSabores(o, faltan) {
    var ks = o.pide ? Object.keys(o.pide) : [o.materia], partes = [];
    ks.forEach(function (k) {
      var n = o.pide ? o.pide[k] - (faltan ? J.s.tiene[o.id][k] : 0) : o.necesita - (faltan ? J.s.tiene[o.id] : 0);
      if (n > 0) partes.push(n + ' ' + (IDIOMA === 'en' ? '' : 'de ') + matNombre(k));
    });
    return partes.length > 1 ? partes.slice(0, -1).join(', ') + ' ' + T('y') + ' ' + partes[partes.length - 1] : partes.join('');
  }
  function pintarObjetivos() {
    (J.n.objetivos || []).forEach(function (o) {
      var b = $('objetivos').querySelector('[data-obj="' + o.id + '"]'); if (!b) return;
      var hecho = !!J.s.hecho[o.id], num = b.querySelector('.ficha-num'), txt = hecho ? '✓' : M.recibido(o, J.s) + '/' + o.necesita;
      if (num.textContent && num.textContent !== txt && !reducido) b.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)', offset: 0.4 }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out' });
      num.textContent = txt;
      b.classList.toggle('hecho', hecho);
      b.setAttribute('aria-label', T('objetivo_aria', { o: nombreObj(o), a: M.recibido(o, J.s), b: o.necesita, m: o.pide ? listaSabores(o) : matNombre(o.materia) }));
    });
  }
  function explicaObjetivo(o) {
    var s = J.s;
    avisar(s.hecho[o.id] ? T('objetivo_vivo', { o: nombreObj(o) }) : o.pide ? T('objetivo_combo', { o: nombreObj(o), l: listaSabores(o, true) }) : T('objetivo_pide', { o: nombreObj(o), n: o.necesita - s.tiene[o.id], m: matNombre(o.materia) }), 'zappy');
  }

  // ───────────────────────── Geometría ─────────────────────────
  function geom(v) {
    var u = UNIDAD[v.forma], w = ANCHO[v.forma];
    var cuello = v.forma === 'matraz' ? 30 : 0;
    var h = v.cap * u + 14 + cuello;
    return { u: u, w: w, h: h, top: v.y - h, izq: v.x - w / 2, der: v.x + w / 2, cuello: cuello };
  }
  function vasija(id) { return M.index(J.n).vas[id]; }
  function objetivo(id) { return M.index(J.n).obj[id]; }
  function radio(o) { return o.tipo === 'turbina' ? 34 : (o.grande ? 46 : 38); }
  function salidaGrifo(g) {
    var v = vasija(g.de), G = geom(v), lado = g.sale === 'izq' ? -1 : 1;
    if (g.lado === 'arriba') { var cx = v.x + lado * (G.w / 2 - 12); return { base: [cx, G.top + 2], p: [cx, G.top - 12] }; }
    return { base: [v.x + lado * (G.w / 2 - 2), v.y - 10], p: [v.x + lado * (G.w / 2 + 6), v.y - 10] };
  }
  function entrada(idDestino) {
    var v = vasija(idDestino);
    if (v) return [v.x, geom(v).top - 2];
    var o = objetivo(idDestino), r = radio(o);
    return o.materia === 'V' ? [o.x, o.y + r] : [o.x, o.y - r];
  }
  var cacheRutas = {};
  function puntosRuta(g, i) {
    var k = J.n.id + '|' + g.id + '|' + i;
    if (cacheRutas[k]) return cacheRutas[k];
    var r = g.rutas[i], pts = [salidaGrifo(g).p];
    if (g.valvula) pts.push(g.valvula);
    (r.via || []).forEach(function (p) { pts.push(p); });
    pts.push(entrada(r.a));
    var out = [pts[0]];
    for (var q = 1; q < pts.length; q++) {
      var a = out[out.length - 1], b = pts[q];
      if (a[0] !== b[0] && a[1] !== b[1]) out.push([b[0], a[1]]);
      out.push(b);
    }
    return (cacheRutas[k] = out);
  }
  function largo(pts) { var L = 0; for (var i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
  function puntoEn(pts, t) {
    var obj = largo(pts) * t;
    for (var i = 1; i < pts.length; i++) {
      var d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      if (obj <= d || i === pts.length - 1) {
        var f = d ? Math.min(1, obj / d) : 0;
        return { x: pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, y: pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f,
          ang: Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]) };
      }
      obj -= d;
    }
  }
  function camino(pts) { return 'M' + pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' L'); }
  function posCompuerta(c) { return puntoEn(puntosRuta(M.index(J.n).grifo[c.ruta[0]], c.ruta[1]), c.en); }

  // ───────────────────────── SVG ─────────────────────────
  function el(tag, at, padre) {
    var e = document.createElementNS(NS, tag);
    for (var k in at) if (at[k] !== undefined && at[k] !== null) e.setAttribute(k, at[k]);
    if (padre) padre.appendChild(e);
    return e;
  }
  function vaciar(g) { while (g.firstChild) g.removeChild(g.firstChild); }
  function definiciones(svg) {
    var d = el('defs', {}, svg);
    Object.keys(COLOR).forEach(function (k) {
      var lg = el('linearGradient', { id: 'gm-' + k, x1: 0, x2: 1, y1: 0, y2: 0 }, d);
      el('stop', { offset: 0, 'stop-color': COLOR[k].sombra }, lg);
      el('stop', { offset: 0.35, 'stop-color': COLOR[k].base }, lg);
      el('stop', { offset: 0.6, 'stop-color': COLOR[k].luz }, lg);
      el('stop', { offset: 1, 'stop-color': COLOR[k].base }, lg);
    });
    var vd = el('linearGradient', { id: 'vidrio', x1: 0, x2: 1 }, d);
    [[0, 0.62], [0.16, 0.22], [0.5, 0.04], [0.82, 0.08], [1, 0.42]].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[0] > 0.3 && p[0] < 0.9 ? '#e6fbff' : '#fff', 'stop-opacity': p[1] }, vd); });
    var la = el('linearGradient', { id: 'laton', x1: 0, x2: 0, y1: 0, y2: 1 }, d);
    el('stop', { offset: 0, 'stop-color': '#ffe08a' }, la); el('stop', { offset: 0.5, 'stop-color': '#e3a83b' }, la); el('stop', { offset: 1, 'stop-color': '#a8691c' }, la);
    var co = el('linearGradient', { id: 'cobre', x1: 0, x2: 1 }, d);
    el('stop', { offset: 0, 'stop-color': '#9c4f2a' }, co); el('stop', { offset: 0.4, 'stop-color': '#e2895a' }, co); el('stop', { offset: 0.65, 'stop-color': '#f6b98d' }, co); el('stop', { offset: 1, 'stop-color': '#b45f34' }, co);
    var me = el('linearGradient', { id: 'metal', x1: 0, x2: 1 }, d);
    [[0, '#7d8695'], [0.25, '#dfe5ee'], [0.45, '#ffffff'], [0.7, '#b9c2cf'], [1, '#7a8392']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, me); });
    var ma = el('linearGradient', { id: 'madera', x1: 0, x2: 0, y1: 0, y2: 1 }, d);
    [[0, '#d99a62'], [0.5, '#b8743f'], [1, '#8a5230']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, ma); });
    var vf = el('linearGradient', { id: 'vidrioFondo', x1: 0, x2: 1 }, d);
    [[0, 0.32], [0.3, 0.12], [0.7, 0.1], [1, 0.26]].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': '#fff8ef', 'stop-opacity': p[1] }, vf); });
    // Oro brillante (como los marcos de los iconos de RECURSOS)
    var oh = el('linearGradient', { id: 'oroH', x1: 0, x2: 1 }, d);
    [[0, '#a8620c'], [0.22, '#f0b230'], [0.42, '#fff3b8'], [0.58, '#ffd34d'], [0.85, '#d18a17'], [1, '#8f520a']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, oh); });
    var ov = el('linearGradient', { id: 'oroV', x1: 0, x2: 0, y1: 0, y2: 1 }, d);
    [[0, '#fff6c4'], [0.35, '#ffd34d'], [0.7, '#e39a1c'], [1, '#9c5e0a']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, ov); });
    var ob = el('radialGradient', { id: 'oroBola', cx: 0.38, cy: 0.32, r: 0.75 }, d);
    [[0, '#fffbe0'], [0.3, '#ffd85a'], [0.75, '#d9901a'], [1, '#8f520a']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, ob); });
    // Caramelo glaseado para los grifos (rosa) y las chimeneas (lila)
    var cr = el('radialGradient', { id: 'caramelo', cx: 0.36, cy: 0.3, r: 0.8 }, d);
    [[0, '#ffd0dc'], [0.35, '#ff7d9c'], [0.75, '#e2476b'], [1, '#a8284a']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, cr); });
    var li = el('radialGradient', { id: 'lila', cx: 0.36, cy: 0.3, r: 0.8 }, d);
    [[0, '#f3e8ff'], [0.35, '#c9aef0'], [0.75, '#9472c9'], [1, '#5f3f94']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, li); });
    // Fuego: tres capas de llama y el resplandor de las brasas
    var le = el('linearGradient', { id: 'llamaExt', x1: 0, x2: 0, y1: 1, y2: 0 }, d);
    [[0, '#d8281a'], [0.45, '#ff5a1f'], [1, '#ff9a2e']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, le); });
    var lm = el('linearGradient', { id: 'llamaMed', x1: 0, x2: 0, y1: 1, y2: 0 }, d);
    [[0, '#ff7a1a'], [0.6, '#ffb52e'], [1, '#ffd85e'] ].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, lm); });
    var ln = el('linearGradient', { id: 'llamaNucleo', x1: 0, x2: 0, y1: 1, y2: 0 }, d);
    [[0, '#fff3b0'], [1, '#ffffff']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, ln); });
    var br = el('radialGradient', { id: 'resplandor' }, d);
    [[0, '#ffd166', 0.85], [0.45, '#ff8a3d', 0.45], [1, '#ff5a1f', 0]].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1], 'stop-opacity': p[2] }, br); });
    var bs = el('radialGradient', { id: 'brasa', cx: 0.5, cy: 0.35 }, d);
    [[0, '#fff1a8'], [0.4, '#ff9a2e'], [1, '#b8320f']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, bs); });
    var hi = el('linearGradient', { id: 'hierro', x1: 0, x2: 0, y1: 0, y2: 1 }, d);
    [[0, '#8a6a5a'], [0.4, '#5a3d30'], [1, '#2e1b14']].forEach(function (p) { el('stop', { offset: p[0], 'stop-color': p[1] }, hi); });
    var hal = el('radialGradient', { id: 'halo' }, d);
    el('stop', { offset: 0, 'stop-color': '#fff7c2', 'stop-opacity': 0.95 }, hal);
    el('stop', { offset: 0.6, 'stop-color': '#ffd36b', 'stop-opacity': 0.35 }, hal);
    el('stop', { offset: 1, 'stop-color': '#ffd36b', 'stop-opacity': 0 }, hal);
    return d;
  }
  function formaVasija(v, G, inset) {
    var i = inset || 0, l = G.izq + i, r = G.der - i, t = G.top + i, b = v.y - i, cx = v.x;
    switch (v.forma) {
      case 'cuenco': // boca ancha y fondo redondeado
        return 'M' + l + ',' + t + ' L' + r + ',' + t + ' C' + r + ',' + (b - 4) + ' ' + (r - 16) + ',' + b + ' ' + cx + ',' + b + ' C' + (l + 16) + ',' + b + ' ' + l + ',' + (b - 4) + ' ' + l + ',' + t + 'Z';
      case 'matraz': // cuello estrecho y cuerpo de bola, como un matraz de laboratorio
        var y0 = G.top + G.cuello, cl = cx - 11 + i, cr = cx + 11 - i, hb = b - y0;
        return 'M' + cl + ',' + t + ' L' + cr + ',' + t + ' L' + cr + ',' + y0 + ' C' + (r + 3) + ',' + (y0 + hb * 0.1) + ' ' + (r + 3) + ',' + b + ' ' + cx + ',' + b +
          ' C' + (l - 3) + ',' + b + ' ' + (l - 3) + ',' + (y0 + hb * 0.1) + ' ' + cl + ',' + y0 + 'Z';
      case 'capsula': var rc = Math.max(3, 9 - i);
        return 'M' + (l + rc) + ',' + t + ' L' + (r - rc) + ',' + t + ' Q' + r + ',' + t + ' ' + r + ',' + (t + rc) + ' L' + r + ',' + (b - rc) + ' Q' + r + ',' + b + ' ' + (r - rc) + ',' + b +
          ' L' + (l + rc) + ',' + b + ' Q' + l + ',' + b + ' ' + l + ',' + (b - rc) + ' L' + l + ',' + (t + rc) + ' Q' + l + ',' + t + ' ' + (l + rc) + ',' + t + 'Z';
      default:
        var rad = v.forma === 'alambique' ? 15 : 9;
        return 'M' + l + ',' + t + ' L' + r + ',' + t + ' L' + r + ',' + (b - rad) + ' Q' + r + ',' + b + ' ' + (r - rad) + ',' + b + ' L' + (l + rad) + ',' + b + ' Q' + l + ',' + b + ' ' + l + ',' + (b - rad) + 'Z';
    }
  }

  var SVG = null, capas = {}, R = null, duracionLlenado = null;

  // Construye todas las piezas del nivel una sola vez y guarda referencias para actualizarlas
  function construirTablero() {
    var mesa = $('mesa'); mesa.innerHTML = '';
    cacheRutas = {};
    SVG = el('svg', { viewBox: '0 0 360 600', preserveAspectRatio: 'xMidYMid meet', role: 'group', 'aria-label': T('tablero') }, mesa);
    var defs = definiciones(SVG);
    var amb = el('g', { class: 'ambiente', 'pointer-events': 'none' }, SVG);
    for (var ch = 0; ch < 14; ch++) {
      var cx = 10 + Math.random() * 340, cy = 40 + Math.random() * 520;
      el('circle', { class: 'mota', cx: cx, cy: cy, r: 1.2 + Math.random() * 2.2, fill: '#fff8d6', style: 'animation-duration:' + (5 + Math.random() * 6).toFixed(1) + 's;animation-delay:-' + (Math.random() * 8).toFixed(1) + 's' }, amb);
    }
    ['cables', 'tubos', 'objetivos', 'compuertas', 'vasijas', 'grifos', 'fx'].forEach(function (k) { capas[k] = el('g', { class: 'capa-' + k }, SVG); });
    R = { vas: {}, rutas: {}, comp: {}, obj: {}, valv: {}, cables: [] };
    var n = J.n;
    n.vasijas.forEach(function (v) {
      var cp = el('clipPath', { id: 'clip-' + v.id }, defs);
      el('path', { d: formaVasija(v, geom(v), 3) }, cp);
    });

    // Cables causa → efecto
    (n.compuertas || []).forEach(function (c) {
      var pc = posCompuerta(c), origen = null, color = '#c98a2b';
      n.vasijas.forEach(function (v) { if (v.bascula && v.bascula.abre.indexOf(c.id) >= 0) origen = [v.x, v.y + 6]; });
      (n.objetivos || []).forEach(function (o) { if (o.alCompletar && (o.alCompletar.abre || []).indexOf(c.id) >= 0) { origen = [o.x, o.y]; color = '#f2607d'; } });
      if (!origen) return;
      var p = el('path', { class: 'cable', d: 'M' + origen[0] + ',' + origen[1] + ' Q' + ((origen[0] + pc.x) / 2) + ',' + (Math.min(origen[1], pc.y) - 30) + ' ' + pc.x + ',' + pc.y,
        fill: 'none', stroke: color, 'stroke-width': 2, 'stroke-dasharray': '2 5', 'stroke-linecap': 'round' }, capas.cables);
      R.cables.push({ el: p, comp: c.id });
    });

    // Tubos (con zona táctil ancha para elegir ruta tocándolos)
    (n.grifos || []).forEach(function (g) {
      R.rutas[g.id] = g.rutas.map(function (r, i) {
        var pts = puntosRuta(g, i), d = camino(pts);
        var gr = el('g', { class: 'tubo' }, capas.tubos), vap = g.lado === 'arriba';
        var lineal = { fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
        el('path', Object.assign({ d: d, stroke: '#3d1f10', 'stroke-opacity': 0.16, 'stroke-width': 15, transform: 'translate(2,4)' }, lineal), gr);
        el('path', Object.assign({ d: d, stroke: '#4a2a1c', 'stroke-width': 15.5 }, lineal), gr);
        el('path', Object.assign({ d: d, stroke: r.cristal ? '#c6f1ff' : (vap ? '#f1e8fd' : '#fdf6ec'), 'stroke-width': 10.5 }, lineal), gr);
        el('path', Object.assign({ class: 'canal', d: d, stroke: r.cristal ? '#8fdcf2' : (vap ? '#d6c4ef' : '#ead2b4'), 'stroke-width': 5.4, 'stroke-opacity': 0.85 }, lineal), gr);
        el('path', Object.assign({ d: d, stroke: '#fff', 'stroke-opacity': 0.95, 'stroke-width': 2, 'stroke-dasharray': r.cristal ? '5 7' : null, transform: 'translate(-2.4,-2.4)' }, lineal), gr);
        el('path', Object.assign({ d: d, stroke: '#7a4a2a', 'stroke-opacity': 0.18, 'stroke-width': 1.6, transform: 'translate(2.6,2.6)' }, lineal), gr);
        // Anillas de oro a lo largo de los tramos largos
        for (var q2 = 1; q2 < pts.length; q2++) {
          var a0 = pts[q2 - 1], a1 = pts[q2], lg = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]);
          if (lg < 70) continue;
          var hor = a0[1] === a1[1], mx = (a0[0] + a1[0]) / 2, my = (a0[1] + a1[1]) / 2;
          el('rect', { x: hor ? mx - 3 : mx - 9.5, y: hor ? my - 9.5 : my - 3, width: hor ? 6 : 19, height: hor ? 19 : 6, rx: 2.5, fill: hor ? 'url(#oroV)' : 'url(#oroH)', stroke: '#4a2a1c', 'stroke-width': 1.8 }, gr);
        }
        for (var q = 1; q < pts.length - 1; q++) {
          if (g.valvula && pts[q][0] === g.valvula[0] && pts[q][1] === g.valvula[1]) continue;
          var jn = el('g', { transform: 'translate(' + pts[q][0] + ',' + pts[q][1] + ')' }, gr);
          el('circle', { r: 8.6, fill: 'url(#oroBola)', stroke: '#4a2a1c', 'stroke-width': 2.2 }, jn);
          el('ellipse', { rx: 3, ry: 2, cx: -2.6, cy: -3, fill: '#fff', opacity: 0.85, transform: 'rotate(-30 -2.6 -3)' }, jn);
        }
        var fin = pts[pts.length - 1], dest = objetivo(r.a);
        // Boquilla de oro en forma de embudo
        el('path', { d: 'M' + (fin[0] - 9) + ',' + (fin[1] - 9) + ' L' + (fin[0] + 9) + ',' + (fin[1] - 9) + ' L' + (fin[0] + 5) + ',' + fin[1] + ' L' + (fin[0] - 5) + ',' + fin[1] + 'Z',
          fill: 'url(#oroH)', stroke: '#4a2a1c', 'stroke-width': 2.2, 'stroke-linejoin': 'round', transform: dest && dest.materia === 'V' ? 'rotate(180 ' + fin[0] + ' ' + (fin[1] - 4.5) + ')' : null }, gr);
        if (g.valvula) {
          var toque = el('path', { class: 'tubo-toque', d: d, fill: 'none', stroke: 'transparent', 'stroke-width': 24, 'stroke-linecap': 'round' }, gr);
          toque.addEventListener('click', function () { elegirRuta(g.id, i); });
        }
        return gr;
      });
    });

    (n.objetivos || []).forEach(construirObjetivo);
    (n.compuertas || []).forEach(construirCompuerta);
    n.vasijas.forEach(construirVasija);
    (n.grifos || []).forEach(construirGrifo);
  }

  function construirVasija(v) {
    var G = geom(v);
    var gr = el('g', { class: 'vasija', 'data-id': v.id, tabindex: 0, role: 'button' }, capas.vasijas);
    el('rect', { x: G.izq - 12, y: G.top - 18, width: G.w + 24, height: G.h + 28, fill: 'transparent' }, gr);
    el('ellipse', { class: 'sombra-vasija', cx: v.x, cy: v.y + (v.bascula ? 13 : 5), rx: G.w * 0.6, ry: 6, fill: '#3d1f10', opacity: 0.16 }, gr);
    if (v.forma === 'matraz') { // trípode de hierro: se queda en la mesa cuando se levanta el matraz
      el('path', { d: 'M' + (v.x - 17) + ',' + (v.y - 5) + ' L' + (v.x - 27) + ',' + (v.y + 8) + ' M' + (v.x + 17) + ',' + (v.y - 5) + ' L' + (v.x + 27) + ',' + (v.y + 8) + ' M' + v.x + ',' + (v.y - 2) + ' L' + v.x + ',' + (v.y + 8),
        stroke: '#4a2a1c', 'stroke-width': 4.2, 'stroke-linecap': 'round' }, gr);
      el('rect', { x: v.x - 24, y: v.y - 7, width: 48, height: 6, rx: 3, fill: 'url(#oroH)', stroke: '#4a2a1c', 'stroke-width': 1.8 }, gr);
    } else if (v.forma === 'frasco' && !v.bascula) { // peana de madera con filo de oro
      el('rect', { x: G.izq - 8, y: v.y - 1, width: G.w + 16, height: 9, rx: 4.5, fill: 'url(#madera)', stroke: '#4a2a1c', 'stroke-width': 2.2 }, gr);
      el('rect', { x: G.izq - 5, y: v.y - 0.5, width: G.w + 10, height: 2.4, rx: 1.2, fill: 'url(#oroH)', opacity: 0.95 }, gr);
    }
    if (v.forma === 'alambique') construirFuego(v, gr);
    var ref = { g: gr, capas: null };
    if (v.bascula) {
      el('rect', { x: v.x - 4.5, y: v.y + 9, width: 9, height: 10, fill: 'url(#oroH)', stroke: '#4a2a1c', 'stroke-width': 2 }, gr);
      el('rect', { x: G.izq - 11, y: v.y + 1, width: G.w + 22, height: 10, rx: 5, fill: 'url(#oroV)', stroke: '#4a2a1c', 'stroke-width': 2.2 }, gr);
      el('rect', { x: G.izq - 6, y: v.y + 2.5, width: G.w + 12, height: 2.2, rx: 1.1, fill: '#fff', opacity: 0.7 }, gr);
      var um = v.bascula.umbral, conPips = um <= 6, anchoB = conPips ? 30 + um * 13 : 64;
      ref.badgeRect = el('rect', { class: 'insignia', x: v.x - anchoB / 2, y: v.y + 19, width: anchoB, height: 22, rx: 11, stroke: '#5a3324', 'stroke-width': 2 }, gr);
      ref.badgeIc = el('text', { x: v.x - anchoB / 2 + 12, y: v.y + 35, 'text-anchor': 'middle', 'font-size': 13 }, gr); ref.badgeIc.textContent = '⚖';
      if (conPips) {
        ref.badgePips = [];
        for (var q = 0; q < um; q++) ref.badgePips.push(el('circle', { cx: v.x - anchoB / 2 + 28 + q * 13, cy: v.y + 30, r: 4.6, stroke: '#a8691c', 'stroke-width': 1.8 }, gr));
      } else ref.badgeTxt = el('text', { x: v.x + 8, y: v.y + 35, 'text-anchor': 'middle', 'font-family': 'Lilita One, sans-serif', 'font-size': 14 }, gr);
    }
    // Todo lo que se levanta al arrastrar va dentro de 'cuerpo'; la báscula y el fuego se quedan en su sitio
    var cu = el('g', { class: 'cuerpo' }, gr);
    cu.style.transformOrigin = v.x + 'px ' + (G.top + G.h / 2) + 'px';
    ref.cuerpo = cu;
    var forma0 = formaVasija(v, G, 0), recorte = 'url(#clip-' + v.id + ')';
    el('path', { d: forma0, fill: 'url(#vidrioFondo)' }, cu);
    var liq = el('g', { 'clip-path': recorte }, cu);
    ref.liq = liq;
    // El líquido va en su propio grupo: al inclinar el recipiente, este grupo gira al revés y la superficie queda horizontal
    var niv = el('g', { class: 'nivel-liquido' }, liq);
    niv.style.transformOrigin = v.x + 'px ' + (G.top + G.h / 2) + 'px';
    ref.nivel = niv;
    ref.contenido = el('g', {}, niv);
    ref.fantasma = el('g', {}, niv);
    // Medidas: una raya discontinua por cada medida que cabe y una marca en el lateral
    var baseY = v.y - 5, rayas = el('g', { 'pointer-events': 'none' }, liq);
    for (var k = 1; k < v.cap; k++) el('line', { x1: G.izq, x2: G.der, y1: baseY - k * G.u, y2: baseY - k * G.u, stroke: '#fff', 'stroke-opacity': 0.42, 'stroke-width': 1.1, 'stroke-dasharray': '3 4' }, rayas);
    for (var k2 = 1; k2 <= v.cap; k2++) el('line', { x1: G.der - 11, x2: G.der - 3, y1: baseY - k2 * G.u, y2: baseY - k2 * G.u, stroke: '#fff', 'stroke-opacity': 0.95, 'stroke-width': 2 }, rayas);
    // Reflejos del cristal: una franja larga y curvada, otra fina, el fondo grueso y un destello
    var ref1 = G.izq + 6, alto = Math.max(10, G.h - 26);
    el('path', { d: 'M' + ref1 + ',' + (G.top + 10) + ' Q' + (ref1 - 1.5) + ',' + (G.top + 10 + alto / 2) + ' ' + (ref1 + 1) + ',' + (G.top + 10 + alto) + ' L' + (ref1 + 6) + ',' + (G.top + 10 + alto) + ' Q' + (ref1 + 3.5) + ',' + (G.top + 10 + alto / 2) + ' ' + (ref1 + 5.5) + ',' + (G.top + 10) + 'Z',
      fill: '#fff', opacity: 0.62, 'clip-path': recorte, 'pointer-events': 'none' }, cu);
    el('rect', { x: ref1 + 9, y: G.top + 12, width: 2, height: Math.max(6, alto * 0.45), rx: 1, fill: '#fff', opacity: 0.4, 'clip-path': recorte, 'pointer-events': 'none' }, cu);
    el('rect', { x: G.der - 9.5, y: G.top + 10, width: 3, height: Math.max(6, G.h * 0.26), rx: 1.5, fill: '#fff', opacity: 0.42, 'clip-path': recorte, 'pointer-events': 'none' }, cu);
    if (v.forma === 'frasco' || v.forma === 'cuenco') el('path', { d: 'M' + (G.izq + 4) + ',' + (v.y - 4.5) + ' Q' + v.x + ',' + (v.y - 1) + ' ' + (G.der - 4) + ',' + (v.y - 4.5), fill: 'none', stroke: '#fff', 'stroke-opacity': 0.55, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'pointer-events': 'none' }, cu);
    el('path', { class: 'destello', d: 'M0,-5 L1.2,-1.2 5,0 1.2,1.2 0,5 -1.2,1.2 -5,0 -1.2,-1.2Z', fill: '#fff', transform: 'translate(' + (G.der - 13) + ',' + (G.top + 16) + ')', 'pointer-events': 'none', style: 'animation-delay:-' + ((v.x % 7) * 0.4).toFixed(1) + 's' }, cu);
    // Cristal grueso: borde oscuro y un filo claro por dentro
    el('path', { class: 'vidrio', d: forma0, fill: 'url(#vidrio)', stroke: '#4a2a1c', 'stroke-width': 3 }, cu);
    el('path', { d: formaVasija(v, G, 2.6), fill: 'none', stroke: '#fff', 'stroke-opacity': 0.7, 'stroke-width': 1.4, 'pointer-events': 'none' }, cu);
    if (v.forma === 'alambique') { // alambique de cobre con remaches
      el('path', { d: forma0, fill: 'none', stroke: 'url(#cobre)', 'stroke-width': 6, opacity: 0.95 }, cu);
      el('path', { d: forma0, fill: 'none', stroke: '#5a3324', 'stroke-width': 1.5 }, cu);
      el('rect', { x: G.izq - 6, y: G.top - 7, width: G.w + 12, height: 12, rx: 6, fill: 'url(#cobre)', stroke: '#5a3324', 'stroke-width': 2 }, cu);
      [-0.36, -0.12, 0.12, 0.36].forEach(function (f) { el('circle', { cx: v.x + f * G.w, cy: G.top - 1, r: 1.8, fill: '#ffd6b8', stroke: '#7a3a1a', 'stroke-width': 0.8 }, cu); });
    } else if (v.forma === 'capsula') { // termo de lujo: tapas de metal pulido arriba y abajo
      el('rect', { x: G.izq - 4, y: G.top - 7, width: G.w + 8, height: 17, rx: 7, fill: 'url(#metal)', stroke: '#4a2a1c', 'stroke-width': 2 }, cu);
      el('rect', { x: v.x - 8, y: G.top - 13, width: 16, height: 8, rx: 3, fill: 'url(#metal)', stroke: '#4a2a1c', 'stroke-width': 1.8 }, cu);
      el('rect', { x: G.izq - 4, y: v.y - 7, width: G.w + 8, height: 12, rx: 5, fill: 'url(#metal)', stroke: '#4a2a1c', 'stroke-width': 2 }, cu);
      el('path', { d: 'M' + (G.izq - 1) + ',' + (G.top + 2) + ' L' + (G.der + 1) + ',' + (G.top + 2), stroke: '#fff', 'stroke-opacity': 0.7, 'stroke-width': 1.4 }, cu);
    } else if (v.forma === 'matraz') { // boca del matraz
      el('rect', { x: v.x - 15, y: G.top - 7, width: 30, height: 10, rx: 5, fill: 'url(#oroH)', stroke: '#4a2a1c', 'stroke-width': 2.2 }, cu);
      el('rect', { x: v.x - 11, y: G.top - 5.5, width: 22, height: 2, rx: 1, fill: '#fff', opacity: 0.75 }, cu);
    } else { // frasco y cuenco: borde de latón con la boca a la vista
      el('rect', { x: G.izq - 6, y: G.top - 7, width: G.w + 12, height: 11, rx: 5.5, fill: 'url(#oroH)', stroke: '#4a2a1c', 'stroke-width': 2.4 }, cu);
      el('rect', { x: G.izq - 1, y: G.top - 5.5, width: G.w + 2, height: 2.2, rx: 1.1, fill: '#fff', opacity: 0.7 }, cu);
      el('ellipse', { cx: v.x, cy: G.top + 0.5, rx: G.w / 2 - 3, ry: 1.8, fill: '#4a2a1c', opacity: 0.35 }, cu);
    }
    // Sello de chocolate (se muestra u oculta)
    ref.sello = el('g', {}, cu);
    el('path', { d: 'M' + (G.izq - 7) + ',' + (G.top - 9) + ' Q' + v.x + ',' + (G.top - 24) + ' ' + (G.der + 7) + ',' + (G.top - 9) + ' L' + (G.der + 5) + ',' + (G.top + 8) +
      ' Q' + (G.der - 4) + ',' + (G.top + 20) + ' ' + (G.der - 10) + ',' + (G.top + 7) + ' Q' + (v.x + 6) + ',' + (G.top + 24) + ' ' + (v.x - 2) + ',' + (G.top + 7) +
      ' Q' + (G.izq + 8) + ',' + (G.top + 16) + ' ' + (G.izq - 5) + ',' + (G.top + 8) + 'Z', fill: '#6b3b22', stroke: '#3d1f10', 'stroke-width': 2.2 }, ref.sello);
    el('path', { d: 'M' + (G.izq + 2) + ',' + (G.top - 11) + ' Q' + (v.x - 4) + ',' + (G.top - 19) + ' ' + (v.x + 10) + ',' + (G.top - 16), fill: 'none', stroke: '#a8673f', 'stroke-width': 3, 'stroke-linecap': 'round' }, ref.sello);
    // Flecha que marca un destino válido mientras hay un recipiente elegido
    var fl = el('g', { class: 'flecha', transform: 'translate(' + v.x + ',' + (G.top - 26) + ')' }, cu);
    el('path', { class: 'flecha-in', d: 'M-9,-6 L0,4 L9,-6', fill: 'none', stroke: '#fff', 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, fl);
    if (v.nombre) {
      el('text', { x: v.x, y: v.y + (v.bascula ? 58 : (v.forma === 'alambique' ? 54 : 18)), 'text-anchor': 'middle', 'font-family': 'Nunito, sans-serif', 'font-weight': 900, 'font-size': 11, fill: '#6b3714' }, gr).textContent = v.nombre;
    }
    gr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tocarVasija(v.id); } });
    R.vas[v.id] = ref;
  }

  // Quemador del alambique: resplandor que late, brasas, llamas vivas y chispas que suben
  function construirFuego(v, padre) {
    var fz = el('g', { class: 'fuego', transform: 'translate(' + v.x + ',' + (v.y + 27) + ')', 'pointer-events': 'none' }, padre);
    el('ellipse', { class: 'fuego-resplandor', cx: 0, cy: -10, rx: 46, ry: 26, fill: 'url(#resplandor)' }, fz);
    var LLAMA = 'M0,0 C-9,-1 -11,-9 -7,-15 C-5,-11 -3,-11 -3,-14 C-3,-20 0,-24 2,-30 C4,-23 9,-19 9,-12 C11,-15 11,-17 10,-20 C14,-14 13,-4 8,-1 C5,0.6 3,0.8 0,0Z';
    [[-18, 0.9, 0], [18, 0.95, 0.23], [0, 1.2, 0.11]].forEach(function (f, i) {
      var g = el('g', { transform: 'translate(' + f[0] + ',0) scale(' + f[1] + ')' }, fz);
      var ext = el('path', { class: 'llama llama-ext', d: LLAMA, fill: 'url(#llamaExt)', stroke: '#b8240f', 'stroke-width': 1.4, 'stroke-linejoin': 'round' }, g);
      var med = el('path', { class: 'llama llama-med', d: LLAMA, fill: 'url(#llamaMed)', transform: 'translate(0,-1) scale(.66)' }, g);
      var nuc = el('path', { class: 'llama llama-nuc', d: LLAMA, fill: 'url(#llamaNucleo)', transform: 'translate(0,-1) scale(.34)' }, g);
      [ext, med, nuc].forEach(function (p, k) { p.style.animationDelay = (-(i * 0.17 + k * 0.09)).toFixed(2) + 's'; p.style.animationDuration = (0.52 + i * 0.07 + k * 0.05).toFixed(2) + 's'; });
    });
    // Quemador: cuenco de hierro con borde de oro y brasas encendidas
    el('path', { d: 'M-31,0 L31,0 L26,9 Q0,13 -26,9Z', fill: 'url(#hierro)', stroke: '#2a160e', 'stroke-width': 2, 'stroke-linejoin': 'round' }, fz);
    [[-18, 1.5], [-6, 3], [7, 2], [19, 1.2]].forEach(function (b, i) {
      el('ellipse', { class: 'brasa', cx: b[0], cy: b[1] + 1, rx: 6.5, ry: 3.2, fill: 'url(#brasa)', style: 'animation-delay:-' + (i * 0.35).toFixed(2) + 's' }, fz);
    });
    el('rect', { x: -34, y: -2.5, width: 68, height: 5.5, rx: 2.75, fill: 'url(#oroH)', stroke: '#4a2a1c', 'stroke-width': 1.8 }, fz);
    for (var c = 0; c < 4; c++) el('circle', { class: 'chispa-fuego', cx: -14 + c * 9, cy: -6, r: 1.4 + (c % 2) * 0.6, fill: c % 2 ? '#fff1a8' : '#ffb52e', style: 'animation-delay:-' + (c * 0.37).toFixed(2) + 's' }, fz);
  }

  function construirObjetivo(o) {
    var r = radio(o);
    var gr = el('g', { class: 'objetivo', 'data-id': o.id, tabindex: 0, role: 'button' }, capas.objetivos);
    el('circle', { class: 'halo', cx: o.x, cy: o.y, r: r * 1.55, fill: 'url(#halo)' }, gr);
    if (o.tipo === 'turbina') {
      el('rect', { x: o.x - 3, y: o.y, width: 6, height: r, fill: '#e3a83b', stroke: '#5a3324', 'stroke-width': 2 }, gr);
      var aspa = el('g', { class: 'giro img-dormida' }, gr);
      for (var k = 0; k < 4; k++) {
        el('path', { d: 'M' + o.x + ',' + o.y + ' Q' + (o.x + r * 0.15) + ',' + (o.y - r * 0.95) + ' ' + (o.x + r * 0.85) + ',' + (o.y - r * 0.75) + ' Q' + (o.x + r * 0.55) + ',' + (o.y - r * 0.2) + ' ' + o.x + ',' + o.y + 'Z',
          fill: k % 2 ? '#fff6ea' : '#f2607d', stroke: '#5a3324', 'stroke-width': 2.2, 'stroke-linejoin': 'round', transform: 'rotate(' + (k * 90) + ' ' + o.x + ' ' + o.y + ')' }, aspa);
      }
      el('circle', { cx: o.x, cy: o.y, r: 6, fill: '#ffd877', stroke: '#5a3324', 'stroke-width': 2 }, aspa);
    } else {
      var bota = el('g', { class: 'bota' }, gr);
      el('ellipse', { cx: o.x, cy: o.y + r * 0.92, rx: r * 0.9, ry: r * 0.22, fill: '#5a3324', opacity: 0.18 }, bota);
      el('image', { class: 'img-dormida', href: 'assets/' + o.img + '.png', x: o.x - r, y: o.y - r, width: 2 * r, height: 2 * r }, bota);
    }
    var tur = o.tipo === 'turbina', ancho = o.necesita * 14;
    var x0 = tur ? o.x + r + 14 : o.x - ancho / 2 + 7, py = tur ? o.y - (o.necesita - 1) * 7 : o.y + r + 14;
    el('rect', { x: x0 - 10, y: py - 10, width: tur ? 20 : ancho + 6, height: tur ? o.necesita * 14 + 6 : 20, rx: 10, fill: '#fff6ea', stroke: '#5a3324', 'stroke-width': 1.8 }, gr);
    var pips = [], sab = sabores(o);
    for (var i = 0; i < o.necesita; i++) {
      pips.push(el('circle', { cx: tur ? x0 : x0 + i * 14, cy: tur ? py + i * 14 - 3 : py, r: 5.2, stroke: COLOR[sab[i]].sombra, 'stroke-width': 2 }, gr));
    }
    var icg = el('g', { transform: 'translate(' + (o.x + r * 0.72) + ',' + (o.y - r * 0.72) + ')' }, gr);
    if (o.pide) { // un icono por sabor, montados uno sobre otro
      Object.keys(o.pide).forEach(function (k, j, ks) {
        var ig = el('g', { transform: 'translate(' + (j * 15 - (ks.length - 1) * 7.5 + 4) + ',' + (j * 4 - 2) + ')' }, icg);
        el('circle', { r: 10, fill: COLOR[k].base, stroke: '#5a3324', 'stroke-width': 2 }, ig);
        el('path', { 'fill-rule': 'evenodd', d: ICONO[k], fill: '#fff', transform: 'scale(.85)' }, ig);
      });
    } else {
      el('circle', { r: 11, fill: COLOR[o.materia].base, stroke: '#5a3324', 'stroke-width': 2 }, icg);
      el('path', { 'fill-rule': 'evenodd', d: ICONO[o.materia], fill: '#fff', transform: 'scale(.95)' }, icg);
    }
    var di = function () { explicaObjetivo(o); };
    gr.addEventListener('click', di);
    gr.addEventListener('keydown', function (e) { if (e.key === 'Enter') di(); });
    R.obj[o.id] = { g: gr, pips: pips, icono: icg, vivo: null };
  }

  function construirCompuerta(c) {
    var p = posCompuerta(c);
    var pos = el('g', { 'data-id': c.id, transform: 'translate(' + p.x + ',' + p.y + ')' }, capas.compuertas);
    var cerr = el('g', {}, pos), abie = el('g', {}, pos);
    var rot = Math.abs(Math.cos(p.ang)) > 0.5 ? 0 : 90;
    if (c.tipo === 'chocolate') {
      el('path', { d: 'M-12,-9 Q0,-16 12,-9 L13,8 Q4,15 -3,9 Q-9,14 -13,7Z', fill: '#6b3b22', stroke: '#3d1f10', 'stroke-width': 2 }, cerr);
      el('path', { d: 'M-6,-8 L-6,6 M2,-10 L2,7 M-12,-1 L12,-1', stroke: '#8b5534', 'stroke-width': 1.6 }, cerr);
    } else if (c.tipo === 'regaliz') {
      el('rect', { x: -15, y: -8, width: 30, height: 16, rx: 8, fill: '#fff6ea', stroke: '#5a3324', 'stroke-width': 2, 'stroke-dasharray': '3 3', transform: 'rotate(' + rot + ')' }, cerr);
      el('path', { d: 'M0,5 L0,-2 M0,-1 C-5,-2 -6,-7 -5,-8 C-1,-8 0,-4 0,-1 M0,-2 C4,-4 6,-8 6,-9 C2,-9 0,-6 0,-2', fill: '#86c443', stroke: '#558c22', 'stroke-width': 1.4 }, cerr);
      el('rect', { x: -15, y: -7, width: 30, height: 14, rx: 7, fill: '#d8323f', stroke: '#5a3324', 'stroke-width': 2, transform: 'rotate(' + rot + ')' }, abie);
      el('path', { d: 'M-10,-6 L-6,6 M-3,-6 L1,6 M4,-6 L8,6', stroke: '#ff8a93', 'stroke-width': 2, transform: 'rotate(' + rot + ')' }, abie);
    } else {
      el('rect', { x: -14, y: -11, width: 28, height: 28, rx: 8, fill: '#3d1f10', opacity: 0.18 }, cerr);
      el('rect', { x: -14, y: -14, width: 28, height: 28, rx: 8, fill: c.tipo === 'puente' ? 'url(#oroV)' : 'url(#caramelo)', stroke: '#4a2a1c', 'stroke-width': 2.4 }, cerr);
      el('rect', { x: -10, y: -11, width: 12, height: 3, rx: 1.5, fill: '#fff', opacity: 0.75 }, cerr);
      if (c.tipo === 'puente') el('text', { y: 6, 'text-anchor': 'middle', 'font-size': 15, fill: '#5a3324' }, cerr).textContent = '⚖';
      else el('path', { d: 'M0,-8 L2.4,-2.6 8,-2.2 3.7,1.5 5,7 0,4 -5,7 -3.7,1.5 -8,-2.2 -2.4,-2.6Z', fill: '#fff' }, cerr);
      el('circle', { r: 12, fill: '#6cc24a', stroke: '#4a2a1c', 'stroke-width': 2.2 }, abie);
      el('ellipse', { rx: 4, ry: 2.2, cx: -3.5, cy: -5, fill: '#fff', opacity: 0.6 }, abie);
      el('path', { d: 'M-5,0 L-1.5,4 L5.5,-4', fill: 'none', stroke: '#fff', 'stroke-width': 2.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, abie);
    }
    R.comp[c.id] = { cerr: cerr, abie: abie, abierta: null };
  }

  function construirGrifo(g) {
    var sp = salidaGrifo(g), lado = g.sale === 'izq' ? -1 : 1, arriba = g.lado === 'arriba';
    var cano = el('g', {}, capas.grifos);
    el('path', { d: 'M' + sp.base[0] + ',' + sp.base[1] + ' L' + sp.p[0] + ',' + sp.p[1], stroke: '#4a2a1c', 'stroke-width': 14, 'stroke-linecap': 'round' }, cano);
    el('path', { d: 'M' + sp.base[0] + ',' + sp.base[1] + ' L' + sp.p[0] + ',' + sp.p[1], stroke: arriba ? 'url(#oroH)' : 'url(#oroV)', 'stroke-width': 9, 'stroke-linecap': 'round' }, cano);
    var gr = el('g', { class: 'grifo', 'data-id': g.id, tabindex: 0, role: 'button', 'aria-label': T(arriba ? 'chimenea_aria' : 'grifo_aria', vars(nombreVasija(vasija(g.de)))) }, capas.grifos);
    var kx = sp.p[0] + (arriba ? 0 : lado * 2), ky = sp.p[1] + (arriba ? -2 : 0);
    var per = el('g', { transform: 'translate(' + kx + ',' + ky + ')' }, gr);
    el('circle', { r: 19, fill: 'transparent' }, per);
    // Si la válvula queda pegada a la llave, ambas se reducen lo justo para no montarse
    var juntas = g.valvula ? Math.hypot(g.valvula[0] - kx, g.valvula[1] - ky) : 99, esc = Math.min(1, Math.max(0.72, (juntas - 2) / 24.5));
    var bot = el('g', { class: 'perilla' }, el('g', { transform: esc < 1 ? 'scale(' + esc.toFixed(2) + ')' : null }, per));
    // Llave: aro de oro, cuatro pétalos de caramelo glaseado y el icono en el centro
    el('circle', { r: 12, fill: '#3d1f10', opacity: 0.18, cy: 2.2 }, bot);
    el('circle', { r: 11, fill: 'url(#oroBola)', stroke: '#4a2a1c', 'stroke-width': 2 }, bot);
    var petalos = el('g', { class: 'petalos' }, bot);
    for (var pk = 0; pk < 4; pk++) el('ellipse', { rx: 4.6, ry: 7.2, cy: -5.2, fill: arriba ? 'url(#lila)' : 'url(#caramelo)', stroke: '#4a2a1c', 'stroke-width': 1.8, transform: 'rotate(' + (45 + pk * 90) + ')' }, petalos);
    el('circle', { r: 6.6, fill: arriba ? 'url(#lila)' : 'url(#caramelo)', stroke: '#4a2a1c', 'stroke-width': 1.9 }, bot);
    el('ellipse', { rx: 2.8, ry: 1.6, cx: -2.2, cy: -3, fill: '#fff', opacity: 0.85, transform: 'rotate(-30 -2.4 -3.4)' }, bot);
    el('path', { d: arriba ? ICONO.V : 'M0,-3.9 C1.6,-1.6 2.7,0 2.7,1.2 A2.7,2.7 0 0 1 -2.7,1.2 C-2.7,0 -1.6,-1.6 0,-3.9Z', fill: '#fff', transform: arriba ? 'scale(.48)' : 'translate(0,0.6)' }, bot);
    if (J.n.id <= 3) etiqueta(kx, ky + 27, T(arriba ? 'chimenea' : 'grifo'));
    if (g.valvula && J.n.id <= 3) etiqueta(g.valvula[0], g.valvula[1] - 22, T('valvula'));
    gr.addEventListener('click', function (e) { e.stopPropagation(); abrir(g.id); });
    gr.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(g.id); } });
    if (g.valvula) {
      var vv = el('g', { class: 'valvula', 'data-id': 'v-' + g.id, tabindex: 0, role: 'button', transform: 'translate(' + g.valvula[0] + ',' + g.valvula[1] + ')' + (esc < 1 ? ' scale(' + esc.toFixed(2) + ')' : '') }, capas.grifos);
      el('circle', { r: 20, fill: 'transparent' }, vv);
      el('circle', { r: 13, fill: '#3d1f10', opacity: 0.18, cy: 2.2 }, vv);
      el('circle', { r: 12.5, fill: 'url(#oroBola)', stroke: '#4a2a1c', 'stroke-width': 2.2 }, vv);
      el('circle', { r: 8.6, fill: '#fff6dc', stroke: '#4a2a1c', 'stroke-width': 1.5 }, vv);
      for (var rk = 0; rk < 6; rk++) el('path', { d: 'M0,-8.6 L0,-11.6', stroke: '#4a2a1c', 'stroke-width': 1.6, transform: 'rotate(' + (rk * 60) + ')' }, vv);
      var rotor = el('g', { class: 'rotor' }, vv);
      el('path', { d: 'M-5,-4.6 L9.5,0 L-5,4.6 Q-3,0 -5,-4.6Z', fill: 'url(#caramelo)', stroke: '#4a2a1c', 'stroke-width': 1.9, 'stroke-linejoin': 'round' }, rotor);
      el('circle', { r: 3.3, fill: 'url(#oroBola)', stroke: '#4a2a1c', 'stroke-width': 1.4 }, vv);
      vv.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); girarValvula(g.id); } });
      R.valv[g.id] = { g: vv, rotor: rotor, ang: null };
    }
  }

  // Rótulo pequeño sobre el tablero (sólo en los primeros niveles, para aprender los nombres)
  function etiqueta(x, y, txt) {
    el('text', { class: 'rotulo', x: x, y: y, 'text-anchor': 'middle', 'pointer-events': 'none' }, capas.grifos).textContent = txt;
  }

  // Ajusta el encuadre al contenido del nivel para aprovechar toda la mesa
  function encuadrar() {
    var b = { x1: 1e9, y1: 1e9, x2: -1e9, y2: -1e9 };
    ['cables', 'tubos', 'objetivos', 'compuertas', 'vasijas', 'grifos'].forEach(function (k) {
      var bb = capas[k].getBBox(); if (!bb.width && !bb.height) return;
      b.x1 = Math.min(b.x1, bb.x); b.y1 = Math.min(b.y1, bb.y); b.x2 = Math.max(b.x2, bb.x + bb.width); b.y2 = Math.max(b.y2, bb.y + bb.height);
    });
    var m = 16, y1 = b.y1 - m - 14;
    SVG.setAttribute('viewBox', [b.x1 - m, y1, b.x2 - b.x1 + 2 * m, b.y2 - y1 + m].join(' '));
  }

  // ───────────────────────── Actualización incremental ─────────────────────────
  function dibujarCapas(v, lista, cont, desde) {
    vaciar(cont);
    var G = geom(v), baseY = v.y - 5, grupos = [], X = G.izq - 36, W = G.w + 72;
    var nuevas = desde !== undefined ? lista.length - desde : 0, dl = duracionLlenado;
    lista.forEach(function (m, i) {
      var y = baseY - (i + 1) * G.u, col = COLOR[m];
      var cg = el('g', {}, cont);
      el('rect', { x: X, y: y, width: W, height: G.u + 0.8, fill: 'url(#gm-' + m + ')' }, cg);
      if (i > 0 && lista[i - 1] !== m) el('rect', { x: X, y: y + G.u - 1, width: W, height: 1.6, fill: COLOR[lista[i - 1]].sombra, opacity: 0.45 }, cg);
      if (m === 'V') el('circle', { class: 'burbuja-vapor', cx: v.x - 8 + (i % 2) * 14, cy: y + G.u / 2, r: 2.4, fill: '#fff', style: 'animation-delay:' + (i * 0.3) + 's' }, cg);
      if (i === lista.length - 1 || lista[i + 1] !== m) {
        el('rect', { x: X, y: y, width: W, height: 3.6, fill: col.luz, opacity: 0.95 }, cg);
        if (i === lista.length - 1) el('rect', { x: X, y: y - 0.4, width: W, height: 1.2, fill: '#fff', opacity: 0.7 }, cg);
      }
      el('path', { 'fill-rule': 'evenodd', d: ICONO[m], fill: m === 'V' ? '#9c7fd0' : '#fff', 'fill-opacity': 0.85, stroke: 'rgba(0,0,0,.16)', transform: 'translate(' + v.x + ',' + (y + G.u / 2) + ') scale(' + (G.u / 27) + ')' }, cg);
      if (desde !== undefined && i >= desde) {
        cg.setAttribute('class', 'capa-nueva');
        if (dl) { var paso = dl / Math.max(1, nuevas); cg.style.animationDuration = paso + 'ms'; cg.style.animationDelay = ((i - desde) * paso) + 'ms'; cg.style.animationTimingFunction = 'linear'; }
        else cg.style.animationDelay = ((i - desde) * 0.05) + 's';
      }
      grupos.push(cg);
    });
    return grupos;
  }
  function empiezaCon(a, b) { if (b.length > a.length) return false; for (var i = 0; i < b.length; i++) if (a[i] !== b[i]) return false; return true; }
  function terminaCon(a, b) { if (b.length > a.length) return false; var d = a.length - b.length; for (var i = 0; i < b.length; i++) if (a[d + i] !== b[i]) return false; return true; }

  function actualizarVasija(v, s, animar) {
    var ref = R.vas[v.id], antes = ref.capas, ahora = s.v[v.id];
    if (!antes || antes.join('') !== ahora.join('')) {
      var G = geom(v);
      if (!animar || !antes || reducido) dibujarCapas(v, ahora, ref.contenido);
      else if (empiezaCon(ahora, antes)) dibujarCapas(v, ahora, ref.contenido, antes.length); // entra por arriba
      else if (empiezaCon(antes, ahora)) { // sale por arriba: la parte que se va se encoge
        dibujarCapas(v, ahora, ref.contenido);
        var idas = dibujarCapas(v, antes, ref.fantasma).slice(ahora.length);
        dibujarCapas(v, [], ref.fantasma);
        var fg = el('g', {}, ref.fantasma);
        idas.forEach(function (x) { fg.appendChild(x); });
        fg.style.transformBox = 'fill-box'; fg.style.transformOrigin = '50% 100%';
        fg.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: duracionLlenado || 260, easing: duracionLlenado ? 'linear' : 'ease-in', fill: 'forwards' })
          .onfinish = function () { vaciar(ref.fantasma); };
      } else if (terminaCon(antes, ahora)) { // sale por el fondo: lo de arriba baja
        dibujarCapas(v, ahora, ref.contenido);
        var k = antes.length - ahora.length;
        ref.contenido.animate([{ transform: 'translateY(' + (-k * G.u) + 'px)' }, { transform: 'translateY(0)' }], { duration: Math.max(320, duracionLlenado || 0), easing: 'cubic-bezier(.5,0,.4,1.3)' });
      } else { // reacción o reordenación: aparecen las capas que cambian
        var desde = 0; while (desde < antes.length && desde < ahora.length && antes[desde] === ahora[desde]) desde++;
        dibujarCapas(v, ahora, ref.contenido, desde);
      }
      ref.capas = ahora.slice();
    }
    ref.sello.style.display = s.sello[v.id] ? '' : 'none';
    if (v.bascula) {
      var activa = M.basculaActiva(J.n, s, v.id);
      var pesoAhora = M.peso(ahora), um2 = v.bascula.umbral;
      ref.badgeRect.setAttribute('fill', activa ? '#6cc24a' : '#fff6ea');
      if (ref.badgePips) ref.badgePips.forEach(function (c, q) {
        c.setAttribute('fill', q < pesoAhora ? (activa ? '#fff' : '#e3a83b') : '#fff');
        c.setAttribute('stroke', activa ? '#3f8e26' : '#a8691c');
      });
      else { ref.badgeTxt.setAttribute('fill', activa ? '#fff' : '#5a3324'); ref.badgeTxt.textContent = pesoAhora + '/' + um2; }
      if (animar && ref.pesoVisto !== undefined && ref.pesoVisto !== pesoAhora && !reducido) {
        ref.badgeRect.style.transformBox = 'fill-box'; ref.badgeRect.style.transformOrigin = 'center';
        ref.badgeRect.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)', offset: 0.4 }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
      }
      ref.pesoVisto = pesoAhora;
    }
    ref.g.setAttribute('aria-label', nombreVasija(v) + ': ' + (ahora.length ? ahora.map(matNombre).join(', ') : T('vacio')) + '. ' + T('capacidad', { n: v.cap }));
  }

  function actualizarSeleccion() {
    if (!R) return;
    J.n.vasijas.forEach(function (v) {
      var g = R.vas[v.id].g, apto = false, elegido = J.sel === v.id;
      if (J.sel !== null && !elegido) apto = M.trasvasar(J.n, J.s, J.sel, v.id).ok;
      g.classList.toggle('sel', elegido);
      g.classList.toggle('apto', apto);
      g.classList.toggle('no-apto', J.sel !== null && !elegido && !apto);
    });
  }

  function actualizarValvula(gid) {
    var rv = R.valv[gid]; if (!rv) return;
    var g = M.index(J.n).grifo[gid], pts = puntosRuta(g, J.valv[gid]), idx = 0;
    for (var k = 0; k < pts.length; k++) if (pts[k][0] === g.valvula[0] && pts[k][1] === g.valvula[1]) { idx = k; break; }
    var sig = pts[idx + 1] || pts[idx];
    var ang = Math.atan2(sig[1] - g.valvula[1], sig[0] - g.valvula[0]) * 180 / Math.PI;
    if (rv.ang !== null) { while (ang - rv.ang > 180) ang -= 360; while (ang - rv.ang < -180) ang += 360; }
    rv.ang = ang;
    rv.rotor.style.transform = 'rotate(' + ang + 'deg)';
    rv.g.setAttribute('aria-label', T('valvula_aria', { d: nombreDestino(g.rutas[J.valv[gid]].a) }));
    R.rutas[gid].forEach(function (tg, i) { tg.classList.toggle('tubo-inactivo', J.valv[gid] !== i); });
  }

  function actualizar(prev, animar) {
    var s = J.s, n = J.n;
    n.vasijas.forEach(function (v) { actualizarVasija(v, s, animar); });
    actualizarSeleccion();
    (n.grifos || []).forEach(function (g) { if (g.valvula) actualizarValvula(g.id); });
    (n.compuertas || []).forEach(function (c) {
      var rc = R.comp[c.id], ab = M.compuertaAbierta(n, s, c.id);
      if (rc.abierta === ab) return;
      rc.cerr.style.display = ab ? 'none' : '';
      rc.abie.style.display = ab ? '' : 'none';
      if (animar && rc.abierta !== null && !reducido) {
        (ab ? rc.abie : rc.cerr).animate([{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.15)', opacity: 1, offset: 0.7 }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out' });
      }
      rc.abierta = ab;
    });
    R.cables.forEach(function (c) { c.el.setAttribute('opacity', M.compuertaAbierta(n, s, c.comp) ? 0.22 : 0.6); });
    (n.objetivos || []).forEach(function (o) {
      var ro = R.obj[o.id], vivo = !!s.hecho[o.id];
      var sab = sabores(o), visto = {};
      ro.pips.forEach(function (p, i) { var k = sab[i]; visto[k] = (visto[k] || 0) + 1; var lleno = o.pide ? visto[k] <= s.tiene[o.id][k] : i < s.tiene[o.id]; p.setAttribute('fill', lleno ? COLOR[k].base : '#fff'); });
      if (ro.vivo !== vivo) { ro.g.classList.toggle('vivo', vivo); ro.icono.style.display = vivo ? 'none' : ''; ro.vivo = vivo; }
      ro.g.setAttribute('aria-label', T('objetivo_aria', { o: nombreObj(o), a: M.recibido(o, s), b: o.necesita, m: o.pide ? listaSabores(o) : matNombre(o.materia) }));
    });
    $('t-movs').querySelector('span').textContent = J.max ? J.movs + '/' + J.max : J.movs;
    $('t-movs').classList.toggle('pocos', !!J.max && J.max - J.movs <= 2 && !J.fin);
    $('t-dominio').querySelector('span').textContent = '≤ ' + J.limite;
    $('t-dominio').classList.toggle('pasado', J.movs > J.limite);
    pintarObjetivos();
  }

  function nombreVasija(v) {
    if (v.nombre) {
      var nm = IDIOMA === 'en' && EN[J.n.id].nombres[v.id] ? EN[J.n.id].nombres[v.id] : v.nombre;
      return IDIOMA === 'en' ? 'the ' + nm : 'la ' + nm.toLowerCase();
    }
    var mismos = J.n.vasijas.filter(function (x) { return x.forma === v.forma && !x.nombre; });
    var base = IDIOMA === 'en' ? 'the ' + T('f_' + v.forma) : (v.forma === 'capsula' ? 'la ' : 'el ') + T('f_' + v.forma);
    if (mismos.length < 2) return base;
    var orden = mismos.slice().sort(function (a, b) { return a.x - b.x || a.y - b.y; });
    var i = orden.indexOf(v);
    var pos = orden.length === 2 ? (i === 0 ? T('pos_izq') : T('pos_der')) : (i === 0 ? T('pos_izq') : i === orden.length - 1 ? T('pos_der') : T('pos_centro'));
    return base + ' ' + pos;
  }
  function de(t) { return IDIOMA === 'en' ? 'of ' + t : (t.indexOf('el ') === 0 ? 'del ' + t.slice(3) : 'de ' + t); }
  function a_(t) { return IDIOMA === 'en' ? 'to ' + t : (t.indexOf('el ') === 0 ? 'al ' + t.slice(3) : 'a ' + t); }
  function nombreDestino(id) {
    var v = vasija(id); if (v) return nombreVasija(v);
    return nombreObj(objetivo(id)).replace(/^El /, 'el ').replace(/^La /, 'la ').replace(/^The /, 'the ');
  }
  function vars(o, d) { return { o: o, d: d || '', de_o: de(o), a_d: d ? a_(d) : '' }; }
  // Mensaje del motor en el idioma activo
  function motivoTexto(res) {
    var tpl = TX.MOTOR[IDIOMA][res.codigo];
    if (!tpl) return res.motivo;
    var dt = res.datos || {};
    return tpl.replace('{o}', dt.obj ? nombreObj(objetivo(dt.obj)) : '').replace('{m}', dt.m ? matNombre(dt.m) : '');
  }

  // ───────────────────────── Interacción: tocar y arrastrar ─────────────────────────
  var arrastre = null;
  function puntoSVG(cx, cy) {
    var pt = SVG.createSVGPoint(); pt.x = cx; pt.y = cy;
    return pt.matrixTransform(SVG.getScreenCTM().inverse());
  }
  function vasijaBajo(cx, cy) {
    var e = document.elementFromPoint(cx, cy), v = e && e.closest ? e.closest('.vasija') : null;
    return v ? v.getAttribute('data-id') : null;
  }
  function puedeSerOrigen(id) { var v = vasija(id); return v.forma !== 'capsula' && J.s.v[id].length > 0; }
  function activo() { return J && !J.fin && $('dialogo').hidden && $('modal').hidden; }

  function centroCuerpo(id) { var v = vasija(id), G = geom(v); return { x: v.x, y: G.top + G.h / 2 }; }
  // Devuelve un recipiente a su sitio con un pequeño rebote
  function volverACasa(id) {
    var ref = R && R.vas[id], c = ref && ref.cuerpo; if (!c) return;
    var desde = c.style.transform, nd = ref.nivel.style.transform;
    c.classList.remove('arrastrado'); c.style.pointerEvents = '';
    c.style.transform = ''; ref.nivel.style.transform = '';
    if (desde && !reducido) {
      c.animate([{ transform: desde }, { transform: 'translate(0,0) rotate(0deg) scale(1)' }], { duration: 380, easing: 'cubic-bezier(.3,1.5,.5,1)' });
      if (nd) ref.nivel.animate([{ transform: nd }, { transform: 'rotate(0deg)' }], { duration: 380, easing: 'cubic-bezier(.3,1.5,.5,1)' });
      setTimeout(function () { chapoteo(ref); }, 380);
    }
  }
  // Pequeño vaivén de la superficie del líquido al frenar
  function chapoteo(ref) {
    if (reducido || !ref || !ref.nivel) return;
    ref.nivel.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(6deg)', offset: 0.25 }, { transform: 'rotate(-3.5deg)', offset: 0.55 }, { transform: 'rotate(1.5deg)', offset: 0.8 }, { transform: 'rotate(0deg)' }], { duration: 900, easing: 'ease-out' });
  }
  function anguloRuta(g, i) {
    var pts = puntosRuta(g, i), k = 0;
    for (var q = 0; q < pts.length; q++) if (pts[q][0] === g.valvula[0] && pts[q][1] === g.valvula[1]) { k = q; break; }
    var s = pts[k + 1] || pts[k];
    return Math.atan2(s[1] - g.valvula[1], s[0] - g.valvula[0]);
  }

  $('mesa').addEventListener('pointerdown', function (e) {
    if (!activo() || !SVG) return;
    J.ultimaAccion = Date.now();
    var vv = e.target.closest && e.target.closest('.valvula');
    if (vv) { arrastre = { valv: vv.getAttribute('data-id').slice(2), x: e.clientX, y: e.clientY, pid: e.pointerId, movido: false }; return; }
    var g = e.target.closest && e.target.closest('.vasija');
    if (!g) return;
    arrastre = { id: g.getAttribute('data-id'), x: e.clientX, y: e.clientY, pid: e.pointerId, movido: false, sobre: null, ang: 0 };
  });
  window.addEventListener('pointermove', function (e) {
    if (!arrastre || e.pointerId !== arrastre.pid) return;
    var a = arrastre;
    // Válvula: se gira arrastrando alrededor de ella
    if (a.valv) {
      if (!a.movido && Math.hypot(e.clientX - a.x, e.clientY - a.y) < 10) return;
      a.movido = true;
      var gv = M.index(J.n).grifo[a.valv], p0 = puntoSVG(e.clientX, e.clientY);
      var ang = Math.atan2(p0.y - gv.valvula[1], p0.x - gv.valvula[0]), mejor = J.valv[a.valv], dmin = 9;
      gv.rutas.forEach(function (_, i) { var d = Math.abs(Math.atan2(Math.sin(ang - anguloRuta(gv, i)), Math.cos(ang - anguloRuta(gv, i)))); if (d < dmin) { dmin = d; mejor = i; } });
      if (mejor !== J.valv[a.valv]) elegirRuta(a.valv, mejor);
      return;
    }
    if (!a.movido) {
      if (Math.hypot(e.clientX - a.x, e.clientY - a.y) < 8) return;
      if (!puedeSerOrigen(a.id)) {
        var vr = vasija(a.id); arrastre = null;
        rechazar(vr.forma === 'capsula' ? T('capsula_sin_boca') : T('vacio_origen'), [a.id]);
        return;
      }
      a.movido = true;
      a.inicio = puntoSVG(a.x, a.y); a.ultX = a.inicio.x;
      J.sel = a.id; actualizarSeleccion(); SON.coger();
      var c0 = R.vas[a.id].cuerpo; c0.classList.add('arrastrado'); c0.style.pointerEvents = 'none';
    }
    var p = puntoSVG(e.clientX, e.clientY), dx = p.x - a.inicio.x, dy = p.y - a.inicio.y;
    var sobre = vasijaBajo(e.clientX, e.clientY);
    if (sobre === a.id) sobre = null;
    var objetivoAng = Math.max(-14, Math.min(14, (p.x - a.ultX) * 2.2));
    if (sobre && R.vas[sobre].g.classList.contains('apto')) objetivoAng = vasija(sobre).x >= centroCuerpo(a.id).x + dx ? 32 : -32;
    a.ang += (objetivoAng - a.ang) * 0.35; a.ultX = p.x; a.dx = dx; a.dy = dy;
    R.vas[a.id].cuerpo.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + (dy - 12).toFixed(1) + 'px) rotate(' + a.ang.toFixed(1) + 'deg) scale(1.06)';
    R.vas[a.id].nivel.style.transform = 'rotate(' + (-a.ang * 0.85).toFixed(1) + 'deg)';
    if (sobre !== a.sobre) {
      if (a.sobre) R.vas[a.sobre].g.classList.remove('sobre');
      if (sobre) { R.vas[sobre].g.classList.add('sobre'); if (R.vas[sobre].g.classList.contains('apto')) SON.burbuja(); }
      a.sobre = sobre;
    }
  });
  function terminarArrastre(e, cancelado) {
    if (!arrastre || (e && e.pointerId !== arrastre.pid)) return;
    var a = arrastre; arrastre = null;
    if (a.valv) { if (!a.movido && !cancelado) girarValvula(a.valv); return; }
    if (a.sobre) R.vas[a.sobre].g.classList.remove('sobre');
    if (cancelado) { if (a.movido) { volverACasa(a.id); J.sel = null; actualizarSeleccion(); } return; }
    if (!a.movido) { tocarVasija(a.id); return; }
    J.sel = null; actualizarSeleccion();
    if (a.sobre) { ejecutar({ t: 'v', a: a.id, b: a.sobre }); return; }
    // Soltado sobre una dona: se explica cómo se alimentan
    var bajo = document.elementFromPoint(e.clientX, e.clientY), ob = bajo && bajo.closest && bajo.closest('.objetivo');
    if (ob) avisar(T('donas_tubos'), 'zappy');
    SON.soltar(); volverACasa(a.id);
  }
  window.addEventListener('pointerup', function (e) { terminarArrastre(e, false); });
  window.addEventListener('pointercancel', function (e) { terminarArrastre(e, true); });

  function tocarVasija(id) {
    if (!activo()) return;
    var v = vasija(id);
    if (J.sel === null) {
      if (v.forma === 'capsula') { rechazar(T('capsula_sin_boca'), [id]); return; }
      if (!J.s.v[id].length) { rechazar(T('vacio_origen'), [id]); return; }
      J.sel = id; SON.toque(); actualizarSeleccion();
      return;
    }
    if (J.sel === id) { J.sel = null; actualizarSeleccion(); return; }
    var origen = J.sel; J.sel = null; actualizarSeleccion();
    ejecutar({ t: 'v', a: origen, b: id });
  }
  function abrir(idGrifo) {
    if (!activo()) return;
    if (J.sel !== null) { J.sel = null; actualizarSeleccion(); }
    var gg = SVG && SVG.querySelector('.grifo[data-id="' + idGrifo + '"]');
    if (gg) { gg.classList.add('abriendo'); setTimeout(function () { gg.classList.remove('abriendo'); }, 700); }
    ejecutar({ t: 'g', g: idGrifo, r: null });
  }
  function girarValvula(idGrifo) {
    if (!activo()) return;
    var g = M.index(J.n).grifo[idGrifo];
    J.valv[idGrifo] = (J.valv[idGrifo] + 1) % g.rutas.length;
    SON.valvula(); actualizarValvula(idGrifo);
    comprobarGuiaValvula();
  }
  function elegirRuta(idGrifo, i) {
    if (!activo() || J.valv[idGrifo] === i) return;
    J.valv[idGrifo] = i; SON.valvula(); actualizarValvula(idGrifo);
    comprobarGuiaValvula();
  }
  function rechazar(msg, foco) {
    SON.error(); avisar(msg, 'zippy');
    if (J && ++J.errores % 3 === 1) frase('uy');
    (foco || []).forEach(function (id) {
      anillo(id, '#f2607d', false);
      var e = vasija(id) && R.vas[id].g;
      if (e) { e.classList.remove('temblor'); void e.getBoundingClientRect(); e.classList.add('temblor'); setTimeout(function () { e.classList.remove('temblor'); }, 420); }
    });
  }

  // Ejecuta una acción; si hay una animación en curso, la deja en cola y la hace al terminar
  function ejecutar(acc) {
    if (J.ocupado) { if (J.pendiente && J.pendiente.t === 'v' && J.pendiente.a !== acc.a) volverACasa(J.pendiente.a); J.pendiente = acc; return; }
    J.ultimaAccion = Date.now();
    if (acc.t === 'g' && acc.r === null) acc = { t: 'g', g: acc.g, r: J.valv[acc.g] || 0 };
    var bloqueo = guiaBloquea(acc);
    if (bloqueo) { J.pendiente = null; if (acc.t === 'v') volverACasa(acc.a); rechazar(bloqueo, (pasoGuia() || {}).foco); return; }
    var res = M.aplicar(J.n, J.s, acc);
    if (!res.ok) { if (acc.t === 'v') volverACasa(acc.a); rechazar(motivoTexto(res), res.foco); return siguientePendiente(); }
    var pasoEra = pasoGuia();
    J.ocupado = true;
    if (!pasoEra) enfocar([]);
    quitarPista();
    callarAviso();
    var previo = J.s;
    J.hist.push({ s: J.s, movs: J.movs, trasvases: J.trasvases, tocados: Object.assign({}, J.tocados) });
    J.movs++;
    if (acc.t === 'v') { J.trasvases++; J.tocados[acc.a] = true; J.tocados[acc.b] = true; }
    else { var gg = M.index(J.n).grifo[acc.g]; J.tocados[gg.de] = true; J.tocados[gg.rutas[acc.r].a] = true; }
    var ev0 = res.ev[0];
    var nivel = J.n, aplicado = false;
    var aplicarEstado = function (dur) {
      if (aplicado || !J || J.n !== nivel) return;
      aplicado = true; J.s = res.estado;
      duracionLlenado = dur || null; actualizar(previo, true); duracionLlenado = null;
    };
    var anim = acc.t === 'v' ? animarVertido(acc.a, acc.b, ev0.m, res.ev, aplicarEstado) : animarFlujo(acc.g, acc.r, ev0.m, ev0.n, res.ev, aplicarEstado);
    anim.then(function () {
      if (!J || J.n !== nivel) return;
      aplicarEstado();
      return efectos(res.ev);
    }).then(function () {
      if (!J || J.n !== nivel) return;
      J.ocupado = false;
      if (acc.t === 'v' && !prog.logros.primer_trasvase) revisarLogros({ trasvase: true });
      if (M.ganado(J.n, J.s)) { J.pendiente = null; if (J.guia) terminarGuia(); victoria(); return; }
      if (pasoEra && pasoEra.espera && pasoGuia() === pasoEra) avanzarGuia();
      if (comprobarDerrota()) { J.pendiente = null; return; }
      siguientePendiente();
    });
  }
  function siguientePendiente() {
    if (J && J.pendiente && !J.ocupado) { var p = J.pendiente; J.pendiente = null; ejecutar(p); }
  }

  function texto(x, y, t, color) {
    var pt = SVG.createSVGPoint(); pt.x = x; pt.y = y;
    var r = pt.matrixTransform(SVG.getScreenCTM()), e = document.querySelector('.escenario').getBoundingClientRect();
    var d = document.createElement('div');
    d.className = 'chispa'; d.textContent = t; d.style.left = (r.x - e.left) + 'px'; d.style.top = (r.y - e.top) + 'px'; if (color) d.style.color = color;
    document.querySelector('.escenario').appendChild(d);
    setTimeout(function () { d.remove(); }, 1200);
  }
  function espera(ms) { return new Promise(function (ok) { setTimeout(ok, ms); }); }

  function animarVertido(a, b, m, ev, alVerter) {
    if (ev.some(function (e) { return e.k === 'funde'; })) setTimeout(SON.funde, 420);
    if (reducido) { SON.vierte(); volverACasa(a); if (alVerter) alVerter(); return Promise.resolve(); }
    var va = vasija(a), vb = vasija(b), ga = geom(va), gb = geom(vb), ref = R.vas[a], c = ref.cuerpo, niv = ref.nivel;
    var desde = c.style.transform || 'translate(0px,-12px) rotate(0deg) scale(1)', ndesde = niv.style.transform || 'rotate(0deg)';
    c.style.transform = ''; niv.style.transform = ''; c.classList.remove('arrastrado'); c.style.pointerEvents = 'none';
    var O = centroCuerpo(a), lado = vb.x >= O.x ? -1 : 1, ang = lado === -1 ? 102 : -102, rad = ang * Math.PI / 180, S = 1.04;
    // Se coloca de forma que el labio de la boca quede justo encima de la boca del destino
    var bx = (va.x - lado * (va.forma === 'matraz' ? 11 : ga.w / 2) - O.x) * S, by = (ga.top - O.y) * S;
    var lx = bx * Math.cos(rad) - by * Math.sin(rad), ly = bx * Math.sin(rad) + by * Math.cos(rad);
    var Lx = vb.x + lado * 3, Ly = gb.top - 26, tx = Lx - O.x - lx, ty = Ly - O.y - ly;
    var unid = (ev[0] && ev[0].n) || 1;
    var t1 = 320, t2 = 280, t3 = 260 + 120 * Math.min(4, unid), t4 = 460, total = t1 + t2 + t3 + t4;
    var mover = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px)';
    var arco = 'translate(' + (tx * 0.5).toFixed(1) + 'px,' + (Math.min(ty, 0) * 0.5 - 30).toFixed(1) + 'px)';
    var o = function (t) { return t / total; };
    c.animate([
      { transform: desde, offset: 0 },
      { transform: arco + ' rotate(' + (ang * 0.04).toFixed(1) + 'deg) scale(1.05)', offset: o(t1 * 0.5), easing: 'ease-in-out' },
      { transform: mover + ' rotate(' + (ang * 0.12).toFixed(1) + 'deg) scale(' + S + ')', offset: o(t1), easing: 'cubic-bezier(.45,0,.3,1)' },
      { transform: mover + ' rotate(' + ang + 'deg) scale(' + S + ')', offset: o(t1 + t2) },
      { transform: mover + ' rotate(' + (ang * 1.04).toFixed(1) + 'deg) scale(' + S + ')', offset: o(t1 + t2 + t3), easing: 'cubic-bezier(.3,1.35,.5,1)' },
      { transform: 'translate(0px,0px) rotate(0deg) scale(1)', offset: 1 }
    ], { duration: total }).onfinish = function () { c.style.pointerEvents = ''; };
    // El líquido se mantiene horizontal; con un poco de inercia al empezar a inclinarse
    var nv = function (deg) { return 'rotate(' + (-deg).toFixed(1) + 'deg)'; }, sg = ang > 0 ? 1 : -1;
    niv.animate([
      { transform: ndesde, offset: 0 },
      { transform: nv(ang * 0.04), offset: o(t1 * 0.5) },
      { transform: nv(ang * 0.12 - 7 * sg), offset: o(t1) },
      { transform: nv(ang + 5 * sg), offset: o(t1 + t2) },
      { transform: nv(ang * 1.04), offset: o(t1 + t2 + t3) },
      { transform: 'rotate(0deg)', offset: 1 }
    ], { duration: total, easing: 'ease-in-out' });
    setTimeout(function () { chapoteo(ref); }, total);
    // Chorro: cae del labio con una curva natural hasta la superficie del líquido de destino
    var col = COLOR[m || 'C'], antes = J.s.v[b].length, sup = Math.max(gb.top + 6, vb.y - 5 - antes * gb.u);
    var x2 = vb.x + lado * 1.5, d = 'M' + Lx.toFixed(1) + ',' + Ly.toFixed(1) + ' C' + (Lx - lado * 3).toFixed(1) + ',' + (Ly + 12) + ' ' + x2.toFixed(1) + ',' + (Ly + 20) + ' ' + x2.toFixed(1) + ',' + sup.toFixed(1);
    var caer = 130, vida = t3 + 170;
    setTimeout(function () {
      if (!SVG) return;
      SON.vierte();
      var gch = el('g', { 'pointer-events': 'none' }, capas.fx);
      var borde = el('path', { d: d, fill: 'none', stroke: col.sombra, 'stroke-width': 8.5, 'stroke-linecap': 'round' }, gch);
      var med = el('path', { d: d, fill: 'none', stroke: col.base, 'stroke-width': 6.2, 'stroke-linecap': 'round' }, gch);
      var luz = el('path', { class: 'chorro-brillo', d: d, fill: 'none', stroke: col.luz, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-dasharray': '8 7', opacity: 0 }, gch);
      var Lc = med.getTotalLength();
      [borde, med].forEach(function (q, k) {
        q.style.strokeDasharray = Lc + ' ' + Lc;
        q.animate([{ strokeDashoffset: Lc }, { strokeDashoffset: 0, offset: caer / vida }, { strokeDashoffset: 0, offset: 0.76 }, { strokeDashoffset: -Lc }], { duration: vida, fill: 'forwards', easing: 'ease-in' });
        q.animate([{ strokeWidth: k ? 6.2 : 8.5 }, { strokeWidth: k ? 6.2 : 8.5, offset: 0.55 }, { strokeWidth: k ? 2.5 : 4 }], { duration: vida, fill: 'forwards' });
      });
      luz.animate([{ opacity: 0 }, { opacity: 0, offset: caer / vida }, { opacity: 1, offset: 0.3 }, { opacity: 1, offset: 0.72 }, { opacity: 0 }], { duration: vida, fill: 'forwards' });
      setTimeout(function () { gch.remove(); }, vida + 40);
      setTimeout(function () {
        if (alVerter) alVerter(Math.max(240, t3 - 80));
        onda(x2, sup, col.luz, gb.w); salpicar(x2, sup, col.base, 3);
      }, caer);
      setTimeout(function () { onda(x2, sup, col.luz, gb.w); }, caer + t3 * 0.5);
    }, t1 + t2 - 50);
    return espera(t1 + t2 + t3 + 40);
  }
  // Onda que se abre en la superficie donde cae el chorro
  function onda(x, y, color, ancho) {
    if (reducido || !SVG) return;
    var e = el('ellipse', { cx: x, cy: y + 1, rx: 3, ry: 1.2, fill: 'none', stroke: color, 'stroke-width': 2, opacity: 0.9, 'pointer-events': 'none' }, capas.fx);
    e.animate([{ rx: 3, ry: 1.2, opacity: 0.9 }, { rx: ancho * 0.42, ry: 3.4, opacity: 0 }], { duration: 520, easing: 'ease-out', fill: 'forwards' });
    setTimeout(e.remove.bind(e), 560);
  }
  // Gotitas que saltan al caer la materia en un recipiente
  function salpicar(x, y, color, cuantas) {
    if (reducido) return;
    for (var i = 0; i < (cuantas || 5); i++) {
      var g = el('circle', { cx: x, cy: y, r: 2.4 + Math.random() * 1.6, fill: color, stroke: '#5a3324', 'stroke-width': 0.8, 'pointer-events': 'none' }, capas.fx);
      var dx = (Math.random() - 0.5) * 34, dy = -10 - Math.random() * 16;
      g.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: 'translate(' + dx + 'px,' + dy + 'px)', opacity: 1, offset: 0.45 }, { transform: 'translate(' + (dx * 1.3) + 'px,' + (dy + 22) + 'px)', opacity: 0 }], { duration: 520, easing: 'ease-out', fill: 'forwards' });
      setTimeout(g.remove.bind(g), 540);
    }
  }
  // Burbujas que suben dentro del líquido al cambiar
  function burbujear(id) {
    if (reducido || !R.vas[id]) return;
    var v = vasija(id), G = geom(v), n = J.s.v[id].length; if (!n) return;
    var alto = n * G.u;
    for (var i = 0; i < 5; i++) {
      var b = el('circle', { cx: G.izq + 8 + Math.random() * (G.w - 16), cy: v.y - 8, r: 1.6 + Math.random() * 2, fill: '#fff', opacity: 0.85, 'pointer-events': 'none' }, R.vas[id].liq);
      b.animate([{ transform: 'translateY(0)', opacity: 0.9 }, { transform: 'translateY(' + (-alto + 6) + 'px)', opacity: 0 }], { duration: 700 + Math.random() * 500, delay: i * 90, easing: 'ease-in', fill: 'forwards' });
      setTimeout(b.remove.bind(b), 1400 + i * 90);
    }
  }

  function animarFlujo(idG, ri, m, n, ev, alLlegar) {
    if (reducido) { if (alLlegar) alLlegar(); return Promise.resolve(); }
    var g = M.index(J.n).grifo[idG], pts = puntosRuta(g, ri), d = camino(pts), L = largo(pts), vapor = m === 'V', col = COLOR[m];
    var dur = Math.max(440, Math.min(950, L * 1.7));
    SON.fluye(dur / 1000 + 0.45);
    var gast = ev[0].gastado || 0, parada = null;
    (g.rutas[ri].compuertas || []).forEach(function (cid) { var c = M.index(J.n).comp[cid]; if (c.tipo === 'chocolate' && gast && parada === null) parada = c.en; });
    var hasta = (parada !== null && !n) ? parada : 1, llegada = dur * 0.72, vida = dur * 1.45;
    var gr = el('g', { 'pointer-events': 'none' }, capas.tubos);
    var base = el('path', { d: d, fill: 'none', stroke: vapor ? '#f6f0ff' : col.base, 'stroke-width': 5.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, gr);
    var luz = el('path', { class: vapor ? 'flujo-vapor' : 'flujo-brillo', d: d, fill: 'none', stroke: vapor ? '#ffffff' : col.luz, 'stroke-width': vapor ? 3.4 : 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': vapor ? '2 9' : '7 9', opacity: 0 }, gr);
    var cabeza = el('circle', { r: 4.4, fill: vapor ? '#fff' : col.luz, stroke: vapor ? '#c8b6ea' : col.sombra, 'stroke-width': 1.4 }, gr);
    base.style.strokeDasharray = L + ' ' + L;
    base.animate([{ strokeDashoffset: L }, { strokeDashoffset: L * (1 - hasta), offset: llegada / vida }, { strokeDashoffset: L * (1 - hasta), offset: 0.7 }, { strokeDashoffset: -L * hasta }], { duration: vida, fill: 'forwards', easing: 'linear' });
    luz.animate([{ opacity: 0 }, { opacity: 0, offset: llegada / vida }, { opacity: 0.9, offset: (llegada / vida) + 0.06 }, { opacity: 0.9, offset: 0.7 }, { opacity: 0 }], { duration: vida, fill: 'forwards' });
    setTimeout(function () { gr.remove(); }, vida + 60);
    return new Promise(function (ok) {
      var t0 = performance.now(), listo = false;
      function fin() { if (listo) return; listo = true; ok(); }
      setTimeout(function () { if (alLlegar) alLlegar(dur * 0.5); }, llegada + 20);
      setTimeout(fin, llegada + 170);
      function paso(t) {
        var k = Math.min(1, (t - t0) / llegada), pos = puntoEn(pts, k * hasta);
        cabeza.setAttribute('cx', pos.x.toFixed(1)); cabeza.setAttribute('cy', pos.y.toFixed(1));
        if (k < 1 && !listo) requestAnimationFrame(paso); else cabeza.remove();
      }
      requestAnimationFrame(paso);
    });
  }

  function efectos(ev) {
    var cadena = Promise.resolve();
    var e0 = ev[0];
    if (e0 && e0.k === 'vierte') burbujear(e0.a);
    if (e0 && e0.k === 'fluye' && vasija(e0.a)) { burbujear(e0.a); var vd = vasija(e0.a), gd = geom(vd), sp0 = Math.max(gd.top + 6, vd.y - 5 - J.s.v[e0.a].length * gd.u); onda(vd.x, sp0, COLOR[e0.m].luz, gd.w); salpicar(vd.x, sp0, COLOR[e0.m].base, 3); }
    ev.forEach(function (e) {
      if (e.k === 'abre') cadena = cadena.then(function () { var c = M.index(J.n).comp[e.id]; if (c.tipo === 'regaliz') SON.regaliz(); else SON.abre(); return espera(60); });
      if (e.k === 'reacciona') cadena = cadena.then(function () {
        SON.vapor(); var v = vasija(e.id), G = geom(v);
        puff(v.x, G.top + 10, '#ffffff'); texto(v.x, G.top - 10, T('vapor'), '#f4eefc'); prog.cont.vapor++; guardar();
        return espera(120);
      });
      else if (e.k === 'funde') cadena = cadena.then(function () {
        var v = vasija(e.id), p;
        if (v) { var G = geom(v); p = { x: v.x, y: G.top - 8 }; } else p = posCompuerta(M.index(J.n).comp[e.id]);
        puff(p.x, p.y, '#8b5534'); texto(p.x, p.y - 14, T('fundido'), '#c98a5b'); prog.cont.fundidos++; guardar();
        return espera(100);
      });
      else if (e.k === 'restaurado') cadena = cadena.then(function () {
        var final = M.ganado(J.n, J.s), o = objetivo(e.id);
        if (!final) SON.restaura();
        estallido(o.x, o.y, COLOR[o.materia].base); texto(o.x, o.y - radio(o) - 6, T('restaurado'));
        if (!J.guia && !final) frase(['genial', 'bien_hecho', 'desperto'][Math.floor(Math.random() * 3)]);
        revisarLogros({ restaurado: true });
        var go = R.obj[e.id].g; go.style.transformBox = 'fill-box'; go.style.transformOrigin = 'center';
        if (!reducido) go.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.22) rotate(-6deg)', offset: 0.35 }, { transform: 'scale(.94) rotate(3deg)', offset: 0.65 }, { transform: 'scale(1)' }], { duration: 650, easing: 'ease-out' });
        return espera(220);
      });
    });
    return cadena;
  }
  function puff(x, y, color) {
    if (reducido) return;
    for (var i = 0; i < 6; i++) {
      var c = el('circle', { cx: x, cy: y, r: 5 + Math.random() * 5, fill: color, stroke: '#5a3324', 'stroke-width': 1.2, 'pointer-events': 'none' }, capas.fx);
      var dx = (Math.random() - 0.5) * 50, dy = -10 - Math.random() * 30;
      c.animate([{ transform: 'translate(0,0) scale(.5)', opacity: 1 }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1.3)', opacity: 0 }], { duration: 600, easing: 'ease-out', fill: 'forwards' });
      setTimeout(c.remove.bind(c), 620);
    }
  }
  function estallido(x, y, color) {
    if (reducido) return;
    for (var i = 0; i < 12; i++) {
      var a = i / 12 * Math.PI * 2, rr = 50 + Math.random() * 30;
      var st = el('path', { d: 'M0,-6 L1.8,-1.8 6,-1.5 2.8,1.2 3.8,6 0,3.2 -3.8,6 -2.8,1.2 -6,-1.5 -1.8,-1.8Z', fill: i % 2 ? '#ffd877' : color, stroke: '#5a3324', 'stroke-width': 1, 'pointer-events': 'none' }, capas.fx);
      st.animate([{ transform: 'translate(' + x + 'px,' + y + 'px) scale(.3)', opacity: 1 }, { transform: 'translate(' + (x + Math.cos(a) * rr) + 'px,' + (y + Math.sin(a) * rr) + 'px) scale(1.2) rotate(180deg)', opacity: 0 }], { duration: 800, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards' });
      setTimeout(st.remove.bind(st), 820);
    }
  }

  // ───────────────────────── Reiniciar ─────────────────────────
  function reiniciar() {
    if (!J || J.ocupado || J.guia) return;
    if (partidaEmpezada()) {
      confirmarVida(T('reiniciar_t'), T('reiniciar_vida'), T('si_reiniciar'), function () {
        gastarVida(); J.perdio = true;
        if (vidas() <= 0) { abrirMapa(); ventanaSinVidas(); return; }
        reiniciarYa();
      });
      return;
    }
    reiniciarYa();
  }
  function reiniciarYa() {
    if (!J) return;
    J.reinicios++; J.s = J.s0; J.movs = 0; J.hist = []; J.trasvases = 0; J.tocados = {}; J.sel = null; J.fin = false; J.pendiente = null; J.callejonAvisado = null;
    J.ultimaAccion = Date.now();
    (J.n.grifos || []).forEach(function (g) { J.valv[g.id] = 0; });
    callarAviso(); enfocar([]); quitarPista();
    SON.funde(); actualizar(null, true);
  }

  // En cuanto el tablero ya no tiene solución, o no alcanzan los movimientos, la partida se pierde con un aviso claro
  function revisarCallejon() { if (J && !J.ocupado) comprobarDerrota(); }
  function comprobarDerrota() {
    if (!J || J.fin || J.guia || M.ganado(J.n, J.s)) return false;
    var d = J.dist ? J.dist.get(M.clave(J.s)) : null;
    if (J.dist && d === undefined) { perder('callejon'); return true; }
    if (J.max) {
      var quedan = J.max - J.movs;
      if (quedan <= 0) { perder('movs'); return true; }
      if (d !== null && d > quedan) { perder('faltan', { a: quedan, b: d }); return true; }
    }
    return false;
  }
  function perder(motivo, datos) {
    J.fin = true; J.perdio = true; J.sel = null;
    if (!J.n.libre) gastarVida();
    var partida = J;
    callarAviso(); quitarPista(); $('t-movs').classList.remove('pocos');
    setTimeout(function () {
      if (J !== partida || !$('modal').hidden) return;
      SON.error(); frase('perder', true);
      var titulo = T(motivo === 'callejon' ? 'pierde_t_callejon' : 'pierde_t_movs');
      var texto = T(motivo === 'callejon' ? 'pierde_callejon' : motivo === 'faltan' ? 'pierde_faltan' : 'pierde_movs', datos);
      var quedan = vidas();
      abrirModal('<div class="derrota"><img src="assets/grumble.png" alt=""><div><small>' + T('pierde_sub') + '</small><h2>' + titulo + '</h2></div></div>' +
        '<p class="sub">' + texto + '</p>' +
        (J.n.libre ? '' : '<p class="vidas-derrota">' + CORAZON_SVG + T(quedan ? 'pierde_vida' : 'pierde_ultima', { n: quedan }) + '</p>') +
        '<div class="acciones"><button class="btn" id="b-d-reintentar">' + T('reintentar') + '</button></div>' +
        '<p class="consejo-derrota">' + T('pierde_consejo') + '</p>' +
        '<div class="acciones"><button class="enlace" id="b-d-mapa">' + T('v_mapa') + '</button></div>', function (m) {
        m.querySelector('#b-d-reintentar').addEventListener('click', function () {
          SON.toque(); cerrarModal();
          if (!J.n.libre && vidas() <= 0) { ventanaSinVidas(function () { J.fin = false; reiniciarYa(); }); return; }
          J.fin = false; reiniciarYa();
        });
        m.querySelector('#b-d-mapa').addEventListener('click', function () { SON.toque(); cerrarModal(); abrirMapa(); });
      });
    }, 650);
  }

  // ───────────────────────── Pistas (3 niveles de ayuda) ─────────────────────────
  function zona(id) {
    var ix = M.index(J.n);
    if (ix.vas[id]) { var v = ix.vas[id], G = geom(v); return { x: v.x, y: G.top + G.h / 2, r: Math.max(G.w, G.h) / 2 + 12 }; }
    if (ix.obj[id]) { var o = ix.obj[id]; return { x: o.x, y: o.y, r: radio(o) + 10 }; }
    if (ix.comp[id]) { var p = posCompuerta(ix.comp[id]); return { x: p.x, y: p.y, r: 22 }; }
    if (id.indexOf('v-') === 0) { var gv = ix.grifo[id.slice(2)]; return { x: gv.valvula[0], y: gv.valvula[1], r: 22 }; }
    if (ix.grifo[id]) { var sp = salidaGrifo(ix.grifo[id]).p; return { x: sp[0], y: sp[1], r: 21 }; }
    return null;
  }
  function anillo(id, color, fijo) {
    var z = zona(id); if (!z) return;
    var c = el('circle', { class: fijo ? 'foco-pista' : '', cx: z.x, cy: z.y, r: z.r, fill: 'none', stroke: color, 'stroke-width': 4, 'stroke-dasharray': '7 6', 'pointer-events': 'none' }, capas.fx);
    c.setAttribute('data-anillo', fijo ? 'foco' : 'aviso');
    if (!fijo) { c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, fill: 'forwards' }); setTimeout(c.remove.bind(c), 920); }
  }
  function enfocar(ids) {
    if (!SVG) return;
    SVG.querySelectorAll('[data-anillo="foco"]').forEach(function (e) { e.remove(); });
    ids.forEach(function (id) { anillo(id, '#ffffff', true); });
  }
  // Mejor movimiento desde el estado actual: instantáneo con el análisis, búsqueda directa si aún no está
  function siguienteAccion() {
    if (J.dist) {
      var d = J.dist.get(M.clave(J.s));
      if (d === undefined || d === 0) return null;
      var mejor = null;
      M.acciones(J.n).forEach(function (a) {
        if (mejor && !(mejor.t === 'g' && J.valv[mejor.g] !== mejor.r)) return;
        var r = M.aplicar(J.n, J.s, a);
        if (r.ok && J.dist.get(M.clave(r.estado)) === d - 1) {
          if (!mejor || (a.t === 'v') || (a.t === 'g' && J.valv[a.g] === a.r)) mejor = a;
        }
      });
      return mejor;
    }
    var sol = M.resolver(J.n, J.s, 60000);
    return sol && sol.length ? sol[0] : null;
  }
  var pistaFx = null;
  function quitarPista() {
    if (pistaFx) { pistaFx.remove(); pistaFx = null; }
    if (SVG) SVG.querySelectorAll('.ruta-pista').forEach(function (e) { e.classList.remove('ruta-pista'); });
  }
  // Flecha curva que va de un recipiente a otro, con una bolita que recorre el gesto
  function flechaPista(a, b) {
    var va = vasija(a), vb = vasija(b), ga = geom(va), gb = geom(vb);
    var x1 = va.x, y1 = ga.top - 16, x2 = vb.x, y2 = gb.top - 20, cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - 52;
    // Si uno está casi encima del otro, la flecha da un rodeo por el lado con más sitio para no cruzar el frasco
    if (Math.abs(x2 - x1) < 60) { cx = x1 + (x1 > 180 ? -95 : 95); cy = (y1 + y2) / 2 - 10; }
    var d = 'M' + x1 + ',' + y1 + ' Q' + cx + ',' + cy + ' ' + x2 + ',' + y2;
    el('path', { d: d, fill: 'none', stroke: '#5a3324', 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-opacity': 0.3 }, pistaFx);
    el('path', { class: 'flecha-pista', d: d, fill: 'none', stroke: '#fff', 'stroke-width': 5.5, 'stroke-linecap': 'round', 'stroke-dasharray': '1 11' }, pistaFx);
    var ang = Math.atan2(y2 - cy, x2 - cx) * 180 / Math.PI;
    var h = el('g', { transform: 'translate(' + x2 + ',' + y2 + ') rotate(' + ang.toFixed(1) + ')' }, pistaFx);
    el('path', { d: 'M-13,-10 L5,0 L-13,10 L-8,0Z', fill: '#fff', stroke: '#5a3324', 'stroke-width': 2.4, 'stroke-linejoin': 'round' }, h);
    var bola = el('circle', { r: 7.5, fill: '#ffd34d', stroke: '#5a3324', 'stroke-width': 2.2 }, pistaFx);
    el('animateMotion', { dur: '1.5s', repeatCount: 'indefinite', path: d, keyPoints: '0;1;1', keyTimes: '0;0.75;1', calcMode: 'linear' }, bola);
  }
  // Dedo que «toca» un punto (grifo o válvula)
  function dedoPista(x, y) {
    var g = el('g', { class: 'dedo-pista', transform: 'translate(' + (x + 10) + ',' + (y + 12) + ')' }, pistaFx);
    el('path', { d: 'M0,0 L0,-16 Q0,-20 4,-20 Q8,-20 8,-16 L8,-6 L14,-5 Q19,-4 19,1 L18,11 Q17,16 12,16 L4,16 Q0,16 -2,12 L-7,4 Q-9,0 -5,-1 Q-2,-2 0,2Z',
      fill: '#fff6ea', stroke: '#5a3324', 'stroke-width': 2.2, 'stroke-linejoin': 'round' }, g);
  }
  function pista() {
    if (!activo() || J.guia || J.ocupado) return;
    $('b-pista').classList.remove('pulso');
    J.ultimaAccion = Date.now();
    var acc = siguienteAccion();
    if (!acc) { if (!comprobarDerrota()) perder('callejon'); return; }
    var clave = M.clave(J.s);
    J.pistas++;
    // Segunda pista seguida en el mismo tablero: Grumble hace el movimiento
    if (J.tramoPista && J.tramoPista.clave === clave) {
      J.tramoPista = null; quitarPista(); enfocar([]);
      avisar(T('p_hago'), 'grumble'); hacerPista(acc);
      return;
    }
    J.tramoPista = { clave: clave };
    quitarPista(); enfocar([]);
    pistaFx = el('g', { class: 'pista-fx', 'pointer-events': 'none' }, capas.fx);
    if (acc.t === 'v') {
      flechaPista(acc.a, acc.b);
      enfocar([acc.a, acc.b]);
      avisar(T('pista_v', vars(nombreVasija(vasija(acc.a)), nombreVasija(vasija(acc.b)))) + ' ' + T('pista_mas'), 'zappy', 9000);
      return;
    }
    var g = M.index(J.n).grifo[acc.g], dest = g.rutas[acc.r].a, girar = g.valvula && J.valv[acc.g] !== acc.r, arriba = g.lado === 'arriba';
    var v2 = vars(nombreVasija(vasija(g.de)), nombreDestino(dest));
    v2.que = T(arriba ? 'la_chimenea' : 'el_grifo');
    R.rutas[acc.g][acc.r].classList.add('ruta-pista');
    var sp = salidaGrifo(g).p;
    if (girar) {
      dedoPista(g.valvula[0], g.valvula[1]);
      enfocar(['v-' + acc.g, acc.g]);
      avisar(T('pista_gv', v2) + ' ' + T('pista_mas'), 'zappy', 9000);
    } else {
      dedoPista(sp[0], sp[1]);
      enfocar([acc.g]);
      avisar(T('pista_g', v2) + ' ' + T('pista_mas'), 'zappy', 9000);
    }
  }
  function hacerPista(acc) {
    J.tramoPista = null;
    if (acc.t === 'g' && J.valv[acc.g] !== acc.r) { J.valv[acc.g] = acc.r; SON.valvula(); actualizarValvula(acc.g); }
    setTimeout(function () { if (activo()) ejecutar(acc); }, 350);
  }

  // Si el jugador lleva un rato sin hacer nada, Zappy ofrece ayuda (una vez por nivel)
  setInterval(function () {
    if (!J || J.fin || J.ocupado || J.guia || J.ayudaDada || $('pantalla-nivel').hidden || !$('dialogo').hidden || !$('modal').hidden) return;
    if (Date.now() - J.ultimaAccion > 25000) {
      J.ayudaDada = true;
      avisar(T('atascado'), 'zappy'); frase('ayuda', true);
      $('b-pista').classList.add('pulso');
    }
  }, 2000);

  // ───────────────────────── Guía paso a paso ─────────────────────────
  function pasoGuia() { return J && J.guia ? J.n.guia[J.guia.i] : null; }
  function iniciarGuia() {
    if (!J || !J.n.guia || !J.n.guia.length) return;
    J.guia = { i: -1 }; J.conGuia = true;
    avanzarGuia();
  }
  function avanzarGuia() {
    if (!J || !J.guia) return;
    J.guia.i++;
    var p = J.n.guia[J.guia.i];
    if (!p) { terminarGuia(); return; }
    // Un paso de válvula ya cumplido se salta solo
    if (p.espera && p.espera.t === 'valv' && J.valv[p.espera.g] === p.espera.r) { anotar(p.nota); avanzarGuia(); return; }
    var nueva = anotar(p.nota);
    mostrarPaso(nueva);
    decir('n' + J.n.id + '_guia_' + J.guia.i);
    callarAviso();
    enfocar(p.foco || []);
  }
  // Pinta el paso actual (también al cambiar de idioma)
  function mostrarPaso(notaNueva) {
    var i = J.guia.i, p = J.n.guia[i], tx = TN(J.n).guia[i];
    $('guia-img').src = RETRATO[p.q]; $('guia-nombre').textContent = persNombre(p.q);
    $('guia-paso').textContent = T('paso', { a: i + 1, b: J.n.guia.length });
    $('guia-texto').textContent = tx.t;
    $('guia-sig').hidden = !!p.espera;
    $('guia-turno').hidden = !p.espera;
    if (notaNueva !== undefined) {
      $('guia-nota').hidden = !notaNueva;
      if (notaNueva) $('guia-nota-txt').textContent = T('anotado', { t: notaNueva });
    }
    $('guia').hidden = false;
    var gl = document.querySelector('.guia-globo'); gl.style.animation = 'none'; void gl.offsetWidth; gl.style.animation = '';
  }
  function terminarGuia() {
    if (!J) return;
    J.guia = null;
    callarVoz();
    $('guia').hidden = true;
    enfocar([]);
    prog.guias[J.n.id] = true; guardar();
  }
  function comprobarGuiaValvula() {
    var p = pasoGuia();
    if (p && p.espera && p.espera.t === 'valv' && J.valv[p.espera.g] === p.espera.r) { SON.toque(); avanzarGuia(); }
  }
  // Durante la guía sólo se permite la acción que pide el paso actual
  function guiaBloquea(acc) {
    var p = pasoGuia(); if (!p) return null;
    var e = p.espera;
    if (!e) return T('g_siguiente');
    if (e.t === 'valv') return T('g_valvula');
    if (e.t === 'v') return (acc.t === 'v' && acc.a === e.a && acc.b === e.b) ? null : T('g_trasvase');
    if (e.t === 'g') {
      if (acc.t !== 'g' || acc.g !== e.g) return T('g_grifo');
      if (e.r !== undefined && acc.r !== e.r) return T('g_ruta');
    }
    return null;
  }
  // Guarda una nota en el cuaderno; devuelve su título si es nueva
  function anotar(id) {
    if (!id || prog.notas[id]) return null;
    prog.notas[id] = Date.now(); guardar();
    $('b-leyenda').classList.add('con-nota');
    var n = TX.NOTAS.filter(function (x) { return x[0] === id; })[0];
    setTimeout(function () { revisarLogros(); }, 600);
    return n ? n[IDIOMA === 'en' ? 2 : 1][0] : null;
  }
  $('guia-sig').addEventListener('click', function () { SON.toque(); avanzarGuia(); });
  $('guia-saltar').addEventListener('click', function () { SON.toque(); terminarGuia(); });

  // ───────────────────────── Victoria y recompensas ─────────────────────────
  function victoria() {
    J.fin = true; callarAviso();
    var n = J.n, s = J.s, tx = TN(n);
    var dom = J.movs <= J.limite;
    var ing = false, ig = n.ingenio || { tipo: 'sinPistas' };
    if (ig.tipo === 'sinPistas') ing = J.pistas === 0;
    else if (ig.tipo === 'sinTrasvasar') ing = J.trasvases === 0;
    else if (ig.tipo === 'vacia') ing = s.v[ig.id].length === 0;
    else if (ig.tipo === 'intacto') ing = !J.tocados[ig.id];
    var antes = n.modo ? {} : prog.niveles[n.id] || {}, primera = !antes.res;
    var reg = { res: 1, dom: antes.dom || (dom ? 1 : 0), ing: antes.ing || (ing ? 1 : 0), mejor: Math.min(antes.mejor || 999, J.movs) };
    if (!n.modo) prog.niveles[n.id] = reg;
    // Monedas: primera vez, sellos nuevos y un poco por repetir
    var monedas = primera ? (n.jefe ? 40 : 20) : 3;
    if (dom && !antes.dom) monedas += 10;
    if (ing && !antes.ing) monedas += 10;
    // Puntos: más difícil el nivel, más movimientos de sobra, más sellos y sin pistas, más puntos
    var sobra = J.max ? Math.max(0, J.max - J.movs) : Math.max(0, J.limite + 2 - J.movs);
    var sellos = 1 + (dom ? 1 : 0) + (ing ? 1 : 0);
    var puntos = 50 + 10 * (n.nivelPuntos || n.id) + 15 * sobra + 40 * sellos + (J.pistas === 0 ? 30 : 0);
    var record = puntos > (antes.pts || 0);
    reg.pts = Math.max(antes.pts || 0, puntos);
    if (n.modo) terminarModo(n, puntos);
    if (n.modo === 'diario') monedas += 40;
    if (n.modo === 'infinito') monedas += Math.min(30, Math.floor(n.k / 5) * 5);
    if (n.objetivos.some(function (o) { return o.pide; })) prog.cont.combos = (prog.cont.combos || 0) + (primera ? 1 : 0);
    var rangosNuevos = subirRango();
    if (primera && (n.id === 12 || n.id === 48)) setTimeout(function () { toast('<span class="toast-ic">' + (n.id === 48 ? '∞' : '📅') + '</span><span><b>' + T(n.id === 48 ? 'abierto_infinito' : 'abierto_diario') + '</b><small>' + T('abierto_sub') + '</small></span>', SON.logro); }, 6500);
    if (!prog.notas.puntos && n.id >= 4) prog.notas.puntos = Date.now();
    if (PLAT && PLAT.enPlayables && window.ytgame) { try { ytgame.engagement.sendScore({ value: puntosTotales() }).catch(function () {}); } catch (e) { /* opcional */ } }
    var dulce = dulceDeNivel(n.id), dulceNuevo = !!(dulce && !prog.vitrina[dulce[0]]);
    if (dulce) prog.vitrina[dulce[0]] = true;
    prog.cont.sinPistas = J.pistas === 0 ? prog.cont.sinPistas + 1 : 0;
    guardar();
    var p = reg;
    var logrosNuevos = revisarLogros({ silencio: true, tresSellos: p.dom && p.ing, sinDeshacer: J.par >= 4 && J.reinicios === 0 && !J.perdio, rapido: Date.now() - J.inicio < 30000 && !J.conGuia, tenaz: J.perdio });
    var partida = J;
    bajarMusica(true);
    setTimeout(function () {
      if (J !== partida) return; // el jugador ya salió del nivel
      SON.victoria(); confeti();
      // La frase final entra cuando la fanfarria ya va bajando
      setTimeout(function () {
        if (J !== partida) return;
        hablar([tx.fin]).then(function () { if (J === partida) ventanaVictoria(n, dom, ing, primera, monedas, dulce, dulceNuevo, logrosNuevos, { puntos: puntos, record: record, rangos: rangosNuevos }); });
      }, 1500);
    }, 450);
  }
  function confeti() {
    if (reducido) return;
    var esc = document.querySelector('.escenario'), colores = ['#f2607d', '#ffd877', '#3fd0bb', '#86c443', '#7b52d9', '#f5a524'];
    for (var i = 0; i < 46; i++) {
      var d = document.createElement('i'); d.className = 'confeti';
      d.style.left = (Math.random() * 100) + '%'; d.style.background = colores[i % colores.length];
      d.style.width = (6 + Math.random() * 6) + 'px'; d.style.height = (10 + Math.random() * 8) + 'px';
      esc.appendChild(d);
      d.animate([{ transform: 'translate(0,-20px) rotate(0deg)', opacity: 1 }, { transform: 'translate(' + ((Math.random() - 0.5) * 160) + 'px,' + (esc.clientHeight + 40) + 'px) rotate(' + (360 + Math.random() * 720) + 'deg)', opacity: 0.9 }],
        { duration: 1800 + Math.random() * 1400, delay: Math.random() * 400, easing: 'cubic-bezier(.25,.6,.4,1)', fill: 'forwards' });
      setTimeout(d.remove.bind(d), 3800);
    }
  }
  function ventanaVictoria(n, dom, ing, primera, monedas, dulce, dulceNuevo, logrosNuevos, pt) {
    pt = pt || { puntos: 0, record: false, rangos: [] };
    var sig = n.modo ? (n.modo === 'infinito' ? { id: 'inf' } : null) : NIVELES.filter(function (x) { return x.id === n.id + 1; })[0], tx = TN(n);
    var sello = function (si, letra, titulo, txt, i) {
      return '<div class="sello' + (si ? ' si' : '') + '" style="animation-delay:' + (i * 0.12) + 's"><span class="disco">' + (si ? '★' : letra) + '</span><b>' + titulo + '</b><small>' + txt + '</small></div>';
    };
    var frag = n.jefe && n.region <= 4 ? '<div class="fragmento"><img src="assets/ic_tarta.png" alt=""></div><p class="sub"><b>' + T('v_fragmento') + '</b> ' + T('v_fragmento_sub', { n: fragmentos() }) + '</p>' : '';
    var logros = logrosNuevos.length ? '<div class="v-logros"><b>' + T('v_logros') + '</b>' + logrosNuevos.map(function (l) { return '<span>🏆 ' + logroDatos(l).t + '</span>'; }).join('') + '</div>' : '';
    var totalP = puntosTotales(), rAct = rangoDe(totalP), rSig = RANGOS[rAct + 1];
    var bloquePuntos = '<div class="v-puntos"><svg class="estrella-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8Z" fill="#ffd34d" stroke="#9a5e0c" stroke-width="1.8" stroke-linejoin="round"/></svg>' +
      '<div><b>' + T('puntos_ganados', { n: formatoPuntos(pt.puntos) }) + (pt.record ? ' <em>' + T('record') + '</em>' : '') + '</b>' +
      '<small>' + nombreRango(rAct) + ' · ' + T('total_puntos', { n: formatoPuntos(totalP) }) + '</small>' +
      '<span class="barrita"><i style="width:' + (rSig ? Math.round(100 * (totalP - RANGOS[rAct][2]) / (rSig[2] - RANGOS[rAct][2])) : 100) + '%"></i></span></div></div>' +
      (pt.rangos.length ? '<div class="v-rango">' + T('sube_rango', { r: nombreRango(pt.rangos[pt.rangos.length - 1]) }) + '<small>' + premioTexto(RANGOS[pt.rangos[pt.rangos.length - 1]][3]) + '</small></div>' : '');
    abrirModal('<div class="v-cab"><h2>' + T(n.jefe ? 'v_titulo_jefe' : 'v_titulo') + '</h2><span class="chapa chapa-monedas"></span></div>' +
      '<p class="sub">' + T('v_sub', { t: tx.titulo, n: J.movs }) + '</p>' + frag +
      '<div class="sellos">' + sello(true, '✓', T('s_resolucion'), T('s_resolucion_d'), 0) +
      sello(dom, '≤' + J.limite, T('s_dominio'), T('s_dominio_d', { n: J.limite }), 1) +
      sello(ing, '?', T('s_ingenio'), tx.ingenio || T('s_ingenio'), 2) + '</div>' +
      '<div class="v-premios"><div class="v-monedas" id="v-monedas">' + MONEDA_SVG + '<b>+<span id="v-cuenta">0</span></b><small>' + T('v_monedas') + '</small></div>' +
      (dulce ? '<button class="v-dulce' + (dulceNuevo ? ' nuevo' : '') + '" id="v-dulce"><img src="assets/vitrina/' + dulce[0] + '.png" alt=""><span><small>' + T(dulceNuevo ? 'v_nuevo_dulce' : 'v_dulce') + '</small><b>' + nombreDulce(dulce) + '</b><em>' + T('v_ver_receta') + '</em></span></button>' : '') + '</div>' +
      bloquePuntos + logros +
      '<div class="acciones"><button class="btn sec peq" id="b-v-repetir">' + T('v_repetir') + '</button><button class="btn sec peq" id="b-v-mapa">' + T('v_mapa') + '</button>' +
      (sig ? '<button class="btn peq" id="b-v-sig">' + (n.modo === 'infinito' ? T('v_siguiente_inf', { n: n.k + 1 }) : T('v_siguiente', { n: sig.id })) + '</button>' : '') + '</div>' +
      '<div class="lamina" id="lamina" hidden></div>', function (m) {
      pintarMonedas();
      // Sellos (sólo los conseguidos), después las monedas y al final, si hay, el logro
      [true, dom, ing].forEach(function (si, i) { if (si) setTimeout(function () { SON.sello(i); }, 380 + i * 240); });
      if (logrosNuevos.length || pt.rangos.length) setTimeout(function () { if (!$('modal').hidden) SON.logro(); }, 2700);
      setTimeout(function () { bajarMusica(false); }, 3200);
      // Las monedas cuentan hacia arriba y vuelan al contador
      var cuenta = m.querySelector('#v-cuenta'), t0 = performance.now() + 600;
      setTimeout(function () {
        var caja = m.querySelector('#v-monedas'); if (!caja) return;
        var r = caja.getBoundingClientRect();
        ganarMonedas(monedas, { x: r.left + 30, y: r.top + r.height / 2 });
        (function paso(t) { var k = Math.min(1, (t - t0 - 600) / 700); cuenta.textContent = Math.max(0, Math.round(monedas * k)); if (k < 1) requestAnimationFrame(paso); })(performance.now());
        setTimeout(function () { cuenta.textContent = monedas; }, 1400);
      }, 1200);
      var vd = m.querySelector('#v-dulce'), lam = m.querySelector('#lamina');
      if (vd) vd.addEventListener('click', function () { SON.toque(); lam.innerHTML = '<div class="lamina-in"><img src="assets/vitrina/lamina_' + dulce[0] + '.jpg" alt=""><b>' + nombreDulce(dulce) + '</b><small>' + T('toca_seguir') + '</small></div>'; lam.hidden = false; });
      lam.addEventListener('click', function () { lam.hidden = true; });
      m.querySelector('#b-v-repetir').addEventListener('click', function () { SON.toque(); cerrarModal(); cargarNivel(n.modo ? n : n.id); });
      m.querySelector('#b-v-mapa').addEventListener('click', function () { SON.toque(); cerrarModal(); abrirMapa(); });
      var bs = m.querySelector('#b-v-sig'); if (bs) bs.addEventListener('click', function () { SON.toque(); cerrarModal(); if (n.modo === 'infinito') jugarInfinito(); else cargarNivel(sig.id); });
      var partida = J;
      if (!sig) setTimeout(function () {
        if (J !== partida || $('modal').hidden) return;
        hablar([{ id: 'epilogo', q: 'grumble', t: TX.HISTORIA[IDIOMA].epilogo }]);
      }, 1800);
    });
  }

  // ───────────────────────── Obrador sin fin y reto del día ─────────────────────────
  // Los tableros se crean al momento en un trabajador con el mismo generador que hizo los niveles del mapa.
  // Si no se puede (sin trabajadores o sin candidato a tiempo), se remezcla un nivel del mapa: espejo y sabores cambiados.
  var trabajadoresInf = {}, esperasInf = {}, listosInf = {};
  function semillaDe(a, b) { var h = (2166136261 ^ a) >>> 0; h = Math.imul(h ^ b, 16777619); h ^= h >>> 13; h = Math.imul(h, 2246822507); return (h ^ (h >>> 16)) >>> 0; }
  function generarTablero(clave, t, semilla, cb) {
    if (listosInf[clave]) return cb(listosInf[clave]);
    var cola = esperasInf[clave] = esperasInf[clave] || [];
    cola.push(cb); if (cola.length > 1) return;
    var hecho = false, terminar = function (res) {
      if (hecho) return; hecho = true;
      listosInf[clave] = res; var l = esperasInf[clave] || []; delete esperasInf[clave]; l.forEach(function (f) { f(res); });
    };
    var plan = setTimeout(function () { terminar(remezcla(t, semilla)); }, 50000);
    try {
      if (typeof Worker === 'undefined') throw new Error('sin trabajadores');
      // Un trabajador para el Obrador sin fin y otro para el reto del día: no se hacen esperar entre sí
      var tipo = clave.slice(0, 3), trabInf = trabajadoresInf[tipo];
      if (!trabInf) {
        trabInf = trabajadoresInf[tipo] = new Worker('infinito.js');
        trabInf.onmessage = function (e) { var f = esperasInf['_' + e.data.clave]; if (f) { delete esperasInf['_' + e.data.clave]; f(e.data); } };
        trabInf.onerror = function (ev) { if (ev && ev.preventDefault) ev.preventDefault(); delete trabajadoresInf[tipo]; Object.keys(esperasInf).forEach(function (k) { if (k.slice(0, 4) === '_' + tipo) { var f = esperasInf[k]; delete esperasInf[k]; f({ ok: false }); } }); };
      }
      esperasInf['_' + clave] = function (d) { clearTimeout(plan); terminar(d.ok ? { nivel: d.nivel, minimo: d.sol.length, din: d.din } : remezcla(t, semilla)); };
      trabInf.postMessage({ clave: clave, t: t, semilla: semilla, segundos: 25 });
    } catch (e) { clearTimeout(plan); setTimeout(function () { terminar(remezcla(t, semilla)); }, 30); }
  }
  // Cuando el jugador espera: como mucho 12 s; si el tablero nuevo no llega, se juega una remezcla al momento
  function tableroConEspera(clave, t, semilla, cb) {
    var dado = false, tm = setTimeout(function () { if (!dado) { dado = true; cb(remezcla(t, semilla)); } }, 12000);
    generarTablero(clave, t, semilla, function (res) { if (!dado) { dado = true; clearTimeout(tm); cb(res); } });
  }
  // Remezcla de un nivel del mapa: mismo puzle (mismo mínimo) con otro aspecto
  function remezcla(t, semilla) {
    var azar = semilla;
    var al = function () { azar = semillaDe(azar, 99); return azar / 4294967296; };
    var cand = NIVELES.filter(function (x) { return x.id >= 25; });
    var base = cand[Math.min(cand.length - 1, Math.max(0, Math.round((t / 72) * (cand.length - 1) + (al() - 0.5) * 12)))];
    var n = JSON.parse(JSON.stringify({ vasijas: base.vasijas, grifos: base.grifos, compuertas: base.compuertas || [], objetivos: base.objetivos }));
    var txt = JSON.stringify(n), fijos = {};
    if (/alambique|"sellada":true|"chocolate"|turbina/.test(txt)) { fijos.C = 1; fijos.M = 1; }
    if (/"cristal":true/.test(txt)) fijos.M = 1;
    if (/regaliz/.test(txt)) fijos.G = 1;
    var libres = ['C', 'M', 'G', 'F', 'L', 'B'].filter(function (k) { return !fijos[k]; });
    var usados = libres.filter(function (k) { return txt.indexOf('"' + k + '"') >= 0; });
    var mezcla = libres.slice().sort(function () { return al() - 0.5; }), cambio = {};
    usados.forEach(function (k, i) { cambio[k] = mezcla[i]; });
    var tr = function (k) { return cambio[k] || k; };
    n.vasijas.forEach(function (v) { v.capas = (v.capas || []).map(tr); });
    n.objetivos.forEach(function (o) {
      if (o.pide) { var p = {}; Object.keys(o.pide).forEach(function (k) { p[tr(k)] = o.pide[k]; }); o.pide = p; delete o.materia; delete o.necesita; }
      else if (o.materia) o.materia = tr(o.materia);
      // Los dulces cambian de sabor: se vuelven a nombrar (salvo la semilla y el molinillo)
      if (o.tipo !== 'turbina' && !/Semilla/.test(o.nombre || '')) { delete o.img; delete o.nombre; }
      else if (/Semilla/.test(o.nombre || '')) o.semilla = true;
    });
    if (al() < 0.5) { // espejo
      var X = function (x) { return 360 - x; };
      n.vasijas.forEach(function (v) { v.x = X(v.x); });
      n.objetivos.forEach(function (o) { o.x = X(o.x); });
      n.grifos.forEach(function (g) { g.sale = g.sale === 'izq' ? 'der' : 'izq'; if (g.valvula) g.valvula = [X(g.valvula[0]), g.valvula[1]]; g.rutas.forEach(function (ru) { ru.via = (ru.via || []).map(function (p) { return [X(p[0]), p[1]]; }); }); });
    }
    return { nivel: n, minimo: base.minimo, din: null, ensena: [base.ensena, (EN[base.id] || {}).ensena || base.ensena] };
  }
  var IMG_SABOR = { C: 'p15', M: 'p03', G: 'p19', U: 'p10', F: 'p14', L: 'p26', B: 'p08' };
  var IMG_MEZCLA = ['p21', 'p24', 'p25', 'p27', 'p13', 'p18', 'p17', 'p20', 'p11', 'p28'];
  // Viste un tablero recién creado: nombres de los dulces, textos en los dos idiomas, ambiente y reto de Ingenio
  function vestirModo(res, modo, k) {
    var n = res.nivel, id = modo === 'infinito' ? 1000 + k : 5000, nombresEn = {}, aleat = semillaDe(id, k || 7);
    var corto = function (m, en) { return TX.MATERIAS[en ? 'en' : 'es'][m][0].split(' ')[0]; };
    n.objetivos.forEach(function (o) {
      if (o.tipo === 'turbina') { o.nombre = 'El Molinillo de Merengue'; nombresEn[o.id] = 'The Meringue Pinwheel'; return; }
      if (o.semilla) { delete o.semilla; o.img = 'dona_matcha'; o.nombre = 'La Semilla de Matcha'; nombresEn[o.id] = 'The Matcha Seed'; return; }
      if (o.pide) {
        var ks = Object.keys(o.pide).sort(), h = semillaDe(aleat, ks.join('').charCodeAt(0) + ks.length);
        o.img = 'vitrina/' + IMG_MEZCLA[h % IMG_MEZCLA.length];
        o.nombre = 'Tarta de ' + ks.map(function (m) { return corto(m); }).join(' y ');
        nombresEn[o.id] = ks.map(function (m) { return corto(m, true); }).join(' & ') + ' Cake';
      } else if (o.materia && !o.img) {
        o.img = 'vitrina/' + (IMG_SABOR[o.materia] || 'p01');
        o.nombre = 'Dulce de ' + corto(o.materia); nombresEn[o.id] = corto(o.materia, true) + ' Sweet';
      } else if (o.nombre && EN) { nombresEn[o.id] = o.nombre; }
    });
    n.vasijas.forEach(function (v) { if (v.nombre === 'Reserva') nombresEn[v.id] = 'Reserve'; });
    var fin = TX.FIN_POOL[(k || 0) % TX.FIN_POOL.length], kf = (k || 0) % TX.FIN_POOL.length;
    var consejo = res.ensena || (res.din || []).filter(function (d) { return TX.CONSEJOS[d]; }).slice(0, 2).map(function (d) { return TX.CONSEJOS[d]; });
    var ensES = res.ensena ? res.ensena[0] : consejo.map(function (c) { return c[0]; }).join(' ');
    var ensEN = res.ensena ? res.ensena[1] : consejo.map(function (c) { return c[1]; }).join(' ');
    var nivel = { id: id, modo: modo, k: k, region: 6 + ((k || 3) % 6), ambiente: AMBIENTES[(k || 4) % AMBIENTES.length],
      nivelPuntos: modo === 'infinito' ? 60 + k : 80,
      titulo: modo === 'infinito' ? 'Obrador sin fin · Nº ' + k : 'Reto del día', minimo: res.minimo, ensena: ensES || T('inf_consejo'),
      intro: [], guia: [], fin: { q: fin[0], t: fin[1], voz: 'fin_pool_' + kf }, ingenio: { tipo: 'sinPistas', txt: 'Resolver sin pistas' },
      vasijas: n.vasijas, grifos: n.grifos, compuertas: n.compuertas || [], objetivos: n.objetivos };
    EN[id] = { titulo: modo === 'infinito' ? 'Endless Bakery · No. ' + k : "Today's Challenge", ensena: ensEN || 'Plan before you move.', intro: [], guia: [], fin: fin[2], ingenio: 'Solve it without hints', nombres: nombresEn };
    return nivel;
  }
  function tInfinito(k) { return k <= 61 ? 11 + k : 48 + (semillaDe(prog.infinito.sal, k) % 25); }
  function abrirPreparando() {
    abrirModal('<div class="preparando"><img src="assets/grumble.png" alt=""><h2>' + T('preparando') + '</h2><p class="sub">' + T('preparando_sub') + '</p><i class="girando"></i></div>');
  }
  function jugarInfinito() {
    if (!infinitoAbierto()) { toast('<span class="toast-ic">🔒</span><span><b>' + T('infinito_bloq') + '</b></span>'); return; }
    if (vidas() <= 0) { ventanaSinVidas(jugarInfinito); return; }
    var k = prog.infinito.nivel;
    if (prog.infinito.actual && prog.infinito.actual.k === k) { EN[prog.infinito.actual.id] = prog.infinito.actualEn; cargarNivel(prog.infinito.actual); prepararSiguiente(k + 1); return; }
    abrirPreparando();
    tableroConEspera('inf-' + prog.infinito.sal + '-' + k, tInfinito(k), semillaDe(prog.infinito.sal, k), function (res) {
      var n = vestirModo(res, 'infinito', k);
      prog.infinito.actual = n; prog.infinito.actualEn = EN[n.id]; guardar();
      cerrarModal(); cargarNivel(n); prepararSiguiente(k + 1); anotar('infinito');
    });
  }
  function prepararSiguiente(k) { generarTablero('inf-' + prog.infinito.sal + '-' + k, tInfinito(k), semillaDe(prog.infinito.sal, k), function () {}); }
  function jugarDiario() {
    if (!diarioAbierto()) { toast('<span class="toast-ic">🔒</span><span><b>' + T('diario_bloq') + '</b></span>'); return; }
    var d = hoy();
    if (prog.diario.hecho === d) { toast('<span class="toast-ic">✅</span><span><b>' + T('diario_hecho') + '</b><small>' + T('diario_vuelve') + '</small></span>'); return; }
    if (vidas() <= 0) { ventanaSinVidas(jugarDiario); return; }
    if (prog.diario.nivel && prog.diario.fecha === d) { EN[5000] = prog.diario.nivelEn; cargarNivel(prog.diario.nivel); return; }
    var num = Number(d.replace(/-/g, ''));
    abrirPreparando();
    tableroDiario(function (res) {
      var n = vestirModo(res, 'diario', num % 997);
      prog.diario.fecha = d; prog.diario.nivel = n; prog.diario.nivelEn = EN[n.id]; guardar();
      cerrarModal(); cargarNivel(n); anotar('diario');
    }, true);
  }
  function tableroDiario(cb, esperar) { var d = hoy(), num = Number(d.replace(/-/g, '')); (esperar ? tableroConEspera : generarTablero)('dia-' + d, 14 + (num % 7), semillaDe(num, 2026), cb); }
  function infinitoAbierto() { return resuelto(48); }
  function diarioAbierto() { return resuelto(12); }
  // Al ganar en un modo: avanza la serie o marca el reto de hoy
  function terminarModo(n, puntos) {
    if (n.modo === 'infinito') {
      prog.infinito.pts = (prog.infinito.pts || 0) + puntos;
      prog.infinito.mejor = Math.max(prog.infinito.mejor || 0, n.k);
      prog.infinito.nivel = n.k + 1; prog.infinito.actual = null; prog.infinito.actualEn = null;
    } else {
      var d = hoy(), ayer = hoy(new Date(Date.now() - 864e5));
      prog.diario.racha = prog.diario.hecho === ayer ? (prog.diario.racha || 0) + 1 : 1;
      prog.diario.hecho = d; prog.diario.pts = (prog.diario.pts || 0) + puntos;
    }
  }
  function pintarModos() {
    var bi = $('b-infinito'), bd = $('b-diario'); if (!bi) return;
    bi.classList.toggle('bloq', !infinitoAbierto()); bd.classList.toggle('bloq', !diarioAbierto());
    $('b-infinito-sub').textContent = infinitoAbierto() ? T('infinito_sub', { n: prog.infinito.nivel }) : T('infinito_req');
    $('b-diario-sub').textContent = !diarioAbierto() ? T('diario_req') : prog.diario.hecho === hoy() ? T('diario_hecho_corto') : T('diario_sub');
    bd.classList.toggle('hecho', prog.diario.hecho === hoy());
    // Se preparan en segundo plano para no hacer esperar al pulsar
    setTimeout(function () {
      if (infinitoAbierto() && !prog.infinito.actual) prepararSiguiente(prog.infinito.nivel);
      if (diarioAbierto() && prog.diario.hecho !== hoy() && !(prog.diario.nivel && prog.diario.fecha === hoy())) tableroDiario(function () {});
    }, 1500);
  }

  // ───────────────────────── Juego sano: aviso de descanso ─────────────────────────
  // Cuenta sólo el tiempo jugando de verdad (pantalla del nivel visible y con actividad reciente)
  var sesion = { activo: 0 };
  setInterval(function () {
    if (document.hidden || enPausa || !J || $('pantalla-nivel').hidden || Date.now() - (J.ultimaAccion || 0) > 120000) return;
    sesion.activo += 15000;
    if (sesion.activo >= 40 * 60000 && $('modal').hidden && !J.ocupado) { sesion.activo = 0; avisoDescanso(); }
  }, 15000);
  function avisoDescanso() {
    frase('descanso');
    abrirModal('<div class="derrota"><img src="assets/grumble.png" alt=""><div><small>' + T('descanso_sub') + '</small><h2>' + T('descanso_t') + '</h2></div></div>' +
      '<p class="sub">' + T('descanso') + '</p><div class="acciones"><button class="btn sec peq" id="b-desc-no">' + T('seguir_jugando') + '</button><button class="btn peq" id="b-desc-si">' + T('descanso_si') + '</button></div>', function (m) {
      m.querySelector('#b-desc-no').addEventListener('click', function () { SON.toque(); cerrarModal(); });
      m.querySelector('#b-desc-si').addEventListener('click', function () { SON.toque(); cerrarModal(); callarVoz(); pintarPortada(); mostrar('pantalla-portada', null, 'portada'); });
    });
  }

  // ───────────────────────── Botones ─────────────────────────
  $('b-infinito').addEventListener('click', function () { audio(); SON.toque(); jugarInfinito(); });
  $('b-diario').addEventListener('click', function () { audio(); SON.toque(); jugarDiario(); });
  $('b-jugar').addEventListener('click', function () {
    audio(); SON.toque();
    if (!bienvenidaDicha) { bienvenidaDicha = true; frase('bienvenida', true); }
    abrirMapa();
  });
  $('b-vitrina').addEventListener('click', function () { SON.toque(); ventanaVitrina(); });
  document.querySelectorAll('.b-rangos').forEach(function (b) { b.addEventListener('click', function () { SON.toque(); ventanaRangos(); }); });
  document.querySelectorAll('.chapa-vidas').forEach(function (b) { b.addEventListener('click', function () { SON.toque(); if (vidas() < maxVidas()) ventanaSinVidas(); else toast('<span class="toast-ic">❤️</span><span><b>' + T('vidas_llenas') + '</b><small>' + T('vidas_info', { m: minutosRecarga() }) + '</small></span>'); }); });
  // Empezar de cero desde la portada (con confirmación)
  $('b-cero').addEventListener('click', function () {
    SON.toque();
    abrirModal('<button class="btn-redondo cerrar" aria-label="' + T('cerrar') + '">✕</button><h2>' + T('cero_t') + '</h2><p class="sub">' + T('cero_aviso') + '</p>' +
      '<div class="acciones"><button class="btn sec peq" id="b-cero-no">' + T('aj_cancelar') + '</button><button class="btn peq peligro" id="b-cero-si">' + T('cero_si') + '</button></div>', function (m) {
      m.querySelector('#b-cero-no').addEventListener('click', function () { SON.toque(); cerrarModal(); });
      m.querySelector('#b-cero-si').addEventListener('click', function () {
        var idioma = prog.idioma; prog = BASE(); prog.idioma = idioma; guardar();
        cerrarModal(); J = null; pintarMonedas(); pintarPortada(); mostrar('pantalla-portada', null, 'portada');
        toast('<span class="toast-ic">🧁</span><span><b>' + T('cero_hecho') + '</b></span>');
      });
    });
  });
  $('b-logros').addEventListener('click', function () { SON.toque(); ventanaLogros(); });
  document.querySelectorAll('.b-ajustes').forEach(function (b) { b.addEventListener('click', function () { SON.toque(); ventanaAjustes(); }); });
  document.querySelectorAll('.idioma-portada button').forEach(function (b) { b.addEventListener('click', function () { cambiarIdioma(b.getAttribute('data-idioma')); }); });
  $('b-mapa-volver').addEventListener('click', function () { SON.toque(); pintarPortada(); mostrar('pantalla-portada', null, 'portada'); });
  $('b-mapa-vitrina').addEventListener('click', function () { SON.toque(); ventanaVitrina(); });
  $('b-cofre').addEventListener('click', function () { SON.toque(); ventanaCofre(); });
  $('b-mapa-seguir').addEventListener('click', function () { var s = siguienteNivel(); SON.toque(); if (s) cargarNivel(s.id); else ventanaVitrina(); });
  $('b-nivel-volver').addEventListener('click', function () {
    SON.toque();
    if (partidaEmpezada()) { confirmarVida(T('salir_t'), T('salir_vida'), T('si_salir'), function () { gastarVida(); callarVoz(); abrirMapa(); }); return; }
    callarVoz(); abrirMapa();
  });
  $('b-reiniciar').addEventListener('click', reiniciar);
  $('b-pista').addEventListener('click', pista);
  $('b-leyenda').addEventListener('click', function () { SON.toque(); ventanaCuaderno(); });
  document.addEventListener('keydown', function (e) {
    if (!$('pantalla-nivel').hidden && $('dialogo').hidden && $('modal').hidden) {
      if (e.key === 'Escape' && J && J.sel !== null) { J.sel = null; actualizarSeleccion(); }
    }
    if (e.key === 'Escape' && !$('modal').hidden && $('modal').querySelector('.cerrar')) cerrarModal();
  });

  // Acceso para pruebas desde la consola: Alquimia.nivel(5)
  function pausar() {
    enPausa = true;
    if (actx && actx.state === 'running') actx.suspend();
    if (musica.el) musica.el.pause();
    callarVoz();
    document.documentElement.classList.add('pausado');
    document.getAnimations().forEach(function (a) { try { a.pause(); } catch (e) { /* ya terminada */ } });
  }
  function reanudar() {
    enPausa = false;
    document.documentElement.classList.remove('pausado');
    document.getAnimations().forEach(function (a) { try { if (a.playState === 'paused') a.play(); } catch (e) { /* ya terminada */ } });
    if (actx && actx.state === 'suspended' && !window.__mudo) actx.resume();
    if (J) J.ultimaAccion = Date.now();
    ponerMusica();
  }
  function silenciar(si) {
    window.__mudo = !!si;
    if (si) { callarVoz(); if (musica.el) { musica.el.pause(); musica.el = null; musica.pista = null; } }
    else ponerMusica();
  }
  window.Alquimia = { pausar: pausar, reanudar: reanudar, silenciar: silenciar, nivel: cargarNivel, mapa: abrirMapa, partida: function () { return J; }, idioma: cambiarIdioma, prog: function () { return prog; },
    accion: function (a) { if (a.t === 'g') { J.valv[a.g] = a.r; actualizarValvula(a.g); } ejecutar(a); } };
  // Partidas guardadas antes de los puntos: cada nivel ganado recibe una puntuación estimada
  Object.keys(prog.niveles).forEach(function (id) { var p = prog.niveles[id]; if (p.res && !p.pts) p.pts = 50 + 10 * Number(id) + 40 * (1 + (p.dom ? 1 : 0) + (p.ing ? 1 : 0)); });
  if (!prog.cont.combos) prog.cont.combos = 0;
  if (!prog.infinito.sal) { prog.infinito.sal = 1 + Math.floor(Math.random() * 2e9); guardar(); } // cada jugador tiene su propia serie infinita
  subirRango();
  aplicarTextos(); pintarMonedas(); pintarPortada();
  mostrar('pantalla-portada', null, 'portada');
})();
