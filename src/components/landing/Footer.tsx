import Link from 'next/link'
import { Bolt } from 'lucide-react'

const footerLinks = [
  {
    label: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Demo', href: '#features' },
    ],
  },
  {
    label: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-premium py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Bolt size={18} className="text-white" />
              </div>
              <span className="text-base font-bold tracking-tight">NocoBase</span>
            </Link>
            <p className="text-sm text-foreground-secondary/70 max-w-xs leading-relaxed mb-6">
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
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground-tertiary hover:text-foreground hover:border-border-hover hover:bg-surface-hover transition-all duration-200"
                  aria-label={social.label}
                >
                  <span className="text-xs font-semibold">{social.label.charAt(0)}</span>
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-foreground-tertiary mb-4">
                {group.label}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-secondary/70 hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-tertiary">
            &copy; {currentYear} NocoBase. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-foreground-tertiary hover:text-foreground-secondary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-foreground-tertiary">·</span>
            <Link href="#" className="text-xs text-foreground-tertiary hover:text-foreground-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
