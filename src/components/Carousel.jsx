// ============ Carousel.jsx（介绍轮播 · 卡片式 · 点击放大） ============
import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

// 三张图：intro1 微纳成形制造/光刻 · intro2 我们的工作 · intro3 硬质微粒的微纳成形制造
const slides = [
  {
    img: "/intro/intro1.jpg", // 正方形
    title: "Micro/Nano Forming Manufacturing & Lithography",
    text: "Our research focuses on micro/nano forming manufacturing and advanced lithography, pushing the precision limits of micro fabrication.",
  },
  {
    img: "/intro/intro2.jpg", // 矩形
    title: "Our Work",
    text: "We develop high-precision micro/nano manufacturing methods and processes, connecting fundamental research to practical engineering applications.",
  },
  {
    img: "/intro/intro3.jpg", // 矩形
    title: "Micro/Nano Forming of Hard Particles",
    text: "We study the micro/nano forming manufacturing of hard particles, enabling precise shaping and assembly at the micro scale.",
  },
];

const AUTOPLAY_MS = 8000; // 自动播放 8 秒；改成 0 则只手动切换

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null); // null = 关闭；= 图片地址 = 打开
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    if (AUTOPLAY_MS > 0) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, AUTOPLAY_MS);
    }
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, []);

  // 灯箱打开期间暂停自动播放；按 Esc 关闭灯箱
  useEffect(() => {
    if (lightbox) {
      clearInterval(timerRef.current);
      const onKey = (e) => {
        if (e.key === "Escape") setLightbox(null);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else {
      startTimer();
    }
    // eslint-disable-next-line
  }, [lightbox]);

  const go = (i) =>
    setIndex(((i % slides.length) + slides.length) % slides.length);

  return (
    <>
      <section
        className="ccarousel"
        onMouseEnter={() => clearInterval(timerRef.current)}
        onMouseLeave={startTimer}
      >
        <div
          className="ccarousel-track"
          style={{ transform: "translateX(-" + index * 100 + "%)" }}
        >
          {slides.map((s, i) => (
            <div className="ccarousel-slide" key={i}>
              <article className="ccarousel-card">
                <div className="ccarousel-img" onClick={() => setLightbox(s.img)}>
                  <img
                    src={s.img}
                    alt={s.title}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <span className="ccarousel-zoom">⛶ Click to enlarge</span>
                </div>
                <div className="ccarousel-caption">
                  <h3>{s.title}</h3>
                  <p className="ccarousel-text">{s.text}</p>
                </div>
              </article>
            </div>
          ))}
        </div>

        <button
          className="ccarousel-btn ccarousel-prev"
          onClick={() => go(index - 1)}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="ccarousel-btn ccarousel-next"
          onClick={() => go(index + 1)}
          aria-label="Next"
        >
          ›
        </button>

        <div className="ccarousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={"ccarousel-dot" + (i === index ? " active" : "")}
              onClick={() => go(i)}
              aria-label={"Slide " + (i + 1)}
            />
          ))}
        </div>
      </section>

      {/* 灯箱：点图片放大 */}
      {lightbox && (
        <div className="ccarousel-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Enlarged" />
          <button className="ccarousel-close" onClick={() => setLightbox(null)}>
            ✕
          </button>
        </div>
      )}
    </>
  );
}