/* ============================================
   Typewriter Text Effect
   Characters appear one at a time in dialogue bar
   ============================================ */

const Typewriter = (() => {
  let _el = null;
  let _timeout = null;
  let _resolve = null;
  let _speed = 25; // ms per character

  function init(el) {
    _el = el;
  }

  /** Type text into the dialogue element. Returns a promise that resolves when done. */
  function type(text, speed) {
    return new Promise((resolve) => {
      cancel();
      _resolve = resolve;
      _speed = speed || 25;
      _el.textContent = '';
      _el.classList.remove('done');

      if (!text) {
        _el.classList.add('done');
        resolve();
        return;
      }

      let i = 0;
      function tick() {
        if (i < text.length) {
          _el.textContent += text[i];
          i++;
          _timeout = setTimeout(tick, _speed);
        } else {
          _el.classList.add('done');
          _resolve = null;
          resolve();
        }
      }
      tick();
    });
  }

  /** Instantly complete current typing. */
  function complete() {
    // Not used during presentation, but useful for testing
  }

  /** Cancel any in-progress typing. */
  function cancel() {
    if (_timeout) {
      clearTimeout(_timeout);
      _timeout = null;
    }
    if (_resolve) {
      _resolve();
      _resolve = null;
    }
    if (_el) {
      _el.classList.add('done');
    }
  }

  /** Clear text immediately. */
  function clear() {
    cancel();
    if (_el) {
      _el.textContent = '';
      _el.classList.add('done');
    }
  }

  return { init, type, cancel, clear, complete };
})();
