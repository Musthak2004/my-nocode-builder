'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: false,
      maskInputOptions: {
        password: true,
      },
    },
  })
}

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
      })
    }
  }, [pathname, searchParams])

  return null
}

function UserIdentifier() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      posthog.identify(user.id, {
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
        created_at: user.createdAt,
      })
    }

    if (isLoaded && !user) {
      posthog.reset()
    }
  }, [isLoaded, user])

  return null
}

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PHProvider client={posthog}>
      <PageViewTracker />
      <UserIdentifier />
      {children}
    </PHProvider>
  )
}
