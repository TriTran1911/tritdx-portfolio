import { useEffect, useRef } from 'react'
import { motionSafe, revealChildren } from '../lib/motion.ts'
import { CONTACT, EDUCATION, ROLES, SKILLS } from '../lib/data.ts'
import { SectionHead } from './Work.tsx'

function useReveal<T extends HTMLElement>(stagger = 0.08) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return motionSafe(() => { revealChildren(el, stagger) })
  }, [stagger])
  return ref
}

export function Craft() {
  const grid = useReveal<HTMLDivElement>(0.06)
  return (
    <section className="px-6 py-24 md:px-12">
      <SectionHead num="04" title="Craft" />
      <div ref={grid} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map(g => (
          <div key={g.group} className="hairline-t pt-4">
            <p className="eyebrow mb-3">{g.group}</p>
            <ul className="space-y-1.5 text-sm">
              {g.items.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Background() {
  const list = useReveal<HTMLDivElement>()
  return (
    <section className="px-6 py-24 md:px-12">
      <SectionHead num="05" title="Background" />
      <div ref={list} className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-5">Experience</p>
          {ROLES.map(r => (
            <div key={r.company} className="hairline-t py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl leading-none">{r.company}</h3>
                <p className="tnum font-mono text-2xs text-faint">{r.from} — {r.to}</p>
              </div>
              <p className="text-brass mt-1 text-sm">{r.title} · {r.place}</p>
              <p className="text-muted mt-2 max-w-[54ch] text-sm leading-relaxed">{r.note}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="eyebrow mb-5">Education</p>
          {EDUCATION.map(e => (
            <div key={e.school} className="hairline-t py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl leading-tight">{e.school}</h3>
                <p className="tnum font-mono text-2xs text-faint">{e.years}</p>
              </div>
              <p className="text-muted mt-1 max-w-[54ch] text-sm">{e.detail}</p>
              <p className="text-faint mt-1 font-mono text-2xs">{e.place}</p>
            </div>
          ))}
          <div className="hairline-t py-5">
            <p className="eyebrow mb-2">Languages</p>
            <p className="text-sm">{CONTACT.languages}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const box = useReveal<HTMLDivElement>(0.1)
  return (
    <section id="contact" className="px-6 pb-24 pt-24 md:px-12">
      <div ref={box}>
        <p className="eyebrow mb-6">06 — get in touch</p>
        <h2 className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.9]">
          Let’s build<br />something.
        </h2>
        <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
          <Link label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
          <Link label="GitHub" value={CONTACT.github} href={`https://${CONTACT.github}`} />
          <Link label="Phone" value={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} />
          <div>
            <p className="eyebrow mb-1">Based in</p>
            <p className="text-lg">{CONTACT.city}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Link({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <p className="eyebrow mb-1">{label}</p>
      <a href={href}
         className="group relative inline-block text-lg transition-colors duration-200 hover:text-brass">
        {value}
        {/* Gạch chân chạy ra từ bên trái khi hover — animate scaleX chứ không
            animate width, để không buộc tính lại layout. */}
        <span aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brass
                         transition-transform duration-300 group-hover:scale-x-100" />
      </a>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="hairline-t mx-6 flex flex-wrap items-center justify-between gap-4 py-8 font-mono text-2xs text-faint md:mx-12">
      <p>Tri Tran Dao Xuan — built with React, GSAP and no template.</p>
      <p className="tnum">© {new Date().getFullYear()}</p>
    </footer>
  )
}
