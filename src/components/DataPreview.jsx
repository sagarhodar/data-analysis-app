import React from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

function DataPreview({ data1, data2 }) {
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
      <div>
        <h2 className="text-lg font-semibold">Data 1 Preview</h2>
        {renderGrid(data1)}
      </div>
      <div>
        <h2 className="text-lg font-semibold">Data 2 Preview</h2>
        {renderGrid(data2)}
      </div>
    </div>
  );
}

export default DataPreview;
