# Smart Climate-Based Farming Guidance System

A production-level full-stack college major project that provides smart agriculture recommendations using real-time weather data and machine learning.

## Features
- **User Authentication**: Secure JWT-based login/register with password hashing via bcrypt.
- **Weather Dashboard**: Real-time integration with OpenWeatherMap API for 5-day forecasts.
- **ML Crop Recommendation**: Predicts the best crop given Soil Type, pH, Temperature, Rainfall, and Humidity using a Random Forest algorithm.
- **Farming Guides**: Comprehensive step-by-step guidance for cultivating different crops.
- **Climate Analytics**: Recharts-based dynamic data visualization for historical climate insights.
- **Admin Panel**: Add new guides and broadcast real-time severe weather alerts.

## Technology Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Axios, Recharts, Lucide React
- **Backend**: FastAPI, Python, Motor (Async MongoDB), PyJWT, Uvicorn
- **Machine Learning**: Scikit-Learn, Pandas, Numpy
- **Database**: MongoDB

## Folder Structure
```text
smart-farming-system/
├── backend/                  # FastAPI Application
│   ├── config/               # Pydantic Settings & Env Config
│   ├── controllers/
│   ├── models/               # Pydantic Schemas
│   ├── routes/               # FastAPI API Endpoints
│   ├── services/             # Auth/JWT Services 
│   ├── main.py               # Application Entrypoint
│   └── requirements.txt      # Python Dependencies
├── frontend/                 # React Vite Application
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   ├── pages/            # Application Screens
│   │   ├── App.jsx           # Routing Setup
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
├── ml_model/                 # ML Models and scripts
│   ├── dataset/
│   ├── train.py              # Script to generate synthetic data and train Random Forest
│   └── crop_prediction_model.pkl
└── README.md
```

## Installation Instructions

### Prerequisites
- Node.js (v16+)
- Python 3.9+
- MongoDB (running locally or a MongoDB Atlas URI)
- OpenWeatherMap API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Virtual Environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up Environment Variables:
   Create a `.env` file in the `backend` folder:
   ```env
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=smart_farming_db
   SECRET_KEY=enter_your_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   OPENWEATHERMAP_API_KEY=enter_your_openweathermap_api_key_here
   ```
5. Run the Server:
   ```bash
   uvicorn main:app --reload
   ```
   *The API will be available at `http://localhost:8000`. Swagger documentation is at `http://localhost:8000/docs`.*

### ML Setup (Optional, model mocked by default if not present)
To generate the dataset and train the `.pkl` model:
```bash
cd ml_model
python train.py
```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at the local URL provided by Vite (usually `http://localhost:5173`).*

## API Endpoints
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Authenticate and receive JWT
- `GET /api/weather/?city={city}` - Fetch external weather
- `POST /api/ml/recommend-crop` - Process ML prediction
- `GET /api/guides/farming-guide` - Retrieve guides
- `GET /api/admin/alerts` - Retrieve latest alerts
- `POST /api/admin/guides` - Admin insert guide
- `POST /api/admin/alerts` - Admin insert alert

## Database Schema (MongoDB Collections)
- **users**: `{_id, name, email, hashed_password}`
- **recommendations**: `{_id, user_id, inputs: {temp, hum, rain...}, recommended_crop, reason, suitable_season}`
- **farming_guides**: `{_id, crop, soil_preparation, seed_selection, irrigation_method, fertilizer_usage...}`
- **alerts**: `{_id, type, severity, message}`
