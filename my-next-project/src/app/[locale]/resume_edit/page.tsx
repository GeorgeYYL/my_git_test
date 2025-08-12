'use client'

import { useState } from 'react'
import Header from '@/components/header'
import ResumePreview from '@/components/resumePreview'
import { sampleResume } from './resume_data'
import EditorPanel from '@/components/editorPanel'
import EditBasicsForm from '@/components/forms/EditBasicsForm'

export default function ResumeEditPage() {
  const [openSection, setOpenSection] = useState<null | 'basics' | 'experience' | 'education'>(null)

  const handleSectionClick = (section: typeof openSection) => {
    setOpenSection(section)
  }

  const closeEditor = () => setOpenSection(null)
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen border-r bg-white p-4">
          <h2 className="text-lg font-semibold mb-4">Sections</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Basic Info</li>
            <li>Education</li>
            <li>Experience</li>
            <li>Skills</li>
            <li>Projects</li>
          </ul>
        </aside>

        {/* Resume Preview Area */}
        <section className="flex-1 flex justify-center py-10 px-4 overflow-auto">
          <ResumePreview resume={sampleResume} onSectionClick={handleSectionClick}/>
        </section>

        {/* Editor Panel 按当前 section 显示对应编辑器 */}
        {openSection && (
          <EditorPanel title={openSection} onClose={closeEditor}>
            {openSection === 'basics' && <EditBasicsForm />}
            {openSection === 'experience' && <div>Experience Form</div>}
          </EditorPanel>
        )}
      </div>
    </main>
  )
}
