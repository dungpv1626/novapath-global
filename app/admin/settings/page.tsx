import { db } from '@/lib/db'
import SettingsForm from './SettingsForm'

export default async function AdminSettingsPage() {
  const settings = await db.siteSettings.findUnique({ where: { id: 'main' } })

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d]">Cài đặt trang</h1>
        <p className="text-[#5b6b86] text-[15px] mt-1">Hero, thống kê, liên hệ</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  )
}
