// src/app/components/SendNotification.js
import { useState } from 'react';

export default function SendNotification() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // di SendNotification.js, fungsi handleSubmit
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
            title,
            body,
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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Kirim Notifikasi</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Judul:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Pesan:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Mengirim...' : 'Kirim Notifikasi'}
        </button>
      </form>
      
      {result && (
        <div className={`mt-4 p-3 rounded ${result.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <p>{result.message}</p>
          {result.response && (
            <pre className="mt-2 text-sm bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(result.response, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}