import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: "API çalışıyor! RSS botu hazır.",
    time: new Date().toISOString()
  });
}
