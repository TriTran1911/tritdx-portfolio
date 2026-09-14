import { useEffect, useRef } from 'react'
import { gsap, SplitText, motionSafe } from '../lib/motion.ts'
import { CONTACT } from '../lib/data.ts'

export function Hero() {
  const head = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = head.current
    if (!el) return

    return motionSafe(() => {
      // Tách theo ký tự chỉ dành cho tiêu đề ngắn — tách cả đoạn văn là tạo ra
      // hàng nghìn thẻ và làm hỏng trình đọc màn hình.
      // Phải tách cả 'words': chỉ tách 'chars' thì mỗi ký tự là một thẻ rời và
      // trình duyệt được phép xuống dòng giữa chữ — câu này đã ngắt thành
      // "peop / le" trên bản chạy thật.
      const split = new SplitText(el, { type: 'words,chars' })
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from(split.chars, {
        opacity: 0, yPercent: 110, rotateX: -55,
        duration: 0.8, stagger: 0.012,
      })
        .from('[data-hero-line]', { opacity: 0, y: 16, duration: 0.6, stagger: 0.09 }, '-=0.45')
        .from('[data-hero-rule]', { scaleX: 0, duration: 0.9, ease: 'expo.inOut' }, '-=0.6')

      return () => { split.revert(); tl.kill() }
    })
  }, [])

  // Căn giữa trong khung cao 86svh chỉ hợp khi hero là thứ đầu tiên trên màn
  // hình. Trên điện thoại nó nằm dưới khối danh tính, nên căn giữa chỉ tạo ra
  // một khoảng trống rồi đẩy tiêu đề xuống thấp hơn nữa.
  return (
    <header className="flex flex-col px-6 pb-16 pt-8 md:px-12
                       lg:min-h-[86svh] lg:justify-center lg:py-20">
      <p data-hero-line className="eyebrow mb-6">
        {CONTACT.city} — available for frontend &amp; mobile work
      </p>

      {/* Tên đã nằm ở cột trái rồi, nên đầu cột phải là câu tuyên bố chứ không
          lặp lại tên. Đây là chỗ khác lớn nhất so với bản một cột trước đây. */}
      <h1 ref={head}
          className="font-display max-w-[15ch] text-[clamp(2.5rem,6.5vw,5.5rem)]
                     leading-[0.95] tracking-[-0.02em]">
        I build the apps people actually pay with.
      </h1>

      <div data-hero-rule className="my-8 h-px max-w-[60ch] origin-left bg-hairline" />

      <div className="max-w-[62ch] space-y-4">
        <p data-hero-line className="text-xl leading-snug md:text-2xl">
          Metro fares, insurance points, mall loyalty — in{' '}
          <span className="text-brass">Flutter</span> and{' '}
          <span className="text-brass">React Native</span>.
        </p>
        <p data-hero-line className="text-muted">
          And when the work gets slow, I build the tool that makes it fast. Most of what
          follows is production code for real customers; the last two are mine.
        </p>
      </div>

      <a data-hero-line href="#work"
         className="text-faint mt-12 inline-flex w-fit items-center gap-2 font-mono text-xs
                    transition-colors duration-200 hover:text-bone">
        <span className="h-px w-8 bg-current" />
        scroll
      </a>
    </header>
  )
}
