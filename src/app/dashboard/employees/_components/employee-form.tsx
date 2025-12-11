
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
import { useState, useEffect } from "react";
import type { Employee } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, "Nama minimal harus 2 karakter."),
  role: z.string().min(3, "Jabatan minimal harus 3 karakter."),
});

type EmployeeFormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
    onSuccess: () => void;
    existingEmployee?: Employee | null;
}

export function EmployeeForm({ onSuccess, existingEmployee }: EmployeeFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!existingEmployee;

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
    },
  });
  
  useEffect(() => {
      if (isEditMode && existingEmployee) {
          form.reset({
              name: existingEmployee.name,
              role: existingEmployee.role,
          })
      }
  }, [existingEmployee, isEditMode, form]);

  const onSubmit = async (values: EmployeeFormValues) => {
    setIsSubmitting(true);
    
    const url = isEditMode ? `/api/employees/${existingEmployee.id}` : '/api/employees';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Gagal menyimpan data karyawan.');
        }

        toast({
            title: isEditMode ? "Karyawan Diperbarui" : "Karyawan Ditambahkan",
            description: `${values.name} telah berhasil ${isEditMode ? 'diperbarui' : 'ditambahkan'}.`,
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
                <Input placeholder="Masukkan nama lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jabatan</FormLabel>
              <FormControl>
                <Input placeholder="contoh, Staf Tata Usaha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : (isEditMode ? 'Simpan Perubahan' : 'Tambah Karyawan')}
            </Button>
        </div>
      </form>
    </Form>
  );
}
