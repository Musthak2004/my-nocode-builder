'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles, Zap, Shield } from 'lucide-react'
import Button from '@/components/ui/GradientButton'

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const stats = [
  { label: 'Projects Built', value: '2,847+', icon: Zap },
  { label: 'Avg. Build Time', value: '< 5 min', icon: Sparkles },
  { label: 'Uptime', value: '99.9%', icon: Shield },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background"
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
            (e.target as HTMLVideoElement).style.display = 'none'
          }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Subtle grid */}
      <div className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none">
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
        style={{ opacity }}
        className="relative z-10 w-full pt-24"
      >
        <motion.div
          className="container-premium"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div variants={staggerItem} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/15 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                No coding required
              </span>
            </motion.div>

            <motion.h1 variants={staggerItem} className="text-display text-white mb-5">
              Build Apps{' '}
              <span className="bg-gradient-to-r from-violet-300 to-violet-100 bg-clip-text text-transparent">Without Code</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-lg text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              The easiest way for small businesses to create beautiful,
              functional apps — no coding, no stress, no waiting.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            >
              <Link href="/sign-up">
                <Button size="lg" icon={<ArrowRight size={18} />}>
                  Get Started Free
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Play size={18} />}
                >
                  View Demo
                </Button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={staggerItem}
              className="w-full max-w-lg mx-auto"
            >
              <div className="flex items-center justify-center gap-8 sm:gap-12">
                {stats.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                        {item.value}
                      </div>
                      <div className="text-xs text-white/40 mt-1">
                        {item.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
