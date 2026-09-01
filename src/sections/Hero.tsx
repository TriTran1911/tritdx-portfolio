import { useEffect, useRef } from 'react'
import { gsap, SplitText, motionSafe } from '../lib/motion.ts'
import { CONTACT } from '../lib/data.ts'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const name = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = name.current
    if (!el) return

    return motionSafe(() => {
      // Tách theo ký tự chỉ dành cho tiêu đề ngắn — tách cả đoạn văn là tạo ra
      // hàng nghìn thẻ và làm hỏng trình đọc màn hình.
      const split = new SplitText(el, { type: 'chars' })
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from(split.chars, {
        opacity: 0, yPercent: 110, rotateX: -55,
        duration: 0.8, stagger: 0.018,
      })
        .from('[data-hero-line]', { opacity: 0, y: 16, duration: 0.6, stagger: 0.09 }, '-=0.45')
        .from('[data-hero-meta]', { opacity: 0, duration: 0.5 }, '-=0.3')
        .from('[data-hero-rule]', { scaleX: 0, duration: 0.9, ease: 'expo.inOut' }, '-=0.6')

      return () => { split.revert(); tl.kill() }
    })
  }, [])

  return (
    <header ref={root} className="relative flex min-h-[92svh] flex-col justify-end px-6 pb-16 pt-28 md:px-12">
      <p data-hero-meta className="eyebrow mb-6">
        {CONTACT.city} — available for frontend &amp; mobile work
      </p>

      <h1 ref={name}
          className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.86] tracking-[-0.02em]">
        Tri Tran
      </h1>

      <div data-hero-rule className="my-8 h-px origin-left bg-hairline" />

      <div className="max-w-[62ch] space-y-4">
        <p data-hero-line className="text-xl leading-snug md:text-2xl">
          I build the apps people actually pay with — metro fares, insurance points,
          mall loyalty — in <span className="text-brass">Flutter</span> and{' '}
          <span className="text-brass">React Native</span>.
        </p>
        <p data-hero-line className="text-muted">
          And when the work gets slow, I build the tool that makes it fast. Most of what
          follows is production code for real customers; the last two are mine.
        </p>
      </div>

      <a data-hero-meta href="#work"
         className="mt-12 inline-flex w-fit items-center gap-2 font-mono text-xs text-faint
                    transition-colors duration-200 hover:text-bone">
        <span className="h-px w-8 bg-current" />
        scroll
      </a>
    </header>
  )
}
