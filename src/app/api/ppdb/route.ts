// src/app/api/ppdb/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase' // Menggunakan client biasa karena sudah ada user_id

export async function POST(request: Request) {
  const body = await request.json()
  
  const { data, error } = await supabase.from('ppdb_registrations').insert([body])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ data }, { status: 201 })
}