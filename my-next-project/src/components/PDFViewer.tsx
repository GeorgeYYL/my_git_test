'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '@/styles/pdf/AnnotationLayer.css';
import '@/styles/pdf/TextLayer.css';

// 设置 worker（推荐）
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export default function PDFViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="p-4">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {file && (
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          className="mt-4 border shadow"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page key={i} pageNumber={i + 1} width={600} />
          ))}
        </Document>
      )}
    </div>
  );
}
