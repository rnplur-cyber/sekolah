
'use client';
import { AppLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function ContactPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        alert('Pesan Anda telah terkirim!');
    };

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
             <Link href="/berita" className="hover:text-primary" prefetch={false}>
              Berita
            </Link>
          </nav>
          <Button asChild className="font-bold">
            <Link href="/pendaftaran">Pendaftaran</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Hubungi Kami</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Kami senang mendengar dari Anda. Silakan hubungi kami melalui informasi di bawah ini atau kirimkan pesan melalui formulir.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
                <Card className="shadow-md rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Informasi Kontak</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1"/>
                            <div>
                                <h3 className="font-semibold">Alamat</h3>
                                <p className="text-muted-foreground">Jalan Pendidikan No. 123, Kota Ilmu, Indonesia.</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1"/>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-muted-foreground">halo@sekolahceria.sch.id</p>
                            </div>
                         </div>
                          <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1"/>
                            <div>
                                <h3 className="font-semibold">Telepon</h3>
                                <p className="text-muted-foreground">(021) 123-4567</p>
                            </div>
                         </div>
                    </CardContent>
                </Card>
            </div>
            
            <div>
                 <Card className="shadow-md rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Kirim Pesan</CardTitle>
                        <CardDescription>Isi formulir di bawah ini dan kami akan segera merespons Anda.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input id="name" {...register("name", { required: true })} />
                                {errors.name && <p className="text-red-500 text-sm mt-1">Nama harus diisi.</p>}
                            </div>
                             <div>
                                <Label htmlFor="email">Alamat Email</Label>
                                <Input id="email" type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                {errors.email && <p className="text-red-500 text-sm mt-1">Email tidak valid.</p>}
                            </div>
                              <div>
                                <Label htmlFor="message">Pesan Anda</Label>
                                <Textarea id="message" {...register("message", { required: true })} />
                                {errors.message && <p className="text-red-500 text-sm mt-1">Pesan harus diisi.</p>}
                            </div>
                             <Button type="submit" className="w-full font-bold">Kirim Pesan</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-amber-50/50 text-muted-foreground py-6">
         <div className="container mx-auto text-center text-sm">
            &copy; 2024 Sekolah Ceria. Semua Hak Dilindungi.
        </div>
      </footer>
    </div>
  );
}

    