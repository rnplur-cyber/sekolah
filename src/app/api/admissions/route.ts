
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { customAlphabet } from 'nanoid';
import { format } from 'date-fns';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);

// GET all new student applicants
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM newStudentApplicants ORDER BY registrationDate DESC');
    return NextResponse.json({ applicants: rows });
  } catch (error) {
    console.error('Failed to fetch applicants:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}

// CREATE a new applicant
export async function POST(req: NextRequest) {
  try {
    const { 
        name, previousSchool, birthPlace, birthDate, gender, address, 
        parentName, contact, academicYear 
    } = await req.json();

    if (!name || !previousSchool || !birthPlace || !birthDate || !gender || !address || !parentName || !contact || !academicYear) {
      return NextResponse.json({ message: 'Semua kolom harus diisi.' }, { status: 400 });
    }

    const applicantId = `APP-${nanoid()}`;
    const registrationDate = new Date();
    const status = 'Pending';
    const formattedBirthDate = format(new Date(birthDate), 'yyyy-MM-dd');


    await db.execute(
      `INSERT INTO newStudentApplicants 
        (id, name, previousSchool, registrationDate, status, parentName, contact, birthPlace, birthDate, gender, address, academicYear) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        applicantId, name, previousSchool, registrationDate, status, parentName, 
        contact, birthPlace, formattedBirthDate, gender, address, academicYear
      ]
    );

    return NextResponse.json({ message: 'Pendaftar berhasil ditambahkan.', applicantId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create applicant:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
