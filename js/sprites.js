/* ============================================
   Character Sprite Controller
   CSS pixel-art professor walk animation
   ============================================ */

const Sprite = (() => {
  let _el = null;
  let _frame = 'idle';
  let _walkInterval = null;
  let _visible = true;

  function init(el) {
    _el = el;
    setFrame('idle');
  }

  function setFrame(frame) {
    _frame = frame;
    // Only remove frame classes, preserve flip/walking/hidden
    _el.classList.remove('frame-idle', 'frame-walk1', 'frame-walk2');
    _el.classList.add('frame-' + frame);
  }

  function show(x) {
    _visible = true;
    _el.classList.remove('hidden');
    if (typeof x === 'number') {
      _el.style.left = x + 'px';
    }
    setFrame('idle');
  }

  function hide() {
    _visible = false;
    _el.classList.add('hidden');
    if (_walkInterval) {
      clearInterval(_walkInterval);
      _walkInterval = null;
    }
  }

  /** Start walk animation (toggling frames). */
  function startWalk() {
    let toggle = false;
    stopWalk();
    _walkInterval = setInterval(() => {
      toggle = !toggle;
      setFrame(toggle ? 'walk1' : 'walk2');
    }, 200);
  }

  function stopWalk() {
    if (_walkInterval) {
      clearInterval(_walkInterval);
      _walkInterval = null;
    }
    if (_visible) setFrame('idle');
  }

  /** Animate walking to edge, returns promise. Direction: 'right' or 'left'. */
  function walkOut(direction) {
    return new Promise((resolve) => {
      startWalk();
      _el.classList.add('walking');
      if (direction === 'left') {
        _el.classList.add('flip');
      } else {
        _el.classList.remove('flip');
      }
      const target = direction === 'right' ? 1300 : -80;
      _el.style.left = target + 'px';

      // Wait for CSS transition to complete
      setTimeout(() => {
        stopWalk();
        _el.classList.remove('walking');
        resolve();
      }, 620);
    });
  }

  /** Animate walking in from edge, returns promise. */
  function walkIn(fromDirection, targetX) {
    return new Promise((resolve) => {
      // Start off-screen
      _el.style.transition = 'none';
      _el.style.left = (fromDirection === 'left' ? -80 : 1300) + 'px';
      if (fromDirection === 'right') {
        _el.classList.add('flip');
      } else {
        _el.classList.remove('flip');
      }

      // Force reflow
      void _el.offsetWidth;

      // Animate to target
      _el.style.transition = '';
      startWalk();
      _el.classList.add('walking');
      _el.style.left = targetX + 'px';

      setTimeout(() => {
        stopWalk();
        _el.classList.remove('walking', 'flip');
        resolve();
      }, 620);
    });
  }

  /** Place sprite instantly at position (no animation). */
  function place(x) {
    _visible = true;
    _el.classList.remove('hidden', 'flip', 'walking');
    _el.style.transition = 'none';
    _el.style.left = x + 'px';
    void _el.offsetWidth;
    _el.style.transition = '';
    setFrame('idle');
  }

  return { init, show, hide, startWalk, stopWalk, walkOut, walkIn, place, setFrame };
})();
