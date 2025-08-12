// SidebarLeft.tsx
'use client'

import { useState } from 'react'
import { Resume } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SidebarLeftProps {
  resumes: Resume[]
  current: Resume | null
  onSelect: (resume: Resume) => void
}

export default function SideLeft({ resumes, current, onSelect }: SidebarLeftProps) {
  return (
    <aside className="w-1/5 border-r h-full overflow-y-auto p-2 bg-gray-50">
      <h3 className="font-semibold text-sm text-gray-600 mb-2">Documents</h3>
      {resumes.map((resume) => (
        <div
          key={resume.id}
          className={cn(
            'cursor-pointer text-sm p-2 rounded hover:bg-gray-200',
            current?.id === resume.id && 'bg-gray-300 font-bold'
          )}
          onClick={() => onSelect(resume)}
        >
          {resume.file_name}
        </div>
      ))}
    </aside>
  )
}
