import React from "react";
import delekLogo from "../assets/Delek Logo.png";
import pazLogo from "../assets/Paz-Logo.png";
import tenLogo from "../assets/Ten0Logo.png";
import sonolLogo from "../assets/Sonol-Logo.png";
import AppleCarousel from "./SliderBar";

const MainPage = () => {
  const dataFromDatabase = [
    { id: 1, text: "לליטר 7.5" },
    { id: 2, text: "לליטר 8.0" },
    { id: 3, text: "לליטר 6.5" },

    // ...
  ];
  return (
    <div>
      <div className="p-4  flex justify-center text-4xl font-bold">
        😉דלק חכם
      </div>
      <div className="flex flex-col items-center text text-4xl font-bold">
        <div>
          <img src={pazLogo} alt="Girl in a jacket" width="50" height="50" />
        </div>
        <div>
          <AppleCarousel items={dataFromDatabase} />
        </div>
      </div>
      <br />
      <div className="flex flex-col items-center text text-4xl font-bold">
        <div>
          <img src={delekLogo} alt="Girl in a jacket" width="50" height="50" />
        </div>
        <div>
          <br />
          <AppleCarousel items={dataFromDatabase} />
          <br />
        </div>
      </div>

      <div className="flex flex-col items-center text text-4xl font-bold">
        <div>
          <img src={sonolLogo} alt="Girl in a jacket" width="50" height="50" />
        </div>
        <div>
          <br />
          <AppleCarousel items={dataFromDatabase} />
          <br />
        </div>
      </div>
      <div className="flex flex-col items-center text text-4xl font-bold">
        <div>
          <img src={tenLogo} alt="Girl in a jacket" width="50" height="50" />
        </div>
        <div>
          <br />
          <AppleCarousel items={dataFromDatabase} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
