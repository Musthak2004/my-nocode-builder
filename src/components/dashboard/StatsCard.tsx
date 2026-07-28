'use client'

import { motion } from 'framer-motion'
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
    bg: 'bg-primary/10',
    dot: 'bg-primary-light',
    text: 'text-primary-light',
    shadow: 'shadow-primary/5',
  },
  secondary: {
    bg: 'bg-secondary/10',
    dot: 'bg-secondary-light',
    text: 'text-secondary-light',
    shadow: 'shadow-secondary/5',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
    shadow: 'shadow-emerald-500/5',
  },
  amber: {
    bg: 'bg-amber-500/10',
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    shadow: 'shadow-amber-500/5',
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
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        'relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] cursor-default',
        'bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]',
        'transition-all duration-300 ease-out group',
        'hover:shadow-lg',
        accent.shadow,
        className
      )}
    >
      {/* Accent top bar */}
      <div className={cn('absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-300', accent.bg)}>
        <div className={cn('h-full w-1/3 rounded-full', accent.dot)} />
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground-secondary/50 tracking-wide uppercase">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
            {value}
          </p>

          {trend && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.positive ? 'text-emerald-400' : 'text-red-400'
                )}
              >
                {trend.positive ? '+' : ''}{trend.value}
              </span>
              <span className="text-xs text-foreground-tertiary/50">vs last month</span>
            </div>
          )}
        </div>

        {/* Icon */}
        <div className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
          'bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors duration-300',
          accent.bg
        )}>
          <Icon size={20} className={cn('transition-transform duration-300 group-hover:scale-110', accent.text)} />
        </div>
      </div>
    </motion.div>
  )
}
