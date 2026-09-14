import { useEffect, useRef } from 'react'
import { motionSafe, revealSelf } from '../lib/motion.ts'
import { BUILDS, type Project } from '../lib/data.ts'
import { SectionHead } from './Work.tsx'

export function Builds() {
  return (
    <section id="builds" className="px-6 py-24 md:px-12">
      <SectionHead num="04" title="Things I built for myself" note="2026" />
      <p className="text-muted mb-12 max-w-[62ch] text-sm leading-relaxed">
        Client work shows what I can be asked to do. These show what I do when nobody
        asks — and they are where the harder engineering is.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {BUILDS.map(p => <Card key={p.name} p={p} />)}
      </div>
    </section>
  )
}

function Card({ p }: { p: Project }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return motionSafe(() => { revealSelf(el) })
  }, [])

  /* Con trỏ kéo theo một vùng sáng nhẹ. Chỉ dùng biến CSS chứ không animate
     background trực tiếp — trình duyệt không phải tính lại layout. */
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <article ref={ref} onMouseMove={onMove}
             className="group relative overflow-hidden rounded-lg border border-hairline
                        bg-surface p-6 transition-colors duration-300 hover:border-faint md:p-8">
      <span aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity
                       duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(340px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--color-brass) 8%, transparent), transparent 70%)',
            }} />

      <p className="eyebrow mb-3">{p.client}</p>
      <h3 className="font-display text-3xl leading-none md:text-4xl">{p.name}</h3>
      <p className="text-brass mt-2 font-mono text-2xs">{p.kind}</p>

      <p className="text-muted mt-5 text-sm leading-relaxed">{p.summary}</p>

      <ul className="mt-6 space-y-2 text-sm">
        {p.did.map(d => (
          <li key={d} className="flex gap-3">
            <span className="text-brass mt-2 h-px w-3 shrink-0 bg-current" />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <p className="hairline-t mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 font-mono text-2xs">
        {p.stack.map(s => <span key={s} className="text-faint">{s}</span>)}
      </p>
      {p.scale && <p className="text-brass tnum mt-2 font-mono text-2xs">{p.scale}</p>}
    </article>
  )
}
