import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import AOS from 'aos'
import PageBanner from '../components/Common/PageBanner'
import ProductCard from '../components/ProductCard/ProductCard'
import { categories, products } from '../data/products'

export default function Products() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const activeCategory = searchParams.get('category') || 'all'
  const [query, setQuery] = useState('')

  useEffect(() => {
    AOS.init({ duration: 700, once: true })
    document.title = 'Our Products | Anthem Diagnostics Private Limited'
    window.scrollTo(0, 0)
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.shortDescription.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const setCategory = (slug) => {
    navigate(slug === 'all' ? '/products' : `/products?category=${slug}`)
  }

  const handleEnquire = (product) => {
    navigate(`/contact?category=${product.category}&product=${encodeURIComponent(product.name)}`)
  }

  return (
    <>
      <PageBanner
       
        title="Our Products"
        
        trail={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
      />

      <section className="section-py bg-white">
        <div className="container-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('all')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === 'all' ? 'bg-brandOrange text-white shadow-sm' : 'bg-accent text-primary hover:bg-brandOrange hover:text-white'
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCategory(c.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeCategory === c.slug ? 'bg-brandOrange text-white shadow-sm' : 'bg-accent text-primary hover:bg-brandOrange hover:text-white'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-ink/60">No products match your search. Try a different keyword or category.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => (
                <div key={product.id} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                  <ProductCard product={product} onEnquire={handleEnquire} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
