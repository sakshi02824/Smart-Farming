import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Set seed for reproducibility
np.random.seed(42)

# Define crops and their ideal REAL conditions (N, P, K, temp, hum, ph, rain)
# Ranges based on standard Indian agricultural datasets (Kaggle Crop Recommendation)
CROP_PROFILES = {
    'rice': {'N': (80, 10), 'P': (40, 5), 'K': (40, 5), 'temp': (23, 2), 'hum': (82, 3), 'rain': (230, 30), 'ph': (6.5, 0.4)},
    'maize': {'N': (100, 15), 'P': (45, 8), 'K': (20, 5), 'temp': (22, 3), 'hum': (65, 8), 'rain': (80, 20), 'ph': (6.2, 0.5)},
    'wheat': {'N': (120, 15), 'P': (60, 10), 'K': (40, 5), 'temp': (17, 3), 'hum': (30, 8), 'rain': (45, 10), 'ph': (6.8, 0.4)},
    'cotton': {'N': (110, 10), 'P': (50, 5), 'K': (30, 5), 'temp': (28, 3), 'hum': (75, 5), 'rain': (75, 15), 'ph': (7.2, 0.5)},
    'tea': {'N': (130, 15), 'P': (25, 5), 'K': (55, 8), 'temp': (22, 2), 'hum': (85, 3), 'rain': (250, 40), 'ph': (5.2, 0.3)},
    'coffee': {'N': (100, 10), 'P': (30, 5), 'K': (30, 5), 'temp': (24, 2), 'hum': (70, 5), 'rain': (155, 20), 'ph': (5.7, 0.3)},
    'mungbean': {'N': (20, 5), 'P': (45, 5), 'K': (20, 3), 'temp': (28, 2), 'hum': (85, 5), 'rain': (45, 10), 'ph': (6.7, 0.4)},
    'grapes': {'N': (25, 5), 'P': (125, 10), 'K': (200, 15), 'temp': (23, 3), 'hum': (82, 5), 'rain': (65, 10), 'ph': (6.0, 0.5)}
}

# 0: clay, 1: sandy, 2: loamy, 3: silt, 4: peaty, 5: saline
SOIL_PREFERENCES = {
    'rice': [0, 2],
    'maize': [1, 2, 3],
    'wheat': [2, 3],
    'cotton': [0, 1, 2],
    'tea': [4, 2],
    'coffee': [2, 4],
    'mungbean': [2, 1],
    'grapes': [2, 1]
}

def generate_synthetic_data(num_samples_per_crop=400):
    data = []
    
    for crop, profile in CROP_PROFILES.items():
        for _ in range(num_samples_per_crop):
            n = max(0, np.random.normal(profile['N'][0], profile['N'][1]))
            p = max(0, np.random.normal(profile['P'][0], profile['P'][1]))
            k = max(0, np.random.normal(profile['K'][0], profile['K'][1]))
            temp = np.random.normal(profile['temp'][0], profile['temp'][1])
            hum = np.random.normal(profile['hum'][0], profile['hum'][1])
            rain = np.random.normal(profile['rain'][0], profile['rain'][1])
            ph = np.random.normal(profile['ph'][0], profile['ph'][1])
            
            # Select a random valid soil type for this crop
            soil_type = np.random.choice(SOIL_PREFERENCES[crop])
            
            data.append([n, p, k, temp, hum, rain, soil_type, ph, crop])
            
    df = pd.DataFrame(data, columns=['N', 'P', 'K', 'temperature', 'humidity', 'rainfall', 'soil_type', 'ph_value', 'label'])
    return df

def train_and_save_model():
    print("Generating comprehensive dataset for crop prediction...")
    df = generate_synthetic_data()
    
    # Save dataset to CSV for reference
    dataset_path = os.path.join(os.path.dirname(__file__), 'dataset', 'synthetic_crop_data.csv')
    df.to_csv(dataset_path, index=False)
    print(f"Dataset generated and saved to {dataset_path}")
    
    # Prepare data for training
    X = df[['N', 'P', 'K', 'temperature', 'humidity', 'rainfall', 'soil_type', 'ph_value']]
    y = df['label']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Classifier...")
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = rf_model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model trained successfully. Test Accuracy: {accuracy * 100:.2f}%")
    
    # Save the model
    model_path = os.path.join(os.path.dirname(__file__), 'crop_prediction_model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(rf_model, f)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_and_save_model()
