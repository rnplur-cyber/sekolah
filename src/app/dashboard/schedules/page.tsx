
"use client";

import { useState } from "react";
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
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  classes,
  schedules,
  subjects,
  teachers,
  type Schedule,
  type DayOfWeek,
} from "@/lib/data";
import { ScheduleForm } from "./_components/schedule-form";

function getSubjectById(id: string) {
  return subjects.find((s) => s.id === id);
}

function getTeacherById(id: string) {
  return teachers.find((t) => t.id === id);
}

const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function SchedulesPage() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    // In a real app, you'd refetch the data here.
    // For now, we just close the dialog.
    setOpen(false);
  };

  const getScheduleForDay = (classId: string, day: DayOfWeek) => {
    return schedules
      .filter((s) => s.classId === classId && s.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Class Schedules</CardTitle>
            <CardDescription>
              View and manage class schedules.
            </CardDescription>
          </div>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Schedule
            </Button>
          </DialogTrigger>
        </CardHeader>
        <CardContent>
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
                      <h3 className="text-lg font-semibold mb-2">{day}</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[25%]">Time</TableHead>
                            <TableHead className="w-[40%]">Subject</TableHead>
                            <TableHead className="w-[35%]">Teacher</TableHead>
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
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-center h-24"
                              >
                                No schedule for {day}.
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
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Schedule</DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new schedule entry.
            </DialogDescription>
          </DialogHeader>
          <ScheduleForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
}
