# VIVA QUESTIONS & ANSWERS
**Topic: Smart Climate-Based Farming Guidance System**

---

**Q1: What is the main objective of your project?**
**Answer:** The primary objective is to help farmers make data-driven decisions by combining real-time meteorological data with Machine Learning to recommend the most suitable crops for their specific soil and climate conditions. It also provides comprehensive farming sub-guides and weather alerts.

**Q2: Which Machine Learning algorithm did you use and why?**
**Answer:** I used the **Random Forest Classifier**. I chose it over a single Decision Tree because Random Forest builds an ensemble of multiple decision trees and outputting the mode of the classes. This significantly reduces the risk of "overfitting" the training data and yields a much higher accuracy on unseen data.

**Q3: What parameters or "features" does your ML model take as input?**
**Answer:** The model takes 5 inputs: Temperature (°C), Humidity (%), Rainfall (mm), Soil Type (Categorical), and pH Value.

**Q4: How does your frontend application communicate with your Machine Learning model?**
**Answer:** Our frontend is built in React. When the user fills out the form, React uses the **Axios** library to send an asynchronous HTTP POST request to our **FastAPI** backend (`/api/ml/recommend-crop`). The backend loads the pre-trained serialized model (`.pkl`), gets the prediction, and sends the JSON response back to React.

**Q5: Why did you choose FastAPI over Flask or Django for the backend?**
**Answer:** I chose FastAPI because it is significantly faster (built on Starlette and Pydantic) and natively supports asynchronous programming (`async/await`). It also automatically generates interactive Swagger OpenAPI documentation, which made testing the frontend integration very easy.

**Q6: What database are you using, and why?**
**Answer:** I am using **MongoDB**, a NoSQL database. Since agricultural data and alerts can have varying structures, NoSQL provides a flexible schema design that handles JSON-like documents perfectly. I used the `Motor` driver to ensure non-blocking, asynchronous database queries.

**Q7: How did you implement user security and authentication?**
**Answer:** User passwords are not stored in plain text; they are hashed using the `bcrypt` algorithm. For maintaining a session, we use **JWT (JSON Web Tokens)**. Upon successful login, the server sends a JWT, which the React app stores and attaches to the `Authorization` header of subsequent protected requests.

**Q8: How does the system fetch real-time weather?**
**Answer:** The backend acts as a secure proxy. When React requests weather data for a city, FastAPI makes a server-to-server request to the **OpenWeatherMap API** using a hidden API key, processes the large JSON response to extract only what we need (Temp, wind speed, 5-day forecast), and sends the clean data to the frontend.

**Q9: Where do you get the dataset to train the ML model?**
**Answer:** Due to the difficulty of sourcing localized granular real-world data, I wrote a Python script (`train.py`) utilizing NumPy's `random.normal()` function to generate a realistic synthetic dataset. The data clusters around established agronomic boundaries (e.g., Rice requiring high rainfall).

**Q10: What is the role of an Administrator in your system?**
**Answer:** The admin interface allows agricultural experts or local authorities to securely log in and do two things: (1) Add or update rich textual Farming Guides for new crops, and (2) Broadcast severe weather alerts (like heatwaves or heavy rain) directly to the farmers' dashboards.

**Q11: What were the major challenges you faced during this project?**
**Answer:** One challenge was connecting the asynchronous asynchronous FastAPI with the Scikit-Learn `.pkl` file without blocking the main event loop. Another was ensuring the React frontend handled API errors gracefully, providing clean validation feedback to the user rather than crashing.

**Q12: Is your React application responsive? How did you style it?**
**Answer:** Yes, it is fully responsive for both desktop and mobile devices. I used **Tailwind CSS**, a utility-first CSS framework, which allowed me to build custom components quickly using utility classes like `flex`, `grid`, and `md:flex-row` without writing a separate CSS file.

**Q13: What is "Vite" in your frontend stack?**
**Answer:** Vite is the build tool and development server I used instead of standard Create-React-App. Vite leverages native ES modules in the browser, providing a significantly faster, near-instant hot-module replacement (HMR) during development.

**Q14: How does the "Farming Insight" feature on the weather dashboard work?**
**Answer:** It's a localized logical check in the frontend. It evaluates the fetched weather data, and if the temperature exceeds a certain threshold (e.g., >30°C) coupled with low humidity, it dynamically renders an alert advising the farmer to increase irrigation frequency to prevent heat stress.

**Q15: How can this system be improved or scaled in the future?**
**Answer:** The system can be enhanced by integrating direct hardware IoT components (like physical soil moisture and pH sensors) directly feeding the API. We could also add a Computer Vision module using CNNs that lets farmers upload leaf images to detect crop diseases instantly.
