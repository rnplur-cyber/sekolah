
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// DELETE a subject
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ message: 'ID mata pelajaran tidak ditemukan.' }, { status: 400 });
  }

  try {
    const [result]: any = await db.execute('DELETE FROM subjects WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Mata pelajaran tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Mata pelajaran berhasil dihapus.' });
  } catch (error) {
    console.error(`Failed to delete subject ${id}:`, error);
    // Catch foreign key constraint error
    if (error instanceof Error && 'code' in error && error.code === 'ER_ROW_IS_REFERENCED_2') {
        return NextResponse.json({ message: 'Gagal menghapus mata pelajaran karena masih digunakan oleh data guru atau jadwal.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
