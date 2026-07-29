'use client'

import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({
  children,
  className,
  hover = true,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface-elevated shadow-sm',
        hover && 'hover:shadow-md hover:border-border-hover transition-all duration-200',
        className
      )}
    >
      {children}
    </div>
  )
}
