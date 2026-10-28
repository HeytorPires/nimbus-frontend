import { useEffect, useRef } from "react";

const ENV_KEYS = [
  "DATABASE_URL",
  "API_KEY",
  "JWT_SECRET",
  "REDIS_URL",
  "SMTP_PASS",
  "S3_BUCKET",
  "STRIPE_KEY",
  "NODE_ENV",
  "PORT",
  "SECRET_KEY",
];

interface Puff {
  dx: number;
  dy: number;
  r: number;
}

interface Cloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
  push: number;
  puffs: Puff[];
}

interface Drop {
  x: number;
  y: number;
  speed: number;
  size: number;
  text: string;
}

interface CloudSkyProps {
  /** Clouds start raining environment variable names. */
  raining?: boolean;
  /**
   * Palette of the surface behind the clouds: "auto" follows the theme,
   * "inverse" is the opposite of the theme (for foreground-colored surfaces).
   */
  tone?: "auto" | "inverse" | "light" | "dark";
  className?: string;
}

const makeCloud = (w: number, h: number): Cloud => ({
  x: Math.random() * w,
  y: Math.random() * h * 0.6,
  scale: 0.5 + Math.random() * 1.1,
  speed: 0.06 + Math.random() * 0.2,
  push: 0,
  puffs: Array.from({ length: 7 }, (_, i) => ({
    dx: (i - 3) * (28 + Math.random() * 18),
    dy: (Math.random() - 0.5) * 28,
    r: 46 + Math.random() * 44,
  })),
});

export function CloudSky({
  raining = false,
  tone = "auto",
  className,
}: CloudSkyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rainingRef = useRef(raining);

  useEffect(() => {
    rainingRef.current = raining;
  }, [raining]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mouse = { x: -999, y: -999, vx: 0 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let clouds: Cloud[] = [];
    let drops: Drop[] = [];

    const isDark = () => {
      const themeIsDark = document.documentElement.classList.contains("dark");
      if (tone === "auto") return themeIsDark;
      if (tone === "inverse") return !themeIsDark;
      return tone === "dark";
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      clouds = Array.from({ length: Math.max(5, Math.round(w / 170)) }, () =>
        makeCloud(w, h),
      );
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      mouse.vx = x - mouse.x;
      mouse.x = x;
      mouse.y = e.clientY - rect.top;
    };

    const drawCloud = (c: Cloud, dark: boolean) => {
      const [r, g, b, a] = dark
        ? [255, 255, 255, rainingRef.current ? 0.16 : 0.1]
        : [0, 0, 0, rainingRef.current ? 0.1 : 0.06];
      for (const p of c.puffs) {
        const px = c.x + p.dx * c.scale;
        const py = c.y + p.dy * c.scale;
        const pr = p.r * c.scale;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, pr);
        grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = () => {
      const dark = isDark();
      ctx.clearRect(0, 0, w, h);

      for (const c of clouds) {
        const dx = c.x - mouse.x;
        const dy = c.y - mouse.y;
        if (dx * dx + dy * dy < 40000) c.push += mouse.vx * 0.02;
        c.push *= 0.96;
        c.x += c.speed + c.push;
        if (c.x > w + 260) c.x = -260;
        if (c.x < -300) c.x = w + 250;
        drawCloud(c, dark);
      }
      mouse.vx *= 0.9;

      if (rainingRef.current && drops.length < 90 && clouds.length > 0) {
        const c = clouds[Math.floor(Math.random() * clouds.length)];
        if (Math.random() < 0.35) {
          drops.push({
            x: c.x + (Math.random() - 0.5) * 220 * c.scale,
            y: c.y + 30 * c.scale,
            speed: 1.2 + Math.random() * 1.8,
            size: 10 + Math.random() * 4,
            text: ENV_KEYS[Math.floor(Math.random() * ENV_KEYS.length)],
          });
        }
      }

      ctx.textAlign = "center";
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.speed;
        const fade = Math.max(0, 1 - d.y / h);
        ctx.font = `${d.size}px ui-monospace, SFMono-Regular, monospace`;
        ctx.fillStyle = dark
          ? `rgba(255,255,255,${0.8 * fade})`
          : `rgba(0,0,0,${0.7 * fade})`;
        ctx.fillText(d.text, d.x, d.y);
        if (d.y > h) drops.splice(i, 1);
      }
      if (!rainingRef.current && drops.length > 0) {
        drops = drops.filter((d) => d.y < h);
      }

      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [tone]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}

export default CloudSky;
