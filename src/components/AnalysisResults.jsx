import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { downloadCSV } from "../utils/fileDownload";
import { compareData } from "../utils/dataCompare";

function AnalysisResults({ data1, data2, mapping, onNextAnalysis, onFilterSpecificAnalysis }) {
  const [results, setResults] = useState({
    onlyIn1: [],
    onlyIn2: [],
    matched: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data1.length && data2.length && Object.keys(mapping).length) {
      setLoading(true);
      const comparisonResults = compareData(data1, data2, mapping);
      setResults(comparisonResults);
      setLoading(false);
    } else {
      // Reset results if data/mapping is cleared or not ready
      setResults({
        onlyIn1: [],
        onlyIn2: [],
        matched: [],
      });
      setLoading(false); // No data to compare
    }
  }, [data1, data2, mapping]);

  const renderGrid = (dataArray, title) => {
    if (loading) return <div className="p-4 text-center">Loading analysis results...</div>;
    if (!dataArray.length) return <div className="p-4">No records in this category.</div>;
    const columns = Object.keys(dataArray[0]);
    return (
      <>
        <div className="flex justify-between items-center mb-2">
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => downloadCSV(dataArray, `${title.replace(/\s/g, '_')}.csv`)}
          >
            Download CSV
          </button>
          <button
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
            onClick={() => onFilterSpecificAnalysis(dataArray, title)}
          >
            Further Filter
          </button>
        </div>
        <Grid
          data={dataArray.map((row) => columns.map((c) => row[c]))}
          columns={columns}
          search={true}
          pagination={{ enabled: true, limit: 10 }}
          sort={true}
        />
      </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <h1 className="text-2xl font-bold text-center">Analysis Results</h1>

      <div className="space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Records in Data1 but not in Data2</h2>
        {renderGrid(results.onlyIn1, "onlyIn1")}
      </div>

      <div className="space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Records in Data2 but not in Data1</h2>
        {renderGrid(results.onlyIn2, "onlyIn2")}
      </div>

      <div className="space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Matched Records</h2>
        {renderGrid(results.matched, "matched")}
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        onClick={onNextAnalysis}
      >
        Start New Analysis
      </button>
    </div>
  );
}

export default AnalysisResults;