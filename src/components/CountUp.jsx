import { useState, useEffect, useRef } from 'react';

/* Splits "12+" into { number: 12, suffix: "+" } so the digits can count
   while any trailing symbol stays put. */
function parseValue(value) {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) return { number: null, suffix: '' };
  return { number: Number(match[1]), suffix: match[2] || '' };
}

/* Counts from 0 to the target once the element scrolls into view.
   Eases out so it decelerates into the final figure instead of
   stopping dead. Non-numeric values render as-is. */
export function CountUp({ value, duration = 1400 }) {
  const { number, suffix } = parseValue(value);
  const [display, setDisplay] = useState(number === null ? value : 0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (number === null) return;

    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(number);
      return;
    }

    let frame;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        // easeOutExpo — fast out of the gate, gentle landing
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setDisplay(Math.round(eased * number));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [number, duration]);

  return <span ref={ref}>{number === null ? value : `${display}${suffix}`}</span>;
}
