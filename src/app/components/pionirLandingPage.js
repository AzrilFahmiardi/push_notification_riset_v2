import { useState } from 'react';
import { requestForToken } from '@/firebase/messaging';

export default function PionirLandingPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isTokenFound, setIsTokenFound] = useState(false);

  const fetchToken = async () => {
    const token = await requestForToken();
    if (token) {
      setIsTokenFound(true);
      console.log('Token retrieved:', token);
      return token;
    } else {
      console.warn('No token found.');
      setIsTokenFound(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Fetch the token
      const token = await fetchToken();
      if (!token) {
        setResult({ success: false, message: 'Token not found' });
        return;
      }  
      console.log('Token successfully retrieved and ready for use:', token);
      setResult({ success: true, message: 'Token successfully retrieved!' });
    } catch (error) {
      console.error('Error:', error);
      setResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-800 to-blue-600">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10 text-center">
        <div className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">PIONIR GADJAH MADA 2025</h1>
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
    </div>
  );
}