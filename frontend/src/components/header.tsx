'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import clsx from 'clsx' // 用于拼接类名，推荐使用

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        'w-full border-b bg-white sticky top-0 z-50 transition-shadow',
        scrolled ? 'shadow-md' : 'shadow-sm'
      )}
    >
      <div className="w-full flex items-center justify-between px-6 py-4">
        {/* 左侧 Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          ResumeAI
        </Link>

        {/* 中间：导航 */}
        <nav className="flex-1 hidden md:flex justify-center gap-6 text-sm text-gray-600">
          <Link href="/">Home</Link>
          <a href="#features">Features</a>
          <Link href="/resume_edit">Upload</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        {/* 右侧按钮 */}
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
