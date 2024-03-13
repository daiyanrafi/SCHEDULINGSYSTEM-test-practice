import { TableCell } from "@mui/material";

import ScheduleManagement, { ScheduleItem } from "../../schedule/ScheduleManagement";
import { IScheduleColumn } from "./SABSCalendar";

const SABSTableCell: React.FC<IProp> = (prop) => {
  const { schedule } = prop;

  const handleClick = () => {
    console.log("Appoinment clicked");
  };

  return (
    <TableCell
      onClick={handleClick}
      key={`${schedule.starttime}-${schedule.name}`}
      colSpan={schedule.callspan}
      sx={{
        fontFamily: "Calibri",
        border: "1px solid #E0E0E0",
        padding: "0px",
        backgroundColor: "#FAFAFA",
        verticalAlign: "top",
      }}
    >
      <div
        style={{
          backgroundColor: "#B2D8F4",
          borderLeft: "5px solid #2582D7",
          margin: "8px 2px",
          paddingLeft: "02%",
          fontFamily: "Calibri",
          transition: "background-color 0.3s",
          borderRadius: "8px",
          padding: "02px 05px",
        }}
      >
        {schedule.name} {schedule.callspan}
      </div>
    </TableCell>
  );
};

export const SABSEmptyTableCell: React.FC<IEmptyCell> = (prop) => {
  const { header } = prop;

  const handleClick = () => {
    console.log("empty cell clicked");
  };

  return (
    <TableCell
      onClick={handleClick}
      key={`${header.day}-${header.hour}-${header.minute}`}
      colSpan={1}
      sx={{
        fontFamily: "Calibri",
        border: "1px solid #E0E0E0",
        padding: "0px",
        backgroundColor: "#FAFAFA",
        verticalAlign: "top",
      }}
    ></TableCell>
  );
};

export default SABSTableCell;

interface IProp {
  schedule: ScheduleItem;
}

interface IEmptyCell {
  header: IScheduleColumn
}