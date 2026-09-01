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
      <main className="mx-auto max-w-[1400px]">
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
