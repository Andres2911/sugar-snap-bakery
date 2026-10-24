/* SUGAR-SNAP BAKERY · English texts for the levels.
   Same order and speakers as niveles.js; only the words change. */
(function (global) {
  'use strict';
  var EN = {
    regiones: { 1: 'Sugar-Snap Bakery', 2: 'The Crystal Cotton Forest', 3: 'The Ice Cream Ruins', 4: 'The Floating City', 5: 'The Flavor Fair', 6: 'The Jelly Sea', 7: 'The Meringue Peaks', 8: 'The Cocoa Jungle', 9: 'The Caramel Volcano', 10: 'The Recipe Library', 11: 'The Star Palace' },
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
        'From now on your moves are counted: check the counter at the top. If they run out before the sweets wake up, you lose the round.',
        'Every lost round costs one life: check the hearts on the map. And every win gives points: they raise your rank and earn you prizes.'],
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
    // ── GENERADOS: INICIO (herramientas/incorporar_niveles2.js) ──
    13: {
      "titulo": "The Thaw Begins",
      "ensena": "The scale opens its bridge at the marked weight. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [
        "Beyond the castle, the kingdom froze. Welcome to the Ice Cream Ruins.",
        "Brrr! Then let's thaw it, one sweet at a time."
      ],
      "guia": [],
      "fin": "Crack! The first block of ice just broke.",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T2": "The Caramel Cake",
        "T1": "The Mint Cake"
      }
    },
    14: {
      "titulo": "Two-Flavor Sorbet",
      "ensena": "Use the Reserve to set aside what gets in the way. There is a mixed order: the colors of the little circles show how much of each flavor.",
      "intro": [],
      "guia": [
        "A mixed order! This sweet wants a mix: each color of its little circles is a different flavor.",
        "Once a flavor is complete, it takes no more of it. Give it what it is missing!"
      ],
      "fin": "Two flavors in one sweet. Now we are talking!",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Matcha Cake",
        "T1": "The Matcha Tiramisu",
        "D": "Reserve"
      }
    },
    15: {
      "titulo": "Sprouts in the Frost",
      "ensena": "Feed the Matcha Seed and the licorice bridge will sprout. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "The licorice broke through the frost!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Matcha Seed",
        "T1": "The Caramel Cake"
      }
    },
    16: {
      "titulo": "The Frozen Scale",
      "ensena": "The scale opens its bridge at the marked weight. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Exact weight. Even ice respects a good scale.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Galactic Cake",
        "T1": "The Matcha Cake"
      }
    },
    17: {
      "titulo": "Crystal and Frost",
      "ensena": "The crystal pipe only lets Mint through. The scale opens its bridge at the marked weight.",
      "intro": [],
      "guia": [],
      "fin": "Clean crystal, open path.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Mint Cake",
        "T1": "The Matcha Cake"
      }
    },
    18: {
      "titulo": "Capsule in the Glacier",
      "ensena": "The scale opens its bridge at the marked weight. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "The capsule weighed just right!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Caramel Cake",
        "T2": "The Mint Cake"
      }
    },
    19: {
      "titulo": "Sweet Avalanche",
      "ensena": "The scale opens its bridge at the marked weight. There is a mixed order: the colors of the little circles show how much of each flavor.",
      "intro": [],
      "guia": [],
      "fin": "Not even an avalanche can stop us!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "The Mint Caramel Cake",
        "T2": "The Mint Cake"
      }
    },
    20: {
      "titulo": "The Frosted Oven",
      "ensena": "Grape weighs 2 and sinks to the bottom. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "The frosted oven warms up again.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Matcha Cake",
        "T3": "The Galactic Cake",
        "T1": "The Caramel Cake"
      }
    },
    21: {
      "titulo": "Chocolate Among the Floes",
      "ensena": "The scale opens its bridge at the marked weight. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "The chocolate melted, and so did the ice.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Caramel Cake",
        "T1": "The Matcha Cake"
      }
    },
    22: {
      "titulo": "Three-Scoop Ice Cream",
      "ensena": "There is a mixed order: the colors of the little circles show how much of each flavor. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Three scoops and none of them fell!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Matcha Tiramisu",
        "T1": "The Matcha Cake"
      }
    },
    23: {
      "titulo": "Order in the Freezer",
      "ensena": "A chocolate seal blocks a jar: melt it by pouring Caramel. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Everything sorted in the freezer!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T1": "The Caramel Cake",
        "T3": "The Galactic Cake",
        "T2": "The Galactic Cake"
      }
    },
    24: {
      "titulo": "The Ice Heart",
      "ensena": "The capsule is only filled and emptied through pipes.",
      "intro": [
        "The third fragment beats inside this ice. Think through the whole plan before you start."
      ],
      "guia": [],
      "fin": "The Ice Heart is melting! Third fragment recovered.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Ice Heart",
        "T2": "The Mint Caramel Cake",
        "T3": "The Matcha Cake"
      }
    },
    25: {
      "titulo": "City Without Ground",
      "ensena": "The valve picks which pipe the tap uses: think where each measure goes. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [
        "Look up! The Floating City hovers above the clouds.",
        "Gravity rules here. Count your weights carefully."
      ],
      "guia": [],
      "fin": "Gravity is working for us now!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "The Mint Donut",
        "T3": "The Lime Macaron",
        "T2": "The Orange Cake"
      }
    },
    26: {
      "titulo": "Hanging Streets",
      "ensena": "The scale opens its bridge at the marked weight. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Streets in place. The city breathes.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Orange Cake",
        "T1": "The Lime Macaron"
      }
    },
    27: {
      "titulo": "Steam Among the Clouds",
      "ensena": "Grape weighs 2 and sinks to the bottom. In the still, Caramel + Mint turn into steam for the pinwheel.",
      "intro": [],
      "guia": [],
      "fin": "The steam lifts us higher and higher!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T3": "The Galaxy Donut",
        "T1": "The Mint Donut",
        "T2": "The Orange Cake",
        "TV": "The Meringue Pinwheel"
      }
    },
    28: {
      "titulo": "Two-Tier Cake",
      "ensena": "One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [],
      "guia": [],
      "fin": "Two flavors, two tiers, one perfect cake!",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T1": "The Mint Matcha Macaron",
        "T2": "The Orange Cake",
        "T3": "The Mint Donut"
      }
    },
    29: {
      "titulo": "Melting Up High",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Melted chocolate and an exact dose. Flawless.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Orange Cake",
        "T1": "The Mint Donut"
      }
    },
    30: {
      "titulo": "Crystal Above the Clouds",
      "ensena": "The crystal pipe only lets Mint through.",
      "intro": [],
      "guia": [],
      "fin": "The crystal shines above the clouds!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Mint Donut",
        "T3": "The Lime Macaron",
        "T1": "The Mint Caramel Cake"
      }
    },
    31: {
      "titulo": "The Floating Storeroom",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. Use the Reserve to set aside what gets in the way.",
      "intro": [],
      "guia": [],
      "fin": "Everything in its place, even up in the air.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Lime Macaron",
        "D": "Reserve"
      }
    },
    32: {
      "titulo": "Three Towers",
      "ensena": "The flask takes and gives one measure at a time. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "The three towers shine again!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T3": "The Lime Macaron",
        "T1": "The Mint Donut"
      }
    },
    33: {
      "titulo": "Free Fall",
      "ensena": "The crystal pipe only lets Mint through. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Free fall, perfect landing.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Mint Donut",
        "T3": "The Matcha Tiramisu",
        "T2": "The Mint Donut"
      }
    },
    34: {
      "titulo": "Sky Pipes",
      "ensena": "The valve picks which pipe the tap uses: think where each measure goes. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [],
      "guia": [],
      "fin": "The sky pipes are flowing again!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T3": "The Lime Macaron",
        "T1": "The Mint Donut"
      }
    },
    35: {
      "titulo": "The Great Mix",
      "ensena": "Feed the Matcha Seed and the licorice bridge will sprout. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "The great mix, solved. You think like a master now.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T1": "The Orange Cake"
      }
    },
    36: {
      "titulo": "The Primordial Heart",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [
        "The last fragment. Everything you've learned, on a single board.",
        "Let's go get the Heart!"
      ],
      "guia": [],
      "fin": "The Primordial Heart is whole!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Lime Macaron",
        "T2": "The Primordial Heart",
        "T3": "The Orange Cake"
      }
    },
    37: {
      "titulo": "The Flavor Fair",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [
        "The Heart beats, but the Flavor Fair is still dark: its sweets have lost their taste.",
        "Then we'll give them new flavors! Mixes, combos... everything!"
      ],
      "guia": [],
      "fin": "The first fair stall is open!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T1": "The Mint Matcha Macaron",
        "T2": "The Matcha Donut"
      }
    },
    38: {
      "titulo": "Macaron Stall",
      "ensena": "The capsule is only filled and emptied through pipes. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Two-flavor macarons for everyone!",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Mint Caramel Cake",
        "T1": "The Matcha Donut"
      }
    },
    39: {
      "titulo": "Licorice and Chocolate",
      "ensena": "Feed the Matcha Seed and the licorice bridge will sprout. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "What a tasty pair!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Matcha Tiramisu",
        "T2": "The Matcha Seed"
      }
    },
    40: {
      "titulo": "The Cream Ferris Wheel",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "The Ferris wheel is turning again!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T2": "The Pink Mint Donut",
        "T1": "The Mint Matcha Macaron"
      }
    },
    41: {
      "titulo": "Flavor Raffle",
      "ensena": "One pipe sends matter back up to another jar: use it to reorder the layers. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "A prize for every sweet!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T3": "The Mint Caramel Cake",
        "T1": "The Matcha Seed",
        "T2": "The Mint Caramel Cake"
      }
    },
    42: {
      "titulo": "Caramel Carousel",
      "ensena": "One pipe sends matter back up to another jar: use it to reorder the layers. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "The carousel spins with joy!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Pink Mint Donut",
        "T1": "The Mint Caramel Cake",
        "T3": "The Matcha Tiramisu"
      }
    },
    43: {
      "titulo": "The Fair Still",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. In the still, Caramel + Mint turn into steam for the pinwheel.",
      "intro": [],
      "guia": [],
      "fin": "Steam, chocolate and flavor. This is fine pastry now.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T1": "The Mint Caramel Cake",
        "T2": "The Matcha Tiramisu",
        "TV": "The Meringue Pinwheel"
      }
    },
    44: {
      "titulo": "The Roller Coaster",
      "ensena": "The capsule is only filled and emptied through pipes. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Ups, downs and not a drop wasted!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T3": "The Blueberry Cake",
        "T2": "The Mint Matcha Macaron",
        "T1": "The Mint Matcha Macaron"
      }
    },
    45: {
      "titulo": "Three-Flavor Feast",
      "ensena": "One pipe sends matter back up to another jar: use it to reorder the layers. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "This is a feast!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Matcha Tiramisu",
        "T2": "The Mint Matcha Macaron"
      }
    },
    46: {
      "titulo": "The Steam Tent",
      "ensena": "In the still, Caramel + Mint turn into steam for the pinwheel. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "What a fragrant tent!",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Mint Caramel Cake",
        "T1": "The Matcha Donut",
        "T3": "The Mint Matcha Macaron",
        "TV": "The Meringue Pinwheel"
      }
    },
    47: {
      "titulo": "Lucky Grapes",
      "ensena": "Grape weighs 2 and sinks to the bottom. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [],
      "guia": [],
      "fin": "The grape brought good luck!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Mint Caramel Cake",
        "T1": "The Blueberry Cake",
        "T3": "The Mint Caramel Cake"
      }
    },
    48: {
      "titulo": "The Great Fair Cake",
      "ensena": "In the still, Caramel + Mint turn into steam for the pinwheel. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [
        "The Great Fair Cake awaits its perfect mix. Everything you know, on a single board.",
        "Let's go for the last flavor!"
      ],
      "guia": [],
      "fin": "The Great Cake shines with all its flavors! The whole fair comes back to life.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Great Fair Cake",
        "T1": "The Mint Matcha Macaron",
        "TV": "The Meringue Pinwheel"
      }
    },
    49: {
      "titulo": "Strawberry Waves",
      "ensena": "New flavor: Star Strawberry. Grape weighs 2 and sinks to the bottom.",
      "intro": [
        "Beyond the fair lies the Jelly Sea. A new flavor arrives here: Star Strawberry.",
        "Strawberry! My favorite!"
      ],
      "guia": [
        "New flavor! Star Strawberry: pink, sweet and no tricks. It goes with everything."
      ],
      "fin": "It tastes amazing!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T3": "The Strawberry Donut",
        "T2": "The Mint Caramel Cake",
        "T1": "The Grape Caramel Cake"
      }
    },
    50: {
      "titulo": "Jelly Islands",
      "ensena": "New flavor: Star Strawberry. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Every measure in its place. Beautiful.",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T2": "The Cappuccino Donut",
        "T3": "Strawberry & Mint Donut",
        "T1": "The Mint Donut"
      }
    },
    51: {
      "titulo": "The Wobbly Bay",
      "ensena": "New flavor: Star Strawberry. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "Another sweet wakes up! There's no stopping us.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T3": "Strawberry & Mint Donut",
        "T2": "The Matcha Seed",
        "T1": "The Mint Donut"
      }
    },
    52: {
      "titulo": "Sweet Currents",
      "ensena": "New flavor: Star Strawberry. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [],
      "guia": [],
      "fin": "Not a drop wasted. You're a true master.",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "The Strawberry Donut",
        "T3": "The Cappuccino Donut",
        "T2": "The Matcha Tea Cake"
      }
    },
    53: {
      "titulo": "The Sugar Reef",
      "ensena": "New flavor: Star Strawberry. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "Brilliant mix!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T1": "The Strawberry Donut",
        "T2": "The Matcha Tea Cake",
        "T3": "The Galaxy Donut"
      }
    },
    54: {
      "titulo": "High Tide",
      "ensena": "New flavor: Star Strawberry. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "You thought it through. It shows.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T3": "The Matcha Seed",
        "T1": "The Strawberry Donut",
        "T2": "The Mint Donut"
      }
    },
    55: {
      "titulo": "Tapioca Pearls",
      "ensena": "In the still, Caramel + Mint turn into steam for the pinwheel.",
      "intro": [],
      "guia": [],
      "fin": "It smells wonderful!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "Caramel & Strawberry Donut",
        "T2": "The Matcha Tea Cake",
        "TV": "The Meringue Pinwheel"
      }
    },
    56: {
      "titulo": "The Cookie Ship",
      "ensena": "The crystal pipe only lets Mint through. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "Step by step, the kingdom gets its flavor back.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T3": "The Matcha Seed",
        "T2": "The Matcha Tea Cake",
        "T1": "The Strawberry Donut"
      }
    },
    57: {
      "titulo": "Sea Foam",
      "ensena": "In the still, Caramel + Mint turn into steam for the pinwheel. The scale opens its bridge at the marked weight.",
      "intro": [],
      "guia": [],
      "fin": "One more for the collection!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Matcha Tea Cake",
        "T1": "The Matcha Tea Cake",
        "TV": "The Meringue Pinwheel"
      }
    },
    58: {
      "titulo": "Lighthouse Ahead",
      "ensena": "The capsule is only filled and emptied through pipes. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [],
      "guia": [],
      "fin": "Sweet, exact and elegant.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Matcha Tea Cake",
        "T3": "The Mint Donut"
      }
    },
    59: {
      "titulo": "Syrup Storm",
      "ensena": "The flask takes and gives one measure at a time. The valve picks which pipe the tap uses: think where each measure goes.",
      "intro": [],
      "guia": [],
      "fin": "This deserves a party!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T3": "The Mint Donut",
        "T2": "The Mint Donut",
        "T1": "The Strawberry Donut"
      }
    },
    60: {
      "titulo": "The Jelly Lighthouse",
      "ensena": "The crystal pipe only lets Mint through. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "The lighthouse shines over the sea again!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Strawberry Donut",
        "T3": "The Jelly Lighthouse"
      }
    },
    61: {
      "titulo": "First Peaks",
      "ensena": "New flavor: Sun Lemon. The flask takes and gives one measure at a time.",
      "intro": [
        "On the Meringue Peaks shines the Sun Lemon. Careful: there is little room for mistakes here."
      ],
      "guia": [
        "Sun Lemon is bright yellow. Do not mix it up with Caramel, which is orange."
      ],
      "fin": "It tastes amazing!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T1": "The Lemon Cake",
        "TV": "The Meringue Pinwheel"
      }
    },
    62: {
      "titulo": "The Lemon Trail",
      "ensena": "New flavor: Sun Lemon. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Every measure in its place. Beautiful.",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T1": "The Galaxy Donut",
        "T2": "The Mint Caramel Cake",
        "T3": "Lemon & Mint Cake"
      }
    },
    63: {
      "titulo": "Meringue Snow",
      "ensena": "New flavor: Sun Lemon. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "Another sweet wakes up! There's no stopping us.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Galaxy Donut",
        "T2": "The Strawberry Donut"
      }
    },
    64: {
      "titulo": "Sweet Blizzard",
      "ensena": "New flavor: Sun Lemon. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "Not a drop wasted. You're a true master.",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "The Mint Donut",
        "T3": "The Mint Donut",
        "T2": "The Lemon Cake"
      }
    },
    65: {
      "titulo": "The Mountain Hut",
      "ensena": "New flavor: Sun Lemon. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "Brilliant mix!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T3": "The Lemon Cake",
        "T1": "The Mint Donut"
      }
    },
    66: {
      "titulo": "Narrow Ledge",
      "ensena": "New flavor: Sun Lemon. The scale opens its bridge at the marked weight.",
      "intro": [],
      "guia": [],
      "fin": "You thought it through. It shows.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Lemon Cake",
        "T2": "The Matcha Tea Cake"
      }
    },
    67: {
      "titulo": "The Icy Pass",
      "ensena": "Grape weighs 2 and sinks to the bottom. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "It smells wonderful!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T3": "The Grape Caramel Cake",
        "T1": "The Matcha Seed",
        "T2": "The Mint Caramel Cake"
      }
    },
    68: {
      "titulo": "Caramel Cable Car",
      "ensena": "The flask takes and gives one measure at a time. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Step by step, the kingdom gets its flavor back.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T1": "The Matcha Tea Cake",
        "T2": "The Matcha Tea Cake"
      }
    },
    69: {
      "titulo": "Sugar Avalanches",
      "ensena": "Five jars and little free space: plan before you move. The crystal pipe only lets Mint through.",
      "intro": [],
      "guia": [],
      "fin": "One more for the collection!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T3": "The Matcha Seed",
        "T1": "The Lemon Cake",
        "T2": "Strawberry & Matcha Cake"
      }
    },
    70: {
      "titulo": "The Crystal Cave",
      "ensena": "The scale opens its bridge at the marked weight. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Sweet, exact and elegant.",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "The Strawberry Donut",
        "T2": "The Matcha Tea Cake"
      }
    },
    71: {
      "titulo": "Almost at the Top",
      "ensena": "Feed the Matcha Seed and the licorice bridge will sprout. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "This deserves a party!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T3": "The Matcha Seed",
        "T1": "The Mint Donut",
        "T2": "The Lemon Cake"
      }
    },
    72: {
      "titulo": "The Snowy Summit",
      "ensena": "The flask takes and gives one measure at a time. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "We reached the summit!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Matcha Seed",
        "T1": "The Summit Cake",
        "T3": "The Mint Caramel Cake"
      }
    },
    73: {
      "titulo": "Licorice Vines",
      "ensena": "New flavor: Electric Blueberry. Use the Reserve to set aside what gets in the way.",
      "intro": [
        "What a thick jungle! Electric Blueberry grows among the cocoa."
      ],
      "guia": [
        "Electric Blueberry! It is the blue one with the little crown. You now have seven flavors."
      ],
      "fin": "It tastes amazing!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Matcha Tea Cake",
        "TV": "The Meringue Pinwheel",
        "H": "Reserve"
      }
    },
    74: {
      "titulo": "The Chocolate River",
      "ensena": "New flavor: Electric Blueberry. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "Every measure in its place. Beautiful.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T1": "The Blueberry Donut"
      }
    },
    75: {
      "titulo": "Mint Leaves",
      "ensena": "New flavor: Electric Blueberry. The crystal pipe only lets Mint through.",
      "intro": [],
      "guia": [],
      "fin": "Another sweet wakes up! There's no stopping us.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T3": "The Mint Donut",
        "T1": "The Blueberry Donut",
        "T2": "The Galaxy Donut"
      }
    },
    76: {
      "titulo": "The Lost Temple",
      "ensena": "New flavor: Electric Blueberry. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Not a drop wasted. You're a true master.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T1": "The Galaxy Donut",
        "T3": "The Strawberry Donut",
        "T2": "Blueberry & Mint Donut"
      }
    },
    77: {
      "titulo": "Gummy Frogs",
      "ensena": "New flavor: Electric Blueberry. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Brilliant mix!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T3": "The Galaxy Donut",
        "T2": "The Blueberry Donut",
        "T1": "The Strawberry Donut"
      }
    },
    78: {
      "titulo": "The Rope Bridge",
      "ensena": "New flavor: Electric Blueberry. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "You thought it through. It shows.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T3": "The Matcha Seed",
        "T2": "The Blueberry Donut",
        "T1": "The Galaxy Donut"
      }
    },
    79: {
      "titulo": "Blueberry Rain",
      "ensena": "Feed the Matcha Seed and the licorice bridge will sprout. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "It smells wonderful!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T3": "The Matcha Seed",
        "T1": "Strawberry & Matcha Cake",
        "T2": "Strawberry, Matcha & Lemon Cake"
      }
    },
    80: {
      "titulo": "Deep Roots",
      "ensena": "A chocolate seal blocks a jar: melt it by pouring Caramel. The crystal pipe only lets Mint through.",
      "intro": [],
      "guia": [],
      "fin": "Step by step, the kingdom gets its flavor back.",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T1": "The Lemon Cake"
      }
    },
    81: {
      "titulo": "The Hidden Clearing",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "One more for the collection!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Matcha Seed",
        "T1": "The Strawberry Donut"
      }
    },
    82: {
      "titulo": "Sweet-Tooth Monkeys",
      "ensena": "Grape weighs 2 and sinks to the bottom. The crystal pipe only lets Mint through.",
      "intro": [],
      "guia": [],
      "fin": "Sweet, exact and elegant.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T3": "The Mint Donut",
        "T2": "Blueberry & Grape Donut",
        "T1": "The Frosted Cake"
      }
    },
    83: {
      "titulo": "The Cocoa Waterfall",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "This deserves a party!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T1": "Blueberry, Caramel & Strawberry Donut",
        "T3": "The Blueberry Donut",
        "T2": "The Galaxy Donut"
      }
    },
    84: {
      "titulo": "The Cocoa Tree",
      "ensena": "The scale opens its bridge at the marked weight. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "The cocoa tree is blooming!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Cocoa Tree"
      }
    },
    85: {
      "titulo": "Smoking Slope",
      "ensena": "The crystal pipe only lets Mint through. The flask takes and gives one measure at a time.",
      "intro": [
        "The Caramel Volcano is bubbling. Many jars, many flavors: think every step."
      ],
      "guia": [],
      "fin": "It tastes amazing!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "The Mint Donut",
        "T2": "The Matcha Seed",
        "T3": "Caramel, Lemon & Mint Macaron"
      }
    },
    86: {
      "titulo": "Sweet Lava Rivers",
      "ensena": "A chocolate seal blocks a jar: melt it by pouring Caramel. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Every measure in its place. Beautiful.",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T1": "The Mint Donut",
        "T3": "The Matcha Seed",
        "T2": "The Blueberry Donut"
      }
    },
    87: {
      "titulo": "The Natural Oven",
      "ensena": "Five jars and little free space: plan before you move. The crystal pipe only lets Mint through.",
      "intro": [],
      "guia": [],
      "fin": "Another sweet wakes up! There's no stopping us.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T3": "The Matcha Seed",
        "T1": "The Galaxy Donut",
        "T2": "The Matcha Tea Cake"
      }
    },
    88: {
      "titulo": "Syrup Geysers",
      "ensena": "Use the Reserve to set aside what gets in the way. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Not a drop wasted. You're a true master.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "Caramel & Strawberry Donut",
        "T1": "The Mint Matcha Macaron",
        "H": "Reserve"
      }
    },
    89: {
      "titulo": "Nougat Rocks",
      "ensena": "Feed the Matcha Seed and the licorice bridge will sprout. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Brilliant mix!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T1": "Blueberry, Lemon & Grape Cake"
      }
    },
    90: {
      "titulo": "Cinnamon Ash",
      "ensena": "The flask takes and gives one measure at a time. The crystal pipe only lets Mint through.",
      "intro": [],
      "guia": [],
      "fin": "You thought it through. It shows.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "Blueberry, Caramel & Lemon Cake",
        "T2": "The Mint Donut"
      }
    },
    91: {
      "titulo": "The Burning Tunnel",
      "ensena": "Five jars and little free space: plan before you move. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "It smells wonderful!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T3": "The Strawberry Donut",
        "T1": "The Galaxy Donut"
      }
    },
    92: {
      "titulo": "Caramel Bubbles",
      "ensena": "Five jars and little free space: plan before you move. Use the Reserve to set aside what gets in the way.",
      "intro": [],
      "guia": [],
      "fin": "Step by step, the kingdom gets its flavor back.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "Strawberry, Mint & Grape Pastry",
        "H": "Reserve"
      }
    },
    93: {
      "titulo": "Sugar Fumaroles",
      "ensena": "Five jars and little free space: plan before you move. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "One more for the collection!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Mint Donut",
        "T2": "The Galaxy Donut",
        "T3": "The Matcha Tea Cake"
      }
    },
    94: {
      "titulo": "The Crater Rim",
      "ensena": "Five jars and little free space: plan before you move. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "Sweet, exact and elegant.",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T3": "The Mint Donut",
        "T1": "The Matcha Tea Cake"
      }
    },
    95: {
      "titulo": "Flavor Eruption",
      "ensena": "Five jars and little free space: plan before you move. Use the Reserve to set aside what gets in the way.",
      "intro": [],
      "guia": [],
      "fin": "This deserves a party!",
      "ingenio": "Leave the fifth container on top empty",
      "nombres": {
        "T1": "The Matcha Tea Cake",
        "T2": "The Lemon Cake",
        "H": "Reserve"
      }
    },
    96: {
      "titulo": "The Golden Crater",
      "ensena": "Five jars and little free space: plan before you move. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "The volcano has calmed down!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Mint Donut",
        "T2": "The Crater Cake"
      }
    },
    97: {
      "titulo": "Sugar Shelves",
      "ensena": "Five jars and little free space: plan before you move. Grape weighs 2 and sinks to the bottom.",
      "intro": [
        "The Recipe Library keeps the hardest mixes in the kingdom."
      ],
      "guia": [],
      "fin": "It tastes amazing!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Galaxy Donut"
      }
    },
    98: {
      "titulo": "The Forbidden Section",
      "ensena": "Five jars and little free space: plan before you move. The scale opens its bridge at the marked weight.",
      "intro": [],
      "guia": [],
      "fin": "Every measure in its place. Beautiful.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "Blueberry & Strawberry Pastry"
      }
    },
    99: {
      "titulo": "Forgotten Recipes",
      "ensena": "Five jars and little free space: plan before you move. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Another sweet wakes up! There's no stopping us.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Galaxy Donut",
        "T1": "The Strawberry Donut"
      }
    },
    100: {
      "titulo": "The Copper Lectern",
      "ensena": "The crystal pipe only lets Mint through. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "Not a drop wasted. You're a true master.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T1": "The Mint Donut",
        "T2": "The Matcha Tiramisu"
      }
    },
    101: {
      "titulo": "Blueberry Ink",
      "ensena": "Five jars and little free space: plan before you move. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "Brilliant mix!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T3": "The Mint Caramel Cake",
        "T1": "Strawberry & Mint Donut"
      }
    },
    102: {
      "titulo": "Sticky Pages",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "You thought it through. It shows.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "The Strawberry Donut",
        "T2": "The Matcha Seed",
        "T3": "The Blueberry Donut"
      }
    },
    103: {
      "titulo": "The Secret Index",
      "ensena": "Five jars and little free space: plan before you move. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "It smells wonderful!",
      "ingenio": "Leave the fifth container on top empty",
      "nombres": {
        "T1": "The Galaxy Donut",
        "T2": "The Cappuccino Donut"
      }
    },
    104: {
      "titulo": "The Reading Room",
      "ensena": "The crystal pipe only lets Mint through. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Step by step, the kingdom gets its flavor back.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T1": "The Mint Donut",
        "T3": "Blueberry, Matcha & Mint Macaron",
        "T2": "The Blueberry Donut"
      }
    },
    105: {
      "titulo": "Margin Notes",
      "ensena": "The capsule is only filled and emptied through pipes. The scale opens its bridge at the marked weight.",
      "intro": [],
      "guia": [],
      "fin": "One more for the collection!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "Caramel & Lemon Cake",
        "T1": "Caramel, Lemon & Mint Macaron"
      }
    },
    106: {
      "titulo": "The Flavor Archive",
      "ensena": "The flask takes and gives one measure at a time. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "Sweet, exact and elegant.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T3": "The Blueberry Donut",
        "T2": "Blueberry, Caramel & Lemon Cake",
        "T1": "The Strawberry Donut"
      }
    },
    107: {
      "titulo": "The Last Page",
      "ensena": "Feed the Matcha Seed and the licorice bridge will sprout. Use the Reserve to set aside what gets in the way.",
      "intro": [],
      "guia": [],
      "fin": "This deserves a party!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T2": "Blueberry, Strawberry & Matcha Cake",
        "T1": "The Matcha Seed",
        "H": "Reserve"
      }
    },
    108: {
      "titulo": "The Great Recipe Book",
      "ensena": "A chocolate seal blocks a jar: melt it by pouring Caramel. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "The Great Recipe Book is complete!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Recipe Book Cake",
        "T1": "The Mint Matcha Macaron"
      }
    },
    109: {
      "titulo": "The Palace Gates",
      "ensena": "The capsule is only filled and emptied through pipes. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [
        "The Star Palace. The map ends here... but baking never does.",
        "Let's go for the last challenge!"
      ],
      "guia": [],
      "fin": "It tastes amazing!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "Strawberry & Matcha Cake",
        "T2": "Strawberry & Lemon Macaron"
      }
    },
    110: {
      "titulo": "The Hall of Mirrors",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Every measure in its place. Beautiful.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T1": "Blueberry, Caramel & Grape Macaron",
        "T2": "The Blueberry Donut",
        "T3": "The Galaxy Donut"
      }
    },
    111: {
      "titulo": "The Caramel Staircase",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "Another sweet wakes up! There's no stopping us.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "Blueberry & Strawberry Pastry",
        "T1": "The Matcha Seed"
      }
    },
    112: {
      "titulo": "The Star Garden",
      "ensena": "Five jars and little free space: plan before you move. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "Not a drop wasted. You're a true master.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Matcha Seed",
        "T3": "Blueberry, Strawberry & Lemon Macaron",
        "T1": "The Cappuccino Donut"
      }
    },
    113: {
      "titulo": "The Royal Kitchen",
      "ensena": "The capsule is only filled and emptied through pipes. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "Brilliant mix!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T1": "The Mint Matcha Macaron",
        "T2": "Matcha, Lemon & Mint Macaron"
      }
    },
    114: {
      "titulo": "The Flavor Ball",
      "ensena": "The crystal pipe only lets Mint through. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "You thought it through. It shows.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Mint Donut",
        "T3": "The Matcha Tea Cake"
      }
    },
    115: {
      "titulo": "The Meringue Tower",
      "ensena": "Five jars and little free space: plan before you move. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "It smells wonderful!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T1": "The Peach Cream Cake",
        "T2": "The Matcha Seed"
      }
    },
    116: {
      "titulo": "The Chocolate Throne",
      "ensena": "Five jars and little free space: plan before you move. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Step by step, the kingdom gets its flavor back.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Galaxy Donut",
        "H": "Reserve"
      }
    },
    117: {
      "titulo": "The Cake Gallery",
      "ensena": "Grape weighs 2 and sinks to the bottom. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "One more for the collection!",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T3": "The Galaxy Donut",
        "T2": "Caramel, Matcha & Lemon Macaron",
        "T1": "The Cappuccino Donut"
      }
    },
    118: {
      "titulo": "The Observatory",
      "ensena": "Five jars and little free space: plan before you move. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [],
      "guia": [],
      "fin": "Sweet, exact and elegant.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "Lemon & Mint Cake",
        "T3": "The Matcha Seed",
        "T1": "The Mint Matcha Macaron"
      }
    },
    119: {
      "titulo": "The Antechamber",
      "ensena": "Five jars and little free space: plan before you move. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "This deserves a party!",
      "ingenio": "Leave the fifth container on top empty",
      "nombres": {
        "T1": "Strawberry, Matcha & Mint Macaron",
        "T2": "The Mint Donut",
        "T3": "The Strawberry Donut"
      }
    },
    120: {
      "titulo": "The Sugar Crown",
      "ensena": "A chocolate seal blocks a jar: melt it by pouring Caramel. A chocolate block plugs a pipe: only Caramel melts it.",
      "intro": [],
      "guia": [],
      "fin": "The Sugar Crown shines! You are a legend now, and the Endless Bakery awaits you.",
      "ingenio": "Solve it without hints",
      "nombres": {
        "T1": "Blueberry & Lemon Macaron",
        "T2": "The Sugar Crown"
      }
    }
    // ── GENERADOS: FIN ──
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = EN;
  else global.NIVELES_EN = EN;
})(this);
