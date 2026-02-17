/* ============================================
   Autoplay Controller
   Timed auto-advance through all scenes
   12 minutes total, equal time per scene
   ============================================ */

const Autoplay = (() => {
  const TOTAL_MS = 12 * 60 * 1000; // 720,000ms
  let _playing = false;
  let _startTime = null;
  let _elapsed = 0;
  let _timer = null;
  let _retryTimer = null;
  let _button = null;
  let _autoAdvancing = false;

  let _badge = null;
  let _badgeTimer = null;

  function init() {
    _button = document.getElementById('autoplay-btn');
    _badge = document.getElementById('speedrun-badge');
    if (_button) {
      _button.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
      });
    }
  }

  function toggle() {
    if (_playing) pause();
    else play();
  }

  function showBadge() {
    if (!_badge) return;
    if (_badgeTimer) clearTimeout(_badgeTimer);
    _badge.classList.remove('hidden', 'show');
    // Force reflow so animation restarts
    void _badge.offsetWidth;
    _badge.classList.add('show');
    _badgeTimer = setTimeout(() => {
      _badge.classList.add('hidden');
      _badge.classList.remove('show');
    }, 3200);
  }

  function play() {
    const currentScene = Engine.getCurrentScene();
    const totalScenes = Engine.getSceneCount();

    // At last scene: restart from scene 0
    if (currentScene >= totalScenes - 1) {
      _playing = true;
      _elapsed = 0;
      _startTime = null;
      updateButton();
      Engine.goToScene(0);
      return;
    }

    // Title screen: skip straight to first content slide
    if (currentScene === 0) {
      _playing = true;
      _elapsed = 0;
      _startTime = null;
      updateButton();
      Engine.goToScene(1);
      // Show speed run badge over the UCF exterior
      setTimeout(() => showBadge(), 800);
      return;
    }

    _playing = true;
    updateButton();

    // Show badge on fresh play (not resume)
    if (_elapsed === 0) showBadge();

    const perScene = TOTAL_MS / totalScenes;

    if (_elapsed > 0) {
      // Resuming from pause
      _startTime = Date.now() - _elapsed;
    } else {
      // Fresh start -- anchor to current scene position
      _startTime = Date.now() - currentScene * perScene;
    }

    scheduleNext();
  }

  function pause() {
    _playing = false;
    if (_startTime !== null) {
      _elapsed = Date.now() - _startTime;
    }
    clearTimers();
    hideBadge();
    updateButton();
  }

  function stop() {
    _playing = false;
    _startTime = null;
    _elapsed = 0;
    clearTimers();
    hideBadge();
    updateButton();
  }

  function clearTimers() {
    if (_timer) { clearTimeout(_timer); _timer = null; }
    if (_retryTimer) { clearTimeout(_retryTimer); _retryTimer = null; }
    if (_badgeTimer) { clearTimeout(_badgeTimer); _badgeTimer = null; }
  }

  function hideBadge() {
    if (_badge) {
      _badge.classList.add('hidden');
      _badge.classList.remove('show');
    }
  }

  function scheduleNext() {
    if (!_playing) return;
    clearTimers();

    const currentScene = Engine.getCurrentScene();
    const totalScenes = Engine.getSceneCount();
    const perScene = TOTAL_MS / totalScenes;

    // Last scene reached -- stop
    if (currentScene >= totalScenes - 1) {
      stop();
      return;
    }

    const nextTime = (currentScene + 1) * perScene;
    const elapsed = Date.now() - _startTime;
    const delay = Math.max(100, nextTime - elapsed);

    _timer = setTimeout(() => advance(), delay);
  }

  function advance() {
    if (!_playing) return;

    // If a transition is in progress, retry shortly
    if (Transitions.isLocked()) {
      _retryTimer = setTimeout(() => advance(), 100);
      return;
    }

    _autoAdvancing = true;
    Engine.nextScene();
    _autoAdvancing = false;
  }

  /** Called by Engine after any scene navigation. */
  function onSceneChange(newIndex) {
    if (!_playing) return;

    if (!_autoAdvancing) {
      // Manual navigation while playing -- re-anchor timing
      const perScene = TOTAL_MS / Engine.getSceneCount();
      _startTime = Date.now() - newIndex * perScene;
    }

    scheduleNext();
  }

  function updateButton() {
    if (!_button) return;
    _button.textContent = _playing ? 'Pause' : 'Play';
    _button.classList.toggle('playing', _playing);
  }

  function isPlaying() {
    return _playing;
  }

  return { init, toggle, onSceneChange, isPlaying };
})();
