// src/app/daftar/page.tsx
'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function PPDBPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // State form
  const [form, setForm] = useState({
    student_name: '', nisn: '', nik: '', birth_place: '', 
    birth_date: '', gender: 'L', address: '', parent_name: '', 
    parent_phone: '', previous_school: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return alert('Silakan login terlebih dahulu')
    
    setLoading(true)
    const res = await fetch('/api/ppdb', {
      method: 'POST',
      body: JSON.stringify({ ...form, user_id: user.id })
    })
    if (res.ok) {
      alert('Pendaftaran Berhasil!')
      router.push('/status')
    } else {
      alert('Gagal mendaftar')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-lg mt-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">Formulir PPDB SD/MI</h1>
      <p className="mb-6 text-gray-600">Tahun Ajaran 2024/2025</p>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kolom Input */}
        <div className="col-span-2">
          <label className="block text-sm font-medium">Nama Lengkap Anak</label>
          <input type="text" required className="w-full border p-2 rounded" onChange={e => setForm({...form, student_name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium">NISN (Opsional)</label>
          <input type="text" className="w-full border p-2 rounded" onChange={e => setForm({...form, nisn: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium">NIK (Wajib)</label>
          <input type="text" required className="w-full border p-2 rounded" onChange={e => setForm({...form, nik: e.target.value})} />
        </div>
        {/* Tambahkan input lain sesuai kebutuhan... */}
        <div>
          <label className="block text-sm font-medium">Tempat Lahir</label>
          <input type="text" required className="w-full border p-2 rounded" onChange={e => setForm({...form, birth_place: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium">Tanggal Lahir</label>
          <input type="date" required className="w-full border p-2 rounded" onChange={e => setForm({...form, birth_date: e.target.value})} />
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium">Alamat</label>
          <textarea required className="w-full border p-2 rounded" onChange={e => setForm({...form, address: e.target.value})}></textarea>
        </div>

        <div className="col-span-2 border-t pt-4 mt-4">
          <h2 className="font-bold mb-2">Data Orang Tua</h2>
        </div>
        <div>
          <label className="block text-sm font-medium">Nama Orang Tua</label>
          <input type="text" required className="w-full border p-2 rounded" onChange={e => setForm({...form, parent_name: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium">No. HP Orang Tua</label>
          <input type="tel" required className="w-full border p-2 rounded" onChange={e => setForm({...form, parent_phone: e.target.value})} />
        </div>

        <div className="col-span-2">
          <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white p-3 rounded font-bold hover:bg-blue-800 disabled:bg-gray-400">
            {loading ? 'Mengirim...' : 'KIRIM PENDAFTARAN'}
          </button>
        </div>
      </form>
    </div>
  )
}