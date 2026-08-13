import { useState, useMemo, useEffect } from 'react'
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiXCircle,
  FiSend,
  FiUsers,
  FiAward,
  FiCheckCircle,
  FiTrendingUp,
  FiArrowRight,
} from 'react-icons/fi'
import AOS from 'aos'
import PageBanner from '../components/Common/PageBanner'
import JobCard from '../components/Career/JobCard'
import JobDetailModal from '../components/Career/JobDetailModal'
import ApplicationModal from '../components/Career/ApplicationModal'
import { jobs, departments, locations } from '../data/jobs'

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDept, setSelectedDept] = useState('All Departments')
  const [selectedLoc, setSelectedLoc] = useState('All Locations')

  const [activeJobForDetail, setActiveJobForDetail] = useState(null)
  const [activeJobForApply, setActiveJobForApply] = useState(null)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 700, once: true })
    document.title = 'Careers & Job Opportunities | Anthem Diagnostics'
    window.scrollTo(0, 0)
  }, [])

  // Filter jobs based on search term and department
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDept =
        selectedDept === 'All Departments' || job.department === selectedDept

      return matchesSearch && matchesDept
    })
  }, [searchTerm, selectedDept])

  const handleOpenDetail = (job) => {
    setActiveJobForDetail(job)
  }

  const handleOpenApply = (job = null) => {
    setActiveJobForApply(job)
    setIsApplyModalOpen(true)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedDept('All Departments')
  }

  const hasActiveFilters = searchTerm !== '' || selectedDept !== 'All Departments'

  return (
    <>
      {/* Top Breadcrumb Banner */}
      <PageBanner
        title="Careers & Opportunities"
        trail={[{ label: 'Home', to: '/' }, { label: 'Careers' }]}
      />

      {/* Hero Section - 2-Column Split Executive Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-accent/30 to-white py-14 sm:py-20 border-b border-line/60">
        {/* Ambient Decorative Background Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[600px] h-[300px] bg-gradient-to-r from-primary/15 via-brandOrange/10 to-primary/15 blur-3xl rounded-full opacity-70" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/10 blur-3xl rounded-full" />
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, #005BAC 1px, transparent 0)`, 
              backgroundSize: '24px 24px' 
            }} 
          />
        </div>

        <div className="container-xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Eyebrow, Description, CTA */}
            <div className="lg:col-span-6 text-center lg:text-left">
              {/* Live Status Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-white/90 backdrop-blur-md px-4 py-1.5 shadow-xs transition-all hover:border-primary/40">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-primary">
                  Careers at Anthem Diagnostics
                </span>
              </div>

              {/* Title with Solid Accent Blue on 'Team' */}
              <h1 className="mt-5 font-display text-4xl font-extrabold text-ink sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
                Join Our <span className="text-primary">Team</span>
              </h1>

              {/* Description Paragraph */}
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink/80 max-w-xl mx-auto lg:mx-0 font-normal">
                Empower the future of medical diagnostics across India. At Anthem Diagnostics, we are looking for passionate sales managers, service engineers, application specialists, and administrative professionals who want to make a meaningful clinical impact. All open positions are hiring across all branch locations nationwide.
              </p>

              {/* Action Link & Pill Tag */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-primary-dark transition-all hover:shadow-lg hover:scale-105"
                >
                  <span>Explore Openings</span>
                  <FiArrowRight size={16} />
                </a>
                <span className="text-xs font-mono-tag font-semibold text-emerald-800 bg-emerald-50/90 px-3.5 py-2 rounded-full border border-emerald-200/80">
                  ✓ Pan-India Hiring Active
                </span>
              </div>
            </div>

            {/* Right Column: 2x2 Feature Cards Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1: All Locations */}
                <div className="group relative overflow-hidden rounded-2xl border border-line/80 bg-white/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary border border-blue-100/60 shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <FiMapPin size={22} />
                    </div>
                    <div>
                      <p className="font-display text-base sm:text-lg font-bold text-ink group-hover:text-primary transition-colors whitespace-nowrap">All Locations</p>
                      <p className="font-mono-tag text-[0.7rem] font-bold text-primary/80 uppercase tracking-wider mt-0.5">Pan-India Hiring</p>
                    </div>
                  </div>
                </div>

                {/* Card 2: 6 Departments */}
                <div className="group relative overflow-hidden rounded-2xl border border-line/80 bg-white/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-400/40">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100/60 shadow-inner group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                      <FiBriefcase size={22} />
                    </div>
                    <div>
                      <p className="font-display text-base sm:text-lg font-bold text-ink group-hover:text-purple-600 transition-colors whitespace-nowrap">6 Departments</p>
                      <p className="font-mono-tag text-[0.7rem] font-bold text-purple-600/80 uppercase tracking-wider mt-0.5">Specializations</p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Fast Growth */}
                <div className="group relative overflow-hidden rounded-2xl border border-line/80 bg-white/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-400/40">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100/60 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <FiTrendingUp size={22} />
                    </div>
                    <div>
                      <p className="font-display text-base sm:text-lg font-bold text-ink group-hover:text-emerald-600 transition-colors whitespace-nowrap">Fast Growth</p>
                      <p className="font-mono-tag text-[0.7rem] font-bold text-emerald-600/80 uppercase tracking-wider mt-0.5">Career Pathways</p>
                    </div>
                  </div>
                </div>

                {/* Card 4: Equal Opportunity */}
                <div className="group relative overflow-hidden rounded-2xl border border-line/80 bg-white/90 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-400/40">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100/60 shadow-inner group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                      <FiUsers size={22} />
                    </div>
                    <div>
                      <p className="font-display text-base sm:text-lg font-bold text-ink group-hover:text-amber-600 transition-colors whitespace-nowrap">Equal Opportunity</p>
                      <p className="font-mono-tag text-[0.7rem] font-bold text-amber-600/80 uppercase tracking-wider mt-0.5">Inclusive Culture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Job Listing & Filters Section */}
      <section id="openings" className="section-py bg-white">
        <div className="container-xl">
          {/* Filter Controls Card */}
          <div className="rounded-2xl border border-line/80 bg-slate-50/50 p-5 sm:p-6 shadow-sm backdrop-blur-sm">
            <div className="grid gap-4 md:grid-cols-12 items-center">
              {/* Search Bar Input */}
              <div className="relative md:col-span-7">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
                <input
                  type="text"
                  placeholder="Search by job title, keyword, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-line bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors"
                  >
                    <FiXCircle size={16} />
                  </button>
                )}
              </div>

              {/* Job Role / Department Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs sm:text-sm text-ink outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-xs"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === 'All Departments' ? 'All Departments' : `${dept} Department`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action / Reset Button */}
              <div className="md:col-span-1 flex items-center justify-end">
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 transition-colors py-2 px-3 rounded-lg bg-red-50 hover:bg-red-100"
                    title="Reset all filters"
                  >
                    <FiXCircle size={14} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Results Counter & Pan-India Badge Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-3 text-xs text-ink/65 font-mono-tag">
              <div>
                Showing <strong className="text-primary font-bold">{filteredJobs.length}</strong> open job positions
                {hasActiveFilters && ' matching your criteria'}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50/90 px-3 py-1 text-[0.7rem] font-semibold text-emerald-800 border border-emerald-200/80">
                  ✓ All Roles Hiring Pan-India (All Locations Available)
                </span>
                {selectedDept !== 'All Departments' && (
                  <span className="rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-semibold text-primary border border-primary/20">
                    Dept: {selectedDept}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Job Cards Grid */}
          {filteredJobs.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-line bg-slate-50 p-12 text-center">
              <FiSearch size={40} className="mx-auto text-ink/30 mb-3" />
              <h3 className="font-display text-lg font-bold text-ink">No Job Positions Found</h3>
              <p className="mt-1 text-xs sm:text-sm text-ink/60">
                We couldn't find any job openings matching your current filter criteria.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 rounded-full bg-primary px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark transition-all hover:shadow-md"
              >
                Clear Filters & View All Jobs
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job, i) => (
                <div key={job.id} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                  <JobCard
                    job={job}
                    onApply={handleOpenApply}
                    onViewDetails={handleOpenDetail}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Work With Us / Culture Section */}
      <section className="section-py bg-gradient-to-b from-slate-50 to-slate-100/50 border-t border-line/60">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">LIFE AT ANTHEM DIAGNOSTICS</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-4xl">
              Why Build Your Career With Us?
            </h2>
            <p className="mt-3 text-sm text-ink/75 leading-relaxed hidden sm:block">
              We foster a collaborative culture driven by technical accuracy, professional growth, and mutual respect.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            <div className="group rounded-xl sm:rounded-2xl border border-line/80 bg-white p-4 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-primary mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                <FiAward className="text-lg sm:text-2xl" />
              </div>
              <h3 className="font-display text-xs sm:text-base font-bold text-ink group-hover:text-primary transition-colors">Clinical Excellence</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70 hidden sm:block">
                Work with advanced IVD diagnostic platforms trusted by leading medical institutions across India.
              </p>
            </div>

            <div className="group rounded-xl sm:rounded-2xl border border-line/80 bg-white p-4 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 mb-3 sm:mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <FiTrendingUp className="text-lg sm:text-2xl" />
              </div>
              <h3 className="font-display text-xs sm:text-base font-bold text-ink group-hover:text-emerald-700 transition-colors">Career Development</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70 hidden sm:block">
                Enjoy structured internal promotion paths, technical OEM certifications, and leadership mentorship.
              </p>
            </div>

            <div className="group rounded-xl sm:rounded-2xl border border-line/80 bg-white p-4 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 mb-3 sm:mb-4 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <FiMapPin className="text-lg sm:text-2xl" />
              </div>
              <h3 className="font-display text-xs sm:text-base font-bold text-ink group-hover:text-purple-700 transition-colors">Pan-India Network</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70 hidden sm:block">
                Strategic branch presence in Chennai, Kolkata, Delhi, Mumbai, Bangalore, Kochi, Thiruvananthapuram, and Guwahati.
              </p>
            </div>

            <div className="group rounded-xl sm:rounded-2xl border border-line/80 bg-white p-4 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 mb-3 sm:mb-4 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <FiCheckCircle className="text-lg sm:text-2xl" />
              </div>
              <h3 className="font-display text-xs sm:text-base font-bold text-ink group-hover:text-amber-700 transition-colors">Workplace Recognition</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70 hidden sm:block">
                Transparent sales incentives, health insurance benefits, and employee recognition rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spontaneous Application CTA Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-16 text-white shadow-xl">
        {/* Background Accent Mesh */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brandOrange rounded-full blur-3xl" />
        </div>

        <div className="container-xl relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 font-mono-tag text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur-sm">
              Spontaneous Applications
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-4xl text-white tracking-tight">
              Don't See Your Specific Role Listed?
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-white/85 max-w-xl font-normal leading-relaxed">
              We are constantly seeking talented diagnostic sales managers, service engineers, and lab specialists. Submit your CV and our HR team will connect with you when suitable opportunities open.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenApply(null)}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-brandOrange px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-brandOrange-dark hover:shadow-2xl hover:scale-105 flex-shrink-0"
          >
            <FiSend size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Submit Spontaneous CV</span>
          </button>
        </div>
      </section>

      {/* Modals */}
      <JobDetailModal
        job={activeJobForDetail}
        isOpen={Boolean(activeJobForDetail)}
        onClose={() => setActiveJobForDetail(null)}
        onApply={(job) => {
          setActiveJobForDetail(null)
          handleOpenApply(job)
        }}
      />

      <ApplicationModal
        job={activeJobForApply}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </>
  )
}
