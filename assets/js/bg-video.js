// Universal Tech Background & Video Fallback Handler
(function () {
  // Initialize tech background canvas if present
  const canvas = document.getElementById('net');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, nodes;
    const COUNT = 60;
    const LINK_DIST = 140;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function init() {
      resize();
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 1.5 + 1
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(76, 227, 255, ${0.35 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = '#9fe8ff';
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(frame);
    }

    init();
    window.addEventListener('resize', init);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) requestAnimationFrame(frame);
    else frame();
  }

  // Video fallback if any video is still present
  const video = document.querySelector('.bg-video');
  if (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.play().catch(() => {});
  }
})();
