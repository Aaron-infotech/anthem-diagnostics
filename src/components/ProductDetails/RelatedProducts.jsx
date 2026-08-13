import ProductCard from '../ProductCard/ProductCard'


export default function RelatedProducts({ relatedProducts = [] }) {
  if (!relatedProducts || relatedProducts.length === 0) return null

  return (
    <section className="mt-16 border-t border-line pt-12">
      <div className="flex flex-col items-center text-center">
        <span className="font-mono-tag text-xs font-semibold uppercase tracking-widest text-primary">
          EXPLORE MORE
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
          Related Products
        </h2>
        <p className="mt-2 max-w-xl text-sm text-ink/65">
          Discover other advanced diagnostic systems and analyzers in this category designed to elevate laboratory performance.
        </p>
      </div>

      <div className="mt-10  grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedProducts.map((prod, idx) => (
          <div key={prod.id} data-aos="fade-up" data-aos-delay={idx * 100}>
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </section>
  )
}
