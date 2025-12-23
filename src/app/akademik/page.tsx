
import { AppLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Telescope, Dna, Palette, Music, Dumbbell } from "lucide-react";

const programs = [
    {
        icon: BookOpen,
        title: "Kurikulum Merdeka Belajar",
        description: "Kami mengadopsi kurikulum nasional yang diperkaya dengan pendekatan STEAM (Science, Technology, Engineering, Arts, Mathematics) untuk mendorong pemikiran kritis dan kreatif."
    },
    {
        icon: Telescope,
        title: "Program Sains & Robotika",
        description: "Siswa belajar konsep sains melalui eksperimen seru dan membangun robot sederhana untuk memecahkan masalah. Program ini mengasah logika dan keterampilan teknis sejak dini."
    },
    {
        icon: Dna,
        title: "Pendidikan Karakter Islami",
        description: "Integrasi nilai-nilai Islami dalam setiap pembelajaran dan kegiatan sehari-hari untuk membentuk pribadi yang berakhlak mulia, jujur, dan bertanggung jawab."
    }
];

const extracurriculars = [
    { icon: Palette, name: "Seni Lukis & Kriya" },
    { icon: Music, name: "Musik & Vokal" },
    { icon: Dumbbell, name: "Olahraga (Futsal & Basket)" },
    { icon: "Tahfidz", name: "Tahfidz Al-Qur'an" },
    { icon: "Pramuka", name: "Pramuka Siaga" },
    { icon: "Coding", name: "Klub Coding Anak" },
];


const CustomIcon = ({ icon, className }: { icon: any; className: string;}) => {
    if (icon === "Tahfidz") return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z"/><path d="M6 12h4"/><path d="M14 6h2"/><path d="M14 12h2"/><path d="M14 18h2"/><path d="M6 6h4"/></svg>;
    if (icon === "Pramuka") return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 2 4 4-4 4-4-4Z"/><path d="M12 10v12"/><path d="M12 10H8"/><path d="M12 10h4"/></svg>;
    if (icon === "Coding") return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    const LucideIcon = icon;
    return <LucideIcon className={className} />;
};

export default function AcademicPage() {
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
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Program Akademik</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Temukan bagaimana kami merancang pengalaman belajar yang holistik, inovatif, dan menyenangkan untuk setiap siswa.
            </p>
          </div>
        </section>

        <section id="programs" className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Program Unggulan Kami</h2>
               <p className="mt-4 text-lg text-muted-foreground">
                Program-program ini dirancang khusus untuk membangun fondasi pengetahuan, keterampilan, dan karakter yang kuat.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow rounded-xl">
                    <CardHeader>
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-10 w-10" />
                      </div>
                      <CardTitle className="mt-4 text-xl font-bold">{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{program.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
        
        <section id="extracurriculars" className="py-12 md:py-24 bg-amber-50/50">
          <div className="container mx-auto px-4 md:px-6">
             <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Ekstrakurikuler</h2>
               <p className="mt-4 text-lg text-muted-foreground">
                Kami menyediakan beragam kegiatan ekstrakurikuler untuk menyalurkan minat, bakat, dan energi positif siswa di luar jam pelajaran.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {extracurriculars.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                           <CustomIcon icon={item.icon} className="h-8 w-8"/>
                        </div>
                        <h3 className="font-semibold">{item.name}</h3>
                    </div>
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

    