'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  accentColor?: 'primary' | 'secondary' | 'emerald' | 'amber'
  className?: string
}

const accentMap = {
  primary: {
    bg: 'bg-violet-100',
    text: 'text-violet-600',
  },
  secondary: {
    bg: 'bg-teal-100',
    text: 'text-teal-600',
  },
  emerald: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
  },
  amber: {
    bg: 'bg-amber-100',
    text: 'text-amber-600',
  },
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  accentColor = 'primary',
  className,
}: StatsCardProps) {
  const accent = accentMap[accentColor]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'rounded-xl border border-border bg-white p-5',
        'hover:shadow-md hover:border-border-hover',
        'transition-all duration-200 group',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-foreground-tertiary tracking-wide">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight text-foreground">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.positive ? 'text-emerald-600' : 'text-red-500'
                )}
              >
                {trend.positive ? '+' : ''}{trend.value}
              </span>
              <span className="text-xs text-foreground-tertiary">vs last month</span>
            </div>
          )}
        </div>

        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
          accent.bg
        )}>
          <Icon size={20} className={cn('transition-transform duration-200 group-hover:scale-110', accent.text)} />
        </div>
      </div>
    </motion.div>
  )
}
