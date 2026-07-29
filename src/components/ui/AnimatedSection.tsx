'use client'

import { motion, type Variants, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

interface AnimatedSectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
  children: React.ReactNode
  animation?: 'fade-in-up' | 'fade-in' | 'scale-in'
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

const animationVariants: Record<string, Variants> = {
  'fade-in-up': {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function AnimatedChild({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  )
}

export default function AnimatedSection({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 0.5,
  once = true,
  className,
  ...props
}: AnimatedSectionProps) {
  const variants = animationVariants[animation]
  const ref = useRef<HTMLDivElement>(null)

  if (!variants) return <section className={className}>{children}</section>

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}
