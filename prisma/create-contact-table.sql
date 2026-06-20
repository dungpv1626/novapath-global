-- Tạo bảng ContactSubmission trong Supabase
-- Chạy trong Supabase SQL Editor: https://supabase.com/dashboard/project/djzeaoctqoilautqdjzw/sql/new

CREATE TABLE IF NOT EXISTS "ContactSubmission" (
  "id"        TEXT PRIMARY KEY,
  "name"      TEXT NOT NULL,
  "phone"     TEXT NOT NULL,
  "email"     TEXT NOT NULL,
  "program"   TEXT,
  "message"   TEXT,
  "read"      BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE "ContactSubmission" DISABLE ROW LEVEL SECURITY;
