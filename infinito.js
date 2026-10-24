/* SUGAR-SNAP BAKERY · Trabajador del modo infinito y del reto diario: genera un tablero nuevo en segundo plano
   (sin congelar la pantalla) con el mismo generador que crea los niveles del mapa. Usa filtros algo más ligeros
   que los niveles fijos para encontrar tablero en pocos segundos, y si el primer intento no da, prueba otra semilla. */
importScripts('motor.js', 'generador.js');
onmessage = function (e) {
  var d = e.data, t0 = Date.now(), r = null;
  for (var intento = 0; intento < 2 && !(r && r.mejor); intento++) {
    r = self.Generador.generar(10000, d.segundos || 20, {
      semilla: (d.semilla + intento * 104729) >>> 0, rapido: true, limite: 30000, limiteAnalisis: 60000, partidas: 60,
      planear: function (id, rnd) { var p = self.Generador.planAvanzado(d.t, rnd, 10000); p.nuevo = null; var i2 = p.din.indexOf('bascula2'); if (i2 >= 0) p.din[i2] = 'bascula'; p.lo = Math.max(8, p.lo - 3); return p; }
    });
  }
  postMessage({ clave: d.clave, ok: !!r.mejor, nivel: r.mejor ? r.mejor.n : null, sol: r.mejor ? r.mejor.sol : null,
    din: r.mejor ? r.mejor.plan.din : null, ms: Date.now() - t0 });
};
