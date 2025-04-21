import { useState } from 'react';

export default function PionirLandingPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Pionir Gadjah Mada 2025',
          body: 'Hai Sobat Gamada, nantikan notifikasi dari kami yaa!',
          data: { url: window.location.origin }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error sending notification:', error);
      setResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-800 to-blue-600">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center bg-blue-900 bg-opacity-50">
        <div className="flex items-center">
          {/* <img src="/api/placeholder/50/50" alt="Logo UGM" className="h-10 w-10 mr-3" /> */}
          <h1 className="text-white font-bold text-xl">UGM</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-white hover:text-yellow-300">Beranda</a></li>
            <li><a href="#" className="text-white hover:text-yellow-300">Tentang</a></li>
            <li><a href="#" className="text-white hover:text-yellow-300">Kontak</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10 text-center">
        <div className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          {/* <img src="/api/placeholder/150/150" alt="Logo Pionir" className="mx-auto h-24 w-24 mb-6" /> */}
          
          <h1 className="text-4xl font-bold text-blue-600 mb-4">PIONIR GADJAH MADA 2025</h1>
          {/* <h2 className="text-2xl font-semibold text-yellow-300 mb-6">Ospek Universitas Gadjah Mada</h2> */}
          
          <p className="text-yellow-300 text-lg mb-8">
            Selamat datang calon mahasiswa baru! Mari bergabung dalam perjalanan awal yang mengesankan di kampus perjuangan Universitas Gadjah Mada.
          </p>
          
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-64 h-16 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg rounded-full px-6 py-3 shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 disabled:bg-gray-400 disabled:transform-none"
              >
                {loading ? 'Memproses...' : 'Nyalakan Notifikasi!'}
              </button>
              
              {result && result.success && (
                <p className="mt-4 text-green-300">Notifikasi berhasil diaktifkan!</p>
              )}
              
              {result && !result.success && (
                <p className="mt-4 text-red-300">Gagal mengaktifkan notifikasi</p>
              )}
            </form>
          </div>
          
          <p className="text-white text-sm mt-8">
            Dapatkan informasi terbaru seputar kegiatan Pionir Gadjah Mada 2025 melalui notifikasi yang akan kami kirimkan.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 py-6 px-4 text-center">
        <p className="text-white mb-2">© 2025 Pionir Gadjah Mada - Universitas Gadjah Mada</p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="text-white hover:text-yellow-300">
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-yellow-300">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-yellow-300">
            <span className="sr-only">YouTube</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.499 6.203a3.008 3.008 0 00-2.089-2.089c-1.87-.501-9.4-.501-9.4-.501s-7.509-.01-9.399.501a3.008 3.008 0 00-2.088 2.09A31.258 31.26 0 000 12.01a31.258 31.26 0 00.523 5.785 3.008 3.008 0 002.088 2.089c1.869.502 9.4.502 9.4.502s7.508 0 9.399-.502a3.008 3.008 0 002.089-2.09 31.258 31.26 0 00.5-5.784 31.258 31.26 0 00-.5-5.808zm-13.891 9.4V8.407l6.266 3.604z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}