/* ============================================
   Transition Orchestrator
   Sequences animations + DOM swaps between scenes
   ============================================ */

const Transitions = (() => {
  let _overlay = null;
  let _viewport = null;
  let _locked = false;

  function init(overlay, viewport) {
    _overlay = overlay;
    _viewport = viewport;
  }

  function isLocked() {
    return _locked;
  }

  /**
   * Run a full scene transition.
   * @param {string} type - 'iris', 'diamond', 'wipe-right', 'wipe-left', 'wipe-down',
   *                        'fade', 'fade-slow', 'walk-right', 'walk-left', 'none'
   * @param {Function} swapFn - called during black screen to swap room DOM
   * @param {object} opts - { spriteX, showSprite, direction }
   * @returns {Promise}
   */
  async function run(type, swapFn, opts = {}) {
    if (_locked) return;
    _locked = true;

    const showSprite = opts.showSprite !== false;
    const spriteX = opts.spriteX || 200;
    const direction = opts.direction || 'right';

    try {
      switch (type) {
        case 'none':
          await swapFn();
          if (showSprite) Sprite.place(spriteX);
          break;
        case 'walk-right':
        case 'walk-left':
          await doWalkTransition(direction, swapFn, spriteX, showSprite);
          break;
        case 'iris':
          await doIrisTransition(swapFn, spriteX, showSprite);
          break;
        case 'diamond':
          await doDiamondTransition(swapFn, spriteX, showSprite);
          break;
        case 'wipe-right':
          await doWipeTransition('right', swapFn, spriteX, showSprite);
          break;
        case 'wipe-left':
          await doWipeTransition('left', swapFn, spriteX, showSprite);
          break;
        case 'wipe-down':
          await doWipeTransition('down', swapFn, spriteX, showSprite);
          break;
        case 'fade':
          await doFadeTransition('fade', swapFn, spriteX, showSprite);
          break;
        case 'fade-slow':
          await doFadeTransition('fade-slow', swapFn, spriteX, showSprite);
          break;
        default:
          await swapFn();
          if (showSprite) Sprite.place(spriteX);
          break;
      }
    } finally {
      _locked = false;
    }
  }

  // --- Iris wipe (viewport-based) ---
  async function doIrisTransition(swapFn, spriteX, showSprite) {
    const pctX = getSpritePercentX();
    const pctY = '70%';

    _viewport.style.setProperty('--iris-x', pctX);
    _viewport.style.setProperty('--iris-y', pctY);

    // Close: scene shrinks to dot
    _viewport.classList.add('iris-closing');
    await wait(820);

    // Hold viewport hidden while swapping
    _viewport.classList.remove('iris-closing');
    _viewport.style.clipPath = 'circle(0% at ' + pctX + ' ' + pctY + ')';

    await swapFn();
    if (showSprite) Sprite.place(spriteX);
    else Sprite.hide();
    await wait(50);

    // Open: scene grows from dot
    _viewport.style.setProperty('--iris-x', pctX);
    _viewport.style.setProperty('--iris-y', pctY);
    _viewport.classList.add('iris-opening');
    _viewport.style.clipPath = '';

    await wait(820);
    _viewport.classList.remove('iris-opening');
  }

  // --- Diamond wipe (viewport-based) ---
  async function doDiamondTransition(swapFn, spriteX, showSprite) {
    // Close: diamond shrinks to point
    _viewport.classList.add('diamond-closing');
    await wait(820);

    // Hold viewport hidden
    _viewport.classList.remove('diamond-closing');
    _viewport.style.clipPath = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';

    await swapFn();
    if (showSprite) Sprite.place(spriteX);
    else Sprite.hide();
    await wait(50);

    // Open: diamond grows from point
    _viewport.classList.add('diamond-opening');
    _viewport.style.clipPath = '';

    await wait(820);
    _viewport.classList.remove('diamond-opening');
  }

  // --- Wipe transitions (overlay-based) ---
  async function doWipeTransition(dir, swapFn, spriteX, showSprite) {
    // Close: black covers screen
    _overlay.className = 'wipe-' + dir + '-close';
    await wait(420);

    // Hold black while swapping
    _overlay.className = '';
    _overlay.style.background = '#000';

    await swapFn();
    if (showSprite) Sprite.place(spriteX);
    else Sprite.hide();
    await wait(50);

    // Open: black recedes to reveal new scene
    _overlay.className = 'wipe-' + dir + '-open';
    _overlay.style.background = '';
    await wait(420);
    _overlay.className = '';
  }

  // --- Fade ---
  async function doFadeTransition(type, swapFn, spriteX, showSprite) {
    const isSlow = type === 'fade-slow';
    const duration = isSlow ? 1200 : 600;
    const outClass = isSlow ? 'fade-slow-out' : 'fade-out';
    const inClass = isSlow ? 'fade-slow-in' : 'fade-in';

    _overlay.className = outClass;
    await wait(duration + 50);

    await swapFn();
    if (showSprite) Sprite.place(spriteX);
    else Sprite.hide();
    await wait(100);

    _overlay.className = inClass;
    await wait(duration + 50);
    _overlay.className = '';
  }

  // --- Walk (character walks + wipe) ---
  async function doWalkTransition(direction, swapFn, spriteX, showSprite) {
    const exitDir = direction === 'right' ? 'right' : 'left';
    const enterDir = direction === 'right' ? 'left' : 'right';
    const wipeDir = direction;

    // Character walks to edge
    await Sprite.walkOut(exitDir);

    // Wipe overlay closes in walk direction
    _overlay.className = 'wipe-' + wipeDir + '-close';
    await wait(420);

    // Hold black while swapping
    _overlay.className = '';
    _overlay.style.background = '#000';
    await swapFn();
    await wait(50);

    // Wipe overlay opens
    _overlay.className = 'wipe-' + wipeDir + '-open';
    _overlay.style.background = '';
    await wait(420);
    _overlay.className = '';

    // Character walks in from opposite side
    if (showSprite) {
      Sprite.show();
      await Sprite.walkIn(enterDir, spriteX);
    } else {
      Sprite.hide();
    }
  }

  function getSpritePercentX() {
    const spriteEl = document.getElementById('sprite');
    const rawX = spriteEl ? (parseInt(spriteEl.style.left) || 200) + 28 : 640;
    const vpW = _viewport ? _viewport.offsetWidth : 1280;
    return ((rawX / vpW) * 100).toFixed(1) + '%';
  }

  function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  return { init, run, isLocked };
})();
