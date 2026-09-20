import { useState } from "react"
import "./News.css"

const base = import.meta.env.BASE_URL

// ★ 以后加新闻：复制一个 { ... } 对象，改 date/type/title/desc/link/img ★
// ★ 图片放 public/news/ 下，命名 news1.jpg news2.jpg ...，与数组顺序对应 ★
const newsItems = [
  {
    date: "2026-09",
    type: "Publication",
    title: "Research Progress: From Natural Pollen to Recyclable Energy Devices — Biodegradable Pollen Paper Enables High-Performance Triboelectric Nanogenerators",
    desc: "Our group published a paper in Advanced Energy Materials on recyclable triboelectric nanogenerators enabled by biodegradable pollen-paper nanoarchitectonics for sustainable energy harvesting.",
    link: "https://mp.weixin.qq.com/s/4v9kl07DotomU2OUrOLRqg",
    img: `${base}news/news3.jpg`,
  },
  {
    date: "2026-08-28",
    type: "Webinar/Live",
    title: "MINE Livestream: Bioinspired Supramolecular Thermistors for High-Resolution Temperature Sensing",
    desc: "Assoc. Prof. Chenchen Zhou hosted Episode 1 of the MINE Young Scientists' Forum (MINE·青年说), an online session on bioinspired supramolecular thermistors and high-resolution temperature sensing.",
    link: "https://mp.weixin.qq.com/s/UFZqX2ONCqHg6sMiKIrrpw",
    img: `${base}news/news1.jpg`,
  },
  {
    date: "2026-08",
    type: "Conference",
    title: "Prof. Chenchen Zhou Attends the 11th Young Scientists Forum of the Chinese Society of Micro/Nano Technology",
    desc: "Prof. Zhou attended the forum and delivered a talk on the group's recent research, introducing the research background, technical approach, and ongoing progress. After the presentation, experts exchanged views on related technical topics, providing valuable insights for the group's further work.",
    link: "https://mp.weixin.qq.com/s/naK1MwnqsCOnX_hHU_aYfQ",
    img: `${base}news/news2.jpg`,
  },
]

function News() {
  const [filter, setFilter] = useState("All")
  const types = ["All", ...new Set(newsItems.map((n) => n.type))]

  const shown =
    filter === "All" ? newsItems : newsItems.filter((n) => n.type === filter)

  return (
    <section className="news-page">
      <div className="news-container">
        <div className="news-heading">
          <p className="section-label">UPDATES</p>
          <h1>News</h1>
          <p className="news-intro">
            Recent talks, livestreams, publications, and announcements from our group.
          </p>
        </div>

        <div className="news-tabs">
          {types.map((t) => (
            <button
              key={t}
              className={"news-tab" + (filter === t ? " active" : "")}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="news-list">
          {shown.map((n, i) => (
            <article className="news-card" key={i}>
              <div className="news-card-inner">
                {n.img ? (
                  <div className="news-thumb">
                    <a href={n.link} target="_blank" rel="noreferrer">
                      <img src={n.img} alt={n.title} loading="lazy" decoding="async" />
                    </a>
                  </div>
                ) : (
                  <div className="news-thumb news-thumb-empty" />
                )}

                <div className="news-body">
                  <div className="news-meta">
                    <span className="news-date">{n.date}</span>
                    <span className="news-type">{n.type}</span>
                  </div>
                  <h3>
                    <a href={n.link} target="_blank" rel="noreferrer">
                      {n.title}
                    </a>
                  </h3>
                  <p className="news-desc">{n.desc}</p>
                  <a className="news-more" href={n.link} target="_blank" rel="noreferrer">
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default News