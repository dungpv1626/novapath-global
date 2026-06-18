import Image from 'next/image'
import Eyebrow from '@/components/ui/Eyebrow'

const testimonials = [
  {
    text: 'Nhờ NOVAPATH mình giành được học bổng 50% du học Trung Quốc. Đội ngũ tư vấn cực kỳ tận tâm, theo sát từng bước hồ sơ.',
    name: 'Nguyễn Minh Anh',
    role: 'SV ĐH Phúc Đán, Thượng Hải',
    avatar: '/images/testimonial-1.jpg',
  },
  {
    text: 'Quy trình rõ ràng, minh bạch chi phí. Con mình đậu visa Trung Quốc ngay lần đầu. Gia đình rất yên tâm.',
    name: 'Trần Thu Hà',
    role: 'Phụ huynh học sinh',
    avatar: '/images/testimonial-2.jpg',
  },
  {
    text: 'Từ một người mất phương hướng, mình được định hướng đúng ngành và đang học Thạc sĩ tại Bắc Kinh. Cảm ơn cả đội!',
    name: 'Lê Hoàng Phúc',
    role: 'HV Thạc sĩ, ĐH Thanh Hoa',
    avatar: '/images/testimonial-3.jpg',
  },
]

export default function HomeTestimonials() {
  return (
    <section style={{ paddingBlock: 'clamp(64px,8vw,118px)' }}>
      <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)]">
        <div className="text-center max-w-[740px] mx-auto mb-[50px] reveal">
          <Eyebrow center>Cảm nhận học viên</Eyebrow>
          <h2 className="text-[clamp(30px,4vw,46px)] leading-[1.1]">Câu chuyện <span className="text-primary">thành công</span> thật</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article key={t.name} className={`bg-white border border-line rounded-[22px] p-[30px] shadow-[0_12px_30px_-16px_rgba(15,40,95,0.22)] hover:-translate-y-2 hover:shadow-[0_24px_60px_-28px_rgba(15,40,95,0.30)] transition-all duration-300 relative reveal ${i > 0 ? `reveal-d${i}` : ''}`}>
              <span className="absolute top-6 right-7 font-[family-name:var(--font-head)] text-[70px] leading-none text-primary-soft font-extrabold select-none">&ldquo;</span>
              <div className="text-accent tracking-[2px] mb-4 text-[15px]">★★★★★</div>
              <p className="text-[16px] text-[#33425e] mb-[22px] relative z-10">{t.text}</p>
              <div className="flex items-center gap-[13px]">
                <Image src={t.avatar} alt={t.name} width={52} height={52} className="w-[52px] h-[52px] rounded-full object-cover flex-shrink-0" unoptimized={t.avatar.startsWith('/')} />
                <div>
                  <div className="font-[family-name:var(--font-head)] font-bold text-[16px]">{t.name}</div>
                  <div className="text-[13px] text-muted">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
