import { FiArrowUpRight } from "react-icons/fi";

const stories = [
  {
    id: "tomb-raider-title",
    title: "Tomb Raider — Frontend architecture and performance",
    summary:
      "High-traffic public website built with Next.js, Contentful, Tailwind, and GSAP, where I led frontend architecture and rendering strategy.",
    decisions: [
      "Chose Next.js over our usual React + Vite setup because SEO, initial load performance, and public traffic were important.",
      "Used ISR for shared public content, request-time SSR for protected admin data, and client-side fetching for authenticated account data.",
      "Introduced Tailwind to improve design consistency and iteration speed across the team.",
      "Reworked an initially ambitious Three.js concept into a lighter GSAP-based parallax experience when the project budget changed.",
      "Later fixed authentication/profile-state race conditions by separating loading, failure, and genuinely missing user data.",
    ],
    results: [
      "The site handled 10,000+ concurrent users without major frontend performance issues.",
      "Next.js and Tailwind became standard choices for similar public-facing projects afterward.",
    ],
    tags: [
      "Next.js",
      "SSR / ISR",
      "Contentful",
      "Performance",
      "Frontend Architecture",
    ],
  },
  {
    id: "parking-title",
    title: "Parking Analytics — Working with unreliable external data",
    summary:
      "Operations and analytics platform for parking facilities, integrating occupancy and device data from an existing INDECT system.",
    decisions: [
      "Helped define requirements and estimate work where the upstream integration provided periodic snapshots rather than authoritative parking sessions.",
      "Identified that polling every few minutes did not guarantee the upstream data itself was fresh.",
      "Worked through edge cases around occupancy timing, stale updates, inconsistent device refresh rates, and unreliable sensor behavior.",
      "Helped identify repeated empty/occupied flipping as a device-health issue rather than legitimate parking activity.",
      "Supported the design of configurable toggling detection so unreliable sessions could be flagged or excluded from accuracy-sensitive reporting.",
    ],
    results: [
      "The team was able to deliver useful occupancy and reporting features despite imperfect upstream data.",
      "Client expectations around arrival/departure precision were reset to match what the integration could actually support.",
      "Device-health monitoring improved confidence in downstream analytics.",
    ],
    tags: [
      "Data Integration",
      "Analytics",
      "Device Health",
      "Requirements",
      "Unreliable Data",
    ],
  },
  {
    id: "speedyeats-title",
    title: "SpeedyEats — Securing an inherited AWS environment",
    summary:
      "A production incident in an inherited AWS environment exposed broader security problems beyond the initial SES suspension.",
    decisions: [
      "Investigated the incident across AWS, Apache, Laravel, and PHP logs rather than treating SES as an isolated email issue.",
      "Found that sensitive server files had been exposed, including application configuration and source-related files.",
      "Rotated exposed credentials and removed long-lived IAM keys from the EC2 instance.",
      "Switched AWS access to role-based EC2 permissions, restricted SES access, and moved secrets into AWS Secrets Manager.",
      "Brought in the cybersecurity team once the scope was clear and implemented much of the remediation they validated or recommended.",
      "Worked through multiple rounds with AWS Support to demonstrate the environment had been hardened.",
    ],
    results: [
      "Unauthorized email sending stopped.",
      "SES was reinstated.",
      "The hardened AWS configuration remains in place, and there have been no repeat incidents from the same class of issue.",
    ],
    tags: [
      "AWS",
      "Incident Response",
      "IAM",
      "Secrets Management",
      "Production Debugging",
    ],
  },
  {
    id: "centerline-title",
    title: "CENTERLINE — TypeScript guidance and team standards",
    summary:
      "Architectural project management software with roughly 10 developers, focused heavily on document workflows and review cycles.",
    decisions: [
      "Reviewed a large amount of frontend work and became one of the people developers came to for React, TypeScript, and debugging help.",
      "Repeatedly addressed misuse of any, non-null assertions, broad union types, excessive optional chaining, and unnecessary type casts.",
      "Focused code-review feedback on understanding why TypeScript was raising an issue rather than simply suppressing the error.",
      "Encouraged developers to model real application states with narrower, more meaningful types.",
      "Walked developers through a consistent debugging process using logs, browser console, Inspect Element, network state, and breakpoints.",
      "Helped standardize Prettier across the team and later adopted ESLint rules so some conventions were enforced automatically.",
    ],
    results: [
      "Developers generally incorporated the feedback, and I saw fewer repeated TypeScript issues in later PRs from the same people.",
      "Code reviews became less focused on formatting and recurring conventions and more focused on correctness, state modeling, and maintainability.",
    ],
    tags: [
      "TypeScript",
      "React",
      "Code Review",
      "ESLint",
      "Technical Leadership",
    ],
  },
];

export default function ProjectStory({ index }: { index: number }) {
  const story = stories[index];
  return (
    <div className="work-card-copy project-story">
      <h3 id={story.id}>{story.title}</h3>
      <p>{story.summary}</p>
      <details>
        <summary>
          Key decisions &amp; result
          <span>
            <FiArrowUpRight aria-hidden="true" />
          </span>
        </summary>
        <div className="case-detail">
          <h4>Key decisions</h4>
          <ul>
            {story.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
          <h4>Result</h4>
          <ul>
            {story.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </div>
      </details>
      <div className="tags" aria-label="Tags">
        {story.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
