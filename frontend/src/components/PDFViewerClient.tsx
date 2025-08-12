// components/PDFViewerClient.tsx
'use client';

import dynamic from 'next/dynamic';

// 👇 动态引入 PDFViewer，只在浏览器中运行
const PDFViewer = dynamic(() => import('./PDFViewer'), {
  ssr: false,
});

export default function PDFViewerClient() {
  return <PDFViewer />;
}