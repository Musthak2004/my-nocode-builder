'use client'

import { motion } from 'framer-motion'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { Bolt } from 'lucide-react'

const clerkAppearance = {
  variables: {
    colorBackground: 'transparent',
    colorInputBackground: 'rgba(255, 255, 255, 0.04)',
    colorInputText: '#ffffff',
    colorText: '#ffffff',
    colorTextSecondary: '#9ca3af',
    colorPrimary: '#8b5cf6',
    colorDanger: '#ef4444',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    fontSize: '0.875rem',
    fontWeight: { normal: 400, medium: 500, bold: 600 },
    spacing: '0.5rem',
  },
  elements: {
    rootBox: 'w-full',
    card: 'shadow-none p-0 bg-transparent',
    headerTitle: 'hidden',
    headerSubtitle: 'hidden',
    socialButtonsBlockButton:
      'border border-white/[0.1] hover:border-white/[0.2] text-sm font-medium bg-transparent text-foreground rounded-xl hover:bg-white/[0.04] transition-all duration-200 h-11',
    socialButtonsBlockButtonText: 'text-sm font-medium',
    socialButtonsIconBox: 'mr-3',
    dividerLine: 'bg-white/[0.08]',
    dividerText: 'text-foreground-tertiary/50 text-xs',
    formFieldLabel: 'text-sm font-medium text-foreground-secondary/80 mb-1.5',
    formFieldInput:
      'rounded-xl border border-white/[0.1] bg-white/[0.03] text-foreground text-sm px-4 py-2.5 h-11 placeholder:text-foreground-tertiary/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:bg-white/[0.05] transition-all duration-200',
    formButtonPrimary:
      'bg-gradient-to-br from-primary to-primary-dark text-white text-sm font-semibold rounded-xl h-11 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40',
    footerAction: 'text-sm text-foreground-secondary/60',
    footerActionLink: 'text-primary-light hover:text-primary font-medium transition-colors',
    identityPreviewEditButton: 'text-primary-light hover:text-primary',
    otpCodeFieldInput: 'rounded-xl border border-white/[0.1] bg-white/[0.03] text-foreground',
    alert: 'bg-red-950/30 border border-red-500/20 text-red-400 rounded-xl text-sm',
    alertText: 'text-red-400',
    alertIcon: 'text-red-400',
    formFieldInputError: 'border-red-500/40',
    formFieldError: 'text-red-400 text-xs mt-1.5',
  },
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen gradient-auth flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[250px] h-[250px] rounded-full bg-secondary/6 blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Link href="/" className="flex items-center gap-2.5 mb-8 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow duration-300">
            <Bolt size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">NocoBase</span>
        </Link>
      </motion.div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="relative rounded-2xl p-8 border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Inner border glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              padding: '1px',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.05) 100%)',
              WebkitMask:
                'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-foreground-secondary/60 mt-1.5 text-sm">
              Start building apps in minutes — no code needed
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
        className="mt-8 text-sm text-foreground-secondary/60"
      >
        Already have an account?{' '}
        <Link
          href="/sign-in"
          className="text-primary-light hover:text-primary font-medium transition-colors"
        >
          Sign in
        </Link>
      </motion.p>
    </div>
  )
}
