/**
 * Port of the skill-bar waypoint (offset 70%).
 * When `.skills-progress-bar-gold` reaches 70% of the viewport, each
 * `.skillbar-gold .count-bar-gold` animates to its `data-percent` width.
 */
export function initSkillBars(root: ParentNode = document): () => void {
  const wrappers = Array.from(root.querySelectorAll<HTMLElement>(".skills-progress-bar-gold"));
  if (!wrappers.length) return () => {};

  const fillAll = () => {
    root.querySelectorAll<HTMLElement>(".skillbar-gold").forEach((bar) => {
      const fill = bar.querySelector<HTMLElement>(".count-bar-gold");
      if (!fill) return;
      fill.style.transition = "width 2s ease-in-out";
      fill.style.width = bar.dataset.percent ?? "0%";
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        fillAll();
        observer.disconnect();
      }
    },
    { rootMargin: "0px 0px -30% 0px" }
  );

  wrappers.forEach((w) => observer.observe(w));
  return () => observer.disconnect();
}
