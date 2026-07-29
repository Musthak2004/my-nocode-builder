'use client'

import { motion } from 'motion/react'
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
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Drag & Drop Builder',
    description:
      'Add, arrange, and style components with intuitive drag-and-drop. No tutorials needed.',
    icon: MousePointerClick,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    title: 'Real-Time Preview',
    description:
      'See exactly how your app looks as you build. Every change reflects instantly.',
    icon: Eye,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Component Library',
    description:
      'Navbars, forms, cards, buttons, and more — each one customizable to match your brand.',
    icon: LayoutGrid,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Custom Styling',
    description:
      'Tweak colors, fonts, spacing, and layout. Your app should look like you, not a template.',
    icon: Palette,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    title: 'One-Click Publish',
    description:
      'Go from builder to live app in seconds. We handle hosting, SSL, and everything in between.',
    icon: Globe,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    title: 'Mobile Responsive',
    description:
      'Every app works beautifully on phones, tablets, and desktops. No extra work needed.',
    icon: Smartphone,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Fast Performance',
    description:
      'Built on Next.js with automatic optimization. Fast loads, smooth interactions.',
    icon: Gauge,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Reliable & Secure',
    description:
      'Enterprise-grade security with Clerk authentication and encrypted data storage.',
    icon: Shield,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-padding relative overflow-hidden bg-surface"
    >
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-display-md mb-4">
            Everything you need,{' '}
            <span className="gradient-text">nothing you don&apos;t</span>
          </h2>
          <p className="text-body mx-auto">
            Simple, powerful tools that let you bring your app idea to life
            without writing a single line of code.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isLarge = index === 0 || index === 7

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={cn(
                  'group relative overflow-hidden rounded-xl border bg-white p-6',
                  'border-border hover:border-border-hover',
                  'transition-all duration-200',
                  'hover:-translate-y-0.5 hover:shadow-md',
                  isLarge ? 'md:col-span-2' : ''
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center mb-4',
                  feature.iconBg
                )}>
                  <Icon size={20} className={feature.iconColor} />
                </div>

                <h3 className="text-[15px] font-semibold text-foreground mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
