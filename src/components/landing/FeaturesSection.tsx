'use client'

import { motion } from 'framer-motion'
import {
  MousePointerClick,
  Eye,
  LayoutGrid,
  Palette,
  Globe,
  Smartphone,
  Gauge,
  Shield,
} from 'lucide-react'
import AnimatedSection, { AnimatedChild } from '@/components/ui/AnimatedSection'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Drag & Drop Builder',
    description:
      'Add, arrange, and style components with intuitive drag-and-drop. No tutorials needed — just build.',
    icon: MousePointerClick,
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary-light',
  },
  {
    title: 'Real-Time Preview',
    description:
      'See exactly how your app looks as you build it. Every change reflects instantly, on every screen size.',
    icon: Eye,
    gradient: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary-light',
  },
  {
    title: 'Component Library',
    description:
      'Navbars, forms, cards, buttons, and more — each one customizable to match your brand perfectly.',
    icon: LayoutGrid,
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary-light',
  },
  {
    title: 'Custom Styling',
    description:
      'Tweak colors, fonts, spacing, and layout. Your app should look like you, not like a template.',
    icon: Palette,
    gradient: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary-light',
  },
  {
    title: 'One-Click Publish',
    description:
      'Go from builder to live app in seconds. We handle hosting, SSL, and everything in between.',
    icon: Globe,
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary-light',
  },
  {
    title: 'Mobile Responsive',
    description:
      'Every app works beautifully on phones, tablets, and desktops. No extra work needed.',
    icon: Smartphone,
    gradient: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary-light',
  },
  {
    title: 'Fast Performance',
    description:
      'Built on Next.js with automatic optimization. Fast loads, smooth interactions, happy users.',
    icon: Gauge,
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary-light',
  },
  {
    title: 'Reliable & Secure',
    description:
      'Enterprise-grade security with Clerk authentication and encrypted data storage out of the box.',
    icon: Shield,
    gradient: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary-light',
  },
]

export default function FeaturesSection() {
  return (
    <AnimatedSection
      id="features"
      animation="stagger-children"
      className="section-padding relative overflow-hidden"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/3 blur-[150px] rounded-full" />
      </div>

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedChild>
          <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase text-foreground-secondary/60 bg-white/[0.03] border border-white/[0.06] mb-5">
              Features
            </span>
            <h2 className="text-display-md mb-5">
              Everything you need,{' '}
              <span className="gradient-text">nothing you don&apos;t</span>
            </h2>
            <p className="text-body mx-auto">
              Simple, powerful tools that let you bring your app idea to life
              without writing a single line of code.
            </p>
          </div>
        </AnimatedChild>

        {/* Feature Grid — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isLarge = index === 0 || index === 7

            return (
              <AnimatedChild key={feature.title}>
                <div
                  className={cn(
                    'group relative overflow-hidden rounded-2xl p-6 sm:p-8',
                    'bg-white/[0.02] border border-white/[0.06]',
                    'hover:bg-white/[0.04] hover:border-white/[0.12]',
                    'transition-all duration-300 ease-out',
                    'hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5',
                    isLarge ? 'md:col-span-2' : ''
                  )}
                >
                  {/* Gradient hover effect */}
                  <div
                    className={cn(
                      'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
                      'bg-gradient-to-br',
                      feature.gradient
                    )}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={cn(
                        'w-11 h-11 rounded-xl flex items-center justify-center mb-5',
                        'bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors duration-300'
                      )}
                    >
                      <Icon
                        size={22}
                        className={cn(
                          feature.iconColor,
                          'group-hover:scale-110 transition-transform duration-300'
                        )}
                      />
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary/70 leading-relaxed group-hover:text-foreground-secondary/90 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedChild>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}