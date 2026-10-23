/* ALQUIMIA · Trabajador en segundo plano: analiza el nivel completo sin congelar la pantalla.
   Devuelve la distancia a la victoria de cada estado, para que las pistas sean instantáneas. */
importScripts('motor.js', 'niveles.js');
onmessage = function (e) {
  var n = self.NIVELES.filter(function (x) { return x.id === e.data; })[0];
  var r = self.Motor.analizar(n);
  postMessage({ id: n.id, dist: r.dist, completo: r.completo });
};
