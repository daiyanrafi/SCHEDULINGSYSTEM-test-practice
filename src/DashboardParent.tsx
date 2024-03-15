import React, { useState } from 'react';
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
  };

  const handleBackwardClick = () => {
    console.log("Backward");
  };

  const handleAppointmentClick = (schedule: any) => {
    console.log("Appointment clicked", schedule);
  };

  const handleEmptyCellClick = (header: any) => {
    console.log("Empty cell clicked", header);
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
        onAppointmentClick={handleAppointmentClick} 
        onEmptyCellClick={handleEmptyCellClick}
      />
    </div>
  );
};

export default DashboardParent;
