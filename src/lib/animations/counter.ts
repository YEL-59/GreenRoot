/**
 * Port of jquery.counterup ({ delay: 6, time: 3000 }).
 * Counts every `.counter` from 0 to its value (decimals preserved) when visible.
 */
export function initCounters(root: ParentNode = document, duration = 3000): () => void {
  const counters = Array.from(root.querySelectorAll<HTMLElement>(".counter"));
  if (!counters.length) return () => {};
  const frames: number[] = [];

  const run = (el: HTMLElement) => {
    const target = el.dataset.target ?? el.textContent?.trim() ?? "0";
    el.dataset.target = target;
    const end = parseFloat(target.replace(/,/g, ""));
    if (Number.isNaN(end)) return;
    const decimals = (target.split(".")[1] ?? "").length;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = (end * progress).toFixed(decimals);
      if (progress < 1) frames.push(requestAnimationFrame(tick));
      else el.textContent = target;
    };
    frames.push(requestAnimationFrame(tick));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 1 }
  );

  counters.forEach((el) => observer.observe(el));
  return () => {
    observer.disconnect();
    frames.forEach(cancelAnimationFrame);
    counters.forEach((el) => {
      if (el.dataset.target) el.textContent = el.dataset.target;
    });
  };
}
