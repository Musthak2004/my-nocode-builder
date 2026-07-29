'use client'

import { useBuilderStore } from '@/store/builderStore'
import { useRouter } from 'next/navigation'
import { Save, Eye, Loader2, ArrowLeft } from 'lucide-react'

interface Props {
  onSave: () => void
}

export default function BuilderNavbar({ onSave }: Props) {
  const { projectName, setProjectName, isSaving, hasUnsavedChanges } =
    useBuilderStore()
  const router = useRouter()

  return (
    <div className="h-14 bg-white border-b border-border flex items-center justify-between px-5 z-10 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => router.push('/dashboard')}
          className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
          title="Back to Dashboard"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>

        <div className="w-px h-5 bg-border" />

        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="font-semibold text-foreground bg-transparent border-none outline-none focus:bg-surface px-2 py-1 rounded-lg min-w-0 text-sm transition-colors"
        />

        {hasUnsavedChanges && (
          <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            Unsaved
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const projectId = useBuilderStore.getState().projectId
            if (projectId) {
              window.open(`/preview/${projectId}`, '_blank')
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium text-foreground-secondary hover:text-foreground hover:bg-surface-hover hover:border-border-hover transition-all"
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark disabled:opacity-50 transition-all hover:shadow-md active:scale-[0.98]"
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}
