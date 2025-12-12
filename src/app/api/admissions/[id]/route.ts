
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 5);

// UPDATE an applicant's status
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'ID pendaftar tidak ditemukan.' }, { status: 400 });
  }

  const connection = await db.getConnection();

  try {
    const { status } = await req.json();

    if (!status || !['Accepted', 'Rejected', 'Pending'].includes(status)) {
        return NextResponse.json({ message: 'Status tidak valid.' }, { status: 400 });
    }
    
    await connection.beginTransaction();
    
    // 1. Update applicant status
    const [updateResult]: any = await connection.execute(
      'UPDATE newStudentApplicants SET status = ? WHERE id = ?',
      [status, id]
    );

    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      return NextResponse.json({ message: 'Pendaftar tidak ditemukan.' }, { status: 404 });
    }
    
    // 2. If accepted, create a new student record
    if (status === 'Accepted') {
        const [applicants]: any = await connection.execute('SELECT * FROM newStudentApplicants WHERE id = ?', [id]);
        const applicant = applicants[0];

        // Check if student already exists
        const [existingStudents]: any = await connection.execute('SELECT id FROM students WHERE applicantId = ?', [id]);
        if (existingStudents.length > 0) {
            await connection.commit();
            return NextResponse.json({ message: 'Status diperbarui. Siswa sudah ada untuk pendaftar ini.' });
        }

        const studentId = `SIS-${nanoid()}`;

        // Find a default class to assign the new student.
        // This logic can be improved later (e.g., assign to the least populated class)
        const [classes]: any = await connection.execute('SELECT id FROM classes ORDER BY name ASC LIMIT 1');
        const classId = classes.length > 0 ? classes[0].id : null;

        if (!classId) {
            await connection.rollback();
            return NextResponse.json({ message: 'Tidak ada kelas yang tersedia untuk menempatkan siswa baru. Buat kelas terlebih dahulu.'}, { status: 409 });
        }
        
        const avatarUrl = `https://picsum.photos/seed/${studentId}/100/100`;
        const avatarHint = 'person portrait';

        await connection.execute(
            'INSERT INTO students (id, name, classId, avatarUrl, avatarHint, applicantId) VALUES (?, ?, ?, ?, ?, ?)',
            [studentId, applicant.name, classId, avatarUrl, avatarHint, id]
        );
    }
    
    await connection.commit();
    return NextResponse.json({ message: `Status pendaftar telah diubah menjadi ${status}.` });

  } catch (error) {
    await connection.rollback();
    console.error(`Failed to update applicant ${id}:`, error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  } finally {
    connection.release();
  }
}
