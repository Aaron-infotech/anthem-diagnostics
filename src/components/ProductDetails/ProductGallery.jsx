import { useState } from 'react'
import { FiZoomIn, FiMaximize2, FiX } from 'react-icons/fi'

export default function ProductGallery({ images = [], name = 'Product Image' }) {
  const mainImage = images.length > 0 ? images[0] : '/images/hero-bg-1.png'
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Display with Interactive Zoom Effect */}
      <div
        className="relative group h-80 sm:h-96 md:h-[420px] w-full overflow-hidden rounded-2xl border border-line bg-surface-light shadow-card transition-all duration-300 cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsLightboxOpen(true)}
      >
        <img
          src={mainImage}
          alt={name}
          className={`h-full w-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'
            }`}
          style={
            isZoomed
              ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
              : { transformOrigin: 'center center' }
          }
        />

        {/* Hover Hint Badge */}
        <div className="absolute top-3 right-3 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 flex items-center gap-1.5 shadow-sm">
          <FiZoomIn size={14} />
          <span>Hover to Zoom</span>
        </div>

        {/* Expand / Lightbox Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsLightboxOpen(true)
          }}
          aria-label="Expand image"
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition-transform hover:scale-110 hover:bg-white"
        >
          <FiMaximize2 size={18} />
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-white p-2 shadow-2xl">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-white transition-colors hover:bg-slate-900"
            >
              <FiX size={20} />
            </button>
            <img
              src={mainImage}
              alt={name}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}
