import React, { useState, useEffect } from 'react';

function ColumnMapping({ headers1, headers2, mapping, setMapping, onNext }) {
  // 'mapping' will now store a single object like { data1Key: 'columnInData1', data2Key: 'columnInData2' }
  const [selectedKey1, setSelectedKey1] = useState(mapping.data1Key || '');
  const [selectedKey2, setSelectedKey2] = useState(mapping.data2Key || '');
  const [error, setError] = useState('');

  useEffect(() => {
    // Attempt to auto-suggest a common key if possible
    const commonHeaders = headers1.filter(h1 => headers2.includes(h1));
    if (commonHeaders.length === 1) {
      setSelectedKey1(commonHeaders[0]);
      setSelectedKey2(commonHeaders[0]);
    } else if (commonHeaders.length > 1) {
        // If multiple common headers, maybe prioritize 'id', 'key', 'name', etc.
        const preferredKeys = ['id', 'key', 'code', 'name'];
        for (const pk of preferredKeys) {
            if (commonHeaders.includes(pk)) {
                setSelectedKey1(pk);
                setSelectedKey2(pk);
                break;
            }
        }
    }
  }, [headers1, headers2]);

  const handleNext = () => {
    if (!selectedKey1 || !selectedKey2) {
      setError('Please select a key column from both Data 1 and Data 2 for comparison.');
      return;
    }
    setMapping({ data1Key: selectedKey1, data2Key: selectedKey2 });
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-6">
      <h2 className="text-xl font-semibold text-center">Select Key Columns for Comparison</h2>
      <p className="text-gray-600 text-center">
        Choose one unique identifier column from each dataset to compare records.
      </p>

      <div>
        <label htmlFor="keyColumn1" className="block text-sm font-medium text-gray-700 mb-1">
          Data 1 Key Column:
        </label>
        <select
          id="keyColumn1"
          value={selectedKey1}
          onChange={(e) => {
            setSelectedKey1(e.target.value);
            setError('');
          }}
          className="border p-2 w-full rounded"
        >
          <option value="">Select a key column for Data 1</option>
          {headers1.map((h1) => (
            <option key={h1} value={h1}>
              {h1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="keyColumn2" className="block text-sm font-medium text-gray-700 mb-1">
          Data 2 Key Column:
        </label>
        <select
          id="keyColumn2"
          value={selectedKey2}
          onChange={(e) => {
            setSelectedKey2(e.target.value);
            setError('');
          }}
          className="border p-2 w-full rounded"
        >
          <option value="">Select a key column for Data 2</option>
          {headers2.map((h2) => (
            <option key={h2} value={h2}>
              {h2}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        onClick={handleNext}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Confirm Key Columns
      </button>
    </div>
  );
}

export default ColumnMapping;