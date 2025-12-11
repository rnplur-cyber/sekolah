
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type NewStudentApplicant, type AdmissionStatus } from "@/lib/types";
import { PlusCircle, MoreHorizontal, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdmissionForm } from "./_components/admission-form";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";


function getStatusVariant(
  status: AdmissionStatus
): "default" | "secondary" | "destructive" {
  if (status === "Accepted") return "default";
  if (status === "Pending") return "secondary";
  return "destructive";
}

const ITEMS_PER_PAGE = 5;

function calculateAge(birthDate: string | Date): number {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

export default function AdmissionsPage() {
  const [open, setOpen] = useState(false);
  const [applicants, setApplicants] = useState<NewStudentApplicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [academicYearFilter, setAcademicYearFilter] = useState("all");
  const { toast } = useToast();

  // API for admissions not implemented, using mock data and local state manipulation for now
  useEffect(() => {
      // Simulating fetch
      setIsLoading(true);
      setTimeout(() => {
          // In real app: fetch('/api/admissions').then(...)
          setApplicants([]);
          setIsLoading(false);
      }, 1000);
  }, []);

  const academicYears = useMemo(() => {
    const years = new Set(applicants.map(app => app.academicYear));
    return ["all", ...Array.from(years)];
  }, [applicants]);

  const filteredApplicants = useMemo(() => {
    return applicants.filter(applicant => {
      if (academicYearFilter === "all") return true;
      return applicant.academicYear === academicYearFilter;
    });
  }, [applicants, academicYearFilter]);

  const totalPages = Math.ceil(filteredApplicants.length / ITEMS_PER_PAGE);

  const paginatedApplicants = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredApplicants.slice(startIndex, endIndex);
  }, [currentPage, filteredApplicants]);
  
  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [academicYearFilter]);


  const handleSuccess = () => {
    // In a real app, you'd refetch the data here.
    // For now, we just close the dialog.
    setOpen(false);
    //
  };

  const handleStatusChange = (applicantId: string, newStatus: AdmissionStatus) => {
    // This is a local state update, in a real app this would be an API call.
    setApplicants(prev => 
        prev.map(app => 
            app.id === applicantId ? { ...app, status: newStatus } : app
        )
    );
    toast({
        title: "Status Diperbarui (Simulasi)",
        description: `Status pendaftar telah diubah menjadi ${newStatus === 'Accepted' ? 'Diterima' : 'Ditolak'}.`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Penerimaan Siswa Baru</CardTitle>
            <CardDescription>
              Kelola dan lacak pendaftaran siswa baru.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Pendaftar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <label htmlFor="academic-year-filter" className="text-sm font-medium">Filter Tahun Ajaran:</label>
            <Select value={academicYearFilter} onValueChange={setAcademicYearFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih tahun ajaran" />
              </SelectTrigger>
              <SelectContent>
                {academicYears.map(year => (
                  <SelectItem key={year} value={year}>
                    {year === 'all' ? 'Semua Tahun' : year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Pendaftar</TableHead>
                <TableHead>Umur</TableHead>
                <TableHead>Sekolah Asal</TableHead>
                <TableHead>Jenis Kelamin</TableHead>
                <TableHead>Tahun Ajaran</TableHead>
                <TableHead>Tanggal Registrasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                  Array.from({length: ITEMS_PER_PAGE}).map((_, i) => (
                      <TableRow key={i}>
                          <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                      </TableRow>
                  ))
              ) : paginatedApplicants.length > 0 ? paginatedApplicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium">{applicant.name}</TableCell>
                  <TableCell>{calculateAge(applicant.birthDate)}</TableCell>
                  <TableCell>{applicant.previousSchool}</TableCell>
                  <TableCell>{applicant.gender}</TableCell>
                  <TableCell>{applicant.academicYear}</TableCell>
                  <TableCell>
                    {format(new Date(applicant.registrationDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(applicant.status)}>
                      {applicant.status === 'Accepted' ? 'Diterima' : applicant.status === 'Pending' ? 'Menunggu' : 'Ditolak'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'Accepted')}>
                          <Check className="mr-2 h-4 w-4 text-green-600" />
                          <span>Terima</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'Rejected')}>
                          <X className="mr-2 h-4 w-4 text-red-600" />
                          <span>Tolak</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                 <TableRow>
                    <TableCell colSpan={8} className="text-center h-24">
                        Tidak ada data pendaftar.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-6">
          <div className="text-sm text-muted-foreground">
            {filteredApplicants.length > 0 ? `Halaman ${currentPage} dari ${totalPages}` : "Tidak ada data"}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || filteredApplicants.length === 0}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || filteredApplicants.length === 0}
            >
              Berikutnya
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Tambah Pendaftar Baru</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk mendaftarkan siswa baru.
            </DialogDescription>
          </DialogHeader>
          <AdmissionForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
}
