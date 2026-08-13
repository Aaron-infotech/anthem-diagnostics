import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import AOS from 'aos'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import PageBanner from '../components/Common/PageBanner'
import ContactForm from '../components/ContactForm/ContactForm'
import '../styles/index.css'

const infoCards = [
  {
    icon: FiPhone,
    title: 'Phone',
    lines: ['+91 4435 0396 85'],
    href: 'tel:+914435039685',
  },
  {
    icon: FiMail,
    title: 'Email',
    lines: ['support@anthemdx.com'],
    href: 'mailto:support@anthemdx.com',
  },
  {
    icon: FiMapPin,
    title: 'Office Address',
    lines: [
      'Anthem Diagnostics Private Limited',
      'New No. 9 / Old No. 217, Ground Floor,',
      'Defence Colony, 16th Cross Street, Ekkatuthangal,',
      'Chennai, Tamil Nadu – 600032',
    ],
  },
]

export default function Contact() {
  const [searchParams] = useSearchParams()
  const prefillCategory = searchParams.get('category') || ''

  useEffect(() => {
    AOS.init({ duration: 700, once: true })
    document.title = 'Contact Us | Anthem Diagnostics Private Limited'
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <PageBanner
        eyebrow="REF// GET-IN-TOUCH"
        title="Contact Us"
        description="We're here to help you with your diagnostic equipment requirements."
        trail={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
      />

      <section className="section-py bg-white">
        <div className="container-xl grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3">
          {infoCards.map(({ icon: Icon, title, lines, href }, i) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className={`rounded-2xl border border-line bg-white p-4 sm:p-6 text-center shadow-card ${
                title === 'Office Address' ? 'col-span-2 sm:col-span-1' : 'col-span-1'
              }`}
            >
              <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon size={20} className="sm:hidden" />
                <Icon size={22} className="hidden sm:block" />
              </div>
              <h3 className="mt-3 sm:mt-4 font-display text-base sm:text-lg font-semibold text-ink">{title}</h3>
              <div className="mt-2 space-y-0.5 text-xs sm:text-sm text-ink/65 break-words">
                {lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {href && (
                <a href={href} className="mt-3 inline-block text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark">
                  {title === 'Phone' ? 'Call now' : 'Send email'}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-xl grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3" data-aos="fade-right">
            
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Send an Enquiry</h2>
            <p className="mt-2 text-ink/65">Fill in the details below and our team will respond within one business day.</p>
            <div className="mt-6">
              <ContactForm prefillCategory={prefillCategory} />
            </div>
          </div>

          <div className="lg:col-span-2" data-aos="fade-left">
            
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">Find Us</h2>
            <div className="mt-6 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line shadow-card sm:aspect-square">
              <iframe
                title="Anthem Diagnostics office location"
                src="https://www.google.com/maps?q=13.0280556,80.2008333&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
