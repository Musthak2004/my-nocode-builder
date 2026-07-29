'use client'

import { motion } from 'motion/react'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { Bolt } from 'lucide-react'

const clerkAppearance = {
  variables: {
    colorBackground: 'transparent',
    colorInputBackground: '#ffffff',
    colorInputText: '#0f172a',
    colorText: '#0f172a',
    colorTextSecondary: '#64748b',
    colorPrimary: '#7c3aed',
    colorDanger: '#ef4444',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    fontSize: '0.875rem',
    fontWeight: { normal: 400, medium: 500, bold: 600 } as any,
    spacing: '0.375rem',
  },
  elements: {
    rootBox: 'w-full',
    card: 'shadow-none p-0 bg-transparent',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton:
      'border border-border hover:border-border-hover hover:bg-surface-hover text-sm font-medium bg-white text-foreground rounded-xl transition-all duration-200 h-11',
    socialButtonsBlockButtonText: 'text-sm font-medium',
    socialButtonsIconBox: 'mr-3',
    dividerLine: 'bg-border',
    dividerText: 'text-foreground-tertiary text-xs',
    formFieldLabel: 'text-sm font-medium text-foreground mb-1.5',
    formFieldInput:
      'rounded-xl border border-border bg-white text-foreground text-sm px-4 py-2.5 h-11 placeholder:text-foreground-tertiary/60 focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-200',
    formButtonPrimary:
      'bg-primary text-white text-sm font-semibold rounded-xl h-11 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 active:scale-[0.98] disabled:opacity-40',
    footerAction: 'text-sm text-foreground-secondary',
    footerActionLink: 'text-primary hover:text-primary-dark font-medium transition-colors',
    identityPreviewEditButton: 'text-primary hover:text-primary-dark',
    otpCodeFieldInput: 'rounded-xl border border-border bg-white text-foreground',
    alert: 'bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm',
    alertText: 'text-red-700',
    alertIcon: 'text-red-500',
    formFieldInputError: 'border-red-300 focus:ring-red-200',
    formFieldError: 'text-red-600 text-xs mt-1.5',
  },
}

export default function SignUpPage() {
  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-surface to-surface/80">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.35]" />
      </div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <Link href="/" className="flex items-center gap-2.5 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
            <Bolt size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            NocoBase
          </span>
        </Link>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-border/60 bg-white p-10 shadow-xl shadow-black/[0.03]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Create your account
            </h1>
            <p className="text-foreground-secondary mt-2 text-sm leading-relaxed">
              Start building in minutes — no code needed
            </p>
          </div>

          <SignUp
            fallbackRedirectUrl="/dashboard"
            appearance={clerkAppearance}
          />
        </div>
      </motion.div>

      {/* Footer link */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="relative mt-8 text-sm text-foreground-secondary"
      >
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="text-primary hover:text-primary-dark font-semibold transition-colors"
        >
          Sign in
        </Link>
      </motion.p>
    </div>
  )
}
