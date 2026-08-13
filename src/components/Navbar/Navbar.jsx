import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import './navbar.css'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm border-b border-line transition-all duration-300">
      <div className="container-xl flex h-20 items-center justify-between">
        {/* Navbar Left Side - Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 py-1" onClick={() => setOpen(false)}>
          <img
            className="logo h-11 w-auto object-contain"
            src="/AnetZ.webp"
            alt="Anthem Diagnostics Logo"
          />
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative font-medium text-sm transition-colors ${isActive ? 'text-primary font-bold' : 'text-ink/80 hover:text-primary'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative pb-1">
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-primary transition-all ${isActive ? 'w-full' : 'w-0'
                      }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/contact"
            className="rounded-full bg-brandOrange px-5 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brandOrange-dark"
          >
            Enquiry
          </NavLink>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="lg:hidden text-ink p-1 rounded-lg hover:bg-slate-100"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <nav className="container-xl flex flex-col gap-1 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 font-medium ${isActive ? 'bg-accent text-primary font-semibold' : 'text-ink/80'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 flex flex-wrap gap-2 px-3">
                <NavLink
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center rounded-full bg-brandOrange py-2 text-xs font-semibold text-white shadow-sm"
                >
                  Enquiry
                </NavLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
