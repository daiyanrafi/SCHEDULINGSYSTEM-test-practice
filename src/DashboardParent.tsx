import React from 'react';
import ScheduleDashboard from './Dashboard';
import resourcesData from './data/resource.json';
import bookingsData from './data/bookings.json';

const DashboardParent = () => {
  return (
    <div>
      <ScheduleDashboard resources={resourcesData} bookings={bookingsData} />
    </div>
  );
};

export default DashboardParent;
