
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Schedule,
  type DayOfWeek,
  type Teacher,
  type Subject,
  type Class
} from "@/lib/types";
import { ScheduleForm } from "./_components/schedule-form";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const daysOfWeekIndonesian: { [key in DayOfWeek]: string } = {
  Monday: "Senin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Kamis",
  Friday: "Jumat",
};

export default function SchedulesPage() {
  const [open, setOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const { toast } = useToast();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      async function fetchData() {
          setIsLoading(true);
          try {
              // API endpoint for schedules is not yet implemented, using mock data
              const [classesRes, teachersRes, subjectsRes] = await Promise.all([
                  fetch('/api/classes'),
                  fetch('/api/teachers'),
                  fetch('/api/subjects'),
              ]);
              
              const classesData = await classesRes.json();
              const teachersData = await teachersRes.json();
              const subjectsData = await subjectsRes.json();
              
              setClasses(classesData.classes || []);
              setTeachers(teachersData.teachers || []);
              setSubjects(subjectsData.subjects || []);
              // Using empty array for schedules as API is not ready
              setSchedules([]);

          } catch (error) {
              console.error("Failed to fetch schedule data:", error);
              toast({ variant: 'destructive', title: 'Error', description: 'Gagal memuat data.' });
          } finally {
              setIsLoading(false);
          }
      }
      fetchData();
  }, [toast]);

  const handleSuccess = () => {
    setOpen(false);
    // In a real app, you would refetch schedules here
  };

  const getScheduleForDay = (classId: string, day: DayOfWeek) => {
    return schedules
      .filter((s) => s.classId === classId && s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };
  
  const getSubjectById = (id: string) => subjects.find((s) => s.id === id);
  const getTeacherById = (id: string) => teachers.find((t) => t.id === id);

  const handleDeleteClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSchedule) {
      console.log("Menghapus jadwal:", selectedSchedule.id);
      toast({
        title: "Jadwal Dihapus",
        description: `Entri jadwal telah dihapus.`,
      });
    }
    setIsAlertOpen(false);
    setSelectedSchedule(null);
  };
  
  if (isLoading) {
      return (
          <Card>
              <CardHeader><Skeleton className="h-8 w-1/3"/><Skeleton className="h-4 w-2/3 mt-2"/></CardHeader>
              <CardContent>
                  <Skeleton className="h-10 w-full mb-4"/>
                  <Skeleton className="h-40 w-full"/>
              </CardContent>
          </Card>
      )
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Jadwal Pelajaran</CardTitle>
            <CardDescription>
              Lihat dan kelola jadwal pelajaran kelas.
            </CardDescription>
          </div>
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Jadwal
            </Button>
        </CardHeader>
        <CardContent>
          {classes.length > 0 ? (
          <Tabs defaultValue={classes[0]?.id || ""}>
            <TabsList className="grid w-full grid-cols-5">
              {classes.map((cls) => (
                <TabsTrigger key={cls.id} value={cls.id}>
                  {cls.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {classes.map((cls) => (
              <TabsContent key={cls.id} value={cls.id}>
                <div className="mt-4 space-y-6">
                  {daysOfWeek.map((day) => (
                    <div key={day}>
                      <h3 className="text-lg font-semibold mb-2">{daysOfWeekIndonesian[day]}</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[20%]">Waktu</TableHead>
                            <TableHead className="w-[35%]">Mata Pelajaran</TableHead>
                            <TableHead className="w-[35%]">Guru</TableHead>
                            <TableHead className="w-[10%] text-right">Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getScheduleForDay(cls.id, day).length > 0 ? (
                            getScheduleForDay(cls.id, day).map((schedule) => {
                              const subject = getSubjectById(schedule.subjectId);
                              const teacher = getTeacherById(schedule.teacherId);
                              return (
                                <TableRow key={schedule.id}>
                                  <TableCell>
                                    {schedule.startTime} - {schedule.endTime}
                                  </TableCell>
                                  <TableCell>{subject?.name || "N/A"}</TableCell>
                                  <TableCell>{teacher?.name || "N/A"}</TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                          <span className="sr-only">Buka menu</span>
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleDeleteClick(schedule)}>
                                          Hapus
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="text-center h-24"
                              >
                                Tidak ada jadwal untuk hari {daysOfWeekIndonesian[day]}.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          ) : (
            <div className="text-center text-muted-foreground py-12">
                <p>Tidak ada data kelas untuk menampilkan jadwal. Silakan tambah kelas terlebih dahulu.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Jadwal Baru</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk membuat entri jadwal baru.
            </DialogDescription>
          </DialogHeader>
          <ScheduleForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus entri jadwal secara permanen.
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
