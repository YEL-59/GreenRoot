/**
 * Port of Parallaxie ({ speed: 0.55, offset: 0 }), desktop only (> 1024px).
 */
export function initParallax(root: ParentNode = document, speed = 0.55, offset = 0): () => void {
  if (typeof window === "undefined" || window.innerWidth <= 1024) return () => {};
  const items = Array.from(root.querySelectorAll<HTMLElement>(".parallaxie"));
  if (!items.length) return () => {};

  const update = () => {
    items.forEach((el) => {
      const top = el.getBoundingClientRect().top; // == offset().top - scrollTop()
      const posY = offset + top * (1 - speed);
      el.style.backgroundPosition = `center ${posY}px`;
    });
  };

  items.forEach((el) => {
    el.style.backgroundSize = "cover";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundAttachment = "fixed";
  });
  update();
  window.addEventListener("scroll", update, { passive: true });

  return () => window.removeEventListener("scroll", update);
}
