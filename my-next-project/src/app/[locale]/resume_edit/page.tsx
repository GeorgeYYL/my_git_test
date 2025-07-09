'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'
import { Resume } from '@/lib/types'
import SideLeft from './sidebarleft'
import ToolBar from './toolbar'
import Header from '@/components/header'

const PDFViewer = dynamic(() => import('./viewer'), { ssr: false })

export default function ResumeEditPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (data && data.length > 0) {
        setResumes(data)
        setSelectedResume(data[0])
      }

      setLoading(false)
    }

    fetchResumes()
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen flex">
        {/* 左侧总览栏 */}
        <aside className="w-64 border-r border-gray-200">
          <SideLeft resumes={resumes} onSelect={setSelectedResume} current={selectedResume} />
        </aside>

        {/* 中间 PDF 预览 */}
        <section className="flex-1 flex justify-center items-center bg-gray-100">
        {selectedResume ? (
            <PDFViewer url={selectedResume.file_url} />
        ) : loading ? (
            <p className="text-blue-500">Loading...</p>
        ) : (
            <p className="text-red-500">No resume selected</p>
        )}
        </section>

        {/* 右侧工具栏 */}
        <aside className="w-64 border-l border-gray-200">
          <ToolBar selectedResume={selectedResume} refresh={() => location.reload()} />
        </aside>
      </main>
    </>
  )
}
