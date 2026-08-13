import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const categories = [
  {
    name: 'Hematology',
    model: 'DIRUI CS-680',
    image: '/assets/anthemdx (1).png',
    slug: 'hematology',
  },
  {
    name: 'HbA1C',
    model: 'DIRUI BF-6900',
    image: '/assets/anthemdx (2).png',
    slug: 'hba1c',
  },
  {
    name: 'Biochemistry',
    model: 'DIRUI FUS-2000',
    image: '/assets/anthemdx (3).png',
    slug: 'biochemistry',
  },
]

const points = [
  'Quality diagnostic solutions',
  'Reliable medical equipment',
  'Trusted healthcare partner',
  'Advanced laboratory technologies',
  'Customer satisfaction focused',
  'Professional service support',
]

export default function CompanyIntro() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCategoryIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = (e) => {
    e.stopPropagation()
    setActiveCategoryIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setActiveCategoryIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1))
  }

  const currentCategory = categories[activeCategoryIndex]

  const handleCategoryClick = () => {
    navigate(`/products?category=${currentCategory.slug}`)
  }

  return (
    <section className="section-py bg-white overflow-hidden">
      <div className="container-xl grid items-center gap-12 lg:grid-cols-2">
        {/* Left Column: Pixel-Perfect Rotating Multi-Ring Showcase */}
        <div data-aos="fade-right" className="flex justify-center">
          <div className="relative w-full max-w-[460px] sm:max-w-[500px] aspect-square flex items-center justify-center p-4 select-none">

            {/* --- ROTATING SVG RINGS BACKDROP --- */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 500 500" className="w-full h-full">

                {/* 1. Outer Blue Arc Lines (Rotating Clockwise) */}
                <g className="origin-center animate-[spin_26s_linear_infinite]">
                  {/* Left Symmetrical Outer Arc */}
                  <path
                    d="M 112 86 A 215 215 0 0 0 86 388"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Right Symmetrical Outer Arc */}
                  <path
                    d="M 414 112 A 215 215 0 0 1 414 388"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Top Inner Accent Arc */}
                  <path
                    d="M 150 75 A 185 185 0 0 1 350 75"
                    fill="none"
                    stroke="#93c5fd"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>

                {/* 2. Main Dark Dashed Circle (Rotating Counter-Clockwise) */}
                <g className="origin-center animate-[spin_36s_linear_infinite_reverse]">
                  <circle
                    cx="250"
                    cy="250"
                    r="190"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2"
                    strokeDasharray="10 8"
                    className="opacity-75"
                  />
                </g>

                {/* 3. Inner Light Dotted Circle (Rotating Clockwise) */}
                <g className="origin-center animate-[spin_46s_linear_infinite]">
                  <circle
                    cx="250"
                    cy="250"
                    r="145"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="3 6"
                    className="opacity-50"
                  />
                </g>
              </svg>
            </div>

            {/* --- INNER CONTENT STACK --- */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full w-full pt-12 pb-8 px-6 text-center">

              {/* Product Image - Click to navigate + Smooth Zoom In & Zoom Out Animation */}
              <div
                onClick={handleCategoryClick}
                className="relative flex-1 flex items-center justify-center w-full my-auto cursor-pointer group overflow-hidden"
                title={`View ${currentCategory.name} products`}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentCategory.name}
                    src={currentCategory.image}
                    alt={currentCategory.name}
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.15, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="max-h-[220px] sm:max-h-[250px] w-auto object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                </AnimatePresence>
              </div>

              {/* Category Name & Bottom Arrow Navigation */}
              <div className="mt-2 flex flex-col items-center gap-1.5">
                <h3
                  onClick={handleCategoryClick}
                  className="font-display text-xl sm:text-2xl font-extrabold text-[#1e293b] tracking-tight cursor-pointer hover:text-[#005BAC] transition-colors"
                >
                  {currentCategory.name}
                </h3>

                {/* Navigation Arrows `< - - - >` */}
                <div className="flex items-center justify-center gap-3 text-[#005BAC] font-bold">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Category"
                    className="p-1 text-[#005BAC] hover:text-[#003A70] transition-transform hover:scale-125 active:scale-95 cursor-pointer"
                  >
                    <FiChevronLeft size={22} strokeWidth={3} />
                  </button>



                  <button
                    onClick={handleNext}
                    aria-label="Next Category"
                    className="p-1 text-[#005BAC] hover:text-[#003A70] transition-transform hover:scale-125 active:scale-95 cursor-pointer"
                  >
                    <FiChevronRight size={22} strokeWidth={3} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Company Description & Key Points */}
        <div data-aos="fade-left">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl leading-tight">
            Anthem Diagnostics Private Limited
          </h2>
          <p className="mt-4 text-base text-ink/75 leading-relaxed">
            We supply advanced diagnostic instruments and laboratory solutions to hospitals,
            clinics and diagnostic centres across India — built around accuracy, reliability and
            responsive after-sales support.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink/75">
                <FiCheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
