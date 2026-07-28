'use client'

import { useBuilderStore } from '@/store/builderStore'
import { BuilderComponent } from '@/types/builder'
import {
  Type,
  AlignLeft,
  Square,
  Image,
  TextCursor,
  Minus,
  CreditCard,
  Navigation,
  Anchor,
  MessageSquare,
} from 'lucide-react'

const components: {
  type: BuilderComponent['type']
  label: string
  icon: React.ReactElement
  category: string
}[] = [
  { type: 'navbar', label: 'Navbar', icon: <Navigation size={18} />, category: 'Layout' },
  { type: 'footer', label: 'Footer', icon: <Anchor size={18} />, category: 'Layout' },
  { type: 'divider', label: 'Divider', icon: <Minus size={18} />, category: 'Layout' },
  { type: 'heading', label: 'Heading', icon: <Type size={18} />, category: 'Text' },
  { type: 'paragraph', label: 'Paragraph', icon: <AlignLeft size={18} />, category: 'Text' },
  { type: 'button', label: 'Button', icon: <Square size={18} />, category: 'Elements' },
  { type: 'image', label: 'Image', icon: <Image size={18} />, category: 'Elements' },
  { type: 'card', label: 'Card', icon: <CreditCard size={18} />, category: 'Elements' },
  { type: 'input', label: 'Input', icon: <TextCursor size={18} />, category: 'Form' },
  { type: 'textarea', label: 'Textarea', icon: <MessageSquare size={18} />, category: 'Form' },
]

const categories = ['Layout', 'Text', 'Elements', 'Form']

export default function ComponentPanel() {
  const addComponent = useBuilderStore((state) => state.addComponent)

  return (
    <div className="w-64 bg-white border-r border-gray-100 h-full overflow-y-auto shrink-0">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900 text-sm">Components</h2>
        <p className="text-xs text-gray-400 mt-0.5">Click to add to canvas</p>
      </div>

      {categories.map((category) => (
        <div key={category} className="px-4 pb-3 pt-4">
          <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5 px-1">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {components
              .filter((c) => c.category === category)
              .map((component) => (
                <button
                  key={component.type}
                  onClick={() => addComponent(component.type)}
                  className="flex flex-col items-center gap-1.5 p-2.5 border border-gray-100 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/50 transition-all text-sm text-gray-600 hover:text-indigo-700 active:scale-95 group"
                >
                  <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">
                    {component.icon}
                  </span>
                  <span className="text-[11px] font-medium">{component.label}</span>
                </button>
              ))}
          </div>
        </div>
      ))}

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  )
}
