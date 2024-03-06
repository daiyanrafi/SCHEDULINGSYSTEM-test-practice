// ScheduleDashboard.tsx

import React from "react";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ScheduleManagement from "../../schedule/ScheduleManagement";

const SABSCalendar: React.FC<{ resources: any[]; bookings: any[]; isModalOpen: boolean; selectedRowData: ScheduleItem | null; onOpenModal: (rowData: ScheduleItem) => void; onCloseModal: () => void; }> = ({
  resources,
  bookings,
  isModalOpen,
  selectedRowData,
  onOpenModal,
  onCloseModal,
}) => {
  const startDate = new Date("2024-02-25T23:00:00Z");
  const endDate = new Date("2024-04-12T23:00:00Z");
  const selectedDay: Number = 3;
  const [noofDays, setnoofDays] = React.useState<number>(0);
  const [headers, setHeaders] = React.useState<IScheduleColumn[]>([]);

  const selectedDate: Date = new Date("2024-02-28T01:30:00Z");

  const getbookingsforaday = (
    bookings: any,
    resourceid: string,
    day: number,
    month: number,
    year: number,
    headertext: string,
    header: IScheduleColumn
  ) => {
    let bookingtext = '';
    let daybookings: any = [];
    // var timediff = 0;
    let colspan = 1; // Initialize colspan to 1
    bookings.map((booking: any) => {
      const bdate = new Date(booking.starttime);
      const bendtime = new Date(booking.endtime);
      if (
        booking.Resource.bookableresourceid === resourceid &&
        bdate.getDate() === day &&
        bdate.getMonth() + 1 === month &&
        bdate.getFullYear() === year &&
        bdate.getHours() === header.hour &&
        bdate.getMinutes() === header.minute
      ) {
        // timediff = (bdate.getTime() - bendtime.getTime())/1000; 
        // timediff = timediff/60/30;
        
        const duration = (bendtime.getTime() - bdate.getTime()) / (1000 * 60 * 30); // Calculate duration in 30-minute intervals
        colspan = Math.max(colspan, duration); // Update colspan with maximum duration
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
      <TableCell colSpan={colspan} // Apply colspan attribute
        sx={{
          fontFamily: "Calibri",
          border: "1px solid #E0E0E0",
          padding: "0px 40px",
          backgroundColor: "#FAFAFA",
          verticalAlign: "top",
          // height: "10px",
          // width: `${colspan * 40}px`
          maxWidth: `${colspan * 20}px`  // Adjust width based on colspan
        }}
      >
        <ScheduleManagement
          schedule={daybookings}
          onRowClick={(rowData: ScheduleItem) => {
            onOpenModal(rowData);
          }}
        />
      </TableCell>
    );
  };

  // //another approch with timediff fucn - no need
  // const getbookingsforaday = (
  //   bookings: any,
  //   resourceid: string,
  //   day: number,
  //   month: number,
  //   year: number,
  //   headertext: string,
  //   header: IScheduleColumn
  // ) => {
  //   let bookingtext = '';
  //   let daybookings: any = [];
  //   let colspan = 1; // Initialize colspan to 1
  //   let timediff = 0; // Initialize timediff to 0
  
  //   bookings.map((booking: any) => {
  //     const bdate = new Date(booking.starttime);
  //     const bendtime = new Date(booking.endtime);
  
  //     if (
  //       booking.Resource.bookableresourceid === resourceid &&
  //       bdate.getDate() === day &&
  //       bdate.getMonth() + 1 === month &&
  //       bdate.getFullYear() === year &&
  //       bdate.getHours() === header.hour &&
  //       bdate.getMinutes() === header.minute
  //     ) {
  //       const duration = (bendtime.getTime() - bdate.getTime()) / (1000 * 60 * 30);
  //       colspan = Math.max(colspan, duration);
  
  //       // Calculate timediff if it's not already calculated
  //       if (timediff === 0) {
  //         timediff = (bendtime.getTime() - bdate.getTime()) / 1000;
  //       }
  
  //       bookingtext +=
  //         " " +
  //         bdate.getHours() +
  //         ":" +
  //         bdate.getMinutes() +
  //         " " +
  //         booking.name +
  //         `,`;
  //       daybookings.push(booking);
  //     }
  //   });
  
  //   // Convert timediff to intervals of 30 minutes if it's calculated
  //   if (timediff !== 0) {
  //     timediff = timediff / 60 / 30;
  //   }
  
  //   return (
  //     <TableCell colSpan={colspan} // Apply colspan attribute
  //       sx={{
  //         fontFamily: "Calibri",
  //         border: "1px solid #E0E0E0",
  //         padding: "2px 40px",
  //         backgroundColor: "#FAFAFA",
  //         verticalAlign: "top",
  //         height: "20px",
  //         width: `${colspan * 100}px` // Adjust width based on colspan
  //       }}
  //     >
  //       <ScheduleManagement
  //         schedule={daybookings}
  //         onRowClick={(rowData: ScheduleItem) => {
  //           onOpenModal(rowData);
  //         }}
  //       />
  //     </TableCell>
  //   );
  // };
  


  const columns = (headers: IScheduleColumn[], resourceid: string) => {
    return headers.map((header: IScheduleColumn) => {
      return getbookingsforaday(
        bookings,
        resourceid,
        header.day,
        header.month,
        header.year,
        header.text,
        header
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
          text: '',
          hour: 0,
          minute: 0
        };
        headersl.push(header);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setHeaders(headersl);
  };

  const setHeaderColumns = () => {
    var starttime: number = 8.00;
    var endtime: number = 17.00;
    const headers: any[] = [];
    var currenthour = 8;
    var ishour: boolean = true;
    var timetext = '';
    var hour = 8;
    var minute = 0;
    while (currenthour < endtime) {
      hour = currenthour;
      if (ishour) {
        timetext = `${currenthour}:00`;
        minute = 0;
        ishour = false;
      }
      else {
        timetext = `${currenthour}:30`;
        minute = 30;
        ishour = true;
        currenthour++;
      }
      headers.push({ text: timetext, day: selectedDate.getDate(), month: selectedDate.getMonth() + 1, year: selectedDate.getFullYear(), hour: hour, minute: minute }
      );
    }

    setHeaders(headers);
  };

  const tableheader = (startDate: Date, endDate: Date) => {
    var starttime: number = 8.00;
    var endtime: number = 17.00;
    const headers: any[] = [];
    var currenthour = 8;
    var ishour: boolean = true;
    var timetext = '';
    while (currenthour < endtime) {
      if (ishour) {
        timetext = `${currenthour}:00`;
        ishour = false;
      }
      else {
        timetext = `${currenthour}:30`;
        ishour = true;
        currenthour++;
      }
      headers.push(
        <TableCell
          key={starttime.toString()}
          sx={{
            fontFamily: "Calibri",
            border: "1px solid #E0E0E0",
            padding: "4px",
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            color: "#333",
            fontWeight: "bold",
            textTransform: "uppercase",
            width: "50px",
            height: "20px" // Set desired height for the table cell
          }}
        >
          <Typography variant="h3" sx={{ fontSize: 16 }}>
            {timetext}
          </Typography>
        </TableCell>
      );

      starttime += .30;
    }

    // if (!startDate || !endDate) return [];


    // const currentDate = new Date(startDate);

    // while (currentDate <= endDate) {
    //   if (selectedDay === undefined || currentDate.getDay() === selectedDay) {
    //     const headerTitle = currentDate.toLocaleDateString("en-AU", {
    //       weekday: "long",
    //       day: "numeric",
    //       month: "short",
    //     });
    //     headers.push(
    //       <TableCell
    //         key={currentDate.toISOString()}
    //         sx={{
    //           fontFamily: "Calibri",
    //           border: "1px solid #E0E0E0",
    //           padding: "8px",
    //           textAlign: "center",
    //           backgroundColor: "#FFFFFF",
    //           color: "#333",
    //           fontWeight: "bold",
    //           textTransform: "uppercase",
    //           width: "50px",
    //         }}
    //       >
    //         <Typography variant="h3" sx={{ fontSize: 16 }}>
    //           {headerTitle}
    //         </Typography>
    //       </TableCell>
    //     );
    //   }

    //   currentDate.setDate(currentDate.getDate() + 1);
    // }

    return headers;
  };

  React.useEffect(() => {
    setHeaderColumns();
    //setHeaderSettings(startDate, endDate);
  }, []);

  return (
    <div style={{ marginTop: "20px", marginLeft: "50px", marginRight: "50px", fontFamily: "Calibri" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                // fontFamily: "Calibri",
                padding: "8px",
                // width: "120px",
                // textAlign: "center",
                border: "1px solid #E0E0E0",
                fontSize: 16
              }}
            >
              <Typography variant="h3" sx={{ fontSize: 23, fontFamily: "Calibri" }}>
                Resource
              </Typography>
            </TableCell>
            {tableheader(startDate, endDate)}
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map((resource, index) => (
            <TableRow key={resource.bookableresourceid} sx={{ height: "10px" }}> {/* Adjust the height of the TableRow */}
              <TableCell
                sx={{
                  // fontFamily: "Calibri",
                  // fontWeight: "bold",
                  // padding: "0px", // Adjust the padding to reduce height
                  borderLeft: "1px solid #E0E0E0",
                  textAlign: "center",
                  // height: "20px", // Adjust the height of the TableCell
                  // width: '20px'
                }}
              >
                <Typography variant="h3" sx={{ fontSize: 12 }}>
                  {resource.name}
                </Typography>
              </TableCell>
              {columns(headers, resource.bookableresourceid)}
            </TableRow>
          ))}
        </TableBody>

      </Table>

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
                variant="contained"
                color="primary"
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

export default SABSCalendar;

interface IScheduleColumn {
  month: number;
  day: number;
  year: number;
  text: string;
  hour: number;
  minute: number;
}

interface ScheduleItem {
  starttime: string;
  endtime: string;
  name: string;
  Resource: {
    name: string;
  };
}
