export type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; tw: number };
export type Star = { x: number; y: number; vx: number; vy: number; life: number };
export type Mouse = { x: number; y: number };

const COLORS = ["167,139,250", "34,211,238", "244,114,182", "129,140,248"];

export function makeParticles(w: number, h: number, full: boolean): P[] {
  const count = full
    ? Math.min(Math.floor((w * h) / 9500), 170)
    : Math.min(Math.floor((w * h) / 16000), 60);
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.7,
    vy: (Math.random() - 0.5) * 0.7,
    r: Math.random() * 2.2 + 0.6,
    c: COLORS[Math.floor(Math.random() * COLORS.length)],
    tw: Math.random() * Math.PI * 2,
  }));
}

export function drawParticles(
  ctx: CanvasRenderingContext2D, ps: P[], t: number, m: Mouse, full: boolean, w: number, h: number
) {
  const LINK = full ? 150 : 110;
  const L2 = LINK * LINK;
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i];
    p.x += p.vx + Math.sin(t + p.tw) * 0.15;
    p.y += p.vy + Math.cos(t * 0.8 + p.tw) * 0.15;
    if (p.x < -10) p.x = w + 10;
    if (p.x > w + 10) p.x = -10;
    if (p.y < -10) p.y = h + 10;
    if (p.y > h + 10) p.y = -10;

    const dx = p.x - m.x, dy = p.y - m.y;
    const d2 = dx * dx + dy * dy;
    const d = d2 < 220 * 220 ? Math.sqrt(d2) : 999;
    if (d < 170 && d > 0) {
      const f = (1 - d / 170) * 3;
      p.x += (dx / d) * f;
      p.y += (dy / d) * f;
    }

    const pulse = 0.55 + Math.sin(t * 2 + p.tw) * 0.35;
    if (full) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, `rgba(${p.c},${0.35 * pulse})`);
      g.addColorStop(1, `rgba(${p.c},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},${0.5 + pulse * 0.5})`;
    ctx.fill();

    for (let j = i + 1; j < ps.length; j++) {
      const q = ps[j];
      const ex = p.x - q.x, ey = p.y - q.y;
      const e2 = ex * ex + ey * ey;
      if (e2 < L2) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(${p.c},${(1 - Math.sqrt(e2) / LINK) * 0.32})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    if (full && d < 220) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(m.x, m.y);
      ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 220) * 0.6})`;
      ctx.lineWidth = 0.9;
      ctx.stroke();
    }
  }
}

export function drawStars(ctx: CanvasRenderingContext2D, stars: Star[], w: number, h: number): Star[] {
  if (Math.random() < 0.012) {
    const left = Math.random() > 0.5;
    stars.push({
      x: left ? Math.random() * w * 0.6 : w * (0.4 + Math.random() * 0.6),
      y: Math.random() * h * 0.5,
      vx: (left ? 1 : -1) * (7 + Math.random() * 6),
      vy: 3 + Math.random() * 4,
      life: 1,
    });
  }
  const live = stars.filter((s) => s.life > 0);
  for (const s of live) {
    s.x += s.vx;
    s.y += s.vy;
    s.life -= 0.012;
    const tail = 14;
    const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * tail, s.y - s.vy * tail);
    g.addColorStop(0, `rgba(255,255,255,${s.life})`);
    g.addColorStop(1, "rgba(124,92,255,0)");
    ctx.strokeStyle = g;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail);
    ctx.stroke();
  }
  return live;
}