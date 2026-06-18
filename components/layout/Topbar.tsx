import { Mail, Phone } from 'lucide-react'

export default function Topbar() {
  return (
    <div className="bg-navy text-[#cdd9ef] text-[13.5px] hidden lg:block">
      <div className="max-w-[1220px] mx-auto px-[clamp(20px,5vw,56px)] flex justify-between items-center h-[42px] gap-5">
        <div className="flex items-center gap-[22px]">
          <span className="inline-flex items-center gap-[7px]">
            <Mail size={14} className="text-sky-brand" />
            tuvan@novapath.vn
          </span>
          <span className="inline-flex items-center gap-[7px]">
            <Phone size={14} className="text-sky-brand" />
            1900 6868
          </span>
        </div>
        <div className="flex items-center gap-[14px]">
          <span className="mr-[6px]">Theo dõi:</span>
          <a href="#" aria-label="Facebook" className="inline-flex text-[#cdd9ef] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="inline-flex text-[#cdd9ef] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[15px] h-[15px]">
              <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="inline-flex text-[#cdd9ef] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
              <path d="M23 12s0-3.5-.4-5.2a2.8 2.8 0 0 0-2-2C18.8 4.4 12 4.4 12 4.4s-6.8 0-8.6.4a2.8 2.8 0 0 0-2 2C1 8.5 1 12 1 12s0 3.5.4 5.2a2.8 2.8 0 0 0 2 2c1.8.4 8.6.4 8.6.4s6.8 0 8.6-.4a2.8 2.8 0 0 0 2-2C23 15.5 23 12 23 12zM10 15.5v-7l6 3.5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
