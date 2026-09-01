import { useEffect, useRef, useState } from 'react'
import { motionSafe, revealChildren } from '../lib/motion.ts'
import { WORK, type Project } from '../lib/data.ts'

export function Work() {
  const list = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = list.current
    if (!el) return
    return motionSafe(() => { revealChildren(el, 0.06) })
  }, [])

  return (
    <section id="work" className="px-6 py-24 md:px-12">
      <SectionHead num="01" title="Production work" note="Utop · 2023 — 2026" />
      <div ref={list} className="hairline-t">
        {WORK.map(p => <Row key={p.name} p={p} />)}
      </div>
    </section>
  )
}

export function SectionHead({ num, title, note }: { num: string; title: string; note?: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none">
        <span className="eyebrow mr-4 align-super">{num}</span>
        {title}
      </h2>
      {note && <p className="eyebrow">{note}</p>}
    </div>
  )
}

/* Mỗi dự án là một hàng mở được. Danh sách đóng cho phép quét nhanh toàn bộ;
   mở ra mới đọc chi tiết — nhà tuyển dụng thường chỉ quét. */
function Row({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="group border-b border-hairline">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open}
              className="flex w-full cursor-pointer flex-col gap-1 py-6 text-left
                         transition-colors duration-300 md:flex-row md:items-baseline md:gap-8">
        <span className="font-display w-full text-2xl leading-tight transition-transform
                         duration-300 group-hover:translate-x-1 md:w-[38%] md:text-3xl">
          {p.name}
        </span>
        <span className="text-muted flex-1 text-sm">{p.kind}</span>
        <span className="eyebrow shrink-0">
          {open ? '— close' : '+ open'}
        </span>
      </button>

      {/* Không animate height: dùng grid-template-rows 0fr→1fr, mượt mà không
          buộc trình duyệt tính lại layout mỗi frame. */}
      <div className="grid transition-[grid-template-rows] duration-500 ease-out"
           style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="grid gap-6 pb-8 md:grid-cols-[38%_1fr] md:gap-8">
            <p className="text-muted text-sm leading-relaxed">{p.summary}</p>
            <div>
              {/* Dự án gồm nhiều app thì liệt kê ra — gộp một dòng là nói sai
                  quy mô, mà đây đúng là chỗ quy mô có ý nghĩa. */}
              {p.parts && (
                <ul className="mb-5 space-y-3">
                  {p.parts.map(part => (
                    <li key={part.name} className="border-l border-hairline pl-4">
                      <p className="text-brass font-mono text-2xs">{part.name}</p>
                      <p className="text-muted mt-0.5 text-sm leading-relaxed">{part.note}</p>
                    </li>
                  ))}
                </ul>
              )}
              <ul className="space-y-1.5 text-sm">
                {p.did.map(d => (
                  <li key={d} className="flex gap-3">
                    <span className="text-brass mt-2 h-px w-3 shrink-0 bg-current" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-2xs">
                {p.stack.map(s => <span key={s} className="text-faint">{s}</span>)}
                {p.scale && <span className="text-brass tnum">{p.scale}</span>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
