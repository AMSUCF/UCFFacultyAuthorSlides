/* ============================================
   Scene Data - 42 scenes, one image per scene
   A quest through the landscape of authorship
   ============================================ */

const SCENES = [

  // ===== ACT 0: TITLE =====

  { // 0 - Title Screen
    id: 0,
    room: 'The Beginning',
    template: 'title',
    showSprite: false,
    transition: 'none',
    title: true,
    objects: [],
    dialogue: ''
  },

  // ===== ACT 1: ARRIVAL =====

  { // 1 - UCF Exterior
    id: 1,
    room: 'University of Central Florida',
    template: 'exterior',
    transition: 'iris',
    spriteX: 500,
    objects: [],
    dialogue: "You arrive at the University of Central Florida on a warm Florida evening. Tonight's Faculty Author Celebration asks a question you are frequently asked: Why do you keep writing books?"
  },

  // ===== ACT 2: THE STATS =====

  { // 2 - Reading Stats 1
    id: 2,
    room: 'The Lecture Hall',
    template: 'lecture-hall',
    transition: 'walk-right',
    spriteX: 100,
    objects: [{
      img: 'readingstatsone.png',
      type: 'monitor-screen',
      x: 370, y: 44, w: 510, h: 286,
      label: 'Reading statistics (YouGov 2025)'
    }],
    dialogue: "The implied follow-up -- does anyone read academic monographs? -- points to a broader cultural anxiety. The forms of writing we celebrate tonight are all, we are told, suffering from a decline in audience."
  },

  { // 3 - Reading Stats 2
    id: 3,
    room: 'The Lecture Hall',
    template: 'lecture-hall',
    transition: 'wipe-right',
    spriteX: 100,
    objects: [{
      img: 'readingstatstwo.png',
      type: 'monitor-screen',
      x: 370, y: 44, w: 510, h: 286,
      label: 'More reading statistics'
    }],
    dialogue: "Headlines proclaim the death of literacy and the steady erosion of reading for pleasure. This alleged death of reading, exaggerated though it may be, arrives at a moment when computational tools are expanding rapidly."
  },

  // ===== ACT 3: SOMETHING IS READING =====

  { // 4 - LibGen
    id: 4,
    room: 'The Server Room',
    template: 'server-room',
    transition: 'walk-right',
    spriteX: 620,
    objects: [{
      img: 'libgen.png',
      type: 'monitor-screen',
      x: 350, y: 30, w: 520, h: 350,
      label: 'Library Genesis'
    }],
    dialogue: "Well, we know SOMETHING is reading. The Books3 dataset scraped Library Genesis -- 196,640 books fed into AI training. No permission asked, no compensation given."
  },

  { // 5 - Books3
    id: 5,
    room: 'The Server Room',
    template: 'server-room',
    transition: 'iris',
    spriteX: 620,
    objects: [{
      img: 'gen_slide21_img2.png',
      type: 'monitor-screen',
      x: 350, y: 30, w: 520, h: 350,
      label: 'Books3 training dataset'
    }],
    dialogue: "Your books might be in there. Large language models are marketed as bringing 'PhD-level intelligence' to their tasks. How do we reckon with authorship in the age of AI?"
  },

  // ===== ACT 4: THE END OF BOOKS =====

  { // 6 - Coover
    id: 6,
    room: 'The Archive',
    template: 'archive',
    transition: 'walk-right',
    spriteX: 140,
    objects: [{
      img: 'coover.png',
      type: 'newspaper',
      x: 370, y: 24, w: 500, h: 360,
      label: 'Coover, "The End of Books" (1992)'
    }],
    dialogue: "In electronic literature, we've been talking about the end of books for a long time. Robert Coover's 1992 New York Times essay declared the hypertext novel would overthrow print. That... didn't happen."
  },

  { // 7 - The Corridor
    id: 7,
    room: 'The Corridor',
    template: 'hallway',
    transition: 'walk-right',
    spriteX: 580,
    objects: [],
    dialogue: "But what happened instead was a different story: one shaped by the platforms on which we author and read, and the question of who controls them. Let me take you through that journey -- with apologies for the navelgazing."
  },

  // ===== ACT 5: THE FIRST BOOK =====

  { // 8 - Quest
    id: 8,
    room: "The Professor's Study",
    template: 'study',
    transition: 'wipe-right',
    spriteX: 120,
    objects: [{
      img: 'quest.jpg',
      type: 'book-pedestal',
      x: 500, y: 20, w: 300, h: 400,
      label: 'Adventure Games: Playing the Outsider'
    }],
    dialogue: "This was my first book. The working title was 'Magical Books,' which was shot down by a table of scholars at the Electronic Literature Organization in favor of a Monty Python joke."
  },

  { // 9 - Python
    id: 9,
    room: "The Professor's Study",
    template: 'study',
    transition: 'diamond',
    spriteX: 120,
    objects: [{
      img: 'python.gif',
      type: 'monitor-screen',
      x: 400, y: 40, w: 460, h: 320,
      label: 'Monty Python and the Holy Grail'
    }],
    dialogue: "We went with a quest metaphor instead. I saw interactive fiction and adventure games as extensions of literary tradition -- the reader as hero, the author as architect of possibility."
  },

  { // 10 - Alice
    id: 10,
    room: 'The Reading Nook',
    template: 'study',
    transition: 'walk-right',
    spriteX: 100,
    objects: [{
      img: 'alice.webp',
      type: 'ipad-screen',
      x: 460, y: 20, w: 360, h: 390,
      label: 'Alice for the iPad (2010)'
    }],
    dialogue: "The Alice iPad app was a hit in 2010. This is perhaps hard to imagine now. But I saw this as an extension of the adventure games I grew up on, a new platform for old dreams of interactive storytelling."
  },

  // ===== ACT 6: THE GAME ROOM =====

  { // 11 - Tentacle
    id: 11,
    room: 'The Game Room',
    template: 'game-room',
    transition: 'walk-right',
    spriteX: 140,
    objects: [{
      img: 'tentacle.webp',
      type: 'wall-poster',
      x: 360, y: 10, w: 540, h: 390,
      label: 'Day of the Tentacle (LucasArts, 1993)'
    }],
    dialogue: "I was interested in the tools that made these games and who they empowered. Adventure games were the subject of much of my graduate research -- LucasArts, Sierra, the golden age of point-and-click."
  },

  { // 12 - Jensen
    id: 12,
    room: 'The Game Room',
    template: 'game-room',
    transition: 'wipe-right',
    spriteX: 140,
    objects: [{
      img: 'jensen.jpg',
      type: 'wall-poster',
      x: 380, y: 10, w: 480, h: 380,
      label: 'Jane Jensen'
    }],
    dialogue: "One of the few women making games in that era was Jane Jensen. Her work demonstrated that adventure games could tell complex, literary stories -- gothic mysteries with real emotional depth."
  },

  { // 13 - Knight
    id: 13,
    room: 'The Game Room',
    template: 'game-room',
    transition: 'iris',
    spriteX: 140,
    objects: [{
      img: 'knight.webp',
      type: 'monitor-screen',
      x: 370, y: 20, w: 520, h: 370,
      label: 'Gabriel Knight: Sins of the Fathers'
    }],
    dialogue: "Her Gabriel Knight series inspired a generation of creators. Those games inspired people to make not only their own games, but the tools that would allow others to control authorship."
  },

  // ===== ACT 7: TOOLS OF CREATION =====

  { // 14 - AGS
    id: 14,
    room: 'The Workshop',
    template: 'workshop',
    transition: 'walk-right',
    spriteX: 120,
    objects: [{
      img: 'ags.webp',
      type: 'monitor-screen',
      x: 380, y: 16, w: 500, h: 360,
      label: 'Adventure Game Studio'
    }],
    dialogue: "Adventure Game Studio became one of those tools -- a creative platform that put game-making into the hands of anyone with a story to tell. The democratization of authorship through software."
  },

  // ===== ACT 8: THE FLASH ERA =====

  { // 15 - Flash book
    id: 15,
    room: 'The Flash Lab',
    template: 'computer-lab',
    transition: 'walk-right',
    spriteX: 100,
    objects: [{
      img: 'flash.jpg',
      type: 'monitor-screen',
      x: 370, y: 20, w: 520, h: 360,
      label: 'Flash: Building the Interactive Web'
    }],
    dialogue: "Similar tools -- and their fate -- was the subject of my next book. Flash empowered an entire generation of web creators, artists, and storytellers to build for the open web."
  },

  { // 16 - Flash creativity
    id: 16,
    room: 'The Flash Lab',
    template: 'computer-lab',
    transition: 'wipe-right',
    spriteX: 100,
    objects: [{
      img: 'gen_slide23_img3.jpg',
      type: 'monitor-screen',
      x: 370, y: 20, w: 520, h: 360,
      label: 'Flash creative explosion'
    }],
    dialogue: "Flash enabled anyone to build interactive experiences. It was messy and democratic and endlessly creative. Homestar Runner, Newgrounds, a million weird wonderful experiments in what the web could be."
  },

  { // 17 - Flash web
    id: 17,
    room: 'The Flash Lab',
    template: 'computer-lab',
    transition: 'iris',
    spriteX: 100,
    objects: [{
      img: 'gen_slide24_img1.png',
      type: 'monitor-screen',
      x: 370, y: 20, w: 520, h: 360,
      label: 'The Flash web era'
    }],
    dialogue: "And then it was taken away. Apple's decision to block Flash on the iPhone began a chain of events that would erase a huge portion of digital history. A proprietary platform killed by another proprietary platform."
  },

  // ===== ACT 9: A VOICE IN THE DARK =====

  { // 18 - Natalie Lawhead quote
    id: 18,
    room: 'A Voice in the Dark',
    template: 'dark-room',
    transition: 'fade',
    spriteX: 180,
    objects: [{
      type: 'wall-text',
      x: 200, y: 60, w: 750,
      text: "\"I feel like there's a lot to learn from Flash. As an example of what technology enables for 'the little people', as an example of what it takes to destroy that and basically eradicate a huge portion of digital history, and as an example of how easy it is for something like that to just happen.\"",
      attr: '-- Natalie Lawhead'
    }],
    dialogue: "A voice echoes through the dark archive. It speaks of what was lost -- and how easily it was lost."
  },

  { // 19 - Flash preservation
    id: 19,
    room: 'The Archive Terminal',
    template: 'server-room',
    transition: 'wipe-right',
    spriteX: 620,
    objects: [{
      img: 'gen_slide26_img1.png',
      type: 'monitor-screen',
      x: 350, y: 30, w: 520, h: 350,
      label: 'Flash preservation efforts'
    }],
    dialogue: "The history of Flash preservation reminds us how much we need to support open data. It's a reminder of the consequences of over-investing in any proprietary system, especially one that compiles and hides its source code."
  },

  // ===== ACT 10: TWINE =====

  { // 20 - Twining book
    id: 20,
    room: 'The Twine Workshop',
    template: 'workshop',
    transition: 'walk-right',
    spriteX: 120,
    objects: [{
      img: 'twining.png',
      type: 'book-pedestal',
      x: 480, y: 16, w: 320, h: 400,
      label: 'Twining (2022)'
    }],
    dialogue: "I happened to be in grad school with the person who would make a tool incredibly important to a wide range of authors -- Chris Klimas's Twine, a tool for the very form Coover thought would overthrow the novel."
  },

  { // 21 - Twine interface
    id: 21,
    room: 'The Twine Workshop',
    template: 'workshop',
    transition: 'iris',
    spriteX: 120,
    objects: [{
      img: 'twineinterface.png',
      type: 'monitor-screen',
      x: 360, y: 20, w: 540, h: 370,
      label: 'Twine editor interface'
    }],
    dialogue: "Twine put hypertext authoring into the hands of anyone who could write. It became what Coover dreamed of -- except made by everyone, not just the literary establishment."
  },

  // ===== ACT 11: OUTSIDER VOICES =====

  { // 22 - Porpentine
    id: 22,
    room: 'The Underground',
    template: 'gallery',
    palette: 'gallery-underground',
    transition: 'wipe-down',
    spriteX: 120,
    objects: [{
      img: 'porpentine.webp',
      type: 'wall-poster',
      x: 380, y: 10, w: 480, h: 390,
      label: 'Porpentine'
    }],
    dialogue: "Porpentine's Twine work opened doors for voices previously excluded from game creation. The personal became playable, the marginal became central. Twine gave outsiders a way in."
  },

  { // 23 - Outsider
    id: 23,
    room: 'The Underground',
    template: 'gallery',
    palette: 'gallery-underground',
    transition: 'iris',
    spriteX: 120,
    objects: [{
      img: 'outsider.jpg',
      type: 'wall-poster',
      x: 380, y: 10, w: 480, h: 390,
      label: 'Bodies of Information'
    }],
    dialogue: "I wrote about the types of games that outsiders create, and the stories they make possible. When the barriers to creation are lowered, entirely new forms of expression emerge."
  },

  // ===== ACT 12: INTERACTIVE NARRATIVE =====

  { // 24 - KRZ Exchange
    id: 24,
    room: 'The Zero Gallery',
    template: 'gallery',
    transition: 'walk-right',
    spriteX: 160,
    objects: [{
      img: 'krzexchange.png',
      type: 'wall-poster',
      x: 380, y: 10, w: 520, h: 380,
      label: 'Kentucky Route Zero'
    }],
    dialogue: "This fascination with the type of stories that technology enables has continued to be at the heart of my work. Kentucky Route Zero is a story of workers displaced by machines -- a cycle that replays across every era of technological change. Magical realism made painfully relevant."
  },

  { // 25 - KRZ Machine
    id: 25,
    room: 'The Zero Gallery',
    template: 'gallery',
    transition: 'diamond',
    spriteX: 160,
    objects: [{
      img: 'krzmachine.png',
      type: 'wall-poster',
      x: 380, y: 10, w: 520, h: 380,
      label: 'The machine in the dark'
    }],
    dialogue: "A machine hums in the dark, doing the work that people once did. From the loom to the assembly line to the language model, these cycles of displacement replay. Each time we are told the disruption is unprecedented. Each time, the people displaced are asked to adapt or disappear."
  },

  // ===== ACT 13: DETERMINATION =====

  { // 26 - Undertale
    id: 26,
    room: 'The Arcade',
    template: 'game-room',
    transition: 'walk-right',
    spriteX: 140,
    objects: [{
      img: 'undertale.jpg',
      type: 'wall-poster',
      x: 380, y: 10, w: 500, h: 380,
      label: 'Undertale (Toby Fox, 2015)'
    }],
    dialogue: "Undertale proved that deeply human stories could emerge from the simplest tools of play. A game about mercy in a medium built around conflict."
  },

  { // 27 - Bad Time
    id: 27,
    room: 'The Arcade',
    template: 'game-room',
    transition: 'wipe-right',
    spriteX: 140,
    objects: [{
      img: 'badtime.png',
      type: 'monitor-screen',
      x: 380, y: 20, w: 500, h: 370,
      label: "You're gonna have a bad time"
    }],
    dialogue: "It challenged players to reconsider their assumptions about what games ask of us. You could fight everything -- or you could choose not to. The game remembers your choices."
  },

  { // 28 - Undertale Humanity
    id: 28,
    room: 'The Arcade',
    template: 'game-room',
    transition: 'iris',
    spriteX: 140,
    objects: [{
      img: 'undertalehumanity.png',
      type: 'wall-poster',
      x: 380, y: 10, w: 500, h: 380,
      label: 'Despite everything, it\'s still you.'
    }],
    dialogue: "Despite everything, it's still you. Games like these remind us that the medium itself is not the message -- it's what we choose to do with it."
  },

  // ===== ACT 14: THE RUINS =====

  { // 29 - The Ruins
    id: 29,
    room: 'The Ruins',
    template: 'ruins',
    transition: 'fade-slow',
    typewriterSpeed: 45,
    spriteX: 200,
    objects: [{
      img: 'krzruin.png',
      type: 'fullscreen',
      x: 0, y: 0, w: 1280, h: 540,
      label: ''
    }],
    dialogue: "...which brings us to the end of the world. The ruins of our platforms remind us what we've already lost. But ruins can also be places of possibility."
  },

  // ===== ACT 15: TOXIC CULTURE =====

  { // 30 - Geek
    id: 30,
    room: 'The Dark Archive',
    template: 'dark-room',
    transition: 'fade',
    spriteX: 140,
    objects: [{
      img: 'geek.jpg',
      type: 'book-cover',
      x: 460, y: 16, w: 340, h: 400,
      label: 'Toxic Geek Masculinity in Media'
    }],
    dialogue: "There's also a part of my work that has always been informed by technology's amplification of misogyny and toxicity. The culture wars raging through gaming and tech are not new."
  },

  { // 31 - Aftermath
    id: 31,
    room: 'The Dark Archive',
    template: 'dark-room',
    transition: 'iris',
    spriteX: 140,
    objects: [{
      img: 'aftermath.png',
      type: 'monitor-screen',
      x: 370, y: 20, w: 520, h: 360,
      label: 'Aftermath investigation'
    }],
    dialogue: "The sequel, Toxic Geek Masculinity 2.0, is... not going well. The problems have only deepened as technology and extremism have become further entwined. The Epstein files confirmed connections between tech billionaires and the worst impulses of the industry."
  },

  // ===== ACT 16: THE AUTHOR'S JOURNEY =====

  { // 32 - Fanboy
    id: 32,
    room: "The Author's Shelf",
    template: 'study',
    transition: 'walk-right',
    spriteX: 120,
    objects: [{
      img: 'fanboy.jpg',
      type: 'book-pedestal',
      x: 500, y: 20, w: 300, h: 400,
      label: 'Fandom and the Fanboy Problem'
    }],
    dialogue: "I find myself trying to write in a landscape where the things that bring me joy -- the platforms and tools that historically enabled authorship and play -- are a source of perpetual despair and frustration."
  },

  { // 33 - Track Changes
    id: 33,
    room: 'The Writing Desk',
    template: 'study',
    transition: 'wipe-right',
    spriteX: 120,
    objects: [{
      img: 'trackchanges.jpg',
      type: 'book-pedestal',
      x: 500, y: 20, w: 300, h: 400,
      label: 'Track Changes'
    }],
    dialogue: "Every tool changes our writing. Track Changes explored how word processors shaped literature itself -- from the way we draft to the way we think about revision. Now the tools are writing back."
  },

  // ===== ACT 17: CRISIS =====

  { // 34 - Pivoting
    id: 34,
    room: 'The Crisis Room',
    template: 'study',
    palette: 'study-crisis',
    transition: 'fade',
    spriteX: 120,
    objects: [{
      img: 'pivoting.jpg',
      type: 'book-cover',
      x: 460, y: 16, w: 340, h: 400,
      label: 'Pivoting'
    }],
    dialogue: "How do we talk about making, or writing, in a landscape of economic anxiety, labor displacement, environmental devastation, and political pressures pushing for anti-intellectualism?"
  },

  { // 35 - Making
    id: 35,
    room: 'The Crisis Room',
    template: 'study',
    palette: 'study-crisis',
    transition: 'iris',
    spriteX: 120,
    objects: [{
      img: 'making.jpg',
      type: 'book-cover',
      x: 460, y: 16, w: 340, h: 400,
      label: 'Making in the Broken World'
    }],
    dialogue: "And less reading than ever? These questions aren't abstract -- they shape every decision we make about what to write, how to write it, and why it matters."
  },

  // ===== ACT 18: THE CONNECTION =====

  { // 36 - Haraway quote
    id: 36,
    room: 'The Connection',
    template: 'dark-room',
    transition: 'fade',
    spriteX: 200,
    objects: [{
      type: 'wall-text',
      x: 200, y: 70, w: 780,
      text: "\"Technology is not neutral. We're inside of what we make, and it's inside of us. We're living in a world of connections -- and it matters which ones get made and unmade.\"",
      attr: '-- Donna Haraway'
    }],
    dialogue: "You find these words etched into the wall of a darkened room. They glow faintly. A reminder that our choices about technology are never neutral."
  },

  // ===== ACT 19: INSPIRATION =====

  { // 37 - Loveless
    id: 37,
    room: 'The Inspiration Gallery',
    template: 'gallery',
    transition: 'walk-right',
    spriteX: 160,
    objects: [{
      img: 'loveless.jpg',
      type: 'book-cover',
      x: 460, y: 10, w: 340, h: 400,
      label: 'How to Make Art at the End of the World'
    }],
    dialogue: "I turn to the two works that inspired this title. AI represents the end of a particular kind of world -- another fundamental change to the platforms of authorship that must be reckoned with. Natalie Loveless asks how we make art when that world is falling apart -- and argues that making IS the answer."
  },

  { // 38 - Carol Poster
    id: 38,
    room: 'The Inspiration Gallery',
    template: 'gallery',
    transition: 'wipe-right',
    spriteX: 160,
    objects: [{
      img: 'CarolPoster.jpg',
      type: 'wall-poster',
      x: 380, y: 6, w: 500, h: 400,
      label: 'Carol & the End of the World (Netflix)'
    }],
    dialogue: "And the Netflix show Carol and the End of the World. A story about finding meaning in the mundane when everything is about to end."
  },

  // ===== ACT 20: CAROL'S OFFICE =====

  { // 39 - Carol
    id: 39,
    room: "Carol's Office",
    template: 'office',
    transition: 'walk-right',
    spriteX: 100,
    objects: [{
      img: 'carol.webp',
      type: 'fullscreen',
      x: 260, y: 10, w: 680, h: 410,
      label: 'Carol'
    }],
    dialogue: "Carol works processing data towards no apparent end while finding joy in an Applebee's community even as the world crashes around her. She shows up. She does the work. She finds connection."
  },

  { // 40 - Pluribus
    id: 40,
    room: "Carol's Office",
    template: 'office',
    transition: 'iris',
    spriteX: 100,
    objects: [{
      img: 'pluribus.jpg',
      type: 'monitor-screen',
      x: 370, y: 20, w: 520, h: 360,
      label: 'E Pluribus Unum'
    }],
    dialogue: "Those of us who write are in a similar place -- facing another fundamental transformation of how authorship works, and who it serves. We show up. We make the work. We find each other. And that matters, even at the end of the world."
  },

  // ===== ACT 21: THANK YOU =====

  { // 41 - Thank You
    id: 41,
    room: 'The End',
    template: 'title',
    showSprite: false,
    transition: 'fade',
    objects: [{
      img: 'thankyou.png',
      type: 'wall-poster',
      x: 340, y: 20, w: 600, h: 360,
      label: ''
    }, {
      type: 'link-list',
      x: 340, y: 410, w: 600,
      links: [
        { text: 'anastasiasalter.net', url: 'https://anastasiasalter.net' },
        { text: 'distantcoding.ai', url: 'https://distantcoding.ai/' }
      ]
    }],
    dialogue: "Thank you for playing."
  }
];
