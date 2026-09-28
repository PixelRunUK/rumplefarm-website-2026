"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  { title: "Our soil", text: "Scroll on — this story moves with you, forward and back." },
  { title: "Our animals", text: "Every pixel of motion is tied to your scroll position." },
  { title: "Our table", text: "Scrub back up and the story rewinds with you." },
];

/**
 * Pinned horizontal-scroll section driven entirely by the user's scroll
 * (scrub: true), so it plays forward and backward. Runs in a Client
 * Component; safe for static export because all GSAP work happens in
 * useLayoutEffect after hydration.
 */
export default function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-zinc-950 text-zinc-50">
      <div ref={trackRef} className="flex h-screen w-max items-stretch">
        <div className="flex w-screen shrink-0 flex-col justify-center px-16 sm:px-24">
          <p className="text-sm font-medium uppercase tracking-widest text-lime-300">
            Scroll to explore
          </p>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
            The farm unfolds as you scroll
          </h2>
        </div>
        {PANELS.map((panel) => (
          <div
            key={panel.title}
            className="flex w-screen shrink-0 flex-col justify-center border-l border-white/10 px-16 sm:px-24"
          >
            <h3 className="text-3xl font-semibold sm:text-4xl">{panel.title}</h3>
            <p className="mt-4 max-w-md text-lg leading-8 text-zinc-400">
              {panel.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
