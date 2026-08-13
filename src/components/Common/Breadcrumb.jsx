import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

export default function Breadcrumb({ trail }) {
  // trail: [{ label: 'Home', to: '/' }, { label: 'Products' }]
  return (
    <nav aria-label="Breadcrumb" className="font-mono-tag text-xs text-white/80">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.to ? (
              <Link to={item.to} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
            {i < trail.length - 1 && <FiChevronRight size={12} />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
