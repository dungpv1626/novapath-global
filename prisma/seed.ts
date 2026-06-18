import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'dev.db')
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` })
const db = new PrismaClient({ adapter } as never)

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash('novapath2026', 10)
  await db.adminUser.upsert({
    where: { email: 'admin@novapath.vn' },
    update: {},
    create: {
      email: 'admin@novapath.vn',
      password: hashedPassword,
      name: 'Admin NOVAPATH',
    },
  })
  console.log('✅ Admin user: admin@novapath.vn / novapath2026')

  // Universities
  const universities = [
    {
      slug: 'dai-hoc-thanh-hoa',
      name: 'Đại học Thanh Hoa',
      nameEn: 'Tsinghua University',
      city: 'Bắc Kinh',
      rank: 1,
      established: 1911,
      students: '36.000+',
      programs: JSON.stringify(['Kỹ thuật', 'Công nghệ thông tin', 'Kiến trúc', 'Kinh tế']),
      tuition: '26.000 – 40.000 NDT/năm',
      highlights: JSON.stringify(['Top 25 thế giới', 'Học bổng chính phủ TQ', 'Chương trình tiếng Anh']),
      img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
      description: 'Đại học Thanh Hoa là trường đại học kỹ thuật hàng đầu Trung Quốc và châu Á, luôn xếp hạng top 25 thế giới.',
      order: 1,
    },
    {
      slug: 'dai-hoc-bac-kinh',
      name: 'Đại học Bắc Kinh',
      nameEn: 'Peking University',
      city: 'Bắc Kinh',
      rank: 2,
      established: 1898,
      students: '40.000+',
      programs: JSON.stringify(['Khoa học tự nhiên', 'Kinh tế', 'Luật', 'Nghệ thuật']),
      tuition: '22.000 – 38.000 NDT/năm',
      highlights: JSON.stringify(['Top 2 Trung Quốc', 'Mạng lưới cựu sinh viên toàn cầu', 'Học bổng đa dạng']),
      img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80',
      description: 'Đại học Bắc Kinh là trường đại học nghiên cứu hàng đầu Trung Quốc, nổi tiếng về khoa học xã hội và nhân văn.',
      order: 2,
    },
    {
      slug: 'dai-hoc-phuc-dan',
      name: 'Đại học Phúc Đán',
      nameEn: 'Fudan University',
      city: 'Thượng Hải',
      rank: 3,
      established: 1905,
      students: '33.000+',
      programs: JSON.stringify(['Kinh tế', 'Quản trị kinh doanh', 'Y khoa', 'Báo chí']),
      tuition: '20.000 – 35.000 NDT/năm',
      highlights: JSON.stringify(['Trung tâm tài chính Thượng Hải', 'Chương trình liên kết quốc tế', 'Y khoa nổi tiếng']),
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      description: 'Đại học Phúc Đán tại Thượng Hải là một trong những trường nghiên cứu uy tín nhất Trung Quốc.',
      order: 3,
    },
    {
      slug: 'dai-hoc-chiet-giang',
      name: 'Đại học Chiết Giang',
      nameEn: 'Zhejiang University',
      city: 'Hàng Châu',
      rank: 4,
      established: 1897,
      students: '55.000+',
      programs: JSON.stringify(['Kỹ thuật', 'Y khoa', 'Nông nghiệp', 'Kinh tế']),
      tuition: '18.000 – 32.000 NDT/năm',
      highlights: JSON.stringify(['Gần trụ sở Alibaba', 'Kỹ thuật top 5 TQ', 'Học bổng dồi dào']),
      img: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80',
      description: 'Đại học Chiết Giang tại Hàng Châu là một trong những trường đại học tổng hợp hàng đầu Trung Quốc.',
      order: 4,
    },
    {
      slug: 'dai-hoc-dong-te',
      name: 'Đại học Đồng Tế',
      nameEn: 'Tongji University',
      city: 'Thượng Hải',
      rank: 8,
      established: 1907,
      students: '37.000+',
      programs: JSON.stringify(['Kiến trúc', 'Xây dựng', 'Kỹ thuật môi trường', 'Cơ khí']),
      tuition: '18.000 – 28.000 NDT/năm',
      highlights: JSON.stringify(['Kiến trúc top 1 TQ', 'Hợp tác Đức', 'Học bổng chính phủ']),
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b6f5d?w=600&q=80',
      description: 'ĐH Đồng Tế nổi tiếng về Kiến trúc và Kỹ thuật xây dựng, xếp top đầu thế giới về ngành này.',
      order: 5,
    },
    {
      slug: 'dai-hoc-nam-kinh',
      name: 'Đại học Nam Kinh',
      nameEn: 'Nanjing University',
      city: 'Nam Kinh',
      rank: 6,
      established: 1902,
      students: '32.000+',
      programs: JSON.stringify(['Vật lý', 'Hóa học', 'Thiên văn học', 'Khoa học Trái đất']),
      tuition: '16.000 – 28.000 NDT/năm',
      highlights: JSON.stringify(['Khoa học tự nhiên top 5', 'Môi trường học thuật', 'Chi phí sinh hoạt thấp']),
      img: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&q=80',
      description: 'Đại học Nam Kinh là trường nghiên cứu hàng đầu về khoa học tự nhiên và lý thuyết.',
      order: 6,
    },
    {
      slug: 'dai-hoc-vu-han',
      name: 'Đại học Vũ Hán',
      nameEn: 'Wuhan University',
      city: 'Vũ Hán',
      rank: 13,
      established: 1893,
      students: '56.000+',
      programs: JSON.stringify(['Luật', 'Quản lý', 'Kỹ thuật thủy lợi', 'Nghệ thuật']),
      tuition: '15.000 – 25.000 NDT/năm',
      highlights: JSON.stringify(['Khuôn viên đẹp nhất TQ', 'Chi phí hợp lý', 'Học bổng Vũ Hán']),
      img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80',
      description: 'ĐH Vũ Hán nổi tiếng với khuôn viên đẹp nhất Trung Quốc và hàng anh đào nở rộ mỗi tháng 3.',
      order: 7,
    },
    {
      slug: 'dai-hoc-ngon-ngu-bac-kinh',
      name: 'Đại học Ngôn ngữ Bắc Kinh',
      nameEn: 'Beijing Language and Culture University',
      city: 'Bắc Kinh',
      rank: 50,
      established: 1962,
      students: '13.000+',
      programs: JSON.stringify(['Tiếng Trung', 'Ngôn ngữ học', 'Văn học', 'Giảng dạy Hán ngữ']),
      tuition: '15.000 – 22.000 NDT/năm',
      highlights: JSON.stringify(['70% sinh viên quốc tế', 'Chuyên sâu ngôn ngữ', 'HSK đầu ra cao']),
      img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
      description: 'BLCU là lựa chọn số 1 cho sinh viên muốn học tiếng Trung chuyên sâu — 70% sinh viên là người nước ngoài.',
      order: 8,
    },
  ]

  for (const u of universities) {
    await db.university.upsert({ where: { slug: u.slug }, update: u, create: u })
  }
  console.log(`✅ Seeded ${universities.length} universities`)

  // Scholarships
  const scholarships = [
    {
      name: 'Học bổng Chính phủ Trung Quốc (CSC)',
      amount: 'Toàn phần',
      conditions: JSON.stringify(['GPA ≥ 3.2/4.0', 'Tuổi ≤ 35', 'Sức khỏe tốt', 'Không vi phạm pháp luật']),
      popular: true,
      gradient: 'linear-gradient(135deg,#1d5fe0,#38bdf8)',
      order: 1,
    },
    {
      name: 'Học bổng Tỉnh thành',
      amount: '50% học phí',
      conditions: JSON.stringify(['GPA ≥ 3.0/4.0', 'Theo yêu cầu từng tỉnh', 'Nộp hồ sơ trước 31/03']),
      popular: false,
      gradient: 'linear-gradient(135deg,#6a4fd6,#a78bfa)',
      order: 2,
    },
    {
      name: 'Học bổng Trường',
      amount: '20–100% học phí',
      conditions: JSON.stringify(['Tùy trường quy định', 'GPA ≥ 2.8/4.0', 'Phỏng vấn trực tiếp']),
      popular: false,
      gradient: 'linear-gradient(135deg,#1c9b63,#34d399)',
      order: 3,
    },
    {
      name: 'Học bổng NOVAPATH',
      amount: '5.000.000đ',
      conditions: JSON.stringify(['Đăng ký qua NOVAPATH', 'Nộp đủ hồ sơ đúng hạn', 'Phỏng vấn tư vấn viên']),
      popular: true,
      gradient: 'linear-gradient(135deg,#f5a623,#fbbf24)',
      order: 4,
    },
    {
      name: 'Học bổng Khổng Tử',
      amount: 'Học phí + sinh hoạt phí',
      conditions: JSON.stringify(['Học tiếng Trung ≥ 1 năm', 'HSK 3 trở lên', 'Dưới 35 tuổi']),
      popular: false,
      gradient: 'linear-gradient(135deg,#d6486f,#fb7185)',
      order: 5,
    },
    {
      name: 'Học bổng Doanh nghiệp TQ',
      amount: '30–50% học phí',
      conditions: JSON.stringify(['Ngành kỹ thuật/kinh tế', 'GPA ≥ 3.0/4.0', 'Cam kết làm việc 2 năm']),
      popular: false,
      gradient: 'linear-gradient(135deg,#0891c4,#38bdf8)',
      order: 6,
    },
  ]

  for (const s of scholarships) {
    await db.scholarship.upsert({
      where: { id: s.name },
      update: s,
      create: { id: s.name, ...s },
    })
  }
  console.log(`✅ Seeded ${scholarships.length} scholarships`)

  // Site settings
  await db.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      heroTitle: 'Chinh phục giấc mơ du học Trung Quốc',
      heroSubtitle: 'NOVAPATH GLOBAL chuyên tư vấn du học Trung Quốc: chọn trường, làm hồ sơ, săn học bổng và đào tạo tiếng Trung — minh bạch, tận tâm, đúng lộ trình.',
      statVisa: 98,
      statSchools: 500,
      statYears: 12,
      phone: '1900 6868',
      email: 'tuvan@novapath.vn',
      facebook: '#',
      instagram: '#',
      youtube: '#',
    },
  })
  console.log('✅ Seeded site settings')

  // Testimonials
  const testimonials = [
    {
      name: 'Nguyễn Minh Châu',
      school: 'Đại học Phúc Đán, Thượng Hải',
      content: 'NOVAPATH hỗ trợ tôi từ A-Z: từ chọn trường, dịch hồ sơ đến xin học bổng CSC 100%. Giờ tôi đang học năm 2 tại Phúc Đán — ước mơ thành sự thật!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
      rating: 5,
      order: 1,
    },
    {
      name: 'Trần Hoàng Anh',
      school: 'Đại học Đồng Tế, Thượng Hải',
      content: 'Tôi lo ngại về rào cản ngôn ngữ, nhưng đội ngũ NOVAPATH tư vấn lộ trình tiếng Trung rất rõ ràng. Hiện tôi đã đạt HSK 4 và tự tin giao tiếp hàng ngày.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 5,
      order: 2,
    },
    {
      name: 'Lê Thị Thu Hà',
      school: 'Đại học Ngôn ngữ Bắc Kinh',
      content: 'Chi phí du học tôi tiết kiệm được hơn 60% nhờ học bổng mà NOVAPATH giúp tìm kiếm. Quy trình nộp hồ sơ nhanh, minh bạch, không phát sinh chi phí ẩn.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      rating: 5,
      order: 3,
    },
  ]

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i]
    await db.testimonial.upsert({
      where: { id: `testimonial-${i + 1}` },
      update: t,
      create: { id: `testimonial-${i + 1}`, ...t },
    })
  }
  console.log(`✅ Seeded ${testimonials.length} testimonials`)

  // Team members
  const team = [
    {
      name: 'Nguyễn Văn Hùng',
      role: 'CEO & Founder — 12 năm kinh nghiệm du học Trung Quốc',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      order: 1,
    },
    {
      name: 'Trần Thị Mai Linh',
      role: 'Trưởng phòng Tư vấn — Cựu sinh viên ĐH Bắc Kinh',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
      order: 2,
    },
    {
      name: 'Phạm Quốc Bảo',
      role: 'Chuyên gia Học bổng — Thạc sĩ ĐH Phúc Đán',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      order: 3,
    },
    {
      name: 'Lê Thanh Hương',
      role: 'Giảng viên Tiếng Trung — HSK 6, 8 năm giảng dạy',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      order: 4,
    },
  ]

  for (let i = 0; i < team.length; i++) {
    const m = team[i]
    await db.teamMember.upsert({
      where: { id: `team-${i + 1}` },
      update: m,
      create: { id: `team-${i + 1}`, ...m },
    })
  }
  console.log(`✅ Seeded ${team.length} team members`)

  console.log('\n🎉 Seed hoàn thành!')
  console.log('   Login: admin@novapath.vn')
  console.log('   Password: novapath2026')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())
