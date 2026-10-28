import { useEffect, useState } from "react";
import { Lock, Unlock } from "lucide-react";

const LINES: [string, string][] = [
  ["DATABASE_URL", "postgres://admin:s3cr3t@db.prod:5432/app"],
  ["JWT_SECRET", "k9X2-very-secret-token"],
  ["STRIPE_KEY", "sk_live_51Nimbus"],
  ["REDIS_URL", "redis://:pass@cache:6379"],
];

const GLYPHS = "abcdef0123456789+/=";

const encrypt = (value: string) =>
  Array.from(value)
    .map((c) => ((c.charCodeAt(0) * 7) % 256).toString(16).padStart(2, "0"))
    .join("")
    .slice(0, value.length);

function ScrambleText({ text, duration = 700 }: { text: string; duration?: number }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(k * text.length);
      setOut(
        Array.from(text)
          .map((c, i) =>
            i < reveal ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);

  return <>{out}</>;
}

/** A fake .env file that keeps locking and unlocking itself. */
export function EnvVault() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setLocked((v) => !v), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border bg-card text-left text-card-foreground shadow-lg">
      <div className="flex items-center justify-between border-b px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full border" />
          <span className="size-3 rounded-full border" />
          <span className="size-3 rounded-full border" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">.env</span>
        </div>
        <span
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] transition-colors ${
            locked
              ? "bg-primary text-primary-foreground"
              : "border text-muted-foreground"
          }`}
        >
          {locked ? <Lock className="size-3" /> : <Unlock className="size-3" />}
          {locked ? "AES-256 · encrypted" : "plain text · exposed"}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-7">
        {LINES.map(([key, value]) => (
          <div key={key} className="whitespace-nowrap">
            <span className="font-semibold">{key}</span>
            <span className="text-muted-foreground">=</span>
            <span className={locked ? "text-muted-foreground" : undefined}>
              <ScrambleText text={locked ? `enc:${encrypt(value)}` : value} />
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}

export default EnvVault;
