import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [numWords, setNumWords] = useState(10);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/fetch-words', {
        url,
        numWords: parseInt(numWords)
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setResults(response.data.words);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Most Frequent Words</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            value={numWords}
            onChange={(e) => setNumWords(e.target.value)}
            placeholder="Number of words"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Fetch Words
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {results.length > 0 && (
          <table className="mt-6 w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Word</th>
                <th className="px-4 py-2">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{item.word}</td>
                  <td className="px-4 py-2 text-center">{item.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;