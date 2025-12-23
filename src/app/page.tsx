
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppLogo } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Award, BookOpen, Users } from "lucide-react";

export default function SchoolPortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">Sekolah Cerdas</span>
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
          <Button asChild>
            <Link href="/pendaftaran">Pendaftaran</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[60vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/school-hero/1200/800')" }}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground px-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Membentuk Generasi Unggul dan Berkarakter
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              Pendidikan berkualitas yang mengintegrasikan teknologi dan nilai-nilai luhur untuk masa depan yang lebih cerah.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/pendaftaran">Daftar Sekarang</Link>
            </Button>
          </div>
        </section>

        <section id="fitur" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Keunggulan Sekolah Kami</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Kami menyediakan lingkungan belajar terbaik untuk potensi maksimal setiap siswa.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Award className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">Kurikulum Modern</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Kurikulum yang adaptif dengan perkembangan zaman dan kebutuhan industri global.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">Fasilitas Lengkap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dari laboratorium sains hingga lapangan olahraga, semua tersedia untuk mendukung bakat siswa.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">Tenaga Pendidik Ahli</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Guru-guru berpengalaman dan berdedikasi yang siap membimbing siswa menjadi yang terbaik.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="galeri" className="bg-muted py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Galeri Sekolah</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Momen-momen tak terlupakan dari kegiatan belajar dan ekstrakurikuler kami.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Image
                data-ai-hint="classroom students"
                src="https://picsum.photos/seed/gallery1/400/300"
                alt="Galeri 1"
                width={400}
                height={300}
                className="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105"
              />
              <Image
                data-ai-hint="school library"
                src="https://picsum.photos/seed/gallery2/400/300"
                alt="Galeri 2"
                width={400}
                height={300}
                className="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105"
              />
              <Image
                data-ai-hint="science lab"
                src="https://picsum.photos/seed/gallery3/400/300"
                alt="Galeri 3"
                width={400}
                height={300}
                className="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105"
              />
              <Image
                data-ai-hint="sports day"
                src="https://picsum.photos/seed/gallery4/400/300"
                alt="Galeri 4"
                width={400}
                height={300}
                className="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>
        </section>

        <section id="testimoni" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Apa Kata Mereka?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Pengalaman nyata dari komunitas kami.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" />
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-muted-foreground">
                        "Sekolah ini benar-benar mengubah cara anak saya belajar. Dia menjadi lebih percaya diri dan antusias."
                      </p>
                      <p className="mt-2 font-semibold">Andi Nugraha</p>
                      <p className="text-sm text-muted-foreground">Orang Tua Siswa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/avatar2/100/100" />
                      <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-muted-foreground">
                        "Guru-gurunya sangat mendukung. Saya tidak pernah merasa takut untuk bertanya dan mencoba hal-hal baru."
                      </p>
                      <p className="mt-2 font-semibold">Siti Lestari</p>
                      <p className="text-sm text-muted-foreground">Alumni</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/avatar3/100/100" />
                      <AvatarFallback>BW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-muted-foreground">
                        "Fasilitas olahraganya luar biasa. Saya bisa mengembangkan bakat saya di basket sampai ke tingkat nasional."
                      </p>
                      <p className="mt-2 font-semibold">Budi Waseso</p>
                      <p className="text-sm text-muted-foreground">Siswa Kelas XII</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Siap Bergabung dengan Kami?</h2>
            <p className="mt-4 max-w-xl mx-auto">
              Jadilah bagian dari komunitas pembelajar yang dinamis dan berprestasi. Mulailah perjalanan Anda bersama kami.
            </p>
            <Button variant="secondary" size="lg" className="mt-8" asChild>
              <Link href="/alur-pendaftaran">Lihat Alur Pendaftaran</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sekolah Cerdas</h3>
            <p className="mt-2 text-sm">Jalan Pendidikan No. 123, Kota Ilmu, Indonesia.</p>
            <p className="text-sm">Email: kontak@sekolahcerdas.sch.id</p>
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
              <Link href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
            <p className="text-sm">&copy; 2024 Sekolah Cerdas. Semua Hak Dilindungi.</p>
            <p className="text-sm">Dibuat dengan ❤️ oleh AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
