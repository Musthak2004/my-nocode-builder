'use client'

import { useBuilderStore } from '@/store/builderStore'
import { Trash2 } from 'lucide-react'

export default function PropertiesPanel() {
  const { components, selectedComponentId, updateComponent, removeComponent } =
    useBuilderStore()

  const selectedComponent = components.find(
    (c) => c.id === selectedComponentId
  )

  if (!selectedComponent) {
    return (
      <div className="w-64 bg-white border-l border-gray-200 h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm text-center px-4">
          Click a component to edit its properties
        </p>
      </div>
    )
  }

  const { props, type } = selectedComponent

  return (
    <div className="w-64 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-800 capitalize">{type}</h2>
          <p className="text-xs text-gray-500">Edit properties</p>
        </div>
        <button
          onClick={() => removeComponent(selectedComponent.id)}
          className="text-red-500 hover:text-red-700 p-1 transition-colors"
          title="Delete component"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Text */}
        {props.text !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Text
            </label>
            <textarea
              value={props.text}
              onChange={(e) =>
                updateComponent(selectedComponent.id, { text: e.target.value })
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
              rows={3}
            />
          </div>
        )}

        {/* Placeholder */}
        {props.placeholder !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Placeholder
            </label>
            <input
              type="text"
              value={props.placeholder}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  placeholder: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}

        {/* Image Source */}
        {props.src !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={props.src}
              onChange={(e) =>
                updateComponent(selectedComponent.id, { src: e.target.value })
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}

        {/* Link */}
        {props.href !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Link URL
            </label>
            <input
              type="text"
              value={props.href}
              onChange={(e) =>
                updateComponent(selectedComponent.id, { href: e.target.value })
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}

        {/* Background Color */}
        {props.backgroundColor !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={props.backgroundColor}
                onChange={(e) =>
                  updateComponent(selectedComponent.id, {
                    backgroundColor: e.target.value,
                  })
                }
                className="w-10 h-10 border border-gray-200 rounded cursor-pointer shrink-0"
              />
              <input
                type="text"
                value={props.backgroundColor}
                onChange={(e) =>
                  updateComponent(selectedComponent.id, {
                    backgroundColor: e.target.value,
                  })
                }
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black font-mono"
              />
            </div>
          </div>
        )}

        {/* Text Color */}
        {props.textColor !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Text Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={props.textColor}
                onChange={(e) =>
                  updateComponent(selectedComponent.id, {
                    textColor: e.target.value,
                  })
                }
                className="w-10 h-10 border border-gray-200 rounded cursor-pointer shrink-0"
              />
              <input
                type="text"
                value={props.textColor}
                onChange={(e) =>
                  updateComponent(selectedComponent.id, {
                    textColor: e.target.value,
                  })
                }
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black font-mono"
              />
            </div>
          </div>
        )}

        {/* Font Size */}
        {props.fontSize !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Font Size
            </label>
            <select
              value={props.fontSize}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  fontSize: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="xs">Extra Small</option>
              <option value="sm">Small</option>
              <option value="base">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="2xl">2XL</option>
              <option value="3xl">3XL</option>
              <option value="4xl">4XL</option>
            </select>
          </div>
        )}

        {/* Alignment */}
        {props.alignment !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Alignment
            </label>
            <div className="flex gap-2">
              {(['left', 'center', 'right'] as const).map((align) => (
                <button
                  key={align}
                  onClick={() =>
                    updateComponent(selectedComponent.id, {
                      alignment: align,
                    })
                  }
                  className={`flex-1 py-1.5 text-xs border rounded capitalize transition-all ${
                    props.alignment === align
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Border Radius */}
        {props.borderRadius !== undefined && (
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">
              Border Radius
            </label>
            <input
              type="text"
              value={props.borderRadius}
              placeholder="e.g. 8px"
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  borderRadius: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}
      </div>
    </div>
  )
}
