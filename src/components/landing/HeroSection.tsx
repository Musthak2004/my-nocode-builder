'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles, Shield, Zap } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import GradientButton from '@/components/ui/GradientButton'

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

const floatingCardItems = [
  {
    label: 'Projects Built',
    value: '2,847+',
    icon: Zap,
    color: 'text-primary-light',
  },
  {
    label: 'Avg. Build Time',
    value: '< 5 min',
    icon: Sparkles,
    color: 'text-secondary-light',
  },
  {
    label: 'Uptime',
    value: '99.9%',
    icon: Shield,
    color: 'text-emerald-400',
  },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/api/placeholder/1920/1080"
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback: hide video element, gradient shows through
            (e.target as HTMLVideoElement).style.display = 'none'
          }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full"
      >
        <motion.div
          className="container-premium"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div variants={staggerItem} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase text-primary-light bg-primary/10 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-light" />
                </span>
                No coding required
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={staggerItem} className="text-display mb-6">
              Build Apps{' '}
              <span className="gradient-text">Without Code</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={staggerItem}
              className="text-body text-foreground-secondary/80 mx-auto mb-10"
            >
              The easiest way for small businesses to create beautiful,
              functional apps — no coding, no stress, no waiting.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            >
              <Link href="/sign-up">
                <GradientButton size="lg" icon={<ArrowRight size={18} />}>
                  Get Started Free
                </GradientButton>
              </Link>
              <Link href="#features">
                <GradientButton
                  variant="outline"
                  size="lg"
                  icon={<Play size={18} />}
                >
                  View Demo
                </GradientButton>
              </Link>
            </motion.div>

            {/* Floating Glass Stats Card */}
            <motion.div variants={staggerItem} className="w-full max-w-2xl">
              <GlassCard variant="strong" className="p-6">
                <div className="grid grid-cols-3 gap-4 sm:gap-8">
                  {floatingCardItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        className="flex flex-col items-center text-center gap-2"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                          <Icon size={20} className={item.color} />
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl font-bold tabular-nums">
                            {item.value}
                          </div>
                          <div className="text-xs text-foreground-secondary/60 mt-0.5">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs text-foreground-tertiary/60 tracking-wider uppercase">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-foreground-tertiary/40 to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
