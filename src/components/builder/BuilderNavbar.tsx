'use client'

import { useBuilderStore } from '@/store/builderStore'
import { useRouter } from 'next/navigation'
import { Save, Eye, ArrowLeft, Loader2 } from 'lucide-react'

interface Props {
  onSave: () => void
}

export default function BuilderNavbar({ onSave }: Props) {
  const { projectName, setProjectName, isSaving, hasUnsavedChanges } =
    useBuilderStore()
  const router = useRouter()

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-500 hover:text-black transition-colors shrink-0"
          title="Back to Dashboard"
        >
          <ArrowLeft size={20} />
        </button>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="font-semibold text-gray-800 bg-transparent border-none outline-none focus:bg-gray-100 px-2 py-1 rounded min-w-0"
        />
        {hasUnsavedChanges && (
          <span className="text-xs text-gray-400 hidden sm:inline">Unsaved changes</span>
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
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
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
