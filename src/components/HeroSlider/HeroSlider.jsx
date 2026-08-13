import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/effect-fade'

const labShowcases = [
  {
    id: 'lab-hero-1',
    title: 'Automated Diagnostic Laboratory Workstation',
    tag: 'Clinical Laboratory Equipment',
    image: '/images/anthem_lab_hero.jpg',
  },
  {
    id: 'lab-hero-2',
    title: 'High-Precision Diagnostics & Fluidics',
    tag: 'Next-Gen Automated Analyzers',
    image: '/images/anthem_lab_hero2.jpg',
  },
]

export default function HeroSlider() {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-32">

      {/* Full-Bleed Background Image Carousel with Zoom In & Out Animation */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {labShowcases.map((slide, idx) => {
            const isZoomIn = idx % 2 === 0
            return (
              <SwiperSlide key={slide.id} className="w-full h-full relative overflow-hidden">
                {({ isActive }) => (
                  <motion.div
                    className="w-full h-full"
                    initial={{ scale: isZoomIn ? 1.0 : 1.25 }}
                    animate={{ scale: isActive ? (isZoomIn ? 1.25 : 1.0) : (isZoomIn ? 1.0 : 1.25) }}
                    transition={{
                      duration: 4.2,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>

        {/* Left Dark Gradient Backdrop - Narrowed width so lab images remain bright & visible */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#031327] via-[#031327]/75 via-20% to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#031327]/80 via-transparent to-transparent lg:hidden" />
      </div>

      {/* Hero Text Content floating over left dark gradient backdrop */}
      <div className="container-xl relative z-20 px-4 sm:px-6 w-full">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Stacked Heading - Compact & Responsive on Mobile */}
            <h1 className="font-display text-2xl sm:text-4xl lg:text-[35px] font-black tracking-tight leading-[1.1] sm:leading-[1.05] uppercase">
              <span className="block text-white">we offer </span>
              <span className="block text-[#F26522]">quality <span className="text-white">and</span> affordable</span>
              <span className="block text-white"> diagnostics solutions</span>
              <span className="block text-white"> within your reach</span>
            </h1>

            {/* Description Subtext - Hidden on Mobile View */}
            <p className="hidden sm:block mt-5 text-sm sm:text-base leading-relaxed text-slate-300 max-w-md">
              Advanced diagnostic technologies delivering accuracy, reliability, and better healthcare outcomes.
            </p>

            {/* Single Action Button with Right Arrow */}
            <div className="mt-5 sm:mt-8 flex flex-row items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#005BAC] px-5 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-base font-bold text-white shadow-lg transition-all hover:bg-[#004A8D] hover:shadow-xl active:scale-95 whitespace-nowrap"
              >
                <span>Explore Products</span>
                <FiArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Link>
            </div>

            {/* Pagination Indicators */}
            <div className="mt-6 sm:mt-8 flex items-center gap-2.5">
              {labShowcases.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.slideToLoop(idx)
                    }
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-[#F26522]' : 'w-2.5 bg-slate-500 hover:bg-slate-400'
                    }`}
                />
              ))}
            </div>

          </motion.div>
        </div>
      </div>

      {/* Bottom Smooth Curved Wave Divider */}
      <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-30 pointer-events-none">
        <svg
          className="relative block w-full h-12 sm:h-20 lg:h-28 scale-[1.03] translate-y-[2px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,48C1200,53,1320,75,1380,85.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="#ffffff"
          />
        </svg>
      </div>

    </section>
  )
}
