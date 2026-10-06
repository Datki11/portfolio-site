import Image from "next/image";
import { FiArrowDown, FiArrowUpRight, FiCode, FiCpu } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import StackMap from "./StackMap";
import StarField from "./StarField";
import CareerJourney from "./CareerJourney";

// Set to null to keep the portrait frame with a monogram placeholder.
const headshotSrc: string | null = "/images/headshot.webp";
const resumeHref = "/Daniel_Atkinson_Resume_2026_Senior_Frontend_Engineer.pdf";

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
    <div className="portfolio-site">
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
          <div className="cursor-nebula" aria-hidden="true" />
          <StarField />

          <section className="hero wrap" aria-labelledby="hero-title">
            <div className="hero-copy">
              <h1 id="hero-title">
                Daniel
                <br />
                Atkinson<span className="accent">.</span>
              </h1>
              <p className="hero-statement">Senior Frontend Engineer</p>
              <p className="hero-description">
                I build production web and mobile applications with React,
                TypeScript, Next.js, React Native, and AWS.
              </p>
              <p className="hero-description">
                7+ years of experience across frontend architecture, API
                integrations, technical scoping, and project delivery.
              </p>
              <div className="hero-actions">
                <a className="button button-mint" href="#work">
                  View projects <FiArrowDown aria-hidden="true" />
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
                <FiCode aria-hidden="true" /> React + TypeScript
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
                  <span className="status-dot" /> DANIEL ATKINSON
                </div>
              </div>
              <span className="orbit-label orbit-label-bottom">
                <span className="code-bracket">{`{ }`}</span> Web & mobile apps
              </span>
              <span className="portrait-coordinate" aria-hidden="true">
                01 / FRONTEND ENGINEERING
              </span>
            </div>
            <div className="hero-bottom">
              <a className="explore-link" href="#about">
                <span className="scroll-line" /> Technical experience{" "}
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
              <span className="section-number">01</span> ABOUT
            </p>
            <Spark className="section-spark" />
          </div>
          <div className="about-intro">
            <h2 id="about-title">
              Frontend-focused
              <br />
              <span className="lavender">software engineer</span>
            </h2>
            <div>
              <p>
                Since 2019, I’ve worked across web, mobile, desktop, cloud
                infrastructure, and AI-enabled products. I specialize in React
                and TypeScript, with experience in APIs, authentication, AWS,
                architecture, scoping, and delivery.
              </p>
              <p>
                On small and larger teams, I own features, review code, help set
                technical direction, and work directly with clients and
                stakeholders.
              </p>
            </div>
          </div>
          <StackMap />
          <div className="impact-strip">
            <div>
              <strong>
                7<span>+</span>
                <small> years</small>
              </strong>
              <p>experience</p>
            </div>
            <div>
              <strong>
                35<span>+</span>
              </strong>
              <p>web &amp; mobile apps</p>
            </div>
            <div>
              <strong>
                40<span>+</span>
              </strong>
              <p>projects scoped</p>
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
                <span className="section-number">02</span> PROJECTS
              </p>
            </div>
            <div className="work-intro">
              <h2 id="work-title">Selected work</h2>
              <p>
                Projects that show the kind of frontend architecture,
                integration work, production debugging, and technical leadership
                I’ve handled.
              </p>
            </div>
            <div className="work-grid">
              <article className="work-card">
                <div className="work-art gaming-art" aria-hidden="true">
                  <span className="art-label">MARKETING WEBSITE</span>
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
                </div>
                <div className="work-card-copy">
                  <p className="project-type">
                    <span className="detail-label">Role</span> Frontend
                    architecture and delivery
                  </p>
                  <h3>Tomb Raider website</h3>
                  <p>
                    High-traffic marketing site built with Next.js, Contentful,
                    Tailwind, and GSAP. I led frontend architecture, chose the
                    rendering strategy, and helped adapt the experience to
                    tighter budget constraints.
                  </p>
                  <p className="detail-label">Stack</p>
                  <div className="tags">
                    <span>Next.js</span>
                    <span>Contentful</span>
                    <span>Tailwind</span>
                    <span>GSAP</span>
                  </div>
                  <details>
                    <summary>
                      Key decisions &amp; result{" "}
                      <span>
                        <FiArrowUpRight aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="case-detail">
                      <h4>Key decisions</h4>
                      <p>
                        Used Next.js to serve fast, indexable content while
                        keeping account experiences personalized. When the
                        budget changed, I proposed GSAP and parallax to preserve
                        depth and motion with a simpler implementation.
                      </p>
                      <h4>Result</h4>
                      <p>
                        The project influenced our team’s adoption of Next.js
                        and Tailwind for public websites.
                      </p>
                    </div>
                  </details>
                </div>
              </article>
              <article className="work-card">
                <div className="work-art data-art" aria-hidden="true">
                  <span className="art-label">OPERATIONS DASHBOARD</span>
                  <div className="signal-bars" aria-hidden="true">
                    {[36, 60, 42, 83, 54, 95, 67, 76, 45, 90, 63, 80].map(
                      (height, index) => (
                        <i key={index} style={{ height: `${height}%` }} />
                      ),
                    )}
                  </div>
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
                </div>
                <div className="work-card-copy">
                  <p className="project-type">
                    <span className="detail-label">Role</span> Requirements and
                    technical investigation
                  </p>
                  <h3>Parking Guidance Systems</h3>
                  <p>
                    Operations dashboard for occupancy, reporting, tenant
                    management, and sensor health. I helped define requirements
                    and worked through unreliable upstream parking data and
                    device behavior.
                  </p>
                  <p className="detail-label">Focus</p>
                  <div className="tags">
                    <span>Requirements</span>
                    <span>Data quality</span>
                    <span>API integration</span>
                  </div>
                  <details>
                    <summary>
                      Key decisions &amp; result{" "}
                      <span>
                        <FiArrowUpRight aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="case-detail">
                      <h4>Key decisions</h4>
                      <p>
                        Raised reliability concerns early, investigated device
                        behavior with the backend engineer, and reviewed
                        ingestion and reconciliation work. Defined reporting
                        limits based on what the upstream data could support.
                      </p>
                      <h4>Result</h4>
                      <p>
                        Identified unhealthy devices and clarified the limits of
                        the reporting so the client could make decisions without
                        relying on unsupported precision.
                      </p>
                    </div>
                  </details>
                </div>
              </article>
              <article className="work-card" aria-labelledby="speedyeats-title">
                <div className="work-art security-art" aria-hidden="true">
                  <span className="art-label">AWS INCIDENT RESPONSE</span>
                  <svg viewBox="0 0 540 280" fill="none">
                    <ellipse
                      cx="270"
                      cy="133"
                      rx="132"
                      ry="73"
                      transform="rotate(-24 270 133)"
                      stroke="#c6a9ff"
                      strokeOpacity=".35"
                    />
                    <path
                      d="M105 133h70m190 0h70M270 32v28m0 146v32"
                      stroke="#c6a9ff"
                      strokeOpacity=".25"
                      strokeDasharray="4 6"
                    />
                    <rect
                      x="216"
                      y="78"
                      width="108"
                      height="108"
                      rx="28"
                      fill="#251c35"
                      stroke="#a881d3"
                      strokeOpacity=".6"
                    />
                    <path
                      d="m270 105 24 10v21c0 17-24 29-24 29s-24-12-24-29v-21Z"
                      stroke="#72e5bf"
                      strokeWidth="3"
                    />
                    <path
                      d="m259 134 8 8 15-17"
                      stroke="#72e5bf"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="151" cy="161" r="5" fill="#72e5bf" />
                    <circle cx="389" cy="105" r="4" fill="#c6a9ff" />
                  </svg>
                </div>
                <div className="work-card-copy">
                  <p className="project-type">
                    <span className="detail-label">Role</span> Incident
                    investigation and remediation
                  </p>
                  <h3 id="speedyeats-title">SpeedyEats</h3>
                  <p>
                    Inherited AWS environment where an SES suspension exposed
                    broader security problems. I helped investigate the incident
                    and implemented most of the remediation across credentials,
                    IAM, EC2 roles, SES permissions, and secrets management.
                  </p>
                  <p className="detail-label">Stack</p>
                  <div className="tags">
                    <span>AWS IAM</span>
                    <span>EC2</span>
                    <span>SES</span>
                    <span>Secrets Manager</span>
                  </div>
                  <details>
                    <summary>
                      Key decisions &amp; result{" "}
                      <span>
                        <FiArrowUpRight aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="case-detail">
                      <h4>Key decisions</h4>
                      <p>
                        Traced the issue across AWS, Apache, Laravel, and PHP
                        logs to exposed configuration. Brought in our
                        cybersecurity team for an audit, rotated credentials,
                        replaced long-lived IAM keys with scoped EC2 roles,
                        restricted SES permissions, and moved secrets into AWS
                        Secrets Manager.
                      </p>
                      <h4>Result</h4>
                      <p>
                        Unauthorized sending stopped. SES was reinstated after
                        multiple rounds with AWS Support, and the hardened
                        configuration remains in place.
                      </p>
                    </div>
                  </details>
                </div>
              </article>
              <article className="work-card" aria-labelledby="centerline-title">
                <div className="work-art standards-art" aria-hidden="true">
                  <span className="art-label">FRONTEND CODE QUALITY</span>
                  <svg viewBox="0 0 540 280" fill="none">
                    <rect
                      x="137"
                      y="57"
                      width="234"
                      height="166"
                      rx="12"
                      stroke="#c6a9ff"
                      strokeOpacity=".2"
                    />
                    <rect
                      x="151"
                      y="45"
                      width="234"
                      height="166"
                      rx="12"
                      fill="#251c35"
                      stroke="#a881d3"
                      strokeOpacity=".55"
                    />
                    <path d="M151 80h234" stroke="#a881d3" strokeOpacity=".3" />
                    <circle cx="169" cy="63" r="3" fill="#72e5bf" />
                    <circle cx="181" cy="63" r="3" fill="#c6a9ff" />
                    <circle cx="193" cy="63" r="3" fill="#a881d3" />
                    <path
                      d="m194 115-14 12 14 12m54-24 14 12-14 12m-18-30-16 54"
                      stroke="#72e5bf"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M288 115h69m-69 14h47m-47 14h59M180 178h176"
                      stroke="#c6a9ff"
                      strokeOpacity=".4"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M385 129h42v50"
                      stroke="#72e5bf"
                      strokeOpacity=".4"
                      strokeDasharray="4 5"
                    />
                    <circle
                      cx="427"
                      cy="191"
                      r="14"
                      fill="#21332f"
                      stroke="#72e5bf"
                    />
                    <path
                      d="m421 191 4 4 8-9"
                      stroke="#72e5bf"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="work-card-copy">
                  <p className="project-type">
                    <span className="detail-label">Role</span> Frontend review
                    and technical guidance
                  </p>
                  <h3 id="centerline-title">CENTERLINE</h3>
                  <p>
                    Architectural project management software used to manage
                    large document workflows. I reviewed frontend work across a
                    larger team, gave TypeScript and debugging guidance, and
                    helped standardize code quality with Prettier and ESLint.
                  </p>
                  <p className="detail-label">Stack</p>
                  <div className="tags">
                    <span>React</span>
                    <span>TypeScript</span>
                    <span>Redux</span>
                    <span>TanStack Query</span>
                    <span>Prettier</span>
                    <span>ESLint</span>
                  </div>
                  <details>
                    <summary>
                      Key decisions &amp; result{" "}
                      <span>
                        <FiArrowUpRight aria-hidden="true" />
                      </span>
                    </summary>
                    <div className="case-detail">
                      <h4>Key decisions</h4>
                      <p>
                        Helped developers model application states more
                        precisely instead of relying on type assertions and
                        broad types. Walked teammates through systematic
                        debugging and helped move repeated review conventions
                        into Prettier and ESLint.
                      </p>
                      <h4>Result</h4>
                      <p>
                        Saw fewer repeated typing and state-modeling issues in
                        later PRs, allowing reviews to focus more on
                        correctness, architecture, and maintainability.
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
                <h3>AI work</h3>
                <p>
                  Built AI assistant interfaces using OpenAI APIs,
                  LangChain/LangGraph, SSE, realtime voice, permission-scoped
                  database querying, and interactive charts.
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
              <span className="section-number">03</span> EMPLOYMENT
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
          <CareerJourney />
          <div className="education-note">
            <span className="education-icon">&lt;/&gt;</span>
            <div>
              <p>BS, Computer Science</p>
              <span>Louisiana State University · 2017–2021</span>
            </div>
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
                <span className="section-number">04</span> CONTACT
              </p>
              <h2 id="contact-title">
                Get in <span>touch</span> <Spark className="contact-spark" />
              </h2>
              <p>
                I’m open to senior frontend, full-stack, and frontend-heavy software
                engineering roles.
              </p>
              <a
                className="contact-email"
                href="mailto:daniel@danielatkinson.dev"
              >
                daniel@danielatkinson.dev <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="contact-planet" aria-hidden="true">
              <div className="planet-core">
                <div className="planet-surface" />
              </div>
              <div className="planet-ring">
                <div className="ring-track">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
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
    </div>
  );
}
