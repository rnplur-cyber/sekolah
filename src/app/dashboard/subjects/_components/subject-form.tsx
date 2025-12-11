
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
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Nama mata pelajaran minimal harus 2 karakter."),
});

type SubjectFormValues = z.infer<typeof formSchema>;

interface SubjectFormProps {
    onSuccess: () => void;
}

export function SubjectForm({ onSuccess }: SubjectFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: SubjectFormValues) => {
    setIsLoading(true);
    try {
        const response = await fetch('/api/subjects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Gagal menambahkan mata pelajaran.');
        }

        toast({
            title: "Mata Pelajaran Ditambahkan",
            description: `Mata pelajaran ${values.name} telah berhasil dibuat.`,
        });
        onSuccess();
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Gagal",
            description: error.message,
        });
    } finally {
        setIsLoading(false);
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
              <FormLabel>Nama Mata Pelajaran</FormLabel>
              <FormControl>
                <Input placeholder="contoh, Matematika" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>{isLoading ? 'Menyimpan...' : 'Tambah Mata Pelajaran'}</Button>
        </div>
      </form>
    </Form>
  );
}
