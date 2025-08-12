'use client'

import { ReactNode } from 'react'

export default function HoverBlock({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <div
      className="relative group transition-all duration-200"
      onClick={onClick}
    >
      <div
        className="relative z-10 px-8 py-6 bg-white rounded-md
                   transform transition-transform duration-300
                   group-hover:scale-[1.02] group-hover:shadow-md
                   group-hover:z-20 group-hover:border-t group-hover:border-gray-300
                   cursor-pointer"
      >
        {children}
      </div>
    </div>
  )
}
