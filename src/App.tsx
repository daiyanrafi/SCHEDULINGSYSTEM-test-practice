import React from "react";
import ScheduleManagement from "./schedule/ScheduleManagement";
import scheduleData from "./data/Alan.json";
import ScheduleDashboard from "./Dashboard";
import DashboardParent from "./DashboardParent";
import TestTable from "./modules/sabscalendar/TestTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <p>Scheduling System is coming here!!!</p> */}

        {/* <ScheduleDashboard /> */}
        {/* <ScheduleManagement schedule={scheduleData} /> */}

        <DashboardParent />
        {/* <TestTable /> */}
      </header>
    </div>
  );
}

export default App;
