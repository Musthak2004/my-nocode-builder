'use client'

import { useBuilderStore } from '@/store/builderStore'
import { useRouter } from 'next/navigation'
import { Save, Eye, Loader2 } from 'lucide-react'

interface Props {
  onSave: () => void
}

export default function BuilderNavbar({ onSave }: Props) {
  const { projectName, setProjectName, isSaving, hasUnsavedChanges } =
    useBuilderStore()
  const router = useRouter()

  return (
    <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-5 z-10 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => router.push('/dashboard')}
          className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0"
          title="Back to Dashboard"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-200" />

        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="font-semibold text-gray-800 bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded-lg min-w-0 text-sm transition-colors"
        />

        {hasUnsavedChanges && (
          <span className="inline-flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            Unsaved
          </span>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const projectId = useBuilderStore.getState().projectId
            if (projectId) {
              window.open(`/preview/${projectId}`, '_blank')
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
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
