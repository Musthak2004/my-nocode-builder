'use client'

import { cn } from '@/lib/utils'
import { forwardRef, type ReactNode, type MouseEventHandler } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}

const sizeClasses = {
  sm: 'px-3.5 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3 text-base rounded-xl gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      className,
      disabled,
      onClick,
      type = 'button',
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'relative inline-flex items-center justify-center font-medium',
          'transition-all duration-200 ease-out cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          sizeClasses[size],

          variant === 'primary' && [
            'text-white bg-primary hover:bg-primary-dark',
            'shadow-sm hover:shadow-md hover:-translate-y-0.5',
            'active:translate-y-0',
          ],

          variant === 'secondary' && [
            'text-primary bg-primary-subtle border border-primary-border',
            'hover:bg-primary-border hover:text-primary-dark',
            'active:bg-primary-subtle',
          ],

          variant === 'outline' && [
            'text-foreground bg-transparent border border-border',
            'hover:bg-surface-hover hover:border-border-hover',
            'active:bg-surface',
          ],

          variant === 'ghost' && [
            'text-foreground-secondary bg-transparent',
            'hover:text-foreground hover:bg-surface-hover',
          ],

          className
        )}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
