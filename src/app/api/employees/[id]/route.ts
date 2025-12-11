
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// UPDATE an employee
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'ID karyawan tidak ditemukan.' }, { status: 400 });
  }
  
  try {
    const { name, role } = await req.json();

    if (!name || !role) {
      return NextResponse.json({ message: 'Nama dan jabatan harus diisi.' }, { status: 400 });
    }

    await db.execute(
      'UPDATE employees SET name = ?, role = ? WHERE id = ?',
      [name, role, id]
    );

    return NextResponse.json({ message: 'Data karyawan berhasil diperbarui.' });

  } catch (error) {
    console.error(`Failed to update employee ${id}:`, error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}


// DELETE an employee
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'ID karyawan tidak ditemukan.' }, { status: 400 });
  }

  try {
    // TODO: Handle related data like attendance if necessary
    
    const [result]: any = await db.execute('DELETE FROM employees WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Karyawan tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Karyawan berhasil dihapus.' });
  } catch (error) {
    console.error(`Failed to delete employee ${id}:`, error);
    // You can add more specific error handling, e.g., for foreign key constraints
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
