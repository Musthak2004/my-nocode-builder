'use client'

import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Plus, Loader2, Trash2, ExternalLink, Edit, FolderOpen } from 'lucide-react'
import { Project } from '@/types/builder'

function ProjectSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
      <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
      <div className="h-3 bg-gray-50 rounded w-1/3 mb-2" />
      <div className="h-3 bg-gray-50 rounded w-1/4 mb-4" />
      <div className="pt-4 border-t border-gray-50">
        <div className="h-6 bg-gray-50 rounded-full w-24" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

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
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return
    setDeletingId(id)
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      setProjects(projects.filter((p) => p.id !== id))
    } catch (err) {
      console.error('Failed to delete project:', err)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gray-900">My Projects</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={createNewProject}
              disabled={creating}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              {creating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Plus size={16} />
              )}
              {creating ? 'Creating...' : 'New Project'}
            </button>
            <div className="pl-4 border-l border-gray-100">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8 rounded-lg border-2 border-transparent hover:border-indigo-200 transition-all',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <FolderOpen size={36} className="text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              No projects yet
            </h3>
            <p className="text-gray-500 mt-2 mb-8 max-w-sm leading-relaxed">
              Your first app is just a click away. Create a project and start building with drag & drop.
            </p>
            <button
              onClick={createNewProject}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-gray-900/10"
            >
              <Plus size={18} />
              Create Your First Project
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  All Projects
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => router.push(`/builder/${project.id}`)}
                  className="group bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 truncate text-[15px]">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-gray-400">
                          {(project.components || []).length} components
                        </span>
                        <span className="text-gray-200">·</span>
                        <span className="text-xs text-gray-400">
                          {new Date(project.updated_at!).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        project.published
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-gray-50 text-gray-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        project.published ? 'bg-emerald-500' : 'bg-gray-300'
                      }`} />
                      {project.published ? 'Published' : 'Draft'}
                    </span>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(`/preview/${project.id}`, '_blank')
                        }}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
                        title="Preview"
                      >
                        <ExternalLink size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/builder/${project.id}`)
                        }}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={(e) => deleteProject(project.id!, e)}
                        disabled={deletingId === project.id}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === project.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
