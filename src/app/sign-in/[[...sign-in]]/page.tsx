'use client'

import { motion } from 'motion/react'
import { SignIn } from '@clerk/nextjs'
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
    spacing: '0.5rem',
  },
  elements: {
    rootBox: 'w-full',
    card: 'shadow-none p-0 bg-transparent',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton:
      'border border-border hover:border-border-hover text-sm font-medium bg-white text-foreground rounded-xl hover:bg-surface-hover transition-all duration-200 h-11',
    socialButtonsBlockButtonText: 'text-sm font-medium',
    socialButtonsIconBox: 'mr-3',
    dividerLine: 'bg-border',
    dividerText: 'text-foreground-tertiary text-xs',
    formFieldLabel: 'text-sm font-medium text-foreground mb-1.5',
    formFieldInput:
      'rounded-xl border border-border bg-white text-foreground text-sm px-4 py-2.5 h-11 placeholder:text-foreground-tertiary focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200',
    formButtonPrimary:
      'bg-primary text-white text-sm font-semibold rounded-xl h-11 hover:bg-primary-dark hover:shadow-md transition-all duration-200 disabled:opacity-40',
    footerAction: 'text-sm text-foreground-secondary',
    footerActionLink: 'text-primary hover:text-primary-dark font-medium transition-colors',
    identityPreviewEditButton: 'text-primary hover:text-primary-dark',
    otpCodeFieldInput: 'rounded-xl border border-border bg-white text-foreground',
    alert: 'bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm',
    alertText: 'text-red-700',
    alertIcon: 'text-red-500',
    formFieldInputError: 'border-red-300',
    formFieldError: 'text-red-600 text-xs mt-1.5',
  },
}

export default function SignInPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 bg-surface">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link href="/" className="flex items-center gap-2.5 mb-8 group">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <Bolt size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">NocoBase</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-foreground-secondary mt-1.5 text-sm">
              Sign in to continue building your apps
            </p>
          </div>

          <SignIn
            fallbackRedirectUrl="/dashboard"
            appearance={clerkAppearance}
          />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-8 text-sm text-foreground-secondary"
      >
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Sign up
        </Link>
      </motion.p>
    </div>
  )
}
