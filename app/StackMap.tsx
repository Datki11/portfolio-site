"use client";

import { useState } from "react";

const areas = [
  {
    label: "Interfaces",
    node: "UI",
    title: "The part people touch.",
    description:
      "Web and mobile experiences, reusable components, and a healthy obsession with the details.",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "React Native",
      "Vue",
      "Storybook",
    ],
  },
  {
    label: "Systems",
    node: "API",
    title: "The pieces behind the pixels.",
    description:
      "APIs, authentication, data access, and cloud infrastructure that make the interface work.",
    skills: [
      "C# / .NET",
      "ASP.NET Core",
      "Node.js",
      "PostgreSQL",
      "REST / GraphQL",
      "AWS",
    ],
  },
  {
    label: "AI & delivery",
    node: "AI",
    title: "From a good idea to production.",
    description:
      "AI workflows with scoped data access, streaming and voice, backed by automated tests and delivery pipelines.",
    skills: [
      "OpenAI APIs",
      "LangChain",
      "LangGraph",
      "Jest",
      "Playwright",
      "GitHub Actions",
    ],
  },
];

export default function StackMap() {
  const [active, setActive] = useState(0);
  const area = areas[active];
  return (
    <div className="stack-map">
      <div className="stack-visual" aria-hidden="true">
        <svg viewBox="0 0 440 330" fill="none">
          <defs>
            <radialGradient id="stack-glow">
              <stop stopColor="#8424ff" stopOpacity=".3" />
              <stop offset="1" stopColor="#8424ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="220" cy="165" r="160" fill="url(#stack-glow)" />
          <ellipse
            cx="220"
            cy="165"
            rx="165"
            ry="90"
            stroke="#b697ef"
            strokeOpacity=".2"
            transform="rotate(-28 220 165)"
          />
          <ellipse
            cx="220"
            cy="165"
            rx="165"
            ry="90"
            stroke="#b697ef"
            strokeOpacity=".2"
            transform="rotate(28 220 165)"
          />
          <circle
            cx="220"
            cy="165"
            r="112"
            stroke="#b697ef"
            strokeOpacity=".14"
            strokeDasharray="3 9"
          />
          <path
            d="M95 105 220 165 348 105M220 165v115"
            stroke="#b697ef"
            strokeOpacity=".3"
          />
          <circle
            cx="220"
            cy="165"
            r="48"
            fill="#252039"
            stroke="#ad83f4"
            strokeOpacity=".7"
          />
          <text
            x="220"
            y="174"
            textAnchor="middle"
            fill="#f0e9ff"
            fontFamily="monospace"
            fontSize="25"
          >
            &lt;/&gt;
          </text>
          {[
            [95, 105],
            [348, 105],
            [220, 280],
          ].map(([x, y], index) => (
            <g
              key={index}
              className={
                active === index ? "map-node map-node-active" : "map-node"
              }
            >
              <circle
                cx={x}
                cy={y}
                r="28"
                fill={active === index ? "#72e5bf" : "#252039"}
                stroke={active === index ? "#72e5bf" : "#665478"}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill={active === index ? "#14251f" : "#cfc2e4"}
                fontFamily="monospace"
                fontSize="13"
              >
                {areas[index].node}
              </text>
            </g>
          ))}
          <circle cx="361" cy="212" r="3" fill="#c8a9ff" />
          <circle cx="111" cy="247" r="2" fill="#72e5bf" />
          <path
            d="M282 38v14m-7-7h14M62 192v10m-5-5h10"
            stroke="#c8a9ff"
            strokeOpacity=".5"
          />
        </svg>
        <span className="map-caption">
          A FEW CONNECTED PIECES OF MY TOOLKIT
        </span>
      </div>
      <div className="stack-content">
        <div
          className="stack-tabs"
          role="tablist"
          aria-label="Explore my technical skills"
        >
          {areas.map((item, index) => (
            <button
              key={item.label}
              id={`stack-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls="stack-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(e) => {
                if (
                  e.key === "ArrowRight" ||
                  e.key === "ArrowLeft" ||
                  e.key === "Home" ||
                  e.key === "End"
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : (index + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                  setActive(next);
                  document.getElementById(`stack-tab-${next}`)?.focus();
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          id="stack-panel"
          role="tabpanel"
          aria-labelledby={`stack-tab-${active}`}
          tabIndex={0}
        >
          <h3>{area.title}</h3>
          <p>{area.description}</p>
          <div className="tags">
            {area.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
