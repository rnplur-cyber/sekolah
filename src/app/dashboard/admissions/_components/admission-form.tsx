
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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  previousSchool: z.string().min(3, "Previous school is required."),
  parentName: z.string().min(2, "Parent name is required."),
  contact: z.string().min(10, "Contact number is required."),
});

type AdmissionFormValues = z.infer<typeof formSchema>;

interface AdmissionFormProps {
    onSuccess: () => void;
}

export function AdmissionForm({ onSuccess }: AdmissionFormProps) {
  const { toast } = useToast();
  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      previousSchool: "",
      parentName: "",
      contact: "",
    },
  });

  const onSubmit = (values: AdmissionFormValues) => {
    console.log("New Applicant Data:", values);
    toast({
        title: "Applicant Added",
        description: `${values.name} has been successfully registered.`,
    });
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter applicant's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="previousSchool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous School</FormLabel>
              <FormControl>
                <Input placeholder="e.g., SMPN 1 Jakarta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent's Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter parent's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 081234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit">Add Applicant</Button>
        </div>
      </form>
    </Form>
  );
}
