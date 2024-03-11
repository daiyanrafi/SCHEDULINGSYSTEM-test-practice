import React, { useState } from 'react';
import ScheduleDashboard from './Dashboard';
import resourcesData from './data/resource.json';
import bookingsData from './data/bookings.json';
import SABSCalendar from './modules/sabscalendar/SABSCalendar';

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

  const handleForwardClick = () => {
    console.log("Forward");
    // Add your logic here
  };

  const handleBackwardClick = () => {
    console.log("Backward");
    // Add your logic here
  };

  return (
    <div>
      <SABSCalendar
        resources={resourcesData}
        bookings={bookingsData}
        isModalOpen={isModalOpen}
        selectedRowData={selectedRowData}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        onForwardClick={handleForwardClick}
        onBackwardClick={handleBackwardClick}
      />
    </div>
  );
};

export default DashboardParent;
