
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLogo } from "@/components/icons";
import { FileText, UserCheck, Bell, Building, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const registrationSteps = [
  {
    icon: UserPlus,
    title: "1. Buat Akun",
    description: "Calon siswa atau orang tua membuat akun pendaftaran melalui portal online kami untuk memulai proses.",
  },
  {
    icon: FileText,
    title: "2. Isi Formulir",
    description: "Lengkapi formulir pendaftaran dengan data diri siswa, informasi orang tua, dan riwayat sekolah sebelumnya.",
  },
  {
    icon: "Upload",
    title: "3. Unggah Berkas",
    description: "Unggah dokumen yang diperlukan seperti Akta Kelahiran, Kartu Keluarga, dan Rapor terakhir dalam format digital.",
  },
  {
    icon: UserCheck,
    title: "4. Seleksi & Verifikasi",
    description: "Tim kami akan meninjau kelengkapan formulir dan memverifikasi keaslian berkas yang telah diunggah.",
  },
  {
    icon: Bell,
    title: "5. Pengumuman Hasil",
    description: "Hasil seleksi akan diumumkan melalui portal pendaftaran. Anda akan menerima notifikasi di akun Anda.",
  },
  {
    icon: Building,
    title: "6. Daftar Ulang",
    description: "Siswa yang dinyatakan lulus seleksi melanjutkan ke tahap daftar ulang untuk konfirmasi akhir sebagai siswa baru.",
  },
];

const StepCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string; }) => {
    const CustomIcon = Icon === "Upload" ? () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-cloud h-8 w-8"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
    ) : Icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CustomIcon className="h-6 w-6" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function RegistrationFlowPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">Sekolah Cerdas</span>
          </Link>
          <Button asChild>
            <Link href="/pendaftaran">Daftar Sekarang</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Alur Pendaftaran Siswa Baru</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Ikuti langkah-langkah mudah berikut untuk menjadi bagian dari keluarga besar Sekolah Cerdas.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {registrationSteps.map((step, index) => (
              <StepCard key={index} icon={step.icon} title={step.title} description={step.description} />
            ))}
          </div>

           <div className="mt-16 text-center">
                <p className="text-muted-foreground">Sudah siap untuk mendaftar?</p>
                 <Button size="lg" className="mt-4" asChild>
                    <Link href="/pendaftaran">Lanjutkan ke Formulir Pendaftaran</Link>
                </Button>
            </div>
        </div>
      </main>
      
      <footer className="bg-muted text-muted-foreground py-6">
         <div className="container mx-auto text-center text-sm">
            &copy; 2024 Sekolah Cerdas. Semua Hak Dilindungi.
        </div>
      </footer>
    </div>
  );
}
