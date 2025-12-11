
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// DELETE a class
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'ID kelas tidak ditemukan.' }, { status: 400 });
  }

  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    // 1. Set walikelasId to NULL in classes table
    await connection.execute('UPDATE classes SET walikelasId = NULL WHERE id = ?', [id]);
    
    // 2. Delete from teacher_classes
    await connection.execute('DELETE FROM teacher_classes WHERE classId = ?', [id]);
    
    // 3. TODO: Handle students in the class, maybe set classId to NULL or delete them
    // For now, we'll just delete the class
    
    // 4. Delete the class itself
    const [result]: any = await connection.execute('DELETE FROM classes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      await connection.rollback();
      connection.release();
      return NextResponse.json({ message: 'Kelas tidak ditemukan.' }, { status: 404 });
    }
    
    await connection.commit();
    connection.release();

    return NextResponse.json({ message: 'Kelas berhasil dihapus.' });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error(`Failed to delete class ${id}:`, error);
    // Check for foreign key constraint errors specifically if needed
    if (error instanceof Error && 'code' in error && error.code === 'ER_ROW_IS_REFERENCED_2') {
        return NextResponse.json({ message: 'Gagal menghapus kelas karena masih ada data siswa atau jadwal yang terkait. Harap hapus data tersebut terlebih dahulu.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
