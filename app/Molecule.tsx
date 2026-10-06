const subjects = [
  { label: "Frontend", short: "UI", x: 80, y: 145 },
  { label: "Backend", short: "API", x: 360, y: 145 },
  { label: "AI workflows", short: "AI", x: 220, y: 55 },
  { label: "Cloud", short: "AWS", x: 115, y: 310 },
  { label: "Delivery", short: "CI", x: 325, y: 310 },
];
export default function Molecule({
  active,
  hovered,
  onSelect,
}: {
  active: number;
  hovered: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="molecule-visual"
      role="group"
      aria-label="Choose a connected skill subject"
    >
      <svg viewBox="0 0 440 440" fill="none">
        <g className="molecule-rings" aria-hidden="true">
          <ellipse
            cx="220"
            cy="200"
            rx="179"
            ry="108"
            transform="rotate(-24 220 200)"
            stroke="#b697ef"
            strokeOpacity=".2"
          />
          <ellipse
            cx="220"
            cy="200"
            rx="157"
            ry="117"
            transform="rotate(30 220 200)"
            stroke="#b697ef"
            strokeOpacity=".2"
          />
          <circle
            cx="220"
            cy="200"
            r="124"
            stroke="#b697ef"
            strokeOpacity=".15"
            strokeDasharray="2 9"
          />
        </g>
        {subjects.map((s, i) => (
          <path
            key={i}
            data-molecule-link={i}
            d={`M220 200L${s.x} ${s.y}`}
            stroke={active === i ? "#72e5bf" : "#b697ef"}
            strokeOpacity={active === i ? 0.7 : 0.3}
            aria-hidden="true"
          />
        ))}
        <g className="molecule-center" aria-hidden="true">
          <circle cx="220" cy="200" r="46" fill="#20182e" stroke="#b697ef" />
          <text
            x="220"
            y="208"
            textAnchor="middle"
            fill="#e7d9fc"
            fontFamily="monospace"
            fontSize="25"
          >
            &lt;/&gt;
          </text>
        </g>
        {subjects.map((s, i) => (
          <g
            key={s.label}
            className="molecule-node"
            data-molecule-node={i}
            data-hovered={hovered === i || undefined}
            data-x={s.x}
            data-y={s.y}
            transform={`translate(${s.x} ${s.y})`}
            role="button"
            tabIndex={0}
            aria-label={`Select ${s.label}`}
            aria-pressed={active === i}
            aria-controls="stack-panel"
            onClick={() => onSelect(i)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(i);
              }
            }}
          >
            <circle
              className="node-halo"
              r="44"
              stroke={active === i ? "#72e5bf" : "#8e70b2"}
              strokeOpacity={active === i ? 0.4 : 0.1}
            />
            <circle
              r="34"
              fill={active === i ? "#72e5bf" : "#251c35"}
              stroke={active === i ? "#72e5bf" : "#8d72a8"}
            />
            <text
              y="5"
              textAnchor="middle"
              fill={active === i ? "#142b23" : "#dbcaef"}
              fontFamily="monospace"
              fontSize="14"
            >
              {s.short}
            </text>
            <text
              y="61"
              textAnchor="middle"
              fill="#c6b4dc"
              fontFamily="monospace"
              fontSize="10"
            >
              {s.label}
            </text>
          </g>
        ))}
        <g className="molecule-sparks" stroke="#bfa3df" aria-hidden="true">
          <path d="M62 220v12m-6-6h12M293 52v14m-7-7h14" />
          <circle cx="365" cy="250" r="3" fill="#72e5bf" />
          <circle cx="154" cy="42" r="2" fill="#c6a9ff" />
        </g>
      </svg>
      <p className="diagram-hint">
        TECHNICAL SKILLS
        <span>Select a node to explore</span>
      </p>
    </div>
  );
}
