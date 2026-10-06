import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * GSAP effects from function.js:
 *  - `.reveal` image reveal (slide container in, counter-slide the image)
 *  - `.text-anime-style-3` per-character heading animation
 */
export function initGsapEffects(root: ParentNode = document): () => void {
  const splits: SplitText[] = [];

  const ctx = gsap.context(() => {
    /* Image Reveal Animation */
    root.querySelectorAll<HTMLElement>(".reveal").forEach((container) => {
      const image = container.querySelector("img");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: container, toggleActions: "play none none none" },
      });
      tl.set(container, { autoAlpha: 1 });
      tl.from(container, { duration: 1, xPercent: -100, ease: "power2.out" });
      if (image) {
        tl.from(image, { duration: 1, xPercent: 100, scale: 1, delay: -1, ease: "power2.out" });
      }
    });

    /* Text Effect Animation (style 3) */
    root.querySelectorAll<HTMLElement>(".text-anime-style-3").forEach((element) => {
      const split = new SplitText(element, { type: "lines,words,chars", linesClass: "split-line" });
      splits.push(split);
      gsap.set(element, { perspective: 400 });
      gsap.set(split.chars, { opacity: 0, x: "50" });
      gsap.to(split.chars, {
        scrollTrigger: { trigger: element, start: "top 90%" },
        x: "0",
        y: "0",
        rotateX: "0",
        opacity: 1,
        duration: 1,
        ease: "back.out",
        stagger: 0.02,
      });
    });
  });

  return () => {
    ctx.revert();
    splits.forEach((s) => s.revert());
  };
}
