import sys
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
import pickle

def load_or_train_model():
    try:
        with open('ml.pkl', 'rb') as f:
            model = pickle.load(f)
    except FileNotFoundError:
        data = pd.read_csv('./ex_data.csv')
        X = data[['age', 'savings', 'monthly_contribution', 'years_to_retirement', 'risk_tolerance']]
        y = data['recommended_investment']

        model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
        model.fit(X, y)

        with open('model.pkl', 'wb') as f:
            pickle.dump(model, f)

    return model

def predict_investment():
    if len(sys.argv) != 6:
        print("Error: Incorrect number of arguments")
        sys.exit(1)

    try:
        profile_data = [float(arg) for arg in sys.argv[1:]]
        model = load_or_train_model()
        prediction = model.predict([profile_data])

        investment_options = {
            0: 'Mutual funds',
            1: 'Gold',
            2: 'Real estate',
            3: 'Stock market',
            4: 'Crypto currency'
        }

        print(investment_options[prediction[0]])

    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    predict_investment()
