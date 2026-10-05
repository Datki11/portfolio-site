import Image from "next/image";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiCode,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import StackMap from "./StackMap";

// Set to null to keep the portrait frame with a monogram placeholder.
const headshotSrc: string | null = "/images/headshot.webp";
const resumeHref = "/Daniel_Atkinson_Resume_2026.pdf";

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 0C20 14 26 20 40 20C26 20 20 26 20 40C20 26 14 20 0 20C14 20 20 14 20 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="header-shell">
        <header className="site-header wrap">
          <a className="wordmark" href="#" aria-label="Daniel Atkinson home">
            <span className="logo-bracket">[</span>da
            <span className="logo-dot">.</span>
            <span className="logo-bracket">]</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a className="nav-contact" href="mailto:daniel@danielatkinson.dev">
              Let’s talk <FiArrowUpRight aria-hidden="true" />
            </a>
          </nav>
        </header>
      </div>
      <main id="main">
        <div className="sky-section">
          <div className="sky-texture" aria-hidden="true" />

          <section className="hero wrap" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" /> SENIOR FULL-STACK ENGINEER
              </p>
              <p className="hello">Hello, world. I’m</p>
              <h1 id="hero-title">
                Daniel
                <br />
                Atkinson<span className="accent">.</span>
              </h1>
              <p className="hero-statement">
                From the first pixel
                <br />
                to the <span>last API call.</span>
              </p>
              <p className="hero-description">
                7+ years building web, mobile, and AI-powered products. I like
                thoughtful interfaces, sturdy systems, and figuring out the
                tricky bits.
              </p>
              <div className="hero-actions">
                <a className="button button-mint" href="#work">
                  Explore my work <FiArrowDown aria-hidden="true" />
                </a>
                <a
                  className="resume-link"
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View résumé <FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="portrait-composition">
              <svg
                className="portrait-orbits"
                viewBox="0 0 560 560"
                fill="none"
                aria-hidden="true"
              >
                <ellipse
                  cx="280"
                  cy="280"
                  rx="258"
                  ry="152"
                  transform="rotate(-32 280 280)"
                  stroke="#c6a9ff"
                  strokeOpacity=".38"
                />
                <ellipse
                  cx="280"
                  cy="280"
                  rx="215"
                  ry="256"
                  transform="rotate(-32 280 280)"
                  stroke="#c6a9ff"
                  strokeOpacity=".14"
                  strokeDasharray="3 10"
                />
                <circle cx="87" cy="430" r="9" fill="#72e5bf" />
                <circle cx="502" cy="160" r="5" fill="#c6a9ff" />
                <circle cx="225" cy="18" r="3" fill="#72e5bf" />
              </svg>
              <Spark className="hero-spark" />
              <span className="orbit-label orbit-label-top">
                <FiCode aria-hidden="true" /> Ideas → interfaces
              </span>
              <div className="portrait-frame">
                {headshotSrc ? (
                  <Image
                    src={headshotSrc}
                    alt="Daniel Atkinson"
                    fill
                    preload
                    sizes="(max-width: 700px) 78vw, (max-width: 1000px) 34vw, 365px"
                    className="headshot"
                  />
                ) : (
                  <div
                    className="portrait-placeholder"
                    role="img"
                    aria-label="Headshot placeholder for Daniel Atkinson"
                  >
                    <span>da.</span>
                    <p>
                      A face to the name.
                      <br />
                      Headshot coming soon.
                    </p>
                  </div>
                )}
                <div className="portrait-bottom">
                  <span className="status-dot" /> THE HUMAN BEHIND THE CODE
                </div>
              </div>
              <span className="orbit-label orbit-label-bottom">
                <span className="code-bracket">{`{ }`}</span> Curiosity, built
                in.
              </span>
              <span className="portrait-coordinate" aria-hidden="true">
                01 / ALWAYS EXPLORING
              </span>
            </div>
            <div className="hero-bottom">
              <a className="explore-link" href="#about">
                <span className="scroll-line" /> More than a job title{" "}
                <FiArrowDown aria-hidden="true" />
              </a>
              <div className="hero-socials">
                <a
                  href="https://github.com/Datki11"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Daniel on GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/daniel-atkinson-a4650526a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Daniel on LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </section>
        </div>
        <section
          className="about-section wrap"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-heading">
            <p className="eyebrow">
              <span className="section-number">01</span> A LITTLE ABOUT ME
            </p>
            <Spark className="section-spark" />
          </div>
          <div className="about-intro">
            <h2 id="about-title">
              Curious by nature.
              <br />
              <span className="lavender">Engineer by trade.</span>
            </h2>
            <div>
              <p>
                I’m a full-stack engineer with a frontend heart. Since 2019,
                I’ve helped turn early ideas into production applications at
                Vigilus, working across interfaces, APIs, cloud infrastructure,
                and everything in between.
              </p>
              <p>
                I enjoy the messy middle: asking the right questions, making the
                tradeoffs, and finding a solution that works for the people
                using it and the team building it.
              </p>
            </div>
          </div>
          <StackMap />
          <div className="impact-strip">
            <div>
              <strong>
                7<span>+</span>
              </strong>
              <p>years building software</p>
            </div>
            <div>
              <strong>
                35<span>+</span>
              </strong>
              <p>web & mobile apps built</p>
            </div>
            <div>
              <strong>
                40<span>+</span>
              </strong>
              <p>applications scoped</p>
            </div>
            <div>
              <strong>
                30<span>+</span>
              </strong>
              <p>engineers trained</p>
            </div>
          </div>
        </section>
        <section
          className="work-section"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">
                <span className="section-number">02</span> SELECTED WORK
              </p>
              <span className="section-note">
                REAL PRODUCTS. INTERESTING PROBLEMS.
              </span>
            </div>
            <div className="work-intro">
              <h2 id="work-title">
                A few things
                <br />
                I’ve helped <span className="lavender">bring to life.</span>
              </h2>
              <p>
                A glimpse at the architecture, decisions, and problem solving
                behind the finished product.
              </p>
            </div>
            <div className="work-grid">
              <article className="work-card">
                <div className="work-art gaming-art" aria-hidden="true">
                  <span className="art-label">WORLD / WEB</span>
                  <div className="terrain-grid" />
                  <svg viewBox="0 0 540 280" fill="none">
                    <defs>
                      <linearGradient
                        id="mountain-fill"
                        x1="270"
                        y1="60"
                        x2="270"
                        y2="250"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#a382ff" stopOpacity=".28" />
                        <stop offset="1" stopColor="#a382ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="365"
                      cy="95"
                      r="43"
                      stroke="#72e5bf"
                      strokeOpacity=".6"
                    />
                    <circle
                      cx="365"
                      cy="95"
                      r="54"
                      stroke="#72e5bf"
                      strokeOpacity=".2"
                      strokeDasharray="2 7"
                    />
                    <path
                      d="m35 255 125-138 55 58 91-105 180 185H35Z"
                      fill="url(#mountain-fill)"
                      stroke="#a382ff"
                      strokeOpacity=".7"
                    />
                    <path
                      d="m160 117 12 137m43-79 21 80m70-185-30 185m30-185 86 185M75 210h367M108 172h296"
                      stroke="#a382ff"
                      strokeOpacity=".3"
                    />
                    <path
                      d="M55 60v14m-7-7h14M455 105v10m-5-5h10"
                      stroke="#d7c6ff"
                    />
                  </svg>
                  <span className="art-bottom">
                    FRONTEND ARCHITECTURE · CONTENT AT SCALE
                  </span>
                </div>
                <div className="work-card-copy">
                  <p className="project-type">WEB EXPERIENCE / FRONTEND LEAD</p>
                  <h3>Tomb Raider website</h3>
                  <p>
                    Led frontend architecture for a high-profile, content-driven
                    site. Balanced SEO, performance, design fidelity, and motion
                    with the realities of delivery.
                  </p>
                  <div className="tags">
                    <span>Next.js</span>
                    <span>Contentful</span>
                    <span>Tailwind</span>
                    <span>GSAP</span>
                  </div>
                  <details>
                    <summary>
                      Behind the build{" "}
                      <span>
                        <FiArrowUpRight aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="case-detail">
                      <p>
                        Used Next.js to serve fast, indexable content while
                        keeping account experiences personalized. When the
                        budget changed, I proposed GSAP and parallax to preserve
                        depth and motion with a simpler implementation.
                      </p>
                      <p>
                        The project went on to influence our team’s adoption of
                        Next.js and Tailwind for public websites.
                      </p>
                    </div>
                  </details>
                </div>
              </article>
              <article className="work-card">
                <div className="work-art data-art" aria-hidden="true">
                  <span className="art-label">SIGNAL / SYSTEMS</span>
                  <svg viewBox="0 0 540 280" fill="none">
                    <path
                      d="M45 208H495M45 155H495M45 102H495"
                      stroke="#bda1f0"
                      strokeOpacity=".12"
                      strokeDasharray="3 6"
                    />
                    <path
                      d="m45 203 26-21 21 33 22-96 26 88 26-41 28 30 26-92 30 105 28-120 27 104 29-5 30-94 26 117 24-72 30 68 29-82 25 52"
                      stroke="#8f74b8"
                      strokeOpacity=".55"
                      strokeWidth="2"
                    />
                    <path
                      d="M45 192c35 0 42-30 70-30s40 19 63 19 41-52 75-52 28 10 61 10 47-37 77-37 70 18 104 0"
                      stroke="#72e5bf"
                      strokeWidth="3"
                    />
                    <circle cx="253" cy="129" r="6" fill="#72e5bf" />
                    <circle cx="391" cy="102" r="6" fill="#72e5bf" />
                    <path
                      d="M253 140v80M391 114v106"
                      stroke="#72e5bf"
                      strokeOpacity=".3"
                      strokeDasharray="3 5"
                    />
                  </svg>
                  <div className="signal-legend">
                    <span>
                      <i /> Raw signal
                    </span>
                    <span>
                      <i /> Useful insight
                    </span>
                  </div>
                  <span className="art-bottom">
                    UNCERTAIN DATA → DEFENSIBLE DECISIONS
                  </span>
                </div>
                <div className="work-card-copy">
                  <p className="project-type">
                    OPERATIONS PLATFORM / TECHNICAL CONTRIBUTOR
                  </p>
                  <h3>Parking analytics</h3>
                  <p>
                    Helped turn unreliable occupancy snapshots into useful
                    reporting. Worked through data freshness, device behavior,
                    and what the source could actually support.
                  </p>
                  <div className="tags">
                    <span>Requirements</span>
                    <span>Data quality</span>
                    <span>API integration</span>
                  </div>
                  <details>
                    <summary>
                      Behind the build{" "}
                      <span>
                        <FiArrowUpRight aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="case-detail">
                      <p>
                        I raised reliability concerns early, investigated device
                        behavior with the backend engineer, and reviewed the
                        ingestion and reconciliation work.
                      </p>
                      <p>
                        By identifying unhealthy devices and defining reporting
                        limits, we helped the client make better decisions
                        without promising precision the data couldn’t provide.
                      </p>
                    </div>
                  </details>
                </div>
              </article>
            </div>
            <div className="ai-note">
              <span className="ai-icon">
                <FiCpu aria-hidden="true" />
              </span>
              <div>
                <h3>Also building with AI.</h3>
                <p>
                  Agent workflows, permission-scoped data access, streamed
                  responses, and real-time voice. Practical features built with
                  OpenAI APIs, LangChain, and LangGraph.
                </p>
              </div>
              <Spark className="ai-spark" />
            </div>
          </div>
        </section>
        <section
          className="experience-section wrap"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <p className="eyebrow">
              <span className="section-number">03</span> THE JOURNEY SO FAR
            </p>
            <a
              className="text-link"
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Full résumé <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
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
                From writing the features to shaping the systems and helping
                teams ship them.
              </p>
              <FiLayers className="journey-icon" aria-hidden="true" />
            </div>
            <div className="timeline">
              <article className="timeline-item">
                <span className="timeline-dot" />
                <p className="timeline-date">2025 — PRESENT</p>
                <h3>Principal Frontend Engineer</h3>
                <p>
                  Guide frontend architecture and technical quality across
                  client applications. Scope delivery, mentor engineers, and
                  connect product requirements to practical engineering
                  decisions.
                </p>
              </article>
              <article className="timeline-item">
                <span className="timeline-dot" />
                <p className="timeline-date">2022 — 2025</p>
                <h3>Senior Software Engineer</h3>
                <p>
                  Built and delivered production web and mobile applications,
                  working across React, React Native, C#/.NET, APIs, and AWS.
                </p>
              </article>
              <article className="timeline-item">
                <span className="timeline-dot" />
                <p className="timeline-date">2019 — 2022</p>
                <h3>Software Engineer</h3>
                <p>
                  Developed client applications and grew the foundations of my
                  work in frontend engineering, integration, and delivery.
                </p>
              </article>
            </div>
          </div>
          <div className="education-note">
            <span className="education-icon">&lt;/&gt;</span>
            <div>
              <p>BS, Computer Science</p>
              <span>Louisiana State University · 2017–2021</span>
            </div>
            <span className="education-caption">WHERE THE JOURNEY STARTED</span>
          </div>
        </section>
        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="wrap contact-inner">
            <div>
              <p className="eyebrow">
                <span className="section-number">04</span> SAY HELLO
              </p>
              <h2 id="contact-title">
                Got an interesting
                <br />
                <span>problem?</span> <Spark className="contact-spark" />
              </h2>
              <p>I’d love to hear what you’re building.</p>
              <a
                className="contact-email"
                href="mailto:daniel@danielatkinson.dev"
              >
                daniel@danielatkinson.dev <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="contact-planet" aria-hidden="true">
              <div className="planet-core" />
              <div className="planet-ring" />
              <Spark className="planet-spark" />
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap site-footer">
        <a className="wordmark" href="#" aria-label="Back to top">
          <span className="logo-bracket">[</span>da
          <span className="logo-dot">.</span>
          <span className="logo-bracket">]</span>
        </a>
        <span>
          © {new Date().getFullYear()} Daniel Atkinson{" "}
          <span className="footer-star">✦</span> Built with a little curiosity.
        </span>
        <div>
          <a
            href="https://github.com/Datki11"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-atkinson-a4650526a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}
