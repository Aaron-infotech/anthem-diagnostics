import { FiAward, FiShield, FiHeadphones, FiTruck, FiStar } from 'react-icons/fi'

const features = [
  {
    icon: FiAward,
    title: 'Premium Quality',
    desc: 'Clinical-grade accuracy vetted for laboratory standards.',
    iconColor: '#F26522', // Anthem Brand Orange for All Icons
    iconBg: 'bg-[#F26522]',
    titleBg: 'bg-[#005BAC]', // Anthem Primary Blue for All Titles
  },
  {
    icon: FiShield,
    title: 'Certified Products',
    desc: 'Every product line meets ISO & CE quality certifications.',
    iconColor: '#F26522', // Anthem Brand Orange for All Icons
    iconBg: 'bg-[#F26522]',
    titleBg: 'bg-[#005BAC]', // Anthem Primary Blue for All Titles
  },
  {
    icon: FiHeadphones,
    title: 'Technical Support',
    desc: '24/7 engineering support for installation & service.',
    iconColor: '#F26522', // Anthem Brand Orange for All Icons
    iconBg: 'bg-[#F26522]',
    titleBg: 'bg-[#005BAC]', // Anthem Primary Blue for All Titles
  },
  {
    icon: FiTruck,
    title: 'Fast Delivery',
    desc: 'Streamlined logistics keeping schedules uninterrupted.',
    iconColor: '#F26522', // Anthem Brand Orange for All Icons
    iconBg: 'bg-[#F26522]',
    titleBg: 'bg-[#005BAC]', // Anthem Primary Blue for All Titles
  },
  {
    icon: FiStar,
    title: 'Trusted Brand',
    desc: 'Recognized diagnostic partner relied upon by 100+ centres.',
    iconColor: '#F26522', // Anthem Brand Orange for All Icons
    iconBg: 'bg-[#F26522]',
    titleBg: 'bg-[#005BAC]', // Anthem Primary Blue for All Titles
  },
]

