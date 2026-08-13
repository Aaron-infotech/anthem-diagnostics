import PartnerSlider from '../../components/PartnerSlider/PartnerSlider'
import { partners } from '../../data/partners'

export default function PartnersSection() {
  return (
    <section className="section-py bg-white">
      <div className="container-xl text-center" data-aos="fade-up">

        <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">Our Trusted Customers</h2>
      </div>
      <div className="mt-10">
        <PartnerSlider items={partners} />
      </div>
    </section>
  )
}
