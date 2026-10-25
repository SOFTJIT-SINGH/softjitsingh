const C = 400;
const GOLD = "#d8b46a";
const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

// Each tech family gets a planetary glyph, the way an astrolabe's rete names its pointer stars.
const GLYPHS = [
  ["☉", "next.js"],
  ["☽", "react native"],
  ["♄", "postgresql"],
  ["♂", "redis"],
  ["☿", "gemini ai"],
  ["♃", "webrtc"],
  ["♀", "mongodb"],
] as const;

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)] as const;
};

/** A slowly turning brass astrolabe drawn in thin gold lines; decorative, sits behind the hero. */
export default function Astrolabe({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{
        maskImage: "radial-gradient(circle, black 52%, transparent 71%)",
        WebkitMaskImage: "radial-gradient(circle, black 52%, transparent 71%)",
      }}
    >
      <g fill="none" stroke={GOLD}>
        {/* The plate: horizon circles nesting towards the zenith, and the cross of the meridians. */}
        <g strokeOpacity={0.14} strokeWidth={1}>
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={C} cy={C - 120 + k * 22} r={60 + k * 46} />
          ))}
          <line x1={C - 300} y1={C} x2={C + 300} y2={C} />
          <line x1={C} y1={C - 300} x2={C} y2={C + 300} />
          <circle cx={C} cy={C} r={110} strokeDasharray="2 6" />
          <circle cx={C} cy={C} r={250} strokeDasharray="1 5" />
        </g>

        {/* The limb: degree scale and hours, fixed like the mater of a real astrolabe. */}
        <circle cx={C} cy={C} r={380} strokeOpacity={0.35} />
        <circle cx={C} cy={C} r={300} strokeOpacity={0.3} />
        <g strokeOpacity={0.4}>
          {Array.from({ length: 120 }, (_, i) => {
            const len = i % 10 === 0 ? 26 : i % 5 === 0 ? 18 : 9;
            const [x1, y1] = polar(380, i * 3);
            const [x2, y2] = polar(380 - len, i * 3);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        {ROMAN.map((n, i) => {
          const [x, y] = polar(330, i * 30);
          return (
            <text
              key={n}
              x={x}
              y={y}
              fill={GOLD}
              fillOpacity={0.55}
              stroke="none"
              fontSize={17}
              fontFamily="var(--font-fraunces), Georgia, serif"
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${i * 30} ${x} ${y})`}
            >
              {n}
            </text>
          );
        })}

        {/* The rete: ecliptic ring and pointers, turning slowly clockwise. */}
        <g className="astro-cw">
          <circle cx={C} cy={C} r={300} stroke="none" />
          <circle cx={C} cy={C - 46} r={196} strokeOpacity={0.5} strokeWidth={1.4} />
          <circle cx={C} cy={C - 46} r={182} strokeOpacity={0.25} />
          <line x1={C} y1={C - 290} x2={C} y2={C + 290} strokeOpacity={0.35} />
          {[20, 75, 140, 200, 255, 310].map((deg) => {
            const [bx, by] = polar(150, deg);
            const [tx, ty] = polar(232, deg);
            return (
              <g key={deg} strokeOpacity={0.6}>
                <path d={`M${bx} ${by} L${tx} ${ty}`} />
                <circle cx={tx} cy={ty} r={3.5} fill={GOLD} fillOpacity={0.8} stroke="none" />
              </g>
            );
          })}
        </g>

        {/* The glyph ring, turning the other way. */}
        <g className="astro-ccw">
          <circle cx={C} cy={C} r={290} stroke="none" />
          {GLYPHS.map(([glyph, name], i) => {
            const deg = (i * 360) / GLYPHS.length;
            const [x, y] = polar(272, deg);
            return (
              <text
                key={name}
                x={x}
                y={y}
                fill={GOLD}
                fillOpacity={0.6}
                stroke="none"
                fontSize={12}
                fontFamily="var(--font-geist-mono), monospace"
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${deg} ${x} ${y})`}
              >
                {glyph} {name}
              </text>
            );
          })}
        </g>

        <circle cx={C} cy={C} r={14} strokeOpacity={0.6} />
        <circle cx={C} cy={C} r={4} fill={GOLD} fillOpacity={0.8} stroke="none" />
      </g>
    </svg>
  );
}
