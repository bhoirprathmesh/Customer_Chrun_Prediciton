import React, { useState } from "react";
import {
  FaFileUpload,
  FaFileCsv,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

function FileUpload({ onDataUpload, setFormData }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        processFile(selectedFile);
      } else {
        alert("Please upload a CSV file");
      }
    }
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsProcessing(true);
    setIsUploaded(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const rows = text.split("\n").map((row) => row.split(","));

        // Separate churn and non-churn data
        const churnData = rows.filter((row) => row[0] === "1");
        const notChurnData = rows.filter((row) => row[0] === "0");

        // Upload churn and non-churn data counts
        onDataUpload(churnData, notChurnData);

        // Set formData with values and computed fields
        setFormData({
          gender: rows[1][1],
          SeniorCitizen: rows[1][2],
          Partner: rows[1][3],
          Dependents: rows[1][4],
          tenure: rows[1][5],
          PhoneService: rows[1][6],
          MultipleLines: rows[1][7],
          InternetService: rows[1][8],
          OnlineSecurity: rows[1][9],
          OnlineBackup: rows[1][10],
          DeviceProtection: rows[1][11],
          TechSupport: rows[1][12],
          StreamingTV: rows[1][13],
          StreamingMovies: rows[1][14],
          Contract: rows[1][15],
          PaperlessBilling: rows[1][16],
          PaymentMethod: rows[1][17],
          MonthlyCharges: parseFloat(rows[1][18]),
          TotalCharges: parseFloat(rows[1][19]),
          TenureGroup:
            parseInt(rows[1][5]) < 12
              ? "0-12"
              : parseInt(rows[1][5]) < 24
              ? "12-24"
              : "24+",
          ChargesPerMonth: parseFloat(rows[1][18]),
          Contract_PaymentInteraction: rows[1][15] + "_" + rows[1][17],
          HasPhoneAndInternet:
            rows[1][6] === "Yes" && rows[1][8] !== "No" ? 1 : 0,
          NumServices: [
            rows[1][6],
            rows[1][7],
            rows[1][9],
            rows[1][10],
            rows[1][11],
            rows[1][12],
            rows[1][13],
            rows[1][14],
          ].filter((service) => service === "Yes").length,
        });

        setIsUploaded(true);
      } catch (error) {
        console.error("Error processing file:", error);
        alert("Error processing file. Please check the file format.");
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="file-upload-container">
      <div
        className={`upload-area ${isDragging ? "dragging" : ""} ${
          isUploaded ? "uploaded" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="d-none"
        />

        {isProcessing ? (
          <div className="upload-content">
            <FaSpinner className="spin-icon" size={40} />
            <p className="mt-3 fw-bold">Processing your file...</p>
          </div>
        ) : isUploaded ? (
          <div className="upload-content">
            <FaCheckCircle className="success-icon" size={40} />
            <p className="mt-3 fw-bold">File Uploaded Successfully!</p>
            <p className="text-muted">{file?.name}</p>
          </div>
        ) : (
          <div className="upload-content">
            <FaFileUpload className="upload-icon" size={40} />
            <p className="mt-3 fw-bold">Drag & Drop your CSV file here</p>
            <p className="text-muted">or click to browse files</p>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <FaFileCsv className="me-2 text-primary" />
              <span>Only CSV files accepted</span>
            </div>
          </div>
        )}
      </div>

      {file && !isProcessing && !isUploaded && (
        <div className="file-info mt-3">
          <p className="mb-0 fw-medium">Selected file: {file.name}</p>
          <p className="text-muted small">Click the upload area to process</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
