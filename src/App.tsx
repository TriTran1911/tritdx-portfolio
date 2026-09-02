import { useEffect } from 'react'
import { ScrollTrigger } from './lib/motion.ts'
import { Hero } from './sections/Hero.tsx'
import { Work } from './sections/Work.tsx'
import { Flow } from './sections/Flow.tsx'
import { Builds } from './sections/Builds.tsx'
import { Background, Contact, Craft, Footer } from './sections/Rest.tsx'

export function App() {
  useEffect(() => {
    // Font web tải xong là chiều cao text đổi, mọi mốc ScrollTrigger lệch theo.
    // Đo lại một lần sau khi font sẵn sàng thay vì đoán bằng setTimeout.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <div className="grain" aria-hidden />
      {/* Chỉ hiện khi được focus bằng bàn phím — không chiếm chỗ khi dùng chuột. */}
      <a href="#work"
         className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                    focus:rounded-sm focus:bg-brass focus:px-3 focus:py-2 focus:font-mono
                    focus:text-sm focus:text-ground">
        Skip to work
      </a>
      <main id="main" className="mx-auto max-w-[1400px]">
        <Hero />
        <Work />
        <Flow />
        <Builds />
        <Craft />
        <Background />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
