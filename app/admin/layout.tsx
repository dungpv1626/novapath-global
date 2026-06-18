import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import AdminSidebar from './AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin — NOVAPATH GLOBAL',
  robots: { index: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#f3f7fd] flex">
        <AdminSidebar />
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
