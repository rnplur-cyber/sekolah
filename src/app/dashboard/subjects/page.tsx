
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SubjectForm } from "./_components/subject-form";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export type Subject = {
  id: string;
  name: string;
};

const ITEMS_PER_PAGE = 5;

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const fetchSubjects = async () => {
      setIsLoading(true);
      try {
          const response = await fetch('/api/subjects');
          if (!response.ok) {
              throw new Error('Gagal memuat data mata pelajaran');
          }
          const data = await response.json();
          setSubjects(data.subjects);
      } catch (error: any) {
          toast({
              variant: 'destructive',
              title: 'Error',
              description: error.message
          });
      } finally {
          setIsLoading(false);
      }
  }

  useEffect(() => {
    fetchSubjects();
  }, [toast]);

  const totalPages = Math.ceil(subjects.length / ITEMS_PER_PAGE);

  const paginatedSubjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return subjects.slice(startIndex, endIndex);
  }, [currentPage, subjects]);


  const handleSuccess = () => {
    setOpen(false);
    fetchSubjects();
  };

  const handleDeleteClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSubject) return;

    try {
        const response = await fetch(`/api/subjects/${selectedSubject.id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Gagal menghapus mata pelajaran.');
        }
        toast({
            title: "Mata Pelajaran Dihapus",
            description: `Mata pelajaran "${selectedSubject.name}" telah dihapus.`,
        });
        fetchSubjects();
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Gagal Menghapus',
            description: error.message,
        });
    } finally {
        setIsAlertOpen(false);
        setSelectedSubject(null);
    }
  };
  
  const handleEditClick = (subject: Subject) => {
    console.log("Mengubah mata pelajaran:", subject.id);
     toast({
        title: "Aksi Ubah",
        description: `Mengubah "${subject.name}". (UI belum diimplementasikan)`,
      });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manajemen Mata Pelajaran</CardTitle>
            <CardDescription>
              Lihat dan kelola semua mata pelajaran.
            </CardDescription>
          </div>
           <Button onClick={() => setOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Mata Pelajaran
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Mata Pelajaran</TableHead>
                <TableHead>Nama Mata Pelajaran</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                 Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                 ))
              ) : paginatedSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.id}</TableCell>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                   <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(subject)}>
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(subject)}>
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-6">
          <div className="text-sm text-muted-foreground">
            Halaman {currentPage} dari {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Berikutnya
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Mata Pelajaran Baru</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah untuk membuat mata pelajaran baru.
            </DialogDescription>
          </DialogHeader>
          <SubjectForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus mata pelajaran secara permanen
              "{selectedSubject?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
