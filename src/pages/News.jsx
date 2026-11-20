import { useState } from "react"
import "./News.css"

const base = import.meta.env.BASE_URL

// ★ 以后加新闻：复制一个 { ... } 对象，改 date/type/title/desc/link/img ★
// ★ 日期只写到月，如 "2026-10"；图片放 public/news/ 下，命名 news1.jpg news2.jpg ... ★
const newsItems = [
  {
    date: "2026-11",
    type: "Conference",
    title: "[Exchange · Integration · Development] Prof. Chenchen Zhou Attends the 4th Innovation Forum on Micro/Nano Devices and Systems",
    desc: "Prof. Chenchen Zhou attended the 4th Innovation Forum on Micro/Nano Devices and Systems, exchanging views on micro/nano devices and systems with researchers from academia and industry.",
    link: "https://mp.weixin.qq.com/s/Mhc725EQsrHrxPHCyV8NeQ",
    img: `${base}news/news12.jpg`,
  },
  {
    date: "2026-11",
    type: "Publication",
    title: "[Brief] Max Lab's Pollen-Sculpted Dual-Pore Ceramic Microbead Work Selected as an Advanced Materials Cover Article",
    desc: "Our group's work on pollen-sculpted dual-pore ceramic microbeads for water purification has been selected as a cover article of Advanced Materials.",
    link: "https://mp.weixin.qq.com/s/12a4x2ba1wipQH3LWCGkzQ",
    img: `${base}news/news11.jpg`,
  },
  {
    date: "2026-11",
    type: "Editorial",
    title: "[Brief] Prof. Chenchen Zhou Attends the Communications Materials Senior Editors Meeting",
    desc: "Prof. Chenchen Zhou attended the senior editors' exchange meeting of Communications Materials, discussing journal development and peer-review practice with fellow editors.",
    link: "https://mp.weixin.qq.com/s/eEHBNe5M0-kBMt20zuYUjg",
    img: `${base}news/news10.jpg`,
  },
  {
    date: "2026-11",
    type: "Editorial",
    title: "[Brief] Prof. Chenchen Zhou Appointed to the Young Editorial Board of The Innovation",
    desc: "Prof. Chenchen Zhou of Max Lab has been appointed to the Young Editorial Board of the journal The Innovation.",
    link: "https://mp.weixin.qq.com/s/-5IO5nxpFlVAnm8ecQiBNg",
    img: `${base}news/news9.jpg`,
  },
  {
    date: "2026-10",
    type: "Publication",
    title: "Research Progress: SJTU × NTU — Pollen-Sculpted Dual-Pore Ceramics Turn Liquid Marbles into Water-Purifying Microbeads (Advanced Materials)",
    desc: "Our group, together with SJTU and NTU, reported in Advanced Materials a pollen-templated route to dual-pore ceramic microbeads that operate on liquid marbles for water purification.",
    link: "https://mp.weixin.qq.com/s/tIEF1sTA2PJyqek8a2A19Q",
    img: `${base}news/news8.jpg`,
  },
  {
    date: "2026-10",
    type: "Publication",
    title: "Research Progress: The Energy of a Falling Water Drop, Harvested by Pollen Paper for Electricity Generation",
    desc: "Our group showed how the energy of falling water drops can be harvested with pollen paper for electricity generation, extending pollen-based papers to sustainable energy devices.",
    link: "https://mp.weixin.qq.com/s/itdgYpbMSEj6G2IE0AlSnA",
    img: `${base}news/news7.jpg`,
  },
  {
    date: "2026-10",
    type: "Conference",
    title: "Prof. Chenchen Zhou Attends the 17th International Conference of the Chinese Society of Micro/Nano Technology",
    desc: "Prof. Chenchen Zhou of Max Lab attended the 17th International Conference of the Chinese Society of Micro/Nano Technology, where the group's recent progress was shared and discussed with experts in the field.",
    link: "https://mp.weixin.qq.com/s/N1PqeB2elv9kXdP3fhDYFA",
    img: `${base}news/news5.jpg`,
  },
  {
    date: "2026-10",
    type: "Conference",
    title: "A Topological Journey of “Heat” — Lecture by Academician Qiu",
    desc: "Group members attended Academician Qiu's lecture on the topological journey of heat, which showed how topological ideas can reshape the way we understand and control thermal transport.",
    link: "https://mp.weixin.qq.com/s/4jeEcxHtbru4T4eef6REcQ",
    img: `${base}news/news6.jpg`,
  },
  {
    date: "2026-09",
    type: "Publication",
    title: "[Brief] Max Lab's Latest Paper Selected as Cover Article by Advanced Energy Materials",
    desc: "We just received news from the editorial office of Advanced Energy Materials that our group's latest paper has been selected as the journal's cover article.",
    link: "https://mp.weixin.qq.com/s/1DZkKK9Oh8G3Cy3e2FNrow",
    img: `${base}news/news4.jpg`,
  },
  {
    date: "2026-09",
    type: "Publication",
    title: "Research Progress: From Natural Pollen to Recyclable Energy Devices — Biodegradable Pollen Paper Enables High-Performance Triboelectric Nanogenerators",
    desc: "Our group published a paper in Advanced Energy Materials on recyclable triboelectric nanogenerators enabled by biodegradable pollen-paper nanoarchitectonics for sustainable energy harvesting.",
    link: "https://mp.weixin.qq.com/s/4v9kl07DotomU2OUrOLRqg",
    img: `${base}news/news3.jpg`,
  },
  {
    date: "2026-08",
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