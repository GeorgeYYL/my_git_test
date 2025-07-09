'use client'

import { useEffect, useRef } from 'react'
import { Document, Page } from 'react-pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { Button } from '@/components/ui/button'

interface PdfPreviewProps {
  url: string
  onClose?: () => void
}

export default function PdfPreview({ url, onClose }: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [url])

  if (!url || typeof url !== 'string') {
    return <p className="text-red-500">Invalid PDF URL</p>
  }

  return (
    <div className="w-full h-full overflow-y-auto p-4" ref={containerRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">PDF Preview</h2>
        {onClose && (
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <Document
          file={url}
          onLoadSuccess={(doc: PDFDocumentProxy) => console.log('Loaded PDF with', doc.numPages, 'pages')}
          onLoadError={(e) => console.error('PDF load error:', e)}
        >
          <Page pageNumber={1} width={600} />
        </Document>
      </div>
    </div>
  )
}
