"use client";

import { useState } from "react";
import Molecule from "./Molecule";

const areas = [
  {
    label: "Frontend",
    node: "UI",
    title: "Frontend",
    description:
      "State management, component architecture, accessibility, testing, and performance.",
    skills: ["React", "TypeScript", "Next.js", "React Native", "Vue"],
  },
  {
    label: "Backend",
    node: "API",
    title: "Backend & APIs",
    description:
      "API integrations, authentication, authorization, and data access.",
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
    label: "AI workflows",
    node: "AI",
    title: "AI workflows",
    description:
      "Agent workflows, permission-scoped data access, streamed responses, and real-time voice interactions.",
    skills: ["OpenAI APIs", "LangChain", "LangGraph", "DeepAgents"],
  },
  {
    label: "Cloud",
    node: "AWS",
    title: "Cloud infrastructure",
    description:
      "Application infrastructure for authentication, storage, delivery, and monitoring.",
    skills: [
      "AWS",
      "EC2 / S3",
      "RDS / DynamoDB",
      "Cognito",
      "CloudFront",
      "CloudWatch",
      "Docker",
    ],
  },
  {
    label: "Delivery",
    node: "CI",
    title: "Testing & delivery",
    description:
      "Automated tests and delivery pipelines that take web and mobile applications from implementation to production.",
    skills: [
      "Jest",
      "Playwright",
      "GitHub Actions",
      "CircleCI",
      "Git",
      "iOS / Android releases",
    ],
  },
];

export default function StackMap() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const area = areas[active];
  return (
    <div className="stack-map">
      <Molecule active={active} hovered={hovered} onSelect={setActive} />
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
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setHovered(index);
              }}
              onPointerLeave={() => setHovered(null)}
              onPointerCancel={() => setHovered(null)}
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
                        ? areas.length - 1
                        : (index +
                            (e.key === "ArrowRight" ? 1 : areas.length - 1)) %
                          areas.length;
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
