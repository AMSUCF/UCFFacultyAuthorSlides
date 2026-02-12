/* ============================================
   Core Engine
   Scene state, keyboard navigation, scaling,
   room builder, verb bar flash
   ============================================ */

const Engine = (() => {
  let _currentScene = -1;
  let _elements = {};
  let _debugMode = false;

  function init() {
    // Cache DOM elements
    _elements = {
      game: document.getElementById('game'),
      viewport: document.getElementById('viewport'),
      room: document.getElementById('room'),
      objects: document.getElementById('objects'),
      roomBar: document.getElementById('room-bar'),
      dialogue: document.getElementById('dialogue-text'),
      verbBar: document.getElementById('verb-bar'),
      overlay: document.getElementById('transition-overlay'),
      sprite: document.getElementById('sprite'),
      preloader: document.getElementById('preloader'),
      progressBar: document.getElementById('progress-bar-inner'),
      preloaderStatus: document.getElementById('preloader-status'),
      titleScreen: document.getElementById('title-screen'),
      sceneCounter: document.getElementById('scene-counter'),
    };

    // Init subsystems
    Typewriter.init(_elements.dialogue);
    Sprite.init(_elements.sprite);
    Transitions.init(_elements.overlay, _elements.viewport);
    Autoplay.init();

    // Responsive scaling
    handleResize();
    window.addEventListener('resize', handleResize);

    // Start preloading
    startPreload();
  }

  // --- Responsive Scaling ---
  function handleResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scale = Math.min(w / 1280, h / 720);
    const game = _elements.game;
    game.style.transform = `scale(${scale})`;
    game.style.left = ((w - 1280 * scale) / 2) + 'px';
    game.style.top = ((h - 720 * scale) / 2) + 'px';
  }

  // --- Preloader ---
  function startPreload() {
    Preloader.loadAll(SCENES, (loaded, total) => {
      if (total === 0) return;
      const pct = Math.round((loaded / total) * 100);
      _elements.progressBar.style.width = pct + '%';
      _elements.preloaderStatus.textContent = `Loading assets... ${loaded}/${total}`;
    }).then(() => {
      _elements.preloaderStatus.textContent = 'Press any key to begin';
      waitForFirstKey();
    });
  }

  function waitForFirstKey() {
    function onKey(e) {
      document.removeEventListener('keydown', onKey);
      _elements.preloader.classList.add('hidden');
      goToScene(0);
      // Bind navigation after first scene
      setTimeout(() => bindKeys(), 100);
    }
    document.addEventListener('keydown', onKey);
  }

  // --- Keyboard Navigation ---
  function bindKeys() {
    document.addEventListener('keydown', (e) => {
      if (Transitions.isLocked()) return;

      // Title screen: any key advances
      if (_currentScene === 0) {
        if (e.key === 'd' || e.key === 'D') {
          toggleDebug();
          return;
        }
        goToScene(1);
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          nextScene();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevScene();
          break;
        case 'd':
        case 'D':
          toggleDebug();
          break;
        case 'Home':
          e.preventDefault();
          goToScene(0);
          break;
        case 'End':
          e.preventDefault();
          goToScene(SCENES.length - 1);
          break;
      }
    });
  }

  function nextScene() {
    if (_currentScene < SCENES.length - 1) {
      goToScene(_currentScene + 1);
    }
  }

  function prevScene() {
    if (_currentScene > 0) {
      goToScene(_currentScene - 1);
    }
  }

  function toggleDebug() {
    _debugMode = !_debugMode;
    _elements.sceneCounter.classList.toggle('visible', _debugMode);
  }

  // --- Scene Navigation ---
  async function goToScene(index) {
    if (index < 0 || index >= SCENES.length) return;
    if (Transitions.isLocked()) return;

    const scene = SCENES[index];
    const prevIndex = _currentScene;
    const goingForward = index > prevIndex;

    // Determine transition type
    let transType = scene.transition || 'iris';
    if (prevIndex === -1) transType = 'none'; // first load
    // For backward navigation, always use iris (simpler)
    if (!goingForward && prevIndex !== -1) transType = 'iris';

    // Determine direction for walk transitions
    let direction = goingForward ? 'right' : 'left';
    if (transType === 'walk-left') direction = 'left';
    else if (transType === 'walk-right') direction = 'right';

    _currentScene = index;

    // Update debug counter
    _elements.sceneCounter.textContent = `Scene ${index}/${SCENES.length - 1}`;

    // Notify autoplay of scene change
    if (typeof Autoplay !== 'undefined') Autoplay.onSceneChange(index);

    await Transitions.run(transType, () => buildScene(scene), {
      spriteX: scene.spriteX || 200,
      showSprite: scene.showSprite !== false && scene.template !== 'title',
      direction: direction,
    });

    // Flash "Look at" verb
    flashVerb();

    // Animate objects appearing
    staggerObjects();

    // Typewriter dialogue
    await Typewriter.type(scene.dialogue, scene.typewriterSpeed || 25);
  }

  // --- Room Building ---
  function buildScene(scene) {
    const room = _elements.room;
    const objects = _elements.objects;

    // Clear previous
    room.className = '';
    room.innerHTML = '';
    objects.innerHTML = '';
    Typewriter.clear();

    // Hide/show title screen
    if (scene.title) {
      _elements.titleScreen.classList.remove('hidden');
    } else {
      _elements.titleScreen.classList.add('hidden');
    }

    // Set room template
    const templateClass = 'room-' + scene.template;
    room.classList.add(templateClass);

    // Apply palette variation
    if (scene.palette) {
      room.classList.add(scene.palette);
    }

    // Room background element
    const bg = document.createElement('div');
    bg.className = 'room-bg';
    room.appendChild(bg);

    // Template-specific overlays
    if (scene.template === 'dark-room' || scene.template === 'ruins') {
      const fog = document.createElement('div');
      fog.className = 'fog-overlay';
      room.appendChild(fog);

      const fire = document.createElement('div');
      fire.className = 'fire-overlay';
      room.appendChild(fire);
    }

    if (scene.template === 'title' || scene.template === 'exterior') {
      const stars = document.createElement('div');
      stars.className = 'star-field';
      room.appendChild(stars);
    }

    if (scene.template === 'title') {
      const cityscape = document.createElement('div');
      cityscape.className = 'cityscape';
      room.appendChild(cityscape);
    }

    // Room name bar
    _elements.roomBar.textContent = scene.room || '';

    // Build objects
    if (scene.objects) {
      scene.objects.forEach((obj, i) => {
        const el = createObject(obj, i);
        objects.appendChild(el);
      });
    }

    // Sprite visibility
    if (scene.showSprite === false || scene.template === 'title') {
      Sprite.hide();
    }
  }

  function createObject(obj, index) {
    const wrapper = document.createElement('div');
    wrapper.className = 'scene-object obj-' + (obj.type || 'wall-poster');
    wrapper.style.left = (obj.x || 0) + 'px';
    wrapper.style.top = (obj.y || 0) + 'px';
    if (obj.w) wrapper.style.width = obj.w + 'px';
    if (obj.h && obj.type !== 'fullscreen') wrapper.style.height = obj.h + 'px';

    // Stagger index stored as data attribute, applied via JS setTimeout
    wrapper.dataset.index = index;

    if (obj.type === 'wall-text') {
      // Text-only object
      const textEl = document.createElement('div');
      textEl.className = 'wall-text-content';
      textEl.textContent = obj.text || '';
      wrapper.appendChild(textEl);

      if (obj.attr) {
        const attrEl = document.createElement('span');
        attrEl.className = 'quote-attr';
        attrEl.textContent = obj.attr;
        wrapper.appendChild(attrEl);
      }
    } else if (obj.links) {
      obj.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.text;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'scene-link';
        wrapper.appendChild(a);
      });
    } else if (obj.img) {
      const img = document.createElement('img');
      img.src = obj.img;
      img.alt = obj.label || '';
      if (obj.w) img.style.width = '100%';
      if (obj.h && obj.type !== 'fullscreen') img.style.height = '100%';
      if (obj.type === 'fullscreen') {
        img.style.width = obj.w + 'px';
        img.style.height = obj.h + 'px';
      }
      img.style.objectFit = 'contain';
      wrapper.appendChild(img);
    }

    // Label
    if (obj.label) {
      const label = document.createElement('div');
      label.className = 'object-label';
      label.textContent = obj.label;
      wrapper.appendChild(label);
    }

    return wrapper;
  }

  // --- Object stagger animation ---
  function staggerObjects() {
    const objs = _elements.objects.querySelectorAll('.scene-object');
    objs.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 200 + i * 400);
    });
  }

  // --- Verb bar flash ---
  function flashVerb() {
    const verbs = _elements.verbBar.querySelectorAll('.verb');
    verbs.forEach(v => v.classList.remove('active'));

    // Flash "Look at"
    const lookAt = _elements.verbBar.querySelector('[data-verb="look"]');
    if (lookAt) {
      lookAt.classList.add('active');
      setTimeout(() => lookAt.classList.remove('active'), 1500);
    }
  }

  function getCurrentScene() {
    return _currentScene;
  }

  function getSceneCount() {
    return SCENES.length;
  }

  return { init, nextScene, goToScene, getCurrentScene, getSceneCount };
})();

// Boot
document.addEventListener('DOMContentLoaded', Engine.init);
