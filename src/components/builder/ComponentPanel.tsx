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
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Components</h2>
        <p className="text-xs text-gray-500 mt-1">Click to add to canvas</p>
      </div>

      {categories.map((category) => (
        <div key={category} className="p-4 pb-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {components
              .filter((c) => c.category === category)
              .map((component) => (
                <button
                  key={component.type}
                  onClick={() => addComponent(component.type)}
                  className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all text-sm text-gray-700"
                >
                  {component.icon}
                  <span className="text-xs">{component.label}</span>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
