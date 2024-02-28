import React from 'react';

interface ScheduleItem {
  starttime: string;
  endtime: string;
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
    <div>
      {schedule.map((item, index) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          <p>
            <strong>Start:</strong> {new Date(item.starttime).toString()} &nbsp;
            <strong>End:</strong> {new Date(item.endtime).toString()}
          </p>
          {index < schedule.length - 1 && (
            <p>
              <strong>Gap:</strong> {calculateGap(item.endtime, schedule[index + 1].starttime)} Minutes
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleManagement;
