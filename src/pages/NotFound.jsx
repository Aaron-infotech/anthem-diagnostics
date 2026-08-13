import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-xl flex flex-col items-center justify-center py-32 text-center">
      <p className="ref-tag mb-4">REF// 404-NOTFOUND</p>
      <h1 className="font-display text-4xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-ink/65">
        The page you're looking for doesn't exist or has moved. Head back to the homepage to
        continue exploring our diagnostic solutions.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Back to Home
      </Link>
    </section>
  )
}
