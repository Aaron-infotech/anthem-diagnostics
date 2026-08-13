import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  FiX,
  FiMapPin,
  FiClock,
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiGift,
  FiSend,
  FiCalendar,
} from 'react-icons/fi'

export default function JobDetailModal({ job, isOpen, onClose, onApply }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !job) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-line my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-line bg-accent/40 p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent px-3 py-1 font-mono-tag text-xs font-semibold uppercase tracking-wider text-primary">
                {job.department} Department
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-mono-tag text-xs font-semibold text-ink/70 flex items-center gap-1">
                <FiClock size={12} className="text-brandOrange" />
                {job.type}
              </span>
            </div>

            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              {job.title}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-ink/75">
              <div className="flex items-center gap-1.5 font-semibold text-primary">
                <FiMapPin size={16} />
                <span>Available Across All Locations (Pan India)</span>
              </div>

              {job.postedDate && (
                <div className="flex items-center gap-1.5 font-medium text-ink/60">
                  <FiCalendar size={15} />
                  <span>Posted: {job.postedDate}</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-100 hover:text-ink"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Modal Body - Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-ink/80">
          {/* Job Overview */}
          <div>
            <h3 className="font-display text-base font-bold text-ink flex items-center gap-2">
              <FiBriefcase className="text-primary" size={18} />
              Role Overview
            </h3>
            <p className="mt-2 text-ink/75 leading-relaxed">
              {job.fullDescription}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="border-t border-line pt-5">
              <h3 className="font-display text-base font-bold text-ink flex items-center gap-2">
                <FiCheckCircle className="text-emerald-600" size={18} />
                Key Responsibilities
              </h3>
              <ul className="mt-3 space-y-2.5">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-ink/80">
                    <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">
                      ✓
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements & Qualifications */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="border-t border-line pt-5">
              <h3 className="font-display text-base font-bold text-ink flex items-center gap-2">
                <FiAward className="text-amber-500" size={18} />
                Requirements & Qualifications
              </h3>
              <ul className="mt-3 space-y-2.5">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-ink/80">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits & Perks */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="rounded-2xl border border-primary/20 bg-accent/30 p-5">
              <h3 className="font-display text-base font-bold text-ink flex items-center gap-2">
                <FiGift className="text-brandOrange" size={18} />
                What We Offer
              </h3>
              <ul className="mt-3 space-y-2">
                {job.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-ink/85 font-medium text-xs sm:text-sm">
                    <span className="text-brandOrange font-bold">★</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-slate-50 px-6 py-4">
          <div className="text-xs text-ink/60">
            Job Reference ID: <strong className="text-primary font-mono-tag">{job.id.toUpperCase()}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-line bg-white px-5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-slate-100"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose()
                onApply(job)
              }}
              className="inline-flex items-center gap-2 rounded-full bg-brandOrange px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-brandOrange-dark hover:shadow-lg"
            >
              <FiSend size={15} />
              <span>Apply For This Position</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
