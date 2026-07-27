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
import { GripVertical } from 'lucide-react'

function SortableComponent({ component }: { component: BuilderComponent }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: component.id })

  const { selectedComponentId, selectComponent } = useBuilderStore()
  const isSelected = selectedComponentId === component.id

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => selectComponent(component.id)}
      className={`relative group border-2 rounded-lg p-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-black bg-blue-50'
          : 'border-transparent hover:border-gray-300'
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-gray-400 z-10"
      >
        <GripVertical size={16} />
      </div>

      {/* Component */}
      <div className="pl-4">
        <ComponentRenderer component={component} />
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
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🧩</div>
          <h3 className="text-xl font-semibold text-gray-700">
            Start Building
          </h3>
          <p className="text-gray-400 mt-2 max-w-sm">
            Click components from the left panel to add them here. Drag to reorder.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-y-auto p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm min-h-96 p-6 space-y-3">
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
      </div>
    </div>
  )
}
