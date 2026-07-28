import { createClient } from '@supabase/supabase-js'
import ComponentRenderer from '@/components/builder/ComponentRenderer'
import { BuilderComponent } from '@/types/builder'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">Project not found</p>
          <p className="text-gray-400 text-sm mt-1">The project you're looking for doesn't exist or has been deleted.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-center py-2.5 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-indigo-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm font-medium text-white">
            Preview Mode — This is how your app looks to visitors
          </span>
        </div>
      </div>

      {/* Render Components */}
      <div className="space-y-0">
        {(project.components as BuilderComponent[]).map((component) => (
          <ComponentRenderer
            key={component.id}
            component={component}
            isPreview={true}
          />
        ))}
      </div>
    </div>
  )
}
