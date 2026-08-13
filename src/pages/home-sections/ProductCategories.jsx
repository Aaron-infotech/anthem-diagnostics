import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { categories } from '../../data/products'

export default function ProductCategories() {
  return (
    <section className="section-py bg-accent/40">
      <div className="container-xl">
        <div className="mx-auto max-w-xl text-center" data-aos="fade-up">
          
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Product Categories</h2>
          <p className="mt-3 text-ink/65">Five diagnostic categories, engineered for accuracy across every department.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <div
              key={cat.slug}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="group sample-card overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={cat.image} alt={cat.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{cat.name}</h3>
                <p className="mt-2 text-sm text-ink/65">{cat.tagline}</p>
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brandOrange transition-colors hover:text-brandOrange-dark"
                >
                  View Products <FiArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
