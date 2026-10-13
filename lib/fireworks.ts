export type Spark = { x: number; y: number; vx: number; vy: number; life: number; decay: number; color: string; size: number; trail: boolean };
export type Ring = { x: number; y: number; r: number; life: number; color: string };

const PALETTE = ["#7c5cff", "#22d3ee", "#f472b6", "#fbbf24", "#34d399", "#ffffff", "#fb7185"];
const pick = () => PALETTE[Math.floor(Math.random() * PALETTE.length)];

export function makeBurst(x: number, y: number) {
  const main = pick();
  const second = pick();
  const rings: Ring[] = [{ x, y, r: 4, life: 1, color: main }];
  const sparks: Spark[] = [];
  const n = 46;
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n + Math.random() * 0.2;
    const sp = 3 + Math.random() * 5.5;
    sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: 0.012 + Math.random() * 0.012, color: i % 3 ? main : second, size: 1.6 + Math.random() * 1.8, trail: true });
  }
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = Math.random() * 3.5;
    sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1, life: 1, decay: 0.01 + Math.random() * 0.01, color: pick(), size: 1 + Math.random() * 1.4, trail: false });
  }
  return { sparks, rings };
}

export function drawFrame(ctx: CanvasRenderingContext2D, w: number, h: number, sparks: Spark[], rings: Ring[]) {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";

  const liveRings = rings.filter((r) => r.life > 0);
  for (const r of liveRings) {
    r.r += 4.5;
    r.life -= 0.045;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
    ctx.strokeStyle = r.color;
    ctx.globalAlpha = Math.max(r.life, 0) * 0.7;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const liveSparks = sparks.filter((s) => s.life > 0);
  for (const s of liveSparks) {
    const px = s.x, py = s.y;
    s.vx *= 0.975;
    s.vy = s.vy * 0.975 + 0.09;
    s.x += s.vx;
    s.y += s.vy;
    s.life -= s.decay;
    ctx.globalAlpha = Math.max(s.life, 0);
    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    ctx.beginPath();
    if (s.trail) {
      ctx.lineWidth = s.size;
      ctx.lineCap = "round";
      ctx.moveTo(px, py);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
    } else {
      ctx.arc(s.x, s.y, s.size * (0.6 + Math.random() * 0.8), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  return { sparks: liveSparks, rings: liveRings };
}