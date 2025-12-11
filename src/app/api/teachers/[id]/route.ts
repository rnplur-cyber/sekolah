
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// DELETE a teacher
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'ID guru tidak ditemukan.' }, { status: 400 });
  }

  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    // 1. Remove teacher from any class they are a walikelas for
    await connection.execute('UPDATE classes SET walikelasId = NULL WHERE walikelasId = ?', [id]);
    
    // 2. Remove from teacher_classes association
    await connection.execute('DELETE FROM teacher_classes WHERE teacherId = ?', [id]);
    
    // 3. Remove user account associated with the teacher
    await connection.execute('DELETE FROM users WHERE teacherId = ?', [id]);

    // 4. Delete the teacher
    const [result]: any = await connection.execute('DELETE FROM teachers WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      await connection.rollback();
      connection.release();
      return NextResponse.json({ message: 'Guru tidak ditemukan.' }, { status: 404 });
    }

    await connection.commit();
    connection.release();

    return NextResponse.json({ message: 'Guru berhasil dihapus.' });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error(`Failed to delete teacher ${id}:`, error);
     if (error instanceof Error && 'code' in error && error.code === 'ER_ROW_IS_REFERENCED_2') {
        return NextResponse.json({ message: 'Gagal menghapus guru karena masih ada data jurnal atau jadwal yang terkait.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
