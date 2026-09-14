import { useState } from 'react'
import { ABOUT, CONTACT, FOCUS } from '../lib/data.ts'

/* Cột trái dính cố định: danh tính và đường liên hệ luôn nằm trong tầm mắt,
   người xem không phải cuộn ngược lên đầu để tìm cách liên lạc.
   Dưới lg thì nó xếp thành một khối thường ở đầu trang — cột dính trên màn
   hình cao chưa tới 700px sẽ ăn hết chỗ đọc. */
export function Sidebar() {
  return (
    <aside className="border-hairline lg:sticky lg:top-0 lg:h-svh lg:self-start lg:border-r">
      <div className="lg:flex lg:h-full lg:flex-col lg:overflow-y-auto
                      px-6 pb-10 pt-10 md:px-10 lg:px-8 lg:pb-8">
        <Identity />

        <nav className="mt-8" aria-label="Sections">
          <ul className="space-y-0.5">
            <NavLink href="#work" n="01" label="Production work" />
            <NavLink href="#builds" n="03" label="Things I built" />
            <NavLink href="#background" n="05" label="Background" />
            <NavLink href="#contact" n="06" label="Get in touch" />
          </ul>
        </nav>

        <div className="hairline-t mt-8 pt-6">
          <p className="eyebrow mb-3">About</p>
          <p className="text-muted max-w-[46ch] text-sm leading-relaxed">{ABOUT}</p>
        </div>

        <div className="hairline-t mt-6 pt-6">
          <p className="eyebrow mb-3">Focus</p>
          <ul className="space-y-2">
            {FOCUS.map(f => (
              <li key={f} className="text-muted flex gap-2.5 text-sm leading-snug">
                <span aria-hidden className="bg-brass mt-2 h-px w-2.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-faint mt-auto hidden pt-8 font-mono text-2xs lg:block">
          {CONTACT.city}
        </p>
      </div>
    </aside>
  )
}

function Identity() {
  return (
    <div>
      <Portrait />
      <h1 className="font-display mt-5 text-3xl leading-none">Tri Tran</h1>
      <p className="text-brass mt-1.5 text-sm">Mobile &amp; Frontend Developer</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <IconLink href={`mailto:${CONTACT.email}`} label="Email">
          <path d="M2 4h12v8H2z" /><path d="m2 5 6 4 6-4" />
        </IconLink>
        <IconLink href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} label="Phone">
          <path d="M4 2.5 6 2l1.5 3L6 6.2c.6 1.7 2.1 3.2 3.8 3.8L11 8.5 14 10l-.5 2c-.2.8-1 1.3-1.8 1.1C7.2 12.2 3.8 8.8 2.9 4.3c-.2-.8.3-1.6 1.1-1.8Z" />
        </IconLink>
        <IconLink href={`https://${CONTACT.github}`} label="GitHub">
          <path d="M6.2 14v-2.2c-2.3.4-2.9-1.1-2.9-1.1-.4-1-1-1.3-1-1.3-.8-.5 0-.5 0-.5.9.1 1.4 1 1.4 1 .8 1.3 2 .9 2.5.7.1-.6.3-1 .6-1.2-2-.2-4-1-4-4.2 0-.9.3-1.6.8-2.2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7 7 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.2 0 3.2-2 4-4 4.2.3.3.6.8.6 1.6V14" />
        </IconLink>
        <IconLink href={`https://${CONTACT.linkedin}`} label="LinkedIn">
          <path d="M3 6v8M3 3.2v.1M7 14V6M7 9.5c0-2 4-2 4 0V14" />
        </IconLink>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a href="#contact"
           className="bg-brass text-ground rounded-sm px-3.5 py-2 font-mono text-2xs
                      transition-opacity duration-200 hover:opacity-85">
          Get in touch
        </a>
        <a href={CONTACT.cv} download
           className="border-hairline text-muted rounded-sm border px-3.5 py-2 font-mono text-2xs
                      transition-colors duration-200 hover:border-brass hover:text-bone">
          Download CV
        </a>
      </div>
    </div>
  )
}

/* Ảnh chân dung là tuỳ chọn: chưa có file thì hiện chữ tắt, không vỡ bố cục
   và không để lại ô ảnh hỏng. */
function Portrait() {
  const [ok, setOk] = useState(true)
  return (
    <div className="border-hairline ring-brass/25 h-20 w-20 overflow-hidden rounded-full
                    border ring-1 ring-offset-2 ring-offset-ground">
      {ok ? (
        <img src="/portrait.jpg" alt="Tri Tran" width={80} height={80}
             className="h-full w-full object-cover" onError={() => setOk(false)} />
      ) : (
        <div className="bg-surface font-display text-muted flex h-full w-full items-center
                        justify-center text-2xl leading-none">
          TT
        </div>
      )}
    </div>
  )
}

function NavLink({ href, n, label }: { href: string; n: string; label: string }) {
  return (
    <li>
      <a href={href}
         className="text-muted group flex items-baseline gap-3 py-1.5 text-sm
                    transition-colors duration-200 hover:text-bone">
        <span className="eyebrow group-hover:text-brass transition-colors duration-200">{n}</span>
        {label}
      </a>
    </li>
  )
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} title={label}
       target={href.startsWith('http') ? '_blank' : undefined}
       rel={href.startsWith('http') ? 'noreferrer' : undefined}
       className="border-hairline text-faint flex h-9 w-9 items-center justify-center rounded-sm
                  border transition-colors duration-200 hover:border-brass hover:text-brass">
      <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor"
           strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
    </a>
  )
}
