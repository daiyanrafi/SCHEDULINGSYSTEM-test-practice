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
  IconButton,
} from "@mui/material";

// import ScheduleManagement from "../../schedule/ScheduleManagement";
import SABSTableCell, { SABSEmptyTableCell } from "./SABSTableCell";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const SABSCalendar: React.FC<{ 
  resources: any[]; 
  bookings: any[]; 
  isModalOpen: boolean; 
  selectedRowData: ScheduleItem | null; 
  onOpenModal: (rowData: ScheduleItem) => void; 
  onCloseModal: () => void; 
  onForwardClick: () => void;
  onBackwardClick: () => void;
  onAppointmentClick: (schedule: ScheduleItem) => void;
  onEmptyCellClick: (header: any) => void;
}> = ({
  resources,
  bookings,
  isModalOpen,
  selectedRowData,
  onForwardClick,
  onBackwardClick,
  onAppointmentClick,
  onEmptyCellClick,
}) => {
  const startDate = new Date("2024-02-25T23:00:00Z");
  const endDate = new Date("2024-04-12T23:00:00Z");
  // const selectedDay: Number = 3;
  // const [noofDays, setnoofDays] = React.useState<number>(0);
  const [headers, setHeaders] = React.useState<IScheduleColumn[]>([]);

  const selectedDate: Date = new Date("2024-02-28T01:30:00Z");

  const getDayAppointments = (
    bookings: any,
    resourceid: string,
    day: number,
    month: number,
    year: number
  ) => {

    let daybookings: any = [];
    // var timediff = 0;
    let colspan = 1;
    bookings.map((booking: any) => {
      const bdate = new Date(booking.starttime);
      const bendtime = new Date(booking.endtime);
      if (
        booking.Resource.bookableresourceid === resourceid &&
        bdate.getDate() === day &&
        bdate.getMonth() + 1 === month &&
        bdate.getFullYear() === year
      ) {
        // timediff = (bdate.getTime() - bendtime.getTime())/1000; 
        // timediff = timediff/60/30;

        const duration = (bendtime.getTime() - bdate.getTime()) / (1000 * 60 * 30);
        colspan = Math.max(colspan, duration);
        booking.colspan = colspan;
        daybookings.push(booking);
      }
    });

    return daybookings;
  }

  const getbookingsforaday = (
    bookings: any,
    resourceid: string,
    day: number,
    month: number,
    year: number,
    headertext: string,
    header: IScheduleColumn
  ) => {
    let bookingtext = "";
    let daybookings: any = [];
    // var timediff = 0;
    let colspan = 1;
    let isEmpty = true;
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
        isEmpty = false;
        // timediff = (bdate.getTime() - bendtime.getTime())/1000; 
        // timediff = timediff/60/30;

        const duration = (bendtime.getTime() - bdate.getTime()) / (1000 * 60 * 30); //problem with the calculation
        colspan = Math.max(colspan, duration);
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

    if (isEmpty) {
      return (
        <TableCell
          key={`${header.day}-${header.hour}-${header.minute}`}
          onClick={() => console.log("Clicked empty cell!")}
          // onClick={() => alert("Cell is empty!")}
          sx={{
            fontFamily: "Calibri",
            border: "1px solid #E0E0E0",
            padding: "0px 40px",
            backgroundColor: "#FAFAFA",
            verticalAlign: "top",
            width: `${colspan * 40}px`,
            cursor: "pointer",
          }}
        ></TableCell>
      );
    }

    return (
      <TableCell
        key={`${header.day}-${header.hour}-${header.minute}`}
        colSpan={colspan}
        sx={{
          fontFamily: "Calibri",
          border: "1px solid #E0E0E0",
          padding: "0px",
          backgroundColor: "#FAFAFA",
          verticalAlign: "top",
          // height: "10px",
          // width: `${colspan * 0}px`
        }}
      >
        {/* <ScheduleManagement
          schedule={daybookings}
          onRowClick={(rowData: ScheduleItem) => {
            console.log("Appointment clicked");
            // onOpenModal(rowData);
          }}
        /> */}
      </TableCell>
    );
  };

  const getcellappoinment = (header: IScheduleColumn, dayappointments: any[]) => {
    var app = null;
    dayappointments.map(appt => {
      const date = new Date(appt.starttime);
      if (date.getDate() === header.day && date.getMonth() + 1 === header.month && date.getHours() === header.hour && date.getMinutes() === header.minute) {
        const endtime = new Date(appt.endtime);
        let colspan = 1;
        const duration = (endtime.getTime() - date.getTime()) / (1000 * 60 * 30); //problem with the calculation
        colspan = Math.max(colspan, duration);
        appt.callspan = colspan;
        app = appt;
      }
    })
    return app;
  }


  const columns = (headers: IScheduleColumn[], resourceid: string, onAppointmentClick: any, onEmptyCellClick: any) => {
    var skipcell: number = 0;
    return headers.map((header: IScheduleColumn) => {
      header.resourceid = resourceid;
      var lcbookings = getDayAppointments(bookings,
        resourceid,
        header.day,
        header.month,
        header.year);

      lcbookings.map((bk: any) => {
        console.log(bk);
      });     

      var cellappointment: any = getcellappoinment(header, lcbookings);


      if (cellappointment) {
        skipcell = cellappointment.callspan - 1;
        return <SABSTableCell schedule={cellappointment} onCellClick={onAppointmentClick} />;
      }
  
      if (skipcell === 0) {
        return <SABSEmptyTableCell header={header} onCellClick={onEmptyCellClick} />;
      } else {
        skipcell -= 1;
      }
    });
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
            border: "1px solid",
            padding: "0px",
            textAlign: "center",
            backgroundColor: "#00a2ed",
            width: "60px",
            color: "#FFFFFF",
          }}
        >
          <Typography variant="h3" sx={{ fontSize: 16 }}>
            {timetext}
          </Typography>
        </TableCell>
      );

      starttime += .30;
    }

    return headers;
  };

  const handleForwardClick = () => {
    onForwardClick();
  };

  const handleBackwardClick = () => {
    onBackwardClick();
  };

  React.useEffect(() => {
    setHeaderColumns();
  }, []);

  return (
    <div style={{ marginTop: "20px", marginLeft: "50px", marginRight: "50px", fontFamily: "Calibri" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                padding: "8px",
                fontSize: 16,
                backgroundColor: "#00a2ed",
              }}
            >
              <Typography variant="h3" sx={{
                fontSize: 23, fontWeight: "bold",
                fontFamily: "Calibri", textAlign: "left",
                color: "#FFFFFF", marginLeft: '14px'
              }}>
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
                  borderLeft: "0px solid #E0E0E0",
                  textAlign: "center",
                  width: "150px",
                  padding: "unset",
                }}
              >
                <Typography variant="h3" sx={{
                  fontSize: 13,
                  backgroundColor: "#00a2ed",
                  color: "#FFFFFF",
                  textAlign: "left", padding: '12px 20px'
                }}>
                  {resource.name}
                </Typography>
              </TableCell>
              {columns(headers, resource.bookableresourceid, onAppointmentClick, onEmptyCellClick)}
            </TableRow>
          ))}
        </TableBody>

      </Table>

          {/* <Modal open={isModalOpen} onClose={onCloseModal}>
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
      </Modal> */}
      

      <div style={{ textAlign: "right", marginTop: "05px" }}>
        <IconButton onClick={handleBackwardClick} size="small">
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={handleForwardClick} size="small">
          <SkipNextIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SABSCalendar;

export interface IScheduleColumn {
  month: number;
  day: number;
  year: number;
  text: string;
  hour: number;
  minute: number;
  resourceid: string;
  colspan?: number;
}

interface ScheduleItem {
  starttime: string;
  endtime: string;
  name: string;
  Resource: {
    name: string;
  };
}
