export default function FormCard({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) {
  return (
    <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-8px_rgba(15,40,95,.10)] p-6 mb-5">
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#0a1b3d]">{title}</h2>
        {description && <p className="text-[13px] text-[#5b6b86] mt-1">{description}</p>}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-[family-name:var(--font-head)] font-medium text-[13px] text-[#0f1f3d]">{label}</label>
      {children}
      {hint && <p className="text-[12px] text-[#5b6b86]">{hint}</p>}
    </div>
  )
}

export const inputCls = "w-full border border-[#e3eaf5] rounded-[10px] px-4 py-2.5 text-[14px] font-[family-name:var(--font-body)] outline-none focus:border-[#1d5fe0] focus:ring-2 focus:ring-[#1d5fe0]/10 transition-all bg-white"
export const textareaCls = "w-full border border-[#e3eaf5] rounded-[10px] px-4 py-2.5 text-[14px] font-[family-name:var(--font-body)] outline-none focus:border-[#1d5fe0] focus:ring-2 focus:ring-[#1d5fe0]/10 transition-all resize-y min-h-[120px] bg-white"
