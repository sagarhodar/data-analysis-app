import React, { useState, useEffect } from 'react';
import { Grid } from 'gridjs-react';
import { downloadCSV } from '../utils/fileDownload';

function FilterAnalysis({ originalData, analysisName, onBack }) {
  const [filteredData, setFilteredData] = useState([]);
  const [columnToFilter, setColumnToFilter] = useState('');
  const [filterType, setFilterType] = useState('equals'); // 'equals', 'contains', 'range'
  const [filterValue, setFilterValue] = useState('');
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [error, setError] = useState('');

  const headers = originalData.length > 0 ? Object.keys(originalData[0]) : [];

  useEffect(() => {
    setFilteredData(originalData); // Initialize with all data
    setError('');
  }, [originalData]);

  const applyFilter = () => {
    setError('');
    if (!columnToFilter) {
      setError('Please select a column to filter.');
      return;
    }

    let tempFilteredData = [...originalData];

    try {
      if (filterType === 'equals') {
        if (!filterValue) {
          setError('Filter value cannot be empty for "equals" filter.');
          return;
        }
        tempFilteredData = tempFilteredData.filter(row =>
          String(row[columnToFilter]).toLowerCase() === String(filterValue).toLowerCase()
        );
      } else if (filterType === 'contains') {
        if (!filterValue) {
          setError('Filter value cannot be empty for "contains" filter.');
          return;
        }
        tempFilteredData = tempFilteredData.filter(row =>
          String(row[columnToFilter]).toLowerCase().includes(String(filterValue).toLowerCase())
        );
      } else if (filterType === 'range') {
        const start = parseFloat(rangeStart);
        const end = parseFloat(rangeEnd);

        if (isNaN(start) || isNaN(end)) {
          setError('Please enter valid numbers for the range.');
          return;
        }
        if (start > end) {
          setError('Range start cannot be greater than range end.');
          return;
        }

        tempFilteredData = tempFilteredData.filter(row => {
          const cellValue = parseFloat(row[columnToFilter]);
          return !isNaN(cellValue) && cellValue >= start && cellValue <= end;
        });
      }
      setFilteredData(tempFilteredData);
    } catch (e) {
      setError(`Error applying filter: ${e.message}`);
    }
  };

  const renderGrid = (dataArray) => {
    if (!dataArray.length) return <div className="p-4">No records</div>;
    const columns = Object.keys(dataArray[0]);
    return (
      <Grid
        data={dataArray.map((row) => columns.map((c) => row[c]))}
        columns={columns}
        search={true}
        pagination={{ enabled: true, limit: 10 }}
        sort={true}
      />
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <h2 className="text-xl font-bold text-center">Further Analysis on: {analysisName}</h2>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold">Apply Additional Filter</h3>
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={columnToFilter}
            onChange={(e) => {
              setColumnToFilter(e.target.value);
              setError('');
            }}
            className="border p-2 rounded flex-grow"
          >
            <option value="">Select Column</option>
            {headers.map(header => (
              <option key={header} value={header}>{header}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValue(''); // Reset value when type changes
              setRangeStart('');
              setRangeEnd('');
              setError('');
            }}
            className="border p-2 rounded flex-grow"
          >
            <option value="equals">Equals</option>
            <option value="contains">Contains</option>
            <option value="range">Numeric Range</option>
          </select>

          {filterType === 'range' ? (
            <>
              <input
                type="number"
                placeholder="Start"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
                className="border p-2 rounded flex-grow"
              />
              <input
                type="number"
                placeholder="End"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
                className="border p-2 rounded flex-grow"
              />
            </>
          ) : (
            <input
              type="text"
              placeholder={`Filter value for "${filterType}"`}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="border p-2 rounded flex-grow"
            />
          )}

          <button
            onClick={applyFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 min-w-[120px]"
          >
            Apply Filter
          </button>
          <button
            onClick={() => {
              setFilteredData(originalData);
              setError('');
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 min-w-[120px]"
          >
            Reset Filter
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Filtered Results ({filteredData.length} records)</h2>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded mb-2"
          onClick={() => downloadCSV(filteredData, `${analysisName}_filtered.csv`)}
        >
          Download CSV
        </button>
        {renderGrid(filteredData)}
      </div>

      <button
        onClick={onBack}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back to Main Analysis
      </button>
    </div>
  );
}

export default FilterAnalysis;