
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppLogo } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Rocket, BookHeart, Smile } from "lucide-react";

const SunIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full text-yellow-300"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );

export default function SchoolPortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-slate-800">Sekolah Ceria</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="#fitur" className="hover:text-primary" prefetch={false}>
              Fitur
            </Link>
            <Link href="#galeri" className="hover:text-primary" prefetch={false}>
              Galeri
            </Link>
            <Link href="#testimoni" className="hover:text-primary" prefetch={false}>
              Testimoni
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Kontak
            </Link>
          </nav>
          <Button asChild className="font-bold">
            <Link href="/pendaftaran">Pendaftaran</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full bg-amber-50 overflow-hidden">
         <div className="container mx-auto px-4 md:px-6 h-[70vh] flex flex-col justify-center items-center text-center">
            <div className="absolute top-10 left-10 w-24 h-24 opacity-30 animate-pulse">
                <SunIcon />
            </div>
            <div className="absolute bottom-10 right-10 w-32 h-32 opacity-20 animate-pulse delay-500">
                <SunIcon />
            </div>
             <div className="relative z-10">
                <h1 className="text-4xl font-extrabold tracking-tighter md:text-6xl text-slate-900">
                Tempat Ceria untuk Belajar & Bertumbuh
                </h1>
                <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-600">
                Pendidikan menyenangkan yang menumbuhkan kreativitas dan karakter anak sejak dini.
                </p>
                <Button size="lg" className="mt-8 font-bold" asChild>
                <Link href="/pendaftaran">Daftar Sekarang!</Link>
                </Button>
            </div>
          </div>
        </section>

        <section id="fitur" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Kenapa Memilih Sekolah Ceria?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Kami menyediakan lingkungan belajar terbaik untuk potensi maksimal setiap anak.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Rocket className="h-10 w-10" />
                  </div>
                  <CardTitle className="mt-4 text-xl font-bold">Kurikulum Kreatif</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Belajar sambil bermain dengan kurikulum yang mendorong eksplorasi dan rasa ingin tahu.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookHeart className="h-10 w-10" />
                  </div>
                  <CardTitle className="mt-4 text-xl font-bold">Fasilitas Aman & Nyaman</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ruang kelas penuh warna, taman bermain luas, dan perpustakaan yang asyik.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                <CardHeader>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Smile className="h-10 w-10" />
                  </div>
                  <CardTitle className="mt-4 text-xl font-bold">Guru yang Ramah</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Guru-guru penyayang dan berpengalaman yang siap menjadi sahabat belajar anak Anda.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="galeri" className="bg-amber-50/50 py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Galeri Keceriaan</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Momen-momen tak terlupakan dari kegiatan belajar dan bermain kami.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Image
                data-ai-hint="kids playing"
                src="https://picsum.photos/seed/gallery1/400/300"
                alt="Galeri 1"
                width={400}
                height={300}
                className="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105 shadow-md hover:shadow-lg"
              />
              <Image
                data-ai-hint="classroom drawing"
                src="https://picsum.photos/seed/gallery2/400/300"
                alt="Galeri 2"
                width={400}
                height={300}
                className="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105 shadow-md hover:shadow-lg"
              />
              <Image
                data-ai-hint="school garden"
                src="https://picsum.photos/seed/gallery3/400/300"
                alt="Galeri 3"
                width={400}
                height={300}
                className="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105 shadow-md hover:shadow-lg"
              />
              <Image
                data-ai-hint="kids reading"
                src="https://picsum.photos/seed/gallery4/400/300"
                alt="Galeri 4"
                width={400}
                height={300}
                className="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105 shadow-md hover:shadow-lg"
              />
            </div>
          </div>
        </section>

        <section id="testimoni" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Apa Kata Ayah & Bunda?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Pengalaman nyata dari keluarga Sekolah Ceria.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" />
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-muted-foreground">
                        "Anak saya jadi semangat bangun pagi untuk sekolah! Gurunya kreatif-kreatif, belajarnya jadi seru."
                      </p>
                      <p className="mt-2 font-semibold">Bunda Anita</p>
                      <p className="text-sm text-muted-foreground">Orang Tua Siswa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/avatar2/100/100" />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-muted-foreground">
                        "Sekolah Ceria benar-benar memperhatikan perkembangan setiap anak. Laporannya detail dan komunikasinya bagus."
                      </p>
                      <p className="mt-2 font-semibold">Ayah Budi</p>
                      <p className="text-sm text-muted-foreground">Orang Tua Siswa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/avatar3/100/100" />
                      <AvatarFallback>BW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-muted-foreground">
                        "Fasilitas bermainnya aman dan luas. Anak saya senang sekali bisa lari-larian dengan teman-temannya."
                      </p>
                      <p className="mt-2 font-semibold">Bunda Rina</p>
                      <p className="text-sm text-muted-foreground">Orang Tua Siswa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Siap Bergabung dengan Keluarga Ceria?</h2>
            <p className="mt-4 max-w-xl mx-auto">
              Jadilah bagian dari komunitas pembelajar yang dinamis dan berprestasi. Mulailah perjalanan Anda bersama kami.
            </p>
            <Button variant="secondary" size="lg" className="mt-8 font-bold" asChild>
              <Link href="/alur-pendaftaran">Lihat Alur Pendaftaran</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-amber-50/50 text-muted-foreground">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sekolah Ceria</h3>
            <p className="mt-2 text-sm">Jalan Pendidikan No. 123, Kota Ilmu, Indonesia.</p>
            <p className="text-sm">Email: halo@sekolahceria.sch.id</p>
            <p className="text-sm">Telepon: (021) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Tautan Cepat</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="#" className="hover:text-primary">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-primary">Akademik</Link></li>
              <li><Link href="#" className="hover:text-primary">Berita</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Ikuti Kami</h3>
            <div className="mt-2 flex gap-4">
              <Link href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary"><Facebook className="h-5w-5" /></Link>
              <Link href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
            <p className="text-sm">&copy; 2024 Sekolah Ceria. Semua Hak Dilindungi.</p>
            <p className="text-sm">Dibuat dengan ❤️ oleh AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
