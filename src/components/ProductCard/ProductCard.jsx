import { useNavigate } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'

export default function ProductCard({ product, onEnquire }) {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <div className="sample-card group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover">
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.ref && (
          <span className="ref-tag absolute left-3 top-3 bg-white/90 shadow-sm">{product.ref}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono-tag text-[0.65rem] uppercase tracking-widest text-primary/70">
          {product.category ? product.category.replace('-', ' ') : ''}
        </p>
        <h3
          onClick={handleCardClick}
          className="mt-1 font-display text-lg font-semibold text-ink hover:text-primary transition-colors cursor-pointer"
        >
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-ink/65 line-clamp-2">{product.shortDescription}</p>

        {/* {product.specifications && (
          <ul className="mt-4 space-y-1.5 border-t border-dashed border-line pt-4">
            {product.specifications.slice(0, 3).map((spec) => (
              <li key={typeof spec === 'string' ? spec : spec.label} className="flex gap-2 font-mono-tag text-[0.72rem] text-ink/70">
                <span className="text-primary">›</span>
                {typeof spec === 'string' ? spec : `${spec.label}: ${spec.value}`}
              </li>
            ))}
          </ul>
        )}

        {product.features && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.features.slice(0, 3).map((f) => (
              <span key={f} className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-primary">
                {f}
              </span>
            ))}
          </div>
        )} */}

        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brandOrange py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brandOrange-dark"
        >
          View Details
          <FiArrowUpRight size={16} />
        </button>
      </div>
    </div>
  )
}
