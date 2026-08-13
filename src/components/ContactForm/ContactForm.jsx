import { useState } from 'react'
import { categories } from '../../data/products'
import { addEnquiry } from '../../utils/enquiriesStorage'
import { submitContactFormToGoogle } from '../../services/googleCareerService'

const initialState = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  category: '',
  subject: '',
  message: '',
}

function validate(values) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!values.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!/^[0-9+\-\s]{7,15}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number.'
  }
  if (!values.category) errors.category = 'Select a product category.'
  if (!values.subject.trim()) errors.subject = 'Subject is required.'
  if (!values.message.trim()) errors.message = 'Please add a short message.'
  return errors
}

export default function ContactForm({ prefillCategory }) {
  const [values, setValues] = useState({ ...initialState, category: prefillCategory || '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        companyName: values.companyName || 'Not Specified',
        category: values.category || 'General',
        subject: values.subject,
        message: values.message,
      }
      addEnquiry({
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        organization: values.companyName || 'Not Specified',
        productName: values.category ? `Category: ${values.category}` : 'General Enquiry',
        message: `${values.subject}: ${values.message}`,
        type: 'General Contact Form',
      })
      submitContactFormToGoogle(payload)

      setStatus('success')
      setValues(initialState)
    } else {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setValues(initialState)
    setErrors({})
    setStatus('idle')
  }

  const inputClass = (field) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-primary ${
      errors[field] ? 'border-red-400' : 'border-line'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      {status === 'success' && (
        <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          Thank you — your enquiry has been received. Our team will get back to you shortly.
        </div>
      )}
      {status === 'error' && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          Please correct the highlighted fields and try again.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Full Name *</label>
          <input name="fullName" value={values.fullName} onChange={handleChange} className={inputClass('fullName')} placeholder="Your name" />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Company Name</label>
          <input name="companyName" value={values.companyName} onChange={handleChange} className={inputClass('companyName')} placeholder="Hospital / Lab name" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Email Address *</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} className={inputClass('email')} placeholder="you@example.com" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Phone Number *</label>
          <input name="phone" value={values.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+91 XXXXX XXXXX" />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Product Category *</label>
          <select name="category" value={values.category} onChange={handleChange} className={inputClass('category')}>
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Subject *</label>
          <input name="subject" value={values.subject} onChange={handleChange} className={inputClass('subject')} placeholder="How can we help?" />
          {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Message *</label>
          <textarea name="message" value={values.message} onChange={handleChange} rows={5} className={inputClass('message')} placeholder="Tell us about your requirement..." />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className="rounded-full bg-brandOrange px-8 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brandOrange-dark">
          Submit Enquiry
        </button>
        <button type="button" onClick={handleReset} className="rounded-full border border-line px-8 py-3 text-sm font-semibold text-ink/70 transition-colors hover:bg-accent">
          Reset
        </button>
      </div>
    </form>
  )
}
