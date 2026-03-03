const lens = document.getElementById('distortion-lens');
    const disp = document.querySelector('feDisplacementMap');
        
    const canvas = document.getElementById("waterSplash");
    const ctx = canvas.getContext("2d");
        
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    
    let distortionActive = false;
    let lensScale = 0;
    let lensAlpha = 0;
    let particles = [];
    
    // ----------------- WATER DROP -----------------
    class Drop {
      constructor(x, y) {
        this.x = x;
        this.y = y;
    
        const angle = Math.random() * Math.PI * 2;
        const force = Math.random() * 8 + 3;
    
        this.vx = Math.cos(angle) * force;
        this.vy = Math.sin(angle) * force - 4;
    
        this.alpha = 1;
        this.gravity = 0.25;
      }
  
      update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
      }
  
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    
    // ----------------- ANIMATION LOOP -----------------
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      // Distortion
      if (distortionActive) {
        let currentScale = parseFloat(disp.getAttribute('scale'));
        if (currentScale > 0.5) {
          disp.setAttribute('scale', currentScale * 0.9);
          lensScale += 0.05;
          lensAlpha *= 0.94;
          lens.style.transform = `translate(-50%, -50%) scale(${lensScale})`;
          lens.style.opacity = lensAlpha;
        } else {
          distortionActive = false;
          lens.style.opacity = 0;
        }
      }
  
      // Splash
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      });
  
      requestAnimationFrame(animate);
    }
    animate();
    
    // ----------------- CLICK EVENT -----------------
    window.addEventListener('click', (e) => {
      const x = e.clientX;
      const y = e.clientY;
    
      // Distortion trigger
      distortionActive = true;
      lensScale = 0.4;
      lensAlpha = 1;
      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      disp.setAttribute('scale', '60');
    
      // Splash trigger
      for (let i = 0; i < 25; i++) {
        particles.push(new Drop(x, y));
      }
    });