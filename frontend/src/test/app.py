from flask import Flask, request, jsonify, send_file
from flask_cors import CORS  # Import CORS
import numpy as np
import pandas as pd
import joblib  # Assuming you are loading a saved model
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
from sklearn.preprocessing import LabelEncoder
matplotlib.use('Agg')  # Use a non-GUI backend for Matplotli
import tempfile
import os

app = Flask(__name__)
temp_files = {}

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print(data)
    
    # Prepare input data after manual encoding
    input_data = {
        'gender': data["gender"],  # Assuming these values are integers
        'SeniorCitizen': data["SeniorCitizen"],
        'Partner': data['Partner'],
        'Dependents': data['Dependents'],
        'tenure': data['tenure'],
        'PhoneService': data['PhoneService'],  # Convert to binary if needed
        'MultipleLines': data['MultipleLines'],  # Convert to binary if needed
        'InternetService': data['InternetService'],
        'OnlineSecurity': data['OnlineSecurity'],  # Convert to binary if needed
        'OnlineBackup': data['OnlineBackup'],  # Convert to binary if needed
        'DeviceProtection': data['DeviceProtection'],  # Convert to binary if needed
        'TechSupport': data['TechSupport'],  # Convert to binary if needed
        'StreamingTV': data['StreamingTV'],  # Convert to binary if needed
        'StreamingMovies': data['StreamingMovies'],  # Convert to binary if needed
        'Contract': data['Contract'],
        'PaperlessBilling': data['PaperlessBilling'],
        'PaymentMethod': data['PaymentMethod'],  # Convert to binary if needed
        'MonthlyCharges': data['MonthlyCharges'],
        'TotalCharges': data['TotalCharges'],
        'TenureGroup': data['TenureGroup'],  # Placeholder value
        'ChargesPerMonth': data['MonthlyCharges'],
        'Contract_PaymentInteraction': data['ContractPaymentInteraction'],  # Placeholder value
        'HasPhoneAndInternet': data['HasPhoneAndInternet'],
        'NumServices': data['NumServices'],
    }

    # Convert to DataFrame
    input_df = pd.DataFrame([input_data])  # Wrap input_data in a list to create a DataFrame with one row

    # Load the pre-trained model
    model_path = r'C:\Users\Prathmesh\.vscode\Hackthon\Customer_Churn_Prediction\frontend\src\test\random_forest_model.joblib' 
    model = joblib.load(model_path)

    # Make predictions using numpy array
    prediction = model.predict(input_df.values)  # Convert DataFrame to NumPy array
    prediction_prob = model.predict_proba(input_df.values)[:, 1]  # Probability of churn

    # Output the prediction
    print("Churn Prediction:", prediction[0])
    print("Churn Probability:", prediction_prob[0])


    # Convert numpy types to native Python types for JSON serialization
    response = {
        'status': 'success',
        'message': 'Prediction processed successfully',
        'prediction': int(prediction[0]),  # Convert to Python int
        'prediction_prob': float(prediction_prob[0]),  # Convert to Python float
        
    }

    return jsonify(response)



@app.route('/multi-predict', methods=['POST'])
def multipredict():
    # Get the uploaded file from the request
    file = request.files.get('file')
    
    if file is None:
        return jsonify({'error': 'No file provided'}), 400
    
    df = pd.read_csv(file)
    
    # Load the pre-trained model
    model_path = r'C:\Users\Prathmesh\.vscode\Hackthon\Customer_Churn_Prediction\frontend\src\test\random_forest_model.joblib'
    model = joblib.load(model_path)

    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')

    def tenure_group(tenure):
     if tenure <= 12:
        return '0-1 year'
     elif tenure <= 24:
        return '1-2 years'
     elif tenure <= 48:
        return '2-4 years'
     elif tenure <= 60:
        return '4-5 years'
     else:
        return '5+ years'

    df['TenureGroup'] = df['tenure'].apply(tenure_group) 

    df['ChargesPerMonth'] = df['TotalCharges'] / df['tenure']

    df['Contract_PaymentInteraction'] = df['Contract'] + '_' + df['PaymentMethod']

    df['HasPhoneAndInternet'] = np.where((df['PhoneService'] == 'Yes') & (df['InternetService'] != 'No'), 1, 0)

    df['NumServices'] = ((df[['PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity',
                         'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV',
                         'StreamingMovies']] == 'Yes') |
                          (df['InternetService'].isin(['DSL', 'Fiber optic']))).sum(axis=1)
    
    list_of_non_numerical = df.select_dtypes(exclude=['int64', 'float64']).columns # Catch categecores coulumns
    list(list_of_non_numerical);

    label_encoder = LabelEncoder()
    for col in list_of_non_numerical:
     df[col] = label_encoder.fit_transform(df[col].astype(str))

     
    predictions = model.predict(df)
    prediction_probs = model.predict_proba(df)[:, 1]  # Get probabilities

    # Create a DataFrame for results
    df['Prediction'] = predictions
    df['Prediction Probability'] = prediction_probs

    # Example: Create a simple graph of predictions
    plt.figure(figsize=(10, 6))
    df['Prediction'].value_counts().plot(kind='bar')
    plt.title('Churn Prediction Count')
    plt.xlabel('Churn (1 = Yes, 0 = No)')
    plt.ylabel('Count')
    
    # Save the figure to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()  # Close the figure
    buf.seek(0)
    image_data = base64.b64encode(buf.read()).decode('utf-8')

    


    churn_count = (predictions == 1).sum()
    non_churn_count = (predictions == 0).sum()

    # Create pie chart
    fig, ax = plt.subplots()
    ax.pie([churn_count, non_churn_count], labels=['Churned', 'Not Churned'], autopct='%1.1f%%')
    
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    buf.close()


    final_df = df.to_dict(orient='records')

    # Return predictions and image data
    return jsonify({
        'status': 'success',
        'predictions': predictions.tolist(),  # Convert numpy array to list for JSON serialization
        'prediction_probs': prediction_probs.tolist(),
        'graph': image_data,
        'pie':image_base64,
        'finaldf': final_df
    })


