import { create } from 'zustand'
import { BuilderComponent, Project } from '@/types/builder'
import { v4 as uuidv4 } from 'uuid'
import { analytics } from '@/lib/analytics'

interface BuilderStore {
  // State
  components: BuilderComponent[]
  selectedComponentId: string | null
  projectName: string
  projectId: string | null
  isSaving: boolean
  hasUnsavedChanges: boolean

  // Actions
  addComponent: (type: BuilderComponent['type']) => void
  removeComponent: (id: string) => void
  updateComponent: (id: string, props: Partial<BuilderComponent['props']>) => void
  reorderComponents: (activeId: string, overId: string) => void
  selectComponent: (id: string | null) => void
  setProjectName: (name: string) => void
  setProjectId: (id: string) => void
  loadProject: (project: Project) => void
  setIsSaving: (saving: boolean) => void
  setHasUnsavedChanges: (hasChanges: boolean) => void
  clearBuilder: () => void
}

const defaultProps: Record<BuilderComponent['type'], BuilderComponent['props']> = {
  heading: {
    text: 'Your Heading Here',
    fontSize: '2xl',
    fontWeight: 'bold',
    textColor: '#000000',
    alignment: 'left',
  },
  paragraph: {
    text: 'Your paragraph text here. Click to edit.',
    fontSize: 'base',
    textColor: '#374151',
    alignment: 'left',
  },
  button: {
    text: 'Click Me',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    borderRadius: '8px',
    href: '#',
  },
  image: {
    src: 'https://via.placeholder.com/400x200',
    alt: 'Image description',
    width: '100%',
  },
  input: {
    placeholder: 'Enter text here...',
    backgroundColor: '#ffffff',
  },
  textarea: {
    placeholder: 'Enter your message here...',
    backgroundColor: '#ffffff',
  },
  divider: {
    backgroundColor: '#e5e7eb',
  },
  card: {
    text: 'Card Title',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
  },
  navbar: {
    text: 'My App',
    backgroundColor: '#000000',
    textColor: '#ffffff',
  },
  footer: {
    text: '© 2024 My App. All rights reserved.',
    backgroundColor: '#f3f4f6',
    textColor: '#6b7280',
  },
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  components: [],
  selectedComponentId: null,
  projectName: 'Untitled Project',
  projectId: null,
  isSaving: false,
  hasUnsavedChanges: false,

  addComponent: (type) => {
    const newComponent: BuilderComponent = {
      id: uuidv4(),
      type,
      props: { ...defaultProps[type] },
    }
    set((state) => ({
      components: [...state.components, newComponent],
      hasUnsavedChanges: true,
    }))

    // Track
    const projectId = get().projectId
    analytics.componentAdded(type, projectId || 'new')
  },

  removeComponent: (id) => {
    const component = get().components.find((c) => c.id === id)
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      selectedComponentId:
        state.selectedComponentId === id ? null : state.selectedComponentId,
      hasUnsavedChanges: true,
    }))

    // Track
    if (component) {
      const projectId = get().projectId
      analytics.componentDeleted(component.type, projectId || 'new')
    }
  },

  updateComponent: (id, props) => {
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, props: { ...c.props, ...props } } : c
      ),
      hasUnsavedChanges: true,
    }))
  },

  reorderComponents: (activeId, overId) => {
    const { components } = get()
    const oldIndex = components.findIndex((c) => c.id === activeId)
    const newIndex = components.findIndex((c) => c.id === overId)
    if (oldIndex === -1 || newIndex === -1) return

    const newComponents = [...components]
    const [removed] = newComponents.splice(oldIndex, 1)
    newComponents.splice(newIndex, 0, removed)
    set({ components: newComponents, hasUnsavedChanges: true })
  },

  selectComponent: (id) => set({ selectedComponentId: id }),

  setProjectName: (name) =>
    set({ projectName: name, hasUnsavedChanges: true }),

  setProjectId: (id) => set({ projectId: id }),

  loadProject: (project) =>
    set({
      components: project.components,
      projectName: project.name,
      projectId: project.id || null,
      hasUnsavedChanges: false,
    }),

  setIsSaving: (saving) => set({ isSaving: saving }),

  setHasUnsavedChanges: (hasChanges) =>
    set({ hasUnsavedChanges: hasChanges }),

  clearBuilder: () =>
    set({
      components: [],
      selectedComponentId: null,
      projectName: 'Untitled Project',
      projectId: null,
      hasUnsavedChanges: false,
    }),
}))
