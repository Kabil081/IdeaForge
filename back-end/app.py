from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
import joblib
import os
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Load the trained model
model_filename = 'trained_model.joblib'
model_path = os.path.join(os.path.dirname(__file__), model_filename)

if os.path.exists(model_path):
    model = joblib.load(model_path)
    print(f"Model loaded from {model_path}")
else:
    print(f"Error: Model file not found at {model_path}")
    model = None

@app.route('/')
def home():
    return "Welcome to the Investment Recommendation API"

# Helper function to calculate future savings with investment
def calculate_future_savings(current_savings, monthly_contribution, years_to_retirement, annual_return_rate):
    months = years_to_retirement * 12
    future_savings = current_savings
    savings_over_time = [current_savings]
    for _ in range(months):
        future_savings += monthly_contribution
        future_savings *= (1 + annual_return_rate / 12)
        savings_over_time.append(future_savings)
    return future_savings, savings_over_time

# Return investment recommendation and future savings
@app.route('/api/recommend', methods=['POST'])
def recommend_investment():
    if model is None:
        return jsonify({'error': 'Model not loaded. Please train the model first.'}), 500

    data = request.json
    print("Received data:", data)
    
    try:
        # Prepare the input data
        input_data = pd.DataFrame([[
            data['age'],
            data['current_savings'],
            data['monthly_contribution'],
            data['years_to_retirement'],
            data['risk_tolerance']
        ]], columns=['age', 'current_savings', 'monthly_contribution', 'years_to_retirement', 'risk_tolerance'])
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        
        # Map the prediction to investment category
        investment_options = {0: 'Mutual funds', 1: 'Gold', 2: 'Real estate', 3: 'Stock market', 4: 'Crypto currency'}
        recommended_investment = investment_options[prediction]
        
        # Define expected annual return rates for each investment option
        return_rates = {
            'Mutual funds': 0.07,
            'Gold': 0.05,
            'Real estate': 0.08,
            'Stock market': 0.10,
            'Crypto currency': 0.15
        }
        
        # Calculate future savings with the recommended investment
        annual_return_rate = return_rates[recommended_investment]
        future_savings, savings_over_time = calculate_future_savings(
            data['current_savings'], 
            data['monthly_contribution'], 
            data['years_to_retirement'], 
            annual_return_rate
        )
        
        return jsonify({
            'recommendation': recommended_investment,
            'future_savings': future_savings,
            'savings_over_time': savings_over_time
        })
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
