
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { EmployeeForm } from "./_components/employee-form";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Employee } from "@/lib/types";


const ITEMS_PER_PAGE = 5;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const res = await fetch('/api/employees');
        if (!res.ok) {
            throw new Error('Gagal memuat data karyawan');
        }
        const data = await res.json();
        setEmployees(data.employees);
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
        });
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toast]);

  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return employees.slice(startIndex, endIndex);
  }, [currentPage, employees]);

  const handleSuccess = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    fetchData();
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;
    
    try {
        const response = await fetch(`/api/employees/${selectedEmployee.id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Gagal menghapus karyawan.');
        }
        toast({
            title: "Karyawan Dihapus",
            description: `Karyawan "${selectedEmployee.name}" telah dihapus.`,
        });
        fetchData();
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Gagal Menghapus',
            description: error.message,
        })
    } finally {
        setIsAlertOpen(false);
        setSelectedEmployee(null);
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manajemen Karyawan</CardTitle>
            <CardDescription>
              Lihat dan kelola semua karyawan non-guru.
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Karyawan
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>ID Karyawan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-10 w-10 rounded-full" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                    </TableRow>
                ))
              ) : paginatedEmployees.map((employee) => {
                return (
                    <TableRow key={employee.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage
                                    src={employee.avatarUrl}
                                    alt={employee.name}
                                    data-ai-hint={employee.avatarHint}
                                />
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>{employee.id}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Buka menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditClick(employee)}>
                                    Ubah
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(employee)}>
                                    Hapus
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                )
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
      
      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Karyawan Baru</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk menambahkan karyawan baru.
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Data Karyawan</DialogTitle>
            <DialogDescription>
              Perbarui detail untuk karyawan {selectedEmployee?.name}.
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm onSuccess={handleSuccess} existingEmployee={selectedEmployee} />
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data karyawan
              "{selectedEmployee?.name}" secara permanen.
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
