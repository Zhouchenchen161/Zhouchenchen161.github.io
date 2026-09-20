import { useState } from 'react'

function Header({ openPage, setMenuOpen }) {
  const [zoomSrc, setZoomSrc] = useState(null)
  const base = import.meta.env.BASE_URL

  return (
    <header className="site-header">
      <div className="logo-area">
        <button
          className="logo-zoom-btn"
          onClick={() => setZoomSrc(`${base}logo.png`)}
          aria-label="Zoom group logo"
        >
          <img src={`${base}logo.png`} alt="Group logo" className="lab-logo" />
        </button>

        <button
          className="logo-zoom-btn"
          onClick={() => setZoomSrc(`${base}sjtu-logo.png`)}
          aria-label="Zoom SJTU logo"
        >
          <img src={`${base}sjtu-logo.png`} alt="SJTU logo" className="lab-logo" />
        </button>
      </div>

      <nav className="top-nav">
        <button onClick={() => openPage('home')}>Home</button>
        <button onClick={() => openPage('about')}>About</button>
        <button onClick={() => openPage('research')}>Research</button>
        <button onClick={() => openPage('people')}>People</button>
        <button onClick={() => openPage('publications')}>Publications</button>
        <button onClick={() => openPage('news')}>News</button>
        <button onClick={() => openPage('gallery')}>Gallery</button>
        <button onClick={() => openPage('positions')}>Open Positions</button>
        <button onClick={() => openPage('contact')}>Contact</button>
      </nav>

      <button
        className="mobile-menu-button"
        onClick={() => setMenuOpen(true)}
      >
        ☰
      </button>

      {zoomSrc && (
        <div className="logo-lightbox" onClick={() => setZoomSrc(null)}>
          <button
            className="lightbox-close"
            onClick={() => setZoomSrc(null)}
          >
            ×
          </button>
          <img src={zoomSrc} alt="Enlarged logo" />
        </div>
      )}
    </header>
  )
}

export default Header