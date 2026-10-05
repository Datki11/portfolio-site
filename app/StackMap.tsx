"use client";

import { useState } from "react";
import Molecule from "./Molecule";

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
    label: "AI workflows",
    node: "AI",
    title: "From a good idea to production.",
    description:
      "Agent workflows, permission-scoped data access, streamed responses, and real-time voice interactions.",
    skills: ["OpenAI APIs", "LangChain", "LangGraph", "DeepAgents"],
  },
  {
    label: "Cloud",
    node: "AWS",
    title: "Built to run in the real world.",
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
    title: "Confidence in every release.",
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
