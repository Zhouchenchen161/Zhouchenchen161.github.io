import { useState } from 'react'

import './App.css'
import Carousel from './components/Carousel'
import Header from './components/Header'
import MobileMenu from './components/MobileMenu'
import Research from './pages/Research'
import News from './pages/News'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('home')
  const [peopleTab, setPeopleTab] = useState('phd')
  const [galleryTab, setGalleryTab] = useState('academic')

  const openPage = (pageName) => {
    setPage(pageName)
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  const base = import.meta.env.BASE_URL

  const people = {
    phd: [
      { name: 'Wenying Zhou', cn: '周文英', role: 'PhD', img: base + 'photos/people/person1.jpg' },
      { name: 'Mo Jun Hao', cn: 'Mo Jun Hao', role: 'PhD · Co-supervised', img: base + 'photos/people/person2.jpg' },
      { name: 'Hanna Kim', cn: 'Hanna Kim', role: 'PhD · Co-supervised', img: base + 'photos/people/person3.jpg' },
    ],
    master: [
      { name: 'Xinyue Zhang', cn: '张馨月', role: 'Master · Co-supervised', img: base + 'photos/people/person4.jpg' },
      { name: 'Jiwon Lee', cn: 'Jiwon Lee', role: 'Master · Co-supervised', img: base + 'photos/people/person5.jpg' },
    ],
    undergrad: [
      { name: 'Wenbo Li', cn: '李文博', role: 'Undergraduate', img: base + 'photos/people/person6.jpg' },
      { name: 'SoonMin Kwon', cn: 'SoonMin Kwon', role: 'Undergraduate', img: base + 'photos/people/person7.jpg' },
      { name: 'Tan Yi Hao', cn: 'Tan Yi Hao', role: 'Undergraduate', img: base + 'photos/people/person8.jpg' },
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

  return (
    <main>
      <Header openPage={openPage} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} openPage={openPage} />

      {page === 'home' && (
        <>
          <Carousel />

          <section className="hero-text">
            <h1>Chenchen Zhou</h1>

            <p className="position">
              Associate Professor · PhD Supervisor
              <br />
              National High-Level Young Talent
              <br />
              School of Mechanical Engineering
              <br />
              Shanghai Jiao Tong University
            </p>

            <p className="hero-brief">
              Our group works on ultraviolet/laser micro-nano fabrication, semiconductor
              and micro-nano materials and devices, microfluidics, liquid marbles,
              biomimetic and superhydrophobic surfaces, and recyclable/ceramic materials.
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
                Long-term Associate Professor, School of Mechanical Engineering, <strong>Shanghai Jiao Tong University</strong>
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
              <li>Man Jia, Zhou Chenchen, Li Jianyong, et al. <em>Device and method for preparing porous alumina microfibers based on a microfluidic chip</em> [P]. CN113233916B, 2022-03-11.</li>
              <li>Man Jia, Zhou Chenchen, Wu Min, et al. <em>Size-specific ceramic microparticles using a microfluidic chip, and their preparation device, method, and applications</em> [P]. CN112829038B, 2022-03-08.</li>
              <li>Man Jia, Zhou Chenchen, Yu Haibo, et al. <em>Device, method, and applications for preparing alumina microfibers using a microfluidic chip</em> [P]. CN112408949B, 2021-12-28.</li>
              <li>Man Jia, Zhou Chenchen, Man Luming, et al. <em>Crescent-shaped and deformed ceramic microparticles, and their preparation method, applications, and preparation device</em> [P]. CN112452251B, 2021-12-14.</li>
              <li>Xu Liming, Zhou Chenchen, Pi Miaomiao, et al. <em>Needle-suction precision maize seed metering device</em> [P]. CN112616377B, 2021-10-12.</li>
              <li>Man Jia, Zhou Chenchen, Man Luming, et al. <em>Device, method, and applications for preparing crescent-shaped ceramic particles based on a microfluidic chip</em> [P]. CN111978073B, 2021-07-06.</li>
              <li>N. Cho, C. Zhou. <em>Bio-inspired tear-shaped alveolar sac model using pollen-based microspheres and dripping printing</em>. US10202502851Q, 2026. (In process)</li>
              <li>Cui Tao, Yin Xiaowei, Zhang Dongxing, Zhou Chenchen, et al. <em>Anti-tilting spoon-type precision maize seed metering device and its seeding method</em> [P]. CN201610459068.5, 2018-02-13.</li>
              <li>Cui Tao, Han Dandan, Yin Xiaowei, Zhang Dongxing, Zhou Chenchen, et al. <em>Airflow-assisted internal seed-filling seed metering device with adjustable nozzle and its regulation method</em> [P]. CN201610806754.5, 2018-10-23.</li>
              <li>Zhang Dongxing, Yin Xiaowei, Han Dandan, Li Kehong, He Xiantao, Yang Li, Cui Tao, Zhou Chenchen, et al. <em>Universal profiling seeding unit and method for replacing seed metering devices of different structural types</em> [P]. CN201610361999.1, 2017-10-20.</li>
              <li>Xu Liming, Duan Zhuangzhuang, Zhou Chenchen, et al. <em>Indoor single-plant grape disease image acquisition device</em> [P]. CN201720967371.6, 2018-04-17.</li>
            </ol>
          </div>

          <div className="about-section">
            <h2>Other Professional Activities</h2>
            <ul className="position-list">
              <li><strong>2026 – Present</strong> · Senior Member, Chinese Society of Micro/Nano Technology</li>
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
              <span className="sel-badge">Advanced Energy Materials · 2026</span>
              <h3>
                <a href="https://doi.org/10.1002/aenm.71517" target="_blank" rel="noreferrer">
                  Recyclable Triboelectric Nanogenerators Enabled by Biodegradable Pollen-Paper Nanoarchitectonics for Sustainable Energy Harvesting
                </a>
              </h3>
              <p className="sel-authors">C. Zhou, Z. Guo, J.H. Mo, L. Yang, H. Wang, D.S.B. Anugrah, M. Kim*, D. Sun*, N.J. Cho*</p>
            </article>

            <article className="sel-card">
              <span className="sel-badge">Nature Communications · 2024</span>
              <h3>
                <a href="https://doi.org/10.1038/s41467-024-53016-8" target="_blank" rel="noreferrer">
                  One-pot microfluidic fabrication of micro ceramic particles
                </a>
              </h3>
              <p className="sel-authors">C. Zhou, S. Liang, B. Qi, C. Liu, N.-j. Cho*</p>
            </article>

            <article className="sel-card">
              <span className="sel-badge">Materials Today · 2023</span>
              <h3>
                <a href="https://doi.org/10.1016/j.mattod.2023.05.009" target="_blank" rel="noreferrer">
                  Microparticles by microfluidic lithography
                </a>
              </h3>
              <p className="sel-authors">C. Zhou*, Y. Cao, C. Liu, W. Guo*</p>
            </article>

            <article className="sel-card">
              <span className="sel-badge">Advanced Functional Materials · 2026</span>
              <h3>
                <a href="https://doi.org/10.1002/adfm.75781" target="_blank" rel="noreferrer">
                  Microcarriers: A Transformative Platform for Advanced Drug Delivery
                </a>
              </h3>
              <p className="sel-authors">
                C. Zhou, H. Kim, J.H. Mo, J.Z. Wong, Z. Guo, R. Ni, P. Kim, M.S. Ibrahim,
                M.F. Abdullah, S.M. Kwon, X. Zhang, N.-j. Cho*
              </p>
            </article>

            <article className="sel-card">
              <span className="sel-badge">Annual Review of Chemical and Biomolecular Engineering · 2024</span>
              <h3>
                <a href="https://doi.org/10.1146/annurev-chembioeng-101121-085959" target="_blank" rel="noreferrer">
                  Multifunctional Material Building Blocks from Plant Pollen
                </a>
              </h3>
              <p className="sel-authors">
                C. Zhou, J. Deng, T.J. Hao, S. Basu, J. Yang, J. Li, C. Yang, Z. Zhao*, N.-j. Cho*
              </p>
            </article>
          </div>

          <h2>Complete Publication Record</h2>

          <div className="pub-years">
            <div className="pub-yeargroup">
              <h3 className="pub-year">2026</h3>
              <ul className="pub-full-list">
                <li>C. Zhou, Z. Guo, J.H. Mo, L. Yang, H. Wang, D.S.B. Anugrah, M. Kim*, D. Sun*, N.J. Cho*. <a href="https://doi.org/10.1002/aenm.71517" target="_blank" rel="noreferrer">Recyclable Triboelectric Nanogenerators Enabled by Biodegradable Pollen-Paper Nanoarchitectonics for Sustainable Energy Harvesting</a>. <em>Advanced Energy Materials</em>, 2026.</li>
                <li>J. Li†, C. Zhou†, J.H. Mo†, M.S. Ibrahim, J. Lee, C.H. Teo, R. Ni, H. Kim, Z. Guo, B.P. Binks, N.-j. Cho*. <a href="https://doi.org/10.1021/acssuschemeng.6c04002" target="_blank" rel="noreferrer">Engineering Tunable Biomimetic Superhydrophobic Surfaces from Natural Spiky Pollen</a>. <em>ACS Sustainable Chemistry &amp; Engineering</em>, 2026.</li>
                <li>Z. Guo, J. Deng, Y. Xu, C. Zhou, Y. Shao, X. Pu, M. Kim*, N.-j. Cho*. <a href="https://doi.org/10.1002/advs.202521235" target="_blank" rel="noreferrer">A pollen-enhanced bionic mechanoreceptor induced by asymmetric ionic convection in hydrogel for sensory-augmented prostheses</a>. <em>Advanced Science</em>, 13 (2026) 2521235.</li>
                <li>C. Zhou, H. Kim, J.H. Mo, J.Z. Wong, Z. Guo, R. Ni, P. Kim, M.S. Ibrahim, M.F. Abdullah, S.M. Kwon, X. Zhang, N.-j. Cho*. <a href="https://doi.org/10.1002/adfm.75781" target="_blank" rel="noreferrer">Microcarriers: A Transformative Platform for Advanced Drug Delivery</a>. <em>Advanced Functional Materials</em>, e30114 (2026). Cover.</li>
                <li>R. Ni, Q. Deng, J. Zhang, Q. Ke, C. Zhou*, N.-j. Cho*, Y. Zhao*. <a href="https://doi.org/10.1002/adfm.202530114" target="_blank" rel="noreferrer">Micro/nanoarchitectonics of ethanol-unfolded keratin for dual-function biodegradable nonwovens</a>. <em>Advanced Functional Materials</em>, e30114 (2026).</li>
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
                <li>C. Zhou, S. Liang, Y. Li, J. Li, H. Chen*. <a href="https://doi.org/10.1021/acsami.1c21408" target="_blank" rel="noreferrer">Microfluidic assembly of micro-blocks into interlocked structures for enhanced strength and toughness</a>. <em>ACS Applied Materials &amp; Interfaces</em>, 14 (2022) 7261-7269.</li>
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
                <img src={base + item.img} alt={item.cap} className="gallery-photo" loading="lazy" decoding="async" />
                <figcaption className="gallery-caption">{item.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {page === 'positions' && (
        <section className="page-section">
          <h1>Open Positions</h1>
          <p>We welcome undergraduate, master's, and Ph.D. students, as well as postdoctoral and visiting researchers.</p>
          <ul className="position-list">
            <li>🎓 Ph.D. candidates (enrollment in 2027)</li>
            <li>📘 Master's candidates (enrollment in 2027)</li>
            <li>🤝 Postdoctoral and visiting/exchange students (long-term, flexible)</li>
          </ul>
          <p className="contact-block">📧 Interested candidates, please email your CV and transcript to <a href="mailto:chenchen.zhou@sjtu.edu.cn" className="contact-link">chenchen.zhou@sjtu.edu.cn</a>.</p>
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
    </main>
  )
}

export default App