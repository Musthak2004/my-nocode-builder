'use client'

import { motion, type Variants, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

interface AnimatedSectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
  children: React.ReactNode
  animation?:
    | 'fade-in-up'
    | 'fade-in'
    | 'scale-in'
    | 'slide-left'
    | 'slide-right'
    | 'stagger-children'
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

const animationVariants: Record<string, Variants> = {
  'fade-in-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'stagger-children': {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  },
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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
  duration = 0.6,
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
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}
