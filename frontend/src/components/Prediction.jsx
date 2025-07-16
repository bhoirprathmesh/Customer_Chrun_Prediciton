import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaFileUpload,
  FaUser,
  FaPhone,
  FaWifi,
  FaShieldAlt,
  FaTv,
  FaFileContract,
  FaCreditCard,
  FaDollarSign,
} from "react-icons/fa";

function Prediction() {
  const [prediction, setPrediction] = useState(null);
  const [predictionProb, setPredictionProb] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [file, setFile] = useState(null); // State to store the selected file

  const [formData, setFormData] = useState({
    gender: "",
    SeniorCitizen: "",
    Partner: "",
    Dependents: "",
    tenure: 0,
    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: 0,
    TotalCharges: 0,
  });

  const [dataType, setDataType] = useState("Single Data"); // New state to track data type

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  const calculateNumServices = (data) => {
    return [
      data.PhoneService,
      data.MultipleLines,
      data.InternetService,
      data.OnlineSecurity,
      data.OnlineBackup,
      data.DeviceProtection,
      data.TechSupport,
      data.StreamingTV,
      data.StreamingMovies,
    ].filter(
      (service) =>
        service === "Yes" || service === "DSL" || service === "Fiber optics"
    ).length;
  };

  const calculateChargesPerMonth = (data) => {
    if (data.tenure > 0) {
      return (data.TotalCharges / data.tenure).toFixed(2);
    }
    return 0;
  };

  const tenureGroup = (tenure) => {
    if (tenure <= 12) return 0;
    else if (tenure <= 24) return 1;
    else if (tenure <= 48) return 2;
    else if (tenure <= 60) return 3;
    else return 4;
  };

  const combinations_with_indices = {
    "Month-to-month_Electronic check": 2,
    "Month-to-month_Mailed check": 3,
    "Month-to-month_Bank transfer (automatic)": 0,
    "Month-to-month_Credit card (automatic)": 1,
    "One year_Electronic check": 6,
    "One year_Mailed check": 7,
    "One year_Bank transfer (automatic)": 4,
    "One year_Credit card (automatic)": 5,
    "Two year_Electronic check": 11,
    "Two year_Mailed check": 10,
    "Two year_Bank transfer (automatic)": 8,
    "Two year_Credit card (automatic)": 9,
  };

  const hasPhoneAndInternet = (phoneService, internetService) => {
    return phoneService === "Yes" && internetService !== "No" ? 1 : 0;
  };

  const navigate = useNavigate();

  // validate form if any field is empty
  const validateForm = (formData) => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === "" || value === null || value === undefined) {
        alert(`Please fill in the all the field.`);
        return false; // Stop the function if any field is empty
      }
    }
    return true; // Return true if all fields are filled
  };

  const handlePredict = async () => {
    if (!validateForm(formData)) return;

    // Concatenate Contract and PaymentMethod
    const contractPaymentMethod = `${formData.Contract}_${formData.PaymentMethod}`;

    // Search for the concatenated string in combinations_with_indices
    const index = combinations_with_indices[contractPaymentMethod];

    // Calculate NumServices
    const tenureGroupValue = tenureGroup(formData.tenure);
    const numServices = calculateNumServices(formData);
    const chargesPerMonth = calculateChargesPerMonth(formData);
    const hasPhoneAndInternetValue = hasPhoneAndInternet(
      formData.PhoneService,
      formData.InternetService
    );

    // Create transformed data object
    const transformedData = {
      gender: formData.gender === "Male" ? 1 : 0,
      SeniorCitizen: formData.SeniorCitizen === "Yes" ? 1 : 0,
      Partner: formData.Partner === "Yes" ? 1 : 0,
      Dependents: formData.Dependents === "Yes" ? 1 : 0,
      tenure: Number(formData.tenure),
      PhoneService: formData.PhoneService === "Yes" ? 1 : 0,
      MultipleLines:
        formData.MultipleLines === "Yes"
          ? 1
          : formData.MultipleLines === "No Phone"
          ? 0
          : 0,
      InternetService:
        formData.InternetService === "DSL"
          ? 1
          : formData.InternetService === "Fiber optics"
          ? 2
          : 0,
      OnlineSecurity:
        formData.OnlineSecurity === "Yes"
          ? 1
          : formData.OnlineSecurity === "No Internet"
          ? 0
          : 0,
      OnlineBackup:
        formData.OnlineBackup === "Yes"
          ? 1
          : formData.OnlineBackup === "No Internet"
          ? 0
          : 0,
      DeviceProtection:
        formData.DeviceProtection === "Yes"
          ? 1
          : formData.DeviceProtection === "No Internet"
          ? 0
          : 0,
      TechSupport:
        formData.TechSupport === "Yes"
          ? 1
          : formData.TechSupport === "No Internet"
          ? 0
          : 0,
      StreamingTV:
        formData.StreamingTV === "Yes"
          ? 1
          : formData.StreamingTV === "No Internet"
          ? 0
          : 0,
      StreamingMovies:
        formData.StreamingMovies === "Yes"
          ? 1
          : formData.StreamingMovies === "No Internet"
          ? 0
          : 0,
      Contract:
        formData.Contract === "Month-to-month"
          ? 0
          : formData.Contract === "One year"
          ? 1
          : 2,
      PaperlessBilling: formData.PaperlessBilling === "Yes" ? 1 : 0,
      PaymentMethod:
        formData.PaymentMethod === "Bank transfer (automatic)"
          ? 0
          : formData.PaymentMethod === "Credit card (automatic)"
          ? 1
          : formData.PaymentMethod === "Electronic check"
          ? 2
          : formData.PaymentMethod === "Mailed check"
          ? 3
          : null,
      MonthlyCharges: Number(formData.MonthlyCharges),
      TotalCharges: Number(formData.TotalCharges),
      NumServices: numServices,
      ChargesPerMonth: Number(chargesPerMonth),
      TenureGroup: tenureGroupValue,
      HasPhoneAndInternet: Number(hasPhoneAndInternetValue),
      ContractPaymentInteraction: Number(index),
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPrediction(result.prediction);
      setPredictionProb(result.prediction_prob);
      setError(null); // Reset error state

      // Navigate to the review page after the prediction is processed
      // navigate('/review');
    } catch (error) {
      setError("Error occurred while making prediction.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file in state
  };

  const handleMultiplePredict = async () => {
    if (!file) {
      setError("Please upload a file before predicting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data

    try {
      const response = await fetch("http://127.0.0.1:5000/multi-predict", {
        method: "POST",
        body: formData, // Send the form data containing the file
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setError(null);

      // Pass the response data to the Review page
      navigate("/review", {
        state: {
          predictions: result.predictions,
          prediction_probs: result.prediction_probs,
          graph: result.graph,
          pie: result.pie,
          finaldf: result.finaldf,
        },
      });
    } catch (error) {
      setError("Error occurred while uploading the file.");
      console.error("Error:", error);
    }
  };

  // Icon mapping for form fields
  const fieldIcons = {
    gender: <FaUser className="me-2" />,
    SeniorCitizen: <FaUser className="me-2" />,
    Partner: <FaUser className="me-2" />,
    Dependents: <FaUser className="me-2" />,
    tenure: <FaChartLine className="me-2" />,
    PhoneService: <FaPhone className="me-2" />,
    MultipleLines: <FaPhone className="me-2" />,
    InternetService: <FaWifi className="me-2" />,
    OnlineSecurity: <FaShieldAlt className="me-2" />,
    OnlineBackup: <FaShieldAlt className="me-2" />,
    DeviceProtection: <FaShieldAlt className="me-2" />,
    TechSupport: <FaShieldAlt className="me-2" />,
    StreamingTV: <FaTv className="me-2" />,
    StreamingMovies: <FaTv className="me-2" />,
    Contract: <FaFileContract className="me-2" />,
    PaperlessBilling: <FaFileContract className="me-2" />,
    PaymentMethod: <FaCreditCard className="me-2" />,
    MonthlyCharges: <FaDollarSign className="me-2" />,
    TotalCharges: <FaDollarSign className="me-2" />,
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-3">
        <h1 className="display-4 fw-bold">
          <span className="text-gradient">Churn Prediction</span>
        </h1>
        <div
          className="mx-auto bg-gradient"
          style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(to right, #4361ee, #7209b7)",
          }}
        ></div>
        <p className="lead">
          ---------- Predict customer churn with our advanced AI models
          ----------
        </p>
      </div>

      <div className="card border-0 shadow-lg mb-5">
        <div className="card-header bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0 fw-bold">Prediction Form</h3>
            <select
              value={dataType}
              onChange={handleDataTypeChange}
              className="form-select w-auto"
              style={{
                background: "linear-gradient(135deg, #4361ee, #7209b7)",
                color: "white",
                borderRadius: "20px",
                padding: "0.4rem 1.5rem 0.4rem 2.5rem",
              }}
            >
              <option value="Single Data">Single Data</option>
              <option value="Multiple Data">Multiple Data</option>
            </select>
          </div>
        </div>

        <div className="card-body p-4">
          {dataType === "Single Data" && (
            <div className="prediction-form row g-4">
              {/* Column 1 */}
              <div className="col-md-6">
                {[
                  {
                    name: "gender",
                    label: "Gender",
                    options: ["Male", "Female"],
                  },
                  {
                    name: "SeniorCitizen",
                    label: "Senior Citizen",
                    options: ["Yes", "No"],
                  },
                  { name: "Partner", label: "Partner", options: ["Yes", "No"] },
                  {
                    name: "Dependents",
                    label: "Dependents",
                    options: ["Yes", "No"],
                  },
                  { name: "tenure", label: "Tenure", type: "number" },
                  {
                    name: "PhoneService",
                    label: "Phone Service",
                    options: ["Yes", "No"],
                  },
                  {
                    name: "MultipleLines",
                    label: "Multiple Lines",
                    options: ["Yes", "No", "No Phone"],
                  },
                  {
                    name: "InternetService",
                    label: "Internet Service",
                    options: ["DSL", "Fiber optics", "No"],
                  },
                  {
                    name: "OnlineSecurity",
                    label: "Online Security",
                    options: ["Yes", "No", "No Internet"],
                  },
                  {
                    name: "OnlineBackup",
                    label: "Online Backup",
                    options: ["Yes", "No", "No Internet"],
                  },
                ].map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label className="form-label fw-medium d-flex align-items-center">
                      {fieldIcons[field.name]}
                      {field.label}
                    </label>
                    {field.type === "number" ? (
                      <input
                        type="number"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        required
                      />
                    ) : (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="form-select form-select-lg"
                        required
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="col-md-6">
                {[
                  {
                    name: "DeviceProtection",
                    label: "Device Protection",
                    options: ["Yes", "No", "No Internet"],
                  },
                  {
                    name: "TechSupport",
                    label: "Tech Support",
                    options: ["Yes", "No", "No Internet"],
                  },
                  {
                    name: "StreamingTV",
                    label: "Streaming TV",
                    options: ["Yes", "No", "No Internet"],
                  },
                  {
                    name: "StreamingMovies",
                    label: "Streaming Movies",
                    options: ["Yes", "No", "No Internet"],
                  },
                  {
                    name: "Contract",
                    label: "Contract",
                    options: ["Month-to-month", "One year", "Two year"],
                  },
                  {
                    name: "PaperlessBilling",
                    label: "Paperless Billing",
                    options: ["Yes", "No"],
                  },
                  {
                    name: "PaymentMethod",
                    label: "Payment Method",
                    options: [
                      "Bank transfer (automatic)",
                      "Credit card (automatic)",
                      "Electronic check",
                      "Mailed check",
                    ],
                  },
                  {
                    name: "MonthlyCharges",
                    label: "Monthly Charges",
                    type: "number",
                  },
                  {
                    name: "TotalCharges",
                    label: "Total Charges",
                    type: "number",
                  },
                ].map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label className="form-label fw-medium d-flex align-items-center">
                      {fieldIcons[field.name]}
                      {field.label}
                    </label>
                    {field.type === "number" ? (
                      <input
                        type="number"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        required
                      />
                    ) : (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="form-select form-select-lg"
                        required
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>

              {/* Prediction Button */}
              <div className="col-12 text-center mt-4">
                <button
                  type="button"
                  onClick={handlePredict}
                  className="btn btn-glow fw-bold py-3 px-5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span style={{ color: "white" }}>Predicting...</span>
                    </>
                  ) : (
                    <>
                      <FaChartLine className="me-2 text-white" />
                      <span style={{ color: "white" }}>Predict Churn</span>
                    </>
                  )}
                </button>
              </div>

              {/* Prediction Result */}
              {prediction !== null && (
                <div className="col-12 mt-5">
                  <div
                    className={`card border-0 shadow-sm ${
                      prediction === 1
                        ? "bg-danger bg-opacity-10"
                        : "bg-success bg-opacity-10"
                    }`}
                  >
                    <div className="card-body text-center p-4">
                      <h4 className="fw-bold mb-3">
                        Prediction:
                        <span
                          className={
                            prediction === 1 ? "text-danger" : "text-success"
                          }
                        >
                          {prediction === 1 ? " CHURN" : " NO CHURN"}
                        </span>
                      </h4>
                      <div className="progress mb-3" style={{ height: "20px" }}>
                        <div
                          className={`progress-bar ${
                            prediction === 1 ? "bg-danger" : "bg-success"
                          }`}
                          role="progressbar"
                          style={{
                            width: `${(predictionProb * 100).toFixed(0)}%`,
                          }}
                          aria-valuenow={predictionProb * 100}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {(predictionProb * 100).toFixed(0)}%
                        </div>
                      </div>
                      <p className="mb-0">
                        Churn Probability:{" "}
                        <strong>{(predictionProb * 100).toFixed(2)}%</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="col-12 mt-3">
                  <div className="alert alert-danger text-center">{error}</div>
                </div>
              )}
            </div>
          )}

          {dataType === "Multiple Data" && (
            <div className="text-center py-4">
              <div className="mb-4">
                <div className="d-inline-block p-4 rounded-circle bg-primary bg-opacity-10 mb-3">
                  <FaFileUpload className="text-primary" size={40} />
                </div>
                <h3 className="fw-bold mb-3">Upload Your CSV File</h3>
                <p className="text-muted mb-4">
                  Upload a CSV file containing customer data to perform batch
                  predictions
                </p>
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control form-control-lg"
                  accept=".csv"
                />
                <div className="form-text">Only CSV files are accepted</div>
              </div>

              <button
                type="button"
                onClick={handleMultiplePredict}
                className="btn btn-glow fw-bold py-3 px-5"
                disabled={isSubmitting || !file}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaChartLine className="me-2" />
                    Predict Churn
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4">
                  <div className="alert alert-danger">{error}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prediction;
