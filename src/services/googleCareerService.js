import { addJobApplication } from '../utils/applicationsStorage'

/**
 * -----------------------------------------------------------------------------
 * GOOGLE APPS SCRIPT WEB APP ENDPOINT URL
 * -----------------------------------------------------------------------------
 */
export const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbzmhsm3aq-9rdzmxo7pAIy9d46XTKAQkBPPS9GL_6ZeswzdmbuURLSd1JtxjcLKdcyPmg/exec'

/**
 * Helper to convert a File object (PDF/DOCX) into a Base64 encoded string
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null)
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result.split(',')[1]
      resolve(base64String)
    }
    reader.onerror = (error) => reject(error)
  })
}

/**
 * TAB 1: Submit Job Application (Saved to "Job Applications" Sheet & Google Drive Resume Folder)
 */
export async function submitJobApplication(formData, resumeFile) {
  const localRecord = addJobApplication({
    name: formData.fullName || formData.name,
    email: formData.email,
    phone: formData.phone,
    jobTitle: formData.jobRole || formData.jobTitle,
    department: formData.department,
    preferredLocation: formData.preferredLocation,
    resumeName: resumeFile ? resumeFile.name : 'Resume_Uploaded.pdf',
    message: formData.message,
  })

  if (!GOOGLE_APPS_SCRIPT_URL) {
    return { success: true, mode: 'local', record: localRecord }
  }

  try {
    let fileBase64 = null
    let fileName = null
    let fileMimeType = null

    if (resumeFile) {
      fileBase64 = await fileToBase64(resumeFile)
      fileName = resumeFile.name
      fileMimeType = resumeFile.type || 'application/pdf'
    }

    const payload = {
      action: 'submit_application',
      fullName: formData.fullName || formData.name,
      email: formData.email,
      phone: formData.phone,
      jobTitle: formData.jobRole || formData.jobTitle,
      department: formData.department,
      preferredLocation: formData.preferredLocation,
      message: formData.message,
      fileName: fileName,
      fileMimeType: fileMimeType,
      fileBase64: fileBase64,
    }

    // mode: 'no-cors' guarantees browser sends payload to Google Apps Script without CORS rejection
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })

    return { success: true, mode: 'google' }
  } catch (error) {
    console.warn('Google Sheets Job Application API error:', error)
    return { success: true, mode: 'local_fallback', record: localRecord }
  }
}

/**
 * TAB 2: Submit Product Brochure Request / Price Quote (Saved to "Brochure Enquiries" Sheet)
 */
export async function submitBrochureRequestToGoogle(enquiryData) {
  if (!GOOGLE_APPS_SCRIPT_URL) return { success: true, mode: 'local' }

  try {
    const payload = {
      action: 'submit_brochure',
      name: enquiryData.name || enquiryData.fullName,
      email: enquiryData.email,
      phone: enquiryData.phone,
      organization: enquiryData.organization,
      productName: enquiryData.productName,
      type: enquiryData.type || 'Brochure Request',
      message: enquiryData.message,
    }

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })

    return { success: true, mode: 'google' }
  } catch (error) {
    console.warn('Google Sheets Brochure Request Error:', error)
    return { success: true, mode: 'local_fallback' }
  }
}

/**
 * TAB 3: Submit Contact Us Form (Saved to "Contact Messages" Sheet)
 */
export async function submitContactFormToGoogle(contactData) {
  if (!GOOGLE_APPS_SCRIPT_URL) return { success: true, mode: 'local' }

  try {
    const payload = {
      action: 'submit_contact',
      fullName: contactData.fullName || contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      companyName: contactData.companyName || contactData.organization,
      category: contactData.category || contactData.productCategory,
      subject: contactData.subject,
      message: contactData.message,
    }

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })

    return { success: true, mode: 'google' }
  } catch (error) {
    console.warn('Google Sheets Contact Form Error:', error)
    return { success: true, mode: 'local_fallback' }
  }
}

/**
 * FETCH ALL 3 TABS DATA FOR ADMIN PANEL
 */
export async function fetchAdminDataFromGoogle() {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    return {
      success: false,
      applications: [],
      brochureEnquiries: [],
      contactMessages: [],
    }
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, { method: 'GET' })
    const data = await response.json()
    return {
      success: data.status === 'success',
      applications: data.applications || [],
      brochureEnquiries: data.brochureEnquiries || [],
      contactMessages: data.contactMessages || [],
    }
  } catch (error) {
    console.warn('Failed to fetch admin data from Google Apps Script:', error)
    return {
      success: false,
      applications: [],
      brochureEnquiries: [],
      contactMessages: [],
      error: error.message,
    }
  }
}

/**
 * DELETE A RECORD FROM GOOGLE SHEETS
 */
export async function deleteAdminRecordFromGoogle(sheetName, idValue) {
  if (!GOOGLE_APPS_SCRIPT_URL) return { success: true, mode: 'local' }

  try {
    const payload = {
      action: 'delete_record',
      sheetName: sheetName,
      idValue: idValue,
    }

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })

    return { success: true }
  } catch (error) {
    console.warn('Google Sheets delete record error:', error)
    return { success: false, error: error.message }
  }
}

