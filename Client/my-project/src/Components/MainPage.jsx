import React, { useState, useEffect } from "react";
import delekLogo from "../assets/Delek Logo.png";
import pazLogo from "../assets/Paz-Logo.png";
import tenLogo from "../assets/Ten0Logo.png";
import sonolLogo from "../assets/Sonol-Logo.png";
import AppleCarousel from "./SliderBar";

const MainPage = () => {
  const [pricesData, setPricesData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/delek")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Debug log
        setPricesData(data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const formatPrices = (data) => {
    console.log("Formatting data:", data); // Debug log
    if (!data) return [];
    return [
      { id: 1, text: `בנזין 95`, price: `₪${data.Benzin95 || "N/A"}` },
      { id: 2, text: `בנזין 98`, price: `₪${data.Benzin98 || "N/A"}` },
      { id: 3, text: `סולר`, price: `₪${data.Solar || "N/A"}` },
    ];
  };

  const CompanySection = ({ logo, name, data }) => {
    console.log(`${name} data:`, data); // Debug log
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-md mx-auto">
        <div className="flex items-center mb-4">
          <img src={logo} alt={`${name} Logo`} className="w-12 h-12 mr-4" />
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        </div>
        <AppleCarousel items={formatPrices(data)} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          😉דלק חכם
        </h1>
        <CompanySection logo={pazLogo} name="Paz" data={pricesData.dorAlon} />
        <CompanySection logo={delekLogo} name="Delek" data={pricesData.delek} />
        <CompanySection logo={sonolLogo} name="Sonol" data={pricesData.sonol} />
      </div>
    </div>
  );
};

export default MainPage;
