function MobileMenu({ menuOpen, setMenuOpen, openPage }) {
  return (
    <>
      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={menuOpen ? 'side-menu open' : 'side-menu'}>
        <button
          className="close-button"
          onClick={() => setMenuOpen(false)}
        >
          ×
        </button>

        <nav>
          <button onClick={() => openPage('home')}>Home</button>
          <button onClick={() => openPage('research')}>Research</button>
          <button onClick={() => openPage('people')}>People</button>
          <button onClick={() => openPage('publications')}>Publications</button>
          <button onClick={() => openPage('gallery')}>Gallery</button>
          <button onClick={() => openPage('positions')}>Open Positions</button>
          <button onClick={() => openPage('contact')}>Contact</button>
        </nav>
      </aside>
    </>
  )
}

export default MobileMenu