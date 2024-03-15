import React, { useRef } from "react";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";

export interface ScheduleItem {
  starttime: string;
  endtime: string;
  name: string;
  Resource: {
    name: string;
  };
  callspan?: number;
}

const ScheduleManagement: React.FC<{
  schedule: ScheduleItem[];
  onRowClick: (rowData: ScheduleItem) => void;
}> = ({ schedule, onRowClick }) => {
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

  // const [isBlankCellModalOpen, setIsBlankCellModalOpen] = React.useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRowDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && containerRef.current === e.target) {
      // setIsBlankCellModalOpen(true);
    }
  };

  return (
    <div
      style={{ marginLeft: "0px", marginRight: "10px", padding: "8px" }}
      onDoubleClick={handleRowDoubleClick}
      ref={containerRef}
    >
      {schedule.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "4px",
            paddingRight: "4px",
            cursor: "pointer",
          }}
          onClick={() => onRowClick(item)}
        >
          <div
            style={{
              backgroundColor: "#B2D8F4",
              borderLeft: "5px solid #2582D7",
              margin: "2px 0",
              paddingLeft: "02%",
              fontFamily: "Calibri",
              transition: "background-color 0.3s",
              borderRadius: "8px",
              padding: "4px 10px",
            }}
          >          
           {/* <p style={{ margin: 0 }}>
              {formatDate(item.starttime)} - {formatDate(item.endtime)}{" "}
              <b>{item.name}</b>
            </p> */}
            
              <b>{item.name}</b>
          </div>
          {index < schedule.length - 1 &&
            calculateGap(item.endtime, schedule[index + 1].starttime) > 0 && (
              <div
                style={{
                  background: "#a4edad",
                  borderLeft: "5px solid #0fdb2b",
                  padding: "4px",
                  margin: "2px 0",
                  paddingLeft: "06%",
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
      {/* <Modal open={isBlankCellModalOpen} onClose={() => setIsBlankCellModalOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#FFFFFF",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "30%",
          minHeight: "60%",
          overflow: "auto",
        }}>
          <div>
            <p>Please click the cell</p>
          </div>
        </Box>
      </Modal> */}

    </div>
  );
};

export default ScheduleManagement;
