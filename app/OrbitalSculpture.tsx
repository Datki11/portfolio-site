import {
  nodeAngles,
  orbitPath,
  orbitPoint,
  project,
  restingView,
} from "./lib/orbits";

export default function OrbitalSculpture({
  variant = "skills",
  active = 0,
}: {
  variant?: "skills" | "career";
  active?: number;
}) {
  const career = variant === "career";
  const labels = career ? ["BUILD", "SHIP", "LEAD"] : ["UI", "API", "AI"];
  return (
    <div
      className={`orbital-sculpture ${career ? "career-sculpture" : ""}`}
      data-orbital-scene
      tabIndex={0}
      role="group"
      aria-label={`${career ? "Career" : "Skills"} orbital sculpture. Move the pointer or use arrow keys to rotate; Enter expands the orbits.`}
    >
      <svg viewBox="0 0 440 380" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id={`${variant}-aura`}>
            <stop stopColor="#8424ff" stopOpacity=".35" />
            <stop offset="1" stopColor="#8424ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${variant}-core`} cx="30%" cy="25%">
            <stop stopColor="#eedfff" />
            <stop offset=".25" stopColor="#bb84ff" />
            <stop offset=".6" stopColor="#752dcc" />
            <stop offset="1" stopColor="#26153b" />
          </radialGradient>
          <radialGradient id={`${variant}-moon`} cx="28%" cy="22%">
            <stop stopColor="#d2fff0" />
            <stop offset=".45" stopColor="#72e5bf" />
            <stop offset="1" stopColor="#205343" />
          </radialGradient>
        </defs>
        <circle cx="220" cy="190" r="185" fill={`url(#${variant}-aura)`} />
        {Array.from({ length: 32 }, (_, i) => (
          <circle
            key={i}
            cx={32 + ((i * 71) % 376)}
            cy={27 + ((i * 43) % 327)}
            r={i % 5 === 0 ? 1.6 : 0.8}
            fill={i % 3 === 0 ? "#72e5bf" : "#c6a9ff"}
            opacity=".4"
          />
        ))}
        {[0, 1, 2].map((r) => (
          <path
            key={r}
            data-orbit={r}
            d={orbitPath(r, restingView)}
            stroke={r === 1 ? "#72e5bf" : "#c6a9ff"}
            strokeOpacity={r === 1 ? ".45" : ".3"}
            strokeDasharray={r === 2 ? "2 7" : undefined}
          />
        ))}
        {nodeAngles.map((angle, i) => {
          const p = project(orbitPoint(angle, i), restingView);
          return (
            <path
              key={i}
              data-orbit-link={i}
              d={`M220 190L${p.x} ${p.y}`}
              stroke="#c6a9ff"
              strokeOpacity=".15"
              strokeDasharray="2 5"
            />
          );
        })}
        <g className="orbital-core">
          <circle cx="220" cy="190" r="38" fill={`url(#${variant}-core)`} />
          <ellipse
            cx="220"
            cy="190"
            rx="51"
            ry="17"
            transform="rotate(-27 220 190)"
            stroke="#c6a9ff"
            strokeOpacity=".45"
          />
          <text
            x="220"
            y="196"
            textAnchor="middle"
            fill="white"
            fontFamily="monospace"
            fontSize="18"
          >
            {career ? "✦" : "</>"}
          </text>
        </g>
        {nodeAngles.map((angle, i) => {
          const p = project(orbitPoint(angle, i), restingView);
          return (
            <g
              key={i}
              data-orbit-node={i}
              className={
                active === i ? "galaxy-node galaxy-node-active" : "galaxy-node"
              }
              transform={`translate(${p.x} ${p.y}) scale(${p.scale})`}
            >
              <circle r="25" fill={`url(#${variant}-moon)`} />
              <circle r="31" stroke="#72e5bf" strokeOpacity=".2" />
              <text
                y="4"
                textAnchor="middle"
                fill="#112c24"
                fontFamily="monospace"
                fontSize={career ? 9 : 11}
              >
                {labels[i]}
              </text>
            </g>
          );
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const p = project(orbitPoint(i * 0.73, i % 3), restingView);
          return (
            <circle
              key={i}
              data-orbit-dust={i}
              cx={p.x}
              cy={p.y}
              r={2 * p.scale}
              fill={i % 2 ? "#c6a9ff" : "#72e5bf"}
              opacity=".7"
            />
          );
        })}
      </svg>
      <span className="orbital-hint">
        {career ? "BUILD · SHIP · LEAD" : "A SMALL GALAXY OF CONNECTED IDEAS"}
        <span>Move to explore · arrow keys work too</span>
      </span>
    </div>
  );
}
