
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

// GET all employees
export async function GET() {
  try {
    const [rows]: any = await db.execute(`
      SELECT 
        id, name, role, avatarUrl, avatarHint
      FROM employees
      ORDER BY name ASC
    `);
    
    return NextResponse.json({ employees: rows });
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}

// CREATE a new employee
export async function POST(req: NextRequest) {
  try {
    const { name, role, avatarUrl, avatarHint } = await req.json();

    if (!name || !role) {
      return NextResponse.json({ message: 'Nama dan jabatan harus diisi.' }, { status: 400 });
    }

    const employeeId = `EMP-${nanoid()}`;

    await db.execute(
        'INSERT INTO employees (id, name, role, avatarUrl, avatarHint) VALUES (?, ?, ?, ?, ?)',
        [employeeId, name, role, avatarUrl || `https://picsum.photos/seed/${employeeId}/100/100`, avatarHint || 'person portrait']
    );

    return NextResponse.json({ message: 'Karyawan berhasil ditambahkan.', employeeId }, { status: 201 });

  } catch (error) {
    console.error('Failed to create employee:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
