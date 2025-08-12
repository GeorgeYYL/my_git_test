'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function EditorPanel({
  title,
  children,
  onClose,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
}) {
  // ESC 关闭逻辑
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white border-l shadow-lg z-50 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100%-56px)]">
        {children}
      </div>
    </div>
  )
}
