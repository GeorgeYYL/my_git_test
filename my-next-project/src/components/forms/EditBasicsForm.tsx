'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function EditBasicsForm() {
  const [form, setForm] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+61 400 000 000',
    summary: 'A passionate software developer...'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    console.log('Save:', form)
    // TODO: Update resume state in parent or global store
  }

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <Input name="name" value={form.name} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input name="email" value={form.email} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <Input name="phone" value={form.phone} onChange={handleChange} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <Textarea name="summary" value={form.summary} onChange={handleChange} rows={4} />
      </div>

      <Button type="button" onClick={handleSave} className="mt-2">
        Save Changes
      </Button>
    </form>
  )
}
