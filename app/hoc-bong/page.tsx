import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import Eyebrow from '@/components/ui/Eyebrow'
import ScholarCard from '@/components/ui/ScholarCard'
import CTABanner from '@/components/ui/CTABanner'
import Button from '@/components/ui/Button'
import RevealProvider from '@/components/RevealProvider'
import { ArrowRight, Phone } from 'lucide-react'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Học bổng du học Trung Quốc — NOVAPATH GLOBAL',
  description: 'Khám phá các suất học bổng du học giá trị: CSC, Khổng Tử, Trần Gia Canh và nhiều học bổng trường khác.',
}

export default async function ScholarshipsPage() {
  const scholars = await db.scholarship.findMany({ orderBy: { order: 'asc' } })

  return (
    <RevealProvider>
      <PageHero
        crumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Học bổng' }]}
        title="Chinh phục học bổng du học giá trị"
        description="Mỗi năm, học viên NOVAPATH giành được hàng trăm suất học bổng du học Trung Quốc. Hãy để chúng tôi giúp bạn tiếp cận những cơ hội phù hợp nhất."
      />

      {/* Scholar cards */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
            <Eyebrow center>Học bổng nổi bật</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Các suất học bổng <span className="text-primary">đang mở</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {scholars.map((s, i) => {
              const conditions: string[] = JSON.parse(s.conditions)
              return (
                <div key={s.id} className={`reveal ${i % 3 > 0 ? `reveal-d${i % 3}` : ''}`}>
                  <ScholarCard
                    name={s.name}
                    amount={s.amount}
                    conditions={conditions}
                    popular={s.popular}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison table — Khổng Tử */}
      <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="text-center max-w-[740px] mx-auto mb-[40px] reveal">
            <Eyebrow center>Tìm hiểu sâu</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Học bổng Khổng Tử: <span className="text-primary">Loại A & Loại B</span></h2>
            <p className="text-muted mt-4" style={{ fontSize: 'clamp(16px,1.5vw,19px)' }}>Hai nhánh phổ biến nhất của học bổng Khổng Tử (CIS) — chọn đúng loại phù hợp mục tiêu của bạn.</p>
          </div>
          <div className="overflow-x-auto rounded-[22px] border border-line shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] bg-white reveal">
            <table className="cmp-table">
              <thead>
                <tr>
                  <th>Tiêu chí</th>
                  <th>Loại A</th>
                  <th>Loại B</th>
                </tr>
              </thead>
              <tbody>
                <tr><th>Quyền lợi</th><td>Miễn 100% học phí, ký túc xá, bảo hiểm + trợ cấp <span className="hl">2.500–3.500 NDT/tháng</span></td><td>Miễn 100% học phí, ký túc xá, bảo hiểm + trợ cấp <span className="hl">2.500–3.000 NDT/tháng</span></td></tr>
                <tr><th>Hệ đào tạo</th><td>1 học kỳ / 1 năm tiếng, Đại học, Thạc sĩ, Tiến sĩ</td><td>1 năm tiếng, Đại học, Thạc sĩ</td></tr>
                <tr><th>Kỳ tuyển sinh</th><td>Tháng 3 và tháng 9 hằng năm</td><td>Tháng 9 hằng năm</td></tr>
                <tr><th>Yêu cầu HSK</th><td>HSK 3–6 + HSKK (tùy chương trình)</td><td>HSK 3–5 + HSKK (tùy chương trình)</td></tr>
                <tr><th>Ngành đào tạo</th><td>Ngôn ngữ, Văn học, Lịch sử, Triết học, Trung y, Thái cực quyền…</td><td>Giáo dục Hán ngữ quốc tế, Văn – Sử – Triết</td></tr>
                <tr><th>Đặc điểm</th><td>Do Học viện Khổng Tử (Hanban) cấp trực tiếp</td><td>Hợp tác cùng 18 trường ĐH</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
        <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
          <div className="reveal">
            <CTABanner
              title="Bắt đầu hành trình săn học bổng ngay hôm nay"
              desc="Chuyên gia NOVAPATH sẽ phân tích hồ sơ và tìm suất học bổng phù hợp nhất cho bạn miễn phí."
              actions={
                <>
                  <Button href="/lien-he" variant="light">Tư vấn miễn phí <ArrowRight size={17} /></Button>
                  <Button href="tel:19006868" variant="accent"><Phone size={17} /> 1900 6868</Button>
                </>
              }
            />
          </div>
        </div>
      </section>
    </RevealProvider>
  )
}
