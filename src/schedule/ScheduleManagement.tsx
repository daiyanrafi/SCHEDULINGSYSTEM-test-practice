import React from 'react';

interface ScheduleItem {
  starttime: string;
  endtime: string;
  name: string;
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

  // Function to format the date in the desired format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ marginLeft: '60px', marginRight: '900px', marginTop: '60px' }}>
      {schedule.map((item, index) => (
        <div key={index} style={{ marginBottom: '4px' }}>
          <div 
            style={{ 
              background: `linear-gradient(to right, #0fdb2b 01%, #a4edad 01%, #a4edad 100%)`,
              padding: '4px',
              margin: '2px 0',
              paddingLeft: '02%', // Start content after 10% deep color
              fontFamily: 'Calibri', // Set font to Calibri
              transition: 'background-color 0.3s', // Add transition for smooth effect
              borderRadius: '8px', // Add rounded borders
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffffff'} // Change background color on hover to white
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 128, 0, 0.1)'} // Revert background color when not hovering
          >
            <p style={{ margin: 0 }}>
              {/* <strong>Resource:</strong> {item.Resource.name}, &nbsp; */}
              {formatDate(item.starttime)} - {formatDate(item.endtime)} {item.name}
            </p>
          </div>
          {index < schedule.length - 1 && (
            <div 
              style={{ 
                background: `linear-gradient(to right, #0fdb2b 01%, #a4edad 01%, #a4edad 100%)`,
                padding: '4px',
                margin: '2px 0',
                paddingLeft: '02%', // Start content after 10% deep color
                fontFamily: 'Calibri', // Set font to Calibri
                transition: 'background-color 0.3s', // Add transition for smooth effect
                borderRadius: '8px', // Add rounded borders
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffffff'} // Change background color on hover to white
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'} // Revert background color when not hovering
            >
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
