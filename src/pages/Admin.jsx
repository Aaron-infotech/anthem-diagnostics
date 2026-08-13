import { useState, useEffect } from 'react'
import {
  FiRefreshCw,
  FiFileText,
  FiDownload,
  FiExternalLink,
  FiBriefcase,
  FiMail,
  FiDatabase,
  FiSearch,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiLayers,
  FiTrash2,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogOut,
  FiShield,
  FiAlertCircle,
} from 'react-icons/fi'
import { fetchAdminDataFromGoogle, deleteAdminRecordFromGoogle } from '../services/googleCareerService'
import { getApplications, deleteApplication } from '../utils/applicationsStorage'
import { getEnquiries, deleteEnquiry } from '../utils/enquiriesStorage'

// Helper to ensure newest records are displayed first
const sortNewestFirst = (list) => {
  if (!Array.isArray(list)) return []
  const reversed = [...list].reverse()
  return reversed.sort((a, b) => {
    const rawA = a.raw_date || a.submitted_at || a.date || a.submittedAt || ''
    const rawB = b.raw_date || b.submitted_at || b.date || b.submittedAt || ''
    const timeA = Date.parse(rawA)
    const timeB = Date.parse(rawB)
    if (!isNaN(timeA) && !isNaN(timeB) && timeA !== timeB) {
      return timeB - timeA
    }
    return 0
  })
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('anthem_admin_auth') === 'true'
  })
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [activeTab, setActiveTab] = useState('applications') // 'applications' | 'brochures' | 'contacts'
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState({
    applications: [],
    brochureEnquiries: [],
    contactMessages: [],
  })
  const [lastRefreshed, setLastRefreshed] = useState(null)
  const [dataSourceMode, setDataSourceMode] = useState('google')

  const handleLogin = (e) => {
    e.preventDefault()
    setAuthError('')
    setIsSubmitting(true)

    setTimeout(() => {
      if (usernameInput.trim() === 'Anthem_DPL' && passwordInput === '@nthem@()x') {
        sessionStorage.setItem('anthem_admin_auth', 'true')
        setIsAuthenticated(true)
        setAuthError('')
      } else {
        setAuthError('Invalid username or password. Access denied.')
      }
      setIsSubmitting(false)
    }, 300)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('anthem_admin_auth')
    setIsAuthenticated(false)
    setUsernameInput('')
    setPasswordInput('')
    setAuthError('')
  }

  const loadData = async () => {
    setLoading(true)
    let fetched = false

    try {
      const result = await fetchAdminDataFromGoogle()

      if (
        result.success &&
        (result.applications.length > 0 ||
          result.brochureEnquiries.length > 0 ||
          result.contactMessages.length > 0)
      ) {
        setData({
          applications: sortNewestFirst(result.applications),
          brochureEnquiries: sortNewestFirst(result.brochureEnquiries),
          contactMessages: sortNewestFirst(result.contactMessages),
        })
        setDataSourceMode('google')
        fetched = true
      }
    } catch (err) {
      console.warn('Could not fetch from Google Sheets API, loading local store:', err)
    }

    if (!fetched) {
      // Fallback & Seed Data from local storage
      const localApps = getApplications() || []
      const localEnquiries = getEnquiries() || []

      setData({
        applications: sortNewestFirst(
          localApps.map((a) => ({
            application_id: a.id,
            submitted_at: a.date ? new Date(a.date).toLocaleDateString('en-IN') : 'Recent',
            full_name: a.name,
            email_address: a.email,
            phone_number: a.phone,
            job_title: a.jobTitle,
            department: a.department,
            preferred_location: a.preferredLocation,
            resume_file_name: a.resumeName,
            google_drive_resume_link: '#',
            cover_letter___message: a.message,
            message___cover_letter: a.message,
            status: a.status || 'New',
            raw_date: a.date,
          }))
        ),
        brochureEnquiries: sortNewestFirst(
          localEnquiries
            .filter((e) => e.type && (e.type.includes('Brochure') || e.type.includes('Quote')))
            .map((e) => ({
              brochure_request_id: e.id,
              submitted_at: e.date ? new Date(e.date).toLocaleDateString('en-IN') : 'Recent',
              full_name: e.name,
              email_address: e.email,
              phone_number: e.phone,
              organization___laboratory: e.organization,
              product_name: e.productName,
              request_type: e.type,
              message___special_requirements: e.message,
              raw_date: e.date,
            }))
        ),
        contactMessages: sortNewestFirst(
          localEnquiries
            .filter((e) => !e.type || (!e.type.includes('Brochure') && !e.type.includes('Quote')))
            .map((e) => ({
              contact_message_id: e.id,
              submitted_at: e.date ? new Date(e.date).toLocaleDateString('en-IN') : 'Recent',
              full_name: e.name,
              email_address: e.email,
              phone_number: e.phone,
              company___organization: e.organization,
              product_category: e.productName || 'General',
              subject: 'Website Enquiry',
              message: e.message,
              raw_date: e.date,
            }))
        ),
      })
      setDataSourceMode('local')
    }

    setLastRefreshed(new Date().toLocaleTimeString())
    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  // Filtering helper
  const filterList = (list) => {
    if (!searchTerm.trim()) return list
    const q = searchTerm.toLowerCase()
    return list.filter((item) =>
      Object.values(item).some((val) => val && String(val).toLowerCase().includes(q))
    )
  }

  const filteredApplications = filterList(data.applications)
  const filteredBrochures = filterList(data.brochureEnquiries)
  const filteredContacts = filterList(data.contactMessages)

  // Delete record handler
  const handleDelete = async (id, tabType) => {
    if (!id) return
    if (!window.confirm(`Are you sure you want to delete record ${id}?`)) return

    if (tabType === 'applications') {
      setData((prev) => ({
        ...prev,
        applications: prev.applications.filter(
          (item) => (item.application_id || item.id) !== id
        ),
      }))
      deleteApplication(id)
      await deleteAdminRecordFromGoogle('Job Applications', id)
    } else if (tabType === 'brochures') {
      setData((prev) => ({
        ...prev,
        brochureEnquiries: prev.brochureEnquiries.filter(
          (item) => (item.brochure_request_id || item.id) !== id
        ),
      }))
      deleteEnquiry(id)
      await deleteAdminRecordFromGoogle('Brochure Enquiries', id)
    } else if (tabType === 'contacts') {
      setData((prev) => ({
        ...prev,
        contactMessages: prev.contactMessages.filter(
          (item) => (item.contact_message_id || item.id) !== id
        ),
      }))
      deleteEnquiry(id)
      await deleteAdminRecordFromGoogle('Contact Messages', id)
    }
  }

  // Render Login Modal / Authentication Card if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#005BAC]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#F26522]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 relative z-10 text-slate-900">
          <div className="text-center">
            {/* Header Shield Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#005BAC] mb-4 border border-blue-100 shadow-sm">
              <FiShield size={30} />
            </div>

            <h2 className="font-display text-2xl font-bold text-slate-900">
              Admin Data Portal
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Anthem Diagnostics — Enter credentials to continue
            </p>

            <form onSubmit={handleLogin} className="mt-6 text-left space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Enter admin username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#005BAC] focus:ring-2 focus:ring-[#005BAC]/20 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-3 text-slate-400" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:bg-white focus:border-[#005BAC] focus:ring-2 focus:ring-[#005BAC]/20 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {authError && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 font-semibold">
                  <FiAlertCircle size={16} className="shrink-0 text-rose-600" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#005BAC] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#004A8D] active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <FiLock size={15} />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-[0.7rem] text-slate-400">
              🔒 Restricted Access · Authorized Anthem Personnel Only
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container-xl px-4 sm:px-6">
        
        {/* Top Header & Refresh Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                dataSourceMode === 'google' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <span className={`h-2 w-2 rounded-full ${
                  dataSourceMode === 'google' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
                }`} />
                {dataSourceMode === 'google' ? 'Google Apps Script Backend Active' : 'Local Storage Sync Active'}
              </span>
              {lastRefreshed && (
                <span className="text-xs text-slate-400">Refreshed at {lastRefreshed}</span>
              )}
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Anthem Diagnostics — Admin Data Portal
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Real-time synchronization with Google Sheets & Google Drive Storage
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 active:scale-95 transition-all disabled:opacity-50"
            >
              <FiRefreshCw className={loading ? 'animate-spin text-primary' : ''} size={15} />
              <span>Refresh Data</span>
            </button>

            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#005BAC] px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-[#004A8D] transition-all"
            >
              <FiDatabase size={15} />
              <span>Open Master Spreadsheet</span>
              <FiExternalLink size={13} />
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 active:scale-95 transition-all"
              title="Log out of Admin Portal"
            >
              <FiLogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {/* Card 1: Job Applications */}
          <div
            onClick={() => setActiveTab('applications')}
            className={`cursor-pointer rounded-2xl border p-5 transition-all ${
              activeTab === 'applications'
                ? 'border-[#005BAC] bg-blue-50/50 shadow-md ring-2 ring-[#005BAC]/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#005BAC]">
                Job Applications
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-[#005BAC]">
                <FiBriefcase size={20} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-slate-900">
              {data.applications.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">Resumes stored in Google Drive</p>
          </div>

          {/* Card 2: Brochure Enquiries */}
          <div
            onClick={() => setActiveTab('brochures')}
            className={`cursor-pointer rounded-2xl border p-5 transition-all ${
              activeTab === 'brochures'
                ? 'border-[#F26522] bg-orange-50/50 shadow-md ring-2 ring-[#F26522]/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F26522]">
                Brochure & Quotes
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#F26522]">
                <FiFileText size={20} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-slate-900">
              {data.brochureEnquiries.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">Product datasheet requests</p>
          </div>

          {/* Card 3: Contact Messages */}
          <div
            onClick={() => setActiveTab('contacts')}
            className={`cursor-pointer rounded-2xl border p-5 transition-all ${
              activeTab === 'contacts'
                ? 'border-[#0F766E] bg-teal-50/50 shadow-md ring-2 ring-[#0F766E]/20'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                Contact Form Leads
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#0F766E]">
                <FiMail size={20} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-slate-900">
              {data.contactMessages.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">General website inquiries</p>
          </div>
        </div>

        {/* Tab Selection & Search Input */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'applications'
                  ? 'bg-[#005BAC] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <FiBriefcase size={15} />
              <span>1. Job Applications ({data.applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('brochures')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'brochures'
                  ? 'bg-[#F26522] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <FiFileText size={15} />
              <span>2. Brochure Enquiries ({data.brochureEnquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'contacts'
                  ? 'bg-[#0F766E] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <FiMail size={15} />
              <span>3. Contact Messages ({data.contactMessages.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-3 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2 text-xs text-slate-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Content Body Tables */}
        <div className="mt-6">
          {loading ? (
            <div className="my-16 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-3" />
              <p className="text-xs font-semibold text-slate-600">Syncing live data from Google Sheets...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: JOB APPLICATIONS */}
              {activeTab === 'applications' && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {filteredApplications.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                      <FiBriefcase className="mx-auto text-slate-300 mb-2" size={32} />
                      <p className="text-sm font-semibold">No Job Applications Found</p>
                      <p className="text-xs text-slate-400 mt-1">Applications submitted on the Careers page will appear here.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#005BAC] text-white font-semibold">
                            <th className="p-4 whitespace-nowrap">ID & Date</th>
                            <th className="p-4 whitespace-nowrap">Candidate Name</th>
                            <th className="p-4 whitespace-nowrap">Contact Info</th>
                            <th className="p-4 whitespace-nowrap">Applied Role & Location</th>
                            <th className="p-4 whitespace-nowrap">Resume File</th>
                            <th className="p-4 whitespace-nowrap">Message</th>
                            <th className="p-4 whitespace-nowrap">Status</th>
                            <th className="p-4 whitespace-nowrap text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {filteredApplications.map((app, i) => {
                            const appId = app.application_id || app.id || `APP-${i + 1}`
                            const driveUrl = app.google_drive_resume_link || app.google_drive_resume_url || app.resume_url
                            const hasDriveUrl = driveUrl && driveUrl.startsWith('http')
                            const msg = app.cover_letter___message || app.message___cover_letter || app.message || 'No cover letter'

                            return (
                              <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-mono text-[0.75rem] font-bold text-slate-900 whitespace-nowrap">
                                  <div>{appId}</div>
                                  <div className="text-[0.68rem] text-slate-400 font-normal">{app.submitted_at || app.date || 'Recent'}</div>
                                </td>
                                <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">
                                  <div className="flex items-center gap-1.5">
                                    <FiUser className="text-[#005BAC]" size={13} />
                                    <span>{app.full_name || app.name || 'Applicant'}</span>
                                  </div>
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <div>{app.email_address || app.email || 'N/A'}</div>
                                  <div className="text-slate-400">{app.phone_number || app.phone || 'N/A'}</div>
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <span className="font-semibold text-slate-900">{app.job_title || app.jobRole || 'Applicant'}</span>
                                  <span className="block text-[0.7rem] text-slate-500">
                                    {app.department || 'General'} · {app.preferred_location || app.preferredLocation || 'Pan India'}
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  {hasDriveUrl ? (
                                    <a
                                      href={driveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 font-semibold text-[#005BAC] hover:bg-blue-100 transition-colors"
                                    >
                                      <FiDownload size={13} />
                                      <span>View Resume</span>
                                    </a>
                                  ) : (
                                    <span className="text-slate-500 font-mono text-[0.7rem] bg-slate-100 px-2 py-1 rounded">
                                      📄 {app.resume_file_name || app.resumeName || 'Resume.pdf'}
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 max-w-xs truncate text-slate-600" title={msg}>
                                  {msg}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-bold text-emerald-800 text-[0.68rem] uppercase">
                                    {app.status || 'New'}
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-center">
                                  <button
                                    onClick={() => handleDelete(appId, 'applications')}
                                    className="inline-flex items-center justify-center p-2 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                                    title="Delete Application"
                                  >
                                    <FiTrash2 size={15} />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: BROCHURE ENQUIRIES */}
              {activeTab === 'brochures' && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {filteredBrochures.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                      <FiFileText className="mx-auto text-slate-300 mb-2" size={32} />
                      <p className="text-sm font-semibold">No Brochure Enquiries Found</p>
                      <p className="text-xs text-slate-400 mt-1">Brochure downloads and price quotes will appear here.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#F26522] text-white font-semibold">
                            <th className="p-4 whitespace-nowrap">Request ID</th>
                            <th className="p-4 whitespace-nowrap">Submitted At</th>
                            <th className="p-4 whitespace-nowrap">Lead Name</th>
                            <th className="p-4 whitespace-nowrap">Contact Details</th>
                            <th className="p-4 whitespace-nowrap">Organization / Hospital</th>
                            <th className="p-4 whitespace-nowrap">Requested Product</th>
                            <th className="p-4 whitespace-nowrap">Message</th>
                            <th className="p-4 whitespace-nowrap text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {filteredBrochures.map((item, i) => {
                            const reqId = item.brochure_request_id || item.id || `BRQ-${i + 1}`

                            return (
                              <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-mono text-[0.75rem] font-bold text-slate-900 whitespace-nowrap">
                                  {reqId}
                                </td>
                                <td className="p-4 text-slate-500 whitespace-nowrap">
                                  {item.submitted_at || item.date || 'Recent'}
                                </td>
                                <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">
                                  {item.full_name || item.name}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <div>{item.email_address || item.email}</div>
                                  <div className="text-slate-400">{item.phone_number || item.phone}</div>
                                </td>
                                <td className="p-4 whitespace-nowrap font-medium text-slate-800">
                                  {item.organization___laboratory || item.organization || 'Not Specified'}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <span className="rounded-md bg-orange-50 px-2 py-1 font-bold text-[#F26522]">
                                    {item.product_name || item.productName || 'Analyzer'}
                                  </span>
                                </td>
                                <td className="p-4 max-w-xs truncate text-slate-600">
                                  {item.message___special_requirements || item.message}
                                </td>
                                <td className="p-4 whitespace-nowrap text-center">
                                  <button
                                    onClick={() => handleDelete(reqId, 'brochures')}
                                    className="inline-flex items-center justify-center p-2 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                                    title="Delete Request"
                                  >
                                    <FiTrash2 size={15} />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CONTACT MESSAGES */}
              {activeTab === 'contacts' && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {filteredContacts.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                      <FiMail className="mx-auto text-slate-300 mb-2" size={32} />
                      <p className="text-sm font-semibold">No Contact Form Messages</p>
                      <p className="text-xs text-slate-400 mt-1">Inquiries sent from the Contact page will appear here.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#0F766E] text-white font-semibold">
                            <th className="p-4 whitespace-nowrap">Message ID</th>
                            <th className="p-4 whitespace-nowrap">Date</th>
                            <th className="p-4 whitespace-nowrap">Sender Name</th>
                            <th className="p-4 whitespace-nowrap">Email & Phone</th>
                            <th className="p-4 whitespace-nowrap">Company</th>
                            <th className="p-4 whitespace-nowrap">Category / Subject</th>
                            <th className="p-4 whitespace-nowrap">Message Content</th>
                            <th className="p-4 whitespace-nowrap text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {filteredContacts.map((item, i) => {
                            const msgId = item.contact_message_id || item.id || `MSG-${i + 1}`

                            return (
                              <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-mono text-[0.75rem] font-bold text-slate-900 whitespace-nowrap">
                                  {msgId}
                                </td>
                                <td className="p-4 text-slate-500 whitespace-nowrap">
                                  {item.submitted_at || item.date || 'Recent'}
                                </td>
                                <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">
                                  {item.full_name || item.name}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <div>{item.email_address || item.email}</div>
                                  <div className="text-slate-400">{item.phone_number || item.phone}</div>
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  {item.company___organization || item.organization || 'General Public'}
                                </td>
                                <td className="p-4 whitespace-nowrap font-medium text-slate-900">
                                  {item.product_category || item.productName || 'General'} — {item.subject || 'Enquiry'}
                                </td>
                                <td className="p-4 max-w-sm truncate text-slate-600">
                                  {item.message}
                                </td>
                                <td className="p-4 whitespace-nowrap text-center">
                                  <button
                                    onClick={() => handleDelete(msgId, 'contacts')}
                                    className="inline-flex items-center justify-center p-2 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                                    title="Delete Message"
                                  >
                                    <FiTrash2 size={15} />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}

