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
      <div className="w-64 bg-white border-l border-gray-100 h-full flex items-center justify-center shrink-0">
        <div className="text-center px-6">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Click a component on the canvas to edit its properties
          </p>
        </div>
      </div>
    )
  }

  const { props, type } = selectedComponent

  return (
    <div className="w-64 bg-white border-l border-gray-100 h-full overflow-y-auto shrink-0">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900 text-sm capitalize">{type}</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Properties</p>
        </div>
        <button
          onClick={() => removeComponent(selectedComponent.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete component"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="p-4 space-y-5">
        {/* Text */}
        {props.text !== undefined && (
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
              Text
            </label>
            <textarea
              value={props.text}
              onChange={(e) =>
                updateComponent(selectedComponent.id, { text: e.target.value })
              }
              className="w-full border border-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-shadow"
              rows={3}
            />
          </div>
        )}

        {/* Placeholder */}
        {props.placeholder !== undefined && (
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
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
              className="w-full border border-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>
        )}

        {/* Image Source */}
        {props.src !== undefined && (
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
              Image URL
            </label>
            <input
              type="text"
              value={props.src}
              onChange={(e) =>
                updateComponent(selectedComponent.id, { src: e.target.value })
              }
              className="w-full border border-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>
        )}

        {/* Link */}
        {props.href !== undefined && (
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
              Link URL
            </label>
            <input
              type="text"
              value={props.href}
              onChange={(e) =>
                updateComponent(selectedComponent.id, { href: e.target.value })
              }
              className="w-full border border-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>
        )}

        {/* Background Color */}
        {props.backgroundColor !== undefined && (
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
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
                className="w-9 h-9 border border-gray-100 rounded-lg cursor-pointer shrink-0 p-0.5"
              />
              <input
                type="text"
                value={props.backgroundColor}
                onChange={(e) =>
                  updateComponent(selectedComponent.id, {
                    backgroundColor: e.target.value,
                  })
                }
                className="flex-1 border border-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono transition-shadow"
              />
            </div>
          </div>
        )}

        {/* Text Color */}
        {props.textColor !== undefined && (
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
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
                className="w-9 h-9 border border-gray-100 rounded-lg cursor-pointer shrink-0 p-0.5"
              />
              <input
                type="text"
                value={props.textColor}
                onChange={(e) =>
                  updateComponent(selectedComponent.id, {
                    textColor: e.target.value,
                  })
                }
                className="flex-1 border border-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono transition-shadow"
              />
            </div>
          </div>
        )}

        {/* Font Size */}
        {props.fontSize !== undefined && (
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
              Font Size
            </label>
            <select
              value={props.fontSize}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  fontSize: e.target.value,
                })
              }
              className="w-full border border-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
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
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
              Alignment
            </label>
            <div className="flex gap-1.5">
              {(['left', 'center', 'right'] as const).map((align) => (
                <button
                  key={align}
                  onClick={() =>
                    updateComponent(selectedComponent.id, {
                      alignment: align,
                    })
                  }
                  className={`flex-1 py-1.5 text-[11px] font-medium border rounded-lg capitalize transition-all ${
                    props.alignment === align
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'border-gray-100 hover:bg-gray-50 text-gray-500 hover:text-gray-700'
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
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1.5">
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
              className="w-full border border-gray-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>
        )}
      </div>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  )
}
