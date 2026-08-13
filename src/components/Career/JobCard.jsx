import {
  FiClock,
  FiTrendingUp,
  FiTool,
  FiCpu,
  FiTruck,
  FiDollarSign,
  FiBriefcase,
  FiArrowRight,
  FiEye,
} from 'react-icons/fi'

const departmentIcons = {
  Sales: FiTrendingUp,
  Services: FiTool,
  Application: FiCpu,
  Logistics: FiTruck,
  Finance: FiDollarSign,
  Administrative: FiBriefcase,
}

const departmentColors = {
  Sales: 'bg-blue-50 text-blue-700 border-blue-200',
  Services: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Application: 'bg-purple-50 text-purple-700 border-purple-200',
  Logistics: 'bg-amber-50 text-amber-700 border-amber-200',
  Finance: 'bg-teal-50 text-teal-700 border-teal-200',
  Administrative: 'bg-indigo-50 text-indigo-700 border-indigo-200',
}

export default function JobCard({ job, onApply, onViewDetails }) {
  const Icon = departmentIcons[job.department] || FiBriefcase
  const badgeStyle = departmentColors[job.department] || 'bg-accent text-primary border-line'

  return (
    <div className="sample-card group flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover">
      <div>
        {/* Top Header Row: Department Badge & Job Type */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyle}`}>
            <Icon size={14} />
            <span>{job.department}</span>
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.72rem] font-medium text-ink/70">
            <FiClock size={12} className="text-brandOrange" />
            <span>{job.type}</span>
          </span>
        </div>

        {/* Job Title */}
        <h3
          onClick={() => onViewDetails(job)}
          className="mt-4 font-display text-base sm:text-lg font-bold text-ink transition-colors hover:text-primary cursor-pointer line-clamp-2"
        >
          {job.title}
        </h3>

        {/* Short Job Description (Always visible) */}
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink/70 line-clamp-3">
          {job.shortDescription}
        </p>
      </div>

      {/* Card Action Buttons */}
      <div className="mt-4 border-t border-dashed border-line pt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onViewDetails(job)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          <FiEye size={15} />
          <span>View Details</span>
        </button>

        <button
          type="button"
          onClick={() => onApply(job)}
          className="inline-flex items-center gap-1.5 rounded-full bg-brandOrange px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-brandOrange-dark hover:shadow-lg whitespace-nowrap"
        >
          <span>Apply Now</span>
          <FiArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
