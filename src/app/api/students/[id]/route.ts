
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// DELETE a student
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'ID siswa tidak ditemukan.' }, { status: 400 });
  }

  try {
    // TODO: Handle related data like attendance records if necessary before deleting

    const [result]: any = await db.execute('DELETE FROM students WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Siswa tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Siswa berhasil dihapus.' });
  } catch (error) {
    console.error(`Failed to delete student ${id}:`, error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
