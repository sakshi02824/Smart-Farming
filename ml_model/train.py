import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Set seed for reproducibility
np.random.seed(42)

# Define crops and their ideal conditions (temp_mean, temp_std, hum_mean, hum_std, rain_mean, rain_std, ph_mean, ph_std)
CROP_PROFILES = {
    'Rice': {'temp': (25, 3), 'hum': (82, 5), 'rain': (200, 50), 'ph': (6.0, 0.5)},
    'Wheat': {'temp': (20, 4), 'hum': (50, 10), 'rain': (70, 20), 'ph': (6.5, 0.5)},
    'Maize': {'temp': (24, 4), 'hum': (65, 10), 'rain': (100, 30), 'ph': (6.2, 0.6)},
    'Cotton': {'temp': (28, 3), 'hum': (70, 10), 'rain': (90, 20), 'ph': (7.0, 0.5)},
    'Tea': {'temp': (22, 3), 'hum': (85, 5), 'rain': (250, 60), 'ph': (5.0, 0.4)},
    'Coffee': {'temp': (24, 2), 'hum': (70, 8), 'rain': (150, 40), 'ph': (5.5, 0.3)}
}

# 0: clay, 1: sandy, 2: loamy, 3: silt, 4: peaty, 5: saline
SOIL_PREFERENCES = {
    'Rice': [0, 2],
    'Wheat': [2, 3],
    'Maize': [1, 2, 3],
    'Cotton': [0, 2],
    'Tea': [4, 2],
    'Coffee': [2, 4]
}

def generate_synthetic_data(num_samples_per_crop=200):
    data = []
    
    for crop, profile in CROP_PROFILES.items():
        for _ in range(num_samples_per_crop):
            temp = np.random.normal(profile['temp'][0], profile['temp'][1])
            hum = np.random.normal(profile['hum'][0], profile['hum'][1])
            rain = np.random.normal(profile['rain'][0], profile['rain'][1])
            ph = np.random.normal(profile['ph'][0], profile['ph'][1])
            
            # Select a random valid soil type for this crop
            soil_type = np.random.choice(SOIL_PREFERENCES[crop])
            
            data.append([temp, hum, rain, soil_type, ph, crop])
            
    df = pd.DataFrame(data, columns=['temperature', 'humidity', 'rainfall', 'soil_type', 'ph_value', 'label'])
    return df

def train_and_save_model():
    print("Generating synthetic dataset for crop prediction...")
    df = generate_synthetic_data()
    
    # Save dataset to CSV for reference
    dataset_path = os.path.join(os.path.dirname(__file__), 'dataset', 'synthetic_crop_data.csv')
    df.to_csv(dataset_path, index=False)
    print(f"Dataset generated and saved to {dataset_path}")
    
    # Prepare data for training
    X = df[['temperature', 'humidity', 'rainfall', 'soil_type', 'ph_value']]
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
