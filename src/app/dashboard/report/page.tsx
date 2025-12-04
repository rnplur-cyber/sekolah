
"use client";

import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
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
import { Badge } from "@/components/ui/badge";
import {
  attendanceRecords,
  students,
  classes,
  type AttendanceRecord,
} from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "./_components/date-picker-range";
import { Calendar as CalendarIcon } from "lucide-react";

function getStudentById(id: string) {
  return students.find((s) => s.id === id);
}

function getClassById(id: string) {
  return classes.find((c) => c.id === id);
}

function getStatusVariant(
  status: AttendanceRecord["status"]
): "default" | "secondary" | "destructive" {
  if (status === "Present") return "default";
  if (status === "Late") return "secondary";
  return "destructive";
}

export default function ReportPage() {
  const [classId, setClassId] = useState("all");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const recordDate = new Date(record.timestamp);
      const student = getStudentById(record.studentId);
      
      const isClassMatch = classId === "all" || student?.classId === classId;
      
      const isDateMatch = date?.from && date?.to 
        ? recordDate >= date.from && recordDate <= date.to
        : true;

      return isClassMatch && isDateMatch;
    });
  }, [classId, date]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Report</CardTitle>
        <CardDescription>
          View and filter student attendance records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="class-filter" className="text-sm font-medium">
              Class:
            </label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div className="flex items-center gap-2">
             <label htmlFor="date-filter" className="text-sm font-medium">
                Date Range:
             </label>
             <DatePickerWithRange date={date} setDate={setDate} />
           </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead className="hidden sm:table-cell">Class</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => {
                const student = getStudentById(record.studentId);
                const studentClass = student
                  ? getClassById(student.classId)
                  : null;
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage
                            src={student?.avatarUrl}
                            alt={student?.name}
                            data-ai-hint={student?.avatarHint}
                          />
                          <AvatarFallback>
                            {student?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">
                          {student?.name || "Unknown"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {studentClass?.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      {format(record.timestamp, "HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      {format(record.timestamp, "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getStatusVariant(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                    No attendance records found for the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
