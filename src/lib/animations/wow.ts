/**
 * Port of WOW.js (boxClass "wow", animateClass "animated").
 * Hides `.wow` elements, then plays their animate.css animation
 * (e.g. `fadeInUp`) once they scroll into view.
 */
export function initWow(root: ParentNode = document): () => void {
  const boxes = Array.from(root.querySelectorAll<HTMLElement>(".wow:not(.animated)"));
  if (!boxes.length) return () => {};

  const animationName = (el: HTMLElement) =>
    Array.from(el.classList).find((c) => c !== "wow" && /^(fade|zoom|slide|bounce|flip|rotate)/.test(c)) ?? "";

  boxes.forEach((el) => {
    el.style.visibility = "hidden";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const name = animationName(el);
        el.style.visibility = "visible";
        if (el.dataset.wowDelay) el.style.animationDelay = el.dataset.wowDelay;
        if (el.dataset.wowDuration) el.style.animationDuration = el.dataset.wowDuration;
        el.style.animationName = "none";
        // force reflow so the animation restarts reliably
        void el.offsetWidth;
        el.style.animationName = name;
        el.classList.add("animated");
        observer.unobserve(el);
      });
    },
    { threshold: 0 }
  );

  boxes.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
