// app/javascript/hero_slides.js
// Pinned Hero (scroll-driven slides + video fade/blur)

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
  
      // introの先頭が画面上端に来たら progress=0
      // introをスクロールし切ったら progress=1
      let progress = 0;
      if (scrollable > 0) {
        progress = clamp((-rect.top) / scrollable, 0, 1);
      }
  
      // スライド補間（0..(N-1)）
      const t = progress * (slides.length - 1);
  
      slides.forEach((s, i) => {
        const dist = Math.abs(t - i);
        const op = clamp(1 - dist, 0, 1);
  
        // CSS変数で滑らかに制御（クロスフェード＋ブラー＋Y）
        s.style.setProperty("--slide-op", op.toFixed(4));
        s.style.setProperty("--slide-blur", `${((1 - op) * 10).toFixed(2)}px`);
        s.style.setProperty("--slide-y", `${((1 - op) * 12).toFixed(2)}px`);
  
        // クリックできるのは主に見えてるやつだけ
        if (op > 0.5) s.classList.add("is-active");
        else s.classList.remove("is-active");
      });
  
      // 動画演出（スクロールで薄く＋ブラー）
      // dim: 0.25 → 0.80 くらい
      intro.style.setProperty("--intro-dim", (0.25 + progress * 0.55).toFixed(4));
      // blur: 0px → 8px
      intro.style.setProperty("--intro-blur", `${(progress * 8).toFixed(2)}px`);
      // scale: 1.03 → 1.05
      intro.style.setProperty("--intro-scale", (1.03 + progress * 0.02).toFixed(4));
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
  // 念のため
  document.addEventListener("DOMContentLoaded", initHeroSlides);