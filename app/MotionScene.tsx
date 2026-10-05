"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { FiPause, FiPlay } from "react-icons/fi";

/** All motion is optional; content and controls remain server rendered. */
export default function MotionScene({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled || !scope.current) return;
    const root = scope.current;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
      () => {
        const cleanups: (() => void)[] = [];
        const listen = (
          target: Element | Window,
          event: string,
          handler: EventListener,
        ) => {
          target.addEventListener(event, handler);
          cleanups.push(() => target.removeEventListener(event, handler));
        };
        const quick = (
          target: gsap.TweenTarget,
          property: string,
          duration = 0.65,
        ) => gsap.quickTo(target, property, { duration, ease: "power3.out" });
        root.dataset.motion = "active";

        // Independently suspended foreground layers respond to the same cursor.
        const hero = root.querySelector<HTMLElement>(".hero")!;
        const portrait = root.querySelector<HTMLElement>(".portrait-frame")!;
        const orbits = root.querySelector<HTMLElement>(".portrait-orbits")!;
        gsap.set(orbits, { yPercent: -50, y: 0 });
        const layers = [
          { element: portrait, depth: 14 },
          {
            element: root.querySelector<HTMLElement>(".orbit-label-top")!,
            depth: 110,
          },
          {
            element: root.querySelector<HTMLElement>(".orbit-label-bottom")!,
            depth: 145,
          },
          {
            element: root.querySelector<HTMLElement>(".hero-spark")!,
            depth: 30,
          },
          {
            element: root.querySelector<HTMLElement>(".portrait-orbits")!,
            depth: -14,
          },
        ].map(({ element, depth }) => ({
          element,
          depth,
          x: quick(element, "x"),
          y: quick(element, "y"),
        }));
        gsap.set(portrait, { transformPerspective: 950 });
        const portraitX = quick(portrait, "rotationX");
        const portraitY = quick(portrait, "rotationY");
        const stars = [
          ...root.querySelectorAll<HTMLElement>(".depth-star"),
        ].map((star, index) => ({
          element: star,
          depth: [18, 65, 135, 235][index % 4],
          x: quick(star, "x", 0.9),
          y: quick(star, "y", 0.9),
          scale: quick(star, "scale", 0.35),
        }));
        const sky = root.querySelector<HTMLElement>(".sky-section")!;
        const glow = root.querySelector<HTMLElement>(".cursor-nebula")!;
        const glowX = quick(glow, "x", 1.1),
          glowY = quick(glow, "y", 1.1);
        const cursor = { x: 0, y: 0 };
        const separation = { amount: 0 };
        const positionLayers = () =>
          layers.forEach((layer, index) => {
            const direction = index === 1 ? -1 : index === 2 ? 1 : 0;
            layer.x(
              cursor.x * layer.depth + direction * separation.amount * 32,
            );
            layer.y(
              cursor.y * layer.depth + direction * separation.amount * 34,
            );
          });
        const separate = gsap.quickTo(separation, "amount", {
          duration: 0.8,
          ease: "power3.out",
          onUpdate: positionLayers,
        });
        const composition = root.querySelector(".portrait-composition")!;
        listen(composition, "pointerenter", () => separate(1));
        listen(composition, "pointerleave", () => separate(0));
        const resetHero = () => {
          cursor.x = 0;
          cursor.y = 0;
          separate(0);
          layers.forEach((layer) => {
            layer.x(0);
            layer.y(0);
          });
          portraitX(0);
          portraitY(0);
          glowX(0);
          glowY(0);
          stars.forEach((star) => {
            star.x(0);
            star.y(0);
            star.scale(1);
          });
        };
        listen(hero, "pointermove", ((event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const bounds = hero.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          cursor.x = x;
          cursor.y = y;
          positionLayers();
          portraitX(-y * 13);
          portraitY(x * 16);
          glowX(x * 90);
          glowY(y * 60);
          const skyBounds = sky.getBoundingClientRect();
          stars.forEach((star) => {
            const sx =
              skyBounds.left +
              (skyBounds.width * parseFloat(star.element.style.left)) / 100;
            const sy =
              skyBounds.top +
              (skyBounds.height * parseFloat(star.element.style.top)) / 100;
            const distance = Math.hypot(event.clientX - sx, event.clientY - sy);
            const proximity = Math.max(0, 1 - distance / 150);
            star.x(x * star.depth);
            star.y(y * star.depth * 0.8);
            star.scale(1 + proximity * 2.7);
          });
        }) as EventListener);
        listen(hero, "pointerleave", resetHero);
        listen(window, "blur", resetHero);

        // Dedicated visual sequences live inside the artwork, never on the reading surface.
        root.querySelectorAll<HTMLElement>(".work-card").forEach((card) => {
          const art = card.querySelector<HTMLElement>(".work-art")!;
          const main = art.querySelector("svg")!;
          const x = quick(main, "x"),
            y = quick(main, "y");
          const scan = art.querySelector(".art-scan")!;
          const sweep = gsap.fromTo(
            scan,
            { xPercent: -140 },
            {
              xPercent: 260,
              duration: 2.2,
              repeat: -1,
              paused: true,
              ease: "power1.inOut",
            },
          );
          const loops: gsap.core.Tween[] = [sweep];
          const gate = art.querySelector(".portal-gate");
          if (gate) {
            loops.push(
              gsap.to(gate, {
                rotation: 180,
                svgOrigin: "365 95",
                duration: 5,
                repeat: -1,
                paused: true,
                ease: "none",
              }),
            );
            const meteor = art.querySelector(".shooting-star")!;
            loops.push(
              gsap.fromTo(
                meteor,
                { x: -110, y: 100, opacity: 0 },
                {
                  x: 420,
                  y: -70,
                  opacity: 1,
                  duration: 1.5,
                  repeat: -1,
                  repeatDelay: 0.7,
                  paused: true,
                  ease: "power2.in",
                },
              ),
            );
          }
          art
            .querySelectorAll<SVGPathElement>(".terrain-trace,.signal-trace")
            .forEach((path) => {
              const length = path.getTotalLength();
              gsap.set(path, {
                strokeDasharray: `${length * 0.32} ${length}`,
                strokeDashoffset: length,
              });
              loops.push(
                gsap.to(path, {
                  strokeDashoffset: -length,
                  duration: 2,
                  repeat: -1,
                  paused: true,
                  ease: "power1.inOut",
                }),
              );
            });
          const bars = art.querySelectorAll(".signal-bars i");
          if (bars.length)
            loops.push(
              gsap.to(bars, {
                scaleY: (i) => [0.28, 1.5, 0.6, 1.25][i % 4],
                transformOrigin: "bottom",
                duration: 0.7,
                stagger: { each: 0.06, repeat: -1, yoyo: true },
                paused: true,
                ease: "sine.inOut",
              }),
            );
          const ping = art.querySelector(".signal-ping");
          if (ping)
            loops.push(
              gsap.fromTo(
                ping,
                { scale: 0.4, opacity: 1 },
                {
                  scale: 5,
                  opacity: 0,
                  svgOrigin: "391 102",
                  duration: 1.5,
                  repeat: -1,
                  paused: true,
                  ease: "power2.out",
                },
              ),
            );
          const enter = () => {
            art.dataset.playing = "true";
            loops.forEach((loop) => loop.play());
          };
          const leave = () => {
            delete art.dataset.playing;
            x(0);
            y(0);
            loops.forEach((loop) => loop.pause());
          };
          listen(card, "pointerenter", enter);
          listen(card, "pointerleave", leave);
          listen(window, "blur", leave);
          listen(card, "focusin", enter);
          listen(card, "focusout", ((event: FocusEvent) => {
            if (!card.contains(event.relatedTarget as Node)) leave();
          }) as EventListener);
          listen(card, "pointermove", ((event: PointerEvent) => {
            const b = card.getBoundingClientRect();
            x(((event.clientX - b.left) / b.width - 0.5) * 35);
            y(((event.clientY - b.top) / b.height - 0.5) * 22);
          }) as EventListener);
          cleanups.push(() => delete art.dataset.playing);
        });

        const molecule = root.querySelector<HTMLElement>(".molecule-visual")!;
        const nodes = [
          ...molecule.querySelectorAll<SVGGElement>("[data-molecule-node]"),
        ];
        const links = [
          ...molecule.querySelectorAll<SVGPathElement>("[data-molecule-link]"),
        ];
        const moleculeState = { x: 0, y: 0, open: 0 };
        const originalNodes = nodes.map((node) =>
          node.getAttribute("transform")!,
        );
        const originalLinks = links.map((link) => link.getAttribute("d")!);
        const drawMolecule = () => {
          nodes.forEach((node, i) => {
            const bx = Number(node.dataset.x),
              by = Number(node.dataset.y);
            const depth = [70, -45, 110][i];
            const nx =
              bx +
              (bx - 220) * moleculeState.open * 0.14 +
              moleculeState.x * depth;
            const ny =
              by +
              (by - 180) * moleculeState.open * 0.13 +
              moleculeState.y * depth * 0.6;
            const scale =
              1 +
              moleculeState.open * 0.04 +
              moleculeState.x * [0.1, -0.12, 0.16][i];
            node.setAttribute(
              "transform",
              `translate(${nx} ${ny}) scale(${scale})`,
            );
            links[i].setAttribute("d", `M220 180L${nx} ${ny}`);
          });
        };
        const mx = gsap.quickTo(moleculeState, "x", {
          duration: 0.65,
          onUpdate: drawMolecule,
          ease: "power3.out",
        });
        const my = gsap.quickTo(moleculeState, "y", {
          duration: 0.65,
          onUpdate: drawMolecule,
          ease: "power3.out",
        });
        const mo = gsap.quickTo(moleculeState, "open", {
          duration: 0.8,
          onUpdate: drawMolecule,
          ease: "power3.out",
        });
        const rings = molecule.querySelector(".molecule-rings")!;
        const ringX = quick(rings, "x"),
          ringY = quick(rings, "y");
        const resetMolecule = () => {
          mx(0);
          my(0);
          mo(0);
          ringX(0);
          ringY(0);
        };
        listen(molecule, "pointerenter", () => mo(1));
        listen(molecule, "pointermove", ((event: PointerEvent) => {
          const b = molecule.getBoundingClientRect();
          const x = (event.clientX - b.left) / b.width - 0.5,
            y = (event.clientY - b.top) / b.height - 0.5;
          mx(x);
          my(y);
          ringX(-x * 40);
          ringY(-y * 28);
        }) as EventListener);
        listen(molecule, "pointerleave", resetMolecule);
        listen(window, "blur", resetMolecule);
        cleanups.push(() => {
          nodes.forEach((node, i) =>
            node.setAttribute("transform", originalNodes[i]),
          );
          links.forEach((link, i) => link.setAttribute("d", originalLinks[i]));
        });

        // Career architecture is a stack of independently suspended planes, linked to the titles.
        const blueprint = root.querySelector<HTMLElement>(".career-blueprint")!;
        const planes = [
          ...blueprint.querySelectorAll<SVGGElement>("[data-career-layer]"),
        ];
        const planeControls = planes.map((plane) => {
          const i = Number(plane.dataset.careerLayer);
          return {
            i,
            x: quick(plane, "x"),
            y: quick(plane, "y"),
            rotation: quick(plane, "rotation"),
          };
        });
        const restPlanes = () =>
          planeControls.forEach((p) => {
            p.x(0);
            p.y(p.i * 85);
            p.rotation(0);
          });
        listen(blueprint, "pointermove", ((event: PointerEvent) => {
          const b = blueprint.getBoundingClientRect();
          const x = (event.clientX - b.left) / b.width - 0.5,
            y = (event.clientY - b.top) / b.height - 0.5;
          planeControls.forEach((p) => {
            const depth = [90, 48, 15][p.i];
            p.x(x * depth);
            p.y(p.i * 85 + y * depth + (p.i - 1) * 20);
            p.rotation(x * (3 - p.i) * 3);
          });
        }) as EventListener);
        listen(blueprint, "pointerleave", restPlanes);
        listen(window, "blur", restPlanes);

        // Continuous scrubbing: cursor position controls globe longitude, ring attitude, and light.
        const planet = root.querySelector<HTMLElement>(".contact-planet")!;
        const surface = planet.querySelector(".planet-surface")!;
        const core = planet.querySelector(".planet-core")!;
        const track = planet.querySelector(".ring-track")!;
        const ring = planet.querySelector(".planet-ring")!;
        gsap.set(core, { transformPerspective: 800 });
        const longitude = quick(surface, "xPercent", 1.2),
          lat = quick(surface, "y", 1);
        const trackRotation = quick(track, "rotation", 1.2),
          attitude = quick(ring, "rotation", 0.9),
          incline = quick(ring, "rotationX", 0.9);
        const coreX = quick(core, "rotationY"),
          coreY = quick(core, "rotationX"),
          coreShift = quick(core, "x");
        let planetX = 0,
          planetY = 0;
        const steerPlanet = () => {
          longitude(-25 + planetX * 45);
          lat(planetY * 18);
          trackRotation(planetX * 500 + planetY * 150);
          attitude(-27 + planetX * 45);
          incline(planetY * 60);
          coreX(planetX * 32);
          coreY(-planetY * 24);
          coreShift(planetX * 18);
          planet.style.setProperty("--planet-light-x", `${28 + planetX * 35}%`);
          planet.style.setProperty("--planet-light-y", `${24 + planetY * 30}%`);
        };
        const restPlanet = () => {
          planetX = 0;
          planetY = 0;
          steerPlanet();
        };
        listen(planet, "pointermove", ((event: PointerEvent) => {
          const b = planet.getBoundingClientRect();
          planetX = (event.clientX - b.left) / b.width - 0.5;
          planetY = (event.clientY - b.top) / b.height - 0.5;
          steerPlanet();
        }) as EventListener);
        listen(planet, "keydown", ((event: KeyboardEvent) => {
          if (
            ![
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "Home",
            ].includes(event.key)
          )
            return;
          event.preventDefault();
          if (event.key === "Home") {
            restPlanet();
            return;
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowRight")
            planetX += event.key === "ArrowLeft" ? -0.15 : 0.15;
          else planetY += event.key === "ArrowUp" ? -0.15 : 0.15;
          planetX = gsap.utils.clamp(-0.6, 0.6, planetX);
          planetY = gsap.utils.clamp(-0.6, 0.6, planetY);
          steerPlanet();
        }) as EventListener);
        listen(planet, "pointerleave", restPlanet);
        listen(planet, "blur", restPlanet);
        listen(window, "blur", restPlanet);
        cleanups.push(() => {
          planet.style.removeProperty("--planet-light-x");
          planet.style.removeProperty("--planet-light-y");
        });

        // Small objects spring forward independently, including the floating labels.
        root
          .querySelectorAll<HTMLElement>(
            ".orbit-label, .hero-spark, .section-spark, .ai-spark, .contact-spark, .planet-spark, .button-mint, .hero-socials a",
          )
          .forEach((element) => {
            const scale = quick(element, "scale", 0.4),
              rotation = quick(element, "rotation", 0.6);
            const baseRotation = Number(gsap.getProperty(element, "rotation"));
            const spark = element.tagName.toLowerCase() === "svg";
            const enter = () => {
              scale(spark ? 1.3 : 1.08);
              rotation(baseRotation + (spark ? 75 : 3));
            };
            const leave = () => {
              scale(1);
              rotation(baseRotation);
            };
            listen(element, "pointerenter", enter);
            listen(element, "pointerleave", leave);
            listen(element, "focus", enter);
            listen(element, "blur", leave);
            listen(window, "blur", leave);
          });

        // Brief, staggered arrivals add depth without running endless background loops.
        gsap.from(".orbit-label", {
          z: 80,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        });
        return () => {
          cleanups.forEach((cleanup) => cleanup());
          delete root.dataset.motion;
        };
      },
      root,
    );
    return () => media.revert();
  }, [enabled]);

  return (
    <div
      ref={scope}
      className="motion-site"
      data-motion-disabled={!enabled || undefined}
    >
      {children}
      <button
        className="motion-toggle"
        type="button"
        aria-pressed={enabled}
        aria-label={
          enabled ? "Turn off interactive motion" : "Turn on interactive motion"
        }
        onClick={() => setEnabled((value) => !value)}
      >
        {enabled ? (
          <FiPause aria-hidden="true" />
        ) : (
          <FiPlay aria-hidden="true" />
        )}{" "}
        Motion {enabled ? "on" : "off"}
      </button>
    </div>
  );
}
