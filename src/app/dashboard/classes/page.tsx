
"use client";

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
import { ClassForm } from "./_components/class-form";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export type Class = {
  id: string;
  name: string;
  walikelasId: string;
  walikelasName: string;
  studentCount: number;
};

const ITEMS_PER_PAGE = 5;

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('/api/classes');
        if (!response.ok) {
            throw new Error('Gagal memuat data kelas.');
        }
        const data = await response.json();
        setClasses(data.classes);
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
    fetchClasses();
  }, [toast]);

  const totalPages = Math.ceil(classes.length / ITEMS_PER_PAGE);

  const paginatedClasses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return classes.slice(startIndex, endIndex);
  }, [currentPage, classes]);

  const handleSuccess = () => {
    setOpen(false);
    fetchClasses();
  };

  const handleDeleteClick = (cls: Class) => {
    setSelectedClass(cls);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedClass) return;

    try {
        const response = await fetch(`/api/classes/${selectedClass.id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Gagal menghapus kelas.');
        }
        toast({
            title: "Kelas Dihapus",
            description: `Kelas "${selectedClass.name}" telah dihapus.`,
        });
        fetchClasses(); // Re-fetch data
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Gagal Menghapus',
            description: error.message
        })
    } finally {
        setIsAlertOpen(false);
        setSelectedClass(null);
    }
  };
  
  const handleEditClick = (cls: Class) => {
    console.log("Mengubah kelas:", cls.id);
     toast({
        title: "Aksi Ubah",
        description: `Mengubah "${cls.name}". (UI belum diimplementasikan)`,
      });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manajemen Kelas</CardTitle>
            <CardDescription>Lihat dan kelola semua kelas.</CardDescription>
          </div>
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Kelas
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kelas</TableHead>
                <TableHead>Wali Kelas</TableHead>
                <TableHead>Jumlah Siswa</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                 Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                 ))
              ) : paginatedClasses.map((cls) => {
                return (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.walikelasName || "N/A"}</TableCell>
                    <TableCell>{cls.studentCount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Buka menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClick(cls)}>
                            Ubah
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(cls)}>
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
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
            <DialogTitle>Tambah Kelas Baru</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk membuat kelas baru.
            </DialogDescription>
          </DialogHeader>
          <ClassForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
       <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus kelas secara permanen
              "{selectedClass?.name}".
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
