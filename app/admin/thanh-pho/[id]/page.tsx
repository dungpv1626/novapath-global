import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import CityForm from '../CityForm'

interface Props { params: Promise<{ id: string }> }

export default async function EditCityPage({ params }: Props) {
  const { id } = await params
  const city = await db.city.findUnique({ where: { id } })
  if (!city) notFound()

  return (
    <div>
      <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d] mb-8">Chỉnh sửa thành phố</h1>
      <CityForm city={city} />
    </div>
  )
}
