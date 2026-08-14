import { FiLayers, FiTrendingUp, FiSliders } from 'react-icons/fi'

const services = [
  {
    number: '01',
    icon: FiLayers,
    title: 'Turn Key Solutions',
    desc: 'Complete end-to-end diagnostic equipment setup, instrument installation, SKD manufacturing, and seamless laboratory commissioning across India.',
  },
  {
    number: '02',
    icon: FiTrendingUp,
    title: 'Workflow Efficiency',
    desc: 'Optimized operational workflows, bi-directional LIS integration, automated sample processing, and high-throughput diagnostic systems for peak productivity.',
  },
  {
    number: '03',
    icon: FiSliders,
    title: 'Tailor Made Products',
    desc: 'Customized diagnostic instrument configurations, specialized contract reagent manufacturing, and bespoke solutions engineered for unique laboratory needs.',
  },
]

export default function ServicesSection() {
  return (
    <section className="section-py bg-slate-50/60 overflow-hidden relative border-y border-line/40">
      <div className="container-xl relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <span className="inline-block px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-brandOrange bg-orange-100/70 rounded-full mb-3">
            Services We Offer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Comprehensive Diagnostic Services
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-ink/70 leading-relaxed max-w-xl mx-auto">
            Delivering end-to-end MedTech capabilities, workflow optimization, and customized healthcare solutions tailored for laboratories nationwide.
          </p>
        </div>

        {/* Clean Non-Card Column Grid with Divider Lines */}
        <div className="mt-14 sm:mt-16 grid gap-10 lg:grid-cols-3 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-line/70">
          {services.map(({ number, icon: Icon, title, desc }, i) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="group relative flex flex-col pt-8 lg:pt-2 pb-8 lg:pb-2 lg:px-10 first:lg:pl-0 last:lg:pr-0 transition-all"
            >
              <div>
                {/* Top Number & Icon Row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-brandOrange/30 group-hover:text-brandOrange transition-colors duration-300">
                    {number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100/70 text-brandOrange group-hover:bg-brandOrange group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Title with Left Accent Line */}
                <div className="relative pl-4 border-l-2 border-brandOrange/30 group-hover:border-brandOrange transition-colors duration-300">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink group-hover:text-brandOrange transition-colors">
                    {title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base text-ink/75 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
