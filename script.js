const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0, rootMargin: "0px 0px -40px 0px" }
  );

  for (const element of revealElements) {
    observer.observe(element);
  }

  // フォールバック：初期表示エリアの要素を確実に表示
  setTimeout(() => {
    revealElements.forEach(el => {
      if (!el.classList.contains("is-visible")) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      }
    });
  }, 120);
}
