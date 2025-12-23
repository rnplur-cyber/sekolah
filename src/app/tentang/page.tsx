
import { AppLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Eye, Target, School } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-slate-800">Sekolah Ceria</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
             <Link href="/" className="hover:text-primary" prefetch={false}>
              Beranda
            </Link>
             <Link href="/akademik" className="hover:text-primary" prefetch={false}>
              Akademik
            </Link>
             <Link href="/berita" className="hover:text-primary" prefetch={false}>
              Berita
            </Link>
             <Link href="/kontak" className="hover:text-primary" prefetch={false}>
              Kontak
            </Link>
          </nav>
          <Button asChild className="font-bold">
            <Link href="/pendaftaran">Pendaftaran</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 bg-amber-50/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Tentang Sekolah Ceria</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Mengenal lebih dekat visi, misi, dan sejarah perjalanan kami dalam mencerdaskan anak bangsa dengan gembira.
            </p>
          </div>
        </section>
        
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <Image
                        src="https://picsum.photos/seed/school-building/600/400"
                        alt="Gedung Sekolah Ceria"
                        width={600}
                        height={400}
                        className="rounded-xl shadow-lg"
                        data-ai-hint="modern school building"
                     />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">Sejarah Singkat</h2>
                    <p className="mt-4 text-muted-foreground">
                        Sekolah Ceria didirikan pada tahun 2010 dengan semangat untuk menciptakan lingkungan belajar yang menyenangkan, inovatif, dan berkarakter. Berawal dari sebuah bangunan sederhana dengan puluhan siswa, kami terus bertumbuh dan berkembang berkat kepercayaan dari masyarakat.
                    </p>
                    <p className="mt-4 text-muted-foreground">
                        Kini, kami bangga memiliki fasilitas modern dan ratusan siswa berprestasi yang siap menjadi pemimpin masa depan. Kami berkomitmen untuk terus berinovasi dalam pendidikan demi memberikan yang terbaik bagi putra-putri Indonesia.
                    </p>
                </div>
             </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-amber-50/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Eye className="h-6 w-6"/>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Visi Kami</h3>
                                <p className="mt-2 text-muted-foreground">Menjadi lembaga pendidikan terdepan yang menghasilkan generasi pembelajar sepanjang hayat yang kreatif, berkarakter mulia, dan siap menghadapi tantangan global.</p>
                            </div>
                        </div>
                     </div>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Target className="h-6 w-6"/>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Misi Kami</h3>
                                <ul className="mt-2 list-disc list-inside text-muted-foreground space-y-2">
                                    <li>Menyelenggarakan pendidikan berkualitas yang mengintegrasikan teknologi dan nilai-nilai Islami.</li>
                                    <li>Menciptakan lingkungan belajar yang aman, nyaman, dan merangsang kreativitas.</li>
                                    <li>Mengembangkan potensi setiap siswa secara holistik, meliputi aspek akademik, non-akademik, dan karakter.</li>
                                    <li>Membangun kemitraan yang kuat dengan orang tua dan masyarakat.</li>
                                </ul>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>
      </main>

       <footer className="bg-amber-50/50 text-muted-foreground py-6 border-t">
         <div className="container mx-auto text-center text-sm">
            &copy; 2024 Sekolah Ceria. Semua Hak Dilindungi.
        </div>
      </footer>
    </div>
  );
}

    