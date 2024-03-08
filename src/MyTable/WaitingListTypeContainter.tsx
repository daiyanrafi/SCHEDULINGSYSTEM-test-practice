import React, { useState, useEffect, useRef } from "react";
import WaitingListType from "./WaitingListType";
import data from "./data.json";
import waitlisttypes from "./waitlisttypes.json";


interface Row {
  clientName: string;
  age: number;
  opened: string;
  days: number;
  priority: string;
  site: string;
  type: string;
  serviceCategory: string;
  fundingSource: string;
  fundingStart: string;
  fundingEnd: string;
  emailAddress: string;
  mobileNumber: string;
}

const WaitingListTypeContainer = () => {
  useEffect(() => {
  }, []);

  return (
    <WaitingListType data={data} waitlisttypes={waitlisttypes} />
  );
};

export default WaitingListTypeContainer;
