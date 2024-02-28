import React from 'react';

interface ScheduleItem {
  starttime: string;
  endtime: string;
  Resource: {
    name: string;
  };
}

const ScheduleManagement: React.FC<{ schedule: ScheduleItem[] }> = ({ schedule }) => {
  // Function to calculate the gap between two schedule items
  const calculateGap = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const gap = (end.getTime() - start.getTime()) / (1000 * 60); // Gap in minutes
    return gap;
  };

  return (
    <div style={{ marginLeft: '60px', marginRight: '60px', marginTop: '60px' }}>
      {schedule.map((item, index) => (
        <div key={index} style={{ marginBottom: '4px' }}>
          <div style={{ 
            background: `linear-gradient(to right, rgba(0, 128, 0, 0.5) 10%, rgba(0, 128, 0, 0.1) 10%, rgba(0, 128, 0, 0.1) 100%)`,
            padding: '4px',
            margin: '2px 0',
            paddingLeft: '10%', // Start content after 10% deep color
          }}>
            <p style={{ margin: 0 }}>
              <strong>Resource:</strong> {item.Resource.name}, &nbsp;
              <strong>Start:</strong> {new Date(item.starttime).toString()}, &nbsp;
              <strong>End:</strong> {new Date(item.endtime).toString()}
            </p>
          </div>
          {index < schedule.length - 1 && (
            <div style={{ 
              background: `linear-gradient(to right, rgba(0, 0, 255, 0.5) 10%, rgba(0, 0, 255, 0.1) 10%, rgba(0, 0, 255, 0.1) 100%)`,
              padding: '4px',
              margin: '2px 0',
              paddingLeft: '10%', // Start content after 10% deep color
            }}>
              <p style={{ margin: 0 }}>
                <strong>Gap:</strong> {calculateGap(item.endtime, schedule[index + 1].starttime)} Minutes
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleManagement;
