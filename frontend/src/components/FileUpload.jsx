import React, { useState } from 'react';

function FileUpload({ onDataUpload, setFormData }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n').map(row => row.split(','));

        // Separate churn and non-churn data
        const churnData = rows.filter(row => row[0] === '1'); // Assuming first column indicates churn (1 = churn)
        const notChurnData = rows.filter(row => row[0] === '0'); // Assuming first column indicates non-churn (0 = non-churn)
        
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
          TenureGroup: parseInt(rows[1][5]) < 12 ? "0-12" : parseInt(rows[1][5]) < 24 ? "12-24" : "24+",
          ChargesPerMonth: parseFloat(rows[1][18]),
          Contract_PaymentInteraction: rows[1][15] + "_" + rows[1][17],
          HasPhoneAndInternet: rows[1][6] === "Yes" && rows[1][8] !== "No" ? 1 : 0,
          NumServices: [
            rows[1][6],
            rows[1][7],
            rows[1][9],
            rows[1][10],
            rows[1][11],
            rows[1][12],
            rows[1][13],
            rows[1][14]
          ].filter(service => service === "Yes").length,
        });
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
}

export default FileUpload;
