import Link from 'next/link'
import { Bolt } from 'lucide-react'

const footerLinks = [
  {
    label: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Demo', href: '#features' },
      { name: 'Changelog', href: '#' },
    ],
  },
  {
    label: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Cookies', href: '#' },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.05] bg-background">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="container-premium py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow duration-300">
                <Bolt size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">NocoBase</span>
            </Link>
            <p className="text-sm text-foreground-secondary/60 max-w-xs leading-relaxed mb-6">
              Build beautiful, functional apps without writing code. The fastest way for small businesses to launch digital products.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'GitHub', href: '#' },
                { label: 'Twitter', href: '#' },
                { label: 'LinkedIn', href: '#' },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foreground-secondary/50 hover:text-foreground hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
                  aria-label={social.label}
                >
                  <span className="text-xs font-semibold tracking-tight">
                    {social.label.charAt(0)}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground-secondary/40 mb-4">
                {group.label}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-secondary/60 hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-tertiary/50">
            &copy; {currentYear} NocoBase. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-foreground-tertiary/50 hover:text-foreground-secondary/60 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-foreground-tertiary/30">·</span>
            <Link href="#" className="text-xs text-foreground-tertiary/50 hover:text-foreground-secondary/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
