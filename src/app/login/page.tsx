// src/app/login/page.tsx
'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password, name)
      }
      router.push('/')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Daftar Akun'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input type="text" placeholder="Nama Lengkap (Orang Tua)" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">{isLogin ? 'Login' : 'Daftar'}</button>
      </form>
      <p className="text-center mt-4 text-sm">
        {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 ml-1 font-semibold">
          {isLogin ? 'Daftar Disini' : 'Login Disini'}
        </button>
      </p>
    </div>
  )
}