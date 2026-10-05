"use client";
import { useState } from "react";
const roles = [
  {
    title: "Principal Frontend Engineer",
    date: "2025 — PRESENT",
    label: "Architecture & leadership",
    description:
      "Guide frontend architecture and technical quality across client applications. Scope delivery, mentor engineers, and connect product requirements to practical engineering decisions.",
  },
  {
    title: "Senior Software Engineer",
    date: "2022 — 2025",
    label: "Systems & delivery",
    description:
      "Built and delivered production web and mobile applications, working across React, React Native, C#/.NET, APIs, and AWS.",
  },
  {
    title: "Software Engineer",
    date: "2019 — 2022",
    label: "Engineering foundations",
    description:
      "Developed client applications and grew the foundations of my work in frontend engineering, integration, and delivery.",
  },
];
export default function CareerJourney() {
  const [active, setActive] = useState(0);
  return (
    <div className="experience-layout">
      <div className="experience-intro">
        <h2 id="experience-title">
          Growing with
          <br />
          <span className="lavender">the work.</span>
        </h2>
        <p>
          Vigilus <span>/</span> May 2019 — present
        </p>
        <p>
          From writing the features to shaping the systems and helping teams
          ship them.
        </p>
        <div
          className="career-blueprint"
          role="group"
          aria-label="Explore the layers of my engineering career"
          data-active={active}
        >
          <svg viewBox="0 0 440 360" fill="none">
            <path
              d="M52 272 220 355 394 269M48 246 220 332 397 245M220 34V338"
              stroke="#aa81de"
              strokeOpacity=".15"
              strokeDasharray="3 7"
              aria-hidden="true"
            />
            {[2, 1, 0].map((i) => (
              <g
                key={i}
                data-career-layer={i}
                className="career-plane"
                transform={`translate(0 ${i * 85})`}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${roles[i].title}`}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <path
                  d="m53 80 167 45 167-45v10l-167 45-167-45Z"
                  fill={active === i ? "#274941" : "#21162e"}
                  stroke={active === i ? "#72e5bf" : "#6f4c96"}
                  strokeOpacity=".6"
                />
                <path
                  d="m53 80 167-45 167 45-167 45Z"
                  fill={active === i ? "#263635" : "#211a2f"}
                  stroke={active === i ? "#72e5bf" : "#9b70c8"}
                />
                <path
                  d="m99 80 121-33 120 33-120 33Z M147 67l145 39M99 80l145 39M171 112l145-39M124 99l145-39"
                  stroke={active === i ? "#72e5bf" : "#a786d1"}
                  strokeOpacity=".18"
                />
                <path
                  d="m175 80 45-14 45 14-45 14Z"
                  fill={active === i ? "#72e5bf" : "#9567c7"}
                />
                <text
                  x="220"
                  y="84"
                  textAnchor="middle"
                  fill="#171222"
                  fontFamily="monospace"
                  fontSize="12"
                >
                  0{3 - i}
                </text>
                <circle
                  cx="53"
                  cy="80"
                  r="4"
                  fill={active === i ? "#72e5bf" : "#a881d3"}
                />
                <circle
                  cx="387"
                  cy="80"
                  r="4"
                  fill={active === i ? "#72e5bf" : "#a881d3"}
                />
              </g>
            ))}
          </svg>
          <div className="blueprint-readout" aria-live="polite">
            <span>
              0{3 - active} / {roles[active].date}
            </span>
            <strong>{roles[active].label}</strong>
          </div>
        </div>
      </div>
      <div className="timeline">
        {roles.map((role, index) => (
          <article
            key={role.title}
            className={`timeline-item ${active === index ? "is-selected" : ""}`}
          >
            <span className="timeline-dot" />
            <p className="timeline-date">{role.date}</p>
            <h3>
              <button
                type="button"
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
                onPointerEnter={() => setActive(index)}
                aria-pressed={active === index}
              >
                {role.title}
              </button>
            </h3>
            <p>{role.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
