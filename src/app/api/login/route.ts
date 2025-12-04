// IMPORTANT: This is a mock API for demonstration.
// In a real application, connect to a database and use a secure session management strategy.
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Mock user data - replace with your database query
const users = [
    {
        id: 'user-admin-001',
        email: 'admin@sekolah.com',
        // Hashed password for "password" using bcrypt
        passwordHash: '$2a$10$9Y.K/g6./y.Zk.vOEPLfA.HqX1Qc8LhGg2jXJm8.u5Yd.3.Qc8lza',
        role: 'admin',
        name: 'Admin User'
    }
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email dan password harus diisi.' }, { status: 400 });
    }

    // Find user in the mock database
    const user = users.find(u => u.email === email);

    if (!user) {
      return NextResponse.json({ message: 'Email atau password salah.' }, { status: 401 });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Email atau password salah.' }, { status: 401 });
    }
    
    // In a real app, you would create a session/JWT here.
    // For this demo, we'll just return user info.
    const { passwordHash, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}
