/* SUGAR-SNAP BAKERY · English texts for the levels.
   Same order and speakers as niveles.js; only the words change. */
(function (global) {
  'use strict';
  var EN = {
    regiones: { 1: 'Sugar-Snap Bakery', 2: 'The Crystal Cotton Forest', 3: 'The Ice Cream Ruins', 4: 'The Floating City', 5: 'The Flavor Fair' },
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
        "T1": "The Caramel Cake"
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
        "T2": "The Matcha Tiramisu",
        "T1": "The Matcha Cake",
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
        "T1": "The Matcha Cake"
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
        "T1": "The Mint Cake"
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
        "T1": "The Mint Cake"
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
        "T1": "The Mint Cake"
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
        "T1": "The Mint Matcha Macaron"
      }
    },
    20: {
      "titulo": "The Frosted Oven",
      "ensena": "Grape weighs 2 and sinks to the bottom. The capsule is only filled and emptied through pipes.",
      "intro": [],
      "guia": [],
      "fin": "The frosted oven warms up again.",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T2": "The Galactic Cake",
        "T1": "The Mint Cake"
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
        "T1": "The Caramel Cake",
        "T2": "The Caramel Cake"
      }
    },
    22: {
      "titulo": "Three-Scoop Ice Cream",
      "ensena": "There is a mixed order: the colors of the little circles show how much of each flavor. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Three scoops and none of them fell!",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T3": "The Mint Caramel Cake",
        "T2": "The Mint Cake",
        "T1": "The Mint Cake"
      }
    },
    23: {
      "titulo": "Order in the Freezer",
      "ensena": "A chocolate seal blocks a jar: melt it by pouring Caramel. Grape weighs 2 and sinks to the bottom.",
      "intro": [],
      "guia": [],
      "fin": "Everything sorted in the freezer!",
      "ingenio": "Leave the third container on top empty",
      "nombres": {
        "T1": "The Caramel Cake",
        "T2": "The Caramel Cake"
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
        "T1": "The Mint Cake",
        "T2": "The Ice Heart"
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
      "ingenio": "Solve it without hints",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Lime Macaron"
      }
    },
    26: {
      "titulo": "Hanging Streets",
      "ensena": "The scale opens its bridge at the marked weight. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Streets in place. The city breathes.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Lime Macaron",
        "T1": "The Orange Cake"
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
        "T1": "The Galaxy Donut",
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
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "The Orange Cake",
        "T2": "The Mint Caramel Cake"
      }
    },
    29: {
      "titulo": "Melting Up High",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "Melted chocolate and an exact dose. Flawless.",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Lime Macaron",
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
        "T3": "The Mint Donut",
        "T1": "The Lime Macaron",
        "T2": "The Mint Matcha Macaron"
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
        "T2": "The Lime Macaron",
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
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T2": "The Mint Donut",
        "T1": "The Matcha Seed"
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
        "T3": "The Mint Donut",
        "T2": "The Matcha Tiramisu"
      }
    },
    34: {
      "titulo": "Sky Pipes",
      "ensena": "The valve picks which pipe the tap uses: think where each measure goes. One pipe sends matter back up to another jar: use it to reorder the layers.",
      "intro": [],
      "guia": [],
      "fin": "The sky pipes are flowing again!",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T1": "The Mint Donut",
        "T2": "The Mint Donut"
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
        "T1": "The Matcha Seed",
        "T2": "The Orange Cake"
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
        "T2": "The Orange Cake",
        "T1": "The Primordial Heart",
        "T3": "The Lime Macaron"
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
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T1": "The Mint Caramel Cake",
        "T2": "The Pink Mint Donut"
      }
    },
    38: {
      "titulo": "Macaron Stall",
      "ensena": "The capsule is only filled and emptied through pipes. A chocolate seal blocks a jar: melt it by pouring Caramel.",
      "intro": [],
      "guia": [],
      "fin": "Two-flavor macarons for everyone!",
      "ingenio": "Leave the fourth container on top empty",
      "nombres": {
        "T1": "The Pink Mint Donut",
        "T2": "The Matcha Tiramisu"
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
        "T1": "The Matcha Seed",
        "T2": "The Mint Matcha Macaron"
      }
    },
    40: {
      "titulo": "The Cream Ferris Wheel",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. The flask takes and gives one measure at a time.",
      "intro": [],
      "guia": [],
      "fin": "The Ferris wheel is turning again!",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T1": "The Pink Mint Donut",
        "T2": "The Pink Mint Donut",
        "T3": "The Mint Caramel Cake"
      }
    },
    41: {
      "titulo": "Flavor Raffle",
      "ensena": "One pipe sends matter back up to another jar: use it to reorder the layers. Feed the Matcha Seed and the licorice bridge will sprout.",
      "intro": [],
      "guia": [],
      "fin": "A prize for every sweet!",
      "ingenio": "Leave the first container on top empty",
      "nombres": {
        "T1": "The Mint Caramel Cake",
        "T2": "The Matcha Seed"
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
        "T2": "The Mint Matcha Macaron",
        "T1": "The Mint Caramel Cake"
      }
    },
    43: {
      "titulo": "The Fair Still",
      "ensena": "A chocolate block plugs a pipe: only Caramel melts it. In the still, Caramel + Mint turn into steam for the pinwheel.",
      "intro": [],
      "guia": [],
      "fin": "Steam, chocolate and flavor. This is fine pastry now.",
      "ingenio": "Leave the second container on top empty",
      "nombres": {
        "T2": "The Mint Caramel Cake",
        "T1": "The Matcha Tiramisu",
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
        "T1": "The Grape Caramel Cake",
        "T2": "The Mint Caramel Cake"
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
        "T2": "The Pink Mint Donut",
        "T3": "The Cappuccino Donut",
        "T1": "The Mint Caramel Cake"
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
        "T3": "The Mint Matcha Macaron",
        "T1": "The Matcha Donut",
        "T2": "The Mint Caramel Cake",
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
        "T1": "The Cappuccino Donut",
        "T2": "The Blueberry Tea Cake"
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
        "T1": "The Mint Caramel Cake",
        "T2": "The Great Fair Cake",
        "TV": "The Meringue Pinwheel"
      }
    }
    // ── GENERADOS: FIN ──
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = EN;
  else global.NIVELES_EN = EN;
})(this);
