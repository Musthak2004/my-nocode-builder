'use client'

import { useState } from 'react'
import { analytics } from '@/lib/analytics'
import { X, ArrowRight, Layout, Eye, Save, MousePointer2 } from 'lucide-react'

interface Props {
  onClose: () => void
}

const steps = [
  {
    icon: <Layout size={32} />,
    title: 'Add Components',
    description:
      'Click any component from the left panel to add it to your canvas. Try adding a Heading first!',
  },
  {
    icon: <MousePointer2 size={32} />,
    title: 'Drag to Reorder',
    description:
      'Drag components up or down to change their order. Click a component to select and edit its properties.',
  },
  {
    icon: <Eye size={32} />,
    title: 'Edit Properties',
    description:
      'When you select a component, edit its text, colors, and style from the right panel.',
  },
  {
    icon: <Save size={32} />,
    title: 'Save & Preview',
    description:
      'Click Save to store your project. Click Preview to see how it looks to visitors.',
  },
]

export default function OnboardingModal({ onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  const handleFinish = () => {
    analytics.onboardingCompleted()
    localStorage.setItem('onboarding_completed', 'true')
    onClose()
  }

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true')
    onClose()
  }

  const step = steps[currentStep]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl animate-scale-in">
        {/* Close */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Step indicator */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                index <= currentStep ? 'bg-gray-900' : 'bg-gray-100'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-indigo-600">
            {step.icon}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {step.title}
          </h2>
          <p className="text-gray-500 leading-relaxed text-sm">
            {step.description}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors font-medium"
          >
            Skip tour
          </button>
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ArrowRight size={16} />
              </>
            ) : (
              "Let's Build! 🚀"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
