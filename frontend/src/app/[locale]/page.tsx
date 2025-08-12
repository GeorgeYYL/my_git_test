'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadCloud } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'

export default function HomePage() {
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()

  const handleFileUpload = async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      return alert('Please upload a valid PDF file.')
    }
  
    setSelectedFile(file)
    setUploading(true)

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    const filePath = `${Date.now()}_${safeName}`

  
    const { error: uploadError } = await supabase
      .storage
      .from('resumes')
      .upload(filePath, file, { upsert: true })

    console.log("Uploading to Supabase path:", filePath)
    
    const authUser = await supabase.auth.getUser()
    console.log("🧪 Supabase User (auth.getUser):", authUser)
  
    if (uploadError) {
      console.error('❌ Upload error:', JSON.stringify(uploadError, null, 2))
      alert('Upload failed. Check console for details.')
      setUploading(false)
      return
    }
  
    // ✅ 正确方式获取 public URL
    const publicUrlResult = supabase
      .storage
      .from('resumes')
      .getPublicUrl(filePath)
  
    if (!publicUrlResult.data?.publicUrl) {
      alert('Failed to get file URL.')
      setUploading(false)
      return
    }
  
    const publicUrl = publicUrlResult.data.publicUrl
  
    const { error: dbError } = await supabase.from('resumes').insert({
      file_name: file.name,
      file_url: publicUrl,
    })
  
    if (dbError) {
      alert(`Database insert failed: ${dbError.message}`)
      setUploading(false)
      return
    }
  
    setUploading(false)
    router.push('/resume_edit')
  }
  
  

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 py-12 max-w-5xl mx-auto space-y-24">
        {/* Hero + Upload */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            AI-Powered Resume Optimizer
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Upload your resume and receive instant, professional feedback powered by GPT.
          </p>

          <div className="flex justify-center">
            <label
              className="flex flex-col items-center justify-center w-full sm:w-2/3 border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition text-gray-600"
              onDrop={async (e) => {
                e.preventDefault()
                const file = e.dataTransfer.files?.[0]
                if (file) await handleFileUpload(file)
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <UploadCloud className="w-8 h-8 mb-2 text-blue-500" />
              <span className="mb-2">
                {uploading
                  ? 'Uploading...'
                  : selectedFile
                  ? selectedFile.name
                  : 'Click or drag your PDF resume here to begin'}
              </span>
              <Input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file)
                }}
              />
            </label>
          </div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">📊 Smart Analysis</h3>
            <p className="text-sm text-gray-500">
              Detect structure, grammar, and keyword gaps instantly.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">⚡ Instant Feedback</h3>
            <p className="text-sm text-gray-500">
              Get GPT-powered improvement suggestions tailored to your career goals.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">📥 Ready to Download</h3>
            <p className="text-sm text-gray-500">
              Export a polished version of your resume with one click.
            </p>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 pt-12 border-t">
          &copy; {new Date().getFullYear()} ResumeAI · All rights reserved.
        </footer>
      </main>
    </>
  )
}
