// app/javascript/hero_slides.js
// Pinned Hero (scroll-driven slides + video dim/scale)
// 目的：ぬるっとフェードしつつ、文字はシャープに保つ（blurしない）

function initHeroSlides() {
  const intro = document.querySelector(".intro");
  if (!intro) return;

  const slides = Array.from(intro.querySelectorAll(".slide"));
  if (slides.length === 0) return;
  
  const sticky = intro.querySelector(".intro__sticky") || intro;

  let raf = 0;
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const update = () => {
    raf = 0;

    const rect = intro.getBoundingClientRect();
    const scrollable = intro.offsetHeight - sticky.offsetHeight;

    let progress = 0;
    if (scrollable > 0) {
      progress = clamp((-rect.top) / scrollable, 0, 1);
    }

    // スライド補間（0..(N-1)）
    const t = progress * (slides.length - 1);

    slides.forEach((s, i) => {
      const dist = Math.abs(t - i);

      // dist=0 → 1, dist=1 → 0
      // フェードを“ぬるっと”させるためにeaseをかける
      const raw = clamp(1 - dist, 0, 1);
      const eased = raw * raw * (3 - 2 * raw); // smoothstep(0..1)

      // 文字はシャープに：blurは使わない
      s.style.setProperty("--slide-op", eased.toFixed(4));
      s.style.setProperty("--slide-blur", "0px");

      // ちょいだけ動かす（不要なら 0 にしてOK）
      s.style.setProperty("--slide-y", `${((1 - eased) * 6).toFixed(2)}px`);

      if (eased > 0.6) s.classList.add("is-active");
      else s.classList.remove("is-active");
    });

    // 動画演出：薄くするのはOK、blurは無し（シャープ維持）
    intro.style.setProperty("--intro-dim", (0.22 + progress * 0.50).toFixed(4)); // 0.22 → 0.72
    intro.style.setProperty("--intro-blur", "0px"); // ここ重要：背景もボカさない
    intro.style.setProperty("--intro-scale", (1.03 + progress * 0.02).toFixed(4)); // 1.03 → 1.05
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  update();
}

// Turbolinks対応（Rails 6 + webpacker）
document.addEventListener("turbolinks:load", initHeroSlides);
document.addEventListener("DOMContentLoaded", initHeroSlides);