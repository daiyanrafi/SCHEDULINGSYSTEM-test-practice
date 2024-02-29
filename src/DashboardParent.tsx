// DashboardParent.tsx

import React, { useState } from 'react';
import ScheduleDashboard from './Dashboard';
import resourcesData from './data/resource.json';
import bookingsData from './data/bookings.json';

const DashboardParent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleOpenModal = (rowData: any) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ScheduleDashboard
        resources={resourcesData}
        bookings={bookingsData}
        isModalOpen={isModalOpen}
        selectedRowData={selectedRowData}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default DashboardParent;
