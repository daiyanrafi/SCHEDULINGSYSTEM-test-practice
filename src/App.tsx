// import React from 'react';
// import ScheduleManagement from './ScheduleManagement';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Scheduling System is coming here!!!
//         </p>
//         <ScheduleManagement />
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import ScheduleManagement from './schedule/ScheduleManagement';
import scheduleData from './data/Alan.json'; // Adjust the path as needed
import ScheduleDashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        {/* <p>Scheduling System is coming here!!!</p> */}

        <ScheduleManagement schedule={scheduleData} />
        <ScheduleDashboard />
      </header>
    </div>
  );
}

export default App;

