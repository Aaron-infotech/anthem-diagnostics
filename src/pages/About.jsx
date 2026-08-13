import { useEffect } from 'react'
import AOS from 'aos'
import PageBanner from '../components/Common/PageBanner'
import Counter from '../components/Counter/Counter'
import { directors } from '../data/directors'
import { FiStar, FiCpu, FiShield, FiUsers, FiHeadphones, FiClock } from 'react-icons/fi'
import '../styles/index.css'
const whyWorkWithUs = [
  { icon: FiStar, title: 'Trusted Brand', desc: 'A name diagnostic centres recognise for consistency and care.' },
  { icon: FiCpu, title: 'Innovative Technology', desc: 'Instruments built on the latest diagnostic technologies.' },
  { icon: FiShield, title: 'Quality Assurance', desc: 'Every product is checked against strict quality standards.' },
  { icon: FiUsers, title: 'Professional Team', desc: 'Specialists who guide you from selection to installation.' },
  { icon: FiHeadphones, title: 'Customer Support', desc: 'Responsive support whenever your laboratory needs it.' },
  { icon: FiClock, title: 'Timely Delivery', desc: 'Logistics planned around your laboratory\'s schedule.' },
]

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true })
    document.title = 'About Us | Anthem Diagnostics Private Limited'
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <PageBanner

        title="About Anthem Diagnostics Private Limited"

        trail={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      {/* Company Overview */}
      <section className="section-py bg-white">
        <div className="container-xl grid items-center gap-12 lg:grid-cols-2">
          <div data-aos="fade-right">

            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Company Overview</h2>
            <p className="mt-4 text-ink/70">
              Anthem Diagnostics Private Limited exists to make advanced diagnostic technology
              accessible and dependable for healthcare providers across India. Our mission is to
              equip laboratories with instruments that deliver accurate results, every time.
            </p>
            <p className="mt-4 text-ink/70">
              Our vision is to be the diagnostic equipment partner hospitals and laboratories trust
              first — built on a foundation of quality, innovation, and genuine customer care. From
              sourcing to after-sales service, every step reflects our commitment to diagnostic
              excellence and long-term healthcare partnerships.
            </p>
          </div>
          <div data-aos="fade-left">
            <div className="rounded-3xl bg-slate-50/70 p-4 sm:p-6 shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden">
              <img
                src="/images/anthem_lab_hero.jpg"
                alt="Modern diagnostic laboratory equipment"
                loading="lazy"
                className="w-full max-h-[360px] object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="section-py bg-accent/40">
        <div className="container-xl">
          <div className="mx-auto max-w-xl text-center" data-aos="fade-up">

            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Our Leadership</h2>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {directors.map((d, i) => (
              <div
                key={d.name}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover"
              >
                <div>
                  <div className="h-[282px] overflow-hidden bg-slate-100">
                    <img src={d.photo} alt={d.name} loading="lazy" className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold text-ink tracking-tight">{d.name}</h3>
                    <span className="inline-block mt-1 rounded-full bg-accent/60 px-2.5 py-0.5 text-[12px] sm:text-[13px] font-semibold text-primary">
                      {d.designation}
                    </span>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                      {d.bio}
                    </p>
                  </div>
                </div>
                <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4">
                  <p className="text-[13px] sm:text-sm font-semibold text-brandOrange border-t border-line pt-2">
                    {d.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Insights */}
      <section className=" section-py bg-white">
        <div className="container-xl">
          <div className="mx-auto max-w-xl text-center" data-aos="fade-up">

            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Company Insights</h2>
          </div>
          <div className="mobileGrid mt-12 grid gap-6 grid-cols-2 sm:grid-cols-4">
            <Counter value={3} suffix="+" label="Years of Experience" />
            <Counter value={30} suffix="+" label="Products Sales" />
            <Counter value={100} suffix="+" label="Clients" />
            <Counter value={30} suffix="+" label="Employees" />
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className=" section-py bg-accent/40">
        <div className="container-xl">
          <div className="mx-auto max-w-xl text-center" data-aos="fade-up">

            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Why Work With Us</h2>
          </div>
          <div className="mobileGrid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyWorkWithUs.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="group rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm text-ink/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
