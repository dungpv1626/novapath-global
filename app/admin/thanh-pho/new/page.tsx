export const runtime = 'edge'
import CityForm from '../CityForm'

export default function NewCityPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#0a1b3d] mb-8">Thêm thành phố mới</h1>
      <CityForm />
    </div>
  )
}
