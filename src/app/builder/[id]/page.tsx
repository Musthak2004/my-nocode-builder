'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useBuilderStore } from '@/store/builderStore'
import BuilderNavbar from '@/components/builder/BuilderNavbar'
import ComponentPanel from '@/components/builder/ComponentPanel'
import Canvas from '@/components/builder/Canvas'
import PropertiesPanel from '@/components/builder/PropertiesPanel'

export default function BuilderPage() {
  const params = useParams()
  const projectId = params.id as string
  const { loadProject, setProjectId, setIsSaving, setHasUnsavedChanges, components, projectName } =
    useBuilderStore()

  // Load existing project
  useEffect(() => {
    if (projectId && projectId !== 'new') {
      fetch(`/api/projects/${projectId}`)
        .then((res) => res.json())
        .then(({ project }) => {
          if (project) loadProject(project)
        })
        .catch((err) => console.error('Failed to load project:', err))
    } else {
      setProjectId('new')
    }
  }, [projectId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Save project
  const handleSave = async () => {
    setIsSaving(true)
    try {
      const currentProjectId = useBuilderStore.getState().projectId

      if (currentProjectId && currentProjectId !== 'new') {
        const res = await fetch(`/api/projects/${currentProjectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: projectName, components }),
        })
        if (!res.ok) throw new Error('Save failed')
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: projectName,
            components,
          }),
        })
        if (!res.ok) throw new Error('Create failed')
        const { project } = await res.json()
        if (project) {
          setProjectId(project.id)
          window.history.replaceState(null, '', `/builder/${project.id}`)
        }
      }
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('Save failed:', error)
      alert('Failed to save project. Please check your connection and try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <BuilderNavbar onSave={handleSave} />
      <div className="flex flex-1 overflow-hidden">
        <ComponentPanel />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  )
}
