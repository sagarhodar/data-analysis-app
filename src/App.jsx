import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import DataPreview from './components/DataPreview';
import ColumnMapping from './components/ColumnMapping';
import AnalysisResults from './components/AnalysisResults';
import FilterAnalysis from './components/FilterAnalysis'; // New import

const App = () => {
  const [step, setStep] = useState(0); // 0: Upload, 1: Preview, 2: Mapping, 3: Results, 4: FilterAnalysis
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [headers1, setHeaders1] = useState([]);
  const [headers2, setHeaders2] = useState([]);
  const [mapping, setMapping] = useState({});
  const [analysisResults, setAnalysisResults] = useState(null); // To store the results from compareData
  const [filterSourceData, setFilterSourceData] = useState([]); // Data for further filtering
  const [filterSourceName, setFilterSourceName] = useState(''); // Name of the analysis result being filtered

  useEffect(() => {
    if (data1.length > 0) {
      setHeaders1(Object.keys(data1[0]));
    } else {
      setHeaders1([]);
    }
    if (data2.length > 0) {
      setHeaders2(Object.keys(data2[0]));
    } else {
      setHeaders2([]);
    }
  }, [data1, data2]);

  const handleFilesUploaded = (uploadedData1, uploadedData2) => {
    setData1(uploadedData1);
    setData2(uploadedData2);
    setStep(1); // Go to Data Preview
  };

  const handleNextFromPreview = () => {
    setStep(2); // Go to Column Mapping
  };

  const handleConfirmMapping = () => {
    // This is where you would trigger the initial comparison
    // The AnalysisResults component will call compareData internally
    setStep(3); // Go to Analysis Results
  };

  const handleNextAnalysis = () => {
    // Reset for a new comparison, or go back to mapping for new mapping
    setData1([]);
    setData2([]);
    setMapping({});
    setAnalysisResults(null);
    setFilterSourceData([]);
    setFilterSourceName('');
    setStep(0); // Go back to file upload
  };

  const handleFilterSpecificAnalysis = (sourceData, name) => {
    setFilterSourceData(sourceData);
    setFilterSourceName(name);
    setStep(4); // Go to Filter Analysis
  };

  const handleBackToResults = () => {
    setFilterSourceData([]);
    setFilterSourceName('');
    setStep(3); // Go back to main analysis results
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100"> {/* Added flex-col and min-h-screen */}
      <main className="flex-grow p-4"> {/* Added flex-grow to push footer down */}
        {step === 0 && <FileUpload onFilesUploaded={handleFilesUploaded} />}
        {step === 1 && (
          <div className="space-y-4">
            <DataPreview data1={data1} data2={data2} />
            <div className="max-w-6xl mx-auto text-right">
              <button
                onClick={handleNextFromPreview}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                Continue to Mapping
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <ColumnMapping
            headers1={headers1}
            headers2={headers2}
            mapping={mapping}
            setMapping={setMapping}
            onNext={handleConfirmMapping}
          />
        )}
        {step === 3 && (
          <AnalysisResults
            data1={data1}
            data2={data2}
            mapping={mapping}
            onNextAnalysis={handleNextAnalysis}
            onFilterSpecificAnalysis={handleFilterSpecificAnalysis} // Pass this down
          />
        )}
        {step === 4 && (
          <FilterAnalysis
            originalData={filterSourceData}
            analysisName={filterSourceName}
            onBack={handleBackToResults}
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 text-sm mt-8">
        <p>&copy; {new Date().getFullYear()} Data Analysis App. Developed by Sagar Hodar (hodarsagar@gmail.com).</p>
      </footer>
    </div>
  );
};

export default App;