@app.route('/get-chart', methods=['POST'])
def get_chart():
    data = request.json
    attribute = data.get('filter')
    value = data.get('value')
    final_dataframe= data.get('finaldf')
    
    df = pd.DataFrame(final_dataframe)

    if(attribute=='Gender'):
    
     counts = df.groupby(['gender', 'Prediction']).size().unstack(fill_value=0);
     counts.plot(kind='barh', stacked=False, color=['skyblue', 'orange']);
     plt.title('Churn Counts by Gender');
     plt.xlabel('Count');
     plt.ylabel('Gender');
     plt.yticks(ticks=[0, 1], labels=['Female', 'Male']);  # Set custom y-ticks
     plt.legend(['Not Churned', 'Churned'], title='Churn Status'); 
    

    elif attribute in ['SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'PaperlessBilling']:
     counts = df.groupby([attribute, 'Prediction']).size().unstack(fill_value=0)
     counts.plot(kind='barh', stacked=False, color=['skyblue', 'orange'])
     plt.title(f'Churn Counts by {attribute}')  # Use f-string for dynamic title
     plt.xlabel('Count')
     plt.ylabel(attribute)
     plt.yticks(ticks=[0, 1], labels=['No', 'Yes'])  # Set custom y-ticks
     plt.legend(['Not Churned', 'Churned'], title='Churn Status')

    

    elif(attribute=='MultipleLines'):
     counts = df.groupby(['MultipleLines', 'Prediction']).size().unstack(fill_value=0);
     counts.plot(kind='barh', stacked=False, color=['skyblue', 'orange']);
     plt.title('Churn Counts by MultipleLines');
     plt.xlabel('Count');
     plt.ylabel('MultipleLines');
     plt.yticks(ticks=[0, 1, 2], labels=['No', 'No Phone', 'yes']);  # Set custom y-ticks
     plt.legend(['Not Churned', 'Churned'], title='Churn Status'); 
    
    elif(attribute=='InternetService'):
     counts = df.groupby(['InternetService', 'Prediction']).size().unstack(fill_value=0);
     counts.plot(kind='barh', stacked=False, color=['skyblue', 'orange']);
     plt.title('Churn Counts by InternetService');
     plt.xlabel('Count');
     plt.ylabel('InternetService');
     plt.yticks(ticks=[0, 1, 2], labels=['DSL', 'Fiber Optics', 'No']);  # Set custom y-ticks
     plt.legend(['Not Churned', 'Churned'], title='Churn Status'); 
    
    
    elif attribute in ['OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies']:
     counts = df.groupby([attribute, 'Prediction']).size().unstack(fill_value=0)
     counts.plot(kind='barh', stacked=False, color=['skyblue', 'orange'])
     plt.title(f'Churn Counts by {attribute}')  # Use f-string for dynamic title
     plt.xlabel('Count')
     plt.ylabel(attribute)
     plt.yticks(ticks=[0, 1, 2], labels=['No','No Internet','Yes'])  # Set custom y-ticks
     plt.legend(['Not Churned', 'Churned'], title='Churn Status')

    elif attribute in ['Contract']:
     counts = df.groupby([attribute, 'Prediction']).size().unstack(fill_value=0)
     counts.plot(kind='barh', stacked=False, color=['skyblue', 'orange'])
     plt.title(f'Churn Counts by {attribute}')  # Use f-string for dynamic title
     plt.xlabel('Count')
     plt.ylabel(attribute)
     plt.yticks(ticks=[0, 1, 2], labels=['Month-to-Month','One Year','Two Year'])  # Set custom y-ticks
     plt.legend(['Not Churned', 'Churned'], title='Churn Status')

    elif attribute in ['PaymentMethod']:
     counts = df.groupby([attribute, 'Prediction']).size().unstack(fill_value=0)
     counts.plot(kind='barh', stacked=False, color=['skyblue', 'orange'])
     plt.title(f'Churn Counts by {attribute}')  # Use f-string for dynamic title
     plt.xlabel('Count')
     plt.ylabel(attribute)
     plt.yticks(ticks=[0, 1, 2, 3], labels=['Bank Transfer','Credit Card','Electronic Check', 'Mailed Check'])  # Set custom y-ticks
     plt.legend(['Not Churned', 'Churned'], title='Churn Status')



    plt.tight_layout()
    buf = io.BytesIO();
    plt.savefig(buf, format='png');
    plt.close();
    buf.seek(0);
    image_base64 = base64.b64encode(buf.read()).decode('utf-8');


    return jsonify({'pie2': image_base64});



@app.route('/download-csv', methods=['POST'])
def download_csv():
    data = request.json
    final_dataframe = data.get('finaldf')
    df = pd.DataFrame(final_dataframe)
    
    # Filtered Data
    df_filtered = df[df['Prediction'] == 1]  # For example, keeping only "Churned" predictions
    
    # Save to a temporary CSV file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.csv')
    df_filtered.to_csv(temp_file.name, index=False)
    
    return send_file(temp_file.name, as_attachment=True, download_name='filtered_data.csv')


if __name__ == '__main__':
    app.run(debug=True)
