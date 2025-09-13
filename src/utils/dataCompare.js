// Utility to compare data arrays based on a single key column mapping
export function compareData(data1, data2, mapping) {
  const onlyIn1 = [];
  const onlyIn2 = [];
  const matched = [];

  const { data1Key, data2Key } = mapping;

  if (!data1Key || !data2Key) {
    console.error("Comparison failed: Key columns not provided in mapping.");
    return { onlyIn1: [...data1], onlyIn2: [...data2], matched: [] };
  }

  // Create a lookup for data2 using the specified data2Key column
  // Using a Map to handle potential duplicate keys in data2 and to store original rows
  const data2Lookup = new Map(); // key -> array of data2 rows

  data2.forEach((row2) => {
    const key2Value = String(row2[data2Key]).toLowerCase();
    if (key2Value) { // Only add if key value is not empty/null/undefined
      if (!data2Lookup.has(key2Value)) {
        data2Lookup.set(key2Value, []);
      }
      data2Lookup.get(key2Value).push(row2);
    }
  });

  // Track keys from data2 that have been matched to avoid adding them to onlyIn2
  const matchedData2Keys = new Set();

  // Iterate through data1 to find matches and determine onlyIn1
  data1.forEach((row1) => {
    const key1Value = String(row1[data1Key]).toLowerCase();

    if (key1Value && data2Lookup.has(key1Value)) {
      // Match found
      const matchingData2Rows = data2Lookup.get(key1Value);
      // For simplicity, we match the first available data2 row.
      // If data2 has duplicates, only the first one will be "matched" this way.
      // Other duplicates in data2 with the same key will fall into onlyIn2.
      if (matchingData2Rows.length > 0) {
        const matchedRow2 = matchingData2Rows.shift(); // Remove the matched row from lookup
        matched.push({ ...row1, ...matchedRow2 }); // Merge matched rows
        matchedData2Keys.add(key1Value); // Mark the key as matched
      }

      if (matchingData2Rows.length === 0) {
        data2Lookup.delete(key1Value); // If no more data2 rows for this key, remove it from lookup
      }

    } else {
      // No match found in data2, or key1Value is empty
      onlyIn1.push({ ...row1 });
    }
  });

  // Iterate through the remaining items in data2Lookup to find onlyIn2 records
  data2Lookup.forEach((rows) => {
    rows.forEach(row => {
        onlyIn2.push({ ...row });
    });
  });

  return { onlyIn1, onlyIn2, matched };
}