"use client";

import { useState } from "react";
import OrbitalSculpture from "./OrbitalSculpture";

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
      <OrbitalSculpture active={active} />
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
