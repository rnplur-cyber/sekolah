
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// DELETE a schedule entry
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'ID jadwal tidak ditemukan.' }, { status: 400 });
  }

  try {
    const [result]: any = await db.execute('DELETE FROM schedules WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Entri jadwal tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Entri jadwal berhasil dihapus.' });
  } catch (error) {
    console.error(`Failed to delete schedule ${id}:`, error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
