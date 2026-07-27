'use client'

import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Plus, Loader2, Trash2, ExternalLink, Edit } from 'lucide-react'
import { Project } from '@/types/builder'

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      if (!res.ok) throw new Error('Failed to fetch projects')
      const { projects } = await res.json()
      setProjects(projects || [])
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const createNewProject = async () => {
    setCreating(true)
    router.push('/builder/new')
  }

  const deleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Delete this project?')) return
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      setProjects(projects.filter((p) => p.id !== id))
    } catch (err) {
      console.error('Failed to delete project:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">My Projects</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={createNewProject}
            disabled={creating}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {creating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            New Project
          </button>
          <UserButton />
        </div>
      </header>

      {/* Content */}
      <main className="px-8 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No projects yet
            </h3>
            <p className="text-gray-400 mt-2">
              Create your first no-code app to get started
            </p>
            <button
              onClick={createNewProject}
              className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => router.push(`/builder/${project.id}`)}
                className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {project.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {(project.components || []).length} components
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Updated{' '}
                      {new Date(project.updated_at!).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`/preview/${project.id}`, '_blank')
                      }}
                      className="text-gray-400 hover:text-black p-1"
                      title="Preview"
                    >
                      <ExternalLink size={16} />
                    </button>
                    <button
                      onClick={(e) => deleteProject(project.id!, e)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {project.published ? '✅ Published' : '📝 Draft'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/builder/${project.id}`)
                    }}
                    className="text-xs text-gray-500 hover:text-black flex items-center gap-1"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
