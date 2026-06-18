import Eyebrow from '@/components/ui/Eyebrow'

const steps = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[34px] h-[34px]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: 'Tư vấn & định hướng',
    desc: 'Đánh giá năng lực, sở thích, ngân sách để xác định lộ trình phù hợp nhất.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[34px] h-[34px]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>,
    title: 'Chuẩn bị hồ sơ',
    desc: 'Hoàn thiện hồ sơ học thuật, bài luận, thư giới thiệu và nộp đơn.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[34px] h-[34px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    title: 'Xin visa',
    desc: 'Chuẩn bị chứng minh tài chính, luyện phỏng vấn và xử lý visa.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[34px] h-[34px]"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>,
    title: 'Lên đường & hỗ trợ',
    desc: 'Đón sân bay, tìm nhà ở và đồng hành trong suốt quá trình học.',
  },
]

export default function HomeSteps() {
  return (
    <section className="bg-bg-soft" style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
      <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
        <div className="text-center max-w-[740px] mx-auto mb-[54px] reveal">
          <Eyebrow center>Quy trình 4 bước</Eyebrow>
          <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Hành trình du học <span className="text-primary">đơn giản hóa</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className={`bg-white border border-line rounded-[22px] p-[34px_26px] text-center hover:-translate-y-2 hover:shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] hover:border-transparent transition-all duration-300 reveal reveal-d${i}`}>
              <div className="relative w-[74px] h-[74px] rounded-full bg-primary-soft text-primary grid place-items-center mx-auto mb-5">
                {s.icon}
                <span className="absolute -top-[6px] -right-[6px] w-[30px] h-[30px] rounded-full bg-primary text-white font-[family-name:var(--font-head)] font-bold text-[14px] grid place-items-center border-[3px] border-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-[19px] mb-[9px]">{s.title}</h3>
              <p className="text-muted text-[14.5px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
