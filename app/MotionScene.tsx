"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { FiPause, FiPlay } from "react-icons/fi";
import {
  nodeAngles,
  orbitPath,
  orbitPoint,
  project,
  restingView,
} from "./lib/orbits";

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
          depth: 5 + (index % 4) * 7,
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
            star.y(y * star.depth);
            star.scale(1 + proximity * 2.7);
          });
        }) as EventListener);
        listen(hero, "pointerleave", resetHero);
        listen(window, "blur", resetHero);

        // Project copy and controls stay fixed; only the illustration is animated.
        root.querySelectorAll<HTMLElement>(".work-card").forEach((card) => {
          const art = card.querySelector<SVGSVGElement>(".work-art svg")!;
          const x = quick(art, "x"),
            y = quick(art, "y"),
            scale = quick(art, "scale");
          const details = [...art.querySelectorAll("circle")];
          const pulses = details.map((circle, index) =>
            gsap.to(circle, {
              scale: 1.3,
              transformOrigin: "50% 50%",
              duration: 1.1 + index * 0.12,
              repeat: -1,
              yoyo: true,
              paused: true,
              ease: "sine.inOut",
            }),
          );
          const lines = art.querySelectorAll("path");
          const flow = gsap.to(lines, {
            strokeDashoffset: -60,
            duration: 3,
            repeat: -1,
            paused: true,
            ease: "none",
          });
          const enter = () => {
            scale(1.045);
            pulses.forEach((t) => t.play());
            flow.play();
          };
          const leave = () => {
            x(0);
            y(0);
            scale(1);
            pulses.forEach((t) => t.pause(0));
            flow.pause(0);
          };
          listen(card, "pointerenter", enter);
          listen(card, "pointermove", ((event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();
            x(((event.clientX - bounds.left) / bounds.width - 0.5) * 22);
            y(((event.clientY - bounds.top) / bounds.height - 0.5) * 14);
          }) as EventListener);
          listen(card, "pointerleave", leave);
          listen(window, "blur", leave);
        });

        // Project 3D orbital coordinates into SVG so near moons grow and far ones recede.
        root
          .querySelectorAll<HTMLElement>("[data-orbital-scene]")
          .forEach((scene) => {
            const view = { ...restingView };
            const rings = [
              ...scene.querySelectorAll<SVGPathElement>("[data-orbit]"),
            ];
            const nodes = [
              ...scene.querySelectorAll<SVGGElement>("[data-orbit-node]"),
            ];
            const links = [
              ...scene.querySelectorAll<SVGPathElement>("[data-orbit-link]"),
            ];
            const dust = [
              ...scene.querySelectorAll<SVGCircleElement>("[data-orbit-dust]"),
            ];
            // Restore attributes as well as tween state when motion is disabled.
            const attributes = [...rings, ...nodes, ...links, ...dust].map(
              (el) => ({
                el,
                values: [...el.attributes]
                  .filter((a) =>
                    ["d", "transform", "opacity", "cx", "cy", "r"].includes(
                      a.name,
                    ),
                  )
                  .map((a) => [a.name, a.value]),
              }),
            );
            const draw = () => {
              rings.forEach((ring, i) =>
                ring.setAttribute("d", orbitPath(i, view)),
              );
              nodes.forEach((node, i) => {
                const point = project(orbitPoint(nodeAngles[i], i), view);
                node.setAttribute(
                  "transform",
                  `translate(${point.x} ${point.y}) scale(${point.scale})`,
                );
                node.setAttribute(
                  "opacity",
                  String(0.55 + Math.min(1, point.scale) * 0.45),
                );
                links[i].setAttribute("d", `M220 190L${point.x} ${point.y}`);
              });
              dust.forEach((dot, i) => {
                const point = project(orbitPoint(i * 0.73, i % 3), view);
                dot.setAttribute("cx", String(point.x));
                dot.setAttribute("cy", String(point.y));
                dot.setAttribute("r", String(2 * point.scale));
              });
            };
            const pitch = gsap.quickTo(view, "pitch", {
              duration: 0.85,
              ease: "power3.out",
              onUpdate: draw,
            });
            const yaw = gsap.quickTo(view, "yaw", {
              duration: 0.85,
              ease: "power3.out",
              onUpdate: draw,
            });
            const spread = gsap.quickTo(view, "spread", {
              duration: 0.85,
              ease: "power3.out",
              onUpdate: draw,
            });
            const enter = () => spread(1.16);
            const leave = () => {
              pitch(restingView.pitch);
              yaw(restingView.yaw);
              spread(1);
            };
            listen(scene, "pointerenter", enter);
            listen(scene, "pointermove", ((event: PointerEvent) => {
              const b = scene.getBoundingClientRect();
              yaw(
                restingView.yaw +
                  ((event.clientX - b.left) / b.width - 0.5) * 2.4,
              );
              pitch(
                restingView.pitch -
                  ((event.clientY - b.top) / b.height - 0.5) * 1.7,
              );
            }) as EventListener);
            listen(scene, "pointerleave", leave);
            listen(scene, "focus", enter);
            listen(scene, "blur", leave);
            listen(window, "blur", leave);
            listen(scene, "keydown", ((event: KeyboardEvent) => {
              if (
                ![
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                  "Enter",
                  "Escape",
                ].includes(event.key)
              )
                return;
              event.preventDefault();
              if (event.key === "Escape") leave();
              else if (event.key === "Enter")
                spread(view.spread > 1.08 ? 1 : 1.16);
              else if (event.key === "ArrowLeft" || event.key === "ArrowRight")
                yaw(view.yaw + (event.key === "ArrowLeft" ? -0.4 : 0.4));
              else pitch(view.pitch + (event.key === "ArrowUp" ? -0.3 : 0.3));
            }) as EventListener);
            cleanups.push(() =>
              attributes.forEach(({ el, values }) => {
                el.removeAttribute("opacity");
                values.forEach(([key, value]) => el.setAttribute(key, value));
              }),
            );
          });

        // A textured globe and orbiting ring markers make the rotation visible.
        const planet = root.querySelector<HTMLElement>(".contact-planet")!;
        const surface = planet.querySelector(".planet-surface")!;
        const track = planet.querySelector(".ring-track")!;
        const spin = gsap.to(surface, {
          xPercent: -50,
          duration: 9,
          repeat: -1,
          ease: "none",
          paused: true,
        });
        const ringSpin = gsap.to(track, {
          rotation: 360,
          duration: 5,
          repeat: -1,
          ease: "none",
          paused: true,
        });
        const ring = planet.querySelector(".planet-ring")!;
        const ringX = quick(ring, "rotationX"),
          ringY = quick(ring, "rotationY");
        const stopPlanet = () => {
          spin.pause();
          ringSpin.pause();
          ringX(0);
          ringY(0);
        };
        listen(planet, "pointerenter", () => {
          spin.play();
          ringSpin.play();
        });
        listen(planet, "pointermove", ((event: PointerEvent) => {
          const b = planet.getBoundingClientRect();
          ringX(((event.clientY - b.top) / b.height - 0.5) * 35);
          ringY(((event.clientX - b.left) / b.width - 0.5) * 35);
        }) as EventListener);
        listen(planet, "pointerleave", stopPlanet);
        listen(window, "blur", stopPlanet);
        listen(planet, "focus", () => {
          spin.play();
          ringSpin.play();
        });
        listen(planet, "blur", stopPlanet);

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
