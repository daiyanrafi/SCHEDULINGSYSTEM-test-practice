import React from "react";

interface ScheduleItem {
  starttime: string;
  endtime: string;
  name: string;
  Resource: {
    name: string;
  };
}

interface ScheduleManagementProps {
  schedule: ScheduleItem[];
  onRowClick: (rowData: ScheduleItem) => void;
}

const ScheduleManagement: React.FC<ScheduleManagementProps> = ({
  schedule,
  onRowClick,
}) => {
  const calculateGap = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const gap = (end.getTime() - start.getTime()) / (1000 * 60);
    return gap;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-AU", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{ marginLeft: "0px", marginRight: "10px", padding: "8px" }}>
      {schedule.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "4px",
            paddingRight: "4px",
            cursor: "pointer",
          }}
          onClick={() => onRowClick(item)} // <-- Added onClick handler
        >
          <div
            style={{
              backgroundColor: "#B2D8F4",
              borderLeft: "5px solid #2582D7",
              padding: "4px",
              margin: "2px 0",
              paddingLeft: "02%",
              fontFamily: "Calibri",
              transition: "background-color 0.3s",
              borderRadius: "8px",
            }}
          >
            <p style={{ margin: 0 }}>
              {formatDate(item.starttime)} - {formatDate(item.endtime)}{" "}
              <b>{item.name}</b>
            </p>
          </div>
          {index < schedule.length - 1 &&
            calculateGap(item.endtime, schedule[index + 1].starttime) > 0 && (
              <div
                style={{
                  background: `linear-gradient(to right, #0fdb2b 01%, #a4edad 01%, #a4edad 100%)`,
                  padding: "4px",
                  margin: "2px 0",
                  paddingLeft: "02%",
                  fontFamily: "Calibri",
                  transition: "background-color 0.3s",
                  borderRadius: "8px",
                }}
              >
                <p style={{ margin: 0, cursor: "pointer" }}>
                  <strong>Gap:</strong>{" "}
                  {calculateGap(item.endtime, schedule[index + 1].starttime)}{" "}
                  Minutes
                </p>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleManagement;
