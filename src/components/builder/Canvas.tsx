'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useBuilderStore } from '@/store/builderStore'
import ComponentRenderer from './ComponentRenderer'
import { BuilderComponent } from '@/types/builder'
import { GripVertical, Plus, MousePointer2 } from 'lucide-react'

function SortableComponent({ component }: { component: BuilderComponent }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: component.id })

  const { selectedComponentId, selectComponent } = useBuilderStore()
  const isSelected = selectedComponentId === component.id

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 50 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => selectComponent(component.id)}
      className={`relative group rounded-xl transition-all cursor-pointer ${
        isSelected
          ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50/20'
          : 'hover:ring-1 hover:ring-gray-200 hover:bg-gray-50/50'
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 z-10 transition-opacity"
      >
        <GripVertical size={14} />
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2.5 left-4 bg-indigo-500 rounded-md px-2 py-0.5 text-[10px] font-medium text-white z-20 shadow-sm">
          Selected
        </div>
      )}

      {/* Component */}
      <div className="px-4 py-3">
        <ComponentRenderer component={component} />
      </div>

      {/* Hover action hint */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded-md border border-gray-100 shadow-sm">
          Click to edit
        </span>
      </div>
    </div>
  )
}

export default function Canvas() {
  const { components, reorderComponents } = useBuilderStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderComponents(active.id as string, over.id as string)
    }
  }

  if (components.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-sm animate-fade-in">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <MousePointer2 size={32} className="text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Start Building
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Click components from the left panel to add them here.
            <br />
            Drag to reorder, click to edit properties.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl font-medium">
            <Plus size={16} />
            <span>Pick a component to get started</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/80 to-white">
      <div className="max-w-2xl mx-auto p-6 lg:p-8 min-h-full">
        {/* Canvas label */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Canvas
          </span>
          <span className="text-[11px] text-gray-300">
            ({components.length} {components.length === 1 ? 'component' : 'components'})
          </span>
        </div>

        {/* Canvas surface */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[32rem] p-4 space-y-2 transition-all">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {components.map((component) => (
                <SortableComponent key={component.id} component={component} />
              ))}
            </SortableContext>
          </DndContext>

          {/* Drop zone hint */}
          {components.length > 0 && (
            <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 text-center mt-4">
              <p className="text-xs text-gray-300">
                Drop components here or add from the panel
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
