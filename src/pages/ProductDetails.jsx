import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AOS from 'aos'
import { FiAlertCircle, FiArrowLeft, FiGrid } from 'react-icons/fi'
import PageBanner from '../components/Common/PageBanner'
import ProductDetailsComponent from '../components/ProductDetails/ProductDetails'
import { getProductById, getRelatedProducts } from '../data/products'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const product = getProductById(id)

  useEffect(() => {
    AOS.init({ duration: 700, once: true })
    window.scrollTo(0, 0)
    if (product) {
      document.title = `${product.name} | Anthem Diagnostics Private Limited`
    } else {
      document.title = `Product Not Found | Anthem Diagnostics`
    }
  }, [id, product])

  // Requirement 9: Show "Product Not Found" page if invalid product ID
  if (!product) {
    return (
      <>
        <PageBanner
          eyebrow="REF// 404 NOT FOUND"
          title="Product Not Found"
          description="The product you are looking for does not exist or may have been removed."
          trail={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: 'Not Found' }]}
        />

        <section className="section-py bg-white">
          <div className="container-xl flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-inner">
              <FiAlertCircle size={40} />
            </div>

            <h2 className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">
              Product Not Found
            </h2>

            <p className="mt-3 max-w-md text-sm text-ink/65 leading-relaxed">
              We couldn’t find any product matching ID <code className="rounded bg-surface-light px-2 py-1 text-primary font-mono-tag">{id}</code>. Please browse our product catalog or return to the products catalog.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark shadow-md"
              >
                <FiGrid size={16} />
                <span>Browse All Products</span>
              </Link>

              <Link
                to="/"
                className="flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-primary hover:bg-surface-light"
              >
                <FiArrowLeft size={16} />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  const relatedProducts = getRelatedProducts(product.category, product.id, 3)

  // Requirement 10: Breadcrumb: Home > Products > Product Name
  const breadcrumbTrail = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: product.name },
  ]

  return (
    <>
      {/* Page Banner with Breadcrumb */}
      <PageBanner
        eyebrow={`REF// PRODUCT DETAILS — ${product.category?.toUpperCase()}`}
        title={product.name}
        description={product.shortDescription}
        trail={breadcrumbTrail}
      />

      {/* Main Product Content */}
      <section className="section-py bg-white">
        <div className="container-xl" data-aos="fade-up">
          <ProductDetailsComponent product={product} relatedProducts={relatedProducts} />
        </div>
      </section>
    </>
  )
}
