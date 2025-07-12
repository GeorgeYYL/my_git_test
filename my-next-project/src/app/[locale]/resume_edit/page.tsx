'use client'

import Header from '@/components/header'
import ResumePreview from '@/components/resumePreview'
import { sampleResume } from './resume_data'

export default function ResumeEditPage() {
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
          <ResumePreview resume={sampleResume} />
        </section>
      </div>
    </main>
  )
}
