import React from 'react';
import ScheduleManagement from './schedule/ScheduleManagement';
import scheduleData from './data/Alan.json';
import ScheduleDashboard from './Dashboard';
import DashboardParent from './DashboardParent';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        {/* <p>Scheduling System is coming here!!!</p> */}

        {/* <ScheduleDashboard /> */}
        {/* <ScheduleManagement schedule={scheduleData} /> */}

        <DashboardParent/>
      </header>
    </div>
  );
}

export default App;
