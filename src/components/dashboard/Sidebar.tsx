'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import {
  Bolt,
  LayoutDashboard,
  FolderKanban,
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  label: string
  href: string
  icon: typeof LayoutDashboard
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Projects', href: '/dashboard', icon: FolderKanban },
  { label: 'Settings', href: '#', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '#') return false
    return pathname === href
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn('flex items-center px-4 h-16 border-b border-white/[0.04]', collapsed ? 'justify-center' : 'gap-2.5')}>
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
            <Bolt size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="text-base font-bold tracking-tight">
              NocoBase
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                active
                  ? 'bg-primary/10 text-primary-light border border-primary/15'
                  : 'text-foreground-secondary/60 hover:text-foreground hover:bg-white/[0.04] border border-transparent',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className={cn('shrink-0', active && 'text-primary-light')} />
              {!collapsed && <span>{item.label}</span>}
              {active && !collapsed && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-light"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className={cn('px-3 py-4 border-t border-white/[0.04] space-y-3', collapsed && 'flex flex-col items-center')}>
        {/* Help */}
        <Link
          href="#"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground-secondary/50 hover:text-foreground hover:bg-white/[0.04] transition-all duration-200',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Help' : undefined}
        >
          <HelpCircle size={18} className="shrink-0" />
          {!collapsed && <span>Help & Support</span>}
        </Link>

        {/* User */}
        <div className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.02]',
          collapsed && 'justify-center px-2'
        )}>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-7 h-7 rounded-lg border-2 border-transparent hover:border-primary/30 transition-all duration-200',
              },
            }}
          />
          {!collapsed && (
            <span className="text-xs text-foreground-secondary/50 truncate">Account</span>
          )}
        </div>

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-full py-1.5 rounded-lg text-foreground-tertiary/40 hover:text-foreground-secondary hover:bg-white/[0.03] transition-all duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-30',
          'bg-background border-r border-white/[0.04]',
          'transition-all duration-300 ease-out',
          collapsed ? 'w-[68px]' : 'w-[240px]'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[260px] bg-background border-r border-white/[0.06] md:hidden"
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile hamburger — visible when sidebar is hidden */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-20 w-9 h-9 rounded-lg bg-background/80 backdrop-blur-sm border border-white/[0.06] flex items-center justify-center text-foreground-secondary hover:text-foreground transition-colors"
        aria-label="Open sidebar"
      >
        <FolderKanban size={16} />
      </button>
    </>
  )
}
