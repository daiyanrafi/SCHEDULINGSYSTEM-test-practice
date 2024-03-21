import React, { useEffect, useState } from 'react';
import ChargesTable from './ChargesTable';

import chargesData from './data/charges.json'; // Assuming charges.json is in the same directory

const ParentComponent: React.FC = () => {
  const [charges, setCharges] = useState<any[]>([]); // Change any[] to the appropriate type

  // Load charges data when the component mounts
  useEffect(() => {
    setCharges(chargesData);
  }, []);

  return (
    <div>
      <ChargesTable charges={charges} />
    </div>
  );
};

export default ParentComponent;
