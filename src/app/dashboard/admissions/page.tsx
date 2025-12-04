
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { newStudentApplicants, type NewStudentApplicant, type AdmissionStatus } from "@/lib/data";
import { PlusCircle, MoreHorizontal, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdmissionForm } from "./_components/admission-form";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

function getStatusVariant(
  status: AdmissionStatus
): "default" | "secondary" | "destructive" {
  if (status === "Accepted") return "default";
  if (status === "Pending") return "secondary";
  return "destructive";
}

export default function AdmissionsPage() {
  const [open, setOpen] = useState(false);
  const [applicants, setApplicants] = useState<NewStudentApplicant[]>(newStudentApplicants);
  const { toast } = useToast();

  const handleSuccess = () => {
    // In a real app, you'd refetch the data here.
    // For now, we just close the dialog.
    setOpen(false);
  };

  const handleStatusChange = (applicantId: string, newStatus: AdmissionStatus) => {
    setApplicants(prev => 
        prev.map(app => 
            app.id === applicantId ? { ...app, status: newStatus } : app
        )
    );
    toast({
        title: "Status Updated",
        description: `Applicant status has been changed to ${newStatus}.`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>New Student Admissions</CardTitle>
            <CardDescription>
              Manage and track new student applications.
            </CardDescription>
          </div>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Applicant
            </Button>
          </DialogTrigger>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Previous School</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium">{applicant.name}</TableCell>
                  <TableCell>{applicant.previousSchool}</TableCell>
                  <TableCell>
                    {format(applicant.registrationDate, "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(applicant.status)}>
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'Accepted')}>
                          <Check className="mr-2 h-4 w-4 text-green-600" />
                          <span>Accept</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(applicant.id, 'Rejected')}>
                          <X className="mr-2 h-4 w-4 text-red-600" />
                          <span>Reject</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Applicant</DialogTitle>
            <DialogDescription>
              Fill out the form below to register a new student applicant.
            </DialogDescription>
          </DialogHeader>
          <AdmissionForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </>
  );
}
