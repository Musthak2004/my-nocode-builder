import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Shield, FolderKanban, MessageSquare, Star } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Add your Clerk user ID here to protect admin page
const ADMIN_USER_ID = process.env.ADMIN_USER_ID || ''

export default async function AdminPage() {
  const { userId } = await auth()
  if (!userId || userId !== ADMIN_USER_ID) redirect('/')

  const [
    { data: projects },
    { data: feedback },
    { count: userCount },
  ] = await Promise.all([
    supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('projects')
      .select('user_id', { count: 'exact', head: true }),
  ])

  const totalProjects = projects?.length || 0
  const totalFeedback = feedback?.length || 0
  const uniqueUsers = new Set((projects || []).map((p) => p.user_id)).size
  const avgRating =
    feedback && feedback.length > 0
      ? (
          (feedback as { rating: number | null }[])
            .filter((f) => f.rating)
            .reduce((sum, f) => sum + (f.rating || 0), 0) /
          (feedback as { rating: number | null }[]).filter((f) => f.rating).length
        ).toFixed(1)
      : 'N/A'

  return (
    <div className="min-h-dvh bg-surface p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <Shield size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Testing Dashboard</h1>
            <p className="text-sm text-foreground-secondary mt-0.5">Phase 3 — Monitor user activity and feedback</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Users', value: uniqueUsers, icon: Shield, color: 'bg-blue-100 text-blue-600' },
            { label: 'Total Projects', value: totalProjects, icon: FolderKanban, color: 'bg-primary-subtle text-primary' },
            { label: 'Feedback Items', value: totalFeedback, icon: MessageSquare, color: 'bg-amber-100 text-amber-600' },
            { label: 'Avg Rating', value: avgRating, icon: Star, color: 'bg-emerald-100 text-emerald-600' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-border-hover transition-all"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                  <Icon size={18} />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-foreground-secondary mt-1">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-foreground">User Feedback</h2>
              <p className="text-sm text-foreground-secondary mt-0.5">
                {totalFeedback} {totalFeedback === 1 ? 'entry' : 'entries'}
              </p>
            </div>
          </div>
          {feedback && feedback.length > 0 ? (
            <div className="space-y-3">
              {(feedback as { id: string; type: string; message: string; rating: number | null; created_at: string }[]).map((item) => (
                <div
                  key={item.id}
                  className="border border-border-subtle rounded-xl p-4 hover:bg-surface transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        item.type === 'bug'
                          ? 'bg-red-50 text-red-700'
                          : item.type === 'feature'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-surface text-foreground-tertiary'
                      }`}
                    >
                      {item.type === 'bug'
                        ? 'Bug'
                        : item.type === 'feature'
                        ? 'Feature'
                        : 'General'}
                    </span>
                    <div className="flex items-center gap-3">
                      {item.rating && (
                        <span className="text-sm text-amber-500">{'★'.repeat(item.rating)}</span>
                      )}
                      <span className="text-xs text-foreground-tertiary">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{item.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={28} className="text-border-hover" />
              </div>
              <p className="text-foreground-secondary font-medium">No feedback yet</p>
              <p className="text-foreground-tertiary text-sm mt-1">Share your app with testers to see their feedback here.</p>
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
              <p className="text-sm text-foreground-secondary mt-0.5">{totalProjects} total</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-xs font-semibold text-foreground-tertiary uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 text-xs font-semibold text-foreground-tertiary uppercase tracking-wider">Components</th>
                  <th className="text-left py-3 text-xs font-semibold text-foreground-tertiary uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 text-xs font-semibold text-foreground-tertiary uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody>
                {(projects || []).slice(0, 20).map((project) => (
                  <tr key={project.id} className="border-b border-border-subtle hover:bg-surface transition-colors">
                    <td className="py-3 font-medium text-foreground">{project.name}</td>
                    <td className="py-3 text-foreground-secondary">
                      {(project.components as unknown[])?.length || 0} components
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                          project.published
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-surface text-foreground-tertiary'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          project.published ? 'bg-emerald-500' : 'bg-foreground-tertiary'
                        }`} />
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 text-foreground-secondary">
                      {new Date(project.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(!projects || projects.length === 0) && (
            <div className="text-center py-8 text-sm text-foreground-tertiary">No projects yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
