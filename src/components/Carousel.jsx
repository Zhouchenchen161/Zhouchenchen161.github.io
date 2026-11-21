// ============ Carousel.jsx（介绍轮播 · 卡片式 · 点击放大） ============
import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

const base = import.meta.env.BASE_URL;

// 六张图：intro1 微纳成形制造/光刻 · intro2 我们的工作 · intro3 硬质微粒的微纳成形制造 · intro4 角蛋白封面 · intro5 AEM封面 · intro6 微载体封面
const slides = [
  {
    img: `${base}intro/intro1.jpg`, // 正方形
    title: "Micro/Nano Forming Manufacturing & Lithography",
    text: "Our research focuses on micro/nano forming manufacturing and advanced lithography, pushing the precision limits of micro fabrication.",
  },
  {
    img: `${base}intro/intro2.jpg`, // 矩形
    title: "Our Work",
    text: "We develop high-precision micro/nano manufacturing methods and processes, connecting fundamental research to practical engineering applications.",
  },
  {
    img: `${base}intro/intro3.jpg`, // 矩形
    title: "Micro/Nano Forming of Hard Particles",
    text: "We study the micro/nano forming manufacturing of hard particles, enabling precise shaping and assembly at the micro scale.",
  },
  {
    img: `${base}intro/intro4.jpg`,
    title: "Cover · Advanced Functional Materials",
    text: "Our work on micro/nanoarchitectonics of ethanol-unfolded keratin for dual-function biodegradable nonwovens was featured as the Cover of Advanced Functional Materials (2026).",
    cover: true,
  },
  {
    img: `${base}intro/intro5.jpg`,
    title: "Cover · Advanced Energy Materials",
    text: "Our work on recyclable, biodegradable pollen-paper triboelectric nanogenerators for sustainable energy harvesting was featured as the Cover of Advanced Energy Materials (2026).",
    cover: true,
  },
  {
    img: `${base}intro/intro6.jpg`,
    title: "Cover · Advanced Functional Materials",
    text: "Our work on microcarriers as a transformative platform for advanced drug delivery was featured as the Cover of Advanced Functional Materials (2026).",
    cover: true,
  },
];

const AUTOPLAY_MS = 8000; // 自动播放 8 秒；改成 0 则只手动切换

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null); // null = 关闭；= 图片地址 = 打开
  const [paused, setPaused] = useState(false); // hover 暂停时，进度条也停住
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    if (AUTOPLAY_MS > 0) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, AUTOPLAY_MS);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setPaused(true);
  };

  const resumeTimer = () => {
    setPaused(false);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, []);

  // 灯箱打开期间暂停自动播放（关闭键盘处理交给下面的 effect）
  useEffect(() => {
    if (lightbox) {
      clearInterval(timerRef.current);
    } else {
      startTimer();
    }
    // eslint-disable-next-line
  }, [lightbox]);

  const go = (i) =>
    setIndex(((i % slides.length) + slides.length) % slides.length);

  const step = (dir) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  // 键盘：← → 翻页，Esc 关灯箱
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox) {
        if (e.key === "Escape") setLightbox(null);
        return;
      }
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <section
        className={"ccarousel" + (paused ? " paused" : "")}
        onMouseEnter={pauseTimer}
        onMouseLeave={resumeTimer}
      >
        <div
          className="ccarousel-track"
          style={{ transform: "translateX(-" + index * 100 + "%)" }}
        >
          {slides.map((s, i) => (
            <div className={"ccarousel-slide" + (i === index ? " active" : "")} key={i}>
              <article className="ccarousel-card">
                <div className="ccarousel-img" onClick={() => setLightbox(s.img)}>
                  <img
                    src={s.img}
                    alt={s.title}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  {s.cover && <span className="ccarousel-tag">Journal Cover</span>}
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

        <span className="ccarousel-count">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

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
            >
              {i === index && AUTOPLAY_MS > 0 && (
                <span
                  key={index}
                  className="ccarousel-fill"
                  style={{ animationDuration: AUTOPLAY_MS + "ms" }}
                />
              )}
            </button>
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