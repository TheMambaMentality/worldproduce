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

  // --- 設定：ここが“見やすさ”の肝 ---
  // 最後のスライド（提供価値）をどれくらい長く“固定”するか（0.0〜0.35くらいが扱いやすい）
  const END_HOLD = 0.18; // 18%ぶん最後を固定（ここ増やすとさらに長く居座る）

  // スライド間の“スクロール配分”（3スライドならセグメントは2本：0→1, 1→2）
  // 2本目（Slide2→3）を重くして、提供価値に辿り着くまで＆見てる時間を増やす
  const SEG_WEIGHTS = [1.0, 1.6];

  // 進捗(0..1)を、重み付きで t(0..N-1) に変換
  const progressToT = (p) => {
    const n = slides.length;
    if (n === 1) return 0;

    // 末尾ホールド：最後の END_HOLD 区間は t を最後に固定
    if (p >= 1 - END_HOLD) return n - 1;

    // ホールドを除いた範囲で 0..1 に正規化
    const pn = clamp(p / (1 - END_HOLD), 0, 1);

    // ここでは「3スライド前提」でも動くように書いてあるが、
    // SEG_WEIGHTS は (n-1) 本ぶん用意してね（今は3枚なので2本でOK）
    const segCount = n - 1;

    // weights が足りない場合の保険（全部1扱い）
    const weights = Array.from({ length: segCount }, (_, i) => {
      return typeof SEG_WEIGHTS[i] === "number" ? SEG_WEIGHTS[i] : 1.0;
    });

    const total = weights.reduce((a, b) => a + b, 0);
    const thresholds = [];
    let acc = 0;
    for (let i = 0; i < segCount; i++) {
      acc += weights[i] / total;
      thresholds.push(acc);
    }

    // どの区間にいるか判定して、区間内のローカル進捗に変換
    let segIndex = 0;
    while (segIndex < thresholds.length && pn > thresholds[segIndex]) segIndex++;

    const segStart = segIndex === 0 ? 0 : thresholds[segIndex - 1];
    const segEnd = thresholds[segIndex] ?? 1;

    const local = segEnd - segStart > 0 ? (pn - segStart) / (segEnd - segStart) : 0;

    // t は「区間番号 + 区間内進捗」
    return segIndex + clamp(local, 0, 1);
  };

  const update = () => {
    raf = 0;

    const rect = intro.getBoundingClientRect();
    const scrollable = intro.offsetHeight - sticky.offsetHeight;

    let progress = 0;
    if (scrollable > 0) {
      progress = clamp((-rect.top) / scrollable, 0, 1);
    }

    // 重み付き + 末尾ホールドを反映した t
    const t = progressToT(progress);

    slides.forEach((s, i) => {
      const dist = Math.abs(t - i);

      // dist=0 → 1, dist=1 → 0
      // フェードを“知道っと”させるためにeaseをかける
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
    intro.style.setProperty("--intro-blur", "0px"); // 背景もボカさない
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