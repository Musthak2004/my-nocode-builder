'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { forwardRef, type ReactNode, type MouseEventHandler } from 'react'

interface GradientButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  icon?: ReactNode
  href?: string
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-8 py-3.5 text-base rounded-xl gap-2.5',
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      glow = true,
      icon,
      className,
      disabled,
      onClick,
      type = 'button',
    },
    ref
  ) => {
    const isPrimary = variant === 'primary'
    const isOutline = variant === 'outline'
    const isGhost = variant === 'ghost'

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center font-semibold',
          'transition-all duration-250 ease-out cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
          sizeClasses[size],

          // Primary variant
          isPrimary && [
            'text-white',
            'bg-gradient-to-br from-primary to-primary-dark',
            'shadow-md shadow-primary/20',
            'hover:shadow-lg hover:shadow-primary/30',
            glow && 'hover:shadow-[0_0_30px_var(--primary-glow)]',
            'hover:-translate-y-0.5',
          ],

          // Outline variant
          isOutline && [
            'text-foreground bg-transparent',
            'border border-border',
            'hover:border-primary hover:bg-primary/5',
            'hover:text-primary-light',
            'hover:-translate-y-0.5',
            glow && 'hover:shadow-[0_0_20px_rgba(139,92,246,0.08)]',
          ],

          // Ghost variant
          isGhost && [
            'text-foreground-secondary bg-transparent',
            'hover:text-foreground hover:bg-surface-hover',
            'hover:-translate-y-0.5',
          ],

          className
        )}
      >
        {icon && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
        <span>{children}</span>
      </motion.button>
    )
  }
)

GradientButton.displayName = 'GradientButton'

export default GradientButton
