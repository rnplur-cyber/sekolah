
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 5);

// GET all students
export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        s.id, s.name, s.classId, s.avatarUrl, s.avatarHint,
        c.name AS className
      FROM students s
      LEFT JOIN classes c ON s.classId = c.id
      ORDER BY s.name ASC
    `);
    return NextResponse.json({ students: rows });
  } catch (error) {
    console.error('Failed to fetch students:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}

// CREATE a new student
export async function POST(req: NextRequest) {
  try {
    const { name, classId, avatarUrl, avatarHint } = await req.json();

    if (!name || !classId) {
      return NextResponse.json({ message: 'Nama dan kelas harus diisi.' }, { status: 400 });
    }
    
    const studentId = `SIS-${nanoid()}`;

    await db.execute(
      'INSERT INTO students (id, name, classId, avatarUrl, avatarHint) VALUES (?, ?, ?, ?, ?)',
      [studentId, name, classId, avatarUrl || `https://picsum.photos/seed/${studentId}/100/100`, avatarHint || 'person portrait']
    );

    return NextResponse.json({ message: 'Siswa berhasil ditambahkan.', studentId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create student:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
