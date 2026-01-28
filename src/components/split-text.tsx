"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  threshold?: number;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  startDelay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  className = "",
  delay = 40,
  duration = 0.6, // ms between chars/elements
  ease = "power3.out",
  onLetterAnimationComplete,
  startDelay = 0,
  text,
  textAlign = "center",
  threshold = 0.1,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // We manually split into words, then chars to emulate the "chars" split type
  // This avoids the proprietary/flaky GSAP SplitText plugin
  const words = useMemo(() => {
    return text.split(" ").map((word) => {
      return word.split("");
    });
  }, [text]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Ensure container is visible when animation starts logic
      gsap.set(el, { visibility: "visible" });

      const chars = el.querySelectorAll(".split-char");

      const startPct = (1 - threshold) * 100;
      // parse rootMargin roughly or just use what passed
      // For simplicity in this manual implementation, we use the string directly or a sensible default if complex

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 40,
          willChange: "transform, opacity",
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          ease: ease,
          stagger: delay / 1000,
          delay: startDelay / 1000,
          scrollTrigger: {
            trigger: el,
            start: `top ${startPct}%`, // Simplified trigger
            toggleActions: "play none none none",
            once: true,
          },
          onComplete: () => {
            gsap.set(chars, { clearProps: "willChange" });
            onLetterAnimationComplete?.();
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [
    text,
    delay,
    duration,
    ease,
    startDelay,
    threshold,
    onLetterAnimationComplete,
  ]);

  return (
    <p
      aria-label={text}
      className={`split-parent inline-block ${className}`}
      ref={containerRef}
      style={{ textAlign, wordWrap: "break-word", visibility: "hidden" }}
    >
      {words.map((wordChars, wordIndex) => (
        <span
          className="inline-block whitespace-nowrap"
          key={`word-${wordIndex}`}
        >
          {wordChars.map((char, charIndex) => (
            <span
              className="split-char inline-block"
              key={`char-${wordIndex}-${charIndex}`}
            >
              {char}
            </span>
          ))}
          {/* Add space after word if it's not the last one */}
          {wordIndex < words.length - 1 && (
            <span className="split-char inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </p>
  );
};

export { SplitText };
