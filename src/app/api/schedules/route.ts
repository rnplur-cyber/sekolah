
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);

// GET all schedules
export async function GET() {
  try {
    // Optimized query to get all schedules ordered correctly
    const [rows] = await db.execute(`
      SELECT 
        id, classId, subjectId, teacherId, day, 
        TIME_FORMAT(startTime, '%H:%i') AS startTime, 
        TIME_FORMAT(endTime, '%H:%i') AS endTime
      FROM schedules
      ORDER BY FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"), startTime, endTime
    `);
    return NextResponse.json({ schedules: rows });
  } catch (error) {
    console.error('Failed to fetch schedules:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}

// CREATE a new schedule
export async function POST(req: NextRequest) {
  try {
    const { classId, subjectId, teacherId, day, startTime, endTime } = await req.json();

    if (!classId || !subjectId || !teacherId || !day || !startTime || !endTime) {
      return NextResponse.json({ message: 'Semua kolom harus diisi.' }, { status: 400 });
    }
    
    const scheduleId = `SCH-${nanoid()}`;

    await db.execute(
      'INSERT INTO schedules (id, classId, subjectId, teacherId, day, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [scheduleId, classId, subjectId, teacherId, day, startTime, endTime]
    );

    return NextResponse.json({ message: 'Jadwal berhasil ditambahkan.', scheduleId }, { status: 201 });
  } catch (error) {
    console.error('Failed to create schedule:', error);
    // Handle specific errors like duplicate entries if needed
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
