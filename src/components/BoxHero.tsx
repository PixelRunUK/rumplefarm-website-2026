"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const TRAVEL = 150;
const DURATION = 0.9;
const TYPING_DELAY_MS = 450;
const TYPING_INTERVAL_MS = 60;
const MESSAGE = "all your base r belong...";

/**
 * Click-to-open hero (one way — no close). The lid lifts 150px while the
 * base (+ attached shadow) drops 150px, and a mono h2 types itself into
 * the white gap that opens between them. Further clicks are ignored.
 * GSAP drives `transform`, composing with the `translate`-property offsets
 * of the resting layout (87% lid overlap untouched).
 */
export default function BoxHero() {
  const baseRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLImageElement>(null);
  const openedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [chars, setChars] = useState(0);

  const handleClick = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    setOpen(true);
    gsap.to(lidRef.current, {
      y: -TRAVEL,
      duration: DURATION,
      ease: "power3.inOut",
    });
    gsap.to(baseRef.current, {
      y: TRAVEL,
      duration: DURATION,
      ease: "power3.inOut",
    });
    window.setTimeout(() => setTyping(true), TYPING_DELAY_MS);
  };

  useEffect(() => {
    if (!typing) return;
    if (chars >= MESSAGE.length) return;
    const id = window.setInterval(() => {
      setChars((c) => {
        if (c >= MESSAGE.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, TYPING_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [typing, chars]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={open}
      aria-label={open ? "Box is open" : "Open the box"}
      className="relative block w-[400px] max-w-[80vw] cursor-pointer"
    >
      {/* Base unit: box + shadow move together as one. */}
      <div ref={baseRef}>
        {/* Ground plane (see page history for tuning notes). */}
        <div
          aria-hidden="true"
          className="absolute bottom-[80px] left-1/2 z-0 h-[308px] w-[130%] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_70%)] blur-[8px]"
        />
        <Image
          src="/BlackBox.png"
          alt="Open black box"
          width={861}
          height={959}
          className="relative z-[1] mx-auto block h-auto w-[97%]"
          priority
        />
      </div>
      {/* Typed message, revealed in the gap between lid and base. */}
      <h2
        aria-live="polite"
        className="absolute left-1/2 top-[calc(54%_-_120px)] z-[5] w-max max-w-[90vw] -translate-x-1/2 -translate-y-1/2 font-prompt text-2xl text-black"
      >
        {typing ? MESSAGE.slice(0, chars) : ""}
        {typing && chars < MESSAGE.length ? (
          <span aria-hidden="true" className="ml-0.5 inline-block animate-pulse">
            ▌
          </span>
        ) : null}
      </h2>
      {/* Lid positioning wrapper owns the resting 87% overlap via CSS.
          The Image inside is transform-clean so GSAP tweens exactly
          0 -> -100px (GSAP 3.12+ parses CSS `translate` into its cache,
          which previously made the lid travel ~330px+). */}
      <div className="absolute bottom-full left-0 z-10 w-full translate-y-[87%]">
        <Image
          ref={lidRef}
          src="/BlackBoxLid.png"
          alt="Black box lid"
          width={898}
          height={598}
          className="block h-auto w-full"
          priority
        />
      </div>
    </button>
  );
}
