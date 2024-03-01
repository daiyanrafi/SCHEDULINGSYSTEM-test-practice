import React from "react";
import { Modal, Box, Button } from "@mui/material";
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';

const ScheduleDashboard: React.FC<{
  resources: any[];
  bookings: any[];
  isModalOpen: boolean;
  selectedRowData: ScheduleItem | null;
  onOpenModal: (rowData: ScheduleItem) => void;
  onCloseModal: () => void;
}> = ({
  resources,
  bookings,
  isModalOpen,
  selectedRowData,
  onOpenModal,
  onCloseModal,
}) => {
  const groups = resources.map(resource => ({
    id: resource.bookableresourceid,
    title: resource.name,
  }));

  const items = bookings.map((booking, index) => ({
    id: index,
    group: booking.Resource.bookableresourceid,
    title: booking.name,
    start_time: moment(booking.starttime),
    end_time: moment(booking.endtime),
  }));

  return (
    <div style={{ marginTop: "20px", marginLeft: "50px", marginRight: "50px" }}>
      <Timeline
  groups={groups}
  items={items}
  defaultTimeStart={moment("2024-02-25")}
  defaultTimeEnd={moment("2024-04-12")}
/>

      <Modal open={isModalOpen} onClose={onCloseModal}>
        <Box
          sx={{
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
          }}
        >
          {selectedRowData && (
            <div>
              <div style={{ marginBottom: "10px" }}>
                <p>Name: {selectedRowData.name}</p>
                <p>Start Time: {selectedRowData.starttime}</p>
                <p>End Time: {selectedRowData.endtime}</p>
              </div>
              <Button
                onClick={onCloseModal}
                variant="contained" // Add variant to make the button prominent
                color="primary" // Set color to primary for a blue background
              >
                Close
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ScheduleDashboard;

interface ScheduleItem {
  starttime: string;
  endtime: string;
  name: string;
  Resource: {
    name: string;
    bookableresourceid: string;
  };
}
