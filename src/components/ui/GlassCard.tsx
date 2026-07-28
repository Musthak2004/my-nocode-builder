'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode
  variant?: 'default' | 'strong' | 'edge'
  hover?: boolean
  className?: string
}

export default function GlassCard({
  children,
  variant = 'default',
  hover = true,
  className,
  ...props
}: GlassCardProps) {
  const baseClasses = cn(
    'rounded-2xl transition-all duration-300',
    variant === 'default' && 'glass',
    variant === 'strong' && 'glass-strong',
    variant === 'edge' && 'glass glass-edge',
    hover && 'hover:scale-[1.01] hover:-translate-y-0.5',
    className
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={baseClasses}
      {...props}
    >
      {children}
    </motion.div>
  )
}
