# FINAL YEAR MAJOR PROJECT REPORT

## SMART CLIMATE-BASED FARMING GUIDANCE SYSTEM
**A Major Project Report**

**Submitted in partial fulfillment of the requirements for the degree of**
**[Your Degree (e.g., Bachelor of Technology / Master of Computer Applications)]**

**Submitted By:**
[Your Name]
[Your Roll Number]

**Under the Guidance of:**
[Guide's Name]
[Guide's Designation]

**Department of Computer Science & Engineering**
**[Your College/University Name]**
**[Year]**

---

## CERTIFICATE
This is to certify that the project report entitled **"SMART CLIMATE-BASED FARMING GUIDANCE SYSTEM"** submitted by **[Your Name]** (Roll No: **[Your Roll Number]**) to the Department of Computer Science & Engineering, **[Your College Name]**, in partial fulfillment for the award of the degree of **[Your Degree]**, is a bonafide record of the project work carried out by them under my supervision and guidance. 

The project report has not been submitted previously to this or any other University for the award of any degree or diploma.

**Signature of Guide**  \hfill **Signature of HOD**
[Guide's Name]          \hfill [HOD's Name]
[Designation]           \hfill Head of Department

---

## ACKNOWLEDGEMENT
I would like to express my profound gratitude to my project guide, **[Guide's Name]**, for their valuable guidance, continuous encouragement, and support throughout the course of this project. 

I am also highly obliged to the Head of the Department, **[HOD's Name]**, and all faculty members for providing the necessary facilities and a conducive environment to successfully complete this project.

Last but not least, I express my deepest appreciation to my family and friends for their unwavering support and motivation.

**[Your Name]**

---

## ABSTRACT
Agriculture is the backbone of the economy, but unpredictable climate changes and traditional farming methods often lead to severe crop losses and reduced yields. The **Smart Climate-Based Farming Guidance System** is an advanced, AI-driven web application designed to empower modern farmers globally. 

The proposed system integrates real-time meteorological data using the OpenWeatherMap API with a robust Machine Learning engine (Random Forest Classifier) to recommend the most suitable crops based on specific soil and environmental parameters (temperature, humidity, rainfall, soil type, and pH value). 

Furthermore, the system provides comprehensive end-to-end farming guidelines—from soil preparation to harvesting—and features an administrative broadcast system for real-time severe weather alerts. Developed using a modern technology stack encompassing React.js, FastAPI, MongoDB, and Scikit-Learn, this platform bridges the gap between traditional agriculture and modern technology, ensuring optimized resource utilization and maximized agricultural output.

---

## TABLE OF CONTENTS
1. [Chapter 1: Introduction](#chapter-1-introduction)
2. [Chapter 2: Literature Review](#chapter-2-literature-review)
3. [Chapter 3: System Analysis & Design](#chapter-3-system-analysis--design)
4. [Chapter 4: Technology Stack](#chapter-4-technology-stack)
5. [Chapter 5: Implementation](#chapter-5-implementation)
6. [Chapter 6: Machine Learning Model](#chapter-6-machine-learning-model)
7. [Chapter 7: Results & Output](#chapter-7-results--output)
8. [Chapter 8: Advantages & Limitations](#chapter-8-advantages--limitations)
9. [Chapter 9: Future Enhancements](#chapter-9-future-enhancements)
10. [Chapter 10: Conclusion](#chapter-10-conclusion)
11. [References](#references)

---

## Chapter 1: Introduction

### 1.1 Background
For centuries, agriculture has heavily relied on experiential knowledge passed down through generations. Farmers traditionally plant crops based on historical patterns. However, rapid global climate change has rendered historical patterns unreliable. Unexpected droughts, erratic rainfall, and shifting temperature zones severely impact crop yield. 

Simultaneously, the boom in Artificial Intelligence (AI) and data science provides unprecedented capabilities in predictive modeling. By applying these technological advancements to agriculture, we can shift from reactive farming to proactive, data-driven agriculture.

### 1.2 Problem Statement
Current farming practices face massive challenges due to a lack of accurate, localized, and timely data. 
- Farmers often select crops that are unsuitable for the current micro-climate and soil conditions, leading to financial ruin.
- Lack of access to modern farming protocols (best practices for new crop varieties).
- Absence of real-time alerts warning farmers of impending extreme weather, making them unable to protect their yields.

### 1.3 Objectives
The primary objectives of the Smart Climate-Based Farming Guidance System are:
1. To predict the optimal crop for a specific plot of land using environmental data (Soil Type, pH, Temperature, Rainfall, Humidity).
2. To provide real-time, location-specific weather forecasting and climate analytics to help farmers plan irrigation and harvesting.
3. To deliver structured, crop-specific farming guides.
4. To establish an admin-controlled broadcasting system for critical weather alerts.

### 1.4 Scope
The scope of this project is to deliver a functional, full-stack web application accessible via desktop and mobile devices. It caters to registered farmers who wish to analyze their land and to administrators (agriculture experts or local authorities) who can continuously update farming guides and push alerts. The Machine Learning component currently focuses on major staple and cash crops (Rice, Wheat, Maize, Cotton, Tea, Coffee) but is scalable to include hundreds of crop varieties.

---

## Chapter 2: Literature Review

### 2.1 Existing Systems
Various agricultural portals exist today, but they are often fragmented.
- **Traditional Weather Apps:** Provide weather data but lack agricultural context (e.g., how the weather impacts a specific crop).
- **Government Portals:** Provide rich documentation but are largely static, hard to navigate, and lacking personalized AI recommendations.
- **Standalone ML Models:** Many researchers have published crop recommendation models in Python notebooks, but they are rarely integrated into a user-friendly, accessible web interface for the end-user.

### 2.2 Limitations of Existing Systems
1. **Lack of Integration:** Users have to use one app for weather, another for crop advice, and consult local experts for soil analysis constraints.
2. **Poor User Experience:** Existing tools are often not designed with standard usability principles, making them difficult for remote users to navigate.
3. **Static Data:** Many recommendation systems use static threshold values rather than trained, dynamic Machine Learning models capable of handling complex, non-linear relationships.

### 2.3 Proposed System Advantages
The proposed **Smart Climate-Based Farming Guidance System** unifies all these requirements. 
- It creates a single, highly intuitive dashboard.
- It uses a **Random Forest Classifier** which provides high accuracy by avoiding overfitting (a common issue with decision trees).
- It provides scalable API architecture via FastAPI, ensuring that mobile apps or external IoT devices could easily plug into the backend in the future.

---

## Chapter 3: System Analysis & Design

### 3.1 System Architecture
The system follows a classic **Client-Server Architecture** with an independent Machine Learning pipeline and an external API dependency.
1. **Client (Frontend):** A React.js Single Page Application (SPA). It communicates with the backend via RESTful HTTP requests using Axios.
2. **Server (Backend):** A FastAPI application running on an ASGI server (Uvicorn). It handles authentication, data validation (Pydantic), and database interactions (Motor/Asyncio).
3. **Database Layer:** A MongoDB NoSQL database storing users, recommendations, alerts, and guides in JSON-like documents.
4. **External Services:** The backend interacts with the OpenWeatherMap API to fetch live meteorological data.
5. **Machine Learning Layer:** A pre-trained serialized model (`.pkl` format) is loaded into the FastAPI server's memory to serve predictions in milliseconds without requiring the user to download heavy ML libraries.

### 3.2 Data Flow Diagram (DFD)
**Level 0 DFD (Context Diagram):**
- The **Farmer** inputs land data into the system and receives a crop recommendation, weather forecast, and farming guides.
- The **Admin** inputs new guides and alerts into the system.
- The **System** requests weather data from the **OpenWeatherMap API** and receives JSON weather metrics.

**Level 1 DFD:**
1. **Authentication Process:** User credentials flow into the Auth module, which hashes passwords and returns a JWT token.
2. **Recommendation Process:** User environmental inputs flow into the ML Predictor Module. The module queries the `.pkl` model and returns the predicted string (e.g., "Wheat"), which is then saved to the Database.
3. **Weather Process:** User's city selection flows to the Backend Weather Route, which proxy-requests to OpenWeatherMap, parses the data, and returns formatted data to the UI.

### 3.3 Use Case Diagram
- **Actor: Farmer (User)**
  - Register & Login
  - View Real-Time Weather & 5-Day Forecast
  - Input Soil/Climate data to get Crop Recommendation
  - Browse Crop Farming Guides
  - View broadcasted alerts
- **Actor: Administrator**
  - Login (Admin Privileges)
  - Create/Update Farming Guides
  - Broadcast Severe Weather Alerts

### 3.4 Entity-Relationship (ER) Diagram Representation
Because we use MongoDB (NoSQL), we deal with Collections rather than relational tables.
- **Users Collection:** Contains `_id`, `name`, `email`, `hashed_password`, `role`.
- **Recommendations Collection:** Contains `_id`, `user_id` (reference to Users), `inputs` (embedded document with Temp, Hum, Rain, Soil, pH), `recommended_crop`, `timestamp`.
- **Farming_Guides Collection:** Contains `_id`, `crop_name`, `soil_preparation`, `seed_selection`, `irrigation_method`, `fertilizer_usage`, `pest_control`, `harvesting_time`.
- **Alerts Collection:** Contains `_id`, `type`, `severity`, `message`, `date_issued`.

---

## Chapter 4: Technology Stack

To ensure high performance, security, and scalability, standard modern technologies were chosen.

### 4.1 Frontend
- **React.js & Vite:** Used for building a lightning-fast Single Page Application (SPA). Vite provides rapid hot-module reloading during development.
- **Tailwind CSS:** A utility-first CSS framework used for responsive, highly aesthetic matching the theme (greens and earth tones).
- **Lucide React:** Used for scalable, clean SVG icons (Weather icons, UI symbols).
- **Axios:** For making asynchronous HTTP requests to the backend.

### 4.2 Backend
- **FastAPI (Python):** Chosen over Flask/Django because of its unmatched speed (comparable to NodeJs/Go) and its auto-generation of Swagger/OpenAPI documentation.
- **PyJWT & Passlib:** Utilized for secure, stateless user authentication.
- **Pydantic:** Used for strict data validation ensuring bad requests are rejected before hitting the database.

### 4.3 Database
- **MongoDB & Motor:** A NoSQL database that offers flexible schema design, pairing perfectly with JavaScript/Python dictionaries. The `Motor` driver is used to ensure asynchronous, non-blocking database queries in FastAPI.

### 4.4 Machine Learning
- **Scikit-Learn:** The core ML library in Python used for the Random Forest algorithm.
- **Pandas & NumPy:** Utilized in the training phase (`train.py`) to generate synthetic data based on real agronomic boundaries and to format dataframes for training.

### 4.5 External APIs
- **OpenWeatherMap API:** Provides geographic coordinates calculation and highly accurate meteorological metrics.

---

## Chapter 5: Implementation

The implementation phase is divided into discrete, logically separated modules.

### 5.1 Authentication Module
Security is paramount. When a user registers, their password is not stored in plain text. Instead, `bcrypt` is used to hash the password. During login, the backend validates the password and issues a JSON Web Token (JWT). This token is stored in the frontend's `localStorage` and attached to the `Authorization` header of all subsequent protected API requests (like ML prediction).

### 5.2 Weather Dashboard Module
The Vite React frontend contains a `WeatherDashboard.jsx` component. When loaded, it triggers an Axios call to `http://localhost:8005/api/weather/?city=[CityName]`. The FastAPI backend intercepts this, securely attaches the hidden OpenWeatherMap API Key from `.env`, calls the external API, cleans up the massive JSON response into a concise format (temperature, humidity, wind speed, 5-day array), and sends it back to the React UI.

### 5.3 Crop Recommendation Module
The `CropRecommendation.jsx` user interface accepts numeric inputs for climatic and soil conditions. Upon form submission:
1. React prevents default postback and triggers a loading spinner.
2. The payload is sent to `/api/ml/recommend-crop`.
3. The FastAPI router passes the inputs to the loaded Scikit-Learn `.pkl` model.
4. The `.predict()` method instantly evaluates the decision trees and returns a crop label.
5. The backend appends contextual insights (e.g., suitable season) and logs it in the database before sending it to the user.

### 5.4 Admin Control Panel
The `Admin.jsx` component provides a dual-tab interface. Admins can fill out a comprehensive form detailing soil preparation and pest control for a new crop. Submitting this sends a POST request to `/api/admin/guides`. Similarly, alerts with High/Critical severity can be pushed to the database, which instantly appear on the user's dashboard.

---

## Chapter 6: Machine Learning Model

The brain behind the recommendation engine is an Artificial Intelligence model based on supervised learning.

### 6.1 Dataset Generation
Because real-world hyper-local datasets can be sparse and proprietary, a realistic synthetic dataset generation script (`train.py`) was implemented. It utilizes agronomic profiles for crops. For instance, Rice needs high rainfall (200mm mean) and a temp around 25°C, whereas Wheat needs less rainfall (70mm mean) and a temp around 20°C. NumPy's `random.normal()` function generates hundreds of data points clustering around these means, simulating real-world variance.

### 6.2 Features
The model takes 5 independent variables (features):
1. **Temperature (°C)**
2. **Humidity (%)**
3. **Rainfall (mm)**
4. **Soil Type (Categorical mapped to numeric: Clay, Sandy, Loamy...)**
5. **pH Value**

The dependent variable (label) is the **Crop Name**.

### 6.3 Algorithm: Random Forest Classifier
We utilized a **Random Forest Classifier** (`n_estimators=100`). 
- **Why Random Forest?** Unlike a single Decision Tree that is highly prone to overfitting (memorizing the training data), Random Forest builds multiple decision trees during training and merges them together. The output is the mode of the classes (classification) of the individual trees, resulting in a highly robust and accurate model.

### 6.4 Training Process & Evaluation
Using Scikit-Learn's `train_test_split`, the generated dataset was split into an 80% training set and a 20% testing set. The model was fitted using `rf_model.fit(X_train, y_train)`. 
When evaluated against the hidden test set (`y_test`), the model achieved near-perfect accuracy owing to the defined statistical clustering. The final model was then serialized (pickled) into `crop_prediction_model.pkl`.

---

## Chapter 7: Results & Output

The system was deployed locally and tested rigorously.

### 7.1 Visual Interfaces (Screenshots / UI Description)
1. **Home/Landing Page:** Features a vibrant, modern hero section welcoming farmers and explaining the system's capabilities.
2. **Weather Dashboard:** Displays a massive central card indicating the current temperature with dynamic Lucide icons (Sun, Cloud, Rain). A 5-day forecasting grid sits adjacent, providing instant visual analysis. An intelligent "Farming Insight" dynamically generated based on current humidity/temp warns if irrigation frequency should increase.
3. **AI Crop Recommender UI:** A split-screen layout. The left side holds a clean, validated form for soil/climate inputs. The right side features an animated result area that reveals the recommended crop in striking green typography, alongside reasoning.
4. **Admin Console:** A secure dark-themed layout allowing privileged users to publish guides and alerts without needing database access.

### 7.2 System Output Examples
- **Input:** Temp: 26°C, Humidity: 82%, Rain: 210mm, Soil: Clay, pH: 6.2
- **Output:** The Random Forest Model successfully predicts **Rice**, and outputs reasoning based on its high water requirement.

---

## Chapter 8: Advantages & Limitations

### 8.1 Advantages
- **High Accuracy:** Utilizing ML algorithms reduces the risk of crop failure compared to guessing based on historical data.
- **Unified Ecosystem:** Combines weather APIs, farming documentation, and AI predictions into a single interface.
- **Modern Architecture:** The FastAPI + React stack ensures extreme scalability and rapid response times without page reloads.
- **Secure:** JWT implementation ensures user data privacy.

### 8.2 Limitations
- **Internet Dependency:** The system requires an active internet connection to communicate with the OWM API and ML Server.
- **Hardware Integration:** Currently, users must manually input soil pH and moisture. It is not currently linked directly to physical IoT agricultural sensors.
- **Dataset Constraints:** The synthetic dataset handles major crops but requires real-world longitudinal data to fine-tune to granular indigenous crop variants.

---

## Chapter 9: Future Enhancements

The project is designed with modularity in mind, allowing for vast future improvements.
1. **IoT Sensor Integration:** Developing a hardware module (e.g., Raspberry Pi with NPK and soil moisture sensors) that automatically sends data to the FastAPI backend, removing the need for manual input.
2. **Multilingual Support:** Implementing i18n in the React frontend to support regional languages (Hindi, Marathi, Tamil, etc.) crucial for rural farmers.
3. **Computer Vision (Disease Detection):** Adding an image upload feature where farmers can upload pictures of diseased leaves, and a Convolutional Neural Network (CNN) identifies the disease and suggests pesticides.
4. **Market Prices Integration:** Linking with government API endpoint to show live crop market prices (Mandi prices) to assist in economic planning.

---

## Chapter 10: Conclusion

The Smart Climate-Based Farming Guidance System bridges the profound gap between traditional agricultural practices and modern computational intelligence. By architecting a cohesive platform utilizing React.js, FastAPI, and Scikit-Learn, this project successfully demonstrates how predictive Machine Learning and real-time cloud APIs can be synthesized into an actionable tool for societal benefit. 

The successful implementation of the Random Forest crop recommendation sub-system guarantees data-driven decisions that minimize risk and maximize crop yield. Ultimately, this system stands as a potent template for the future of Agri-Tech globally.

---

## References
1. Breiman, L. (2001). Random Forests. Machine Learning, 45(1), 5-32.
2. Scikit-learn Developers. (2023). Scikit-learn: Machine Learning in Python.
3. FastAPI Documentation by Sebastián Ramírez. (https://fastapi.tiangolo.com/)
4. React Documentation. (https://react.dev/)
5. OpenWeatherMap API Documentation. (https://openweathermap.org/api)
6. McKinney, W. (2010). Data Structures for Statistical Computing in Python. (Pandas).
