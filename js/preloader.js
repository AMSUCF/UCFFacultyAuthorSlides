/* ============================================
   Image Preloader
   Loads all scene images with pixel-art progress bar
   ============================================ */

const Preloader = (() => {
  /**
   * Preload all images from scene data.
   * @param {Array} scenes - SCENES array
   * @param {Function} onProgress - called with (loaded, total)
   * @returns {Promise} resolves when all loaded
   */
  function loadAll(scenes, onProgress) {
    // Collect unique image paths
    const images = new Set();
    for (const scene of scenes) {
      if (!scene.objects) continue;
      for (const obj of scene.objects) {
        if (obj.img) images.add(obj.img);
      }
    }

    const imgList = [...images];
    const total = imgList.length;

    if (total === 0) {
      onProgress(0, 0);
      return Promise.resolve();
    }

    let loaded = 0;

    return new Promise((resolve) => {
      imgList.forEach((src) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          onProgress(loaded, total);
          if (loaded >= total) resolve();
        };
        img.src = src;
      });
    });
  }

  return { loadAll };
})();
