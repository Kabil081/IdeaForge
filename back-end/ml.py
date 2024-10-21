import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
import math

# Load your dataset
data = pd.read_csv('./ex_data.csv')

# Features and target
X = data[['age', 'current_savings', 'monthly_contribution', 'years_to_retirement', 'risk_tolerance']]
y = data['recommended_investment']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize Gradient Boosting Classifier
gbc = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)

# Train the model
gbc.fit(X_train, y_train)

# Make predictions on the test set
y_pred = gbc.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")
print("Classification Report:\n", classification_report(y_test, y_pred))

# Save the trained model
model_filename = 'trained_model.joblib'
joblib.dump(gbc, model_filename)
print(f"Model saved as {model_filename}")
print(f"Full path: {os.path.abspath(model_filename)}")

# Function to calculate future savings with investment
def calculate_future_savings(current_savings, monthly_contribution, years_to_retirement, annual_return_rate):
    months = years_to_retirement * 12
    future_savings = current_savings
    savings_over_time = [current_savings]
    for _ in range(months):
        future_savings += monthly_contribution
        future_savings *= (1 + annual_return_rate / 12)
        savings_over_time.append(future_savings)
    return future_savings, savings_over_time

# Function to calculate future savings without investment
def calculate_future_savings_without_investment(current_savings, monthly_contribution, years_to_retirement):
    months = years_to_retirement * 12
    future_savings = current_savings
    savings_over_time = [current_savings]
    for _ in range(months):
        future_savings += monthly_contribution
        savings_over_time.append(future_savings)
    return future_savings, savings_over_time

# Example of predicting investment recommendation and future savings for a new retiree
def predict_and_calculate_investment(age, retirement_age, current_savings, monthly_contribution, risk_tolerance):
    years_to_retirement = retirement_age - age
    new_data = pd.DataFrame([[age, current_savings, monthly_contribution, years_to_retirement, risk_tolerance]], 
                             columns=['age', 'current_savings', 'monthly_contribution', 'years_to_retirement', 'risk_tolerance'])

    # Predict the recommended investment
    predicted_investment = gbc.predict(new_data)

    # Map the prediction back to the investment category
    investment_options = {0: 'Mutual funds', 1: 'Gold', 2: 'Real estate', 3: 'Stock market', 4: 'Crypto currency'}
    recommended_investment = investment_options[predicted_investment[0]]

    # Define expected annual return rates for each investment option
    return_rates = {
        'Mutual funds': 0.07,
        'Gold': 0.05,
        'Real estate': 0.08,
        'Stock market': 0.10,
        'Crypto currency': 0.15
    }

    # Calculate future savings with and without investment
    annual_return_rate = return_rates[recommended_investment]
    future_savings_with_investment, savings_over_time_with_investment = calculate_future_savings(current_savings, monthly_contribution, years_to_retirement, annual_return_rate)
    future_savings_without_investment, savings_over_time_without_investment = calculate_future_savings_without_investment(current_savings, monthly_contribution, years_to_retirement)

    # Generate and save the graph
    months = list(range(len(savings_over_time_with_investment)))
    plt.figure(figsize=(12, 6))
    
    # Customize the plot colors and styles
    plt.plot(months, savings_over_time_with_investment, 
             color='blue', linestyle='-', marker='o', 
             label=f'Future Savings with {recommended_investment}')
    
    plt.plot(months, savings_over_time_without_investment, 
             color='orange', linestyle='--', marker='x', 
             label='Future Savings without Investment')
    
    plt.axhline(y=current_savings, color='red', linestyle='--', label='Initial Savings')

    # Set labels and title with customized font size
    plt.xlabel('Months', fontsize=14)
    plt.ylabel('Savings', fontsize=14)
    plt.title('Initial Savings vs Future Savings with and without Investment', fontsize=16)
    
    # Customize legend
    plt.legend(fontsize=12)
    
    # Customize grid
    plt.grid(color='gray', linestyle=':', linewidth=0.5)
    
    # Customize ticks
    plt.ticklabel_format(style='plain', axis='y')
    plt.tight_layout()

    # Change background color
    plt.gcf().set_facecolor('lightgray')
    
    graph_filename = 'savings_graph.png'
    plt.savefig(graph_filename)
    print(f"Graph saved as {graph_filename}")

    return recommended_investment, future_savings_with_investment, graph_filename


# Example function usage
age = 35
retirement_age = 55
current_savings = 2000000
monthly_contribution = 1000
risk_tolerance = 5

investment, future_savings, graph_file = predict_and_calculate_investment(age, retirement_age, current_savings, monthly_contribution, risk_tolerance)
print(f"Recommended Investment: {investment}")
print(f"Future savings at retirement: {future_savings:,.2f}")
