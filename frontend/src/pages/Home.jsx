import React from 'react';
import { Link } from 'react-router-dom';
import { CloudRain, Leaf, BookOpen, LineChart } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center py-16 px-4 bg-gradient-to-br from-green-500 to-green-700 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Cultivate the Future
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light">
            Smart climate-based guidance and machine learning recommendations tailored for your farm.
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <Link to="/recommend" className="bg-white text-green-700 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Recommendation
            </Link>
            <Link to="/weather" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-700 transition-all duration-300">
              Check Weather
            </Link>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          icon={<CloudRain className="h-10 w-10 text-blue-500" />}
          title="Real-Time Weather"
          description="Live data and 5-day forecasts from OpenWeatherMap."
          link="/weather"
        />
        <FeatureCard 
          icon={<Leaf className="h-10 w-10 text-green-500" />}
          title="ML Crop Predictor"
          description="Find the best crop using our Random Forest algorithm."
          link="/recommend"
        />
        <FeatureCard 
          icon={<BookOpen className="h-10 w-10 text-yellow-500" />}
          title="Farming Guides"
          description="Detailed guidance on soil, irrigation, and pest control."
          link="/guides"
        />
        <FeatureCard 
          icon={<LineChart className="h-10 w-10 text-purple-500" />}
          title="Climate Analytics"
          description="Visual charts for tracking temperature and rainfall trends."
          link="/analytics"
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, link }) => (
  <Link to={link} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
    <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Link>
);

export default Home;
