-- Thêm ảnh cho Course và BlogPost
-- Chạy trong Supabase SQL Editor sau khi đã chạy seed-course-blog.sql

-- Course images
UPDATE "Course" SET "image" = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80' WHERE "slug" = 'tieng-trung-co-ban-hsk1-2';
UPDATE "Course" SET "image" = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80' WHERE "slug" = 'tieng-trung-trung-cap-hsk3-4';
UPDATE "Course" SET "image" = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80' WHERE "slug" = 'tieng-trung-nang-cao-hsk5-6';
UPDATE "Course" SET "image" = 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80' WHERE "slug" = 'giao-tiep-thuong-mai';
UPDATE "Course" SET "image" = 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80' WHERE "slug" = 'luyen-thi-hsk-4';
UPDATE "Course" SET "image" = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80' WHERE "slug" = 'luyen-thi-hsk-5-6';

-- BlogPost cover images
UPDATE "BlogPost" SET "coverImage" = 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=1200&q=80' WHERE "slug" = 'kinh-nghiem-xin-visa-du-hoc-trung-quoc-2026';
UPDATE "BlogPost" SET "coverImage" = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80' WHERE "slug" = 'hoc-bong-chinh-phu-trung-quoc-csc-2026';
UPDATE "BlogPost" SET "coverImage" = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80' WHERE "slug" = 'chi-phi-du-hoc-trung-quoc-2026';
UPDATE "BlogPost" SET "coverImage" = 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1200&q=80' WHERE "slug" = 'top-truong-dai-hoc-bac-kinh-2026';
UPDATE "BlogPost" SET "coverImage" = 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80' WHERE "slug" = 'cuoc-song-sinh-vien-tai-trung-quoc';
