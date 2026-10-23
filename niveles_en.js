/* SUGAR-SNAP BAKERY · English texts for the levels.
   Same order and speakers as niveles.js; only the words change. */
(function (global) {
  'use strict';
  var EN = {
    regiones: { 1: 'Sugar-Snap Bakery', 2: 'The Crystal Cotton Forest', 3: 'The Ice Cream Ruins', 4: 'The Floating City' },
    1: {
      titulo: 'The first pour',
      ensena: 'Drag one jar onto another to pour. Tap the pink tap to empty a jar through its pipe.',
      intro: ['At last, an apprentice! Sugar-Snap has been dark for a hundred years, ever since the Primordial Heart broke.', 'I want to help! Where do I start?'],
      guia: ['This donut is asleep. The 3 little circles below show what it needs: 3 measures of Caramel, the matter with the orange flame.',
        'The caramel is in the jar on the left, but the pipe to the donut comes out of the jar on the right.',
        'Drag the jar on the left onto the one on the right. You can also tap one and then the other.',
        "That's it! Now tap the pink button: it's the tap, and it empties the jar through its pipe."],
      fin: 'Look how it shines! Everything you wake up gives a little magic back to the kingdom.',
      ingenio: 'Solve it without hints',
      nombres: { T1: 'The Caramel Donut' }
    },
    2: {
      titulo: "What's blocking the way",
      ensena: 'A valve decides where things flow. Tap it to change the path.',
      intro: ["Hi, hi! I'm Zippy, and that's my brother Zappy over there. Today we'll teach you a new trick."],
      guia: ["Look at this jar: at the very bottom there's Mint (the turquoise drop) and on top there's Caramel (the flame).",
        'The tap always lets out what is at the BOTTOM. If you open it now, the Mint would come out, and the donut only wants Caramel.',
        'The golden wheel is the valve: its arrow picks which pipe things flow through. Tap it so it points to the Reserve.',
        'The arrow points to the Reserve! Now open the pink tap to move the Mint out of the way.',
        'The Mint is put away and the Caramel is at the bottom now. Turn the valve towards the donut.',
        'Last step: open the tap.'],
      fin: "The mint is stored and the caramel reached its place. That's how you use a valve!",
      ingenio: "Don't pour by hand",
      nombres: { T1: 'The Caramel Donut', D: 'Reserve' }
    },
    3: {
      titulo: 'Weight lifts bridges',
      ensena: 'Scales count the weight on top of them. When it reaches the target number, their bridge goes up.',
      intro: ["Today you'll learn to make weight work for you."],
      guia: ['That golden square with the scales is a closed bridge: it cuts the pipe to the Mint Donut.',
        "The bowl's scale opens it. Its counter says 0/2: it has to weigh 2 or more.",
        "At the bottom of the jar there are 2 Caramels, and each one weighs 1. The valve already points to the bowl: open the tap.",
        'Weight 2: the bridge is open (green check)! Now turn the valve towards the donut.',
        'And open the tap so the Mint crosses the bridge.'],
      fin: "What was in the way became the key. That's how an alchemist thinks.",
      ingenio: "Don't pour by hand",
      nombres: { T2: 'The Mint Donut' }
    },
    4: {
      titulo: 'Counterweight',
      ensena: 'If a scale loses weight, its bridge goes back down. Order matters.',
      intro: ['Two donuts at once. This is getting interesting.'],
      guia: ["The scale's capsule already weighs 3: that's why its bridge is open (green check).",
        'If you empty the capsule, it loses weight and the bridge closes again. Think about the order.',
        'Capsules have no mouth: they can only be filled and emptied through pipes.',
        'From now on your moves are counted: check the counter at the top. If they run out before the sweets wake up, you lose the round.'],
      fin: 'First cross the bridge, then empty the counterweight!',
      ingenio: 'Leave the first jar empty',
      nombres: { T2: 'The Mint Donut', T1: 'The Caramel Donut' }
    },
    5: {
      titulo: 'First recipe: steam',
      ensena: 'In the still, Caramel + Mint = 2 Sugar Steam. Steam weighs 0, rises and only leaves through chimneys.',
      intro: ["It's time for your first recipe."],
      guia: ['This is a still: it has a fire underneath. Inside it, 1 Caramel + 1 Mint turn into 2 Steam.',
        'Steam rises and leaves through the chimney: the lilac button on top. The pinwheel spins with it.',
        'The pink star is a gate. It opens when the pinwheel spins again (follow the pink line).'],
      fin: "Your first recipe! It's already written down in your notebook.",
      ingenio: 'Solve it without hints',
      nombres: { TV: 'The Meringue Pinwheel', T1: 'The Caramel Donut' }
    },
    6: {
      titulo: 'The Ancient Oven',
      ensena: 'A hard chocolate seal blocks the mouth and the chimney. Pouring caramel on it melts it (and uses 1 measure).',
      intro: ['The Ancient Oven. My grandmother baked the Primordial Heart cake right here.'],
      guia: ['The still has a hard chocolate seal: it blocks the mouth and the chimney.',
        "Pouring Caramel on top melts it, but it uses 1 measure. That's exactly what the Spark is for!",
        "The oven needs the scale's bridge and the pinwheel's gate. Use everything you've learned."],
      fin: 'The oven burns again! The first Fragment of the Heart was inside.',
      ingenio: 'Solve it without hints',
      nombres: { TV: 'The Meringue Pinwheel', T1: 'The Ancient Oven', K: 'Spark' }
    },
    7: {
      titulo: 'Licorice sprouts',
      ensena: 'Vital Matcha sprouts licorice bridges that connect broken pipes.',
      intro: ['Welcome to the Cotton Forest! Here the pipes are broken and the bridges are made of licorice.'],
      guia: ["The dotted gap with a sprout is a licorice bridge that hasn't grown yet.",
        'It grows when the Matcha Seed gets what it needs.'],
      fin: 'The licorice connected the path! The forest is starting to breathe.',
      ingenio: "Don't pour by hand",
      nombres: { TG: 'The Matcha Seed', T2: 'The Mint Donut', D: 'Reserve' }
    },
    8: {
      titulo: 'Crystals that conduct',
      ensena: 'Crystal pipes only let Flowing Mint through.',
      intro: ['These pipes are made of crystal sugar.'],
      guia: ['The light blue pipe is crystal: it only lets Flowing Mint through.',
        "The Matcha is stuck between the mint, and the crystal pipe is broken until the licorice sprouts."],
      fin: 'Separate, sprout, conduct. Three steps, one idea.',
      ingenio: 'Finish with the reserve empty',
      nombres: { TG: 'The Matcha Seed', T2: 'The Mint Crystal', D: 'Reserve' }
    },
    9: {
      titulo: 'Narrow neck',
      ensena: 'Only one measure at a time fits through the neck of a flask. Perfect for measuring.',
      intro: ['Today we measure carefully.'],
      guia: ['The flask has a narrow neck: things go in and out one measure at a time.',
        "If you pour all the caramel into the still, it will turn all the mint into steam, and then you'll be short of mint."],
      fin: 'Exact dose. Not a drop too much.',
      ingenio: 'Solve it without hints',
      nombres: { TV: 'The Meringue Pinwheel', T2: 'The Mint Donut' }
    },
    10: {
      titulo: 'Galactic grape',
      ensena: 'Galactic Grape weighs double and sinks below every other matter.',
      intro: ['A new matter falls from the forest sky.'],
      guia: ["Galactic Grape weighs 2 per measure. The scale's counter asks for 4.",
        'The Galactic Portal also wants the grape. Can it be used for both?'],
      fin: 'Counterweight first, offering second. Gravity works for you.',
      ingenio: "Don't touch the caramel",
      nombres: { TU: 'The Galactic Portal', T2: 'The Mint Donut' }
    },
    11: {
      titulo: 'Sink to get it out',
      ensena: 'Whatever sinks comes out first through the bottom tap.',
      intro: ['The only pipe to the portal comes out of the mint jar…'],
      guia: ['Grape always sinks to the bottom. If you pour it over another matter, it settles underneath and comes out first through the tap.'],
      fin: 'The grape sneaked underneath! What a galactic trick.',
      ingenio: 'Solve it without hints',
      nombres: { TG: 'The Matcha Seed', TU: 'The Galactic Portal', T2: 'The Mint Crystal' }
    },
    12: {
      titulo: 'The Ancient Cotton Tree',
      ensena: "Each of the tree's roots needs a different energy. Combine everything you've learned.",
      intro: ['The Ancient Cotton Tree guards the second fragment. Its three roots have dried up.'],
      guia: ['Three roots, three energies. Look at the little circles of each one before you start.',
        "The grape bridge needs a weight of 3 on the scale, and the tree wants the grape too."],
      fin: 'The tree is blooming! Two fragments of the Primordial Heart. Auralia is starting to remember its colors.',
      ingenio: 'Solve it without hints',
      nombres: { TU: 'The Root of Gravity', T2: 'The Root of Flow', TG: 'The Root of Life' }
    },
    // ── GENERADOS: INICIO (herramientas/incorporar_niveles.js) ──
    13: {
      "titulo": "Three Frozen Taps",
      "ensena": "Each jar empties from the bottom into its sweet. The middle valve can also refill the jar next to it.",
      "intro": [
        "Beyond the castle, the kingdom froze. Welcome to the Ice Cream Ruins.",
        "Brrr! Then let's thaw it, one sweet at a time."
      ],
      "guia": [],
      "fin": "All three taps work! The ice is starting to crack.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Matcha Cake",
        "T2": "The Caramel Cake",
        "T3": "The Caramel Cake"
      }
    },
    14: {
      "titulo": "Clear the Way",
      "ensena": "Move what is in the way into the reserve, so the bottom holds what the sweet wants.",
      "intro": [],
      "guia": [],
      "fin": "Stepping aside is also moving forward.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Mint Cake",
        "D": "Reserve"
      }
    },
    15: {
      "titulo": "Exact Weight",
      "ensena": "The scale opens its bridge at the marked weight. Work out what to drop first.",
      "intro": [],
      "guia": [],
      "fin": "Exact weight, open bridge. Nothing wasted.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Caramel Cake"
      }
    },
    16: {
      "titulo": "Drop by Drop",
      "ensena": "The flask measures one at a time. In the still, Caramel + Mint turn into steam: don't waste any.",
      "intro": [],
      "guia": [],
      "fin": "Not a drop too much. That's how you measure.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TV": "The Meringue Pinwheel",
        "T2": "The Mint Cake"
      }
    },
    17: {
      "titulo": "Frozen Gravity",
      "ensena": "Grape weighs 2 and sinks. Use it as a counterweight before offering it.",
      "intro": [],
      "guia": [],
      "fin": "The grape weighed just right!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TU": "The Caramel Cake",
        "T2": "The Galactic Cake"
      }
    },
    18: {
      "titulo": "Four Jars, Two Valves",
      "ensena": "Two valves share the matter among three sweets. Set up each jar so the right matter sits at the bottom.",
      "intro": [
        "Four jars. Look carefully before you move: your moves are counted."
      ],
      "guia": [],
      "fin": "Four jars and no mess at all!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Matcha Cake",
        "T2": "The Mint Cake",
        "T3": "The Caramel Cake"
      }
    },
    19: {
      "titulo": "Licorice Under the Snow",
      "ensena": "The licorice sprouts when its sweet is complete. Which one must wake first?",
      "intro": [],
      "guia": [],
      "fin": "The licorice broke the ice.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TG": "The Mint Cake",
        "T2": "The Matcha Cake",
        "D": "Reserve"
      }
    },
    20: {
      "titulo": "The Frosted Oven",
      "ensena": "Chocolate seal, scale and pinwheel: each mechanism opens the next. Plan the whole order.",
      "intro": [],
      "guia": [],
      "fin": "The frosted oven warms up again.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TV": "The Meringue Pinwheel",
        "T1": "The Caramel Cake"
      }
    },
    21: {
      "titulo": "Ice Crystal",
      "ensena": "The crystal pipe only lets Mint through. Separate before you send.",
      "intro": [],
      "guia": [],
      "fin": "Clean crystal, open path.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TG": "The Matcha Cake",
        "T2": "The Mint Cake",
        "D": "Reserve"
      }
    },
    22: {
      "titulo": "Order in the Freezer",
      "ensena": "Each jar empties from the bottom into its sweet. The middle valve can also refill the jar next to it.",
      "intro": [],
      "guia": [],
      "fin": "Everything sorted in the freezer!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Caramel Cake",
        "T2": "The Mint Cake",
        "T3": "The Matcha Cake"
      }
    },
    23: {
      "titulo": "Sink the Ice",
      "ensena": "Whatever sinks comes out of the tap first. Use the grape to slip underneath.",
      "intro": [],
      "guia": [],
      "fin": "Underneath, and nobody noticed!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TG": "The Matcha Cake",
        "TU": "The Galactic Cake",
        "T2": "The Mint Cake"
      }
    },
    24: {
      "titulo": "The Ice Heart",
      "ensena": "Chocolate seal, scale and pinwheel: each mechanism opens the next. Plan the whole order.",
      "intro": [
        "The third fragment beats inside this ice. Think through the whole plan before you start."
      ],
      "guia": [],
      "fin": "The Ice Heart is melting! Third fragment recovered.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TV": "The Meringue Pinwheel",
        "T1": "The Ice Heart",
        "K": "Spark"
      }
    },
    25: {
      "titulo": "City Without Ground",
      "ensena": "Grape weighs 2 and sinks. Use it as a counterweight before offering it.",
      "intro": [
        "Look up! The Floating City hovers above the clouds.",
        "Gravity rules here. Count your weights carefully."
      ],
      "guia": [],
      "fin": "Gravity is working for us now!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TU": "The Galaxy Donut",
        "T2": "The Mint Donut"
      }
    },
    26: {
      "titulo": "Hanging Streets",
      "ensena": "Two valves share the matter among three sweets. Set up each jar so the right matter sits at the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Streets in place. The city breathes.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Lime Macaron",
        "T2": "The Mint Donut",
        "T3": "The Orange Cake"
      }
    },
    27: {
      "titulo": "Dosing Up High",
      "ensena": "The flask measures one at a time. In the still, Caramel + Mint turn into steam: don't waste any.",
      "intro": [],
      "guia": [],
      "fin": "Exact dose, even up high.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TV": "The Meringue Pinwheel",
        "T2": "The Orange Cake"
      }
    },
    28: {
      "titulo": "Roots in the Air",
      "ensena": "Three sweets, three energies, two valves and a bridge. Every move counts.",
      "intro": [],
      "guia": [],
      "fin": "The floating roots are blooming!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TU": "The Galaxy Donut",
        "T2": "The Mint Donut",
        "TG": "The Mint Donut"
      }
    },
    29: {
      "titulo": "Sky Counterweight",
      "ensena": "The scale opens its bridge at the marked weight. Work out what to drop first.",
      "intro": [],
      "guia": [],
      "fin": "The sky counterweight is balanced.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Mint Donut"
      }
    },
    30: {
      "titulo": "Crystal Above the Clouds",
      "ensena": "The crystal pipe only lets Mint through. Separate before you send.",
      "intro": [],
      "guia": [],
      "fin": "The crystal shines above the clouds!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TG": "The Orange Cake",
        "T2": "The Mint Donut",
        "D": "Reserve"
      }
    },
    31: {
      "titulo": "The Valve Maze",
      "ensena": "Two valves share the matter among three sweets. Set up each jar so the right matter sits at the bottom.",
      "intro": [
        "Two valves, four jars and very few spare moves."
      ],
      "guia": [],
      "fin": "You got out of the valve maze. Impressive.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Galaxy Donut",
        "T2": "The Orange Cake",
        "T3": "The Orange Cake"
      }
    },
    32: {
      "titulo": "Three Towers",
      "ensena": "Each jar empties from the bottom into its sweet. The middle valve can also refill the jar next to it.",
      "intro": [],
      "guia": [],
      "fin": "The three towers shine again!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Mint Donut",
        "T2": "The Lime Macaron",
        "T3": "The Orange Cake"
      }
    },
    33: {
      "titulo": "Free Fall",
      "ensena": "Whatever sinks comes out of the tap first. Use the grape to slip underneath.",
      "intro": [],
      "guia": [],
      "fin": "Free fall, perfect landing.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TG": "The Lime Macaron",
        "TU": "The Galaxy Donut",
        "T2": "The Mint Donut"
      }
    },
    34: {
      "titulo": "Licorice Bridges",
      "ensena": "The licorice sprouts when its sweet is complete. Which one must wake first?",
      "intro": [],
      "guia": [],
      "fin": "Licorice bridges all over the city!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TG": "The Mint Donut",
        "T2": "The Orange Cake",
        "D": "Reserve"
      }
    },
    35: {
      "titulo": "The Great Mix",
      "ensena": "Two valves share the matter among three sweets. Set up each jar so the right matter sits at the bottom.",
      "intro": [],
      "guia": [],
      "fin": "The great mix, solved. You think like a master now.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Lime Macaron",
        "T2": "The Galaxy Donut",
        "T3": "The Lime Macaron"
      }
    },
    36: {
      "titulo": "The Primordial Heart",
      "ensena": "Three sweets, three energies, two valves and a bridge. Every move counts.",
      "intro": [
        "The last fragment. Everything you've learned, on a single board.",
        "Let's go get the Heart!"
      ],
      "guia": [],
      "fin": "The Primordial Heart is whole!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "TU": "The Grape Pillar",
        "T2": "The Mint Pillar",
        "TG": "The Grape Pillar"
      }
    }
    // ── GENERADOS: FIN ──
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = EN;
  else global.NIVELES_EN = EN;
})(this);
