import { Mint } from "@/components/mint"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { PropagandaBackground } from "@/components/propaganda-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <PropagandaBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        <div className="my-12">
          <Mint />
        </div>
        <About />
        <Footer />
      </div>
    </main>
  )
}
