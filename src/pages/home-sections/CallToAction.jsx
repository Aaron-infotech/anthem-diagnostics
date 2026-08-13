import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <section className="bg-primary-white py-16">
      <div className="container-xl flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          
          <h2 className="mt-2 font-display text-2xl font-semibold text-black sm:text-3xl">
            Looking for High Quality Diagnostic Products?
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="rounded-full bg-brandOrange px-7 py-3 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 hover:bg-brandOrange-dark">
            Contact Us
          </Link>
          <Link to="/contact" className="rounded-full border border-primary/80 px-7 py-3 font-semibold text-black transition-colors hover:bg-white/10">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  )
}
