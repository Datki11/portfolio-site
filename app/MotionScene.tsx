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
            depth: 35,
          },
          {
            element: root.querySelector<HTMLElement>(".orbit-label-bottom")!,
            depth: 48,
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
        const resetHero = () => {
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
          layers.forEach((layer) => {
            layer.x(x * layer.depth);
            layer.y(y * layer.depth);
          });
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

        // Tilt large surfaces, while the illustration and copy sit at different depths.
        root
          .querySelectorAll<HTMLElement>(
            ".work-card, .stack-visual, .ai-note, .impact-strip > div, .timeline-item, .education-note, .contact-planet",
          )
          .forEach((element) => {
            gsap.set(element, { transformPerspective: 1000 });
            const rx = quick(element, "rotationX"),
              ry = quick(element, "rotationY"),
              lift = quick(element, "y");
            const artwork = element.querySelector(
              ".work-art svg, .planet-ring",
            );
            const artX = artwork ? quick(artwork, "x", 0.85) : null;
            const artY = artwork ? quick(artwork, "y", 0.85) : null;
            let bounds: DOMRect;
            const reset = () => {
              rx(0);
              ry(0);
              lift(0);
              artX?.(0);
              artY?.(0);
              element.style.removeProperty("--light-x");
              element.style.removeProperty("--light-y");
            };
            listen(element, "pointerenter", () => {
              bounds = element.getBoundingClientRect();
              lift(-5);
            });
            listen(element, "pointermove", ((event: PointerEvent) => {
              if (event.pointerType !== "mouse" || !bounds) return;
              const x = Math.max(
                0,
                Math.min(1, (event.clientX - bounds.left) / bounds.width),
              );
              const y = Math.max(
                0,
                Math.min(1, (event.clientY - bounds.top) / bounds.height),
              );
              rx((0.5 - y) * 9);
              ry((x - 0.5) * 10);
              artX?.((x - 0.5) * 16);
              artY?.((y - 0.5) * 12);
              element.style.setProperty("--light-x", `${x * 100}%`);
              element.style.setProperty("--light-y", `${y * 100}%`);
            }) as EventListener);
            listen(element, "pointerleave", reset);
            listen(window, "blur", reset);
            cleanups.push(() => {
              element.style.removeProperty("--light-x");
              element.style.removeProperty("--light-y");
            });
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
