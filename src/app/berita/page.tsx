
import { AppLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

const newsItems = [
    {
        image: "https://picsum.photos/seed/news1/400/250",
        imageHint: "school competition winner",
        title: "Siswa Sekolah Ceria Raih Juara 1 Lomba Robotika Nasional",
        date: "15 Juli 2024",
        excerpt: "Tim robotika kami berhasil memenangkan kompetisi bergengsi tingkat nasional, membuktikan bahwa kreativitas dan kerja keras akan membuahkan hasil yang membanggakan..."
    },
    {
        image: "https://picsum.photos/seed/news2/400/250",
        imageHint: "kids planting trees",
        title: "Peringatan Hari Bumi: Aksi Tanam 1000 Pohon di Lingkungan Sekolah",
        date: "10 Juli 2024",
        excerpt: "Dalam rangka memperingati Hari Bumi, seluruh siswa dan guru berpartisipasi dalam kegiatan menanam pohon untuk menciptakan lingkungan sekolah yang lebih hijau dan asri..."
    },
    {
        image: "https://picsum.photos/seed/news3/400/250",
        imageHint: "student art exhibition",
        title: "Pameran Karya Seni Siswa: Menampilkan Bakat dan Kreativitas Tanpa Batas",
        date: "5 Juli 2024",
        excerpt: "Aula sekolah disulap menjadi galeri seni yang penuh warna, menampilkan ratusan karya seni hasil kreativitas para siswa dari kelas 1 hingga kelas 6..."
    },
     {
        image: "https://picsum.photos/seed/news4/400/250",
        imageHint: "school field trip museum",
        title: "Kunjungan Edukatif ke Museum Nasional",
        date: "28 Juni 2024",
        excerpt: "Siswa-siswi kelas 4 melakukan kunjungan belajar ke Museum Nasional untuk mempelajari sejarah bangsa Indonesia secara langsung dari koleksi peninggalan yang ada."
    },
     {
        image: "https://picsum.photos/seed/news5/400/250",
        imageHint: "ramadan charity event",
        title: "Berbagi di Bulan Suci: Kegiatan Bakti Sosial Ramadhan",
        date: "25 Juni 2024",
        excerpt: "Menyambut bulan suci Ramadhan, OSIS Sekolah Ceria mengadakan kegiatan bakti sosial dengan membagikan paket sembako kepada masyarakat sekitar yang membutuhkan."
    },
     {
        image: "https://picsum.photos/seed/news6/400/250",
        imageHint: "students sports day",
        title: "Pekan Olahraga Sekolah Resmi Dibuka!",
        date: "20 Juni 2024",
        excerpt: "Kepala Sekolah secara resmi membuka Pekan Olahraga Sekolah (POS) yang akan mempertandingkan berbagai cabang olahraga untuk memupuk sportivitas dan semangat juang."
    },
];

export default function NewsPage() {
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
             <Link href="/tentang" className="hover:text-primary" prefetch={false}>
              Tentang Kami
            </Link>
             <Link href="/akademik" className="hover:text-primary" prefetch={false}>
              Akademik
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
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Berita & Pengumuman</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
             Ikuti terus informasi terbaru, kegiatan, dan prestasi dari keluarga besar Sekolah Ceria.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {newsItems.map((item, index) => (
                        <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow rounded-xl flex flex-col">
                            <Image 
                                src={item.image}
                                data-ai-hint={item.imageHint}
                                alt={item.title}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover"
                            />
                            <CardHeader>
                                <CardTitle className="text-xl font-bold h-16">{item.title}</CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-2">
                                    <Calendar className="h-4 w-4"/>
                                    <span>{item.date}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-muted-foreground">{item.excerpt}</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="p-0 font-bold">
                                    Baca Selengkapnya
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
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

    