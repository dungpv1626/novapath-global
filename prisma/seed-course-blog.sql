-- Seed Course và BlogPost vào Supabase
-- Chạy trong Supabase SQL Editor: https://supabase.com/dashboard/project/djzeaoctqoilautqdjzw/sql/new

-- ===================== COURSE =====================
DELETE FROM "Course";

INSERT INTO "Course" ("id","slug","title","level","duration","price","schedule","image","tag","rating","students","tab","order","createdAt","updatedAt") VALUES
('course-1','tieng-trung-co-ban-hsk1-2','Tiếng Trung Cơ Bản HSK 1–2','Sơ cấp','3 tháng','3.500.000','Tối 2–4–6 (19:00–21:00)','','Phổ biến',4.9,'1.240 học viên','co-ban',1,NOW(),NOW()),
('course-2','tieng-trung-trung-cap-hsk3-4','Tiếng Trung Trung Cấp HSK 3–4','Trung cấp','4 tháng','4.200.000','Tối 3–5–7 (19:00–21:00)','','Bán chạy',4.9,'860 học viên','co-ban',2,NOW(),NOW()),
('course-3','tieng-trung-nang-cao-hsk5-6','Tiếng Trung Nâng Cao HSK 5–6','Cao cấp','5 tháng','5.500.000','Tối 2–4–6 (19:00–21:00)','','Chuyên sâu',5.0,'420 học viên','nang-cao',3,NOW(),NOW()),
('course-4','giao-tiep-thuong-mai','Tiếng Trung Giao Tiếp Thương Mại','Trung – Cao cấp','2 tháng','3.800.000','Cuối tuần (08:00–11:00)','','Mới',4.8,'310 học viên','nang-cao',4,NOW(),NOW()),
('course-5','luyen-thi-hsk-4','Luyện Thi HSK 4 Cấp Tốc','Trung cấp','6 tuần','2.900.000','Tối 2–4–6 (19:30–21:30)','','Cấp tốc',4.9,'670 học viên','luyen-thi',5,NOW(),NOW()),
('course-6','luyen-thi-hsk-5-6','Luyện Thi HSK 5–6 Chuyên Sâu','Cao cấp','8 tuần','3.600.000','Tối 3–5–7 (19:30–21:30)','','Hot',5.0,'290 học viên','luyen-thi',6,NOW(),NOW());

-- ===================== BLOGPOST =====================
DELETE FROM "BlogPost";

