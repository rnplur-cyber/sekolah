
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AppLogo } from "@/components/icons";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { nanoid } from 'nanoid';
import { useToast } from "@/hooks/use-toast";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

const formSchema = z.object({
  namaLengkap: z.string().min(3, "Nama lengkap harus diisi"),
  tempatLahir: z.string().min(1, "Tempat lahir harus diisi"),
  tanggalLahir: z.date({
    required_error: "Tanggal lahir harus diisi.",
  }),
  jenisKelamin: z.string({
    required_error: "Jenis kelamin harus dipilih.",
  }),
  alamat: z.string().min(10, "Alamat harus diisi lengkap"),
  sekolahAsal: z.string().min(1, "Sekolah asal harus diisi"),
  namaOrangTua: z.string().min(3, "Nama orang tua/wali harus diisi"),
  kontakOrangTua: z.string().min(10, "Nomor kontak yang valid harus diisi"),
  aktaKelahiran: z
    .any()
    .refine((files) => files?.length == 1, "Akta kelahiran harus diunggah.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Format file harus .jpg, .png, atau .pdf"
    ),
  kartuKeluarga: z
    .any()
    .refine((files) => files?.length == 1, "Kartu keluarga harus diunggah.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Format file harus .jpg, .png, atau .pdf"
    ),
   raporTerakhir: z
    .any()
    .refine((files) => files?.length == 1, "Rapor terakhir harus diunggah.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran file maksimal 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Format file harus .jpg, .png, atau .pdf"
    ),
});

export default function RegistrationFormPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaLengkap: "",
      tempatLahir: "",
      sekolahAsal: "",
      alamat: "",
      namaOrangTua: "",
      kontakOrangTua: "",
    },
  });

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    if (!file) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${nanoid()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file);
    
    if (error) {
        console.error(`Error uploading to ${bucket}:`, error.message);
        return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
        const aktaUrl = await uploadFile(values.aktaKelahiran[0], 'dokumen-pendaftaran');
        const kkUrl = await uploadFile(values.kartuKeluarga[0], 'dokumen-pendaftaran');
        const raporUrl = await uploadFile(values.raporTerakhir[0], 'dokumen-pendaftaran');

        if (!aktaUrl || !kkUrl || !raporUrl) {
            throw new Error("Gagal mengunggah salah satu atau lebih dokumen.");
        }
        
        const dataToInsert = {
            nama_lengkap: values.namaLengkap,
            tempat_lahir: values.tempatLahir,
            tanggal_lahir: values.tanggalLahir,
            jenis_kelamin: values.jenisKelamin,
            alamat: values.alamat,
            sekolah_asal: values.sekolahAsal,
            nama_orang_tua: values.namaOrangTua,
            kontak_orang_tua: values.kontakOrangTua,
            url_akta_kelahiran: aktaUrl,
            url_kartu_keluarga: kkUrl,
            url_rapor_terakhir: raporUrl,
            status: 'pending'
        };
        
        const { error: insertError } = await supabase.from('pendaftaran').insert([dataToInsert]);

        if (insertError) {
             throw new Error(`Gagal menyimpan data pendaftaran: ${insertError.message}`);
        }

        toast({
            title: "Pendaftaran Berhasil!",
            description: "Data Anda telah kami terima. Terima kasih.",
        });
        form.reset();

    } catch (error: any) {
         toast({
            variant: "destructive",
            title: "Terjadi Kesalahan",
            description: error.message || "Tidak dapat memproses pendaftaran Anda saat ini.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const AktaKelahiranRef = form.register("aktaKelahiran");
  const KartuKeluargaRef = form.register("kartuKeluarga");
  const RaporTerakhirRef = form.register("raporTerakhir");

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
       <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <AppLogo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-slate-800">Sekolah Ceria</span>
          </Link>
           <Button variant="outline" asChild>
            <Link href="/alur-pendaftaran">Lihat Alur Pendaftaran</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Formulir Pendaftaran Siswa Baru
              </CardTitle>
              <CardDescription>
                Lengkapi data di bawah ini dengan benar untuk melanjutkan proses pendaftaran.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Data Diri Siswa */}
                  <section>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-6">Data Diri Calon Siswa</h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="namaLengkap"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                              <Input placeholder="Masukkan nama lengkap siswa" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormField
                            control={form.control}
                            name="tempatLahir"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tempat Lahir</FormLabel>
                                <FormControl>
                                  <Input placeholder="Kota tempat lahir" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="tanggalLahir"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Tanggal Lahir</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pilih tanggal</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() || date < new Date("2010-01-01")
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                       </div>
                       <FormField
                          control={form.control}
                          name="jenisKelamin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Jenis Kelamin</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                            control={form.control}
                            name="alamat"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Alamat Lengkap</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Masukkan alamat lengkap (Jalan, Nomor, RT/RW, Kelurahan, Kecamatan, Kota)"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        <FormField
                            control={form.control}
                            name="sekolahAsal"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sekolah Asal</FormLabel>
                                <FormControl>
                                  <Input placeholder="Contoh: TK Tunas Bangsa" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Jika dari PAUD/TK, sebutkan nama sekolahnya. Jika tidak, isi dengan "-".
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                    </div>
                  </section>
                  
                   {/* Data Orang Tua */}
                  <section>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-6">Data Orang Tua / Wali</h2>
                      <div className="space-y-4">
                         <FormField
                            control={form.control}
                            name="namaOrangTua"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nama Orang Tua / Wali</FormLabel>
                                <FormControl>
                                  <Input placeholder="Masukkan nama ayah/ibu/wali" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <FormField
                            control={form.control}
                            name="kontakOrangTua"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nomor Telepon/HP/WhatsApp</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="Contoh: 081234567890" {...field} />
                                </FormControl>
                                 <FormDescription>
                                   Nomor ini akan digunakan untuk komunikasi terkait pendaftaran.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                      </div>
                  </section>

                   {/* Unggah Berkas */}
                   <section>
                    <h2 className="text-xl font-semibold border-b pb-2 mb-6">Unggah Berkas</h2>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="aktaKelahiran"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Akta Kelahiran</FormLabel>
                                <FormControl>
                                <Input type="file" {...AktaKelahiranRef} />
                                </FormControl>
                                <FormDescription>File: PDF, JPG, PNG. Maksimal 5MB.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="kartuKeluarga"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kartu Keluarga</FormLabel>
                                <FormControl>
                                <Input type="file" {...KartuKeluargaRef} />
                                </FormControl>
                                 <FormDescription>File: PDF, JPG, PNG. Maksimal 5MB.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="raporTerakhir"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rapor/Ijazah TK (Jika Ada)</FormLabel>
                                <FormControl>
                                <Input type="file" {...RaporTerakhirRef} />
                                </FormControl>
                                <FormDescription>File: PDF, JPG, PNG. Maksimal 5MB.</FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                  </section>
                  
                  <Button type="submit" size="lg" className="w-full font-bold" disabled={isSubmitting}>
                     {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Mengirim..." : "Kirim Pendaftaran"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
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
