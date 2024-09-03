import React from "react";

const AppleCarousel = ({ items }) => {
  console.log("AppleCarousel items:", items); // Debug log
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-gray-50 rounded-xl p-4 text-center shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500 mb-1">{item.text}</p>
          <p className="text-2xl font-semibold text-gray-900">{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default AppleCarousel;
