'use client'

import { Button } from '@/components/ui/button'
import { UploadCloud, Trash2, FileText, Pencil } from 'lucide-react'
import { Resume } from '@/lib/types'
import { supabase } from '@/lib/supabase'

interface ToolBarProps {
  selectedResume: Resume | null
  refresh: () => void
}

export default function ToolBar({ selectedResume, refresh }: ToolBarProps) {
  const handleRead = () => {
    if (!selectedResume) return
    console.log('🔍 Read PDF:', selectedResume.file_name)
    window.open(selectedResume.file_url, '_blank')
  }

  const handleUpload = () => {
    console.log('📤 Upload PDF (not implemented)')
  }

  const handleEdit = () => {
    if (!selectedResume) return
    console.log('✏️ Edit PDF:', selectedResume.file_name)
  }

  const handleDelete = async () => {
    if (!selectedResume) return

    const filePath = selectedResume.file_url.split('/resumes/')[1]
    const { error: storageError } = await supabase.storage
      .from('resumes')
      .remove([filePath])

    if (storageError) {
      console.error('❌ Failed to delete file from storage', storageError)
      return
    }

    const { error: dbError } = await supabase
      .from('resumes')
      .delete()
      .eq('id', selectedResume.id)

    if (dbError) {
      console.error('❌ Failed to delete from database', dbError)
    } else {
      console.log('✅ Resume deleted:', selectedResume.file_name)
      refresh()
    }
  }

  return (
    <aside className="w-full sm:w-60 bg-gray-100 p-4 space-y-4 border-l">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Toolbar</h2>

      {selectedResume ? (
        <div className="flex flex-col gap-3">
          <Button variant="outline" onClick={handleRead}>
            <FileText className="mr-2 h-4 w-4" /> Read
          </Button>
          <Button variant="outline" onClick={handleUpload}>
            <UploadCloud className="mr-2 h-4 w-4" /> Upload
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No resume selected</p>
      )}
    </aside>
  )
}
