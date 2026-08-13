// Persistent storage manager for Anthem Diagnostics enquiries

const STORAGE_KEY = 'anthem_diagnostics_enquiries'

const INITIAL_SEED_ENQUIRIES = [
  {
    id: 'enq-101',
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@apollohospitals.com',
    phone: '+91 98401 23456',
    organization: 'Apollo Speciality Hospital, Chennai',
    productName: 'MQ-3000/ MQ-3000PT',
    message: 'Requested official brochure and commercial quotation for 2 units of MQ-3000 HPLC analyzer.',
    type: 'Brochure Request',
    status: 'New',
  },
  {
    id: 'enq-102',
    date: new Date(Date.now() - 3600000 * 8).toISOString(),
    name: 'Dr. Ananya Sharma',
    email: 'a.sharma@metropolis.in',
    phone: '+91 97112 88990',
    organization: 'Metropolis Healthcare Lab',
    productName: 'MQ-8000',
    message: 'Requesting technical specifications and demo availability for MQ-8000 point-of-care analyzer.',
    type: 'Brochure Request',
    status: 'New',
  },
  {
    id: 'enq-103',
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    name: 'Suresh Menon',
    email: 'suresh@sundardiagnostics.com',
    phone: '+91 94440 11223',
    organization: 'Sundar Clinical Laboratory, Madurai',
    productName: 'MQ-8000PT',
    message: 'Enquiring about high-throughput HbA1c testing workflow and reagent cost per test.',
    type: 'Product Quote',
    status: 'Contacted',
  },
  {
    id: 'enq-104',
    date: new Date(Date.now() - 3600000 * 48).toISOString(),
    name: 'Priya Venkatesh',
    email: 'p.venkatesh@fortis.com',
    phone: '+91 98840 55443',
    organization: 'Fortis Malar Hospital',
    productName: 'General Diagnostics Line',
    message: 'Looking for distributorship inquiry and bulk pricing for clinical pathology instruments.',
    type: 'General Enquiry',
    status: 'Contacted',
  },
]

export function getEnquiries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_ENQUIRIES))
      return INITIAL_SEED_ENQUIRIES
    }
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading enquiries from localStorage:', err)
    return INITIAL_SEED_ENQUIRIES
  }
}

export function addEnquiry({ name, email, phone, organization, message, productName, type = 'Brochure Request' }) {
  const current = getEnquiries()
  const newEnquiry = {
    id: `enq-${Date.now()}`,
    date: new Date().toISOString(),
    name: name || 'Anonymous',
    email: email || 'N/A',
    phone: phone || 'N/A',
    organization: organization || 'Not Specified',
    productName: productName || 'General Instrument',
    message: message || 'No message provided.',
    type: type,
    status: 'New',
  }

  const updated = [newEnquiry, ...current]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('enquiriesUpdated'))
  } catch (err) {
    console.error('Error saving new enquiry:', err)
  }
  return newEnquiry
}

export function updateEnquiryStatus(id, newStatus) {
  const current = getEnquiries()
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('enquiriesUpdated'))
  } catch (err) {
    console.error('Error updating enquiry status:', err)
  }
  return updated
}

export function deleteEnquiry(id) {
  const current = getEnquiries()
  const updated = current.filter((item) => item.id !== id)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('enquiriesUpdated'))
  } catch (err) {
    console.error('Error deleting enquiry:', err)
  }
  return updated
}

export function clearAllEnquiries() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    window.dispatchEvent(new Event('enquiriesUpdated'))
  } catch (err) {
    console.error('Error clearing enquiries:', err)
  }
}
