function Header({ openPage, setMenuOpen }) {
  return (
    <header className="site-header">
      <div className="logo-area">
        <div className="logo-text">
          <strong>TSSM</strong>
          <span>
            Translational Science
            <br />
            Sustainable Material
          </span>
        </div>

        <div className="logo-text ntu-logo">
          <strong>NANYANG</strong>
          <span>
            TECHNOLOGICAL UNIVERSITY
            <br />
            SINGAPORE
          </span>
        </div>
      </div>

      <nav className="top-nav">
        <button onClick={() => openPage('home')}>Home</button>
        <button onClick={() => openPage('research')}>Research</button>
        <button onClick={() => openPage('people')}>People</button>
        <button onClick={() => openPage('publications')}>Publications</button>
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
    </header>
  )
}

export default Header