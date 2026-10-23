/* ALQUIMIA · Datos de niveles. Tablero en coordenadas de 360 x 600.
   Vasijas: x,y = centro de la base. Objetivos: x,y = centro.
   Rutas de grifo: 'via' son los codos del tubo entre la válvula y la entrada del destino.
   'minimo' es la solución más corta; herramientas/verificar_niveles.js comprueba que sigue siendo cierta. */
(function (global) {
  'use strict';

  var REGIONES = [
    { id: 1, nombre: 'La Pastelería Sugar-Snap', fondo: 'assets/fondo_obrador.jpg',
      lema: 'Válvulas, básculas y la primera receta' },
    { id: 2, nombre: 'El Bosque de Algodón Cristalino', fondo: 'assets/fondo_bosque.jpg',
      lema: 'Raíces de regaliz, cristales y gravedad' },
    { id: 3, nombre: 'Las Ruinas del Helado', lema: 'Ordenar, dosificar y pensar dos pasos por delante' },
    { id: 4, nombre: 'La Ciudad Suspendida', lema: 'Gravedad, básculas y todo combinado' }
  ];

  var NIVELES = [
    // ───────────── REGIÓN I · EL OBRADOR OLVIDADO ─────────────
    {
      id: 1, region: 1, libre: true, titulo: 'El primer trasvase', receta: 1, minimo: 2,
      ensena: 'Toca un frasco y después otro para trasvasar. Toca el grifo para vaciar por el fondo.',
      intro: [
        { q: 'grumble', t: '¡Por fin llega un aprendiz! La Sugar-Snap lleva cien años a oscuras desde que el Corazón Primordial se rompió.' },
        { q: 'miga', t: '¡Quiero ayudar! ¿Por dónde empiezo?' }
      ],
      guia: [
        { q: 'grumble', t: 'Esta dona está dormida. Los 3 circulitos de debajo dicen lo que pide: 3 medidas de Caramelo, la materia con la llama naranja.', foco: ['T1'], nota: 'objetivos' },
        { q: 'grumble', t: 'El caramelo está en el frasco de la izquierda, pero el tubo que llega a la dona sale del frasco de la derecha.', foco: ['A', 'B'] },
        { q: 'zippy', t: 'Arrastra el frasco de la izquierda hasta el de la derecha. También vale tocar uno y después el otro.', foco: ['A', 'B'], espera: { t: 'v', a: 'A', b: 'B' }, nota: 'trasvasar' },
        { q: 'zippy', t: '¡Eso es! Ahora toca el botón rosa: es el grifo, y vacía el frasco por su tubo.', foco: ['gB'], espera: { t: 'g', g: 'gB' }, nota: 'grifo' }
      ],
      fin: { q: 'grumble', t: '¡Mira cómo brilla! Cada cosa que despiertas devuelve un trocito de magia al reino.' },
      ingenio: { tipo: 'sinPistas', txt: 'Resolver sin pistas' },
      vasijas: [
        { id: 'A', forma: 'frasco', cap: 3, capas: ['C', 'C', 'C'], x: 105, y: 320 },
        { id: 'B', forma: 'frasco', cap: 3, capas: [], x: 245, y: 320 }
      ],
      grifos: [
        { id: 'gB', de: 'B', lado: 'abajo', sale: 'der', rutas: [{ a: 'T1', via: [[300, 310], [300, 410], [180, 410]] }] }
      ],
      objetivos: [
        { id: 'T1', tipo: 'dona', img: 'dona_caramelo', materia: 'C', necesita: 3, x: 180, y: 500, nombre: 'La Dona de Caramelo' }
      ]
    },
    {
      id: 2, region: 1, libre: true, titulo: 'Lo que tapa la salida', receta: 2, minimo: 2,
      ensena: 'Una válvula decide por dónde sale la materia. Tócala para cambiar el camino.',
      intro: [
        { q: 'zippy', t: '¡Hola, hola! Soy Zippy, y ese de ahí es mi hermano Zappy. Hoy te enseñamos un truco nuevo.' }
      ],
      guia: [
        { q: 'zippy', t: 'Mira este frasco: abajo del todo hay Menta (la gota turquesa) y encima hay Caramelo (la llama).', foco: ['B'] },
        { q: 'zappy', t: 'El grifo siempre saca lo que está ABAJO. Si lo abres ahora saldría la Menta, y la dona sólo quiere Caramelo.', foco: ['gB', 'T1'], nota: 'abajo' },
        { q: 'zappy', t: 'La rueda dorada es la válvula: su flecha elige por qué tubo sale. Tócala para que apunte hacia la Reserva.', foco: ['v-gB', 'D'], espera: { t: 'valv', g: 'gB', r: 1 }, nota: 'valvula' },
        { q: 'zippy', t: '¡La flecha va a la Reserva! Ahora abre el grifo rosa para apartar la Menta.', foco: ['gB'], espera: { t: 'g', g: 'gB', r: 1 } },
        { q: 'zippy', t: 'La Menta está guardada y el Caramelo ha quedado abajo. Gira la válvula hacia la dona.', foco: ['v-gB', 'T1'], espera: { t: 'valv', g: 'gB', r: 0 } },
        { q: 'zappy', t: 'Último paso: abre el grifo.', foco: ['gB'], espera: { t: 'g', g: 'gB', r: 0 } }
      ],
      fin: { q: 'zappy', t: 'La menta se quedó guardada y el caramelo llegó a su sitio. ¡Así se usa una válvula!' },
      ingenio: { tipo: 'sinTrasvasar', txt: 'No trasvasar a mano' },
      vasijas: [
        { id: 'B', forma: 'frasco', cap: 3, capas: ['M', 'C', 'C'], x: 170, y: 290 },
        { id: 'D', forma: 'frasco', cap: 3, capas: [], x: 290, y: 470, nombre: 'Reserva' }
      ],
      grifos: [
        { id: 'gB', de: 'B', lado: 'abajo', sale: 'der', valvula: [228, 280], rutas: [
          { a: 'T1', via: [[228, 420], [85, 420]] },
          { a: 'D', via: [[228, 350], [290, 350]] }
        ] }
      ],
      objetivos: [
        { id: 'T1', tipo: 'dona', img: 'dona_caramelo', materia: 'C', necesita: 2, x: 85, y: 505, nombre: 'La Dona de Caramelo' }
      ]
    },
    {
      id: 3, region: 1, libre: true, titulo: 'Peso que levanta puentes', receta: 3, minimo: 2,
      ensena: 'Las básculas cuentan el peso de lo que hay encima. Al llegar al umbral, levantan su puente.',
      intro: [
        { q: 'grumble', t: 'Hoy aprenderás a usar el peso a tu favor.' }
      ],
      guia: [
        { q: 'grumble', t: 'Ese cuadrado dorado con la balanza es un puente cerrado: corta el tubo que va a la Dona de Menta.', foco: ['P'] },
        { q: 'grumble', t: 'Lo abre la báscula del cuenco. Su marcador dice 0/2: tiene que pesar 2 o más.', foco: ['S'], nota: 'bascula' },
        { q: 'zippy', t: 'Abajo del frasco hay 2 de Caramelo, y cada medida pesa 1. La válvula ya apunta al cuenco: abre el grifo.', foco: ['gA', 'S'], espera: { t: 'g', g: 'gA', r: 0 } },
        { q: 'grumble', t: 'Peso 2: ¡el puente se ha abierto (marca verde)! Ahora gira la válvula hacia la dona.', foco: ['P', 'v-gA'], espera: { t: 'valv', g: 'gA', r: 1 } },
        { q: 'zippy', t: 'Y abre el grifo para que la Menta cruce el puente.', foco: ['gA'], espera: { t: 'g', g: 'gA', r: 1 } }
      ],
      fin: { q: 'grumble', t: 'Lo que estorbaba se convirtió en la llave. Así piensa un alquimista.' },
      ingenio: { tipo: 'sinTrasvasar', txt: 'No trasvasar a mano' },
      vasijas: [
        { id: 'A', forma: 'frasco', cap: 5, capas: ['C', 'C', 'M', 'M', 'M'], x: 180, y: 250 },
        { id: 'S', forma: 'cuenco', cap: 4, capas: [], x: 75, y: 460, bascula: { umbral: 2, abre: ['P'] } }
      ],
      grifos: [
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'der', valvula: [236, 240], rutas: [
          { a: 'S', via: [[236, 300], [75, 300]] },
          { a: 'T2', via: [[236, 420], [280, 420]] }
        ] }
      ],
      compuertas: [{ id: 'P', tipo: 'puente', ruta: ['gA', 1], en: 0.55 }],
      objetivos: [
        { id: 'T2', tipo: 'dona', img: 'dona_menta', materia: 'M', necesita: 3, x: 280, y: 505, nombre: 'La Dona de Menta' }
      ]
    },
    {
      id: 4, region: 1, titulo: 'Contrapeso', receta: 4, minimo: 3,
      ensena: 'Si una báscula pierde peso, su puente vuelve a bajar. El orden importa.',
      intro: [
        { q: 'zappy', t: 'Dos donas a la vez. Esto se pone interesante.' }
      ],
      guia: [
        { q: 'zappy', t: 'La cápsula de la báscula ya pesa 3: por eso su puente está abierto (marca verde).', foco: ['S', 'P'] },
        { q: 'grumble', t: 'Si vacías la cápsula, pierde peso y el puente vuelve a cerrarse. Piensa bien el orden.', foco: ['gS', 'P'], nota: 'contrapeso' },
        { q: 'zippy', t: 'Las cápsulas no tienen boca: sólo se llenan y se vacían por tubos.', foco: ['S'], nota: 'capsula' },
        { q: 'zappy', t: 'Desde aquí los movimientos están contados: mira el marcador de arriba. Si se acaban antes de despertar los dulces, se pierde la partida.', nota: 'limite' }
      ],
      fin: { q: 'miga', t: '¡Primero cruzar el puente, después vaciar el contrapeso!' },
      ingenio: { tipo: 'vacia', id: 'A', txt: 'Dejar vacío el frasco de origen' },
      vasijas: [
        { id: 'A', forma: 'frasco', cap: 4, capas: ['C', 'M', 'M', 'M'], x: 100, y: 250 },
        { id: 'S', forma: 'capsula', cap: 5, capas: ['C', 'C', 'C'], x: 265, y: 330, bascula: { umbral: 3, abre: ['P'] } }
      ],
      grifos: [
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'der', valvula: [158, 240], rutas: [
          { a: 'S', via: [[158, 165], [265, 165]] },
          { a: 'T2', via: [[158, 420], [90, 420]] }
        ] },
        { id: 'gS', de: 'S', lado: 'abajo', sale: 'der', rutas: [{ a: 'T1', via: [[316, 320], [316, 420], [270, 420]] }] }
      ],
      compuertas: [{ id: 'P', tipo: 'puente', ruta: ['gA', 1], en: 0.5 }],
      objetivos: [
        { id: 'T2', tipo: 'dona', img: 'dona_menta', materia: 'M', necesita: 3, x: 90, y: 505, nombre: 'La Dona de Menta' },
        { id: 'T1', tipo: 'dona', img: 'dona_caramelo', materia: 'C', necesita: 3, x: 270, y: 505, nombre: 'La Dona de Caramelo' }
      ]
    },
    {
      id: 5, region: 1, titulo: 'Primera receta: vapor', receta: 5, minimo: 3,
      ensena: 'En el alambique, Caramelo + Menta = 2 Vapor de Azúcar. El vapor pesa 0, sube y sólo sale por chimeneas.',
      intro: [
        { q: 'grumble', t: 'Ha llegado el momento de tu primera receta.' }
      ],
      guia: [
        { q: 'grumble', t: 'Esto es un alambique: tiene fuego debajo. Dentro, 1 Caramelo + 1 Menta se convierten en 2 de Vapor.', foco: ['R'], nota: 'alambique' },
        { q: 'zippy', t: 'El vapor sube y sale por la chimenea: el botón lila de arriba. El molinillo gira con él.', foco: ['cR', 'TV'], nota: 'chimenea' },
        { q: 'zappy', t: 'La estrella rosa es una compuerta. Se abre cuando el molinillo vuelve a girar (mira la línea rosa).', foco: ['K'], nota: 'compuerta' }
      ],
      fin: { q: 'grumble', t: '¡Tu primera receta! Ya la tienes apuntada en el recetario.' },
      ingenio: { tipo: 'sinPistas', txt: 'Resolver sin pistas' },
      vasijas: [
        { id: 'A', forma: 'frasco', cap: 2, capas: ['M'], x: 70, y: 330 },
        { id: 'R', forma: 'alambique', cap: 4, capas: ['C', 'C', 'C'], x: 185, y: 330 }
      ],
      grifos: [
        { id: 'cR', de: 'R', lado: 'arriba', sale: 'der', rutas: [{ a: 'TV', via: [[290, 205]] }] },
        { id: 'gR', de: 'R', lado: 'abajo', sale: 'der', rutas: [{ a: 'T1', via: [[245, 320], [245, 420], [185, 420]] }] }
      ],
      compuertas: [{ id: 'K', tipo: 'compuerta', ruta: ['gR', 0], en: 0.55 }],
      objetivos: [
        { id: 'TV', tipo: 'turbina', materia: 'V', necesita: 2, x: 290, y: 130, nombre: 'El Molinillo de Merengue', alCompletar: { abre: ['K'] } },
        { id: 'T1', tipo: 'dona', img: 'dona_caramelo', materia: 'C', necesita: 2, x: 185, y: 505, nombre: 'La Dona de Caramelo' }
      ]
    },
    {
      id: 6, region: 1, jefe: true, titulo: 'El Horno Ancestral', receta: 6, minimo: 5,
      ensena: 'Un sello de chocolate duro tapa la boca y la chimenea. Una medida de caramelo vertida encima lo funde (y se gasta).',
      intro: [
        { q: 'grumble', t: 'El Horno Ancestral. Mi abuela horneaba aquí el pastel del Corazón Primordial.' }
      ],
      guia: [
        { q: 'grumble', t: 'El alambique tiene un sello de chocolate duro: tapa la boca y la chimenea.', foco: ['B'], nota: 'sello' },
        { q: 'zippy', t: 'Verter Caramelo encima lo funde, pero gasta 1 medida. ¡La Chispa está ahí justo para eso!', foco: ['K', 'B'] },
        { q: 'zappy', t: 'El horno necesita el puente de la báscula y la compuerta del molinillo. Usa todo lo aprendido.', foco: ['P', 'Q'] }
      ],
      fin: { q: 'grumble', t: '¡El horno arde otra vez! Aquí dentro estaba el primer Fragmento del Corazón.' },
      ingenio: { tipo: 'sinPistas', txt: 'Resolver sin pistas' },
      vasijas: [
        { id: 'K', forma: 'frasco', cap: 1, capas: ['C'], x: 215, y: 125, nombre: 'Chispa' },
        { id: 'Mv', forma: 'frasco', cap: 1, capas: ['M'], x: 290, y: 125 },
        { id: 'A', forma: 'frasco', cap: 3, capas: ['C', 'C', 'C'], x: 245, y: 290 },
        { id: 'B', forma: 'alambique', cap: 5, capas: ['C', 'C', 'C'], x: 135, y: 330, sellada: true },
        { id: 'S', forma: 'capsula', cap: 4, capas: [], x: 300, y: 520, bascula: { umbral: 2, abre: ['P'] } }
      ],
      grifos: [
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'der', rutas: [{ a: 'S', via: [[300, 280]] }] },
        { id: 'cB', de: 'B', lado: 'arriba', sale: 'izq', rutas: [{ a: 'TV', via: [[50, 196]] }] },
        { id: 'gB', de: 'B', lado: 'abajo', sale: 'izq', rutas: [{ a: 'T1', via: [[78, 320], [78, 445], [125, 445]] }] }
      ],
      compuertas: [
        { id: 'P', tipo: 'puente', ruta: ['gB', 0], en: 0.45 },
        { id: 'Q', tipo: 'compuerta', ruta: ['gB', 0], en: 0.82 }
      ],
      objetivos: [
        { id: 'TV', tipo: 'turbina', materia: 'V', necesita: 2, x: 50, y: 92, nombre: 'El Molinillo de Merengue', alCompletar: { abre: ['Q'] } },
        { id: 'T1', tipo: 'dona', img: 'dona_caramelo', materia: 'C', necesita: 2, x: 125, y: 525, nombre: 'El Horno Ancestral', grande: true }
      ]
    },

    // ───────────── REGIÓN II · EL BOSQUE DE ALGODÓN CRISTALINO ─────────────
    {
      id: 7, region: 2, titulo: 'Brotes de regaliz', receta: 7, minimo: 3,
      ensena: 'La Matcha Vital hace brotar puentes de regaliz que conectan tubos rotos.',
      intro: [
        { q: 'zippy', t: '¡Bienvenidos al Bosque de Algodón! Aquí los tubos están rotos y los puentes son de regaliz.' }
      ],
      guia: [
        { q: 'zippy', t: 'El hueco punteado con un brote es un puente de regaliz que todavía no ha crecido.', foco: ['R'], nota: 'regaliz' },
        { q: 'zappy', t: 'Crece cuando la Semilla de Matcha recibe lo que pide.', foco: ['TG'] }
      ],
      fin: { q: 'zippy', t: '¡El regaliz conectó el camino! El bosque empieza a respirar.' },
      ingenio: { tipo: 'sinTrasvasar', txt: 'No trasvasar a mano' },
      vasijas: [
        { id: 'A', forma: 'frasco', cap: 3, capas: ['C', 'G', 'G'], x: 80, y: 280 },
        { id: 'B', forma: 'frasco', cap: 3, capas: ['M', 'M', 'M'], x: 230, y: 230 },
        { id: 'D', forma: 'frasco', cap: 3, capas: [], x: 180, y: 470, nombre: 'Reserva' }
      ],
      grifos: [
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'der', valvula: [132, 270], rutas: [
          { a: 'TG', via: [[132, 420], [75, 420]] },
          { a: 'D', via: [[132, 350], [180, 350]] }
        ] },
        { id: 'gB', de: 'B', lado: 'abajo', sale: 'der', rutas: [{ a: 'T2', via: [[300, 220], [300, 440]] }] }
      ],
      compuertas: [{ id: 'R', tipo: 'regaliz', ruta: ['gB', 0], en: 0.5 }],
      objetivos: [
        { id: 'TG', tipo: 'dona', img: 'dona_matcha', materia: 'G', necesita: 2, x: 75, y: 505, nombre: 'La Semilla de Matcha', alCompletar: { abre: ['R'] } },
        { id: 'T2', tipo: 'dona', img: 'dona_menta', materia: 'M', necesita: 3, x: 300, y: 505, nombre: 'La Dona de Menta' }
      ]
    },
    {
      id: 8, region: 2, titulo: 'Cristales que conducen', receta: 8, minimo: 4,
      ensena: 'Los tubos de cristal sólo dejan pasar la Menta Fluida.',
      intro: [
        { q: 'grumble', t: 'Estos tubos son de azúcar cristalizado.' }
      ],
      guia: [
        { q: 'grumble', t: 'El tubo azul claro es de cristal: sólo deja pasar la Menta Fluida.', foco: ['v-gA', 'R'], nota: 'cristal' },
        { q: 'zappy', t: 'La Matcha está en medio de la menta, y el cristal está roto hasta que brote el regaliz.', foco: ['A', 'R'] }
      ],
      fin: { q: 'grumble', t: 'Separar, sembrar, conducir. Tres pasos, una idea.' },
      ingenio: { tipo: 'vacia', id: 'D', txt: 'Terminar con la reserva vacía' },
      vasijas: [
        { id: 'A', forma: 'frasco', cap: 4, capas: ['M', 'G', 'M', 'M'], x: 175, y: 250 },
        { id: 'D', forma: 'frasco', cap: 3, capas: [], x: 300, y: 330, nombre: 'Reserva' }
      ],
      grifos: [
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'izq', valvula: [118, 240], rutas: [
          { a: 'T2', cristal: true, via: [[118, 420], [175, 420]] },
          { a: 'TG', via: [[60, 240], [60, 440]] },
          { a: 'D', via: [[118, 150], [300, 150]] }
        ] }
      ],
      compuertas: [{ id: 'R', tipo: 'regaliz', ruta: ['gA', 0], en: 0.45 }],
      objetivos: [
        { id: 'TG', tipo: 'dona', img: 'dona_matcha', materia: 'G', necesita: 1, x: 60, y: 505, nombre: 'La Semilla de Matcha', alCompletar: { abre: ['R'] } },
        { id: 'T2', tipo: 'dona', img: 'dona_menta', materia: 'M', necesita: 3, x: 175, y: 505, nombre: 'El Cristal de Menta' }
      ]
    },
    {
      id: 9, region: 2, titulo: 'Cuello estrecho', receta: 9, minimo: 4,
      ensena: 'Por el cuello de un matraz sólo pasa una medida cada vez. Perfecto para dosificar.',
      intro: [
        { q: 'zappy', t: 'Hoy toca dosificar con cuidado.' }
      ],
      guia: [
        { q: 'zippy', t: 'El matraz tiene el cuello estrecho: entra y sale de una medida en una.', foco: ['N'], nota: 'matraz' },
        { q: 'zappy', t: 'Si echas todo el caramelo al alambique, convertirá toda la menta en vapor, y luego faltará menta.', foco: ['R', 'T2'] }
      ],
      fin: { q: 'zappy', t: 'Dosis exacta. Ni una gota de más.' },
      ingenio: { tipo: 'sinPistas', txt: 'Resolver sin pistas' },
      vasijas: [
        { id: 'A', forma: 'frasco', cap: 3, capas: ['C', 'C', 'C'], x: 65, y: 300 },
        { id: 'N', forma: 'matraz', cap: 3, capas: [], x: 160, y: 300 },
        { id: 'R', forma: 'alambique', cap: 5, capas: ['M', 'M', 'M'], x: 270, y: 330 }
      ],
      grifos: [
        { id: 'cR', de: 'R', lado: 'arriba', sale: 'izq', rutas: [{ a: 'TV', via: [[200, 160]] }] },
        { id: 'gR', de: 'R', lado: 'abajo', sale: 'der', rutas: [{ a: 'T2', via: [[322, 320], [322, 420], [240, 420]] }] }
      ],
      compuertas: [{ id: 'K', tipo: 'compuerta', ruta: ['gR', 0], en: 0.6 }],
      objetivos: [
        { id: 'TV', tipo: 'turbina', materia: 'V', necesita: 2, x: 200, y: 85, nombre: 'El Molinillo de Merengue', alCompletar: { abre: ['K'] } },
        { id: 'T2', tipo: 'dona', img: 'dona_menta', materia: 'M', necesita: 2, x: 240, y: 505, nombre: 'La Dona de Menta' }
      ]
    },
    {
      id: 10, region: 2, titulo: 'Uva galáctica', receta: 10, minimo: 3,
      ensena: 'La Uva Galáctica pesa el doble y se hunde bajo las demás materias.',
      intro: [
        { q: 'grumble', t: 'Una materia nueva cae del cielo del bosque.' }
      ],
      guia: [
        { q: 'grumble', t: 'La Uva Galáctica pesa 2 por medida. El marcador de la báscula pide 4.', foco: ['U', 'S'], nota: 'uva' },
        { q: 'zippy', t: 'El Portal Galáctico también quiere la uva. ¿Se puede usar para las dos cosas?', foco: ['TU'] }
      ],
      fin: { q: 'grumble', t: 'Primero contrapeso, después ofrenda. La gravedad trabaja para ti.' },
      ingenio: { tipo: 'intacto', id: 'C', txt: 'No tocar el caramelo' },
      vasijas: [
        { id: 'U', forma: 'frasco', cap: 2, capas: ['U', 'U'], x: 60, y: 260 },
        { id: 'C', forma: 'frasco', cap: 3, capas: ['C', 'C', 'C'], x: 150, y: 260 },
        { id: 'A', forma: 'frasco', cap: 4, capas: ['M', 'M'], x: 250, y: 260 },
        { id: 'S', forma: 'cuenco', cap: 4, capas: [], x: 85, y: 455, bascula: { umbral: 4, abre: ['P'] } }
      ],
      grifos: [
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'der', rutas: [{ a: 'T2', via: [[305, 250], [305, 440]] }] },
        { id: 'gS', de: 'S', lado: 'abajo', sale: 'der', rutas: [{ a: 'TU', via: [[150, 445], [150, 420], [200, 420]] }] }
      ],
      compuertas: [{ id: 'P', tipo: 'puente', ruta: ['gA', 0], en: 0.55 }],
      objetivos: [
        { id: 'TU', tipo: 'dona', img: 'dona_uva', materia: 'U', necesita: 2, x: 200, y: 510, nombre: 'El Portal Galáctico' },
        { id: 'T2', tipo: 'dona', img: 'dona_menta', materia: 'M', necesita: 2, x: 305, y: 510, nombre: 'La Dona de Menta' }
      ]
    },
    {
      id: 11, region: 2, titulo: 'Hundir para sacar', receta: 11, minimo: 4,
      ensena: 'Lo que se hunde sale primero por el grifo del fondo.',
      intro: [
        { q: 'zappy', t: 'El único tubo hacia el portal sale del frasco de la menta…' }
      ],
      guia: [
        { q: 'zappy', t: 'La uva siempre se hunde al fondo. Si la echas sobre otra materia, se coloca debajo y sale la primera por el grifo.', foco: ['Uv', 'A'], nota: 'hundir' }
      ],
      fin: { q: 'zippy', t: '¡La uva se coló por debajo! Qué truco más galáctico.' },
      ingenio: { tipo: 'sinPistas', txt: 'Resolver sin pistas' },
      vasijas: [
        { id: 'Gv', forma: 'frasco', cap: 2, capas: ['G'], x: 70, y: 280 },
        { id: 'Uv', forma: 'frasco', cap: 2, capas: ['U', 'U'], x: 300, y: 170 },
        { id: 'A', forma: 'frasco', cap: 4, capas: ['M', 'M'], x: 190, y: 280 }
      ],
      grifos: [
        { id: 'gG', de: 'Gv', lado: 'abajo', sale: 'izq', rutas: [{ a: 'TG', via: [[25, 270], [25, 420], [70, 420]] }] },
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'der', valvula: [245, 270], rutas: [
          { a: 'TU', via: [[245, 420], [175, 420]] },
          { a: 'T2', cristal: true, via: [[245, 350], [300, 350], [300, 440]] }
        ] }
      ],
      compuertas: [{ id: 'R', tipo: 'regaliz', ruta: ['gA', 1], en: 0.7 }],
      objetivos: [
        { id: 'TG', tipo: 'dona', img: 'dona_matcha', materia: 'G', necesita: 1, x: 70, y: 505, nombre: 'La Semilla de Matcha', alCompletar: { abre: ['R'] } },
        { id: 'TU', tipo: 'dona', img: 'dona_uva', materia: 'U', necesita: 2, x: 175, y: 505, nombre: 'El Portal Galáctico' },
        { id: 'T2', tipo: 'dona', img: 'dona_menta', materia: 'M', necesita: 2, x: 300, y: 505, nombre: 'El Cristal de Menta' }
      ]
    },
    {
      id: 12, region: 2, jefe: true, titulo: 'El Árbol de Algodón Ancestral', receta: 12, minimo: 5,
      ensena: 'Cada raíz del árbol pide una energía distinta. Combina todo lo aprendido.',
      intro: [
        { q: 'grumble', t: 'El Árbol de Algodón Ancestral guarda el segundo fragmento. Sus tres raíces se secaron.' }
      ],
      guia: [
        { q: 'grumble', t: 'Tres raíces, tres energías. Mira los circulitos de cada una antes de empezar.', foco: ['TU', 'T2', 'TG'] },
        { q: 'zappy', t: 'El puente de la uva necesita peso 3 en la báscula, y el árbol también quiere la uva.', foco: ['S', 'P'] }
      ],
      fin: { q: 'grumble', t: '¡El árbol florece! Dos fragmentos del Corazón Primordial. Auralia empieza a recordar sus colores.' },
      ingenio: { tipo: 'sinPistas', txt: 'Resolver sin pistas' },
      vasijas: [
        { id: 'A', forma: 'frasco', cap: 4, capas: ['U', 'U', 'M', 'M'], x: 70, y: 265 },
        { id: 'B', forma: 'frasco', cap: 3, capas: ['U', 'G', 'G'], x: 180, y: 265 },
        { id: 'K', forma: 'frasco', cap: 1, capas: ['C'], x: 300, y: 165 },
        { id: 'S', forma: 'cuenco', cap: 4, capas: [], x: 300, y: 345, bascula: { umbral: 3, abre: ['P'] } }
      ],
      grifos: [
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'izq', valvula: [22, 255], rutas: [
          { a: 'TU', via: [[22, 430], [60, 430]] },
          { a: 'T2', cristal: true, via: [[22, 140], [125, 140], [125, 420], [180, 420]] }
        ] },
        { id: 'gB', de: 'B', lado: 'abajo', sale: 'der', valvula: [237, 255], rutas: [
          { a: 'TG', via: [[237, 430], [300, 430]] },
          { a: 'S', via: [[237, 215], [300, 215]] }
        ] }
      ],
      compuertas: [
        { id: 'P', tipo: 'puente', ruta: ['gA', 0], en: 0.55 },
        { id: 'R', tipo: 'regaliz', ruta: ['gA', 1], en: 0.75 }
      ],
      objetivos: [
        { id: 'TU', tipo: 'dona', img: 'dona_uva', materia: 'U', necesita: 2, x: 60, y: 510, nombre: 'La Raíz de Gravedad' },
        { id: 'T2', tipo: 'dona', img: 'dona_menta', materia: 'M', necesita: 2, x: 180, y: 510, nombre: 'La Raíz de Flujo' },
        { id: 'TG', tipo: 'dona', img: 'dona_matcha', materia: 'G', necesita: 2, x: 300, y: 510, nombre: 'La Raíz de Vida', alCompletar: { abre: ['R'] } }
      ]
    },
    // ── GENERADOS: INICIO (herramientas/incorporar_niveles.js) ──
    {
      "id": 13,
      "region": 3,
      "titulo": "Tres grifos helados",
      "minimo": 5,
      "ensena": "Cada frasco se vacía por abajo hacia su dulce. La válvula del centro también puede rellenar el frasco de al lado.",
      "intro": [
        {
          "q": "grumble",
          "t": "Más allá del castillo, el reino se congeló. Bienvenido a las Ruinas del Helado."
        },
        {
          "q": "miga",
          "t": "¡Brrr! Pues a descongelarlo, dulce a dulce."
        }
      ],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Los tres grifos funcionan! El hielo empieza a crujir."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "M",
            "M"
          ],
          "x": 70,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "C",
            "G",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "C"
          ],
          "x": 290,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  24,
                  290
                ],
                [
                  24,
                  430
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            236,
            290
          ],
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  236,
                  430
                ],
                [
                  180,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  236,
                  150
                ],
                [
                  70,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  336,
                  290
                ],
                [
                  336,
                  430
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 70,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 290,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        }
      ]
    },
    {
      "id": 14,
      "region": 3,
      "titulo": "Lo que estorba, a la reserva",
      "minimo": 6,
      "ensena": "Aparta a la reserva lo que estorba y deja abajo lo que pide el dulce.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Apartar también es avanzar."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [],
          "x": 190,
          "y": 290
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "G",
            "C"
          ],
          "x": 70,
          "y": 470,
          "nombre": "Reserva"
        }
      ],
      "grifos": [
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            132,
            280
          ],
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  132,
                  420
                ],
                [
                  275,
                  420
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  132,
                  350
                ],
                [
                  70,
                  350
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "img": "vitrina/p29",
          "materia": "M",
          "necesita": 1,
          "x": 275,
          "y": 505,
          "nombre": "La Tarta de Menta"
        }
      ]
    },
    {
      "id": 15,
      "region": 3,
      "titulo": "Peso exacto",
      "minimo": 6,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Calcula qué dejar caer primero.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Peso justo, puente abierto. Nada sobra."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "C"
          ],
          "x": 180,
          "y": 250
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 4,
          "capas": [
            "C",
            "C",
            "C"
          ],
          "x": 285,
          "y": 460,
          "bascula": {
            "umbral": 2,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            124,
            240
          ],
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  124,
                  300
                ],
                [
                  285,
                  300
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  124,
                  420
                ],
                [
                  80,
                  420
                ]
              ],
              "compuertas": [
                "P"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "P",
          "tipo": "puente",
          "ruta": [
            "gA",
            1
          ],
          "en": 0.55
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p06",
          "materia": "C",
          "necesita": 3,
          "x": 80,
          "y": 505,
          "nombre": "La Tarta de Caramelo"
        }
      ]
    },
    {
      "id": 16,
      "region": 3,
      "titulo": "Gota a gota",
      "minimo": 7,
      "ensena": "El matraz dosifica de una en una. En el alambique, Caramelo + Menta se vuelven vapor: no gastes de más.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Ni una gota de más. Así se dosifica."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "M"
          ],
          "x": 65,
          "y": 300
        },
        {
          "id": "N",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "C",
            "M",
            "M"
          ],
          "x": 160,
          "y": 300
        },
        {
          "id": "R",
          "forma": "alambique",
          "cap": 5,
          "capas": [
            "C",
            "C",
            "C",
            "C"
          ],
          "x": 270,
          "y": 330
        }
      ],
      "grifos": [
        {
          "id": "cR",
          "de": "R",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [
                [
                  200,
                  160
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gR",
          "de": "R",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  322,
                  320
                ],
                [
                  322,
                  420
                ],
                [
                  240,
                  420
                ]
              ],
              "compuertas": [
                "K"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "K",
          "tipo": "compuerta",
          "ruta": [
            "gR",
            0
          ],
          "en": 0.6
        }
      ],
      "objetivos": [
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 2,
          "x": 200,
          "y": 85,
          "nombre": "El Molinillo de Merengue",
          "alCompletar": {
            "abre": [
              "K"
            ]
          }
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p29",
          "materia": "M",
          "necesita": 2,
          "x": 240,
          "y": 505,
          "nombre": "La Tarta de Menta"
        }
      ]
    },
    {
      "id": 17,
      "region": 3,
      "titulo": "Gravedad helada",
      "minimo": 7,
      "ensena": "La Uva pesa 2 y se hunde. Úsala como contrapeso antes de ofrecerla.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡La uva pesó lo justo!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "U",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "U",
            "U"
          ],
          "x": 60,
          "y": 260
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "U",
            "C"
          ],
          "x": 150,
          "y": 260
        },
        {
          "id": "A",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C",
            "C"
          ],
          "x": 250,
          "y": 260
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 4,
          "capas": [],
          "x": 85,
          "y": 455,
          "bascula": {
            "umbral": 2,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  305,
                  250
                ],
                [
                  305,
                  440
                ]
              ],
              "compuertas": [
                "P"
              ]
            }
          ]
        },
        {
          "id": "gS",
          "de": "S",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "TU",
              "via": [
                [
                  150,
                  445
                ],
                [
                  150,
                  420
                ],
                [
                  200,
                  420
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "P",
          "tipo": "puente",
          "ruta": [
            "gA",
            0
          ],
          "en": 0.55
        }
      ],
      "objetivos": [
        {
          "id": "TU",
          "tipo": "dona",
          "img": "vitrina/p06",
          "materia": "C",
          "necesita": 3,
          "x": 200,
          "y": 510,
          "nombre": "La Tarta de Caramelo"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p12",
          "materia": "U",
          "necesita": 3,
          "x": 305,
          "y": 510,
          "nombre": "La Tarta Galáctica"
        }
      ]
    },
    {
      "id": 18,
      "region": 3,
      "titulo": "Cuatro frascos, dos válvulas",
      "minimo": 7,
      "ensena": "Dos válvulas reparten la materia entre tres dulces. Prepara cada frasco para que abajo quede lo que hace falta.",
      "intro": [
        {
          "q": "zappy",
          "t": "Cuatro frascos. Mira bien antes de mover: los movimientos están contados."
        }
      ],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Cuatro frascos y ningún desorden!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C"
          ],
          "x": 50,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "G",
            "C"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "C",
            "M",
            "G"
          ],
          "x": 310,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            92,
            290
          ],
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  92,
                  430
                ],
                [
                  70,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  92,
                  400
                ],
                [
                  180,
                  400
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            268,
            290
          ],
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  268,
                  430
                ],
                [
                  290,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  268,
                  150
                ],
                [
                  310,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 70,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p29",
          "nombre": "La Tarta de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 290,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        }
      ]
    },
    {
      "id": 19,
      "region": 3,
      "titulo": "Regaliz bajo la nieve",
      "minimo": 7,
      "ensena": "El regaliz brota cuando su dulce queda completo. ¿Cuál hay que despertar primero?",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "El regaliz rompió el hielo."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "G",
            "M",
            "M"
          ],
          "x": 280,
          "y": 280
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "G",
            "G"
          ],
          "x": 130,
          "y": 230
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "G"
          ],
          "x": 180,
          "y": 470,
          "nombre": "Reserva"
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            228,
            270
          ],
          "rutas": [
            {
              "a": "TG",
              "via": [
                [
                  228,
                  420
                ],
                [
                  285,
                  420
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  228,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  60,
                  220
                ],
                [
                  60,
                  440
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "R",
          "tipo": "regaliz",
          "ruta": [
            "gB",
            0
          ],
          "en": 0.5
        }
      ],
      "objetivos": [
        {
          "id": "TG",
          "tipo": "dona",
          "img": "vitrina/p29",
          "materia": "M",
          "necesita": 1,
          "x": 285,
          "y": 505,
          "nombre": "La Tarta de Menta",
          "alCompletar": {
            "abre": [
              "R"
            ]
          }
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p19",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "nombre": "La Tarta de Matcha"
        }
      ]
    },
    {
      "id": 20,
      "region": 3,
      "titulo": "El horno escarchado",
      "minimo": 8,
      "ensena": "Sello de chocolate, báscula y molinillo: cada mecanismo abre el siguiente. Planifica el orden completo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "El horno escarchado vuelve a calentar."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "K",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "M",
            "M"
          ],
          "x": 145,
          "y": 125
        },
        {
          "id": "Mv",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C",
            "C"
          ],
          "x": 70,
          "y": 125
        },
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "M"
          ],
          "x": 115,
          "y": 290
        },
        {
          "id": "B",
          "forma": "alambique",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 225,
          "y": 330,
          "sellada": true
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 60,
          "y": 520,
          "bascula": {
            "umbral": 2,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  60,
                  280
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "cB",
          "de": "B",
          "lado": "arriba",
          "sale": "der",
          "rutas": [
            {
              "a": "TV",
              "via": [
                [
                  310,
                  196
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  282,
                  320
                ],
                [
                  282,
                  445
                ],
                [
                  235,
                  445
                ]
              ],
              "compuertas": [
                "P",
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "P",
          "tipo": "puente",
          "ruta": [
            "gB",
            0
          ],
          "en": 0.45
        },
        {
          "id": "Q",
          "tipo": "compuerta",
          "ruta": [
            "gB",
            0
          ],
          "en": 0.82
        }
      ],
      "objetivos": [
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 2,
          "x": 310,
          "y": 92,
          "nombre": "El Molinillo de Merengue",
          "alCompletar": {
            "abre": [
              "Q"
            ]
          }
        },
        {
          "id": "T1",
          "tipo": "dona",
          "img": "vitrina/p06",
          "materia": "C",
          "necesita": 1,
          "x": 235,
          "y": 525,
          "nombre": "La Tarta de Caramelo",
          "grande": true
        }
      ]
    },
    {
      "id": 21,
      "region": 3,
      "titulo": "Cristal de hielo",
      "minimo": 8,
      "ensena": "El tubo de cristal sólo deja pasar la Menta. Separa antes de conducir.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cristal limpio, camino abierto."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "M"
          ],
          "x": 185,
          "y": 250
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "G",
            "M"
          ],
          "x": 60,
          "y": 330,
          "nombre": "Reserva"
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            242,
            240
          ],
          "rutas": [
            {
              "a": "T2",
              "cristal": true,
              "via": [
                [
                  242,
                  420
                ],
                [
                  185,
                  420
                ]
              ],
              "compuertas": [
                "R"
              ]
            },
            {
              "a": "TG",
              "via": [
                [
                  300,
                  240
                ],
                [
                  300,
                  440
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  242,
                  150
                ],
                [
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "R",
          "tipo": "regaliz",
          "ruta": [
            "gA",
            0
          ],
          "en": 0.45
        }
      ],
      "objetivos": [
        {
          "id": "TG",
          "tipo": "dona",
          "img": "vitrina/p19",
          "materia": "G",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "nombre": "La Tarta de Matcha",
          "alCompletar": {
            "abre": [
              "R"
            ]
          }
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p29",
          "materia": "M",
          "necesita": 3,
          "x": 185,
          "y": 505,
          "nombre": "La Tarta de Menta"
        }
      ]
    },
    {
      "id": 22,
      "region": 3,
      "titulo": "Orden en el congelador",
      "minimo": 8,
      "ensena": "Cada frasco se vacía por abajo hacia su dulce. La válvula del centro también puede rellenar el frasco de al lado.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Todo ordenado en el congelador!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "M",
            "C"
          ],
          "x": 290,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "C",
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "G",
            "M"
          ],
          "x": 70,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  336,
                  290
                ],
                [
                  336,
                  430
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            124,
            290
          ],
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  124,
                  430
                ],
                [
                  180,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  124,
                  150
                ],
                [
                  290,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  24,
                  290
                ],
                [
                  24,
                  430
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 290,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p29",
          "nombre": "La Tarta de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 70,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        }
      ]
    },
    {
      "id": 23,
      "region": 3,
      "titulo": "Hundir el hielo",
      "minimo": 8,
      "ensena": "Lo que se hunde sale primero por el grifo. Usa la uva para colarte por debajo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Por debajo y sin que nadie lo note!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "Gv",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "U"
          ],
          "x": 290,
          "y": 280
        },
        {
          "id": "Uv",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "U"
          ],
          "x": 60,
          "y": 170
        },
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "U",
            "G"
          ],
          "x": 170,
          "y": 280
        }
      ],
      "grifos": [
        {
          "id": "gG",
          "de": "Gv",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "TG",
              "via": [
                [
                  335,
                  270
                ],
                [
                  335,
                  420
                ],
                [
                  290,
                  420
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            115,
            270
          ],
          "rutas": [
            {
              "a": "TU",
              "via": [
                [
                  115,
                  420
                ],
                [
                  185,
                  420
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "cristal": true,
              "via": [
                [
                  115,
                  350
                ],
                [
                  60,
                  350
                ],
                [
                  60,
                  440
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "R",
          "tipo": "regaliz",
          "ruta": [
            "gA",
            1
          ],
          "en": 0.7
        }
      ],
      "objetivos": [
        {
          "id": "TG",
          "tipo": "dona",
          "img": "vitrina/p19",
          "materia": "G",
          "necesita": 1,
          "x": 290,
          "y": 505,
          "nombre": "La Tarta de Matcha",
          "alCompletar": {
            "abre": [
              "R"
            ]
          }
        },
        {
          "id": "TU",
          "tipo": "dona",
          "img": "vitrina/p12",
          "materia": "U",
          "necesita": 1,
          "x": 185,
          "y": 505,
          "nombre": "La Tarta Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p29",
          "materia": "M",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "nombre": "La Tarta de Menta"
        }
      ]
    },
    {
      "id": 24,
      "region": 3,
      "jefe": true,
      "titulo": "El Corazón de Hielo",
      "minimo": 9,
      "ensena": "Sello de chocolate, báscula y molinillo: cada mecanismo abre el siguiente. Planifica el orden completo.",
      "intro": [
        {
          "q": "grumble",
          "t": "El tercer fragmento late dentro de este hielo. Piensa el plan completo antes de empezar."
        }
      ],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "¡El Corazón de Hielo se derrite! Tercer fragmento recuperado."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "K",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "M"
          ],
          "x": 215,
          "y": 125,
          "nombre": "Chispa"
        },
        {
          "id": "Mv",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "M"
          ],
          "x": 290,
          "y": 125
        },
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "C",
            "M"
          ],
          "x": 245,
          "y": 290
        },
        {
          "id": "B",
          "forma": "alambique",
          "cap": 5,
          "capas": [
            "C",
            "C",
            "C",
            "C"
          ],
          "x": 135,
          "y": 330,
          "sellada": true
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 300,
          "y": 520,
          "bascula": {
            "umbral": 3,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  300,
                  280
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "cB",
          "de": "B",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [
                [
                  50,
                  196
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  78,
                  320
                ],
                [
                  78,
                  445
                ],
                [
                  125,
                  445
                ]
              ],
              "compuertas": [
                "P",
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "P",
          "tipo": "puente",
          "ruta": [
            "gB",
            0
          ],
          "en": 0.45
        },
        {
          "id": "Q",
          "tipo": "compuerta",
          "ruta": [
            "gB",
            0
          ],
          "en": 0.82
        }
      ],
      "objetivos": [
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 4,
          "x": 50,
          "y": 92,
          "nombre": "El Molinillo de Merengue",
          "alCompletar": {
            "abre": [
              "Q"
            ]
          }
        },
        {
          "id": "T1",
          "tipo": "dona",
          "img": "vitrina/p06",
          "materia": "C",
          "necesita": 3,
          "x": 125,
          "y": 525,
          "nombre": "El Corazón de Hielo",
          "grande": true
        }
      ]
    },
    {
      "id": 25,
      "region": 4,
      "titulo": "Ciudad sin suelo",
      "minimo": 8,
      "ensena": "La Uva pesa 2 y se hunde. Úsala como contrapeso antes de ofrecerla.",
      "intro": [
        {
          "q": "zippy",
          "t": "¡Mira arriba! La Ciudad Suspendida flota sobre las nubes."
        },
        {
          "q": "zappy",
          "t": "Aquí la gravedad manda. Cuenta bien los pesos."
        }
      ],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡La gravedad ya trabaja para nosotros!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "U",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "M",
            "M",
            "M"
          ],
          "x": 300,
          "y": 260
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "U",
            "C"
          ],
          "x": 210,
          "y": 260
        },
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "U",
            "C"
          ],
          "x": 110,
          "y": 260
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 4,
          "capas": [
            "M",
            "M",
            "C"
          ],
          "x": 275,
          "y": 455,
          "bascula": {
            "umbral": 5,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  55,
                  250
                ],
                [
                  55,
                  440
                ]
              ],
              "compuertas": [
                "P"
              ]
            }
          ]
        },
        {
          "id": "gS",
          "de": "S",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "TU",
              "via": [
                [
                  210,
                  445
                ],
                [
                  210,
                  420
                ],
                [
                  160,
                  420
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "P",
          "tipo": "puente",
          "ruta": [
            "gA",
            0
          ],
          "en": 0.55
        }
      ],
      "objetivos": [
        {
          "id": "TU",
          "tipo": "dona",
          "img": "vitrina/p10",
          "materia": "U",
          "necesita": 2,
          "x": 160,
          "y": 510,
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p03",
          "materia": "M",
          "necesita": 1,
          "x": 55,
          "y": 510,
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 26,
      "region": 4,
      "titulo": "Calles colgantes",
      "minimo": 9,
      "ensena": "Dos válvulas reparten la materia entre tres dulces. Prepara cada frasco para que abajo quede lo que hace falta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Calles en su sitio. La ciudad respira."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [],
          "x": 310,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
            "G",
            "U"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "U",
            "M",
            "C"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "M"
          ],
          "x": 50,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            268,
            290
          ],
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  268,
                  430
                ],
                [
                  290,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  268,
                  400
                ],
                [
                  180,
                  400
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            92,
            290
          ],
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  92,
                  430
                ],
                [
                  70,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  92,
                  150
                ],
                [
                  50,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 290,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 70,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        }
      ]
    },
    {
      "id": 27,
      "region": 4,
      "titulo": "Dosis en las alturas",
      "minimo": 9,
      "ensena": "El matraz dosifica de una en una. En el alambique, Caramelo + Menta se vuelven vapor: no gastes de más.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Dosis exacta, incluso en las alturas."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "M",
            "M",
            "C"
          ],
          "x": 295,
          "y": 300
        },
        {
          "id": "N",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "C",
            "C"
          ],
          "x": 200,
          "y": 300
        },
        {
          "id": "R",
          "forma": "alambique",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "M",
            "M"
          ],
          "x": 90,
          "y": 330
        }
      ],
      "grifos": [
        {
          "id": "cR",
          "de": "R",
          "lado": "arriba",
          "sale": "der",
          "rutas": [
            {
              "a": "TV",
              "via": [
                [
                  160,
                  160
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gR",
          "de": "R",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  38,
                  320
                ],
                [
                  38,
                  420
                ],
                [
                  120,
                  420
                ]
              ],
              "compuertas": [
                "K"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "K",
          "tipo": "compuerta",
          "ruta": [
            "gR",
            0
          ],
          "en": 0.6
        }
      ],
      "objetivos": [
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 2,
          "x": 160,
          "y": 85,
          "nombre": "El Molinillo de Merengue",
          "alCompletar": {
            "abre": [
              "K"
            ]
          }
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p28",
          "materia": "C",
          "necesita": 2,
          "x": 120,
          "y": 505,
          "nombre": "La Tarta de Naranja"
        }
      ]
    },
    {
      "id": 28,
      "region": 4,
      "titulo": "Raíces en el aire",
      "minimo": 9,
      "ensena": "Tres dulces, tres energías, dos válvulas y un puente. Cada movimiento cuenta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Las raíces flotantes florecen!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [],
          "x": 290,
          "y": 265
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "M",
            "M",
            "G"
          ],
          "x": 180,
          "y": 265
        },
        {
          "id": "K",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 60,
          "y": 165
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 4,
          "capas": [
            "U",
            "U"
          ],
          "x": 60,
          "y": 345,
          "bascula": {
            "umbral": 4,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            338,
            255
          ],
          "rutas": [
            {
              "a": "TU",
              "via": [
                [
                  338,
                  430
                ],
                [
                  300,
                  430
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "T2",
              "cristal": true,
              "via": [
                [
                  338,
                  140
                ],
                [
                  235,
                  140
                ],
                [
                  235,
                  420
                ],
                [
                  180,
                  420
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            123,
            255
          ],
          "rutas": [
            {
              "a": "TG",
              "via": [
                [
                  123,
                  430
                ],
                [
                  60,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "S",
              "via": [
                [
                  123,
                  215
                ],
                [
                  60,
                  215
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "P",
          "tipo": "puente",
          "ruta": [
            "gA",
            0
          ],
          "en": 0.55
        },
        {
          "id": "R",
          "tipo": "regaliz",
          "ruta": [
            "gA",
            1
          ],
          "en": 0.75
        }
      ],
      "objetivos": [
        {
          "id": "TU",
          "tipo": "dona",
          "img": "vitrina/p10",
          "materia": "U",
          "necesita": 2,
          "x": 300,
          "y": 510,
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p03",
          "materia": "M",
          "necesita": 1,
          "x": 180,
          "y": 510,
          "nombre": "La Dona de Menta"
        },
        {
          "id": "TG",
          "tipo": "dona",
          "img": "vitrina/p03",
          "materia": "M",
          "necesita": 1,
          "x": 60,
          "y": 510,
          "nombre": "La Dona de Menta",
          "alCompletar": {
            "abre": [
              "R"
            ]
          }
        }
      ]
    },
    {
      "id": 29,
      "region": 4,
      "titulo": "Contrapeso celeste",
      "minimo": 8,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Calcula qué dejar caer primero.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "El contrapeso celeste está en equilibrio."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "U",
            "C",
            "C"
          ],
          "x": 180,
          "y": 250
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 4,
          "capas": [
            "U",
            "M",
            "C"
          ],
          "x": 75,
          "y": 460,
          "bascula": {
            "umbral": 2,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            236,
            240
          ],
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  236,
                  300
                ],
                [
                  75,
                  300
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  236,
                  420
                ],
                [
                  280,
                  420
                ]
              ],
              "compuertas": [
                "P"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "P",
          "tipo": "puente",
          "ruta": [
            "gA",
            1
          ],
          "en": 0.55
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p03",
          "materia": "M",
          "necesita": 2,
          "x": 280,
          "y": 505,
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 30,
      "region": 4,
      "titulo": "Cristal sobre las nubes",
      "minimo": 9,
      "ensena": "El tubo de cristal sólo deja pasar la Menta. Separa antes de conducir.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡El cristal brilla sobre las nubes!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "M"
          ],
          "x": 175,
          "y": 250
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "G"
          ],
          "x": 300,
          "y": 330,
          "nombre": "Reserva"
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            118,
            240
          ],
          "rutas": [
            {
              "a": "T2",
              "cristal": true,
              "via": [
                [
                  118,
                  420
                ],
                [
                  175,
                  420
                ]
              ],
              "compuertas": [
                "R"
              ]
            },
            {
              "a": "TG",
              "via": [
                [
                  60,
                  240
                ],
                [
                  60,
                  440
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  118,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "R",
          "tipo": "regaliz",
          "ruta": [
            "gA",
            0
          ],
          "en": 0.45
        }
      ],
      "objetivos": [
        {
          "id": "TG",
          "tipo": "dona",
          "img": "vitrina/p28",
          "materia": "C",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "nombre": "La Tarta de Naranja",
          "alCompletar": {
            "abre": [
              "R"
            ]
          }
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p03",
          "materia": "M",
          "necesita": 1,
          "x": 175,
          "y": 505,
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 31,
      "region": 4,
      "titulo": "El laberinto de válvulas",
      "minimo": 10,
      "ensena": "Dos válvulas reparten la materia entre tres dulces. Prepara cada frasco para que abajo quede lo que hace falta.",
      "intro": [
        {
          "q": "zappy",
          "t": "Dos válvulas, cuatro frascos y muy pocos movimientos de sobra."
        }
      ],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Saliste del laberinto de válvulas. Impresionante."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "M"
          ],
          "x": 310,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
            "M",
            "M"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "U",
            "C"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "M",
            "C",
            "U"
          ],
          "x": 50,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            268,
            290
          ],
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  268,
                  430
                ],
                [
                  290,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  268,
                  400
                ],
                [
                  180,
                  400
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            92,
            290
          ],
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  92,
                  430
                ],
                [
                  70,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  92,
                  150
                ],
                [
                  50,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "U",
          "necesita": 2,
          "x": 290,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 70,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        }
      ]
    },
    {
      "id": 32,
      "region": 4,
      "titulo": "Tres torres",
      "minimo": 10,
      "ensena": "Cada frasco se vacía por abajo hacia su dulce. La válvula del centro también puede rellenar el frasco de al lado.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Las tres torres vuelven a brillar!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "C"
          ],
          "x": 70,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "U",
            "G",
            "G",
            "U",
            "M"
          ],
          "x": 290,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  24,
                  290
                ],
                [
                  24,
                  430
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            236,
            290
          ],
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  236,
                  430
                ],
                [
                  180,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  236,
                  150
                ],
                [
                  70,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  336,
                  290
                ],
                [
                  336,
                  430
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 70,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 290,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        }
      ]
    },
    {
      "id": 33,
      "region": 4,
      "titulo": "Caída libre",
      "minimo": 10,
      "ensena": "Lo que se hunde sale primero por el grifo. Usa la uva para colarte por debajo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Caída libre, aterrizaje perfecto."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "Gv",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "G"
          ],
          "x": 70,
          "y": 280
        },
        {
          "id": "Uv",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "U",
            "U"
          ],
          "x": 300,
          "y": 170
        },
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "G"
          ],
          "x": 190,
          "y": 280
        }
      ],
      "grifos": [
        {
          "id": "gG",
          "de": "Gv",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "TG",
              "via": [
                [
                  25,
                  270
                ],
                [
                  25,
                  420
                ],
                [
                  70,
                  420
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            245,
            270
          ],
          "rutas": [
            {
              "a": "TU",
              "via": [
                [
                  245,
                  420
                ],
                [
                  175,
                  420
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "cristal": true,
              "via": [
                [
                  245,
                  350
                ],
                [
                  300,
                  350
                ],
                [
                  300,
                  440
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "R",
          "tipo": "regaliz",
          "ruta": [
            "gA",
            1
          ],
          "en": 0.7
        }
      ],
      "objetivos": [
        {
          "id": "TG",
          "tipo": "dona",
          "img": "vitrina/p17",
          "materia": "G",
          "necesita": 3,
          "x": 70,
          "y": 505,
          "nombre": "El Macaron de Lima",
          "alCompletar": {
            "abre": [
              "R"
            ]
          }
        },
        {
          "id": "TU",
          "tipo": "dona",
          "img": "vitrina/p10",
          "materia": "U",
          "necesita": 1,
          "x": 175,
          "y": 505,
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p03",
          "materia": "M",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 34,
      "region": 4,
      "titulo": "Puentes de regaliz",
      "minimo": 10,
      "ensena": "El regaliz brota cuando su dulce queda completo. ¿Cuál hay que despertar primero?",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Puentes de regaliz por toda la ciudad!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "U"
          ],
          "x": 80,
          "y": 280
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "C"
          ],
          "x": 230,
          "y": 230
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "C",
            "U"
          ],
          "x": 180,
          "y": 470,
          "nombre": "Reserva"
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            132,
            270
          ],
          "rutas": [
            {
              "a": "TG",
              "via": [
                [
                  132,
                  420
                ],
                [
                  75,
                  420
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  132,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  300,
                  220
                ],
                [
                  300,
                  440
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "R",
          "tipo": "regaliz",
          "ruta": [
            "gB",
            0
          ],
          "en": 0.5
        }
      ],
      "objetivos": [
        {
          "id": "TG",
          "tipo": "dona",
          "img": "vitrina/p03",
          "materia": "M",
          "necesita": 1,
          "x": 75,
          "y": 505,
          "nombre": "La Dona de Menta",
          "alCompletar": {
            "abre": [
              "R"
            ]
          }
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p28",
          "materia": "C",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "nombre": "La Tarta de Naranja"
        }
      ]
    },
    {
      "id": 35,
      "region": 4,
      "titulo": "La gran mezcla",
      "minimo": 11,
      "ensena": "Dos válvulas reparten la materia entre tres dulces. Prepara cada frasco para que abajo quede lo que hace falta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "La gran mezcla, resuelta. Ya piensas como un maestro."
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "U",
            "G"
          ],
          "x": 50,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C",
            "M"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "G"
          ],
          "x": 310,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            92,
            290
          ],
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  92,
                  430
                ],
                [
                  70,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  92,
                  400
                ],
                [
                  180,
                  400
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            268,
            290
          ],
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  268,
                  430
                ],
                [
                  290,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "D",
              "via": [
                [
                  268,
                  150
                ],
                [
                  310,
                  150
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 70,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "U",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 290,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        }
      ]
    },
    {
      "id": 36,
      "region": 4,
      "jefe": true,
      "titulo": "El Corazón Primordial",
      "minimo": 11,
      "ensena": "Tres dulces, tres energías, dos válvulas y un puente. Cada movimiento cuenta.",
      "intro": [
        {
          "q": "grumble",
          "t": "El último fragmento. Todo lo que has aprendido, en un solo tablero."
        },
        {
          "q": "miga",
          "t": "¡Vamos a por el Corazón!"
        }
      ],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "¡El Corazón Primordial está completo!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "U",
            "U"
          ],
          "x": 70,
          "y": 265
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "U",
            "U",
            "M"
          ],
          "x": 180,
          "y": 265
        },
        {
          "id": "K",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "U"
          ],
          "x": 300,
          "y": 165
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 4,
          "capas": [
            "G",
            "M",
            "G"
          ],
          "x": 300,
          "y": 345,
          "bascula": {
            "umbral": 5,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "izq",
          "valvula": [
            22,
            255
          ],
          "rutas": [
            {
              "a": "TU",
              "via": [
                [
                  22,
                  430
                ],
                [
                  60,
                  430
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "T2",
              "cristal": true,
              "via": [
                [
                  22,
                  140
                ],
                [
                  125,
                  140
                ],
                [
                  125,
                  420
                ],
                [
                  180,
                  420
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "valvula": [
            237,
            255
          ],
          "rutas": [
            {
              "a": "TG",
              "via": [
                [
                  237,
                  430
                ],
                [
                  300,
                  430
                ]
              ],
              "compuertas": []
            },
            {
              "a": "S",
              "via": [
                [
                  237,
                  215
                ],
                [
                  300,
                  215
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "id": "P",
          "tipo": "puente",
          "ruta": [
            "gA",
            0
          ],
          "en": 0.55
        },
        {
          "id": "R",
          "tipo": "regaliz",
          "ruta": [
            "gA",
            1
          ],
          "en": 0.75
        }
      ],
      "objetivos": [
        {
          "id": "TU",
          "tipo": "dona",
          "img": "vitrina/p10",
          "materia": "U",
          "necesita": 2,
          "x": 60,
          "y": 510,
          "nombre": "El Pilar de Uva"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "img": "vitrina/p03",
          "materia": "M",
          "necesita": 2,
          "x": 180,
          "y": 510,
          "nombre": "El Pilar de Menta"
        },
        {
          "id": "TG",
          "tipo": "dona",
          "img": "vitrina/p10",
          "materia": "U",
          "necesita": 3,
          "x": 300,
          "y": 510,
          "nombre": "El Pilar de Uva",
          "alCompletar": {
            "abre": [
              "R"
            ]
          }
        }
      ]
    }
    // ── GENERADOS: FIN ──
  ];

  var data = { REGIONES: REGIONES, NIVELES: NIVELES };
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else { global.REGIONES = REGIONES; global.NIVELES = NIVELES; }
})(this);
