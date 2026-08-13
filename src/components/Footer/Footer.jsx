import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi'
import './style.css'
const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  { icon: FiFacebook, label: 'Facebook', href: '#' },
  { icon: FiLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FiInstagram, label: 'Instagram', href: '#' },
  { icon: FiYoutube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-xl grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">

            <span className="font-display text-lg font-semibold">Anthem Diagnostics<br></br> Private Limited</span>

          </div>
          <p className="mt-4 text-sm text-white/70">
            A trusted partner delivering advanced diagnostic instruments and laboratory solutions
            to hospitals and healthcare providers across India.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className='mobileView'>
          <h3 className="font-mono-tag text-xs uppercase tracking-widest text-accent">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-white/75 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono-tag text-xs uppercase tracking-widest text-accent">Contact Details</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <FiPhone className="mt-0.5 shrink-0" size={15} />
              <a href="tel:+914435039685" className="hover:text-white">+91 4435 0396 85</a>
            </li>
            <li className="flex items-start gap-2.5">
              <FiMail className="mt-0.5 shrink-0" size={15} />
              <a href="mailto:support@anthemdx.com" className="hover:text-white">support@anthemdx.com</a>
            </li>
            <li className="flex items-start gap-2.5">
              <FiMapPin className="mt-0.5 shrink-0" size={15} />
              <span>
                Anthem Diagnostics Private Limited, New No. 9 / Old No. 217, Ground Floor, Defence
                Colony, 16th Cross Street, Ekkatuthangal, Chennai, Tamil Nadu – 600032
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono-tag text-xs uppercase tracking-widest text-accent">Office Hours</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>Monday – Saturday: 9:30 AM – 6:30 PM</li>
            <li>Sunday: Closed</li>
          </ul>
          <Link
            to="/contact"
            className="mt-5 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-xl grid grid-cols-1 items-center justify-between gap-3 py-5 text-center text-xs text-white/60 md:grid-cols-3">
          {/* Left: Copyright */}
          <p className="md:text-left">
            Copyright © 2026 Anthem Diagnostics Private Limited. All Rights Reserved.
          </p>

          {/* Center: Designed & Developed by Aaron J */}
          <p className="text-center font-medium">
            Designed & Developed by{' '}
            <a
              href="https://aaron-portfolio-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-white font-semibold transition-colors underline underline-offset-2"
            >
              Aaron J
            </a>
          </p>

          {/* Right: Admin Portal & Location */}
          <div className="flex items-center justify-center gap-3 md:justify-end">
            <Link to="/admin" className="hover:text-accent font-semibold transition-colors">
              Admin Portal
            </Link>
            <span className="font-mono-tag text-white/40">·</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
