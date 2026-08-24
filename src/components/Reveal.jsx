import { useState, useEffect, useRef } from 'react';

/* Scroll-triggered rise, matching the treatment case-study images already use
   (AnimatedImage in CaseStudyScreenAlt): 28px up, 0.7s ease, fired once when
   the element comes into view.

   `delay` staggers siblings — pass the index times ~70ms for a grid so cards
   arrive in sequence rather than all at once.

   Renders a plain <div> wrapper, so pass `style` when it needs to participate
   in a parent grid or flex row. */
export function Reveal({ children, delay = 0, y = 28, style, as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Reduced motion: show everything immediately, never animate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) show(); },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.08 }
    );

    /* Backstop for the observer. It only reports when intersection *changes*,
       so a hard jump down a long page — anchor link, End key, a fast flick —
       takes an element from below the fold to above it as false → false and
       never fires, stranding it invisible. A cheap geometric check catches
       anything that has reached or passed the viewport. */
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) show();
    };

    obs.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <Tag
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: reduced ? 'none' : `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
