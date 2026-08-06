import { useState, useEffect } from 'react'

import slide1 from '../assets/1.LOTR.png'
import slide2 from '../assets/2.HP.png'
import slide3 from '../assets/3.LOTR.png'
import slide4 from '../assets/4.HP.png'

function Carousel() {
  const slides = [slide1, slide2, slide3, slide4]

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  return (
    <section className="carousel">
      <button className="arrow left" onClick={prevSlide}>
        ❮
      </button>

      <img
        src={slides[current]}
        alt={`Slide ${current + 1}`}
        className="slide-image"
      />

      <button className="arrow right" onClick={nextSlide}>
        ❯
      </button>

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={current === index ? 'dot active' : 'dot'}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel