// Persistent storage manager for Anthem Diagnostics job applications

const STORAGE_KEY = 'anthem_diagnostics_applications'

const INITIAL_SEED_APPLICATIONS = [
  {
    id: 'app-201',
    date: new Date(Date.now() - 3600000 * 5).toISOString(),
    name: 'Vikram Sethi',
    email: 'vikram.sethi@gmail.com',
    phone: '+91 98110 54321',
    jobTitle: 'Sales Executive',
    department: 'Sales',
    preferredLocation: 'Chennai',
    resumeName: 'Vikram_Sethi_CV_2026.pdf',
    message: 'Experienced IVD sales manager with 4 years track record in medical analyzer sales across hospital chains.',
    status: 'New',
  },
  {
    id: 'app-202',
    date: new Date(Date.now() - 3600000 * 26).toISOString(),
    name: 'Kavitha Nair',
    email: 'kavitha.nair@outlook.com',
    phone: '+91 94470 12345',
    jobTitle: 'Field Service Engineer',
    department: 'Services',
    preferredLocation: 'Bangalore',
    resumeName: 'Kavitha_Nair_Biomedical_Engineer.pdf',
    message: 'Biomedical engineer with 3 years hands-on experience servicing HPLC and automated hematology analyzers.',
    status: 'Reviewed',
  },
]

export function getApplications() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_APPLICATIONS))
      return INITIAL_SEED_APPLICATIONS
    }
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading job applications from localStorage:', err)
    return INITIAL_SEED_APPLICATIONS
  }
}

export function addJobApplication({
  name,
  email,
  phone,
  jobTitle,
  department,
  preferredLocation,
  resumeName,
  message,
}) {
  const current = getApplications()
  const newApp = {
    id: `app-${Date.now()}`,
    date: new Date().toISOString(),
    name: name || 'Anonymous Applicant',
    email: email || 'N/A',
    phone: phone || 'N/A',
    jobTitle: jobTitle || 'General Application',
    department: department || 'General',
    preferredLocation: preferredLocation || 'Flexible',
    resumeName: resumeName || 'Resume_Attached.pdf',
    message: message || 'No cover letter attached.',
    status: 'New',
  }

  const updated = [newApp, ...current]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('applicationsUpdated'))
  } catch (err) {
    console.error('Error saving job application:', err)
  }
  return newApp
}

export function updateApplicationStatus(id, newStatus) {
  const current = getApplications()
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('applicationsUpdated'))
  } catch (err) {
    console.error('Error updating application status:', err)
  }
  return updated
}

export function deleteApplication(id) {
  const current = getApplications()
  const updated = current.filter((item) => item.id !== id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('applicationsUpdated'))
  } catch (err) {
    console.error('Error deleting application:', err)
  }
  return updated
}
