import React, { useState } from 'react';
import Papa from 'papaparse';

function FileUpload({ onFilesUploaded }) {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e, fileNumber) => {
    if (fileNumber === 1) {
      setFile1(e.target.files[0]);
    } else {
      setFile2(e.target.files[0]);
    }
    setError('');
  };

  const parseFile = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data.length === 0) {
            reject("File is empty or headers are missing.");
            return;
          }
          resolve(results.data);
        },
        error: (err) => {
          reject(`Error parsing file: ${err.message}`);
        },
      });
    });
  };

  const handleUpload = async () => {
    if (!file1 || !file2) {
      setError('Please select both CSV files.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data1 = await parseFile(file1);
      const data2 = await parseFile(file2);
      onFilesUploaded(data1, data2);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">CSV Data Analysis</h1>

      <div>
        <label htmlFor="file1" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Data 1 (CSV)
        </label>
        <input
          type="file"
          id="file1"
          accept=".csv"
          onChange={(e) => handleFileChange(e, 1)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {file1 && <p className="text-sm text-gray-600 mt-2">Selected: {file1.name}</p>}
      </div>

      <div>
        <label htmlFor="file2" className="block text-sm font-medium text-gray-700 mb-1">
          Upload Data 2 (CSV)
        </label>
        <input
          type="file"
          id="file2"
          accept=".csv"
          onChange={(e) => handleFileChange(e, 2)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {file2 && <p className="text-sm text-gray-600 mt-2">Selected: {file2.name}</p>}
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading || !file1 || !file2}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Upload & Preview Data'}
      </button>
    </div>
  );
}

export default FileUpload;