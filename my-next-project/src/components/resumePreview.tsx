'use client'

import HoverBlock from '@/components/ui/Hoverblock'

type Resume = {
  basics: {
    name: string
    email: string
    phone: string
    summary: string
  }
  experience: {
    company: string
    position: string
    startDate: string
    endDate: string
    summary: string
  }[]
  education: {
    school: string
    degree: string
    startDate: string
    endDate: string
  }[]
}

export default function ResumePreview({
        resume,
        onSectionClick,
      }: {
        resume: Resume
        onSectionClick?: (section: 'basics' | 'experience' | 'education') => void
      }) {
  return (
    <div className="bg-white w-full max-w-[794px] mx-auto shadow-md rounded-lg text-gray-800 relative isolate z-0">
      
      {/* Basics */}
      <HoverBlock onClick={() => onSectionClick?.('basics')}>
        <h1 className="text-3xl font-bold">{resume.basics.name}</h1>
        <p className="text-sm text-gray-600">
          {resume.basics.email} · {resume.basics.phone}
        </p>
        <p className="mt-2">{resume.basics.summary}</p>
      </HoverBlock>

      {/* Experience */}
      <HoverBlock onClick={() => onSectionClick?.('experience')}>
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        {resume.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{exp.position} @ {exp.company}</h3>
              <span className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </span>
            </div>
            <p className="text-sm mt-1">{exp.summary}</p>
          </div>
        ))}
      </HoverBlock>

      {/* Education */}
      <HoverBlock onClick={() => onSectionClick?.('education')}>
        <h2 className="text-xl font-semibold mb-4">Education</h2>
        {resume.education.map((edu, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{edu.degree} @ {edu.school}</h3>
              <span className="text-sm text-gray-500">
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
          </div>
        ))}
      </HoverBlock>
    </div>
  )
}
