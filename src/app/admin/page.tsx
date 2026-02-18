// src/app/admin/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { supabaseAdmin } from '@/lib/supabase' // Menggunakan Admin Client

export default function AdminDashboard() {
  const [registrants, setRegistrants] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('ppdb')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Fetch PPDB Data
    const { data: ppdb } = await supabaseAdmin.from('ppdb_registrations').select('*').order('created_at', { ascending: false })
    if (ppdb) setRegistrants(ppdb)
  }

  // LOGIKA INTEGRASI: Terima Siswa
  const handleAccept = async (applicant: any) => {
    // 1. Masukkan ke tabel students
    const { error: insertError } = await supabaseAdmin.from('students').insert([{
      ppdb_id: applicant.id,
      nisn: applicant.nisn,
      nik: applicant.nik,
      name: applicant.student_name,
      status: 'active'
    }])

    if (insertError) return alert('Gagal memasukkan data: ' + insertError.message)

    // 2. Update status di PPDB menjadi 'accepted'
    await supabaseAdmin.from('ppdb_registrations').update({ status: 'accepted' }).eq('id', applicant.id)
    
    alert('Siswa berhasil diterima!')
    fetchData() // Refresh data
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
      
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setActiveTab('ppdb')} className={`p-2 rounded ${activeTab === 'ppdb' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>PPDB Masuk</button>
        <button onClick={() => setActiveTab('siswa')} className={`p-2 rounded ${activeTab === 'siswa' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Data Siswa Aktif</button>
      </div>

      {activeTab === 'ppdb' && (
        <table className="w-full text-sm border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nama</th>
              <th className="border p-2">Orang Tua</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {registrants.map((r) => (
              <tr key={r.id}>
                <td className="border p-2">{r.student_name}</td>
                <td className="border p-2">{r.parent_name} ({r.parent_phone})</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-xs ${r.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="border p-2">
                  {r.status === 'pending' && (
                    <button onClick={() => handleAccept(r)} className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                      Terima & Pindah ke SIS
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}