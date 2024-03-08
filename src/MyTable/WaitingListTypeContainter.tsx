import React, { useState, useEffect, useRef } from "react";
import WaitingListType from "./WaitingListType";
import data from "./data.json";
import waitlisttypes from "./waitlisttypes.json";

const WaitingListTypeContainer = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  useEffect(() => {
    // This code will run once when the component mounts
    // You can put any initialization logic here
  }, []); // Empty dependency array means it will run only once

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    // Handle the button click here, you can perform any additional actions based on the button clicked.
    console.log("Button clicked in container:", buttonName);
  };

  return (
    <WaitingListType
      data={data}
      waitlisttypes={waitlisttypes}
      onButtonClick={handleButtonClick}
    />
  );
};

export default WaitingListTypeContainer;
