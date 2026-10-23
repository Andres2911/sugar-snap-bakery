/* SUGAR-SNAP BAKERY · Puente con la plataforma (sólo en la versión para YouTube Playables).
   Dentro de YouTube: el progreso se guarda en la nube (loadData/saveData), el idioma lo da YouTube,
   se respeta su silencio y se pausa todo con onPause. Fuera de YouTube (por ejemplo en GitHub Pages)
   funciona como la versión web: guarda en el navegador. */
(function () {
  'use strict';
  var CLAVE = 'sugar-snap-bakery-v2';
  var yt = typeof ytgame !== 'undefined' && ytgame.IN_PLAYABLES_ENV;
  var P = window.Plataforma = { enPlayables: !!yt, datos: null, idioma: null, ultimo: null };
  var listo = false, pendiente = null, guardando = false;

  // Guardado: en YouTube se agrupan los cambios seguidos para no saturar la nube
  P.guardar = function (txt) {
    P.ultimo = txt;
    if (!yt) { try { localStorage.setItem(CLAVE, txt); } catch (e) { /* sin almacenamiento */ } return; }
    if (!listo) return; // YouTube rechaza guardar antes de haber cargado
    pendiente = txt;
    if (guardando) return;
    guardando = true;
    setTimeout(function () {
      var t = pendiente; pendiente = null;
      ytgame.game.saveData(t).catch(function () { /* se reintenta en el próximo guardado */ }).then(function () {
        guardando = false;
        if (pendiente) P.guardar(pendiente);
      });
    }, 300);
  };

  function quitarCarga() { var c = document.getElementById('carga'); if (c) c.remove(); }
  function arrancarJuego(alListo) {
    var s = document.createElement('script');
    s.src = 'juego.js';
    s.onload = function () {
      // La portada ya está pintada e interactiva
      requestAnimationFrame(function () { requestAnimationFrame(function () { quitarCarga(); if (alListo) alListo(); }); });
    };
    document.body.appendChild(s);
  }

  if (!yt) {
    try { P.datos = localStorage.getItem(CLAVE); } catch (e) { /* sin almacenamiento */ }
    arrancarJuego();
    return;
  }

  // Pantalla de carga visible → primer fotograma listo
  requestAnimationFrame(function () { ytgame.game.firstFrameReady(); });
  var cargar = ytgame.game.loadData().catch(function () { return ''; });
  var idioma = ytgame.system.getLanguage().catch(function () { return ''; });
  Promise.all([cargar, idioma]).then(function (r) {
    P.datos = r[0] || null;
    listo = true;
    var l = String(r[1] || '').toLowerCase();
    P.idioma = l ? (l.indexOf('es') === 0 ? 'es' : 'en') : null;
    window.__mudo = !ytgame.system.isAudioEnabled();
    arrancarJuego(function () {
      var A = window.Alquimia;
      A.silenciar(!ytgame.system.isAudioEnabled());
      ytgame.system.onAudioEnabledChange(function (activo) { A.silenciar(!activo); });
      ytgame.system.onPause(function () {
        A.pausar();
        if (P.ultimo) ytgame.game.saveData(P.ultimo).catch(function () { /* mejor esfuerzo */ });
      });
      ytgame.system.onResume(function () { A.reanudar(); });
      ytgame.game.gameReady();
    });
  });
})();
