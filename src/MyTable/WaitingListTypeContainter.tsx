import React, { useState, useEffect, useRef } from "react";
import WaitingListType from "./WaitingListType";
import data from "./data.json";
import waitlisttypes from "./waitlisttypes.json";
import fundingtypes from "./fundingtypes.json";
import plantypes from "./plantypes.json";

const WaitingListTypeContainer = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const formatcategories = (wltypes: any[]) => {
    let categories: any[] = [];
    wltypes.map((cat: any) => {
            if (!categories.find(ct => cat.sabs_category === ct.key)) {
                categories.push({ key: cat.sabs_category, text: cat.sabs_category });
            }
        });

        setCategories(categories);
  }

  useEffect(() => {
    formatcategories(waitlisttypes);
  }, []); 

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    console.log("Button clicked in parent:", buttonName);
  };

  const onSave = (item: any, category: string | number, type: string | number) => {
    console.log('Selected Item');
      console.log(item);
  }

  return (
    <WaitingListType
      data={data}
      waitlisttypes={waitlisttypes}
      categories={categories}
      fundingtypes={fundingtypes}
      plantypes={plantypes}
      onButtonClick={handleButtonClick}
      onSaveClick={onSave}
    />
  );
};

export default WaitingListTypeContainer;
