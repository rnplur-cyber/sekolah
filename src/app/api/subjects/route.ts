
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 3);

// GET all subjects
export async function GET() {
  try {
    const [rows] = await db.execute('SELECT id, name FROM subjects ORDER BY name ASC');
    return NextResponse.json({ subjects: rows });
  } catch (error) {
    console.error('Failed to fetch subjects:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}

// CREATE a new subject
export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ message: 'Nama mata pelajaran harus diisi.' }, { status: 400 });
    }

    const [maxIdResult]: any = await db.execute('SELECT MAX(CAST(SUBSTRING(id, 5) AS UNSIGNED)) as maxId FROM subjects');
    const newIdNumber = (maxIdResult[0].maxId || 0) + 1;
    const subjectId = `SUB-${String(newIdNumber).padStart(3, '0')}`;

    await db.execute(
      'INSERT INTO subjects (id, name) VALUES (?, ?)',
      [subjectId, name]
    );

    return NextResponse.json({ message: 'Mata pelajaran berhasil ditambahkan.', subjectId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create subject:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
