/* ALQUIMIA · Trabajador en segundo plano: analiza el nivel completo sin congelar la pantalla.
   Devuelve la distancia a la victoria de cada estado, para que las pistas sean instantáneas.
   Recibe el número de un nivel del mapa o, en el modo infinito y el reto diario, el nivel entero. */
importScripts('motor.js', 'niveles.js');
onmessage = function (e) {
  var n = typeof e.data === 'object' ? e.data.nivel : self.NIVELES.filter(function (x) { return x.id === e.data; })[0];
  var r = self.Motor.analizar(n);
  postMessage({ id: n.id, dist: r.dist, completo: r.completo });
};
