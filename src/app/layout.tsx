// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIS SD/MI - Sistem Informasi Sekolah",
  description: "Sistem Informasi Siswa & PPDB SD/MI Terintegrasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto p-4 min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

// Komponen Navbar Sederhana
function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="font-bold text-xl">SD/MI Digital</a>
        <div className="space-x-4">
          <a href="/daftar" className="hover:underline">PPDB Online</a>
          <a href="/admin" className="hover:underline">Admin</a>
        </div>
      </div>
    </nav>
  )
}