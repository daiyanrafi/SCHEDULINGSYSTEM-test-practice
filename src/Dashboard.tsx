import React, { useEffect } from "react";
import resources from "./data/resource.json";
import bookings from "./data/bookings.json";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import ScheduleManagement from "./schedule/ScheduleManagement";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ScheduleDashboard: React.FC<{ resources: any[]; bookings: any[] }> = ({
  resources,
  bookings,
}) => {
  const startDate = new Date("2024-02-25T23:00:00Z");
  const endDate = new Date("2024-04-12T23:00:00Z");
  const selectedDay: Number = 3;
  const [noofDays, setnoofDays] = React.useState<number>(0);
  const [headers, setHeaders] = React.useState<IScheduleColumn[]>([]);
  const [selectedRowData, setSelectedRowData] = React.useState<ScheduleItem | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const getbookingsforaday = (
    bookings: any,
    resourceid: string,
    day: number,
    month: number,
    year: number
  ) => {
    let bookingtext = "";
    let daybookings: any = [];
    bookings.map((booking: any) => {
      const bdate = new Date(booking.starttime);
      if (
        booking.Resource.bookableresourceid === resourceid &&
        bdate.getDate() === day &&
        bdate.getMonth() + 1 === month &&
        bdate.getFullYear() === year
      ) {
        bookingtext +=
          " " +
          bdate.getHours() +
          ":" +
          bdate.getMinutes() +
          " " +
          booking.name +
          `,`;
        daybookings.push(booking);
      }
    });
    return (
      <TableCell
        sx={{
          fontFamily: "Calibri",
          border: "1px solid #E0E0E0",
          padding: "8px",
          backgroundColor: "#FAFAFA",
          verticalAlign: "top",
          height: "150px",
          width: "300px",
        }}
      >
        <ScheduleManagement
          schedule={daybookings}
          onRowClick={(rowData: ScheduleItem) => {
            setSelectedRowData(rowData);
            setIsModalOpen(true);
          }}
        />
      </TableCell>
    );
  };

  const columns = (headers: IScheduleColumn[], resourceid: string) => {
    return headers.map((header: IScheduleColumn) => {
      return getbookingsforaday(
        bookings,
        resourceid,
        header.day,
        header.month,
        header.year
      );
    });
  };

  const setHeaderSettings = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) return [];

    const headersl = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (selectedDay === undefined || currentDate.getDay() === selectedDay) {
        const header: IScheduleColumn = {
          month: currentDate.getMonth() + 1,
          day: currentDate.getDate(),
          year: currentDate.getFullYear(),
        };
        headersl.push(header);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setHeaders(headersl);
  };

  const tableheader = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) return [];

    const headers = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (selectedDay === undefined || currentDate.getDay() === selectedDay) {
        const headerTitle = currentDate.toLocaleDateString("en-AU", {
          weekday: "long",
          day: "numeric",
          month: "short",
        });
        headers.push(
          <TableCell
            key={currentDate.toISOString()}
            sx={{
              fontFamily: "Calibri",
              border: "1px solid #E0E0E0",
              padding: "8px",
              textAlign: "center",
              backgroundColor: "#FFFFFF",
              color: "#333",
              fontWeight: "bold",
              textTransform: "uppercase",
              width: "50px", // Same width as the schedule columns
            }}
          >
            <Typography variant="h3" sx={{ fontSize: 16 }}>
              {headerTitle}
            </Typography>
          </TableCell>
        );
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return headers;
  };

  useEffect(() => {
    setHeaderSettings(startDate, endDate);
  }, []);

  return (
    <div style={{ marginTop: "20px", marginLeft: "50px", marginRight: "50px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "Calibri",
                padding: "8px",
                width: "120px", // Same width as the schedule columns
                textAlign: "center",
                border: "1px solid #E0E0E0",
              }}
            >
              <Typography variant="h3" sx={{ fontSize: 16 }}>
                Resource
              </Typography>
            </TableCell>
            {tableheader(startDate, endDate)}
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map((resource, index) => (
            <TableRow key={resource.bookableresourceid}>
              <TableCell
                sx={{
                  fontFamily: "Calibri",
                  fontWeight: "bold",
                  padding: "8px",
                  borderLeft: "1px solid #E0E0E0",
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" sx={{ fontSize: 16 }}>
                  {resource.name}
                </Typography>
              </TableCell>
              {columns(headers, resource.bookableresourceid)}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                onClick={() => setIsModalOpen(false)}
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

interface IScheduleColumn {
  month: number;
  day: number;
  year: number;
}

interface ScheduleItem {
  starttime: string;
  endtime: string;
  name: string;
  Resource: {
    name: string;
  };
}

///////////////////////////////////////