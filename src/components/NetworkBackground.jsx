import { useEffect, useRef } from 'react';
import './components.css';

export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Coordenadas e estado do ponteiro (Mouse ou Touch)
    const pointer = {
      x: null,
      y: null,
      active: false,
      isTouch: false,
      radius: 150,
    };

    let particles = [];
    let bursts = [];
    let ripples = [];

    // Classe para cada ponto (partícula da rede)
    class Particle {
      constructor(x, y, isBurst = false, burstAngle = 0, burstSpeed = 0) {
        this.x = x;
        this.y = y;
        this.isBurst = isBurst;

        if (isBurst) {
          this.vx = Math.cos(burstAngle) * burstSpeed;
          this.vy = Math.sin(burstAngle) * burstSpeed;
          this.baseRadius = 1.8 + Math.random() * 1.5;
          this.life = 1.0;
          this.decay = 0.015 + Math.random() * 0.012;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.3 + Math.random() * 0.5;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.baseRadius = 1.8 + Math.random() * 1.6;
          this.pulseAngle = Math.random() * Math.PI * 2;
          this.pulseSpeed = 0.02 + Math.random() * 0.025;
        }

        this.radius = this.baseRadius;
        this.colorType = Math.random() > 0.35 ? 1 : 2;
      }

      update() {
        if (this.isBurst) {
          this.life -= this.decay;
          this.x += this.vx;
          this.y += this.vy;
          this.vx *= 0.95;
          this.vy *= 0.95;
          return this.life > 0;
        }

        // Pulsação suave do raio do ponto
        this.pulseAngle += this.pulseSpeed;
        this.radius = this.baseRadius + Math.sin(this.pulseAngle) * 0.4;

        // Efeito de repulsão suave com o cursor ou toque
        if (pointer.active && pointer.x !== null && pointer.y !== null) {
          const dx = pointer.x - this.x;
          const dy = pointer.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < pointer.radius && dist > 0) {
            const force = (1 - dist / pointer.radius);
            const repel = pointer.isTouch ? 3.5 : 2.5;
            this.x -= (dx / dist) * force * repel;
            this.y -= (dy / dist) * force * repel;
          }
        }

        // Movimento ambiente constante
        this.x += this.vx;
        this.y += this.vy;

        // Rebater nas bordas da tela
        if (this.x < 0) {
          this.x = 0;
          this.vx *= -1;
        } else if (this.x > width) {
          this.x = width;
          this.vx *= -1;
        }

        if (this.y < 0) {
          this.y = 0;
          this.vy *= -1;
        } else if (this.y > height) {
          this.y = height;
          this.vy *= -1;
        }

        return true;
      }

      draw() {
        let alpha = 0.65;
        if (this.isBurst) {
          alpha = Math.max(0, this.life * 0.7);
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (this.colorType === 1) {
          ctx.fillStyle = `rgba(10, 37, 64, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(35, 75, 120, ${alpha})`;
        }
        ctx.fill();
      }
    }

    // Efeito de onda / choque ao clicar ou tocar na tela
    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 4;
        this.maxRadius = Math.min(width, height) * 0.12 + 60;
        this.speed = 3.2;
        this.alpha = 0.45;
      }

      update() {
        this.radius += this.speed;
        this.alpha = Math.max(0, 0.45 * (1 - this.radius / this.maxRadius));
        return this.radius < this.maxRadius && this.alpha > 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(10, 37, 64, ${this.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // Criação de novos nós e onda expansiva ao interagir
    const createBurst = (x, y, isTouch = false) => {
      ripples.push(new Ripple(x, y));
      const count = isTouch ? 7 : 5;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5 - 0.25);
        const speed = 1.8 + Math.random() * 2.2;
        bursts.push(new Particle(x, y, true, angle, speed));
      }
    };

    // Ajuste responsivo e suporte a telas Retina / High-DPI
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const isMobile = width < 768;
      const targetCount = isMobile
        ? Math.max(30, Math.min(50, Math.floor((width * height) / 18000)))
        : Math.max(55, Math.min(95, Math.floor((width * height) / 14000)));

      pointer.radius = isMobile ? 120 : 160;

      if (particles.length === 0) {
        for (let i = 0; i < targetCount; i++) {
          particles.push(new Particle(Math.random() * width, Math.random() * height));
        }
      } else if (particles.length < targetCount) {
        while (particles.length < targetCount) {
          particles.push(new Particle(Math.random() * width, Math.random() * height));
        }
      } else if (particles.length > targetCount) {
        particles.length = targetCount;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Eventos Desktop (Mouse)
    const handleMouseMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      pointer.isTouch = false;
    };

    const handleMouseLeave = () => {
      pointer.active = false;
      pointer.x = null;
      pointer.y = null;
    };

    const handleClick = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      pointer.isTouch = false;
      createBurst(e.clientX, e.clientY, false);
    };

    // Eventos Mobile (Toque com o dedo)
    let touchTimeout;
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        clearTimeout(touchTimeout);
        const touch = e.touches[0];
        pointer.x = touch.clientX;
        pointer.y = touch.clientY;
        pointer.active = true;
        pointer.isTouch = true;
        createBurst(touch.clientX, touch.clientY, true);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        pointer.x = touch.clientX;
        pointer.y = touch.clientY;
        pointer.active = true;
        pointer.isTouch = true;
      }
    };

    const handleTouchEnd = () => {
      touchTimeout = setTimeout(() => {
        pointer.active = false;
        pointer.x = null;
        pointer.y = null;
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Loop de Animação 60fps
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Atualiza e desenha ondas de impacto
      ripples = ripples.filter((ripple) => {
        const alive = ripple.update();
        if (alive) ripple.draw(ctx);
        return alive;
      });

      // Atualiza partículas
      particles.forEach((p) => p.update());
      bursts = bursts.filter((p) => p.update());

      const allParticles = [...particles, ...bursts];
      const isMobile = width < 768;
      const maxDist = isMobile ? 105 : 135;
      const maxDistSq = maxDist * maxDist;

      // Desenha as linhas interligando os pontos da rede
      for (let i = 0; i < allParticles.length; i++) {
        const p1 = allParticles[i];
        for (let j = i + 1; j < allParticles.length; j++) {
          const p2 = allParticles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            let alpha = (1 - dist / maxDist) * 0.22;
            if (p1.isBurst || p2.isBurst) {
              const burstLife = Math.min(p1.life || 1, p2.life || 1);
              alpha *= burstLife;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(10, 37, 64, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Conecta linhas ao cursor ou ponto de toque
        if (pointer.active && pointer.x !== null && pointer.y !== null) {
          const dx = pointer.x - p1.x;
          const dy = pointer.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const pointerRadiusSq = pointer.radius * pointer.radius;

          if (distSq < pointerRadiusSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / pointer.radius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(10, 37, 64, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      // Desenha cada ponto
      allParticles.forEach((p) => p.draw());

      // Aura e ponto central sob o cursor/toque
      if (pointer.active && pointer.x !== null && pointer.y !== null) {
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(10, 37, 64, 0.7)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(10, 37, 64, 0.12)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(touchTimeout);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="network-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="network-canvas" />
    </div>
  );
}
