import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 flex flex-col items-center justify-center px-4 py-12">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:shadow-md transition-shadow">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-gray-900">NoCodeBuilder</span>
      </Link>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 animate-slide-up">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-1.5 text-sm">Start building apps in minutes — no code needed</p>
        </div>
        <SignUp
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary:
                'bg-gray-900 hover:bg-gray-800 text-sm font-medium normal-case shadow-sm',
              card: 'shadow-none p-0',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton:
                'border border-gray-200 hover:bg-gray-50 text-sm font-medium normal-case text-gray-700 rounded-lg',
              formFieldLabel: 'text-sm font-medium text-gray-700',
              formFieldInput:
                'rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm px-4 py-2.5',
              footerAction: 'text-sm',
              footerActionLink: 'text-indigo-600 hover:text-indigo-700 font-medium',
              dividerLine: 'bg-gray-200',
              dividerText: 'text-gray-400 text-xs',
              identityPreviewEditButton: 'text-indigo-600',
              otpCodeFieldInput: 'rounded-lg border-gray-200',
              alert: 'bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm',
              alertText: 'text-red-700',
              alertIcon: 'text-red-500',
            },
          }}
        />
      </div>

      {/* Footer link */}
      <p className="mt-8 text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
