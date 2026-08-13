import { FiAward, FiShield, FiHeadphones, FiTruck, FiStar, FiUsers } from 'react-icons/fi'
import '../../styles/index.css'

const features = [
  { icon: FiAward, title: 'Premium Quality', desc: 'Instruments sourced and vetted for clinical-grade accuracy.' },
  { icon: FiShield, title: 'Certified Products', desc: 'Every product line meets recognised quality certifications.' },
  { icon: FiHeadphones, title: 'Technical Support', desc: 'Responsive engineering support for installation and service.' },
  { icon: FiTruck, title: 'Fast Delivery', desc: 'Reliable logistics to keep your laboratory running on schedule.' },
  { icon: FiStar, title: 'Trusted Brand', desc: 'A name hospitals and diagnostic centres recognise and rely on.' },
  { icon: FiUsers, title: 'Experienced Team', desc: 'Specialists who understand laboratory workflows end to end.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-accent/40">
      <div className="container-xl">
        <div className="mx-auto max-w-xl text-center" data-aos="fade-up">
          
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Why Choose Us</h2>
          <p className="mt-3 text-ink/65">
            Six reasons hospitals and laboratories across India choose Anthem Diagnostics as their
            equipment partner.
          </p>
        </div>

        <div className="mobileGrid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className=" group rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
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
  )
}
