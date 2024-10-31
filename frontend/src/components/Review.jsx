import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Review() {
  // Access the state passed from the previous page
  const location = useLocation();
  const { predictions, prediction_probs, graph, pie, finaldf, pie2 } = location.state || {};

  const [chartData, setChartData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null); // Track the selected filter

  // Define filter categories and their corresponding values
  const filters = {
    Gender: [0, 1], // 0: Female, 1: Male
    SeniorCitizen: [0, 1], // 0: No, 1: Yes
    Partner: [0, 1], // 0: No, 1: Yes
    Dependents: [0, 1], // 0: No, 1: Yes
    PhoneService: [0, 1], // 0: No, 1: Yes
    MultipleLines: [0, 1, 2], // 0: No, 1: Yes, 2: No Phone
    InternetService: [0, 1, 2], // 0: DSL, 1: Fiber Optics, 2: No
    OnlineSecurity: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    OnlineBackup: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    DeviceProtection: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    TechSupport: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    StreamingTV: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    StreamingMovies: [0, 1, 2], // 0: No Internet, 1: No, 2: Yes
    Contract: [0, 1, 2], // 0: Month to Month, 1: One Year, 2: Two Year
    PaperlessBilling: [0, 1], // 0: No, 1: Yes
    PaymentMethod: [0, 1, 2, 3] // 0: Bank Transfer, 1: Credit Card, 2: Mailed Check, 3: Electronic Check
  };

  // Handle filter button click
  const handleFilterClick = async (filter) => {
    const value = filters[filter]; // Get the values for the selected filter
    
    setSelectedFilter(filter); // Update selected filter

    try {
      const response = await axios.post('http://127.0.0.1:5000/get-chart', { filter, value, finaldf });
      setChartData(response.data.pie2); // Set the received chart data
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setChartData(null);
    }
  };

  // Reset selected filter and chart data
  const handleReset = () => {
    setSelectedFilter(null);
    setChartData(null);
  };




  const handleDownload = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/download-csv', { finaldf }, {
        responseType: 'blob', // Specify blob to handle file download
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'filtered_data.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };






  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    // Capture the table
    const table = document.getElementById('prediction-table');
    const tableCanvas = await html2canvas(table);
    const tableImgData = tableCanvas.toDataURL('image/png');
    doc.text('Prediction Results', 10, 10);
    doc.addImage(tableImgData, 'PNG', 10, 20, 190, 0);

    // Capture the pie chart
    if (pie) {
      const pieImg = new Image();
      pieImg.src = `data:image/png;base64,${pie}`;
      doc.addPage();
      doc.text('Churn Distribution', 10, 10);
      doc.addImage(pieImg, 'PNG', 10, 20, 150, 0);
    }

    // Capture the additional analysis chart
    if (graph) {
      const graphImg = new Image();
      graphImg.src = `data:image/png;base64,${graph}`;
      doc.addPage();
      doc.text('Additional Analysis', 10, 10);
      doc.addImage(graphImg, 'PNG', 10, 20, 150, 0);
    }

    doc.save('report.pdf');
  };



  return (
    <div className="container">
      <h2 className='text-center text-primary fw-bold text-decoration-underline mt-4 mb-4' >Prediction Results</h2>
      <table className="table table-bordered"  id="prediction-table">
        <thead>
          <tr className='text-center fw-bold'>
            <th className='bg-info'>Customer Index</th>
            <th className='bg-info'>Prediction</th>
            <th className='bg-info'>Probability</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index} className='text-center'>
              <td>{index + 1}</td>
              <td>{prediction === 1 ? 'Churned' : 'Not Churned'}</td>
              <td>{(prediction_probs[index] * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />

      <h2 className='text-primary fw-bold text-decoration-underline mt-4'>Churn Distribution:</h2>
      {pie && (
        <img
          src={`data:image/png;base64,${pie}`}
          alt="Churn Distribution Pie Chart"
          style={{ width: '50%', marginTop: '20px' }}
        />
      )}
      <hr />

      {graph && (
        <div>
          <h2 className='text-primary fw-bold text-decoration-underline mt-4'>Additional Analysis:</h2>
          <img
            src={`data:image/png;base64,${graph}`}
            alt="Graph Analysis"
            style={{ width: '80%', marginTop: '20px' }}
          />
        </div>
      )}
      <hr />

      <div>
        <h2 className='text-primary fw-bold text-decoration-underline mt-4'>Churn Distribution Chart :</h2><br />
        <h5 className='fw-bold'>For The Better Analysis:</h5>
        {Object.keys(filters).map((filter) => (
          <button 
            key={filter} 
            onClick={() => handleFilterClick(filter)}
            className='btn btn-primary'
            style={{ margin: '5px' }}>
            {filter}
          </button>
        ))}

        {chartData ? (
          <div>
            <h3 className='text-primary fw-bold text-decoration-underline mt-4'>Distribution for {selectedFilter}</h3>
            <img src={`data:image/png;base64,${chartData}`} alt={`Churn Distribution for ${selectedFilter}`} />
          </div>
        ) : (
          !selectedFilter && <p className='mb-5'>Select a filter to view the chart.</p>
        )}
      </div>

      <button onClick={handleDownload} className="btn btn-primary mt-4">
        Download Filtered Data
      </button>


      <button onClick={handleDownloadPDF} className="btn btn-primary mt-4">Download PDF</button>

    </div>
  );
}

export default Review;
