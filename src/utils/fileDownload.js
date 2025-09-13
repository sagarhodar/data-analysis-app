import { saveAs } from "file-saver";

export function downloadCSV(dataArray, filename) {
  if (!dataArray.length) {
    alert("No data to download");
    return;
  }
  const headers = Object.keys(dataArray[0]);
  const csvRows = [
    headers.join(","), // header row
    ...dataArray.map((row) => headers.map((h) => `"${row[h] ?? ""}"`).join(",")),
  ];
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}
