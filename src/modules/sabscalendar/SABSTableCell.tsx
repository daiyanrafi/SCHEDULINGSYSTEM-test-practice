import React, { useState } from "react";
import { TableCell } from "@mui/material";
import { IScheduleColumn } from "./SABSCalendarClass";
import { ScheduleItem } from "./calendarinterfaces";

export const SABSTableCell: React.FC<IProp> = ({ schedule, onCellClick }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDragging) {
      // Change cell color while dragging
      e.currentTarget.style.backgroundColor = "#FFD700"; // Change background color
    }
  };

  const handleClick = () => {
    onCellClick(schedule);
  };

  return (
    <TableCell
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onClick={handleClick}
      key={`${schedule.starttime}-${schedule.name}`}
      colSpan={schedule.callspan}
      sx={{
        fontFamily: "Calibri",
        border: "1px solid #E0E0E0",
        padding: "0px",
        // backgroundColor: "#FAFAFA",
        verticalAlign: "top",
        transition: "background-color 0.3s", // Smooth color transition
      }}
    >
      <div
        style={{
          backgroundColor: "#B2D8F4",
          // borderLeft: "5px solid #2582D7",
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

export const SABSEmptyTableCell: React.FC<IEmptyCell> = ({ header, onCellClick }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", "empty-cell"); // Set data to indicate empty cell
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Change cell color while dragging
    e.currentTarget.style.backgroundColor = "#2582D7"; // Change background color
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    onCellClick(header);
  };

  return (
    <TableCell
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      key={`${header.day}-${header.hour}-${header.minute}`}
      colSpan={1}
      sx={{
        fontFamily: "Calibri",
        border: "1px solid #E0E0E0",
        padding: "0px",
        // backgroundColor: "#FAFAFA",
        verticalAlign: "top",
      }}
    ></TableCell>
  );
};

// Define IProp interface
interface IProp {
  schedule: ScheduleItem;
  onCellClick: (schedule: ScheduleItem) => void;
}

// Define IEmptyCell interface
interface IEmptyCell {
  header: IScheduleColumn;
  onCellClick: (header: IScheduleColumn) => void;
}