'use client'

import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Loader2,
  Trash2,
  ExternalLink,
  Edit,
  FolderOpen,
  LayoutDashboard,
  FileText,
  CheckCircle2,
  Box,
} from 'lucide-react'
import { Project } from '@/types/builder'
import Sidebar from '@/components/dashboard/Sidebar'
import StatsCard from '@/components/dashboard/StatsCard'
import FeedbackWidget from '@/components/feedback/FeedbackWidget'
import { cn } from '@/lib/utils'

function ProjectSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 animate-pulse">
      <div className="h-5 bg-white/[0.06] rounded w-3/4 mb-3" />
      <div className="h-3 bg-white/[0.04] rounded w-1/3 mb-2" />
      <div className="h-3 bg-white/[0.04] rounded w-1/4 mb-4" />
      <div className="pt-4 border-t border-white/[0.04]">
        <div className="h-6 bg-white/[0.04] rounded-full w-24" />
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

  // Derived stats
  const totalProjects = projects.length
  const publishedCount = projects.filter((p) => p.published).length
  const draftCount = projects.filter((p) => !p.published).length
  const totalComponents = projects.reduce(
    (sum, p) => sum + ((p.components as unknown[])?.length || 0),
    0
  )

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main content area */}
      <div className="md:pl-[240px] transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-white/[0.04]">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 md:ml-0 ml-10">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center">
                <LayoutDashboard size={16} className="text-primary-light" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight">Dashboard</h1>
                <p className="text-xs text-foreground-tertiary/60 hidden sm:block">
                  Manage your projects
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={createNewProject}
                disabled={creating}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl text-white bg-gradient-to-br from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/25 disabled:opacity-40 transition-all duration-250 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {creating ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Plus size={16} />
                )}
                {creating ? 'Creating...' : 'New Project'}
              </button>
              <div className="hidden sm:block pl-3 border-l border-white/[0.06]">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        'w-7 h-7 rounded-lg border-2 border-transparent hover:border-primary/30 transition-all duration-200',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <>
              {/* Skeleton stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 animate-pulse"
                  >
                    <div className="h-3 bg-white/[0.04] rounded w-1/2 mb-4" />
                    <div className="h-8 bg-white/[0.06] rounded w-1/3 mb-2" />
                  </div>
                ))}
              </div>

              {/* Skeleton project cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ProjectSkeleton key={i} />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard
                  label="Total Projects"
                  value={totalProjects}
                  icon={LayoutDashboard}
                  accentColor="primary"
                  trend={
                    totalProjects > 0
                      ? { value: `${totalProjects} total`, positive: true }
                      : undefined
                  }
                />
                <StatsCard
                  label="Published"
                  value={publishedCount}
                  icon={CheckCircle2}
                  accentColor="emerald"
                />
                <StatsCard
                  label="Drafts"
                  value={draftCount}
                  icon={FileText}
                  accentColor="amber"
                />
                <StatsCard
                  label="Components"
                  value={totalComponents}
                  icon={Box}
                  accentColor="secondary"
                />
              </div>

              {/* Projects Section */}
              {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
                    <FolderOpen size={36} className="text-foreground-tertiary/40" />
                  </div>
                  <h3 className="text-xl font-bold">No projects yet</h3>
                  <p className="text-foreground-secondary/60 mt-2 mb-8 max-w-sm leading-relaxed text-sm">
                    Your first app is just a click away. Create a project and start building with drag & drop.
                  </p>
                  <button
                    onClick={createNewProject}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-br from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/25 transition-all duration-250 hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <Plus size={18} />
                    Create Your First Project
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-base font-semibold">All Projects</h2>
                      <p className="text-sm text-foreground-secondary/60 mt-0.5">
                        {totalProjects} {totalProjects === 1 ? 'project' : 'projects'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => router.push(`/builder/${project.id}`)}
                        className={cn(
                          'group relative overflow-hidden rounded-2xl p-5 border border-white/[0.06] cursor-pointer',
                          'bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]',
                          'transition-all duration-300 ease-out',
                          'hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5'
                        )}
                      >
                        {/* Gradient hover accent */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent" />

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-[15px] truncate group-hover:text-primary-light transition-colors duration-200">
                                {project.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-1.5 text-xs text-foreground-tertiary/60">
                                <span>{((project.components as unknown[]) || []).length} components</span>
                                <span className="text-white/[0.06]">·</span>
                                <span>
                                  {new Date(project.updated_at!).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Status + Actions row */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full',
                                project.published
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : 'bg-white/[0.04] text-foreground-tertiary/60'
                              )}
                            >
                              <span
                                className={cn(
                                  'w-1.5 h-1.5 rounded-full',
                                  project.published ? 'bg-emerald-400' : 'bg-foreground-tertiary/30'
                                )}
                              />
                              {project.published ? 'Published' : 'Draft'}
                            </span>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(`/preview/${project.id}`, '_blank')
                                }}
                                className="p-1.5 rounded-lg text-foreground-tertiary/50 hover:text-foreground hover:bg-white/[0.06] transition-all"
                                title="Preview"
                              >
                                <ExternalLink size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/builder/${project.id}`)
                                }}
                                className="p-1.5 rounded-lg text-foreground-tertiary/50 hover:text-primary-light hover:bg-primary/10 transition-all"
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={(e) => deleteProject(project.id!, e)}
                                disabled={deletingId === project.id}
                                className="p-1.5 rounded-lg text-foreground-tertiary/50 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
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
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>

      <FeedbackWidget />
    </div>
  )
}
