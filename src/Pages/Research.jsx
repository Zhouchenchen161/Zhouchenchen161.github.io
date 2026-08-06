function Research() {
  const researchItems = [
    'Ultraviolet light/laser and other additive manufacturing techniques',
    'Semiconductor and micro-nano materials, device design, and fabrication',
    'Biomimetic materials: synthesis, processing, and applications',
    'Microfluidics, liquid marbles, and superhydrophobicity',
    'Recyclable and degradable materials and ceramic material fabrication',
  ]

  return (
    <section className="research-page">
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
                <span className="research-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="research-item-text">{item}</span>
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