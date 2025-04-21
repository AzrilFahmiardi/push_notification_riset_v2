'use client';

import { useEffect } from 'react';
import { onMessageListener } from '../firebase/messaging';
import { useNotification } from '../hooks/useNotification';
import SendNotification from './components/sendNotification';

export default function Page() {
  const notification = useNotification(); // Menggunakan hook untuk menangani requestForToken

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((err) => {
          console.log('SW registration failed:', err);
        });
    }

    onMessageListener()
      .then((payload) => {
        console.log('Received in foreground:', payload);
        alert(payload.notification.title);
      })
      .catch((err) => console.log('onMessage error:', err));
  }, []);

  // return (
  //   <main className="min-h-screen p-4">
  //     <h1 className="text-2xl font-bold mb-6">Firebase FCM Demo</h1>
      
  //     <SendNotification />
  //   </main>
  // );

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white p-4">
      {/* Header */}
      <header className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-yellow-500 rounded-full p-2 mr-3">
            
          </div>
          <h1 className="text-xl font-bold">PIONIR GADJAH MADA 2025</h1>
        </div>
        
        <nav className="flex space-x-4">
          <a href="#tentang" className="px-3 py-2 hover:bg-blue-800 rounded-lg transition-colors">Tentang</a>
          <a href="#kategori" className="px-3 py-2 hover:bg-blue-800 rounded-lg transition-colors">Kategori</a>
          <a href="#daftar" className="px-3 py-2 hover:bg-blue-800 rounded-lg transition-colors">Daftar</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto text-center py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">PIONIR GADJAH MADA 2025</h2>
        <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-2xl mx-auto">Kompetisi Nasional Mahasiswa dalam Bidang Ilmu Pengetahuan dan Inovasi</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-8 rounded-lg transition-colors">
          Daftar Sekarang
        </button>
      </section>
      
      {/* Tentang Section */}
      <section id="tentang" className="container mx-auto py-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Tentang PIONIR</h3>
        <div className="bg-blue-800 bg-opacity-30 p-6 rounded-xl">
          <p className="text-center max-w-3xl mx-auto">
            Pionir Gadjah Mada adalah kompetisi nasional tingkat mahasiswa yang bertujuan untuk memfasilitasi
            pengembangan potensi mahasiswa Indonesia dalam bidang ilmu pengetahuan, teknologi, dan inovasi sosial.
            Diselenggarakan oleh Universitas Gadjah Mada, kompetisi ini merupakan ajang bergengsi untuk menunjukkan
            kreativitas dan ide-ide inovatif.
          </p>
        </div>
      </section>
      
      
      {/* Footer */}
      <footer className="container mx-auto border-t border-blue-800 mt-12 py-6 text-center text-blue-300">
        <p>&copy; 2025 Pionir Gadjah Mada - Universitas Gadjah Mada</p>
        <p className="mt-2">Email: pionir@ugm.ac.id | Telepon: +62 274 123456</p>
      </footer>
    </main>
  );
}