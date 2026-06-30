import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "RSS Bot geçici devre dışı (hata düzeltiliyor)" });
}
