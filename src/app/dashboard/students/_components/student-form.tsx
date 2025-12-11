
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Class = { id: string, name: string };

const formSchema = z.object({
  name: z.string().min(2, "Nama minimal harus 2 karakter."),
  classId: z.string().nonempty("Silakan pilih kelas."),
});

type StudentFormValues = z.infer<typeof formSchema>;

interface StudentFormProps {
    onSuccess: () => void;
}

export function StudentForm({ onSuccess }: StudentFormProps) {
  const { toast } = useToast();
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/classes');
            if (!res.ok) throw new Error("Gagal memuat data kelas");
            const data = await res.json();
            setClasses(data.classes);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } finally {
            setIsLoading(false);
        }
    }
    fetchClasses();
  }, [toast]);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      classId: "",
    },
  });

  const onSubmit = async (values: StudentFormValues) => {
    setIsSubmitting(true);
    try {
        const res = await fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "Gagal menambahkan siswa.");
        }
        toast({
            title: "Siswa Ditambahkan",
            description: `${values.name} telah berhasil terdaftar.`,
        });
        onSuccess();
    } catch(error: any) {
        toast({ variant: 'destructive', title: 'Gagal', description: error.message });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoading) {
      return (
          <div className="space-y-8">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-28" />
              </div>
          </div>
      )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
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
        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelas</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Menyimpan...' : 'Tambah Siswa'}</Button>
        </div>
      </form>
    </Form>
  );
}
