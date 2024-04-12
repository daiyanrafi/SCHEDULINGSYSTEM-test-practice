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
// import SABSTableCell, { SABSEmptyTableCell } from "./SABSTableCell";
import { SABSTableCell, SABSEmptyTableCell } from "./SABSTableCell";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

interface Props {
  resources: any[];
  bookings: any[];
  isModalOpen: boolean;
  selectedRowData: ScheduleItem | null;
  onOpenModal: (rowData: ScheduleItem) => void;
  onCloseModal: () => void;
  onForwardClick: () => void;
  onBackwardClick: () => void;
  onAppointmentClick: (schedule: ScheduleItem) => void;
  onEmptyCellClick: (header: IScheduleColumn) => void;
  selectedDate: Date;
  startTime: number;
  endTime: number;
  selectedResources: any;
}

interface State {
  headers: IScheduleColumn[];
}

class SABSCalendarClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      headers: [],
    };
  }

  componentDidMount() {
    this.setHeaderColumns();
  }

  setHeaderColumns = () => {
    const { startTime, endTime, selectedDate } = this.props;
    const headers: IScheduleColumn[] = [];
    let currenthour = startTime;
    let ishour = true;
    let timetext = "";
    let hour = startTime;
    let minute = 0;
    while (currenthour < endTime) {
      hour = currenthour;
      if (ishour) {
        timetext = `${currenthour}:00`;
        minute = 0;
        ishour = false;
      } else {
        timetext = `${currenthour}:30`;
        minute = 30;
        ishour = true;
        currenthour++;
      }
      headers.push({
        text: timetext,
        day: selectedDate.getDate(),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
        hour: hour,
        minute: minute,
        resourceid: "", // Provide a default or appropriate value here
      });
    }
    this.setState({ headers: headers });
  };

  handleBackwardClick = () => {
    this.props.onBackwardClick();
  };

  getDayAppointments = (
    bookings: any[],
    resourceid: string,
    day: number,
    month: number,
    year: number
  ) => {
    let daybookings: any = [];
    let colspan = 1;
    bookings.forEach((booking: any) => {
      const bdate = new Date(booking.starttime);
      const bendtime = new Date(booking.endtime);
      if (
        booking.Resource.bookableresourceid === resourceid &&
        bdate.getDate() === day &&
        bdate.getMonth() + 1 === month &&
        bdate.getFullYear() === year
      ) {
        const duration =
          (bendtime.getTime() - bdate.getTime()) / (1000 * 60 * 30);
        colspan = Math.max(colspan, duration);
        booking.colspan = colspan;
        daybookings.push(booking);
      }
    });
    return daybookings;
  };

  getcellappoinment = (header: IScheduleColumn, dayappointments: any[]) => {
    let app = null;
    dayappointments.forEach((appt) => {
      const date = new Date(appt.starttime);
      if (
        date.getDate() === header.day &&
        date.getMonth() + 1 === header.month &&
        date.getHours() === header.hour &&
        date.getMinutes() === header.minute
      ) {
        const endtime = new Date(appt.endtime);
        let colspan = 1;
        const duration =
          (endtime.getTime() - date.getTime()) / (1000 * 60 * 30);
        colspan = Math.max(colspan, duration);
        appt.callspan = colspan;
        app = appt;
      }
    });
    return app;
  };

  columns = (
    headers: IScheduleColumn[],
    resourceid: string,
    onAppointmentClick: any,
    onEmptyCellClick: any
  ) => {
    let skipcell: number = 0;
    return headers.map((header: IScheduleColumn) => {
      let lheader = {
        resourceid: resourceid,
        day: header.day,
        month: header.month,
        year: header.year,
        hour: header.hour,
        minute: header.minute,
        text: header.text,
      };
      let lcbookings = this.getDayAppointments(
        this.props.bookings,
        resourceid,
        header.day,
        header.month,
        header.year
      );
      let cellappointment: any = this.getcellappoinment(header, lcbookings);

      if (cellappointment) {
        skipcell = cellappointment.callspan - 1;
        return (
          <SABSTableCell
            key={`${header.day}-${header.hour}-${header.minute}`}
            schedule={cellappointment}
            onCellClick={onAppointmentClick}
          />
        );
      }

      if (skipcell === 0) {
        return (
          <SABSEmptyTableCell
            key={`${header.day}-${header.hour}-${header.minute}`}
            header={lheader}
            onCellClick={onEmptyCellClick}
          />
        );
      } else {
        skipcell -= 1;
      }
    });
  };

  render() {
    const { resources, onAppointmentClick, onEmptyCellClick } = this.props;
    const { headers } = this.state;

    return (
      <div
        style={{
          marginTop: "20px",
          marginLeft: "50px",
          marginRight: "50px",
          fontFamily: "Calibri",
          overflow: "auto",
        }}
      >
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
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: 23,
                    fontWeight: "bold",
                    fontFamily: "Calibri",
                    textAlign: "left",
                    color: "#FFFFFF",
                    marginLeft: "14px",
                  }}
                >
                  Resource
                </Typography>
              </TableCell>
              {headers.map((header) => (
                <TableCell
                  key={`${header.day}-${header.hour}-${header.minute}`}
                  sx={{
                    fontFamily: "Calibri",
                    border: "1px solid",
                    padding: "0px",
                    textAlign: "center",
                    backgroundColor: "#00a2ed",

                    width: "60px",
                    color: "white",
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: 16 }}>
                    {header.text}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.bookableresourceid}>
                <TableCell
                  sx={{
                    borderLeft: "0px solid #E0E0E0",
                    width: "150px",
                    padding: "unset",
                    backgroundColor: "#00a2ed",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: 13,
                      color: "#FFFFFF",
                      textAlign: "left",
                      padding: "12px 20px",
                    }}
                  >
                    {resource.name}
                  </Typography>
                </TableCell>
                {this.columns(
                  headers,
                  resource.bookableresourceid,
                  onAppointmentClick,
                  onEmptyCellClick
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div style={{ textAlign: "right", marginTop: "05px" }}>
          <IconButton onClick={this.handleBackwardClick} size="small">
            <SkipPreviousIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default SABSCalendarClass;

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
