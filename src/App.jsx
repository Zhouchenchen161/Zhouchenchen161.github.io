import { useState } from 'react'

import './App.css'
import Carousel from './components/Carousel'
import Header from './components/Header'
import MobileMenu from './components/MobileMenu'
import Research from './pages/Research'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('home')

  const lyrics = [
    'Not all those who wander are lost.',
    'The old that is strong does not wither.',
    'Deep roots are not reached by the frost.',
    '',
    'Even the smallest person',
    'can change the course of the future.',
    '',
    'There is some good in this world,',
    'and it is worth fighting for.',
    '',
    'Faithless is he that says farewell',
    'when the road darkens.',
    '',
    'The Road goes ever on and on.',
    'Out from the door where it began.',
  ]

  const openPage = (pageName) => {
    setPage(pageName)
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <main>
      <Header
        openPage={openPage}
        setMenuOpen={setMenuOpen}
      />

      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openPage={openPage}
      />

      {page === 'home' && (
        <>
          <Carousel />

          <section className="hero-text">
            <h1>Chenchen Zhou</h1>

            <p>
              Associate Professor
              <br />
              Shanghai Jiao Tong University
            </p>

            <div className="lyrics">
              {lyrics.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'research' && <Research />}

      {page === 'people' && (
        <section className="page-section">
          <h1>People</h1>

          <p>
            Group members, students, and collaborators will be listed here.
          </p>
        </section>
      )}

      {page === 'publications' && (
        <section className="page-section">
          <h1>Publications</h1>

          <p>
            Selected publications and representative academic achievements.
          </p>
        </section>
      )}

      {page === 'gallery' && (
        <section className="page-section">
          <h1>Gallery</h1>

          <p>
            Lab photos, research images, and academic activities.
          </p>
        </section>
      )}

      {page === 'positions' && (
        <section className="page-section">
          <h1>Open Positions</h1>

          <p>
            We welcome motivated students and researchers to join the group.
          </p>
        </section>
      )}

      {page === 'contact' && (
        <section className="page-section">
          <h1>Contact</h1>

          <p>
            Email: chenchen.zhou@sjtu.edu.cn
          </p>
        </section>
      )}
    </main>
  )
}

export default App