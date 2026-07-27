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
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">Project not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Preview Banner */}
      <div className="bg-yellow-400 text-center py-2 text-sm font-medium">
        👁️ Preview Mode — This is how your app looks to visitors
      </div>

      {/* Render Components */}
      <div className="space-y-4 p-6 max-w-4xl mx-auto">
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