INSERT INTO "BlogPost" ("id","slug","title","excerpt","content","category","author","authorRole","coverImage","readTime","published","publishedAt","createdAt","updatedAt") VALUES
(
  'blog-1',
  'kinh-nghiem-xin-visa-du-hoc-trung-quoc-2026',
  'Kinh nghiệm xin visa du học Trung Quốc 2026 — từ A đến Z',
  'Hướng dẫn chi tiết quy trình xin visa X1 du học Trung Quốc năm 2026: hồ sơ cần chuẩn bị, thời gian xử lý, những lỗi thường gặp và cách tránh.',
  '## Visa X1 là gì?

Visa X1 là loại visa dành cho du học sinh học tập tại Trung Quốc từ 6 tháng trở lên. Đây là visa bắt buộc nếu bạn theo học các chương trình đại học, thạc sĩ hoặc tiến sĩ.

## Hồ sơ cần chuẩn bị

1. **JW202** — Thư nhận học (do trường cấp, gửi qua bưu điện hoặc email)
2. **Hộ chiếu** còn hạn ít nhất 6 tháng
3. **Ảnh thẻ** nền trắng, 2 tấm 3x4cm
4. **Đơn xin visa** điền online tại csis.mps.gov.cn
5. **Giấy khám sức khỏe** (mẫu theo quy định của Trung Quốc)
6. **Bảng điểm + Bằng tốt nghiệp** bản gốc có công chứng

## Quy trình nộp hồ sơ

Nộp tại Lãnh sự quán Trung Quốc hoặc Trung tâm dịch vụ visa tại Hà Nội / TP.HCM. Thời gian xử lý thông thường: 4–5 ngày làm việc. Dịch vụ khẩn: 2–3 ngày (phụ phí).

## Những lỗi thường gặp

- Ảnh không đúng quy chuẩn (nền màu, khuôn mặt không đủ ánh sáng)
- Hộ chiếu sắp hết hạn dưới 6 tháng
- Thiếu chữ ký trên đơn xin visa
- JW202 chưa có dấu đỏ của Bộ Giáo dục Trung Quốc

## Tips từ NOVAPATH

Nộp hồ sơ sớm ít nhất 3 tuần trước ngày nhập học. NOVAPATH hỗ trợ kiểm tra hồ sơ miễn phí trước khi nộp — liên hệ để được tư vấn.',
  'Kinh nghiệm',
  'Nguyễn Minh Tuấn',
  'Chuyên viên tư vấn du học',
  '',
  '6 phút đọc',
  TRUE,
  '2026-06-01 08:00:00+00',
  NOW(),
  NOW()
),
(
  'blog-2',
  'hoc-bong-chinh-phu-trung-quoc-csc-2026',
  'Học bổng Chính phủ Trung Quốc (CSC) 2026 — Cơ hội vàng cho sinh viên Việt',
  'Học bổng CSC tài trợ 100% học phí, ký túc xá và sinh hoạt phí. Tìm hiểu điều kiện, hạn nộp và bí kíp để hồ sơ nổi bật.',
  '## Học bổng CSC là gì?

Chinese Government Scholarship (CSC) do Bộ Giáo dục Trung Quốc cấp — một trong những học bổng toàn phần uy tín nhất châu Á. Mỗi năm có hàng nghìn suất dành cho sinh viên quốc tế.

## Mức hỗ trợ

| Bậc học | Học phí | Ký túc xá | Sinh hoạt phí/tháng |
|---------|---------|-----------|----------------------|
| Đại học | Miễn phí | Miễn phí | 2.500 CNY |
| Thạc sĩ | Miễn phí | Miễn phí | 3.000 CNY |
| Tiến sĩ | Miễn phí | Miễn phí | 3.500 CNY |

## Điều kiện

- Sức khỏe tốt, không có tiền án tiền sự
- GPA từ 7.5/10 trở lên (đại học) hoặc 8.0/10 (thạc sĩ)
- Trình độ tiếng Trung: HSK 4 trở lên (hoặc chương trình học bằng tiếng Anh)
- Không giữ quốc tịch Trung Quốc và chưa từng có học bổng CSC trong 3 năm gần đây

## Hạn nộp hồ sơ

Thường vào **tháng 3–4 hàng năm**. Kết quả công bố tháng 6–7.

## Bí kíp để hồ sơ nổi bật

1. **Statement of Purpose** — viết cụ thể, kết nối mục tiêu nghiên cứu với lý do chọn Trung Quốc
2. **Thư giới thiệu** từ giáo sư có tiếng trong lĩnh vực của bạn
3. **Liên hệ professor** trước khi nộp — một email ngắn giới thiệu đề tài có thể tạo lợi thế lớn
4. **Chứng chỉ bổ sung**: HSK, IELTS, giải thưởng học thuật',
  'Học bổng',
  'Trần Thị Lan Anh',
  'Chuyên gia học bổng quốc tế',
  '',
  '8 phút đọc',
  TRUE,
  '2026-05-15 08:00:00+00',
  NOW(),
  NOW()
),
(
  'blog-3',
  'chi-phi-du-hoc-trung-quoc-2026',
  'Chi phí du học Trung Quốc 2026 — Bảng tổng hợp chi tiết nhất',
  'Học phí, sinh hoạt phí, nhà ở, vé máy bay và các khoản phát sinh khác. Tổng chi phí thực tế là bao nhiêu?',
  '## Tổng quan chi phí

Du học Trung Quốc hiện là một trong những lựa chọn tiết kiệm nhất trong số các nước phát triển. Chi phí trung bình mỗi năm dao động từ **80–200 triệu VNĐ** tùy trường và thành phố.

## Học phí

| Ngành | Mức học phí/năm |
|-------|----------------|
| Khoa học xã hội, Kinh tế | 15.000–25.000 CNY |
| Kỹ thuật, Công nghệ | 20.000–30.000 CNY |
| Y khoa, Dược | 30.000–45.000 CNY |
| Nghệ thuật, Thiết kế | 25.000–35.000 CNY |

## Chi phí sinh hoạt

- **Hà Nội / TP.HCM tương đương**: Bắc Kinh, Thượng Hải (đắt hơn ~20%)
- **Trung bình**: 3.000–5.000 CNY/tháng (ăn uống + đi lại + giải trí)
- **Ký túc xá trường**: 400–1.200 CNY/tháng (chia phòng đôi)
- **Thuê ngoài**: 1.500–3.500 CNY/tháng (1 phòng)

## Chi phí một lần

| Khoản | Ước tính |
|-------|----------|
| Vé máy bay khứ hồi | 5–10 triệu VNĐ |
| Khám sức khỏe + visa | 3–5 triệu VNĐ |
| Phí nhập học | 500–1.500 CNY |
| Mua sắm ban đầu | 3–6 triệu VNĐ |

## Nguồn tài chính có thể xin

1. Học bổng Chính phủ Trung Quốc (CSC) — toàn phần
2. Học bổng Đại sứ quán — 50–100% học phí
3. Học bổng của từng trường — giảm 30–50% học phí
4. Học bổng tỉnh thành — thêm 1.000 CNY/tháng sinh hoạt phí

NOVAPATH hỗ trợ tư vấn và làm hồ sơ học bổng miễn phí cho học sinh đăng ký qua văn phòng.',
  'Cẩm nang',
  'Phạm Văn Đức',
  'Tư vấn viên cấp cao',
  '',
  '7 phút đọc',
  TRUE,
  '2026-05-01 08:00:00+00',
  NOW(),
  NOW()
),
(
  'blog-4',
  'top-truong-dai-hoc-bac-kinh-2026',
  'Top 5 trường đại học Bắc Kinh đáng học nhất năm 2026',
  'Bắc Kinh là trung tâm giáo dục hàng đầu Trung Quốc. Cùng NOVAPATH điểm qua 5 trường danh tiếng nhất và lý do nên cân nhắc.',
  '## Tại sao chọn Bắc Kinh?

Bắc Kinh là thủ đô và cũng là trung tâm học thuật số một Trung Quốc — nơi tập trung 92 trường đại học, trong đó có nhiều trường top QS World Rankings.

## 1. Đại học Bắc Kinh (PKU) — 北京大学

Xếp hạng QS 2026: **#14 thế giới**. Mạnh về: Nhân văn, Luật, Kinh tế, Khoa học tự nhiên. Học phí: 25.000–30.000 CNY/năm.

## 2. Đại học Thanh Hoa (THU) — 清华大学

Xếp hạng QS 2026: **#20 thế giới**. Mạnh về: Kỹ thuật, Công nghệ, Kiến trúc, Quản trị kinh doanh. Học phí: 26.000–35.000 CNY/năm.

## 3. Đại học Nhân Dân (RUC) — 中国人民大学

Top 3 Trung Quốc về Kinh tế, Luật, Khoa học xã hội. Học phí: 22.000–28.000 CNY/năm. Nhiều học bổng dành riêng cho sinh viên Việt Nam.

## 4. Đại học Ngôn ngữ Bắc Kinh (BLCU) — 北京语言大学

Trường tốt nhất để học tiếng Trung — 70% sinh viên là người nước ngoài. Môi trường quốc tế, thầy cô nhiều kinh nghiệm dạy người học tiếng Hán như ngôn ngữ thứ hai.

## 5. Đại học Bưu chính Viễn thông Bắc Kinh (BUPT) — 北京邮电大学

Mạnh về Công nghệ thông tin, Viễn thông, AI. Học phí hợp lý: 20.000–25.000 CNY/năm. Nhiều cơ hội thực tập tại các tập đoàn công nghệ lớn.

---

NOVAPATH có đối tác trực tiếp với cả 5 trường trên. Liên hệ để được tư vấn chọn trường phù hợp với ngành học và ngân sách của bạn.',
  'Trường đại học',
  'Nguyễn Minh Tuấn',
  'Chuyên viên tư vấn du học',
  '',
  '5 phút đọc',
  TRUE,
  '2026-04-20 08:00:00+00',
  NOW(),
  NOW()
),
(
  'blog-5',
  'cuoc-song-sinh-vien-tai-trung-quoc',
  'Cuộc sống sinh viên tại Trung Quốc — Những điều cần biết trước khi đi',
  'Ẩm thực, văn hóa, bạn bè quốc tế, đi lại và những thách thức thực tế khi sống tại Trung Quốc.',
  '## Ẩm thực

Trung Quốc có ẩm thực phong phú và giá rẻ. Một bữa cơm căng tin trường: 10–20 CNY. Ăn ngoài nhà hàng bình dân: 30–50 CNY/người. Nếu tự nấu, chi phí có thể giảm 30–40%.

**Lưu ý cho người Việt**: Đồ ăn Trung Quốc có thể mặn và nhiều dầu hơn. Cần thời gian để thích nghi.

## Đi lại

- **Tàu điện ngầm**: rất phát triển ở các thành phố lớn, giá 2–10 CNY/lượt
- **Xe buýt**: 1–2 CNY/lượt
- **Didi** (tương tự Grab): tiện lợi, giá hợp lý
- **Xe đạp/scooter chia sẻ**: Hellobike, Meituan — dưới 1 CNY/30 phút

## Kết nối mạng

Nhiều mạng xã hội phổ biến ở Việt Nam bị chặn tại Trung Quốc (Facebook, YouTube, Google, Instagram). Cần dùng **VPN** để truy cập — tải trước khi vào Trung Quốc vì cũng không tải được khi đang ở trong nước.

Ứng dụng thay thế phổ biến: WeChat (nhắn tin), Weibo (mạng xã hội), Baidu (tìm kiếm), Taobao/JD (mua sắm).

## Cộng đồng người Việt

Tại các thành phố lớn (Bắc Kinh, Thượng Hải, Quảng Châu), có cộng đồng sinh viên Việt Nam khá đông — tổ chức nhiều hoạt động giao lưu, giúp đỡ nhau khi mới sang.

## Thách thức thường gặp

1. **Rào cản ngôn ngữ**: Dù học tiếng Trung nhưng accent địa phương khác nhau rất nhiều
2. **Nhớ nhà**: Đặc biệt với sinh viên năm nhất, tháng đầu tiên thường khó khăn nhất
3. **Hệ thống thanh toán**: Alipay và WeChat Pay gần như bắt buộc — cần tài khoản ngân hàng Trung Quốc
4. **Thời tiết**: Bắc Kinh mùa đông rất lạnh (-10°C), mùa hè nóng ẩm',
  'Kinh nghiệm',
  'Lê Thị Hoa',
  'Cựu du học sinh tại Đại học Bắc Kinh',
  '',
  '9 phút đọc',
  TRUE,
  '2026-04-05 08:00:00+00',
  NOW(),
  NOW()
);
