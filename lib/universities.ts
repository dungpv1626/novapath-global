export interface University {
  slug: string
  name: string
  nameChinese: string
  city: string
  rank: string
  ranking: number
  programs: string[]
  tuition: string
  scholarship: boolean
  img: string
  description: string
}

export const universities: University[] = [
  {
    slug: 'dai-hoc-thanh-hoa',
    name: 'Đại học Thanh Hoa',
    nameChinese: '清华大学',
    city: 'Bắc Kinh',
    rank: 'Top 1',
    ranking: 1,
    programs: ['Kỹ thuật', 'Công nghệ thông tin', 'Kiến trúc', 'Kinh tế'],
    tuition: '26.000 – 40.000 NDT/năm',
    scholarship: true,
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
    description: 'Đại học Thanh Hoa là trường đại học kỹ thuật hàng đầu Trung Quốc và châu Á, luôn xếp hạng top 25 thế giới.',
  },
  {
    slug: 'dai-hoc-bac-kinh',
    name: 'Đại học Bắc Kinh',
    nameChinese: '北京大学',
    city: 'Bắc Kinh',
    rank: 'Top 2',
    ranking: 2,
    programs: ['Khoa học tự nhiên', 'Kinh tế', 'Luật', 'Nghệ thuật'],
    tuition: '22.000 – 38.000 NDT/năm',
    scholarship: true,
    img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80',
    description: 'Đại học Bắc Kinh là trường đại học nghiên cứu hàng đầu Trung Quốc, nổi tiếng về khoa học xã hội và nhân văn.',
  },
  {
    slug: 'dai-hoc-phuc-dan',
    name: 'Đại học Phúc Đán',
    nameChinese: '复旦大学',
    city: 'Thượng Hải',
    rank: 'Top 3',
    ranking: 3,
    programs: ['Kinh tế', 'Quản trị kinh doanh', 'Y khoa', 'Báo chí'],
    tuition: '20.000 – 35.000 NDT/năm',
    scholarship: true,
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    description: 'Đại học Phúc Đán tại Thượng Hải là một trong những trường nghiên cứu uy tín nhất Trung Quốc.',
  },
  {
    slug: 'dai-hoc-chiet-giang',
    name: 'Đại học Chiết Giang',
    nameChinese: '浙江大学',
    city: 'Hàng Châu',
    rank: 'Top 4',
    ranking: 4,
    programs: ['Kỹ thuật', 'Y khoa', 'Nông nghiệp', 'Kinh tế'],
    tuition: '18.000 – 32.000 NDT/năm',
    scholarship: true,
    img: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80',
    description: 'Đại học Chiết Giang tại Hàng Châu là một trong những trường đại học tổng hợp hàng đầu Trung Quốc.',
  },
  {
    slug: 'dai-hoc-dong-te',
    name: 'Đại học Đồng Tế',
    nameChinese: '同济大学',
    city: 'Thượng Hải',
    rank: 'Top 8',
    ranking: 8,
    programs: ['Kiến trúc', 'Xây dựng', 'Kỹ thuật môi trường', 'Cơ khí'],
    tuition: '18.000 – 28.000 NDT/năm',
    scholarship: true,
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b6f5d?w=600&q=80',
    description: 'ĐH Đồng Tế nổi tiếng về Kiến trúc và Kỹ thuật xây dựng, xếp top đầu thế giới về ngành này.',
  },
  {
    slug: 'dai-hoc-nam-kinh',
    name: 'Đại học Nam Kinh',
    nameChinese: '南京大学',
    city: 'Nam Kinh',
    rank: 'Top 6',
    ranking: 6,
    programs: ['Vật lý', 'Hóa học', 'Thiên văn học', 'Khoa học Trái đất'],
    tuition: '16.000 – 28.000 NDT/năm',
    scholarship: true,
    img: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=600&q=80',
    description: 'Đại học Nam Kinh là trường nghiên cứu hàng đầu về khoa học tự nhiên và lý thuyết.',
  },
  {
    slug: 'dai-hoc-vu-han',
    name: 'Đại học Vũ Hán',
    nameChinese: '武汉大学',
    city: 'Vũ Hán',
    rank: 'Top 13',
    ranking: 13,
    programs: ['Luật', 'Quản lý', 'Kỹ thuật thủy lợi', 'Nghệ thuật'],
    tuition: '15.000 – 25.000 NDT/năm',
    scholarship: true,
    img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80',
    description: 'ĐH Vũ Hán nổi tiếng với khuôn viên đẹp nhất Trung Quốc và hàng anh đào nở rộ mỗi tháng 3.',
  },
  {
    slug: 'dai-hoc-ngon-ngu-bac-kinh',
    name: 'Đại học Ngôn ngữ Bắc Kinh',
    nameChinese: '北京语言大学',
    city: 'Bắc Kinh',
    rank: 'Top chuyên ngành',
    ranking: 50,
    programs: ['Tiếng Trung', 'Ngôn ngữ học', 'Văn học', 'Giảng dạy Hán ngữ'],
    tuition: '15.000 – 22.000 NDT/năm',
    scholarship: true,
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
    description: 'BLCU là lựa chọn số 1 cho sinh viên muốn học tiếng Trung chuyên sâu — 70% sinh viên là người nước ngoài.',
  },
]

export function getUniversityBySlug(slug: string): University | undefined {
  return universities.find((u) => u.slug === slug)
}
