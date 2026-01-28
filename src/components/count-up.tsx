"use client";

import { useMemo } from "react";
import ReactCountUp, { type CountUpProps } from "react-countup";

// Default cubic-out easing for a smooth, eye-pleasing finish.
function easeOutCubic(t: number, b: number, c: number, d: number): number {
  t /= d;
  t -= 1;
  return c * (t * t * t + 1) + b;
}

// CountUp component with sensible animation defaults.
export function CountUp({
  // Small pause before animation starts to improve perceived performance.
  delay = 0.2,
  // Pleasant, not too slow nor too fast default animation duration.
  duration = 1.2,
  // Allow consumers to override easing but fall back to our cubic-out.
  easingFn,
  // Start animating when the component enters the viewport.
  enableScrollSpy = true,
  // Keep default of 0 to start immediately after entering.
  scrollSpyDelay = 0,
  // Only animate once per mount; prevents repeated counting when scrolling.
  scrollSpyOnce = true,
  // Use easing by default.
  useEasing = true,
  ...rest
}: CountUpProps) {
  const resolvedEasing = useMemo(() => easingFn ?? easeOutCubic, [easingFn]);

  return (
    <ReactCountUp
      delay={delay}
      duration={duration}
      easingFn={resolvedEasing}
      enableScrollSpy={enableScrollSpy}
      scrollSpyDelay={scrollSpyDelay}
      scrollSpyOnce={scrollSpyOnce}
      useEasing={useEasing}
      {...rest}
    />
  );
}
