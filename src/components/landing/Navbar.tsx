'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bolt, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Features', href: '#features' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-sm shadow-black/10'
          : 'bg-transparent'
      )}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow duration-300">
              <Bolt size={18} className="text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight">
              NocoBase
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-foreground-secondary/70 hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-foreground-secondary/70 hover:text-foreground transition-colors duration-200 px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="relative inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl text-white bg-gradient-to-br from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all duration-250 hover:-translate-y-0.5"
            >
              Get Started
              <span className="absolute inset-0 rounded-xl bg-white/0 hover:bg-white/[0.06] transition-colors" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-white/[0.05] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl"
        >
          <div className="container-premium py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-foreground-secondary/70 hover:text-foreground transition-colors py-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-3">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground-secondary/70 hover:text-foreground transition-colors py-2"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-gradient-to-br from-primary to-primary-dark"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