{/* Custom Circle Icon Badge Component */}
function CircleIconBadge({ icon: Icon, color, bgClass, isMobile = false }) {
  const sizeClass = isMobile ? 'w-16 h-16 sm:w-18 sm:h-18' : 'w-20 h-20'
  const innerSizeClass = isMobile ? 'w-11 h-11 sm:w-12 sm:h-12' : 'w-14 h-14'
  const iconSize = isMobile ? 22 : 26

  return (
    <div className={`relative ${sizeClass} rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shrink-0`}>
      {/* Outer Round Border Circle & Side Curved Arc Brackets */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {/* Drop Shadow Filter */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.14" />
        </filter>

        {/* Outer White Base Circle with Crisp Round Gray Border */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="2.5"
          filter="url(#shadow)"
        />

        {/* Left Side Curved Arc Bracket */}
        <path
          d="M 12 32 A 44 44 0 0 0 12 68"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right Side Curved Arc Bracket */}
        <path
          d="M 88 32 A 44 44 0 0 1 88 68"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Inner Solid Colored Circle Container */}
      <div className={`relative z-10 ${innerSizeClass} rounded-full ${bgClass} text-white flex items-center justify-center shadow-inner`}>
        <Icon size={iconSize} />
      </div>
    </div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-white overflow-hidden relative select-none">
      <div className="container-xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#005BAC] tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#606f7b] max-w-xl mx-auto leading-relaxed font-medium">
            Hospitals and laboratories across India rely on Anthem Diagnostics as their premier equipment partner.
          </p>
        </div>

        {/* --- DESKTOP STEPPED ZIG-ZAG INFOGRAPHIC FLOW (> 992px) --- */}
        <div className="hidden lg:block relative w-full max-w-[1150px] mx-auto h-[370px]">
          {/* SVG Line passing EXACTLY through the center center of every circle icon */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg viewBox="0 0 1000 360" fill="none" className="w-full h-full">
              {/* Outer Subtle Shadow Path */}
              <path
                d="M 100 60
                   H 160 A 20 20 0 0 1 180 80
                   V 260 A 20 20 0 0 0 200 280
                   H 400 A 20 20 0 0 0 420 260
                   V 80 A 20 20 0 0 1 440 60
                   H 560 A 20 20 0 0 1 580 80
                   V 260 A 20 20 0 0 0 600 280
                   H 800 A 20 20 0 0 0 820 260
                   V 80 A 20 20 0 0 1 840 60
                   H 900"
                stroke="#cbd5e1"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-50"
              />
              {/* Anthem Brand Orange Path */}
              <path
                d="M 100 60
                   H 160 A 20 20 0 0 1 180 80
                   V 260 A 20 20 0 0 0 200 280
                   H 400 A 20 20 0 0 0 420 260
                   V 80 A 20 20 0 0 1 440 60
                   H 560 A 20 20 0 0 1 580 80
                   V 260 A 20 20 0 0 0 600 280
                   H 800 A 20 20 0 0 0 820 260
                   V 80 A 20 20 0 0 1 840 60
                   H 900"
                stroke="#F26522"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 5 Infographic Columns Grid */}
          <div className="relative z-10 grid grid-cols-5 h-full">
            {features.map(({ icon: Icon, title, desc, iconColor, iconBg, titleBg }, i) => {
              const isTop = i % 2 === 0 // 0, 2, 4 = Top Icon; 1, 3 = Bottom Icon

              return (
                <div
                  key={title}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="relative h-full flex flex-col items-center text-center px-2"
                >
                  {isTop ? (
                    /* --- TOP ICON NODE (Exact Center y=60px) --- */
                    <div className="flex flex-col items-center w-full pt-5">
                      {/* Orange Circle Icon Badge */}
                      <CircleIconBadge icon={Icon} color={iconColor} bgClass={iconBg} />

                      {/* Blue Title Pill Badge */}
                      <div className={`mt-3.5 ${titleBg} text-white px-4 py-1.5 rounded-full font-display text-xs sm:text-sm font-bold shadow-md tracking-tight max-w-[170px] text-center`}>
                        {title}
                      </div>

                      {/* Description Text */}
                      <p className="mt-2 text-xs text-[#606f7b] font-normal leading-relaxed max-w-[160px]">
                        {desc}
                      </p>
                    </div>
                  ) : (
                    /* --- BOTTOM ICON NODE (Exact Center y=280px) --- */
                    <div className="flex flex-col items-center justify-end h-full pb-10">
                      {/* Title & Description Text Content Block (Sits inside U-loop without touching vertical lines) */}
                      <div className="flex flex-col items-center mb-7">
                        {/* Blue Title Pill Badge */}
                        <div className={`mb-2 ${titleBg} text-white px-4 py-1.5 rounded-full font-display text-xs sm:text-sm font-bold shadow-md tracking-tight max-w-[170px] text-center`}>
                          {title}
                        </div>

                        {/* Description Text */}
                        <p className="text-xs text-[#606f7b] font-normal leading-relaxed max-w-[160px]">
                          {desc}
                        </p>
                      </div>

                      {/* Orange Circle Icon Badge */}
                      <CircleIconBadge icon={Icon} color={iconColor} bgClass={iconBg} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* --- MOBILE / TABLET CARD TIMELINE LAYOUT (< 992px) --- */}
        <div className="lg:hidden mt-6 relative max-w-md mx-auto">
          {/* Vertical Connecting Anthem Orange Line - Centered exactly on the circle icon badges */}
          <div className="absolute left-[46px] sm:left-[48px] -translate-x-1/2 top-8 bottom-8 w-[3.5px] bg-[#F26522] z-0 opacity-80" />

          <div className="relative z-10 space-y-4">
            {features.map(({ icon: Icon, title, desc, iconColor, iconBg, titleBg }, i) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                {/* Left Orange Round Border Circle Badge */}
                <div className="shrink-0 relative z-10">
                  <CircleIconBadge icon={Icon} color={iconColor} bgClass={iconBg} isMobile={true} />
                </div>

                {/* Right Content Area */}
                <div className="flex-1 min-w-0">
                  {/* Blue Title Pill Badge */}
                  <div className="mb-1.5">
                    <span className={`inline-block ${titleBg} text-white text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full shadow-sm`}>
                      {title}
                    </span>
                  </div>

                  {/* Description Text */}
                  <p className="text-xs text-[#606f7b] font-normal leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
