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
    { id: 4, nombre: 'La Ciudad Suspendida', lema: 'Gravedad, básculas y todo combinado' },
    { id: 5, nombre: 'La Feria de los Sabores', lema: 'Pedidos combinados y mezclas de sabores' },
    { id: 6, nombre: 'El Mar de Gelatina', lema: 'Llega la Fresa Estelar' },
    { id: 7, nombre: 'Las Cumbres de Merengue', lema: 'Llega el Limón Solar y hay poco sitio libre' },
    { id: 8, nombre: 'La Selva de Cacao', lema: 'Llega el Arándano Eléctrico' },
    { id: 9, nombre: 'El Volcán de Caramelo', lema: 'Cinco frascos y muchos sabores' },
    { id: 10, nombre: 'La Biblioteca de Recetas', lema: 'Las mezclas más difíciles del reino' },
    { id: 11, nombre: 'El Palacio de las Estrellas', lema: 'Todo lo aprendido, al máximo' }
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
        { q: 'zappy', t: 'Desde aquí los movimientos están contados: mira el marcador de arriba. Si se acaban antes de despertar los dulces, se pierde la partida.', nota: 'limite' },
        { q: 'grumble', t: 'Cada partida perdida cuesta una vida: mira los corazones del mapa. Y cada victoria da puntos: con ellos subes de rango y ganas premios.', nota: 'vidas' }
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
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'der', valvula: [139, 270], rutas: [
          { a: 'TG', via: [[139, 420], [75, 420]] },
          { a: 'D', via: [[139, 350], [180, 350]] }
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
        { id: 'A', forma: 'frasco', cap: 3, capas: ['C', 'C'], x: 65, y: 300 },
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
        { id: 'C', forma: 'frasco', cap: 3, capas: ['C'], x: 150, y: 260 },
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
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'der', valvula: [249, 270], rutas: [
          { a: 'TU', via: [[249, 420], [175, 420]] },
          { a: 'T2', cristal: true, via: [[249, 350], [300, 350], [300, 440]] }
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
        { id: 'gA', de: 'A', lado: 'abajo', sale: 'izq', valvula: [11, 255], rutas: [
          { a: 'TU', via: [[11, 430], [60, 430]] },
          { a: 'T2', cristal: true, via: [[11, 140], [125, 140], [125, 420], [180, 420]] }
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
    // ── GENERADOS: INICIO (herramientas/incorporar_niveles2.js) ──
    {
      "id": 13,
      "region": 3,
      "titulo": "El deshielo empieza",
      "minimo": 6,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas.",
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
        "t": "¡Crac! El primer bloque de hielo se rompe."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "C",
            "C"
          ],
          "x": 95,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "C",
            "M"
          ],
          "x": 265,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 300,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  151,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "T1",
              "via": [
                [
                  151,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            151,
            290
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  321,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  321,
                  150
                ],
                [
                  95,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            321,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.404,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p29",
          "nombre": "La Tarta de Menta"
        }
      ]
    },
    {
      "id": 14,
      "region": 3,
      "titulo": "Sorbete de dos sabores",
      "minimo": 6,
      "ensena": "Usa la Reserva para apartar lo que estorba. Hay un pedido combinado: los colores de los circulitos dicen cuánto de cada sabor.",
      "intro": [],
      "guia": [
        {
          "q": "zappy",
          "t": "¡Un pedido combinado! Este dulce quiere una mezcla: cada color de sus circulitos es un sabor distinto.",
          "foco": [
            "T1"
          ],
          "nota": "combinado"
        },
        {
          "q": "zippy",
          "t": "Cuando ya tiene todo un sabor, no acepta más de ese. ¡Dale lo que le falta!",
          "foco": [
            "T1"
          ]
        }
      ],
      "fin": {
        "q": "zappy",
        "t": "Dos sabores en un solo dulce. ¡Así sí!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "G",
            "G",
            "G"
          ],
          "x": 95,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "C",
            "G"
          ],
          "x": 265,
          "y": 300
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 60,
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
          "rutas": [
            {
              "a": "D",
              "via": [
                [
                  151,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  151,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            151,
            290
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
                  308,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "G": 1,
            "C": 2
          },
          "materia": "G",
          "necesita": 3,
          "img": "vitrina/p21",
          "nombre": "El Tiramisú de Matcha"
        }
      ]
    },
    {
      "id": 15,
      "region": 3,
      "titulo": "Brotes en la escarcha",
      "minimo": 6,
      "ensena": "Alimenta la Semilla de Matcha y brotará el puente de regaliz. La cápsula sólo se llena y se vacía por tubos.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡El regaliz rompió la escarcha!"
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
            "G",
            "C",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "C"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  103,
                  338
                ],
                [
                  95,
                  338
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
              "a": "T1",
              "via": [
                [
                  244,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": [
                "R"
              ]
            },
            {
              "a": "B",
              "via": [
                [
                  244,
                  150
                ],
                [
                  180,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            244,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 265,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        }
      ]
    },
    {
      "id": 16,
      "region": 3,
      "titulo": "La balanza congelada",
      "minimo": 6,
      "ensena": "La báscula abre su puente al llegar al peso marcado. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Peso justo. Hasta el hielo respeta una buena báscula."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "G"
          ],
          "x": 95,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "U",
            "U"
          ],
          "x": 265,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 60,
          "y": 470,
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
              "a": "S",
              "via": [
                [
                  151,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  151,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "T1",
              "via": [
                [
                  151,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            151,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            1
          ],
          "en": 0.5,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "U",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p12",
          "nombre": "La Tarta Galáctica"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        }
      ]
    },
    {
      "id": 17,
      "region": 3,
      "titulo": "Cristal y escarcha",
      "minimo": 6,
      "ensena": "El tubo de cristal sólo deja pasar la Menta. La báscula abre su puente al llegar al peso marcado.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cristal limpio, camino abierto."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 300,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "P"
              ]
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
              "a": "S",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.429,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p29",
          "nombre": "La Tarta de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        }
      ]
    },
    {
      "id": 18,
      "region": 3,
      "titulo": "Cápsula en el glaciar",
      "minimo": 7,
      "ensena": "La báscula abre su puente al llegar al peso marcado. La cápsula sólo se llena y se vacía por tubos.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡La cápsula pesó lo justo!"
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
            "C",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "C",
            "M",
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 60,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
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
                  236,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "T2",
              "via": [
                [
                  236,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.461,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "C",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p29",
          "nombre": "La Tarta de Menta"
        }
      ]
    },
    {
      "id": 19,
      "region": 3,
      "titulo": "Avalancha dulce",
      "minimo": 7,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Hay un pedido combinado: los colores de los circulitos dicen cuánto de cada sabor.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Ni una avalancha nos para!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "C"
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
            "M"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 300,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
              "a": "T1",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "P"
              ]
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
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "S",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "M": 2,
            "C": 2
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p29",
          "nombre": "La Tarta de Menta"
        }
      ]
    },
    {
      "id": 20,
      "region": 3,
      "titulo": "El horno escarchado",
      "minimo": 7,
      "ensena": "La Uva pesa 2 y se hunde al fondo. La cápsula sólo se llena y se vacía por tubos.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "El horno escarchado vuelve a calentar."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "U",
            "C",
            "U",
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
            "C",
            "C"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T3",
              "via": [
                [
                  116,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  244,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            },
            {
              "a": "B",
              "via": [
                [
                  244,
                  150
                ],
                [
                  180,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            244,
            290
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "U",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p12",
          "nombre": "La Tarta Galáctica"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        }
      ]
    },
    {
      "id": 21,
      "region": 3,
      "titulo": "Chocolate entre témpanos",
      "minimo": 7,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "El chocolate se fundió, y el hielo también."
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
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "C",
            "G"
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
            "C"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 300,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
                  236,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "S",
              "via": [
                [
                  236,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.461,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        }
      ]
    },
    {
      "id": 22,
      "region": 3,
      "titulo": "Helado de tres bolas",
      "minimo": 8,
      "ensena": "Hay un pedido combinado: los colores de los circulitos dicen cuánto de cada sabor. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Tres bolas y ninguna se cae!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "G",
            "C"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 3,
          "capas": [
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
            "G"
          ],
          "x": 315,
          "y": 300
        }
      ],
      "grifos": [
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
                  92,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gD",
          "de": "D",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  272,
                  356
                ],
                [
                  265,
                  356
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
          "id": "T2",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "G": 1,
            "C": 2
          },
          "materia": "G",
          "necesita": 3,
          "img": "vitrina/p21",
          "nombre": "El Tiramisú de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 265,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        }
      ]
    },
    {
      "id": 23,
      "region": 3,
      "titulo": "Orden en el congelador",
      "minimo": 8,
      "ensena": "Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Todo ordenado en el congelador!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "D",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
            "U"
          ],
          "x": 45,
          "y": 300,
          "sellada": true
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "U",
            "U"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
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
            "C",
            "C"
          ],
          "x": 315,
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
                  88,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T3",
              "via": [
                [
                  178,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gD",
          "de": "D",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
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
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p06",
          "nombre": "La Tarta de Caramelo"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "U",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p12",
          "nombre": "La Tarta Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "U",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p12",
          "nombre": "La Tarta Galáctica"
        }
      ]
    },
    {
      "id": 24,
      "region": 3,
      "jefe": true,
      "titulo": "El Corazón de Hielo",
      "minimo": 8,
      "ensena": "La cápsula sólo se llena y se vacía por tubos.",
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
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "C",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "capsula",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 300,
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
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  116,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
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
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p09",
          "nombre": "El Corazón de Hielo"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "C": 1,
            "M": 1
          },
          "materia": "C",
          "necesita": 2,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Matcha"
        }
      ]
    },
    {
      "id": 25,
      "region": 4,
      "titulo": "Ciudad sin suelo",
      "minimo": 8,
      "ensena": "La válvula elige por qué tubo sale el grifo: piensa a dónde va cada medida. Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas.",
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
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M",
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
            "G"
          ],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T3",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T2",
              "via": [
                [
                  356,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  356,
                  150
                ],
                [
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            356,
            290
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
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        }
      ]
    },
    {
      "id": 26,
      "region": 4,
      "titulo": "Calles colgantes",
      "minimo": 8,
      "ensena": "La báscula abre su puente al llegar al peso marcado. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Calles en su sitio. La ciudad respira."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "G",
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "G"
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
            "C",
            "C"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 180,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "S",
              "via": [
                [
                  116,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.391,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        }
      ]
    },
    {
      "id": 27,
      "region": 4,
      "titulo": "Vapor entre nubes",
      "minimo": 9,
      "ensena": "La Uva pesa 2 y se hunde al fondo. En el alambique, Caramelo + Menta se vuelven vapor para el molinillo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡El vapor nos lleva cada vez más alto!"
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
            "C",
            "C",
            "U",
            "U",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "alambique",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 300,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "cC",
          "de": "C",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gA",
          "de": "A",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "K"
              ]
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
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T2",
              "via": [
                [
                  351,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "K",
          "tipo": "compuerta"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "U",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        },
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 2,
          "x": 279,
          "y": 92,
          "alCompletar": {
            "abre": [
              "K"
            ]
          },
          "nombre": "El Molinillo de Merengue"
        }
      ]
    },
    {
      "id": 28,
      "region": 4,
      "titulo": "Tarta de dos pisos",
      "minimo": 9,
      "ensena": "Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "¡Dos sabores, dos pisos, una tarta perfecta!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "G",
            "C",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "C",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M"
          ],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  60,
                  338
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
                  236,
                  356
                ],
                [
                  180,
                  356
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
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
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
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "x": 60,
          "y": 505,
          "pide": {
            "M": 2,
            "G": 2
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 29,
      "region": 4,
      "titulo": "Fundición en las alturas",
      "minimo": 9,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Chocolate fundido y dosis exacta. Impecable."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "C",
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "C",
            "M"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  103,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "T1",
              "via": [
                [
                  257,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 95,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 265,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 30,
      "region": 4,
      "titulo": "Cristal sobre las nubes",
      "minimo": 9,
      "ensena": "El tubo de cristal sólo deja pasar la Menta.",
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
          "cap": 4,
          "capas": [
            "M",
            "G",
            "C",
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
              "a": "T3",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T1",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "C": 1,
            "M": 2
          },
          "materia": "C",
          "necesita": 3,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        }
      ]
    },
    {
      "id": 31,
      "region": 4,
      "titulo": "El almacén flotante",
      "minimo": 10,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. Usa la Reserva para apartar lo que estorba.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cada cosa en su sitio, hasta en el aire."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "M",
            "C",
            "C"
          ],
          "x": 95,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M"
          ],
          "x": 265,
          "y": 300
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
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
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  52,
                  338
                ],
                [
                  60,
                  338
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
              "a": "D",
              "via": [
                [
                  209,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T1",
              "via": [
                [
                  209,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ],
          "valvula": [
            209,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            1
          ],
          "en": 0.527,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        }
      ]
    },
    {
      "id": 32,
      "region": 4,
      "titulo": "Tres torres",
      "minimo": 10,
      "ensena": "El matraz entra y sale de una medida en una. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Las tres torres vuelven a brillar!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "D",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "M",
            "G"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "G",
            "M",
            "G"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M"
          ],
          "x": 315,
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
              "a": "T2",
              "via": [
                [
                  88,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T3",
              "via": [
                [
                  178,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T1",
              "via": [
                [
                  273,
                  374
                ],
                [
                  300,
                  374
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 33,
      "region": 4,
      "titulo": "Caída libre",
      "minimo": 10,
      "ensena": "El tubo de cristal sólo deja pasar la Menta. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
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
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M",
            "M",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "G",
            "C"
          ],
          "x": 180,
          "y": 300,
          "sellada": true
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "C"
          ],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
              "a": "T3",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T2",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "G": 1,
            "C": 2
          },
          "materia": "G",
          "necesita": 3,
          "img": "vitrina/p21",
          "nombre": "El Tiramisú de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 34,
      "region": 4,
      "titulo": "Tuberías del cielo",
      "minimo": 10,
      "ensena": "La válvula elige por qué tubo sale el grifo: piensa a dónde va cada medida. Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Las tuberías del cielo vuelven a fluir!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "M",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "G",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T1",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.506,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 35,
      "region": 4,
      "titulo": "La gran mezcla",
      "minimo": 12,
      "ensena": "Alimenta la Semilla de Matcha y brotará el puente de regaliz. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "La gran mezcla, resuelta. Ya piensas como un maestro."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "C",
            "G",
            "C"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 300,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "P"
              ]
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
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "R"
              ]
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
              "a": "S",
              "via": [
                [
                  348,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.429,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        }
      ]
    },
    {
      "id": 36,
      "region": 4,
      "jefe": true,
      "titulo": "El Corazón Primordial",
      "minimo": 12,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas.",
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
          "cap": 4,
          "capas": [
            "C",
            "G",
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "C",
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "G",
            "C"
          ],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  60,
                  338
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
                  236,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "Q"
              ]
            },
            {
              "a": "A",
              "via": [
                [
                  236,
                  150
                ],
                [
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
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
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.461,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p17",
          "nombre": "El Macaron de Lima"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "G": 1,
            "C": 2
          },
          "materia": "G",
          "necesita": 3,
          "img": "vitrina/p11",
          "nombre": "El Corazón Primordial"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Naranja"
        }
      ]
    },
    {
      "id": 37,
      "region": 5,
      "titulo": "La Feria de los Sabores",
      "minimo": 12,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [
        {
          "q": "grumble",
          "t": "El Corazón late, pero la Feria de los Sabores sigue apagada: sus dulces ya no saben a nada."
        },
        {
          "q": "miga",
          "t": "¡Pues les daremos sabores nuevos! Mezclas, combinaciones… ¡de todo!"
        }
      ],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "¡Primer puesto de la feria abierto!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "D",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "G"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "D",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "M",
            "G",
            "C",
            "M"
          ],
          "x": 315,
          "y": 300
        }
      ],
      "grifos": [
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
                  92,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        },
        {
          "id": "gD",
          "de": "D",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  272,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "G": 2,
            "M": 2
          },
          "materia": "G",
          "necesita": 4,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 265,
          "y": 505,
          "img": "vitrina/p07",
          "nombre": "La Dona de Matcha"
        }
      ]
    },
    {
      "id": 38,
      "region": 5,
      "titulo": "Puesto de macarons",
      "minimo": 12,
      "ensena": "La cápsula sólo se llena y se vacía por tubos. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Macarons de dos sabores para todos!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "C",
            "C"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "M",
            "C",
            "G"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 225,
          "y": 300,
          "sellada": true
        },
        {
          "id": "D",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 315,
          "y": 300
        }
      ],
      "grifos": [
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
                  92,
                  338
                ],
                [
                  95,
                  338
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
              "a": "T1",
              "via": [
                [
                  268,
                  356
                ],
                [
                  265,
                  356
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
          "rutas": [
            {
              "a": "D",
              "via": [
                [
                  2,
                  150
                ],
                [
                  315,
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
          "id": "T2",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "C": 2,
            "M": 2
          },
          "materia": "C",
          "necesita": 4,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 265,
          "y": 505,
          "img": "vitrina/p07",
          "nombre": "La Dona de Matcha"
        }
      ]
    },
    {
      "id": 39,
      "region": 5,
      "titulo": "Regaliz y chocolate",
      "minimo": 12,
      "ensena": "Alimenta la Semilla de Matcha y brotará el puente de regaliz. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Qué pareja tan rica!"
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
            "G",
            "G",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "C",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "R"
              ]
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
              "a": "T2",
              "via": [
                [
                  257,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        },
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "G": 2,
            "C": 1
          },
          "materia": "G",
          "necesita": 3,
          "img": "vitrina/p21",
          "nombre": "El Tiramisú de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 265,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        }
      ]
    },
    {
      "id": 40,
      "region": 5,
      "titulo": "La noria de nata",
      "minimo": 13,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "¡La noria vuelve a girar!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "G",
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "M",
            "M"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  103,
                  338
                ],
                [
                  95,
                  338
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
              "a": "T1",
              "via": [
                [
                  252,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "img": "vitrina/p16",
          "nombre": "La Dona Rosa de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 265,
          "y": 505,
          "pide": {
            "M": 2,
            "G": 2
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        }
      ]
    },
    {
      "id": 41,
      "region": 5,
      "titulo": "Tómbola de sabores",
      "minimo": 13,
      "ensena": "Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Premio para cada dulce!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "G",
            "C",
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
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
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T2",
              "via": [
                [
                  356,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            },
            {
              "a": "B",
              "via": [
                [
                  356,
                  150
                ],
                [
                  180,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            356,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "M": 2,
            "C": 2
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "M": 2,
            "C": 1
          },
          "materia": "M",
          "necesita": 3,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        }
      ]
    },
    {
      "id": 42,
      "region": 5,
      "titulo": "Carrusel de caramelo",
      "minimo": 13,
      "ensena": "Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡El carrusel da vueltas de alegría!"
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
            "C",
            "M",
            "C",
            "M",
            "M"
          ],
          "x": 60,
          "y": 300,
          "sellada": true
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
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
                  223,
                  356
                ],
                [
                  180,
                  356
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
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "img": "vitrina/p16",
          "nombre": "La Dona Rosa de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "C": 1,
            "M": 2
          },
          "materia": "C",
          "necesita": 3,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "C": 1,
            "G": 1
          },
          "materia": "C",
          "necesita": 2,
          "img": "vitrina/p21",
          "nombre": "El Tiramisú de Matcha"
        }
      ]
    },
    {
      "id": 43,
      "region": 5,
      "titulo": "El alambique de la feria",
      "minimo": 13,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. En el alambique, Caramelo + Menta se vuelven vapor para el molinillo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Vapor, chocolate y sabor. Esto ya es alta repostería."
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "M",
            "M",
            "C",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "C",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "alambique",
          "cap": 4,
          "capas": [
            "C",
            "C"
          ],
          "x": 300,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "cC",
          "de": "C",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [],
              "compuertas": []
            }
          ]
        },
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
                  103,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "T2",
              "via": [
                [
                  249,
                  356
                ],
                [
                  265,
                  356
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "K",
          "tipo": "compuerta"
        },
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "C": 2,
            "M": 2
          },
          "materia": "C",
          "necesita": 4,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 265,
          "y": 505,
          "pide": {
            "C": 1,
            "G": 1
          },
          "materia": "C",
          "necesita": 2,
          "img": "vitrina/p21",
          "nombre": "El Tiramisú de Matcha"
        },
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 2,
          "x": 279,
          "y": 92,
          "alCompletar": {
            "abre": [
              "K"
            ]
          },
          "nombre": "El Molinillo de Merengue"
        }
      ]
    },
    {
      "id": 44,
      "region": 5,
      "titulo": "La montaña rusa",
      "minimo": 14,
      "ensena": "La cápsula sólo se llena y se vacía por tubos. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "¡Subidas, bajadas y ni una gota perdida!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "U",
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
            "M",
            "U",
            "G",
            "U"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
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
                  236,
                  356
                ],
                [
                  180,
                  356
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
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T3",
          "tipo": "dona",
          "materia": "U",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p20",
          "nombre": "La Tarta de Arándanos"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "M": 1,
            "G": 1
          },
          "materia": "M",
          "necesita": 2,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "M": 1,
            "G": 2
          },
          "materia": "M",
          "necesita": 3,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        }
      ]
    },
    {
      "id": 45,
      "region": 5,
      "titulo": "Banquete de tres sabores",
      "minimo": 13,
      "ensena": "Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Esto es un festín!"
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
            "G",
            "M",
            "G",
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "M",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "C"
          ],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  95,
                  338
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
              "a": "T2",
              "via": [
                [
                  239,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  239,
                  150
                ],
                [
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            239,
            290
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "G": 2,
            "C": 2
          },
          "materia": "G",
          "necesita": 4,
          "img": "vitrina/p21",
          "nombre": "El Tiramisú de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 265,
          "y": 505,
          "pide": {
            "M": 2,
            "G": 2
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        }
      ]
    },
    {
      "id": 46,
      "region": 5,
      "titulo": "La carpa de los vapores",
      "minimo": 14,
      "ensena": "En el alambique, Caramelo + Menta se vuelven vapor para el molinillo. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Qué carpa más perfumada!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "G",
            "M",
            "M",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "alambique",
          "cap": 5,
          "capas": [
            "C",
            "C"
          ],
          "x": 300,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "cC",
          "de": "C",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [],
              "compuertas": []
            }
          ]
        },
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
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T1",
              "via": [
                [
                  116,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "K"
              ]
            }
          ],
          "valvula": [
            116,
            290
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
                  351,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            1
          ],
          "en": 0.462,
          "id": "K",
          "tipo": "compuerta"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "M": 2,
            "C": 1
          },
          "materia": "M",
          "necesita": 3,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p07",
          "nombre": "La Dona de Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "M": 2,
            "G": 1
          },
          "materia": "M",
          "necesita": 3,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        },
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 2,
          "x": 279,
          "y": 92,
          "alCompletar": {
            "abre": [
              "K"
            ]
          },
          "nombre": "El Molinillo de Merengue"
        }
      ]
    },
    {
      "id": 47,
      "region": 5,
      "titulo": "Uvas de la suerte",
      "minimo": 14,
      "ensena": "La Uva pesa 2 y se hunde al fondo. Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "¡La uva trajo suerte!"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "M",
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
            "C",
            "M",
            "U",
            "C"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "B",
              "via": [
                [
                  116,
                  150
                ],
                [
                  180,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
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
                  223,
                  356
                ],
                [
                  180,
                  356
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
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T2",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "M": 1,
            "C": 2
          },
          "materia": "M",
          "necesita": 3,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "U",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p20",
          "nombre": "La Tarta de Arándanos"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "M": 2,
            "C": 2
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        }
      ]
    },
    {
      "id": 48,
      "region": 5,
      "jefe": true,
      "titulo": "La Gran Tarta de la Feria",
      "minimo": 15,
      "ensena": "En el alambique, Caramelo + Menta se vuelven vapor para el molinillo. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [
        {
          "q": "grumble",
          "t": "La Gran Tarta de la Feria espera su mezcla perfecta. Todo lo que sabes, en un solo tablero."
        },
        {
          "q": "zippy",
          "t": "¡A por el último sabor!"
        }
      ],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "¡La Gran Tarta brilla con todos sus sabores! La feria entera vuelve a la vida."
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
            "C",
            "M",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "alambique",
          "cap": 4,
          "capas": [
            "M",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "C"
          ],
          "x": 300,
          "y": 300,
          "sellada": true
        }
      ],
      "grifos": [
        {
          "id": "cB",
          "de": "B",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [],
              "compuertas": []
            }
          ]
        },
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
                  103,
                  338
                ],
                [
                  95,
                  338
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
              "a": "T1",
              "via": [
                [
                  257,
                  356
                ],
                [
                  265,
                  356
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "K",
          "tipo": "compuerta"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "C": 1,
            "M": 1
          },
          "materia": "C",
          "necesita": 2,
          "img": "vitrina/p30",
          "nombre": "La Gran Tarta de la Feria"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 265,
          "y": 505,
          "pide": {
            "G": 1,
            "M": 1
          },
          "materia": "G",
          "necesita": 2,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        },
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 4,
          "x": 159,
          "y": 92,
          "alCompletar": {
            "abre": [
              "K"
            ]
          },
          "nombre": "El Molinillo de Merengue"
        }
      ]
    },
    {
      "id": 49,
      "region": 6,
      "titulo": "Olas de fresa",
      "minimo": 16,
      "ensena": "Nuevo sabor: la Fresa Estelar. La Uva pesa 2 y se hunde al fondo.",
      "intro": [
        {
          "q": "grumble",
          "t": "Más allá de la feria se extiende el Mar de Gelatina. Aquí llega un sabor nuevo: la Fresa Estelar."
        },
        {
          "q": "miga",
          "t": "¡Fresa! ¡Mi favorita!"
        }
      ],
      "guia": [
        {
          "q": "zippy",
          "t": "¡Sabor nuevo! La Fresa Estelar: rosa, dulce y sin trucos. Combina con todo.",
          "foco": [
            "T3"
          ],
          "nota": "fresa"
        }
      ],
      "fin": {
        "q": "zippy",
        "t": "¡Sabe a gloria!",
        "voz": "fin_pool_1"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "C",
            "U"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "U",
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
            "F",
            "C"
          ],
          "x": 300,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  124,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  124,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            124,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T3",
          "tipo": "dona",
          "materia": "F",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "M": 1,
            "C": 2
          },
          "materia": "M",
          "necesita": 3,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "U": 2,
            "C": 1
          },
          "materia": "U",
          "necesita": 3,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Uva y Caramelo"
        }
      ]
    },
    {
      "id": 50,
      "region": 6,
      "titulo": "Islas de gelatina",
      "minimo": 14,
      "ensena": "Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cada medida en su sitio. Precioso.",
        "voz": "fin_pool_2"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "F"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "C",
            "M",
            "C"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "C",
            "M"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
          "x": 315,
          "y": 300,
          "sellada": true
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
                  88,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T3",
              "via": [
                [
                  178,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p15",
          "nombre": "La Dona Capuchino"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "M": 1,
            "F": 1
          },
          "materia": "M",
          "necesita": 2,
          "img": "vitrina/p13",
          "nombre": "La Dona de Fresa y Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 51,
      "region": 6,
      "titulo": "La bahía temblorosa",
      "minimo": 14,
      "ensena": "Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Otro dulce despierto! Esto no para.",
        "voz": "fin_pool_3"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
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
            "F",
            "M"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "G",
            "F",
            "M"
          ],
          "x": 315,
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
              "a": "T3",
              "via": [
                [
                  88,
                  338
                ],
                [
                  60,
                  338
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
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  178,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "M": 2,
            "F": 2
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p13",
          "nombre": "La Dona de Fresa y Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 52,
      "region": 6,
      "titulo": "Corrientes dulces",
      "minimo": 17,
      "ensena": "Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Ni una gota de más. Eres todo un maestro.",
        "voz": "fin_pool_4"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "G",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "F"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "F",
            "F",
            "G"
          ],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T3",
              "via": [
                [
                  236,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  236,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  348,
                  374
                ],
                [
                  300,
                  374
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
          "materia": "F",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p15",
          "nombre": "La Dona Capuchino"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 53,
      "region": 6,
      "titulo": "El arrecife de azúcar",
      "minimo": 17,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Mezcla brillante!",
        "voz": "fin_pool_5"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "U",
            "U",
            "F",
            "F",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "G",
            "U"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G"
          ],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
                  223,
                  356
                ],
                [
                  180,
                  356
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
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "U",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        }
      ]
    },
    {
      "id": 54,
      "region": 6,
      "titulo": "Marea alta",
      "minimo": 17,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Lo pensaste bien. Se nota.",
        "voz": "fin_pool_6"
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
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
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
            "F",
            "M"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T2",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.506,
          "id": "R",
          "tipo": "regaliz"
        },
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 55,
      "region": 6,
      "titulo": "Perlas de tapioca",
      "minimo": 15,
      "ensena": "En el alambique, Caramelo + Menta se vuelven vapor para el molinillo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Huele de maravilla!",
        "voz": "fin_pool_7"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "F"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "alambique",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "G",
            "C",
            "F"
          ],
          "x": 300,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "cB",
          "de": "B",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [],
              "compuertas": []
            }
          ]
        },
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
                  103,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "K"
              ]
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
              "a": "T2",
              "via": [
                [
                  257,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "K",
          "tipo": "compuerta"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "C": 1,
            "F": 2
          },
          "materia": "C",
          "necesita": 3,
          "img": "vitrina/p13",
          "nombre": "La Dona de Caramelo y Fresa"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 265,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 2,
          "x": 159,
          "y": 92,
          "alCompletar": {
            "abre": [
              "K"
            ]
          },
          "nombre": "El Molinillo de Merengue"
        }
      ]
    },
    {
      "id": 56,
      "region": 6,
      "titulo": "El barco de galleta",
      "minimo": 16,
      "ensena": "El tubo de cristal sólo deja pasar la Menta. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Paso a paso, el reino recupera su sabor.",
        "voz": "fin_pool_8"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "F"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "F"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "G"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "R"
              ]
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
              "a": "T1",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.429,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 57,
      "region": 6,
      "titulo": "Espuma de mar",
      "minimo": 10,
      "ensena": "En el alambique, Caramelo + Menta se vuelven vapor para el molinillo. La báscula abre su puente al llegar al peso marcado.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Uno más para la colección!",
        "voz": "fin_pool_9"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "alambique",
          "cap": 4,
          "capas": [
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "C",
            "C",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "M",
            "C"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 4,
          "capas": [],
          "x": 300,
          "y": 470,
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
          "id": "cA",
          "de": "A",
          "lado": "arriba",
          "sale": "der",
          "rutas": [
            {
              "a": "TV",
              "via": [],
              "compuertas": []
            }
          ]
        },
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
                  111,
                  350
                ],
                [
                  60,
                  350
                ]
              ],
              "compuertas": [
                "P"
              ]
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
                  223,
                  334
                ],
                [
                  180,
                  334
                ]
              ],
              "compuertas": [
                "K"
              ]
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
              "a": "S",
              "via": [
                [
                  343,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.76,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.334,
          "id": "K",
          "tipo": "compuerta"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 4,
          "x": 81,
          "y": 92,
          "alCompletar": {
            "abre": [
              "K"
            ]
          },
          "nombre": "El Molinillo de Merengue"
        }
      ]
    },
    {
      "id": 58,
      "region": 6,
      "titulo": "Faro a la vista",
      "minimo": 16,
      "ensena": "La cápsula sólo se llena y se vacía por tubos. Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Dulce, exacto y elegante.",
        "voz": "fin_pool_10"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "M",
            "M",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "G",
            "G",
            "M",
            "G"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
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
                  236,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  236,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
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
                  356,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  356,
                  132
                ],
                [
                  60,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            356,
            290
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 59,
      "region": 6,
      "titulo": "Tormenta de sirope",
      "minimo": 17,
      "ensena": "El matraz entra y sale de una medida en una. La válvula elige por qué tubo sale el grifo: piensa a dónde va cada medida.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Esto merece una fiesta!",
        "voz": "fin_pool_11"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "F",
            "F",
            "F",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 4,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  116,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 60,
      "region": 6,
      "jefe": true,
      "titulo": "El Faro de Gelatina",
      "minimo": 16,
      "ensena": "El tubo de cristal sólo deja pasar la Menta. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "¡El faro vuelve a brillar sobre el mar!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "matraz",
          "cap": 4,
          "capas": [
            "C",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "M",
            "C",
            "F"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "F"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  108,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
                  223,
                  356
                ],
                [
                  180,
                  356
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
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p27",
          "nombre": "El Faro de Gelatina"
        }
      ]
    },
    {
      "id": 61,
      "region": 7,
      "titulo": "Primeros picos",
      "minimo": 17,
      "ensena": "Nuevo sabor: el Limón Solar. El matraz entra y sale de una medida en una.",
      "intro": [
        {
          "q": "zappy",
          "t": "En las Cumbres de Merengue brilla el Limón Solar. Cuidado: aquí hay poco sitio para equivocarse."
        }
      ],
      "guia": [
        {
          "q": "zappy",
          "t": "El Limón Solar es amarillo brillante. No lo confundas con el Caramelo, que es naranja.",
          "foco": [
            "T1"
          ],
          "nota": "limon"
        }
      ],
      "fin": {
        "q": "zippy",
        "t": "¡Sabe a gloria!",
        "voz": "fin_pool_1"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "G",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "C",
            "L",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "alambique",
          "cap": 2,
          "capas": [
            "L"
          ],
          "x": 300,
          "y": 300
        }
      ],
      "grifos": [
        {
          "id": "cC",
          "de": "C",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [],
              "compuertas": []
            }
          ]
        },
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
                  103,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "K"
              ]
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
              "a": "T1",
              "via": [
                [
                  249,
                  356
                ],
                [
                  265,
                  356
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
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "K",
          "tipo": "compuerta"
        },
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "L",
          "necesita": 3,
          "x": 265,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        },
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 2,
          "x": 279,
          "y": 92,
          "alCompletar": {
            "abre": [
              "K"
            ]
          },
          "nombre": "El Molinillo de Merengue"
        }
      ]
    },
    {
      "id": 62,
      "region": 7,
      "titulo": "El sendero de limón",
      "minimo": 14,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cada medida en su sitio. Precioso.",
        "voz": "fin_pool_2"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "E",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "M"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "U",
            "U",
            "C"
          ],
          "x": 180,
          "y": 300,
          "sellada": true
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "U",
            "M"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 330,
          "y": 300
        }
      ],
      "grifos": [
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
                  62,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T2",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gF",
          "de": "F",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  287,
                  374
                ],
                [
                  300,
                  374
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
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "M": 1,
            "C": 1
          },
          "materia": "M",
          "necesita": 2,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "L": 1,
            "M": 1
          },
          "materia": "L",
          "necesita": 2,
          "img": "vitrina/p21",
          "nombre": "La Tarta de Limón y Menta"
        }
      ]
    },
    {
      "id": 63,
      "region": 7,
      "titulo": "Nieve de merengue",
      "minimo": 17,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Otro dulce despierto! Esto no para.",
        "voz": "fin_pool_3"
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
            "U"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "F",
            "C"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "F",
            "F",
            "F"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "U"
          ],
          "x": 330,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 2,
          "capas": [],
          "x": 60,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  73,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T1",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "P"
              ]
            }
          ]
        },
        {
          "id": "gF",
          "de": "F",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  287,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.429,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gF",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "U",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 64,
      "region": 7,
      "titulo": "Ventisca dulce",
      "minimo": 18,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Ni una gota de más. Eres todo un maestro.",
        "voz": "fin_pool_4"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "M",
            "L"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 300,
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
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
              "a": "T3",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T2",
              "via": [
                [
                  348,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.506,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "L",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        }
      ]
    },
    {
      "id": 65,
      "region": 7,
      "titulo": "El refugio de montaña",
      "minimo": 18,
      "ensena": "Alimenta la Semilla de Matcha y brotará el puente de regaliz. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Mezcla brillante!",
        "voz": "fin_pool_5"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "L",
            "M",
            "M"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "M",
            "M"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "L",
            "M"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 315,
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
              "a": "T2",
              "via": [
                [
                  88,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
              "a": "T3",
              "via": [
                [
                  183,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
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
          "ruta": [
            "gE",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "L",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 66,
      "region": 7,
      "titulo": "Cornisa estrecha",
      "minimo": 13,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Lo pensaste bien. Se nota.",
        "voz": "fin_pool_6"
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
            "L",
            "G"
          ],
          "x": 60,
          "y": 300,
          "sellada": true
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
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
            "L",
            "C",
            "G"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 1,
          "capas": [],
          "x": 180,
          "y": 470,
          "bascula": {
            "umbral": 1,
            "abre": [
              "P"
            ]
          }
        }
      ],
      "grifos": [
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
                  124,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "S",
              "via": [
                [
                  124,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            124,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.395,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "L",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 67,
      "region": 7,
      "titulo": "El paso helado",
      "minimo": 17,
      "ensena": "La Uva pesa 2 y se hunde al fondo. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Huele de maravilla!",
        "voz": "fin_pool_7"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "C",
            "U"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "U",
            "C",
            "G"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
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
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T2",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "C": 1,
            "U": 2
          },
          "materia": "C",
          "necesita": 3,
          "img": "vitrina/p28",
          "nombre": "La Tarta de Uva y Caramelo"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "C": 1,
            "M": 2
          },
          "materia": "C",
          "necesita": 3,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        }
      ]
    },
    {
      "id": 68,
      "region": 7,
      "titulo": "Teleférico de caramelo",
      "minimo": 15,
      "ensena": "El matraz entra y sale de una medida en una. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Paso a paso, el reino recupera su sabor.",
        "voz": "fin_pool_8"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "G"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "C",
            "G",
            "G"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 225,
          "y": 300,
          "sellada": true
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "G"
          ],
          "x": 315,
          "y": 300
        }
      ],
      "grifos": [
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
                  87,
                  338
                ],
                [
                  95,
                  338
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
              "a": "T2",
              "via": [
                [
                  268,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 265,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 69,
      "region": 7,
      "titulo": "Aludes de azúcar",
      "minimo": 14,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Uno más para la colección!",
        "voz": "fin_pool_9"
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
            "F",
            "M"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "L",
            "M"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "L",
            "G"
          ],
          "x": 330,
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
              "a": "T3",
              "via": [
                [
                  73,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
              "a": "T1",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gF",
          "de": "F",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  287,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.429,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "L",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "F": 1,
            "G": 1
          },
          "materia": "F",
          "necesita": 2,
          "img": "vitrina/p11",
          "nombre": "La Tarta de Fresa y Matcha"
        }
      ]
    },
    {
      "id": 70,
      "region": 7,
      "titulo": "La cueva de cristal",
      "minimo": 14,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Dulce, exacto y elegante.",
        "voz": "fin_pool_10"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "G",
            "F"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "F",
            "G",
            "G"
          ],
          "x": 300,
          "y": 300,
          "sellada": true
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 2,
          "capas": [],
          "x": 300,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
              "a": "T1",
              "via": [
                [
                  116,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
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
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "P"
              ]
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
              "a": "S",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.429,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 71,
      "region": 7,
      "titulo": "Casi en la cima",
      "minimo": 17,
      "ensena": "Alimenta la Semilla de Matcha y brotará el puente de regaliz. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Esto merece una fiesta!",
        "voz": "fin_pool_11"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "M",
            "L",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "L",
            "M"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
                  236,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "cristal": true,
              "compuertas": [
                "R"
              ]
            },
            {
              "a": "T2",
              "via": [
                [
                  236,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.461,
          "id": "R",
          "tipo": "regaliz"
        },
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.351,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "L",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        }
      ]
    },
    {
      "id": 72,
      "region": 7,
      "jefe": true,
      "titulo": "La Cima Nevada",
      "minimo": 15,
      "ensena": "El matraz entra y sale de una medida en una. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Hemos llegado a la cima!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "C"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "C"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  121,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T1",
              "via": [
                [
                  121,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            121,
            290
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  223,
                  374
                ],
                [
                  300,
                  374
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
          "ruta": [
            "gB",
            0
          ],
          "en": 0.506,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p23",
          "nombre": "La Tarta de la Cima"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "M": 1,
            "C": 1
          },
          "materia": "M",
          "necesita": 2,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        }
      ]
    },
    {
      "id": 73,
      "region": 8,
      "titulo": "Lianas de regaliz",
      "minimo": 12,
      "ensena": "Nuevo sabor: el Arándano Eléctrico. Usa la Reserva para apartar lo que estorba.",
      "intro": [
        {
          "q": "zippy",
          "t": "¡Qué selva tan espesa! Entre el cacao crece el Arándano Eléctrico."
        }
      ],
      "guia": [
        {
          "q": "miga",
          "t": "¡Arándano Eléctrico! Es el azul con la coronita. Ya tienes siete sabores.",
          "foco": [],
          "nota": "arandano"
        }
      ],
      "fin": {
        "q": "zippy",
        "t": "¡Sabe a gloria!",
        "voz": "fin_pool_1"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "G",
            "C",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "alambique",
          "cap": 2,
          "capas": [],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "M",
            "M"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "H",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
          "x": 60,
          "y": 470,
          "nombre": "Reserva"
        }
      ],
      "grifos": [
        {
          "id": "cB",
          "de": "B",
          "lado": "arriba",
          "sale": "izq",
          "rutas": [
            {
              "a": "TV",
              "via": [],
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
              "a": "H",
              "via": [
                [
                  129,
                  338
                ],
                [
                  60,
                  338
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
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  17,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "cristal": true,
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
              "a": "T1",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.506,
          "id": "K",
          "tipo": "compuerta"
        }
      ],
      "objetivos": [
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
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "TV",
          "tipo": "turbina",
          "materia": "V",
          "necesita": 4,
          "x": 159,
          "y": 92,
          "alCompletar": {
            "abre": [
              "K"
            ]
          },
          "nombre": "El Molinillo de Merengue"
        }
      ]
    },
    {
      "id": 74,
      "region": 8,
      "titulo": "El río de chocolate",
      "minimo": 11,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cada medida en su sitio. Precioso.",
        "voz": "fin_pool_2"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "B",
            "G",
            "G",
            "B"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
          "x": 330,
          "y": 300,
          "sellada": true
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 300,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  73,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "P"
              ]
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
              "a": "T1",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  298,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.429,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "B",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        }
      ]
    },
    {
      "id": 75,
      "region": 8,
      "titulo": "Hojas de menta",
      "minimo": 13,
      "ensena": "El tubo de cristal sólo deja pasar la Menta. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Otro dulce despierto! Esto no para.",
        "voz": "fin_pool_3"
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
            "U",
            "B",
            "C",
            "B"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
            "M"
          ],
          "x": 180,
          "y": 300,
          "sellada": true
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "B",
            "M"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
                  223,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T2",
              "via": [
                [
                  343,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "B",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "U",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        }
      ]
    },
    {
      "id": 76,
      "region": 8,
      "titulo": "El templo perdido",
      "minimo": 15,
      "ensena": "La Uva pesa 2 y se hunde al fondo. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Ni una gota de más. Eres todo un maestro.",
        "voz": "fin_pool_4"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "F",
            "F",
            "U"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "B"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
            "F",
            "M"
          ],
          "x": 315,
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
                  88,
                  338
                ],
                [
                  60,
                  338
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
                  177,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
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
          "x": 60,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "B": 1,
            "M": 1
          },
          "materia": "B",
          "necesita": 2,
          "img": "vitrina/p21",
          "nombre": "La Dona de Arándano y Menta"
        }
      ]
    },
    {
      "id": 77,
      "region": 8,
      "titulo": "Ranas de gominola",
      "minimo": 14,
      "ensena": "La Uva pesa 2 y se hunde al fondo. Un tubo devuelve materia a otro frasco de arriba: úsalo para reordenar las capas.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Mezcla brillante!",
        "voz": "fin_pool_5"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "E",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "B"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "U",
            "B",
            "B",
            "U"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "F"
          ],
          "x": 315,
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
              "a": "T3",
              "via": [
                [
                  88,
                  338
                ],
                [
                  60,
                  338
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
                  178,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T1",
              "via": [
                [
                  268,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "A",
              "via": [
                [
                  371,
                  150
                ],
                [
                  45,
                  150
                ]
              ],
              "compuertas": []
            },
            {
              "a": "B",
              "via": [
                [
                  371,
                  132
                ],
                [
                  135,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            371,
            290
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "U",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "B",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 78,
      "region": 8,
      "titulo": "El puente colgante",
      "minimo": 17,
      "ensena": "La Uva pesa 2 y se hunde al fondo. La cápsula sólo se llena y se vacía por tubos.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Lo pensaste bien. Se nota.",
        "voz": "fin_pool_6"
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
            "U",
            "B",
            "B",
            "B"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "capsula",
          "cap": 2,
          "capas": [],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 315,
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
              "a": "T3",
              "via": [
                [
                  88,
                  338
                ],
                [
                  60,
                  338
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
                  178,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T1",
              "via": [
                [
                  268,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "C",
              "via": [
                [
                  358,
                  150
                ],
                [
                  225,
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.507,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "B",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "U",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        }
      ]
    },
    {
      "id": 79,
      "region": 8,
      "titulo": "Lluvia de arándanos",
      "minimo": 16,
      "ensena": "Alimenta la Semilla de Matcha y brotará el puente de regaliz. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Huele de maravilla!",
        "voz": "fin_pool_7"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "E",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "L",
            "G"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "G",
            "F",
            "F"
          ],
          "x": 135,
          "y": 300,
          "sellada": true
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "G"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "C"
          ],
          "x": 315,
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
              "a": "T3",
              "via": [
                [
                  88,
                  338
                ],
                [
                  60,
                  338
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
                  178,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
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
          "ruta": [
            "gE",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "G": 1,
            "F": 1
          },
          "materia": "G",
          "necesita": 2,
          "img": "vitrina/p11",
          "nombre": "La Tarta de Fresa y Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "G": 2,
            "F": 1,
            "L": 1
          },
          "materia": "G",
          "necesita": 4,
          "img": "vitrina/p13",
          "nombre": "La Tarta de Fresa, Matcha y Limón"
        }
      ]
    },
    {
      "id": 80,
      "region": 8,
      "titulo": "Raíces profundas",
      "minimo": 13,
      "ensena": "Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Paso a paso, el reino recupera su sabor.",
        "voz": "fin_pool_8"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "E",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "C"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "L",
            "L"
          ],
          "x": 225,
          "y": 300,
          "sellada": true
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "M"
          ],
          "x": 315,
          "y": 300
        }
      ],
      "grifos": [
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
                  92,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "cristal": true,
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  272,
                  356
                ],
                [
                  265,
                  356
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
          "ruta": [
            "gE",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "L",
          "necesita": 3,
          "x": 265,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        }
      ]
    },
    {
      "id": 81,
      "region": 8,
      "titulo": "El claro escondido",
      "minimo": 14,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Uno más para la colección!",
        "voz": "fin_pool_9"
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
            "F",
            "C"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 4,
          "capas": [
            "G",
            "G",
            "F"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "F"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
          "x": 315,
          "y": 300
        }
      ],
      "grifos": [
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
                  87,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "T1",
              "via": [
                [
                  268,
                  356
                ],
                [
                  265,
                  356
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        },
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 265,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 82,
      "region": 8,
      "titulo": "Monos golosos",
      "minimo": 13,
      "ensena": "La Uva pesa 2 y se hunde al fondo. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Dulce, exacto y elegante.",
        "voz": "fin_pool_10"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "M"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "B",
            "U"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "U",
            "G"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "U"
          ],
          "x": 315,
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
              "a": "T3",
              "via": [
                [
                  88,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
                  178,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "U": 2,
            "B": 1
          },
          "materia": "U",
          "necesita": 3,
          "img": "vitrina/p11",
          "nombre": "La Dona de Arándano y Uva"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "M": 2,
            "G": 1,
            "U": 1
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p24",
          "nombre": "La Tarta Glaseada"
        }
      ]
    },
    {
      "id": 83,
      "region": 8,
      "titulo": "La cascada de cacao",
      "minimo": 14,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Esto merece una fiesta!",
        "voz": "fin_pool_11"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "E",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "B",
            "B",
            "B",
            "C"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "F"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C",
            "U"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "B"
          ],
          "x": 315,
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
                  88,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "T3",
              "via": [
                [
                  178,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "C": 1,
            "F": 1,
            "B": 2
          },
          "materia": "C",
          "necesita": 4,
          "img": "vitrina/p21",
          "nombre": "La Dona de Arándano, Caramelo y Fresa"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "B",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "U",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        }
      ]
    },
    {
      "id": 84,
      "region": 8,
      "jefe": true,
      "titulo": "El Árbol del Cacao",
      "minimo": 12,
      "ensena": "La báscula abre su puente al llegar al peso marcado. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡El árbol del cacao florece!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "F",
            "M"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "F",
            "M",
            "L"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "M"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "L"
          ],
          "x": 315,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 1,
          "capas": [],
          "x": 300,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  93,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "P"
              ]
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
                  178,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.345,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "L": 2,
            "F": 2,
            "M": 2
          },
          "materia": "L",
          "necesita": 6,
          "img": "vitrina/p28",
          "nombre": "El Árbol del Cacao"
        }
      ]
    },
    {
      "id": 85,
      "region": 9,
      "titulo": "Ladera humeante",
      "minimo": 16,
      "ensena": "El tubo de cristal sólo deja pasar la Menta. El matraz entra y sale de una medida en una.",
      "intro": [
        {
          "q": "grumble",
          "t": "El Volcán de Caramelo burbujea. Muchos frascos, muchos sabores: piensa cada paso."
        }
      ],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Sabe a gloria!",
        "voz": "fin_pool_1"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "L"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 3,
          "capas": [
            "M",
            "L",
            "M"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "G",
            "M"
          ],
          "x": 315,
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
                  88,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  183,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "M": 1,
            "L": 2,
            "C": 1
          },
          "materia": "M",
          "necesita": 4,
          "img": "vitrina/p20",
          "nombre": "El Macaron de Caramelo, Limón y Menta"
        }
      ]
    },
    {
      "id": 86,
      "region": 9,
      "titulo": "Ríos de lava dulce",
      "minimo": 14,
      "ensena": "Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cada medida en su sitio. Precioso.",
        "voz": "fin_pool_2"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "E",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "B"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "B",
            "M",
            "C"
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
            "B"
          ],
          "x": 225,
          "y": 300,
          "sellada": true
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "G",
            "C"
          ],
          "x": 315,
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
                  88,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
              "compuertas": [
                "R"
              ]
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
                  182,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  272,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "B",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        }
      ]
    },
    {
      "id": 87,
      "region": 9,
      "titulo": "El horno natural",
      "minimo": 15,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Otro dulce despierto! Esto no para.",
        "voz": "fin_pool_3"
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
            "G",
            "U",
            "U"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "U"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "M"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "M"
          ],
          "x": 330,
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
              "a": "T3",
              "via": [
                [
                  73,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
              "a": "T1",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gF",
          "de": "F",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  287,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.429,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "U",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 88,
      "region": 9,
      "titulo": "Géiseres de sirope",
      "minimo": 12,
      "ensena": "Usa la Reserva para apartar lo que estorba. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Ni una gota de más. Eres todo un maestro.",
        "voz": "fin_pool_4"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "F"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "C"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "F",
            "G",
            "C"
          ],
          "x": 315,
          "y": 300,
          "sellada": true
        },
        {
          "id": "H",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
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
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  88,
                  338
                ],
                [
                  60,
                  338
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
              "a": "H",
              "via": [
                [
                  178,
                  356
                ],
                [
                  180,
                  356
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
              "a": "T1",
              "via": [
                [
                  268,
                  374
                ],
                [
                  300,
                  374
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
          "id": "T2",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "C": 2,
            "F": 2
          },
          "materia": "C",
          "necesita": 4,
          "img": "vitrina/p13",
          "nombre": "La Dona de Caramelo y Fresa"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "G": 1,
            "M": 1
          },
          "materia": "G",
          "necesita": 2,
          "img": "vitrina/p17",
          "nombre": "El Macaron Menta-Matcha"
        }
      ]
    },
    {
      "id": 89,
      "region": 9,
      "titulo": "Rocas de turrón",
      "minimo": 14,
      "ensena": "Alimenta la Semilla de Matcha y brotará el puente de regaliz. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Mezcla brillante!",
        "voz": "fin_pool_5"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "U",
            "C"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "L"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "B",
            "G",
            "L"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
          "x": 315,
          "y": 300,
          "sellada": true
        }
      ],
      "grifos": [
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
                  92,
                  338
                ],
                [
                  95,
                  338
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
              "a": "T1",
              "via": [
                [
                  268,
                  356
                ],
                [
                  265,
                  356
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 265,
          "y": 505,
          "pide": {
            "U": 1,
            "B": 1,
            "L": 2
          },
          "materia": "U",
          "necesita": 4,
          "img": "vitrina/p13",
          "nombre": "La Tarta de Arándano, Limón y Uva"
        }
      ]
    },
    {
      "id": 90,
      "region": 9,
      "titulo": "Cenizas de canela",
      "minimo": 13,
      "ensena": "El matraz entra y sale de una medida en una. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Lo pensaste bien. Se nota.",
        "voz": "fin_pool_6"
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
            "M"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 4,
          "capas": [
            "B",
            "L"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C",
            "M"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "L",
            "C"
          ],
          "x": 315,
          "y": 300
        }
      ],
      "grifos": [
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
                  87,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "T2",
              "via": [
                [
                  268,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "cristal": true,
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "B": 1,
            "C": 1,
            "L": 1
          },
          "materia": "B",
          "necesita": 3,
          "img": "vitrina/p17",
          "nombre": "La Tarta de Arándano, Caramelo y Limón"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 265,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 91,
      "region": 9,
      "titulo": "El túnel ardiente",
      "minimo": 15,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Huele de maravilla!",
        "voz": "fin_pool_7"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "E",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "F",
            "U"
          ],
          "x": 30,
          "y": 300,
          "sellada": true
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "C"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "U",
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "U",
            "F",
            "G",
            "F"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 330,
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
              "a": "T2",
              "via": [
                [
                  73,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T3",
              "via": [
                [
                  148,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gF",
          "de": "F",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  287,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.425,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "U",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        }
      ]
    },
    {
      "id": 92,
      "region": 9,
      "titulo": "Burbujas de caramelo",
      "minimo": 12,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. Usa la Reserva para apartar lo que estorba.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Paso a paso, el reino recupera su sabor.",
        "voz": "fin_pool_8"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "U",
            "F"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "F",
            "M"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "M"
          ],
          "x": 330,
          "y": 300
        },
        {
          "id": "H",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 60,
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
          "rutas": [
            {
              "a": "H",
              "via": [
                [
                  73,
                  338
                ],
                [
                  60,
                  338
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
                  148,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  298,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gE",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "U": 1,
            "M": 1,
            "F": 2
          },
          "materia": "U",
          "necesita": 4,
          "img": "vitrina/p28",
          "nombre": "El Pastel de Fresa, Menta y Uva"
        }
      ]
    },
    {
      "id": 93,
      "region": 9,
      "titulo": "Fumarolas de azúcar",
      "minimo": 16,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Uno más para la colección!",
        "voz": "fin_pool_9"
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
            "U",
            "C",
            "M"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "M"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "U"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
            "M"
          ],
          "x": 330,
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
                  73,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
              "a": "T2",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gF",
          "de": "F",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  287,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gF",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "U",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 94,
      "region": 9,
      "titulo": "El borde del cráter",
      "minimo": 16,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Dulce, exacto y elegante.",
        "voz": "fin_pool_10"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "E",
        "txt": "Dejar vacío el cuarto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "M",
            "M"
          ],
          "x": 105,
          "y": 300,
          "sellada": true
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "G"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "M"
          ],
          "x": 330,
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
              "a": "T2",
              "via": [
                [
                  73,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "cristal": true,
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
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  298,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gE",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 95,
      "region": 9,
      "titulo": "Erupción de sabor",
      "minimo": 18,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. Usa la Reserva para apartar lo que estorba.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Esto merece una fiesta!",
        "voz": "fin_pool_11"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "F",
        "txt": "Dejar vacío el quinto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "L",
            "L"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "capsula",
          "cap": 1,
          "capas": [],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "L",
            "G",
            "G"
          ],
          "x": 330,
          "y": 300
        },
        {
          "id": "H",
          "forma": "frasco",
          "cap": 4,
          "capas": [],
          "x": 60,
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
          "rutas": [
            {
              "a": "H",
              "via": [
                [
                  73,
                  338
                ],
                [
                  60,
                  338
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
              "a": "T1",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  298,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "E",
              "via": [
                [
                  148,
                  150
                ],
                [
                  255,
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
          "ruta": [
            "gE",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "L",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        }
      ]
    },
    {
      "id": 96,
      "region": 9,
      "jefe": true,
      "titulo": "El Cráter Dorado",
      "minimo": 16,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. La cápsula sólo se llena y se vacía por tubos.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "¡El volcán se ha calmado!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "capsula",
          "cap": 2,
          "capas": [],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "M"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "F",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "G",
            "C",
            "M"
          ],
          "x": 330,
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
                  73,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "cristal": true,
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  298,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "A",
              "via": [
                [
                  137,
                  150
                ],
                [
                  30,
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
          "ruta": [
            "gE",
            0
          ],
          "en": 0.426,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 265,
          "y": 505,
          "pide": {
            "F": 1,
            "C": 1,
            "G": 2
          },
          "materia": "F",
          "necesita": 4,
          "img": "vitrina/p06",
          "nombre": "La Tarta del Cráter"
        }
      ]
    },
    {
      "id": 97,
      "region": 10,
      "titulo": "Estantes de azúcar",
      "minimo": 16,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [
        {
          "q": "zappy",
          "t": "En la Biblioteca de Recetas se guardan las mezclas más difíciles del reino."
        }
      ],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Sabe a gloria!",
        "voz": "fin_pool_1"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "capsula",
          "cap": 2,
          "capas": [],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "G",
            "F"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "F",
            "F",
            "C"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 2,
          "capas": [],
          "x": 300,
          "y": 470,
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
                  103,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "compuertas": [
                "P"
              ]
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
                  223,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": [
                "R"
              ]
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
              "a": "S",
              "via": [
                [
                  356,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  356,
                  150
                ],
                [
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            356,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.334,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.403,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 98,
      "region": 10,
      "titulo": "La sección prohibida",
      "minimo": 13,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Usa la Reserva para apartar lo que estorba.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cada medida en su sitio. Precioso.",
        "voz": "fin_pool_2"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "C"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "B",
            "C"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "M"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "B"
          ],
          "x": 315,
          "y": 300
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 2,
          "capas": [],
          "x": 225,
          "y": 470,
          "bascula": {
            "umbral": 1,
            "abre": [
              "P"
            ]
          }
        },
        {
          "id": "H",
          "forma": "frasco",
          "cap": 3,
          "capas": [],
          "x": 315,
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
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  88,
                  334
                ],
                [
                  45,
                  334
                ]
              ],
              "compuertas": [
                "P"
              ]
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
                  178,
                  350
                ],
                [
                  135,
                  350
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "S",
              "via": [
                [
                  268,
                  366
                ],
                [
                  225,
                  366
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "H",
              "via": [
                [
                  358,
                  382
                ],
                [
                  315,
                  382
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.334,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.403,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 45,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "B",
          "necesita": 2,
          "x": 135,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        }
      ]
    },
    {
      "id": 99,
      "region": 10,
      "titulo": "Recetas olvidadas",
      "minimo": 14,
      "ensena": "La báscula abre su puente al llegar al peso marcado. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Otro dulce despierto! Esto no para.",
        "voz": "fin_pool_3"
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
            "F",
            "C",
            "C",
            "U"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "F"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "U"
          ],
          "x": 300,
          "y": 300,
          "sellada": true
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 60,
          "y": 470,
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
              "a": "S",
              "via": [
                [
                  103,
                  334
                ],
                [
                  60,
                  334
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
                  223,
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
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  343,
                  366
                ],
                [
                  300,
                  366
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.472,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "U",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "F",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 100,
      "region": 10,
      "titulo": "El atril de cobre",
      "minimo": 14,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Ni una gota de más. Eres todo un maestro.",
        "voz": "fin_pool_4"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "U",
            "L"
          ],
          "x": 60,
          "y": 300,
          "sellada": true
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "L",
            "C",
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
            "G",
            "G",
            "L",
            "U"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  116,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
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
                  236,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T1",
              "via": [
                [
                  236,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "B",
              "via": [
                [
                  343,
                  132
                ],
                [
                  180,
                  132
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
          "id": "T3",
          "tipo": "dona",
          "materia": "U",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p10",
          "nombre": "La Dona Galáctica"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "L",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        }
      ]
    },
    {
      "id": 101,
      "region": 10,
      "titulo": "Tinta de arándano",
      "minimo": 19,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Mezcla brillante!",
        "voz": "fin_pool_5"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "B",
            "G",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "G",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "M",
            "B",
            "G"
          ],
          "x": 300,
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
                  103,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "cristal": true,
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
                  236,
                  350
                ],
                [
                  180,
                  350
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
                  60,
                  150
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  236,
                  132
                ],
                [
                  300,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
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
                  348,
                  366
                ],
                [
                  300,
                  366
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
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "B",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 102,
      "region": 10,
      "titulo": "Páginas pegajosas",
      "minimo": 18,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Lo pensaste bien. Se nota.",
        "voz": "fin_pool_6"
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
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "M",
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "M",
            "L"
          ],
          "x": 300,
          "y": 300
        }
      ],
      "grifos": [
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
                  236,
                  334
                ],
                [
                  95,
                  334
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T2",
              "via": [
                [
                  236,
                  350
                ],
                [
                  265,
                  350
                ]
              ],
              "compuertas": [
                "R"
              ]
            },
            {
              "a": "C",
              "via": [
                [
                  236,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "B",
              "via": [
                [
                  343,
                  132
                ],
                [
                  180,
                  132
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            1
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 95,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 265,
          "y": 505,
          "pide": {
            "M": 2,
            "C": 2,
            "L": 1
          },
          "materia": "M",
          "necesita": 5,
          "img": "vitrina/p20",
          "nombre": "El Macaron de Caramelo, Limón y Menta"
        }
      ]
    },
    {
      "id": 103,
      "region": 10,
      "titulo": "El índice secreto",
      "minimo": 17,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Huele de maravilla!",
        "voz": "fin_pool_7"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "F",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C",
            "F"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "F"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 5,
          "capas": [],
          "x": 60,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  116,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
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
                  236,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "cristal": true,
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  236,
                  132
                ],
                [
                  60,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  343,
                  366
                ],
                [
                  300,
                  366
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.472,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 104,
      "region": 10,
      "titulo": "La sala de lectura",
      "minimo": 18,
      "ensena": "La báscula abre su puente al llegar al peso marcado. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Paso a paso, el reino recupera su sabor.",
        "voz": "fin_pool_8"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "capsula",
          "cap": 3,
          "capas": [],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "B",
            "M",
            "L",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "M",
            "L",
            "B"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 2,
          "capas": [],
          "x": 225,
          "y": 470,
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
              "a": "T3",
              "via": [
                [
                  17,
                  334
                ],
                [
                  45,
                  334
                ]
              ],
              "cristal": true,
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
                  236,
                  350
                ],
                [
                  135,
                  350
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "S",
              "via": [
                [
                  236,
                  366
                ],
                [
                  225,
                  366
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  356,
                  382
                ],
                [
                  315,
                  382
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  356,
                  150
                ],
                [
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            356,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.447,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 45,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "L",
          "necesita": 3,
          "x": 135,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "B",
          "necesita": 2,
          "x": 315,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        }
      ]
    },
    {
      "id": 105,
      "region": 10,
      "titulo": "Notas al margen",
      "minimo": 18,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Uno más para la colección!",
        "voz": "fin_pool_9"
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
            "L",
            "L",
            "M"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "L"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "matraz",
          "cap": 2,
          "capas": [
            "G",
            "M"
          ],
          "x": 300,
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
              "a": "T2",
              "via": [
                [
                  116,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
          ]
        },
        {
          "id": "gB",
          "de": "B",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  223,
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
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  361,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": [
                "R"
              ]
            },
            {
              "a": "A",
              "via": [
                [
                  361,
                  132
                ],
                [
                  60,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            361,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "L",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        }
      ]
    },
    {
      "id": 106,
      "region": 10,
      "titulo": "El archivo de sabores",
      "minimo": 13,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Dulce, exacto y elegante.",
        "voz": "fin_pool_10"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "M"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G",
            "C",
            "C"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "C"
          ],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "M"
          ],
          "x": 315,
          "y": 300
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 3,
          "capas": [],
          "x": 60,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  88,
                  334
                ],
                [
                  60,
                  334
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
                  178,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "T1",
              "via": [
                [
                  268,
                  366
                ],
                [
                  300,
                  366
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.471,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "C": 2,
            "M": 2
          },
          "materia": "C",
          "necesita": 4,
          "img": "vitrina/p29",
          "nombre": "La Tarta Menta-Caramelo"
        }
      ]
    },
    {
      "id": 107,
      "region": 10,
      "titulo": "La última página",
      "minimo": 13,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Esto merece una fiesta!",
        "voz": "fin_pool_11"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "L",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 3,
          "capas": [],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "L",
            "F",
            "F"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  334
                ],
                [
                  60,
                  334
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
                  241,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  241,
                  150
                ],
                [
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            241,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  356,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            },
            {
              "a": "B",
              "via": [
                [
                  356,
                  132
                ],
                [
                  180,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            356,
            290
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "F": 1,
            "L": 2
          },
          "materia": "F",
          "necesita": 3,
          "img": "vitrina/p27",
          "nombre": "El Macaron de Fresa y Limón"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "F": 1,
            "L": 1,
            "G": 1
          },
          "materia": "F",
          "necesita": 3,
          "img": "vitrina/p13",
          "nombre": "La Tarta de Fresa, Matcha y Limón"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 108,
      "region": 10,
      "jefe": true,
      "titulo": "El Gran Recetario",
      "minimo": 13,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. La báscula abre su puente al llegar al peso marcado.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "¡El Gran Recetario está completo!"
      },
      "ingenio": {
        "tipo": "sinPistas",
        "txt": "Resolver sin pistas"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "G"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "C",
            "C",
            "G"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 330,
          "y": 300
        },
        {
          "id": "S",
          "forma": "cuenco",
          "cap": 1,
          "capas": [],
          "x": 135,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  73,
                  334
                ],
                [
                  45,
                  334
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "S",
              "via": [
                [
                  148,
                  350
                ],
                [
                  135,
                  350
                ]
              ],
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  212,
                  366
                ],
                [
                  225,
                  366
                ]
              ],
              "compuertas": [
                "P"
              ]
            }
          ]
        },
        {
          "id": "gF",
          "de": "F",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  287,
                  382
                ],
                [
                  315,
                  382
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
          "ruta": [
            "gE",
            0
          ],
          "en": 0.5,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gF",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        },
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 45,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 225,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "C",
          "necesita": 3,
          "x": 315,
          "y": 505,
          "img": "vitrina/p22",
          "nombre": "La Tarta del Recetario"
        }
      ]
    },
    {
      "id": 109,
      "region": 11,
      "titulo": "Las puertas del palacio",
      "minimo": 14,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. Un sello de chocolate tapa un frasco: fúndelo vertiendo Caramelo.",
      "intro": [
        {
          "q": "grumble",
          "t": "El Palacio de las Estrellas. Aquí acaba el mapa… pero no la repostería."
        },
        {
          "q": "miga",
          "t": "¡A por el último desafío!"
        }
      ],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Sabe a gloria!",
        "voz": "fin_pool_1"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "F",
            "B"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "B"
          ],
          "x": 180,
          "y": 300,
          "sellada": true
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "C",
            "B",
            "F"
          ],
          "x": 300,
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
                  103,
                  334
                ],
                [
                  95,
                  334
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
                  236,
                  350
                ],
                [
                  265,
                  350
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
                  60,
                  150
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "B",
              "via": [
                [
                  343,
                  132
                ],
                [
                  180,
                  132
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
          "x": 95,
          "y": 505,
          "pide": {
            "C": 1,
            "B": 1
          },
          "materia": "C",
          "necesita": 2,
          "img": "vitrina/p21",
          "nombre": "La Tarta de Arándano y Caramelo"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 265,
          "y": 505,
          "pide": {
            "B": 1,
            "F": 2
          },
          "materia": "B",
          "necesita": 3,
          "img": "vitrina/p27",
          "nombre": "El Pastel de Arándano y Fresa"
        }
      ]
    },
    {
      "id": 110,
      "region": 11,
      "titulo": "El salón de espejos",
      "minimo": 15,
      "ensena": "La báscula abre su puente al llegar al peso marcado. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Cada medida en su sitio. Precioso.",
        "voz": "fin_pool_2"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "L",
            "B",
            "B"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "L",
            "L",
            "B",
            "G",
            "L"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 180,
          "y": 470,
          "bascula": {
            "umbral": 1,
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
                  103,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "compuertas": [
                "P"
              ]
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
              "a": "S",
              "via": [
                [
                  236,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": []
            },
            {
              "a": "T1",
              "via": [
                [
                  236,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.334,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "L": 2,
            "B": 2
          },
          "materia": "L",
          "necesita": 4,
          "img": "vitrina/p28",
          "nombre": "El Macaron de Arándano y Limón"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "G": 2,
            "L": 2
          },
          "materia": "G",
          "necesita": 4,
          "img": "vitrina/p13",
          "nombre": "La Tarta de Matcha y Limón"
        }
      ]
    },
    {
      "id": 111,
      "region": 11,
      "titulo": "La escalera de caramelo",
      "minimo": 20,
      "ensena": "Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde. La cápsula sólo se llena y se vacía por tubos.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Otro dulce despierto! Esto no para.",
        "voz": "fin_pool_3"
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
            "C",
            "G",
            "F"
          ],
          "x": 45,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "B",
            "F",
            "G"
          ],
          "x": 135,
          "y": 300
        },
        {
          "id": "C",
          "forma": "capsula",
          "cap": 2,
          "capas": [],
          "x": 225,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 315,
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
              "a": "T2",
              "via": [
                [
                  88,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  272,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "C",
              "via": [
                [
                  178,
                  150
                ],
                [
                  225,
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
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "R",
          "tipo": "regaliz"
        },
        {
          "ruta": [
            "gE",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "B": 1,
            "F": 2
          },
          "materia": "B",
          "necesita": 3,
          "img": "vitrina/p27",
          "nombre": "El Pastel de Arándano y Fresa"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 265,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        }
      ]
    },
    {
      "id": 112,
      "region": 11,
      "titulo": "El jardín de estrellas",
      "minimo": 18,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Ni una gota de más. Eres todo un maestro.",
        "voz": "fin_pool_4"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "F",
            "G",
            "C",
            "F"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "F",
            "C",
            "C"
          ],
          "x": 180,
          "y": 300,
          "sellada": true
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 300,
          "y": 470,
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
              "a": "T1",
              "via": [
                [
                  116,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "compuertas": [
                "P"
              ]
            },
            {
              "a": "B",
              "via": [
                [
                  116,
                  150
                ],
                [
                  180,
                  150
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  116,
                  132
                ],
                [
                  300,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
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
                  223,
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
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  343,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.376,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        }
      ]
    },
    {
      "id": 113,
      "region": 11,
      "titulo": "La cocina real",
      "minimo": 15,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Mezcla brillante!",
        "voz": "fin_pool_5"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "matraz",
          "cap": 5,
          "capas": [
            "F",
            "L",
            "F"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "B",
            "F"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "B",
            "L",
            "C",
            "B"
          ],
          "x": 300,
          "y": 300,
          "sellada": true
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
                  108,
                  334
                ],
                [
                  60,
                  334
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
                  223,
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
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  356,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            },
            {
              "a": "B",
              "via": [
                [
                  356,
                  150
                ],
                [
                  180,
                  150
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  356,
                  132
                ],
                [
                  60,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            356,
            290
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "L",
          "necesita": 2,
          "x": 60,
          "y": 505,
          "img": "vitrina/p26",
          "nombre": "La Tarta de Limón"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "F",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "B",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        }
      ]
    },
    {
      "id": 114,
      "region": 11,
      "titulo": "El baile de los sabores",
      "minimo": 15,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Lo pensaste bien. Se nota.",
        "voz": "fin_pool_6"
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
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "M",
            "M",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "B",
            "M",
            "C",
            "M",
            "B"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  103,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "cristal": true,
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
                  236,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": []
            },
            {
              "a": "C",
              "via": [
                [
                  236,
                  150
                ],
                [
                  300,
                  150
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  236,
                  132
                ],
                [
                  60,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            236,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T1",
              "via": [
                [
                  343,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.472,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "B",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p08",
          "nombre": "La Dona de Arándano"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 300,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        }
      ]
    },
    {
      "id": 115,
      "region": 11,
      "titulo": "La torre de merengue",
      "minimo": 16,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. La Uva pesa 2 y se hunde al fondo.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Huele de maravilla!",
        "voz": "fin_pool_7"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "C",
        "txt": "Dejar vacío el tercer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 2,
          "capas": [],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "G"
          ],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "U"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "C",
            "G",
            "U"
          ],
          "x": 330,
          "y": 300
        }
      ],
      "grifos": [
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
                  62,
                  338
                ],
                [
                  95,
                  338
                ]
              ],
              "compuertas": [
                "R"
              ]
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  298,
                  356
                ],
                [
                  265,
                  356
                ]
              ],
              "compuertas": [
                "Q"
              ]
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gB",
            0
          ],
          "en": 0.345,
          "id": "R",
          "tipo": "regaliz"
        },
        {
          "ruta": [
            "gE",
            0
          ],
          "en": 0.426,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 95,
          "y": 505,
          "pide": {
            "G": 1,
            "U": 2,
            "C": 2
          },
          "materia": "G",
          "necesita": 5,
          "img": "vitrina/p25",
          "nombre": "La Tarta de Melocotón"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "G",
          "necesita": 1,
          "x": 265,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        }
      ]
    },
    {
      "id": 116,
      "region": 11,
      "titulo": "El trono de chocolate",
      "minimo": 15,
      "ensena": "Dos tuberías unen los frascos de arriba: úsalas para reordenar las capas. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "Paso a paso, el reino recupera su sabor.",
        "voz": "fin_pool_8"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "A",
        "txt": "Dejar vacío el primer recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 3,
          "capas": [
            "C",
            "M"
          ],
          "x": 60,
          "y": 300,
          "sellada": true
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "M",
            "G",
            "M"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "G"
          ],
          "x": 300,
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
              "a": "T3",
              "via": [
                [
                  116,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "cristal": true,
              "compuertas": []
            },
            {
              "a": "T1",
              "via": [
                [
                  116,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            116,
            290
          ]
        },
        {
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "izq",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  244,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            },
            {
              "a": "A",
              "via": [
                [
                  244,
                  150
                ],
                [
                  60,
                  150
                ]
              ],
              "compuertas": []
            },
            {
              "a": "B",
              "via": [
                [
                  244,
                  132
                ],
                [
                  180,
                  132
                ]
              ],
              "compuertas": []
            }
          ],
          "valvula": [
            244,
            290
          ]
        }
      ],
      "compuertas": [],
      "objetivos": [
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 1,
          "x": 300,
          "y": 505,
          "img": "vitrina/p15",
          "nombre": "La Dona Capuchino"
        }
      ]
    },
    {
      "id": 117,
      "region": 11,
      "titulo": "La galería de tartas",
      "minimo": 19,
      "ensena": "La báscula abre su puente al llegar al peso marcado. Alimenta la Semilla de Matcha y brotará el puente de regaliz.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zippy",
        "t": "¡Uno más para la colección!",
        "voz": "fin_pool_9"
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
            "L"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "C",
            "F",
            "C"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C",
            "G"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 2,
          "capas": [],
          "x": 60,
          "y": 470,
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
              "a": "S",
              "via": [
                [
                  103,
                  334
                ],
                [
                  60,
                  334
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
                  223,
                  350
                ],
                [
                  180,
                  350
                ]
              ],
              "compuertas": [
                "P"
              ]
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
              "a": "T2",
              "via": [
                [
                  343,
                  366
                ],
                [
                  300,
                  366
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
          "ruta": [
            "gB",
            0
          ],
          "en": 0.403,
          "id": "P",
          "tipo": "puente"
        },
        {
          "ruta": [
            "gC",
            0
          ],
          "en": 0.472,
          "id": "R",
          "tipo": "regaliz"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 2,
          "x": 180,
          "y": 505,
          "alCompletar": {
            "abre": [
              "R"
            ]
          },
          "img": "dona_matcha",
          "nombre": "La Semilla de Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "x": 300,
          "y": 505,
          "pide": {
            "L": 1,
            "F": 1
          },
          "materia": "L",
          "necesita": 2,
          "img": "vitrina/p27",
          "nombre": "El Macaron de Fresa y Limón"
        }
      ]
    },
    {
      "id": 118,
      "region": 11,
      "titulo": "El observatorio",
      "minimo": 16,
      "ensena": "La báscula abre su puente al llegar al peso marcado. El matraz entra y sale de una medida en una.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "zappy",
        "t": "Dulce, exacto y elegante.",
        "voz": "fin_pool_10"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "B",
        "txt": "Dejar vacío el segundo recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "G",
            "C",
            "G"
          ],
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "matraz",
          "cap": 3,
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
          "cap": 3,
          "capas": [
            "C",
            "G"
          ],
          "x": 300,
          "y": 300,
          "sellada": true
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 2,
          "capas": [],
          "x": 60,
          "y": 470,
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
              "a": "S",
              "via": [
                [
                  103,
                  334
                ],
                [
                  60,
                  334
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
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T2",
              "via": [
                [
                  343,
                  366
                ],
                [
                  300,
                  366
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
          "ruta": [
            "gC",
            0
          ],
          "en": 0.472,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "materia": "G",
          "necesita": 3,
          "x": 180,
          "y": 505,
          "img": "vitrina/p19",
          "nombre": "La Tarta de Té Matcha"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "C",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p15",
          "nombre": "La Dona Capuchino"
        }
      ]
    },
    {
      "id": 119,
      "region": 11,
      "titulo": "La antesala",
      "minimo": 14,
      "ensena": "Cinco frascos y poco sitio libre: planifica antes de mover. Un bloque de chocolate tapa un tubo: sólo el Caramelo lo funde.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "miga",
        "t": "¡Esto merece una fiesta!",
        "voz": "fin_pool_11"
      },
      "ingenio": {
        "tipo": "vacia",
        "id": "F",
        "txt": "Dejar vacío el quinto recipiente de arriba"
      },
      "vasijas": [
        {
          "id": "A",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "M",
            "F",
            "F",
            "F"
          ],
          "x": 30,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 1,
          "capas": [],
          "x": 105,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "G"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "E",
          "forma": "frasco",
          "cap": 2,
          "capas": [
            "C"
          ],
          "x": 255,
          "y": 300
        },
        {
          "id": "F",
          "forma": "frasco",
          "cap": 1,
          "capas": [
            "M"
          ],
          "x": 330,
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
                  73,
                  338
                ],
                [
                  60,
                  338
                ]
              ],
              "compuertas": [
                "Q"
              ]
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
              "a": "T2",
              "via": [
                [
                  223,
                  356
                ],
                [
                  180,
                  356
                ]
              ],
              "cristal": true,
              "compuertas": []
            }
          ]
        },
        {
          "id": "gE",
          "de": "E",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "T3",
              "via": [
                [
                  298,
                  374
                ],
                [
                  300,
                  374
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.5,
          "id": "Q",
          "tipo": "chocolate"
        }
      ],
      "objetivos": [
        {
          "id": "T1",
          "tipo": "dona",
          "x": 60,
          "y": 505,
          "pide": {
            "G": 1,
            "M": 1,
            "F": 1
          },
          "materia": "G",
          "necesita": 3,
          "img": "vitrina/p18",
          "nombre": "El Macaron de Fresa, Matcha y Menta"
        },
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 1,
          "x": 180,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T3",
          "tipo": "dona",
          "materia": "F",
          "necesita": 2,
          "x": 300,
          "y": 505,
          "img": "vitrina/p14",
          "nombre": "La Dona de Fresa"
        }
      ]
    },
    {
      "id": 120,
      "region": 11,
      "jefe": true,
      "titulo": "La Corona de Azúcar",
      "minimo": 17,
      "ensena": "La báscula abre su puente al llegar al peso marcado. El tubo de cristal sólo deja pasar la Menta.",
      "intro": [],
      "guia": [],
      "fin": {
        "q": "grumble",
        "t": "¡La Corona de Azúcar brilla! Ya eres leyenda, y el Obrador sin fin te espera."
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
          "x": 60,
          "y": 300
        },
        {
          "id": "B",
          "forma": "frasco",
          "cap": 5,
          "capas": [
            "F",
            "F",
            "F",
            "F"
          ],
          "x": 180,
          "y": 300
        },
        {
          "id": "C",
          "forma": "frasco",
          "cap": 4,
          "capas": [
            "M",
            "B",
            "B",
            "F"
          ],
          "x": 300,
          "y": 300
        },
        {
          "id": "S",
          "forma": "capsula",
          "cap": 4,
          "capas": [],
          "x": 300,
          "y": 470,
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
              "a": "T2",
              "via": [
                [
                  103,
                  334
                ],
                [
                  60,
                  334
                ]
              ],
              "cristal": true,
              "compuertas": [
                "P"
              ]
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
                  223,
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
          "id": "gC",
          "de": "C",
          "lado": "abajo",
          "sale": "der",
          "rutas": [
            {
              "a": "S",
              "via": [
                [
                  343,
                  366
                ],
                [
                  300,
                  366
                ]
              ],
              "compuertas": []
            }
          ]
        }
      ],
      "compuertas": [
        {
          "ruta": [
            "gA",
            0
          ],
          "en": 0.334,
          "id": "P",
          "tipo": "puente"
        }
      ],
      "objetivos": [
        {
          "id": "T2",
          "tipo": "dona",
          "materia": "M",
          "necesita": 3,
          "x": 60,
          "y": 505,
          "img": "vitrina/p03",
          "nombre": "La Dona de Menta"
        },
        {
          "id": "T1",
          "tipo": "dona",
          "x": 180,
          "y": 505,
          "pide": {
            "F": 2,
            "B": 2
          },
          "materia": "F",
          "necesita": 4,
          "img": "vitrina/p30",
          "nombre": "La Corona de Azúcar"
        }
      ]
    }
    // ── GENERADOS: FIN ──
  ];

  var data = { REGIONES: REGIONES, NIVELES: NIVELES };
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else { global.REGIONES = REGIONES; global.NIVELES = NIVELES; }
})(this);
