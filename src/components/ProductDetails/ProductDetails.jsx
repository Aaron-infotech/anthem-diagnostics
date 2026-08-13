import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import {
  FiArrowLeft,
  FiMail,
  FiCheckCircle,
  FiShield,
  FiActivity,
  FiStar,
  FiX,
  FiSend,
  FiFileText,
  FiDownload,
  FiPrinter,
  FiExternalLink
} from 'react-icons/fi'
import ProductGallery from './ProductGallery'
import ProductSpecifications from './ProductSpecifications'
import RelatedProducts from './RelatedProducts'
import { addEnquiry } from '../../utils/enquiriesStorage'
import { submitBrochureRequestToGoogle } from '../../services/googleCareerService'

export default function ProductDetails({ product, relatedProducts = [] }) {
  const navigate = useNavigate()
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false)
  const [hasEnquired, setHasEnquired] = useState(false)
  const [isBrochureRequest, setIsBrochureRequest] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: `I am interested in receiving a price quote and information for ${product.name}.`,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Lock background body scrolling when modal popup is active
  useEffect(() => {
    if (isEnquiryModalOpen || isBrochureModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isEnquiryModalOpen, isBrochureModalOpen])

  const handleOpenEnquiryModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBrochureRequest(false)
    setIsEnquiryModalOpen(true)
  }

  const handleOpenBrochureModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasEnquired) {
      setIsBrochureModalOpen(true)
    } else {
      setIsBrochureRequest(true)
      setFormData(prev => ({
        ...prev,
        message: `I am requesting the official product brochure for ${product.name}.`
      }))
      setIsEnquiryModalOpen(true)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setHasEnquired(true)

    const enquiryPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      message: formData.message,
      productName: product.name,
      type: isBrochureRequest ? 'Brochure Request' : 'Product Quote',
    }

    // Save lead to persistent local store & Google Sheets ("Brochure Enquiries" tab)
    addEnquiry(enquiryPayload)
    submitBrochureRequestToGoogle(enquiryPayload)

    setTimeout(() => {
      setFormSubmitted(false)
      setIsEnquiryModalOpen(false)
      if (isBrochureRequest) {
        setIsBrochureModalOpen(true)
      }
    }, 1500)
  }

  const handlePrintPdfBrochure = () => {
    const targetPdfUrl = (product.brochurePdf || (product.datasheetUrl && product.datasheetUrl !== '#'))
      ? (product.brochurePdf || product.datasheetUrl)
      : '/brochures/anthem-brochure.pdf'

    const printWindow = window.open(targetPdfUrl, '_blank')
    if (printWindow) {
      printWindow.focus()
    }
  }

  const handleDownloadBrochure = () => {
    // Target PDF path (uses product-specific PDF or default brochure PDF)
    const targetPdfUrl = (product.brochurePdf || (product.datasheetUrl && product.datasheetUrl !== '#'))
      ? (product.brochurePdf || product.datasheetUrl)
      : '/brochures/anthem-brochure.pdf'

    const link = document.createElement('a')
    link.href = targetPdfUrl
    link.download = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_Brochure.pdf`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewPdfInNewTab = () => {
    const targetPdfUrl = (product.brochurePdf || (product.datasheetUrl && product.datasheetUrl !== '#'))
      ? (product.brochurePdf || product.datasheetUrl)
      : '/brochures/anthem-brochure.pdf'
    window.open(targetPdfUrl, '_blank')
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Top Action Bar - Back to Products Button */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-all hover:border-primary hover:bg-accent hover:text-primary"
        >
          <FiArrowLeft size={16} />
          <span>Back to Products</span>
        </button>
      </div>

      {/* Main Content Column */}
      <div className="flex flex-col gap-10">

        {/* Gallery + Primary Details Hero */}
        <div className="grid gap-8 md:grid-cols-2 items-start">
          {/* Image Gallery */}
          <div>
            <ProductGallery images={product.gallery} name={product.name} />
          </div>

          {/* Title, Category & Quick Highlights */}
          <div className="flex flex-col">
            <span className="inline-self-start rounded-full bg-accent px-3 py-1 font-mono-tag text-xs font-semibold uppercase tracking-wider text-primary">
              {product.category ? product.category.replace('-', ' ') : 'Medical Diagnostic'}
            </span>

            <h1 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-sm text-ink/75 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Key Features Quick Bullets */}
            {product.features && product.features.length > 0 && (
              <div className="mt-6 border-t border-dashed border-line pt-5">
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-ink/60">
                  Key Highlights
                </h4>
                <ul className="mt-3 space-y-2">
                  {product.features.slice(0, 4).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-medium text-ink/80">
                      <FiCheckCircle className="mt-0.5 text-primary flex-shrink-0" size={15} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Primary Call-to-Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleOpenEnquiryModal}
                className="flex items-center justify-center gap-2 rounded-full bg-brandOrange py-3.5 px-8 text-sm font-semibold text-white shadow-md transition-all hover:bg-brandOrange-dark hover:shadow-lg"
              >
                <FiMail size={18} />
                <span>Enquire Now</span>
              </button>

              <button
                type="button"
                onClick={handleOpenBrochureModal}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-primary/20 bg-accent/40 py-3.5 px-6 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-accent hover:shadow-md"
              >
                <FiFileText size={18} />
                <span>View / Download Brochure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full Product Description */}
        <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-card">
          <h3 className="font-display text-xl font-bold text-ink">Product Description</h3>
          <p className="mt-4 text-sm text-ink/75 leading-relaxed whitespace-pre-line">
            {product.fullDescription}
          </p>
        </div>

        {/* Features (Bullet List) & Applications */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Features */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <FiActivity className="text-primary" size={20} />
              <h3 className="font-display text-lg font-bold text-ink">Features</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {product.features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <FiShield className="text-primary" size={20} />
              <h3 className="font-display text-lg font-bold text-ink">Applications</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {product.applications.map((app, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Clinical & Operational Benefits */}
        <div className="rounded-2xl border border-primary/20 bg-accent/30 p-6 sm:p-8 shadow-card">
          <div className="flex items-center gap-2 border-b border-primary/20 pb-4">
            <FiStar className="text-primary" size={22} />
            <h3 className="font-display text-xl font-bold text-ink">Advantage</h3>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {product.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm border border-line">
                <FiCheckCircle className="mt-0.5 text-primary flex-shrink-0" size={18} />
                <span className="text-sm font-semibold text-ink/85">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications Component */}
        <ProductSpecifications
          techSpecs={product.techSpecs}
          materials={product.materials}
          operatingPressure={product.operatingPressure}
          operatingTemperature={product.operatingTemperature}
          sizesModels={product.sizesModels}
        />
      </div>

      {/* Related Products Section */}
      <RelatedProducts relatedProducts={relatedProducts} />

      {/* React Portal Modal - Rendered directly onto document.body to prevent parent CSS transform offsets */}
      {isEnquiryModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsEnquiryModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-line my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
              aria-label="Close form"
            >
              <FiX size={18} />
            </button>

            <h3 className="font-display text-xl font-bold text-ink">
              {isBrochureRequest ? 'Enquire to View / Download Brochure' : 'Product Enquiry'}
            </h3>
            <p className="mt-1 border-b border-line pb-4 text-xs text-ink/65">
              {isBrochureRequest ? 'Please fill in your details to view brochure for: ' : 'Enquiring about: '}
              <strong className="text-primary">{product.name}</strong>
            </p>

            {formSubmitted ? (
              <div className="my-6 rounded-2xl bg-emerald-50 p-6 text-center text-emerald-900 border border-emerald-200">
                <FiCheckCircle size={36} className="mx-auto text-emerald-600 animate-bounce" />
                <h4 className="mt-3 font-display text-lg font-bold">Enquiry Submitted!</h4>
                <p className="mt-1 text-xs text-emerald-700">
                  {isBrochureRequest
                    ? 'Thank you! Opening official product brochure...'
                    : 'Thank you for your interest. Our diagnostic sales specialist will get in touch with you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-ink">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Jane Doe"
                    className="mt-1 w-full rounded-xl border border-line px-3.5 py-2.5 text-xs text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@hospital.com"
                      className="mt-1 w-full rounded-xl border border-line px-3.5 py-2.5 text-xs text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="mt-1 w-full rounded-xl border border-line px-3.5 py-2.5 text-xs text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Organization / Laboratory Name</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Apollo Diagnostics / City Hospital"
                    className="mt-1 w-full rounded-xl border border-line px-3.5 py-2.5 text-xs text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink">Message / Special Requirements</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-line px-3.5 py-2.5 text-xs text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-brandOrange py-3 text-xs font-semibold text-white transition-all hover:bg-brandOrange-dark shadow-md"
                >
                  <FiSend size={14} />
                  <span>{isBrochureRequest ? 'Submit & View Brochure' : 'Submit Product Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* React Portal Modal - Product Brochure Preview & Download */}
      {isBrochureModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsBrochureModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-line my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line bg-accent/30 px-6 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary shadow-inner">
                  <FiFileText size={22} />
                </div>
                <div>
                  <span className="font-mono-tag text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                    Official Product Datasheet
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {product.name} Brochure
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBrochureModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-ink"
                aria-label="Close brochure modal"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Content - Embedded PDF Viewer directly inside this window */}
            <div className="flex-1 w-full bg-slate-100 p-2 sm:p-4 overflow-hidden flex flex-col">
              <iframe
                src={`${
                  (product.brochurePdf || (product.datasheetUrl && product.datasheetUrl !== '#'))
                    ? (product.brochurePdf || product.datasheetUrl)
                    : '/brochures/anthem-brochure.pdf'
                }#toolbar=1`}
                className="w-full h-full rounded-xl border border-line bg-white shadow-inner"
                title={`${product.name} Brochure PDF`}
              />
            </div>

            {/* Modal Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-slate-50 px-6 py-4">
              <div className="text-xs text-ink/60 font-mono-tag">
                Ref: ANTHEM-DX-{product.id.toUpperCase()}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleViewPdfInNewTab}
                  className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm transition-all hover:bg-slate-100 hover:border-primary"
                >
                  <FiExternalLink size={15} />
                  <span>Open PDF in Tab</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintPdfBrochure}
                  className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink shadow-sm transition-all hover:bg-slate-100 hover:border-primary"
                >
                  <FiPrinter size={15} />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="flex items-center gap-2 rounded-full bg-brandOrange px-5 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-brandOrange-dark"
                >
                  <FiDownload size={15} />
                  <span>Download PDF Brochure</span>
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
