'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteButton({ id, endpoint, label }: { id: string; endpoint: string; label: string }) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setLoading(true)
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-[11px] font-semibold text-white bg-[#d6486f] px-2.5 py-1 rounded-[6px] hover:bg-[#b83059] disabled:opacity-60 transition-colors"
        >
          {loading ? '...' : 'Xoá'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-[11px] font-semibold text-[#5b6b86] bg-[#e3eaf5] px-2.5 py-1 rounded-[6px] hover:bg-[#d0daea] transition-colors"
        >
          Huỷ
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Xoá ${label}`}
      className="p-2 text-[#5b6b86] hover:text-[#d6486f] hover:bg-[#fde7ee] rounded-[8px] transition-colors"
    >
      <Trash2 size={15} />
    </button>
  )
}
