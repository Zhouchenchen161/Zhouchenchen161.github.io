import { useEffect, useRef } from "react"

function Research() {
  const researchItems = [
    'Ultraviolet light/laser and other additive manufacturing techniques',
    'Semiconductor and micro-nano materials, device design, and fabrication',
    'Biomimetic materials: synthesis, processing, and applications',
    'Microfluidics, liquid marbles, and superhydrophobicity',
    'Recyclable and degradable materials and ceramic material fabrication',
  ]

  const sectionRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const cards = Array.from(root.querySelectorAll('.research-card'))
    const showAll = () => cards.forEach((c) => c.classList.add('visible'))
    if (!('IntersectionObserver' in window)) { showAll(); return }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((card) => observer.observe(card))
    const fallback = setTimeout(showAll, 2500)
    return () => { observer.disconnect(); clearTimeout(fallback) }
  }, [])

  const handleTiltMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform =
      'perspective(800px) rotateX(' + (-py * 18) + 'deg) rotateY(' + (px * 18) + 'deg) translateY(-4px)'
    const glare = card.querySelector('.research-glare')
    if (glare) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100
      const gy = ((e.clientY - rect.top) / rect.height) * 100
      glare.style.background =
        'radial-gradient(circle at ' + gx + '% ' + gy + '%, rgba(255,255,255,0.6), transparent 65%)'
      glare.style.opacity = '1'
    }
  }

  const handleTiltLeave = (e) => {
    const card = e.currentTarget
    card.style.transform = ''
    const glare = card.querySelector('.research-glare')
    if (glare) glare.style.opacity = '0'
  }

  return (
    <section className="research-page" ref={sectionRef}>
      <div className="research-container">
        <div className="research-heading">
          <p className="section-label">OUR WORK</p>
          <h1>Research</h1>
          <p className="research-intro">
            Our group explores advanced manufacturing, functional materials,
            micro/nano devices, and sustainable material systems.
          </p>
        </div>

        <div className="research-panel">
          <div className="research-panel-header">
            <h2>Research Interests</h2>
            <span>05 areas</span>
          </div>

          <ol className="research-list">
            {researchItems.map((item, index) => (
              <li key={index}>
                <div
                  className="research-card"
                  onMouseMove={handleTiltMove}
                  onMouseLeave={handleTiltLeave}
                  style={{ '--d': index * 0.09 + 's' }}
                >
                  <span className="research-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="research-item-text">{item}</span>
                  <span className="research-glare" />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="research-notice">
          <div>
            <p className="notice-label">JOIN OUR GROUP</p>
            <h2>Students and researchers are welcome</h2>
            <p>
              We welcome undergraduate, master&apos;s, Ph.D., and postdoctoral
              researchers with backgrounds in mechanics, materials, physics,
              chemistry, and computer science to contact us for academic
              exchange.
            </p>
          </div>

          <div className="application-card">
            <span>Admissions</span>
            <strong>2027</strong>
            <p>Ph.D. and master&apos;s applications are now open.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Research