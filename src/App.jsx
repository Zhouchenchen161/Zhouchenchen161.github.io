import { useEffect, useLayoutEffect, useState } from 'react'

import './App.css'
import Carousel from './components/Carousel'
import Header from './components/Header'
import MobileMenu from './components/MobileMenu'
import Research from './pages/Research'
import News from './pages/News'

// 所有合法页面名
const PAGES = ['home', 'about', 'research', 'people', 'publications', 'news', 'gallery', 'positions', 'contact']

// 从地址栏 #/xxx 读取当前页；读不到或非法就回首页
const getPageFromHash = () => {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return PAGES.includes(hash) ? hash : 'home'
}

// 主题带上岗位名，方便筛选申请邮件
const applyLink = (role) =>
  `mailto:chenchen.zhou@sjtu.edu.cn?subject=${encodeURIComponent(`${role} — Max Lab, SJTU`)}`

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState(getPageFromHash)
  const [peopleTab, setPeopleTab] = useState('phd')
  const [galleryTab, setGalleryTab] = useState('academic')
  const [coverZoom, setCoverZoom] = useState(null)

  // 滚动淡入：进入视口才显示，同一组内依次错开
  useLayoutEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll(
        '.sel-card, .pub-full-list li, .about-item, .pub-list li, .position-list li, .person-card, .gallery-card, .news-card, .contact-block p, .pos-card, .pos-stat, .pos-areas li'
      )
    )
    if (!nodes.length) return

    const revealNow = () => nodes.forEach((n) => n.classList.add('rv-in'))
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      revealNow()
      return
    }

    const orderByParent = new Map()
    nodes.forEach((node) => {
      const i = orderByParent.get(node.parentElement) || 0
      orderByParent.set(node.parentElement, i + 1)
      node.style.setProperty('--d', Math.min(i, 7) * 0.07 + 's')
      node.classList.add('rv')
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rv-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [page, peopleTab, galleryTab])

  // 封面灯箱：Esc 关闭
  useEffect(() => {
    if (!coverZoom) return
    const onKey = (e) => {
      if (e.key === 'Escape') setCoverZoom(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [coverZoom])

  // 浏览器前进/后退/直接输入网址时，跟着地址栏切页
  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash())
      setMenuOpen(false)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // 点导航 = 改地址栏，切页交给上面的 hashchange 处理
  const openPage = (pageName) => {
    window.location.hash = pageName === 'home' ? '/' : '/' + pageName
  }

  const base = import.meta.env.BASE_URL

  const people = {
    phd: [
      { name: 'Wenying Zhou', cn: '周文英', role: 'PhD · 2026', img: base + 'photos/people/person1.jpg' },
      { name: 'Mo Jun Hao', cn: 'Mo Jun Hao', role: 'PhD · Co-supervised · 2026', img: base + 'photos/people/person2.jpg' },
      { name: 'Hanna Kim', cn: 'Hanna Kim', role: 'PhD · Co-supervised · 2025', img: base + 'photos/people/person3.jpg' },
      { name: 'Dingxuan Wang', cn: '王鼎轩', role: 'PhD · 2027', img: base + 'photos/people/person11.jpg' },
    ],
    master: [
      { name: 'Xinyue Zhang', cn: '张馨月', role: 'Master · Co-supervised · 2026', img: base + 'photos/people/person4.jpg' },
      { name: 'Jiwon Lee', cn: 'Jiwon Lee', role: 'Master · Co-supervised · 2026', img: base + 'photos/people/person5.jpg' },
    ],
    undergrad: [
      { name: 'Wenbo Li', cn: '李文博', role: 'Undergraduate · 2024', img: base + 'photos/people/person6.jpg' },
      { name: 'SoonMin Kwon', cn: 'SoonMin Kwon', role: 'Undergraduate · 2023', img: base + 'photos/people/person7.jpg' },
      { name: 'Tan Yi Hao', cn: 'Tan Yi Hao', role: 'Undergraduate · 2024', img: base + 'photos/people/person8.jpg' },
    ],
    assistant: [
      { name: '刘杰', cn: '刘杰', role: 'Research Assistant', img: base + 'photos/people/person9.jpg' },
      { name: '张婷', cn: '张婷', role: 'Research Assistant', img: base + 'photos/people/person10.jpg' },
    ],
  }

  const gallery = {
    academic: [
      { img: 'photos/academic/academic1.jpg', cap: 'Introducing research achievements to visiting exchange students' },
      { img: 'photos/academic/academic2.jpg', cap: 'Group photo with exchange students' },
      { img: 'photos/academic/academic3.jpg', cap: 'Answering questions from exchange students on site' },
      { img: 'photos/academic/academic4.jpg', cap: 'Group photo with Prof. Cho Nam-Joon\u2019s team' },
      { img: 'photos/academic/academic5.jpg', cap: 'Sharing research experience at Westlake University' },
      { img: 'photos/academic/academic6.jpg', cap: 'Giving an academic talk' },
      { img: 'photos/academic/academic7.jpg', cap: 'With my supervisor Prof. Cho Nam-Joon in the lab' },
      { img: 'photos/academic/academic8.jpg', cap: 'Attending AKC 2022' },
    ],
    sports: [
      { img: 'photos/sports/sports1.jpg', cap: 'NTU basketball team group photo' },
      { img: 'photos/sports/sports2.jpg', cap: 'SJTU dragon boat race group photo' },
      { img: 'photos/sports/sports3.jpg', cap: 'Friendly basketball match group photo' },
      { img: 'photos/sports/sports4.jpg', cap: 'NTU basketball team winning silver medal' },
    ],
    life: [
      { img: 'photos/life/life1.jpg', cap: 'Embracing the sea' },
      { img: 'photos/life/life2.jpg', cap: 'Blue coastline' },
      { img: 'photos/life/life3.jpg', cap: 'Watching the sunrise' },
      { img: 'photos/life/life4.jpg', cap: 'Photo with a robot dog' },
      { img: 'photos/life/life5.jpg', cap: 'Checking in at a Singapore landmark' },
    ],
  }

  const heroStats = [
    { value: '04', label: 'journal covers in 2026' },
    { value: '04', label: 'research areas' },
    { value: '11', label: 'patents & applications' },
    { value: '2027/28', label: 'PhD & master intake' },
  ]

  return (
    <main>
      <Header openPage={openPage} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} openPage={openPage} />

      {page === 'home' && (
        <>
          <Carousel />

          <section className="hero-text">
            <p className="hero-kicker">Shanghai Jiao Tong University · Max Lab</p>
            <h1 className="hero-title">
              <span className="hero-line">
                <span>Chenchen Zhou</span>
              </span>
            </h1>

            <p className="position">
              Associate Professor · PhD Supervisor
              <br />
              National High-Level Young Talent
              <br />
              School of Mechanical Engineering
              <br />
              Shanghai Jiao Tong University
            </p>

            <div className="hero-stats">
              {heroStats.map((s) => (
                <div className="hero-stat" key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <button type="button" className="hero-btn primary" onClick={() => openPage('publications')}>
                Selected Publications
              </button>
              <button type="button" className="hero-btn ghost" onClick={() => openPage('contact')}>
                Contact
              </button>
            </div>

            <p className="hero-brief">
              Our group works on micro/nano forming manufacturing and advanced lithography,
              multiscale metamaterial resonators, semiconductor and microchip materials and
              devices, and biomimetic materials, microfluidics, liquid marbles,
              superhydrophobicity, and recyclable, degradable, and ceramic materials.
              We welcome students with backgrounds in mechanics, materials, physics,
              optics, electronics, chemistry, and computer science.
            </p>
          </section>
        </>
      )}

      {page === 'about' && (
        <section className="page-section">
          <h1>About</h1>

          <div className="about-section">
            <h2>Educational Background</h2>
            <div className="about-item">
              <span className="about-year">2017 – 2022</span>
              <span className="about-item-text">
                Ph.D., School of Mechanical Engineering, <strong>Tsinghua University</strong>
              </span>
            </div>
            <div className="about-item">
              <span className="about-year">2013 – 2017</span>
              <span className="about-item-text">
                B.E., College of Engineering, <strong>China Agricultural University</strong>
              </span>
            </div>
          </div>

          <div className="about-section">
            <h2>Professional Experience</h2>
            <div className="about-item">
              <span className="about-year">2026 – Present</span>
              <span className="about-item-text">
                Tenure-Track Associate Professor, School of Mechanical Engineering, <strong>Shanghai Jiao Tong University</strong>
              </span>
            </div>
            <div className="about-item">
              <span className="about-year">2022 – 2026</span>
              <span className="about-item-text">
                Postdoctoral Researcher, School of Materials Science and Engineering, <strong>Nanyang Technological University</strong>
              </span>
            </div>
          </div>

          <div className="about-section">
            <h2>Patents and Applications</h2>
            <ol className="pub-list">
              <li>Man Jia, Zhou Chenchen, Li Jianyong, et al. <em>Device and method for preparing porous alumina microfibers based on a microfluidic chip</em> [P]. CN113233916B, 2022-03-11 (Granted invention patent).</li>
              <li>Man Jia, Zhou Chenchen, Wu Min, et al. <em>Size-specific ceramic microparticles using a microfluidic chip, and their preparation device, method, and applications</em> [P]. CN112829038B, 2022-03-08 (Granted invention patent).</li>
              <li>Man Jia, Zhou Chenchen, Yu Haibo, et al. <em>Device, method, and applications for preparing alumina microfibers using a microfluidic chip</em> [P]. CN112408949B, 2021-12-28 (Granted invention patent).</li>
              <li>Man Jia, Zhou Chenchen, Man Luming, et al. <em>Crescent-shaped and deformed ceramic microparticles, and their preparation method, applications, and preparation device</em> [P]. CN112452251B, 2021-12-14 (Granted invention patent).</li>
              <li>Xu Liming, Zhou Chenchen, Pi Miaomiao, et al. <em>Needle-suction precision maize seed metering device</em> [P]. CN112616377B, 2021-10-12 (Granted invention patent).</li>
              <li>Man Jia, Zhou Chenchen, Man Luming, et al. <em>Device, method, and applications for preparing crescent-shaped ceramic particles based on a microfluidic chip</em> [P]. CN111978073B, 2021-07-06 (Granted invention patent).</li>
              <li>N. Cho, C. Zhou. <em>Bio-inspired tear-shaped alveolar sac model using pollen-based microspheres and dripping printing</em>. US10202502851Q, 2026. (In process)</li>
              <li>Cui Tao, Yin Xiaowei, Zhang Dongxing, Zhou Chenchen, et al. <em>Anti-tilting spoon-type precision maize seed metering device and its seeding method</em> [P]. CN201610459068.5, 2018-02-13 (Granted invention patent).</li>
              <li>Cui Tao, Han Dandan, Yin Xiaowei, Zhang Dongxing, Zhou Chenchen, et al. <em>Airflow-assisted internal seed-filling seed metering device with adjustable nozzle and its regulation method</em> [P]. CN201610806754.5, 2018-10-23 (Granted invention patent).</li>
              <li>Zhang Dongxing, Yin Xiaowei, Han Dandan, Li Kehong, He Xiantao, Yang Li, Cui Tao, Zhou Chenchen, et al. <em>Universal profiling seeding unit and method for replacing seed metering devices of different structural types</em> [P]. CN201610361999.1, 2017-10-20 (Granted invention patent).</li>
              <li>Xu Liming, Duan Zhuangzhuang, Zhou Chenchen, et al. <em>Indoor single-plant grape disease image acquisition device</em> [P]. CN201720967371.6, 2018-04-17 (Granted utility model patent).</li>
            </ol>
          </div>

                   <div className="about-section">
            <h2>Other Professional Activities</h2>
            <ul className="position-list">
              <li><strong>2026 – Present</strong> · Young Editorial Board Member, <em>Nano-Micro Letters</em> · <em>The Innovation</em> · <em>Advanced Bionics</em></li>
              <li><strong>2026 – Present</strong> · Fixed Member, State Key Laboratory of Micro/Nano Engineering Science</li>
              <li><strong>2026 – Present</strong> · Senior Member, Chinese Mechanical Engineering Society · Chinese Society of Micro/Nano Technology</li>
              <li><strong>2025 – Present</strong> · Committee Member, Particle Preparation and Processing Committee, Chinese Society of Particuology</li>
              <li>Reviewer for journals including <em>Advanced Materials</em>, <em>Advanced Functional Materials</em>, <em>Applied Materials Today</em>, <em>Heliyon</em>, <em>Scientific Reports</em>, <em>Journal of Nanoparticle Research</em>, etc.</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Honors and Awards</h2>
            <ul className="position-list">
              <li>2026 · National High-Level Young Talent Program</li>
              <li>2022 · Sailing Award</li>
              <li>2021 · Lushan Talent</li>
              <li>2017 · Beijing Outstanding Graduate</li>
              <li>2017 · Self-Strength Star</li>
              <li>2015 · National Scholarship</li>
            </ul>
          </div>
        </section>
      )}

      {page === 'research' && <Research />}

      {page === 'news' && <News />}

      {page === 'people' && (
        <section className="page-section">
          <h1>People</h1>

          <div className="people-tabs">
            <button
              className={peopleTab === 'phd' ? 'people-tab active' : 'people-tab'}
              onClick={() => setPeopleTab('phd')}
            >
              PhD
            </button>
            <button
              className={peopleTab === 'master' ? 'people-tab active' : 'people-tab'}
              onClick={() => setPeopleTab('master')}
            >
              Master
            </button>
            <button
              className={peopleTab === 'undergrad' ? 'people-tab active' : 'people-tab'}
              onClick={() => setPeopleTab('undergrad')}
            >
              Undergraduate
            </button>
            <button
              className={peopleTab === 'assistant' ? 'people-tab active' : 'people-tab'}
              onClick={() => setPeopleTab('assistant')}
            >
              Research Assistant
            </button>
          </div>

          <div className="people-grid">
            {people[peopleTab].map((p) => (
              <div className="person-card" key={p.name}>
                <img src={p.img} alt={p.name} className="person-avatar" loading="lazy" decoding="async" />
                <h3>{p.name}</h3>
                {p.cn !== p.name && <p className="person-cn">{p.cn}</p>}
                <p className="person-role">{p.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === 'publications' && (
        <section className="page-section">
          <h1>Publications</h1>

          <p className="pub-intro">
            Publications from our group in advanced manufacturing, micro/nano
            fabrication, functional materials, and biomedical engineering.
          </p>

          <div className="pub-linkrow">
            <a
              className="pub-link"
              href="https://scholar.google.com/citations?user=vnR2fa8AAAAJ&hl=en"
              target="_blank"
              rel="noreferrer"
            >
              Google Scholar
            </a>
          </div>

          <h2>Selected Publications</h2>

          <div className="pub-selected">
            <article className="sel-card">
              <button
                type="button"
                className="sel-cover is-figure"
                onClick={() => setCoverZoom({ src: base + 'covers/afm-pollen-paper.jpg', alt: 'Advanced Functional Materials graphical abstract' })}
                aria-label="Enlarge the Advanced Functional Materials figure"
              >
                <img src={base + 'covers/afm-pollen-paper.jpg'} alt="Advanced Functional Materials graphical abstract" loading="lazy" decoding="async" />
              </button>
              <div className="sel-body">
                <span className="sel-badge">Advanced Functional Materials · 2026</span>
                <h3>
                  <a href="https://doi.org/10.1002/adfm.79211" target="_blank" rel="noreferrer">
                    Pollen-Derived Paper for Sustainable Droplet Energy Harvesting
                  </a>
                </h3>
                <p className="sel-authors">
                  Z. Guo†, C. Zhou†*, H. Wang, J. Li, J. Deng, Y. Huang, X. Pu*, M. Kim*, N.-j. Cho*
                </p>
              </div>
            </article>

            <article className="sel-card">
              <button
                type="button"
                className="sel-cover"
                onClick={() => setCoverZoom({ src: base + 'news/news11.jpg', alt: 'Advanced Materials cover' })}
                aria-label="Enlarge the Advanced Materials cover"
              >
                <img src={base + 'news/news11.jpg'} alt="Advanced Materials cover" loading="lazy" decoding="async" />
              </button>
              <div className="sel-body">
                <span className="sel-badge is-cover">Advanced Materials · 2026 · Cover</span>
                <h3>
                  <a href="https://doi.org/10.1002/adma.75433" target="_blank" rel="noreferrer">
                    Pollen-Engraved Dual Porosity Ceramic Beads from Liquid Marbles for Environmental Remediation
                  </a>
                </h3>
                <p className="sel-authors">
                  C. Zhou†*, J.H. Mo†, Z. Guo, Y. Xu, H. Kim, J. Li, M.S. Ibrahim, M. Kim, B.P. Binks, N.-j. Cho*
                </p>
              </div>
            </article>

            <article className="sel-card">
              <button
                type="button"
                className="sel-cover"
                onClick={() => setCoverZoom({ src: base + 'intro/intro5.jpg', alt: 'Advanced Energy Materials cover' })}
                aria-label="Enlarge the Advanced Energy Materials cover"
              >
                <img src={base + 'intro/intro5.jpg'} alt="Advanced Energy Materials cover" loading="lazy" decoding="async" />
              </button>
              <div className="sel-body">
                <span className="sel-badge is-cover">Advanced Energy Materials · 2026 · Cover</span>
                <h3>
                  <a href="https://doi.org/10.1002/aenm.71517" target="_blank" rel="noreferrer">
                    Recyclable, Biodegradable Pollen-Paper Triboelectric Nanogenerators for Sustainable Energy Harvesting
                  </a>
                </h3>
                <p className="sel-authors">C. Zhou†, Z. Guo†, J.H. Mo, L. Yang, H. Wang, D.S.B. Anugrah, M. Kim*, D. Sun*, N.-j. Cho*</p>
              </div>
            </article>

            <article className="sel-card">
              <button
                type="button"
                className="sel-cover is-figure"
                onClick={() => setCoverZoom({ src: base + 'covers/nc-ceramic.jpg', alt: 'Nature Communications graphical abstract' })}
                aria-label="Enlarge the Nature Communications figure"
              >
                <img src={base + 'covers/nc-ceramic.jpg'} alt="Nature Communications graphical abstract" loading="lazy" decoding="async" />
              </button>
              <div className="sel-body">
                <span className="sel-badge">Nature Communications · 2024</span>
                <h3>
                  <a href="https://doi.org/10.1038/s41467-024-53016-8" target="_blank" rel="noreferrer">
                    One-pot microfluidic fabrication of micro ceramic particles
                  </a>
                </h3>
                <p className="sel-authors">C. Zhou, S. Liang, B. Qi, C. Liu, N.-j. Cho*</p>
              </div>
            </article>

            <article className="sel-card">
              <button
                type="button"
                className="sel-cover is-figure"
                onClick={() => setCoverZoom({ src: base + 'covers/mt-lithography.webp', alt: 'Materials Today graphical abstract' })}
                aria-label="Enlarge the Materials Today figure"
              >
                <img src={base + 'covers/mt-lithography.webp'} alt="Materials Today graphical abstract" loading="lazy" decoding="async" />
              </button>
              <div className="sel-body">
                <span className="sel-badge">Materials Today · 2023</span>
                <h3>
                  <a href="https://doi.org/10.1016/j.mattod.2023.05.009" target="_blank" rel="noreferrer">
                    Microparticles by microfluidic lithography
                  </a>
                </h3>
                <p className="sel-authors">C. Zhou*, Y. Cao, C. Liu, W. Guo*</p>
              </div>
            </article>
          </div>

          <div className="pub-years">
          <h2>Complete Publication Record</h2>

            <div className="pub-yeargroup">
              <h3 className="pub-year">2026</h3>
              <ul className="pub-full-list">
                <li>Z. Guo†, C. Zhou†*, H. Wang, J. Li, J. Deng, Y. Huang, X. Pu*, M. Kim*, N.-j. Cho*. <a href="https://doi.org/10.1002/adfm.79211" target="_blank" rel="noreferrer">Pollen-Derived Paper for Sustainable Droplet Energy Harvesting</a>. <em>Advanced Functional Materials</em>, e79211 (2026).</li>
                <li>C. Zhou†*, J.H. Mo†, Z. Guo, Y. Xu, H. Kim, J. Li, M.S. Ibrahim, M. Kim, B.P. Binks, N.-j. Cho*. <a href="https://doi.org/10.1002/adma.75433" target="_blank" rel="noreferrer">Pollen-Engraved Dual Porosity Ceramic Beads from Liquid Marbles for Environmental Remediation</a>. <em>Advanced Materials</em>, e75433 (2026). Cover.</li>
                <li>C. Zhou†, Z. Guo†, J.H. Mo, L. Yang, H. Wang, D.S.B. Anugrah, M. Kim*, D. Sun*, N.-j. Cho*. <a href="https://doi.org/10.1002/aenm.71517" target="_blank" rel="noreferrer">Recyclable, Biodegradable Pollen-Paper Triboelectric Nanogenerators for Sustainable Energy Harvesting</a>. <em>Advanced Energy Materials</em>, 16(40) (2026) e71517. Cover.</li>
                <li>J. Li†, C. Zhou†, J.H. Mo†, R. Ni, J. Lee, C.H. Teo, Z. Guo, H. Kim, M.S. Ibrahim, B.P. Binks, N.-j. Cho*. <a href="https://doi.org/10.1021/acssuschemeng.6c04002" target="_blank" rel="noreferrer">Engineering Tunable Biomimetic Superhydrophobic Surfaces from Natural Spiky Pollen</a>. <em>ACS Sustainable Chemistry &amp; Engineering</em>, 14(33) (2026) 14720-14732.</li>
                <li>Z. Guo, J. Deng, Y. Xu, C. Zhou, Y. Shao, X. Pu, M. Kim*, N.-j. Cho*. <a href="https://doi.org/10.1002/advs.202521235" target="_blank" rel="noreferrer">A pollen-enhanced bionic mechanoreceptor induced by asymmetric ionic convection in hydrogel for sensory-augmented prostheses</a>. <em>Advanced Science</em>, 13 (2026) 2521235.</li>
                <li>C. Zhou, H. Kim, J.H. Mo, J.Z. Wong, Z. Guo, R. Ni, P. Kim, M.S. Ibrahim, M.F. Abdullah, S.M. Kwon, X. Zhang, N.-j. Cho*. <a href="https://doi.org/10.1002/adfm.75781" target="_blank" rel="noreferrer">Microcarriers: A Transformative Platform for Advanced Drug Delivery</a>. <em>Advanced Functional Materials</em>, e75781 (2026). Cover.</li>
                <li>R. Ni, Q. Deng, J. Zhang, Q. Ke, C. Zhou*, N.-j. Cho*, Y. Zhao*. <a href="https://doi.org/10.1002/adfm.202530114" target="_blank" rel="noreferrer">Micro/nanoarchitectonics of ethanol-unfolded keratin for dual-function biodegradable nonwovens</a>. <em>Advanced Functional Materials</em>, e30114 (2026). Cover.</li>
              </ul>
            </div>

            <div className="pub-yeargroup">
              <h3 className="pub-year">2025</h3>
              <ul className="pub-full-list">
                <li>Y. Cao, C. Zhou, W. Zhou, C. Shen, B. Jin, H. Qiu*, W. Guo*. <a href="https://doi.org/10.1021/jacs.5c00480" target="_blank" rel="noreferrer">High-efficiency charge transfer between water and two-dimensional insulating materials</a>. <em>Journal of the American Chemical Society</em>, 147(16) (2025).</li>
                <li>J. Deng, Z. Zhao, A. Ahmad, J. Li, Y.H. Choe, Y.C. Lin, S.I. Mohammed, C. Zhou, N.-j. Cho*. <a href="https://doi.org/10.1002/adma.202515030" target="_blank" rel="noreferrer">Reprogrammable dual-regulated pollen actuators for geometric encoding</a>. <em>Advanced Materials</em>, e15030 (2025).</li>
                <li>M.S. Ibrahim, A.R. Ferhan, C. Zhou, J. Li, Y.C. Lin, J. Deng, Z. Zhao, N.J. Cho. <a href="https://doi.org/10.1016/j.addr.2025.115643" target="_blank" rel="noreferrer">Allergen to asset: Pollen-based drug delivery systems</a>. <em>Advanced Drug Delivery Reviews</em>, 224 (2025) 115643.</li>
                <li>C. Liu, K. Du, C. Song, Y. Song, C. Zhou, et al. <a href="https://doi.org/10.1016/j.ceramint.2025.01.500" target="_blank" rel="noreferrer">Fast deposition of Ni doped YSZ coatings by cathode plasma electrolysis for solid oxide fuel cell applications</a>. <em>Ceramics International</em>, 2025.</li>
              </ul>
            </div>

            <div className="pub-yeargroup">
              <h3 className="pub-year">2024</h3>
              <ul className="pub-full-list">
                <li>C. Zhou, S. Liang, B. Qi, C. Liu, N.-j. Cho*. <a href="https://doi.org/10.1038/s41467-024-53016-8" target="_blank" rel="noreferrer">One-pot microfluidic fabrication of micro ceramic particles</a>. <em>Nature Communications</em>, 15(1) (2024).</li>
                <li>J. Li, J. Deng, C. Zhou, J. Yang, S. Shin, B.P. Binks, N.-J. Cho. <a href="https://doi.org/10.1002/smll.202409136" target="_blank" rel="noreferrer">Biomimetic superhydrophobic surfaces by nanoarchitectonics with natural sunflower pollen</a>. <em>Small</em>, (2024) 2409136. Cover.</li>
                <li>C. Zhou, J. Deng, T.J. Hao, S. Basu, J. Yang, J. Li, C. Yang, Z. Zhao*, N.-j. Cho*. <a href="https://doi.org/10.1146/annurev-chembioeng-101121-085959" target="_blank" rel="noreferrer">Multifunctional Material Building Blocks from Plant Pollen</a>. <em>Annual Review of Chemical and Biomolecular Engineering</em>, 15 (2024).</li>
              </ul>
            </div>

            <div className="pub-yeargroup">
              <h3 className="pub-year">2023</h3>
              <ul className="pub-full-list">
                <li>C. Zhou*, Y. Cao, C. Liu, W. Guo*. <a href="https://doi.org/10.1016/j.mattod.2023.05.009" target="_blank" rel="noreferrer">Microparticles by microfluidic lithography</a>. <em>Materials Today</em>, 67 (2023) 178-202.</li>
                <li>C. Liu, Y. Gong, Y. Wang, C. Zhou, J. Zhang, Y. Tian, Y. Meng. <a href="https://doi.org/10.1016/j.surfcoat.2023.129833" target="_blank" rel="noreferrer">Preparation and characterization of wear resistant TiO layer on Ti alloy</a>. <em>Surface and Coatings Technology</em>, 470 (2023).</li>
              </ul>
            </div>

            <div className="pub-yeargroup">
              <h3 className="pub-year">2022</h3>
              <ul className="pub-full-list">
                <li>C. Zhou, S. Liang, Y. Li, J. Li, H. Chen*. <a href="https://doi.org/10.1021/acsami.1c21408" target="_blank" rel="noreferrer">Microfluidic assembly of micro-blocks into interlocked structures for enhanced strength and toughness</a>. <em>ACS Applied Materials &amp; Interfaces</em>, 14 (2022) 7261-7269. Cover invitation.</li>
                <li>C. Zhou, J. Man*, J. Li, B. Qi, Z. Hua, C. Liu, M. Zhang, J. Li. <a href="https://doi.org/10.1016/j.ceramint.2022.06.053" target="_blank" rel="noreferrer">Double UV Lights Intersection Shaping for Bowl-shaped Ceramic Microparticles Based on Microfluidics</a>. <em>Ceramics International</em>, 2022.</li>
                <li>C. Zhou, H. Jia, S. Liang*, Y. Li, J. Li, H. Chen*. <a href="https://doi.org/10.1002/pol.20210953" target="_blank" rel="noreferrer">Tailoring 3D Shapes of Polyhedral Microparticles by Adjusting Orthogonal Projection in a Microfluidic Channel</a>. <em>Journal of Polymer Science</em>, 2022.</li>
                <li>J. Man, L. Man, C. Zhou, et al. <a href="https://doi.org/10.3390/bios12050294" target="_blank" rel="noreferrer">A facile single-phase-fluid-driven bubble microfluidic generator for potential detection of viruses suspended in air</a>. <em>Biosensors</em>, 2022.</li>
                <li>Z. Hua, J. Man, G. Liu, J. Li, C. Zhou, et al. <a href="https://doi.org/10.1021/acs.langmuir.2c01460" target="_blank" rel="noreferrer">Complex suspended Janus droplets constructed through solvent evaporation-induced phase separation at the air-liquid interface</a>. <em>Langmuir</em>, 2022.</li>
              </ul>
            </div>

            <div className="pub-yeargroup">
              <h3 className="pub-year">2021</h3>
              <ul className="pub-full-list">
                <li>C. Zhou, S. Liang, Y. Li, H. Chen, J. Li*. <a href="https://doi.org/10.1039/d1lc00807b" target="_blank" rel="noreferrer">Sharp-edged 3D microparticles fabrication in folded PDMS microchannels</a>. <em>Lab on a Chip</em>, 22 (2021) 148-155.</li>
                <li>C. Zhou, J. Man*, H. Yu, L. Man, B. Qi, J. Li. <a href="https://doi.org/10.1016/j.jeurceramsoc.2021.08.039" target="_blank" rel="noreferrer">Fabrication of weaved ceramic mesh from green microfibers based on cross-flow microfluidics</a>. <em>Journal of the European Ceramic Society</em>, 41(15) (2021) 7744-7751.</li>
                <li>C. Zhou, J. Man*, H. Yu, H. Xia, L. Man, B. Qi, J. Li. <a href="https://doi.org/10.1016/j.ceramint.2020.12.204" target="_blank" rel="noreferrer">Fabrication of crescent-shaped ceramic microparticles based on single emulsion microfluidics</a>. <em>Ceramics International</em>, 47(8) (2021) 10866-10872.</li>
                <li>B. Qi, S. Liang, Y. Li, C. Zhou, et al. <a href="https://doi.org/10.1002/adem.202101278" target="_blank" rel="noreferrer">ZrO2 matrix toughened ceramic material: toughness mechanisms, methods, and prevailing applications</a>. <em>Advanced Engineering Materials</em>, 2021.</li>
              </ul>
            </div>

            <div className="pub-yeargroup">
              <h3 className="pub-year">2020</h3>
              <ul className="pub-full-list">
                <li>H. Chen†, C. Zhou†, Y. Li, et al. <a href="https://doi.org/10.1038/s41598-020-74252-0" target="_blank" rel="noreferrer">Dielectric tetrahedrons as terahertz resonators switched from perfect absorber to reflector</a>. <em>Scientific Reports</em>, 10(1) (2020).</li>
                <li>S. Liang, L. Shen, C. Zhou, et al. <a href="https://doi.org/10.1016/j.ceramint.2020.02.227" target="_blank" rel="noreferrer">Scalable preparation of hollow ZrO2 microspheres through a liquid-liquid phase reunion assisted sol-gel method</a>. <em>Ceramics International</em>, 46(9) (2020) 14188-14194.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {page === 'gallery' && (
        <section className="page-section">
          <h1>Gallery</h1>

          <div className="gallery-tabs">
            <button
              className={galleryTab === 'academic' ? 'gallery-tab active' : 'gallery-tab'}
              onClick={() => setGalleryTab('academic')}
            >
              Academic
            </button>
            <button
              className={galleryTab === 'sports' ? 'gallery-tab active' : 'gallery-tab'}
              onClick={() => setGalleryTab('sports')}
            >
              Sports
            </button>
            <button
              className={galleryTab === 'life' ? 'gallery-tab active' : 'gallery-tab'}
              onClick={() => setGalleryTab('life')}
            >
              Personal Life
            </button>
          </div>

          <div className="gallery-grid">
            {gallery[galleryTab].map((item) => (
              <figure className="gallery-card" key={item.img}>
                <button
                  type="button"
                  className="gallery-open"
                  onClick={() => setCoverZoom({ src: base + item.img, alt: item.cap })}
                  aria-label={`Enlarge photo: ${item.cap}`}
                >
                  <img src={base + item.img} alt={item.cap} className="gallery-photo" loading="lazy" decoding="async" />
                </button>
                <figcaption className="gallery-caption">{item.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {page === 'positions' && (
        <section className="page-section">
          <h1>Open Positions</h1>
          <p>
            Two full-time postdoctoral positions and several research assistant positions are open now, and
            master&apos;s and Ph.D. seats for the 2027 and 2028 intakes are available as well. Undergraduates
            who want to start with an internship are welcome.
          </p>

          <div className="pos-strip">
            <div className="pos-stat">
              <strong>02</strong>
              <span>full-time postdocs</span>
            </div>
            <div className="pos-stat">
              <strong>RAs</strong>
              <span>research assistants, several seats</span>
            </div>
            <div className="pos-stat">
              <strong>2027/28</strong>
              <span>master &amp; Ph.D. intakes</span>
            </div>
            <div className="pos-stat">
              <strong>04</strong>
              <span>research directions</span>
            </div>
          </div>

          <h2>Research directions</h2>
          <ol className="pos-areas">
            <li>
              <span>01</span>Micropillar-array metamaterials
            </li>
            <li>
              <span>02</span>Key components for advanced lithography tools
            </li>
            <li>
              <span>03</span>Micro/nano fabrication technology
            </li>
            <li>
              <span>04</span>Bio-inspired materials, microfluidics, degradable materials
            </li>
          </ol>

          <div className="pos-cards">
            <article className="pos-card">
              <span className="pos-tag">Full-time · 2 seats</span>
              <h3>Postdoctoral researcher</h3>
              <p>
                A Ph.D. in mechanical engineering, optics, materials, instrumentation, chemistry, physics or a
                related field. Hands-on work in micro/nano manufacturing, metamaterials or precision metrology
                is a plus.
              </p>
              <a className="pos-cta" href={applyLink('Postdoc application')}>
                Email your CV
              </a>
            </article>

            <article className="pos-card">
              <span className="pos-tag">Full-time · several seats</span>
              <h3>Research assistant</h3>
              <p>
                Open to bachelor&apos;s and master&apos;s graduates. Strong hands-on ability and a willingness to
                stay in the lab long term count for more than your transcript.
              </p>
              <a className="pos-cta" href={applyLink('Research assistant application')}>
                Email your CV
              </a>
            </article>

            <article className="pos-card">
              <span className="pos-tag">2027 &amp; 2028 intake</span>
              <h3>Ph.D. and master&apos;s students</h3>
              <p>
                Seats are open in all four directions above. Applicants from mechanics, materials, physics,
                optics, electronics, chemistry or computer science backgrounds can apply.
              </p>
              <a className="pos-cta" href={applyLink('Graduate application')}>
                Email your transcript
              </a>
            </article>

            <article className="pos-card">
              <span className="pos-tag">Rolling</span>
              <h3>Undergraduate intern</h3>
              <p>
                Start with a summer project or a graduation thesis and decide later. Interns usually end up
                working on one of the four directions above.
              </p>
              <a className="pos-cta" href={applyLink('Undergraduate internship')}>
                Ask about a project
              </a>
            </article>
          </div>

          <p className="pos-note">
            Postdocs and research assistants should generally be under 35 and able to work full time. For every
            role, including interns, we look for people who are still a little stubborn about hard problems.
          </p>
        </section>
      )}

      {page === 'contact' && (
        <section className="page-section">
          <h1>Contact</h1>
          <div className="contact-block">
            <p>📧 <strong>Email:</strong> <a href="mailto:chenchen.zhou@sjtu.edu.cn" className="contact-link">chenchen.zhou@sjtu.edu.cn</a></p>
            <p>📞 <strong>Phone:</strong> 021-34208629</p>
            <p>🏢 <strong>Institute:</strong> Institute of Manufacturing Technology and Equipment Automation</p>
            <p>📍 <strong>Address:</strong> <a href="https://uri.amap.com/search?keyword=%E4%B8%8A%E6%B5%B7%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6%E9%97%B5%E8%A1%8C%E6%A0%A1%E5%8C%BA" target="_blank" rel="noreferrer" className="contact-link">Room A732, School of Mechanical Engineering, Shanghai Jiao Tong University, 800 Dongchuan Road, Minhang District, Shanghai, China</a></p>
          </div>
        </section>
      )}
      {coverZoom && (
        <div className="sel-lightbox" onClick={() => setCoverZoom(null)}>
          <img src={coverZoom.src} alt={coverZoom.alt} />
          <button type="button" className="lightbox-close" onClick={() => setCoverZoom(null)} aria-label="Close">
            ✕
          </button>
        </div>
      )}
    </main>
  )
}

export default App
