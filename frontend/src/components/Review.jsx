import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FaFilter,
  FaDownload,
  FaFilePdf,
  FaChartPie,
  FaChartBar,
  FaChartArea,
} from "react-icons/fa";

function Review() {
  const location = useLocation();
  const { predictions, prediction_probs, graph, pie, finaldf, pie2 } =
    location.state || {};
  const [chartData, setChartData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filters = {
    Gender: { values: [0, 1], label: "Gender" },
    SeniorCitizen: { values: [0, 1], label: "Senior Citizen" },
    Partner: { values: [0, 1], label: "Partner" },
    Dependents: { values: [0, 1], label: "Dependents" },
    PhoneService: { values: [0, 1], label: "Phone Service" },
    MultipleLines: { values: [0, 1, 2], label: "Multiple Lines" },
    InternetService: { values: [0, 1, 2], label: "Internet Service" },
    OnlineSecurity: { values: [0, 1, 2], label: "Online Security" },
    OnlineBackup: { values: [0, 1, 2], label: "Online Backup" },
    DeviceProtection: { values: [0, 1, 2], label: "Device Protection" },
    TechSupport: { values: [0, 1, 2], label: "Tech Support" },
    StreamingTV: { values: [0, 1, 2], label: "Streaming TV" },
    StreamingMovies: { values: [0, 1, 2], label: "Streaming Movies" },
    Contract: { values: [0, 1, 2], label: "Contract" },
    PaperlessBilling: { values: [0, 1], label: "Paperless Billing" },
    PaymentMethod: { values: [0, 1, 2, 3], label: "Payment Method" },
  };

  const handleFilterClick = async (filter) => {
    setSelectedFilter(filter);
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/get-chart", {
        filter,
        value: filters[filter].values,
        finaldf,
      });
      setChartData(response.data.pie2);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setChartData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFilter(null);
    setChartData(null);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/download-csv",
        { finaldf },
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "churn_predictions.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Add title
    doc.setFontSize(20);
    doc.text("Churn Prediction Report", 105, 15, null, null, "center");

    // Add date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Generated on: ${date}`, 105, 25, null, null, "center");

    // Add table
    doc.setFontSize(14);
    doc.text("Prediction Results", 105, 35, null, null, "center");

    const table = document.getElementById("prediction-table");
    if (table) {
      const tableCanvas = await html2canvas(table, { scale: 2 });
      const tableImgData = tableCanvas.toDataURL("image/png");
      doc.addImage(tableImgData, "PNG", 10, 40, 190, tableCanvas.height / 4);
    }

    // Add pie chart
    if (pie) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Churn Distribution", 105, 15, null, null, "center");

      const pieImg = new Image();
      pieImg.src = `data:image/png;base64,${pie}`;
      doc.addImage(pieImg, "PNG", 30, 25, 150, 100);
    }

    // Add graph
    if (graph) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text("Additional Analysis", 105, 15, null, null, "center");

      const graphImg = new Image();
      graphImg.src = `data:image/png;base64,${graph}`;
      doc.addImage(graphImg, "PNG", 20, 25, 170, 100);
    }

    // Add filter chart if available
    if (chartData) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text(
        `Churn Distribution by ${filters[selectedFilter].label}`,
        105,
        15,
        null,
        null,
        "center"
      );

      const filterImg = new Image();
      filterImg.src = `data:image/png;base64,${chartData}`;
      doc.addImage(filterImg, "PNG", 30, 25, 150, 100);
    }

    doc.save("churn_prediction_report.pdf");
  };

  // Calculate churn statistics
  const totalCustomers = predictions?.length || 0;
  const churnedCustomers = predictions?.filter((p) => p === 1).length || 0;
  const churnRate =
    totalCustomers > 0
      ? ((churnedCustomers / totalCustomers) * 100).toFixed(2)
      : 0;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          <span className="text-gradient">Prediction Results</span>
        </h1>
        <div
          className="mx-auto bg-gradient mb-4"
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(to right, #4361ee, #7209b7)",
          }}
        ></div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="d-inline-block p-3 rounded-circle bg-primary bg-opacity-10 mb-3">
                <FaChartPie className="text-primary" size={30} />
              </div>
              <h3 className="fw-bold mb-2">Total Customers</h3>
              <p className="display-5 fw-bold">{totalCustomers}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="d-inline-block p-3 rounded-circle bg-danger bg-opacity-10 mb-3">
                <FaChartBar className="text-danger" size={30} />
              </div>
              <h3 className="fw-bold mb-2">Churned Customers</h3>
              <p className="display-5 fw-bold text-danger">
                {churnedCustomers}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="d-inline-block p-3 rounded-circle bg-warning bg-opacity-10 mb-3">
                <FaChartArea className="text-warning" size={30} />
              </div>
              <h3 className="fw-bold mb-2">Churn Rate</h3>
              <p className="display-5 fw-bold text-warning">{churnRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Table */}
      <div className="card border-0 shadow-lg mb-5">
        <div className="card-header bg-white border-0 py-3">
          <h3 className="fw-bold mb-0">Customer Predictions</h3>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0" id="prediction-table">
              <thead className="table-light">
                <tr>
                  <th className="py-3">Customer Index</th>
                  <th className="py-3">Prediction</th>
                  <th className="py-3">Churn Probability</th>
                </tr>
              </thead>
              <tbody>
                {predictions?.map((prediction, index) => (
                  <tr key={index}>
                    <td className="fw-medium">{index + 1}</td>
                    <td>
                      <span
                        className={`badge ${
                          prediction === 1 ? "bg-danger" : "bg-success"
                        }`}
                      >
                        {prediction === 1 ? "Churned" : "Not Churned"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="progress flex-grow-1 me-2"
                          style={{ height: "10px" }}
                        >
                          <div
                            className={`progress-bar ${
                              prediction === 1 ? "bg-danger" : "bg-success"
                            }`}
                            role="progressbar"
                            style={{
                              width: `${prediction_probs[index] * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="fw-medium">
                          {(prediction_probs[index] * 100).toFixed(2)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mb-5">
        {/* Churn Distribution */}
        {pie && (
          <div className="col-lg-6 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 py-3">
                <h3 className="fw-bold mb-0 d-flex align-items-center">
                  <FaChartPie className="me-2 text-primary" />
                  Churn Distribution
                </h3>
              </div>
              <div className="card-body text-center">
                <img
                  src={`data:image/png;base64,${pie}`}
                  alt="Churn Distribution Pie Chart"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        )}

        {/* Additional Analysis */}
        {graph && (
          <div className="col-lg-6 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 py-3">
                <h3 className="fw-bold mb-0 d-flex align-items-center">
                  <FaChartBar className="me-2 text-primary" />
                  Additional Analysis
                </h3>
              </div>
              <div className="card-body text-center">
                <img
                  src={`data:image/png;base64,${graph}`}
                  alt="Graph Analysis"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Section */}
      <div className="card border-0 shadow-lg mb-5">
        <div className="card-header bg-white border-0 py-3">
          <h3 className="fw-bold mb-0 d-flex align-items-center">
            <FaFilter className="me-2 text-primary" />
            Filter Analysis
          </h3>
          <p className="text-muted mb-0">
            Select a filter to view detailed churn distribution
          </p>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <h5 className="fw-bold mb-3">Select Filter:</h5>
            <div className="d-flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, filter]) => (
                <button
                  key={key}
                  onClick={() => handleFilterClick(key)}
                  className={`btn ${
                    selectedFilter === key
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
              <button
                onClick={handleReset}
                className="btn btn-outline-secondary"
              >
                Reset
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading chart data...</p>
            </div>
          ) : chartData ? (
            <div>
              <h4 className="fw-bold mb-3">
                Churn Distribution by {filters[selectedFilter].label}
              </h4>
              <img
                src={`data:image/png;base64,${chartData}`}
                alt={`Churn Distribution for ${filters[selectedFilter].label}`}
                className="img-fluid"
              />
            </div>
          ) : (
            selectedFilter &&
            !isLoading && (
              <div className="alert alert-info">
                No chart data available for this filter.
              </div>
            )
          )}
        </div>
      </div>

      {/* Download Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-5">
        <button
          onClick={handleDownload}
          className="btn btn-lg d-flex align-items-center gap-2 fw-bold"
          style={{
            background: "linear-gradient(135deg, #4361ee, #7209b7)",
            color: "white",
            borderRadius: "50px",
            padding: "0.8rem 2rem",
          }}
        >
          <FaDownload /> Download CSV
        </button>

        <button
          onClick={handleDownloadPDF}
          className="btn btn-lg d-flex align-items-center gap-2 fw-bold"
          style={{
            background: "white",
            color: "#4361ee",
            border: "2px solid #4361ee",
            borderRadius: "50px",
            padding: "0.8rem 2rem",
          }}
        >
          <FaFilePdf /> Download PDF Report
        </button>
      </div>
    </div>
  );
}

export default Review;
