import React from "react";

const AppleCarousel = ({ items }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {items.map((item) => (
        <div key={item.id} className="w-1/3 p-2">
          <div className="bg-gray-400  shadow rounded-lg px-2 py-4 text-center text-sm">
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppleCarousel;
