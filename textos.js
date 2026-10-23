/* SUGAR-SNAP BAKERY · Textos de la interfaz en español e inglés, y catálogos de recompensas.
   {nombre} en un texto se sustituye por el valor que se le pasa. */
(function (global) {
  'use strict';

  var UI = {
    es: {
      juego: 'Sugar-Snap Bakery',
      lema: 'La alquimia más dulce del reino',
      portada_texto: 'Mueve y transforma materia mágica para despertar los dulces dormidos de Auralia.',
      jugar: 'Jugar', seguir_nivel: 'Nivel {n}', todo_completo: 'Reino restaurado',
      vitrina: 'Vitrina', logros: 'Logros', ajustes: 'Ajustes', cuaderno: 'Cuaderno', tienda: 'Tienda',
      volver: 'Volver', cerrar: 'Cerrar', siguiente: 'Siguiente', saltar: 'Saltar', saltar_guia: 'Saltar guía',
      toca_seguir: 'Toca para seguir', tu_turno: '¡Tu turno! Hazlo en el tablero',
      paso: 'Paso {a} de {b}', anotado: 'Anotado en tu cuaderno: {t}',
      monedas: 'Monedas de azúcar', fragmentos: 'Fragmentos {n}/4',
      jugar_nivel: 'Jugar nivel {n}', reino_restaurado: '¡Reino restaurado!',
      region: 'Región {n}', regiones_futuras: 'Regiones III y IV', regiones_futuras_sub: 'Ruinas del Helado · Ciudad Suspendida',
      nivel: 'NIVEL', desafio: 'DESAFÍO', nivel_aria: 'Nivel {n}: {t}', bloqueado: '(bloqueado)',
      movimientos: 'Movimientos', dominio: 'Dominio', objetivos: 'Objetivos',
      deshacer: 'Deshacer', reiniciar: 'Reiniciar', pista: 'Pista',
      cofre: 'Cofre diario', cofre_listo: '¡Cofre listo!', cofre_manana: 'Vuelve mañana',
      cofre_titulo: 'Cofre diario', cofre_racha: 'Racha: día {n} de 7', cofre_abrir: 'Abrir cofre',
      cofre_premio: '+{m} monedas', cofre_dulce: '¡Y un dulce nuevo para tu vitrina: {t}!',
      cofre_explica: 'Vuelve cada día: el premio crece con la racha. El día 7 trae un dulce de regalo.',
      // Pantalla de nivel
      vapor: '¡Vapor!', fundido: '¡Fundido!', restaurado: '¡Restaurado!',
      capsula_sin_boca: 'Las cápsulas no tienen boca: sólo se llenan y vacían por tubos.',
      vacio_origen: 'Está vacío: elige un recipiente con materia para trasvasar.',
      donas_tubos: 'Las donas y los molinillos se alimentan por los tubos: usa el grifo del recipiente conectado.',
      callejon: 'Por aquí ya no hay salida. Deshaz el último movimiento y prueba otro camino.',
      pierde_t_callejon: '¡Sin salida!', pierde_t_movs: '¡Sin movimientos!', pierde_sub: 'Esta partida se ha perdido',
      pierde_callejon: 'Con el tablero así ya no se puede despertar a todos los dulces. ¡Inténtalo de nuevo!',
      pierde_movs: 'Se acabaron los movimientos antes de despertar a todos los dulces. ¡Inténtalo de nuevo!',
      pierde_faltan: 'Te quedan {a} movimientos y hacen falta al menos {b}. ¡Inténtalo de nuevo!',
      pierde_consejo: 'Piensa antes de mover: el orden lo es todo. Si te atascas, la varita te enseña el siguiente paso.',
      reintentar: 'Reintentar', deshacer_uno: 'Deshacer el último', movs_quedan: 'Quedan {n}',
      mapa_region: 'Región {n}', mapa_arrastra: 'Desliza para recorrer el reino',
      sin_solucion: 'Por este camino ya no hay solución. Deshaz algún movimiento o reinicia.',
      atascado: '¿Te ayudo? Toca la varita para una pista.',
      objetivo_pide: '{o} necesita {n} más de {m}.', objetivo_vivo: '{o} ya brilla de nuevo.',
      // Pistas
      p1_vasija: 'Mira bien {o}: lo que tiene arriba debe cambiar de sitio.',
      p2_vasija: 'Trasvasa {de_o} {a_d}.', p3_vasija: 'Te lo enseño: {de_o} {a_d}.',
      p1_valvula: 'Esa válvula decide el camino. ¿Hacia dónde debería mirar?',
      p1_chimenea: 'Esa chimenea tiene algo que hacer.', p1_grifo: 'Lo que salga por ese grifo es la clave.',
      p2_girar: 'Gira la válvula hacia {d} y abre {que} {de_o}.', p2_abrir: 'Abre {que} {de_o}.',
      p3_grifo: 'Te lo enseño: {que} hacia {d}.',
      el_grifo: 'el grifo', la_chimenea: 'la chimenea', grifo: 'grifo', chimenea: 'chimenea', valvula: 'válvula',
      // Guía
      g_siguiente: 'Pulsa «Siguiente» para continuar con la guía.',
      g_valvula: 'Primero gira la válvula dorada, como dice la guía.',
      g_trasvase: 'Casi: sigue la guía y trasvasa entre los recipientes marcados.',
      g_grifo: 'Casi: sigue la guía y abre el grifo marcado.',
      g_ruta: 'La válvula no apunta al sitio correcto. Gírala primero.',
      // Victoria
      v_titulo: '¡Restaurado!', v_titulo_jefe: '¡Desafío superado!', v_sub: '{t} · {n} movimientos',
      v_fragmento: '¡Fragmento del Corazón Primordial!', v_fragmento_sub: 'Llevas {n} de 4.',
      s_resolucion: 'Resolución', s_resolucion_d: 'Objetivo cumplido', s_dominio: 'Dominio', s_dominio_d: 'En {n} movimientos o menos', s_ingenio: 'Ingenio',
      v_monedas: 'Monedas ganadas', v_nuevo_dulce: 'Nuevo dulce en tu vitrina', v_dulce: 'Dulce de este nivel',
      v_ver_receta: 'Ver receta', v_repetir: 'Repetir', v_mapa: 'Mapa', v_siguiente: 'Nivel {n}', v_logros: 'Logros conseguidos',
      // Vitrina y tienda
      vit_sub: 'Cada nivel restaurado te regala un dulce. Los demás se hornean con monedas de azúcar.',
      vit_coleccion: 'Colección {a}/{b}', vit_nivel: 'Nivel {n}', vit_comprar: 'Hornear · {p}', vit_confirmar: '¿Hornear por {p}?',
      vit_falta: 'Te faltan {p} monedas', vit_comprado: '¡{t} ya está en tu vitrina!', vit_mesas: 'Mesas del obrador',
      vit_mesas_sub: 'Cambia el aspecto de la mesa donde juegas.', vit_usar: 'Usar', vit_en_uso: 'En uso',
      rareza_comun: 'Común', rareza_especial: 'Especial', rareza_legendario: 'Legendario',
      // Logros
      log_sub: 'Cada logro da monedas de azúcar.', log_hecho: '¡Conseguido!', log_toast: 'Logro: {t}',
      // Ajustes
      aj_idioma: 'Idioma', aj_musica: 'Música', aj_efectos: 'Efectos de sonido', aj_voces: 'Voces',
      aj_borrar: 'Borrar progreso', aj_borrar_seguro: 'Sí, borrar todo', aj_borrar_aviso: 'Se perderán niveles, monedas, logros y vitrina. No se puede deshacer.',
      aj_cancelar: 'Cancelar', aj_borrado: 'Progreso borrado.', si: 'Sí', no: 'No',
      // Cuaderno
      c_titulo: 'Cuaderno del aprendiz', c_sub: 'Los controles, lo que has aprendido y las materias del reino.',
      c_repetir: 'Repetir la guía de este nivel', c_controles: 'Controles', c_notas: 'Tus notas · {a} de {b}',
      c_vacio: 'Aquí se guardará lo que aprendas en las guías de cada nivel.', c_materias: 'Materias', peso: 'peso {n}',
      c_atajos: '<b>Consejo:</b> puedes hacer el siguiente movimiento mientras termina una animación: se hará a continuación. Aquí no hay vuelta atrás: piensa antes de mover.',
      pista_v: 'Pista: vierte {o} en {d}. Arrástralo hasta allí, o toca uno y después el otro.',
      pista_g: 'Pista: toca {que} {de_o} para que la materia salga por su tubo hacia {d}.',
      pista_gv: 'Pista: primero gira la válvula para que apunte hacia {d}; después toca {que} {de_o}.',
      pista_mas: 'Si vuelves a pedir pista aquí, Grumble lo hará por ti.', p_hago: '¡Mira! Esta vez lo hago yo.',
      ctl_mover: 'Mover materia', ctl_mover_d: 'Arrastra un recipiente hasta otro, o toca uno y después el otro. Pasa la capa de arriba. Una flecha blanca marca dónde se puede echar.',
      ctl_grifo: 'Grifo · botón rosa', ctl_grifo_d: 'Vacía por el tubo lo que está ABAJO del recipiente.',
      ctl_valvula: 'Válvula · rueda dorada', ctl_valvula_d: 'Su flecha elige el tubo por el que sale el grifo. Tócala, gírala arrastrando o toca el tubo. Es gratis.',
      ctl_chimenea: 'Chimenea · botón lila', ctl_chimenea_d: 'Saca el vapor por arriba.',
      ctl_puente: 'Puentes y compuertas', ctl_puente_d: 'Cuadrado de color = cerrado. Marca verde = abierto. La línea de puntos te dice qué lo abre.',
      ctl_pide: 'Lo que pide un objetivo', ctl_pide_d: 'Cada circulito es una medida. Se rellenan al entregarlas.',
      ctl_deshacer_d: 'Vuelve atrás el último movimiento. Si el botón parpadea, por ahí ya no hay salida.',
      ctl_reiniciar_d: 'Deja el nivel como al principio.', ctl_pista_d: 'Te enseña con una flecha el movimiento exacto. Si la vuelves a pedir en el mismo momento, Grumble lo hace por ti.',
      // Nombres de recipientes
      f_frasco: 'frasco', f_cuenco: 'cuenco', f_matraz: 'matraz', f_capsula: 'cápsula', f_alambique: 'alambique',
      pos_izq: 'de la izquierda', pos_der: 'de la derecha', pos_centro: 'del centro',
      vacio: 'vacío', capacidad: 'Capacidad {n}', valvula_aria: 'Válvula: hacia {d}. Toca para cambiar',
      grifo_aria: 'Grifo {de_o}', chimenea_aria: 'Chimenea {de_o}', objetivo_aria: '{o}: {a} de {b} de {m}',
      tablero: 'Tablero alquímico',
      son_2: 'Música, efectos y voces', son_1: 'Efectos y voces, sin música', son_0: 'Silencio'
    },
    en: {
      juego: 'Sugar-Snap Bakery',
      lema: 'The sweetest alchemy in the kingdom',
      portada_texto: 'Move and transform magical matter to wake up the sleeping sweets of Auralia.',
      jugar: 'Play', seguir_nivel: 'Level {n}', todo_completo: 'Kingdom restored',
      vitrina: 'Showcase', logros: 'Achievements', ajustes: 'Settings', cuaderno: 'Notebook', tienda: 'Shop',
      volver: 'Back', cerrar: 'Close', siguiente: 'Next', saltar: 'Skip', saltar_guia: 'Skip guide',
      toca_seguir: 'Tap to continue', tu_turno: 'Your turn! Do it on the board',
      paso: 'Step {a} of {b}', anotado: 'Added to your notebook: {t}',
      monedas: 'Sugar coins', fragmentos: 'Fragments {n}/4',
      jugar_nivel: 'Play level {n}', reino_restaurado: 'Kingdom restored!',
      region: 'Region {n}', regiones_futuras: 'Regions III and IV', regiones_futuras_sub: 'Ice Cream Ruins · Floating City',
      nivel: 'LEVEL', desafio: 'CHALLENGE', nivel_aria: 'Level {n}: {t}', bloqueado: '(locked)',
      movimientos: 'Moves', dominio: 'Mastery', objetivos: 'Goals',
      deshacer: 'Undo', reiniciar: 'Restart', pista: 'Hint',
      cofre: 'Daily chest', cofre_listo: 'Chest ready!', cofre_manana: 'Come back tomorrow',
      cofre_titulo: 'Daily chest', cofre_racha: 'Streak: day {n} of 7', cofre_abrir: 'Open chest',
      cofre_premio: '+{m} coins', cofre_dulce: 'And a new sweet for your showcase: {t}!',
      cofre_explica: 'Come back every day: the prize grows with your streak. Day 7 brings a free sweet.',
      vapor: 'Steam!', fundido: 'Melted!', restaurado: 'Restored!',
      capsula_sin_boca: 'Capsules have no mouth: they are only filled and emptied through pipes.',
      vacio_origen: "It's empty: pick a container with matter to pour.",
      donas_tubos: "Donuts and pinwheels are fed through pipes: use the tap of the connected container.",
      callejon: "There's no way out from here. Undo your last move and try another path.",
      pierde_t_callejon: 'Dead end!', pierde_t_movs: 'Out of moves!', pierde_sub: 'You lost this round',
      pierde_callejon: "With the board like this, there's no way to wake every sweet. Give it another try!",
      pierde_movs: 'You ran out of moves before waking every sweet. Try again!',
      pierde_faltan: 'You have {a} moves left and need at least {b}. Try again!',
      pierde_consejo: 'Think before you move: order is everything. If you get stuck, the wand shows you the next step.',
      reintentar: 'Try again', deshacer_uno: 'Undo last move', movs_quedan: '{n} left',
      mapa_region: 'Region {n}', mapa_arrastra: 'Swipe to explore the kingdom',
      sin_solucion: 'This path has no solution anymore. Undo a move or restart.',
      atascado: 'Need a hand? Tap the wand for a hint.',
      objetivo_pide: '{o} needs {n} more {m}.', objetivo_vivo: '{o} is shining again.',
      p1_vasija: 'Look closely at {o}: what is on top needs to move.',
      p2_vasija: 'Pour from {o} into {d}.', p3_vasija: "I'll show you: from {o} into {d}.",
      p1_valvula: 'That valve decides the path. Where should it point?',
      p1_chimenea: 'That chimney has a job to do.', p1_grifo: 'Whatever comes out of that tap is the key.',
      p2_girar: 'Turn the valve towards {d} and open {que} of {o}.', p2_abrir: 'Open {que} of {o}.',
      p3_grifo: "I'll show you: {que} towards {d}.",
      el_grifo: 'the tap', la_chimenea: 'the chimney', grifo: 'tap', chimenea: 'chimney', valvula: 'valve',
      g_siguiente: 'Press "Next" to continue the guide.',
      g_valvula: 'First turn the golden valve, as the guide says.',
      g_trasvase: 'Almost: follow the guide and pour between the highlighted containers.',
      g_grifo: 'Almost: follow the guide and open the highlighted tap.',
      g_ruta: "The valve isn't pointing to the right place. Turn it first.",
      v_titulo: 'Restored!', v_titulo_jefe: 'Challenge complete!', v_sub: '{t} · {n} moves',
      v_fragmento: 'Fragment of the Primordial Heart!', v_fragmento_sub: 'You have {n} of 4.',
      s_resolucion: 'Solved', s_resolucion_d: 'Goal completed', s_dominio: 'Mastery', s_dominio_d: 'In {n} moves or fewer', s_ingenio: 'Cleverness',
      v_monedas: 'Coins earned', v_nuevo_dulce: 'New sweet in your showcase', v_dulce: "This level's sweet",
      v_ver_receta: 'See recipe', v_repetir: 'Replay', v_mapa: 'Map', v_siguiente: 'Level {n}', v_logros: 'Achievements unlocked',
      vit_sub: 'Every restored level gives you a sweet. The rest are baked with sugar coins.',
      vit_coleccion: 'Collection {a}/{b}', vit_nivel: 'Level {n}', vit_comprar: 'Bake · {p}', vit_confirmar: 'Bake for {p}?',
      vit_falta: 'You need {p} more coins', vit_comprado: '{t} is now in your showcase!', vit_mesas: 'Bakery tables',
      vit_mesas_sub: 'Change the look of the table you play on.', vit_usar: 'Use', vit_en_uso: 'In use',
      rareza_comun: 'Common', rareza_especial: 'Special', rareza_legendario: 'Legendary',
      log_sub: 'Every achievement gives sugar coins.', log_hecho: 'Unlocked!', log_toast: 'Achievement: {t}',
      aj_idioma: 'Language', aj_musica: 'Music', aj_efectos: 'Sound effects', aj_voces: 'Voices',
      aj_borrar: 'Reset progress', aj_borrar_seguro: 'Yes, erase everything', aj_borrar_aviso: 'Levels, coins, achievements and showcase will be lost. This cannot be undone.',
      aj_cancelar: 'Cancel', aj_borrado: 'Progress erased.', si: 'On', no: 'Off',
      c_titulo: "Apprentice's notebook", c_sub: "Controls, what you've learned and the kingdom's matters.",
      c_repetir: "Replay this level's guide", c_controles: 'Controls', c_notas: 'Your notes · {a} of {b}',
      c_vacio: "What you learn in each level's guide will be saved here.", c_materias: 'Matters', peso: 'weight {n}',
      c_atajos: '<b>Tip:</b> you can make your next move while an animation finishes: it will happen right after. There is no going back here: think before you move.',
      pista_v: 'Hint: pour {o} into {d}. Drag it there, or tap one and then the other.',
      pista_g: 'Hint: tap {que} {de_o} so the matter flows through its pipe to {d}.',
      pista_gv: 'Hint: first turn the valve so it points to {d}; then tap {que} {de_o}.',
      pista_mas: 'Ask for a hint again here and Grumble will do it for you.', p_hago: "Watch! I'll do this one.",
      ctl_mover: 'Move matter', ctl_mover_d: 'Drag a container onto another, or tap one and then the other. The top layer moves. A white arrow shows where you can pour.',
      ctl_grifo: 'Tap · pink button', ctl_grifo_d: 'Empties what is at the BOTTOM of the container through its pipe.',
      ctl_valvula: 'Valve · golden wheel', ctl_valvula_d: 'Its arrow picks the pipe the tap uses. Tap it, drag it around or tap the pipe. It is free.',
      ctl_chimenea: 'Chimney · lilac button', ctl_chimenea_d: 'Lets steam out from the top.',
      ctl_puente: 'Bridges and gates', ctl_puente_d: 'Colored square = closed. Green check = open. The dotted line shows what opens it.',
      ctl_pide: 'What a goal needs', ctl_pide_d: 'Each little circle is one measure. They fill up as you deliver them.',
      ctl_deshacer_d: 'Takes back your last move. If the button blinks, there is no way out from there.',
      ctl_reiniciar_d: 'Puts the level back to the start.', ctl_pista_d: 'Shows you the exact move with an arrow. Ask again at the same moment and Grumble does it for you.',
      f_frasco: 'jar', f_cuenco: 'bowl', f_matraz: 'flask', f_capsula: 'capsule', f_alambique: 'still',
      pos_izq: 'on the left', pos_der: 'on the right', pos_centro: 'in the middle',
      vacio: 'empty', capacidad: 'Capacity {n}', valvula_aria: 'Valve: towards {d}. Tap to change',
      grifo_aria: 'Tap of {o}', chimenea_aria: 'Chimney of {o}', objetivo_aria: '{o}: {a} of {b} {m}',
      tablero: 'Alchemy board',
      son_2: 'Music, effects and voices', son_1: 'Effects and voices, no music', son_0: 'Muted'
    }
  };

  // Mensajes del motor (por código)
  var MOTOR = {
    es: { distintos: 'Elige dos recipientes distintos.', capsula: 'La cápsula está cerrada: sólo se llena y vacía por tubos.',
      vacio: 'Ese recipiente está vacío.', sello_origen: 'Tiene un sello de chocolate duro. Fúndelo con caramelo.',
      vapor_verter: 'El vapor no se puede verter: sólo sube por las chimeneas.', sello_destino: 'Sello de chocolate duro: sólo el Caramelo Ígneo lo funde.',
      lleno: 'No cabe: el recipiente está lleno.', sin_materia: 'No queda materia en ese recipiente.',
      chimenea_sellada: 'La chimenea está sellada con chocolate duro. Fúndelo con caramelo.', chimenea_vapor: 'Por la chimenea sólo sube el vapor.',
      vapor_baja: 'El vapor no baja por los tubos: busca una chimenea.', cristal: 'Los tubos de cristal sólo conducen la Menta Fluida.',
      cerrado_chocolate: 'Un bloque de chocolate tapa el tubo: sólo el caramelo lo funde.', cerrado_regaliz: 'Falta el puente de regaliz: hay que hacerlo brotar con Matcha.',
      cerrado_puente: 'El puente está cerrado: busca qué báscula lo levanta.', cerrado_compuerta: 'La compuerta está cerrada: sigue la línea rosa para ver qué la abre.',
      rechaza: '{o} no quiere {m}.', completo: 'Ya está restaurado: no necesita más.' },
    en: { distintos: 'Pick two different containers.', capsula: 'The capsule is closed: it is only filled and emptied through pipes.',
      vacio: 'That container is empty.', sello_origen: 'It has a hard chocolate seal. Melt it with caramel.',
      vapor_verter: "Steam can't be poured: it only rises through chimneys.", sello_destino: 'Hard chocolate seal: only Fiery Caramel melts it.',
      lleno: "It doesn't fit: the container is full.", sin_materia: 'There is no matter left in that container.',
      chimenea_sellada: 'The chimney is sealed with hard chocolate. Melt it with caramel.', chimenea_vapor: 'Only steam goes up the chimney.',
      vapor_baja: "Steam doesn't go down pipes: look for a chimney.", cristal: 'Crystal pipes only carry Flowing Mint.',
      cerrado_chocolate: 'A chocolate block plugs the pipe: only caramel melts it.', cerrado_regaliz: 'The licorice bridge is missing: sprout it with Matcha.',
      cerrado_puente: 'The bridge is closed: find which scale lifts it.', cerrado_compuerta: 'The gate is closed: follow the pink line to see what opens it.',
      rechaza: "{o} doesn't want {m}.", completo: 'Already restored: it needs nothing else.' }
  };

  var MATERIAS = {
    es: { C: ['Caramelo Ígneo', 'Calor', 'Funde el chocolate duro. En el alambique, con Menta, se vuelve vapor.'],
      M: ['Menta Fluida', 'Flujo', 'La única que viaja por tubos de cristal.'],
      G: ['Matcha Vital', 'Vida', 'Hace brotar puentes de regaliz en las semillas.'],
      U: ['Uva Galáctica', 'Gravedad', 'Pesa el doble y se hunde al fondo.'],
      V: ['Vapor de Azúcar', 'Empuje', 'Pesa 0, sube arriba y sólo sale por chimeneas.'] },
    en: { C: ['Fiery Caramel', 'Heat', 'Melts hard chocolate. In the still, with Mint, it turns into steam.'],
      M: ['Flowing Mint', 'Flow', 'The only one that travels through crystal pipes.'],
      G: ['Vital Matcha', 'Life', 'Sprouts licorice bridges from seeds.'],
      U: ['Galactic Grape', 'Gravity', 'Weighs double and sinks to the bottom.'],
      V: ['Sugar Steam', 'Lift', 'Weighs 0, rises to the top and only leaves through chimneys.'] }
  };

  var PERSONAJES = { es: { grumble: 'Maestro Grumble', miga: 'Miga', zippy: 'Zippy', zappy: 'Zappy' },
    en: { grumble: 'Master Grumble', miga: 'Miga', zippy: 'Zippy', zappy: 'Zappy' } };

  // Prólogo y epílogo (las frases de cada nivel están en niveles.js / niveles_en.js)
  var HISTORIA = {
    es: {
      prologo: [['grumble', 'Auralia era el reino más dulce del mundo, hasta que el Corazón Primordial se partió en cuatro fragmentos.'],
        ['grumble', 'Sin él, las donas se durmieron, los ríos de glaseado se apagaron y el color se fue escapando del mapa.'],
        ['miga', '¿Y un aprendiz de pastelero puede arreglar eso?'],
        ['grumble', 'Un aprendiz de alquimista, sí. Y todo empieza aquí, en la Sugar-Snap Bakery, la pastelería de mi familia.']],
      epilogo: '¡Los cuatro fragmentos han vuelto! El Corazón Primordial late otra vez y Auralia recupera todos sus colores. Gracias, alquimista.'
    },
    en: {
      prologo: [['grumble', 'Auralia was the sweetest kingdom in the world, until the Primordial Heart broke into four fragments.'],
        ['grumble', 'Without it, the donuts fell asleep, the frosting rivers went dark and the color slowly drained from the map.'],
        ['miga', 'And can a pastry apprentice fix that?'],
        ['grumble', "An alchemy apprentice can. And it all starts here, at Sugar-Snap Bakery, my family's bakery."]],
      epilogo: 'All four fragments are back! The Primordial Heart beats again and Auralia gets all its colors back. Thank you, alchemist.'
    }
  };

  // Frases cortas de los personajes (con voz)
  var FRASES = {
    bienvenida: ['grumble', '¡Bienvenido a la Sugar-Snap Bakery!', 'Welcome to Sugar-Snap Bakery!'],
    genial: ['zippy', '¡Genial!', 'Awesome!'],
    bien_hecho: ['zappy', '¡Muy bien hecho!', 'Nicely done!'],
    desperto: ['miga', '¡Ha despertado!', 'It woke up!'],
    uy: ['zippy', '¡Uy! Así no.', 'Oops! Not like that.'],
    cofre: ['zappy', '¡Un regalo dulce para ti!', 'A sweet gift for you!'],
    logro: ['zippy', '¡Logro desbloqueado!', 'Achievement unlocked!'],
    ayuda: ['zappy', '¿Te echo una mano? Toca la varita.', 'Need a hand? Tap the wand.'],
    victoria: ['grumble', '¡Así se hace, aprendiz!', "That's the way, apprentice!"],
    perder: ['grumble', '¡Oh, no! Respira hondo e inténtalo otra vez.', 'Oh no! Take a deep breath and try again.']
  };

  var NOTAS = [
    ['objetivos', ['Lo que pide cada objetivo', 'Los circulitos bajo una dona dicen cuántas medidas necesita y de qué materia (el icono de color).'], ['What each goal needs', 'The little circles under a donut show how many measures it needs and of which matter (the colored icon).']],
    ['trasvasar', ['Trasvasar', 'Arrastra de un recipiente a otro, o toca uno y luego el otro. Se mueve la capa de arriba, hasta donde quepa.'], ['Pouring', 'Drag one container onto another, or tap one and then the other. The top layer moves, as much as fits.']],
    ['grifo', ['Grifo (botón rosa)', 'Vacía el recipiente por su tubo. Cuenta como un movimiento.'], ['Tap (pink button)', 'Empties the container through its pipe. It counts as one move.']],
    ['abajo', ['El grifo saca lo de abajo', 'Por el grifo siempre sale primero la capa del fondo. Lo de arriba espera su turno.'], ['The tap takes from the bottom', 'The bottom layer always comes out of the tap first. What is on top waits its turn.']],
    ['valvula', ['Válvula (rueda dorada)', 'Su flecha elige por qué tubo sale el grifo. Girarla es gratis. También puedes tocar el tubo que quieres usar.'], ['Valve (golden wheel)', 'Its arrow picks which pipe the tap uses. Turning it is free. You can also tap the pipe you want.']],
    ['bascula', ['Báscula y puente', 'Cuando el peso llega al número del marcador (por ejemplo 2/2), su puente se abre y aparece una marca verde.'], ['Scale and bridge', 'When the weight reaches the number on the counter (for example 2/2), its bridge opens and a green check appears.']],
    ['contrapeso', ['El puente puede cerrarse', 'Si vacías la báscula y pierde peso, su puente vuelve a bajar. El orden importa.'], ['The bridge can close', 'If you empty the scale and it loses weight, its bridge goes back down. Order matters.']],
    ['capsula', ['Cápsula', 'No tiene boca: sólo se llena y se vacía por tubos.'], ['Capsule', 'It has no mouth: it is only filled and emptied through pipes.']],
    ['alambique', ['Alambique: receta del vapor', 'Tiene fuego debajo. Dentro, 1 Caramelo + 1 Menta = 2 Vapor de Azúcar.'], ['Still: the steam recipe', 'It has a fire underneath. Inside it, 1 Caramel + 1 Mint = 2 Sugar Steam.']],
    ['chimenea', ['Chimenea (botón lila)', 'Saca el vapor por arriba. El molinillo gira con vapor.'], ['Chimney (lilac button)', 'Lets steam out from the top. The pinwheel spins with steam.']],
    ['compuerta', ['Compuerta de estrella', 'Se abre al restaurar el objetivo unido a ella por la línea rosa.'], ['Star gate', 'It opens when you restore the goal linked to it by the pink line.']],
    ['sello', ['Sello de chocolate', 'Tapa la boca y la chimenea. Verter Caramelo encima lo funde y gasta 1 medida.'], ['Chocolate seal', 'Blocks the mouth and the chimney. Pouring Caramel on it melts it and uses 1 measure.']],
    ['regaliz', ['Puente de regaliz', 'El hueco punteado se llena de regaliz al alimentar la Semilla de Matcha.'], ['Licorice bridge', 'The dotted gap fills with licorice when you feed the Matcha Seed.']],
    ['cristal', ['Tubo de cristal', 'El tubo azul claro sólo deja pasar la Menta Fluida.'], ['Crystal pipe', 'The light blue pipe only lets Flowing Mint through.']],
    ['matraz', ['Matraz', 'Cuello estrecho: entra y sale de una medida en una. Sirve para dosificar.'], ['Flask', 'Narrow neck: things go in and out one measure at a time. Great for measuring.']],
    ['uva', ['Uva Galáctica', 'Pesa 2 por medida en las básculas.'], ['Galactic Grape', 'Weighs 2 per measure on scales.']],
    ['limite', ['Movimientos contados', 'A partir del nivel 4 cada nivel tiene un máximo de movimientos (marcador 3/8). Si se acaban, o si el tablero se queda sin salida, se pierde y se vuelve a intentar.'], ['Counted moves', 'From level 4 on, every level has a maximum number of moves (counter 3/8). If they run out, or the board reaches a dead end, you lose and try again.']],
    ['hundir', ['La uva se hunde', 'Se coloca debajo de las demás materias, así que sale la primera por el grifo.'], ['Grape sinks', 'It settles below the other matters, so it comes out of the tap first.']]
  ];

  // Vitrina: 12 dulces se ganan en los niveles; el resto se hornea con monedas.
  // [id, nombre ES, nombre EN, nivel que lo regala o 0, precio, rareza]
  var VITRINA = [
    ['p01', 'Dona de Caramelo Salado', 'Salted Caramel Donut', 1, 0, 'comun'],
    ['p02', 'Dona de Vainilla Dorada', 'Golden Vanilla Donut', 2, 0, 'comun'],
    ['p03', 'Dona de Menta y Chocolate', 'Mint Choco Donut', 3, 0, 'comun'],
    ['p04', 'Dona de Chocolate', 'Chocolate Donut', 4, 0, 'comun'],
    ['p05', 'Dona de Limón', 'Lemon Zest Donut', 5, 0, 'comun'],
    ['p06', 'Tarta de Caramelo Salado', 'Salted Caramel Cake', 6, 0, 'especial'],
    ['p07', 'Dona de Matcha', 'Matcha Donut', 7, 0, 'comun'],
    ['p08', 'Dona de Arándano Eléctrico', 'Electric Blueberry Donut', 8, 0, 'comun'],
    ['p09', 'Macaron de Frambuesa Neón', 'Neon Raspberry Macaron', 9, 0, 'especial'],
    ['p10', 'Dona Galáctica', 'Galaxy Glazed Donut', 10, 0, 'especial'],
    ['p11', 'Tarta Red Velvet', 'Red Velvet Cake', 11, 0, 'especial'],
    ['p12', 'Tarta de Uva Galáctica', 'Galactic Grape Cake', 12, 0, 'legendario'],
    ['p13', 'Dona Red Velvet', 'Red Velvet Donut', 0, 40, 'comun'],
    ['p14', 'Dona de Fresa con Confites', 'Strawberry Sprinkle Donut', 0, 40, 'comun'],
    ['p15', 'Dona Capuchino', 'Cappuccino Donut', 0, 50, 'comun'],
    ['p16', 'Dona Rosa Glaseada', 'Pink Glazed Donut', 0, 40, 'comun'],
    ['p17', 'Macaron de Lima', 'Lime Macaron', 0, 60, 'especial'],
    ['p18', 'Macaron de Lavanda', 'Lavender Macaron', 0, 60, 'especial'],
    ['p19', 'Tarta de Té Matcha', 'Matcha Tea Cake', 0, 70, 'especial'],
    ['p20', 'Tarta de Arándanos', 'Blueberry Cake', 0, 70, 'especial'],
    ['p21', 'Tiramisú', 'Tiramisu', 0, 80, 'especial'],
    ['p22', 'Tiramisú Doble', 'Double Tiramisu', 0, 120, 'legendario'],
    ['p23', 'Tarta de Vainilla', 'Vanilla Sponge Cake', 0, 50, 'comun'],
    ['p24', 'Tarta de Fresa Glaseada', 'Strawberry Frosted Cake', 0, 60, 'comun'],
    ['p25', 'Tarta de Melocotón', 'Peach Cream Cake', 0, 70, 'especial'],
    ['p26', 'Tarta de Limón', 'Lemon Layer Cake', 0, 60, 'comun'],
    ['p27', 'Tarta de Fiesta de Fresa', 'Strawberry Party Cake', 0, 90, 'especial'],
    ['p28', 'Tarta de Naranja y Chocolate', 'Orange Choco Cake', 0, 100, 'especial'],
    ['p29', 'Tarta de Menta', 'Mint Chocolate Cake', 0, 100, 'especial'],
    ['p30', 'Tarta Triple Chocolate', 'Triple Chocolate Cake', 0, 150, 'legendario']
  ];

  // Mesas del obrador (aspecto del tablero)
  var MESAS = [
    ['madera', 'Madera de roble', 'Oak wood', 0],
    ['menta', 'Baldosas de menta', 'Mint tiles', 80],
    ['chocolate', 'Chocolate negro', 'Dark chocolate', 120],
    ['galaxia', 'Noche galáctica', 'Galactic night', 200]
  ];

  // Logros: [id, título ES, descripción ES, título EN, descripción EN, monedas, meta numérica (o 0)]
  var LOGROS = [
    ['primer_trasvase', 'Primer trasvase', 'Haz tu primer trasvase.', 'First pour', 'Make your first pour.', 10, 0],
    ['despertar', 'Buenos días, dona', 'Restaura tu primer objetivo.', 'Good morning, donut', 'Restore your first goal.', 10, 0],
    ['perfecto', 'Tres sellos', 'Consigue Resolución, Dominio e Ingenio en un nivel.', 'Three seals', 'Get Solved, Mastery and Cleverness in one level.', 20, 0],
    ['sin_ayuda', 'Aprendiz autónomo', 'Gana 3 niveles seguidos sin pistas.', 'Independent apprentice', 'Win 3 levels in a row without hints.', 30, 3],
    ['sin_vuelta', 'A la primera', 'Gana un nivel de 4 o más movimientos sin reiniciar ni perder.', 'First try', 'Win a level of 4 or more moves without restarting or losing.', 20, 0],
    ['rapido', 'Mano rápida', 'Gana un nivel en menos de 30 segundos.', 'Quick hands', 'Win a level in under 30 seconds.', 20, 0],
    ['vaporista', 'Maestro del vapor', 'Crea vapor 10 veces.', 'Steam master', 'Make steam 10 times.', 25, 10],
    ['fundidor', 'Fundidor de chocolate', 'Funde 3 sellos o bloques de chocolate.', 'Chocolate melter', 'Melt 3 chocolate seals or blocks.', 20, 3],
    ['region1', 'La Sugar-Snap brilla', 'Completa la Región I.', 'Sugar-Snap shines', 'Complete Region I.', 50, 0],
    ['region2', 'El bosque respira', 'Completa la Región II.', 'The forest breathes', 'Complete Region II.', 80, 0],
    ['region3', 'Deshielo', 'Completa la Región III.', 'The thaw', 'Complete Region III.', 120, 0],
    ['region4', 'El Corazón late', 'Completa la Región IV y reúne los 4 fragmentos.', 'The Heart beats', 'Complete Region IV and gather all 4 fragments.', 200, 0],
    ['tenaz', 'Tenaz', 'Gana un nivel después de haberlo perdido.', 'Tenacious', 'Win a level after losing it.', 20, 0],
    ['perfeccionista', 'Perfeccionista', 'Consigue los 3 sellos en 12 niveles.', 'Perfectionist', 'Get all 3 seals in 12 levels.', 150, 12],
    ['estudioso', 'Estudioso', 'Desbloquea 10 notas del cuaderno.', 'Studious', 'Unlock 10 notebook notes.', 20, 10],
    ['constante', 'Constante', 'Abre el cofre diario 3 días seguidos.', 'Consistent', 'Open the daily chest 3 days in a row.', 30, 3],
    ['coleccionista', 'Coleccionista', 'Ten 15 dulces en la vitrina.', 'Collector', 'Have 15 sweets in your showcase.', 40, 15],
    ['goloso', 'Gran goloso', 'Completa la vitrina con los 30 dulces.', 'Sweet tooth', 'Fill the showcase with all 30 sweets.', 150, 30]
  ];

  var COFRE = [15, 20, 25, 30, 40, 50, 80];

  var datos = { UI: UI, MOTOR: MOTOR, MATERIAS: MATERIAS, PERSONAJES: PERSONAJES, HISTORIA: HISTORIA, FRASES: FRASES,
    NOTAS: NOTAS, VITRINA: VITRINA, MESAS: MESAS, LOGROS: LOGROS, COFRE: COFRE };
  if (typeof module !== 'undefined' && module.exports) module.exports = datos;
  else global.TEXTOS = datos;
})(this);
