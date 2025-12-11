
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
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Subject = { id: string, name: string };
type Class = { id: string, name: string };

const formSchema = z.object({
  name: z.string().min(2, "Nama minimal harus 2 karakter."),
  nip: z.string().regex(/^\d+$/, "NIP harus berupa angka.").min(10, "NIP minimal harus 10 digit."),
  subjectId: z.string().nonempty("Silakan pilih mata pelajaran."),
});

type TeacherFormValues = z.infer<typeof formSchema>;

interface TeacherFormProps {
    onSuccess: () => void;
}

export function TeacherForm({ onSuccess }: TeacherFormProps) {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const subjectsRes = await fetch('/api/subjects');
            const subjectsData = await subjectsRes.json();
            setSubjects(subjectsData.subjects);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Gagal memuat data',
                description: 'Tidak bisa memuat daftar mata pelajaran.'
            })
        } finally {
            setIsLoading(false);
        }
    }
    fetchData();
  }, [toast]);


  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nip: "",
      subjectId: "",
    },
  });

  const onSubmit = async (values: TeacherFormValues) => {
    setIsSubmitting(true);
    // Send an empty array for taughtClassIds as it's not handled in this form anymore
    const payload = { ...values, taughtClassIds: [] };

    try {
        const response = await fetch('/api/teachers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Gagal menambahkan guru.');
        }

        toast({
            title: "Guru Ditambahkan",
            description: `${values.name} telah berhasil terdaftar.`,
        });
        onSuccess();

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Gagal",
            description: error.message,
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
        <div className="space-y-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="flex justify-end">
                <Skeleton className="h-10 w-24" />
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
                <Input placeholder="Masukkan nama lengkap guru" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIP</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan NIP guru" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mata Pelajaran</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata pelajaran" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Tambah Guru"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
