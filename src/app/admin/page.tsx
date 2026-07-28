import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

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
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Testing Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Phase 3 — Monitor user activity and feedback</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Users', value: uniqueUsers, emoji: '👥', color: 'bg-blue-50 text-blue-600' },
            { label: 'Total Projects', value: totalProjects, emoji: '📁', color: 'bg-indigo-50 text-indigo-600' },
            { label: 'Feedback Items', value: totalFeedback, emoji: '💬', color: 'bg-amber-50 text-amber-600' },
            { label: 'Avg Rating', value: avgRating, emoji: '⭐', color: 'bg-emerald-50 text-emerald-600' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                <span className="text-lg">{stat.emoji}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">User Feedback</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {totalFeedback} {totalFeedback === 1 ? 'entry' : 'entries'}
              </p>
            </div>
          </div>
          {feedback && feedback.length > 0 ? (
            <div className="space-y-3">
              {(feedback as { id: string; type: string; message: string; rating: number | null; created_at: string }[]).map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-50 rounded-xl p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        item.type === 'bug'
                          ? 'bg-red-50 text-red-700'
                          : item.type === 'feature'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.type === 'bug'
                        ? '🐛 Bug'
                        : item.type === 'feature'
                        ? '✨ Feature'
                        : '💬 General'}
                    </span>
                    <div className="flex items-center gap-3">
                      {item.rating && (
                        <span className="text-sm">{'⭐'.repeat(item.rating)}</span>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No feedback yet</p>
              <p className="text-gray-400 text-sm mt-1">Share your app with testers to see their feedback here.</p>
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
              <p className="text-sm text-gray-500 mt-0.5">{totalProjects} total</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Components</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                </tr>
              </thead>
              <tbody>
                {(projects || []).slice(0, 20).map((project) => (
                  <tr key={project.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 font-medium text-gray-900">{project.name}</td>
                    <td className="py-3 text-gray-500">
                      {(project.components as unknown[])?.length || 0} components
                    </td>
                    <td className="py-3">
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
                    </td>
                    <td className="py-3 text-gray-500">
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
            <div className="text-center py-8 text-sm text-gray-400">No projects yet</div>
          )}
        </div>
      </div>
    </div>
  )
}
