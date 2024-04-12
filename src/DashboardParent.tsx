import React, { useReducer, useState, useEffect } from "react";
import resourcesData from "./modules/sabscalendar/data/resource.json";
import bookingsData from "./modules/sabscalendar/data/bookings.json";
import SABSCalendar from "./modules/sabscalendar/SABSCalendarClass";
import { DateRangeInput } from "@datepicker-react/styled";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { ComboBox, DatePicker, IComboBox, IComboBoxOption } from "@fluentui/react";
// import { useBoolean } from "@fluentui/react-hooks";
import { endOfMonth, startOfMonth } from "date-fns";

const initialStartDate = startOfMonth(new Date());
const initialEndDate = endOfMonth(new Date());

const initialState = {
  startDate: initialStartDate,
  endDate: initialEndDate,
  focusedInput: null,
};

function reducer(state: any, action: { type: any; payload: any }) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "startDateChange":
      return { ...state, startDate: action.payload };
    case "endDateChange":
      return { ...state, endDate: action.payload };
    default:
      throw new Error();
  }
}

const DashboardParent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { startDate, endDate, focusedInput } = state;
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [comboText, setComboText] = useState<string>("");

  const handleOpenModal = (rowData: any) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleForwardClick = () => {
    console.log("Forward");
  };

  const handleBackwardClick = () => {
    console.log("Backward");
  };

  const handleAppointmentClick = (schedule: any) => {
    console.log("Appointment clicked", schedule);
  };

  const handleEmptyCellClick = (header: any) => {
    console.log("Empty cell clicked", header);
  };

  const handleDayOfWeekChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedDay = event.target.value as string;
    console.log("Selected Day of Week:", selectedDay);
    setSelectedDayOfWeek(selectedDay);
  };

  useEffect(() => { }, []);

  // const handleComboBoxChange = (
  //   event: React.FormEvent<IComboBox>,
  //   option?: IComboBoxOption,
  //   index?: number,
  //   value?: string
  // ) => {
  //   if (option) {
  //     const newValue = option.selected
  //       ? [...selectedResources, option.key as string]
  //       : selectedResources.filter((id) => id !== option.key);
  //     setSelectedResources(newValue);
  //     setComboText("");
  //     console.log("Selected Resources:", newValue);
  //   }
  // };

  const handleDateChange = ({
    startDate,
    endDate,
  }: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    dispatch({ type: "startDateChange", payload: startDate });
    dispatch({ type: "endDateChange", payload: endDate });
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  };

  // const onSelectDate = (date: any) => {
  //   console.log(date);
  // }

  const handleResourceToggle = (resourceId: string) => {
    if (selectedResources.includes(resourceId)) {
      setSelectedResources(selectedResources.filter(id => id !== resourceId));
    } else {
      setSelectedResources([...selectedResources, resourceId]);
    }
  };

  return (
    <div
      style={{
        display: "flex", flexDirection: "column", marginTop: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div style={{ marginRight: "50px", position: "relative" }}>
          {selectedResources.length === 0 && (
            <InputLabel
              id="select-resource-label"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
                cursor: "pointer",
              }}
              htmlFor="select-resource-dropdown"
            >
              Select Resource
            </InputLabel>
          )}
          <FormControl>
            <Select
              id="select-resource-dropdown"
              multiple
              value={selectedResources}
              onChange={(event) =>
                setSelectedResources(event.target.value as string[])
              }
              inputProps={{ "aria-label": "Select Resources" }}
              style={{ minWidth: 200, maxWidth: 200, height: 48 }}
            >
              {resourcesData.map((resource) => (
                <MenuItem
                  key={resource.bookableresourceid}
                  value={resource.bookableresourceid}
                  style={{ fontFamily: "Calibri" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedResources.includes(
                      resource.bookableresourceid
                    )}
                    onChange={() =>
                      handleResourceToggle(resource.bookableresourceid)
                    }
                  />
                  {resource.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* <DatePicker
            //firstDayOfWeek={firstDayOfWeek}
            placeholder="Select a date..."
            ariaLabel="Select a date"
            onSelectDate={onSelectDate}
          // DatePicker uses English strings by default. For localized apps, you must override this prop.
          //strings={defaultDatePickerStrings}
          /> */}
        <DateRangeInput
          onDatesChange={handleDateChange}
          onFocusChange={(focusedInput) =>
            dispatch({ type: "focusChange", payload: focusedInput })
          }
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
          displayFormat={"dd/MM/yyyy"}
        />
        <div style={{ marginLeft: "10px", width: "150px" }}>
          <FormControl>
            <Select
              value={selectedDayOfWeek}
              onChange={(event) =>
                handleDayOfWeekChange(
                  event as React.ChangeEvent<{ value: unknown }>
                )
              }
              displayEmpty
              inputProps={{ "aria-label": "Select Day" }}
              style={{
                width: "100%",
                height: "47.5px",
                borderRadius: "2px",
              }}
            >
              <MenuItem value="">
                <em>Select Day</em>
              </MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <SABSCalendar
        resources={resourcesData}
        bookings={bookingsData}
        isModalOpen={isModalOpen}
        selectedRowData={selectedRowData}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        onForwardClick={handleForwardClick}
        onBackwardClick={handleBackwardClick}
        onAppointmentClick={handleAppointmentClick}
        onEmptyCellClick={handleEmptyCellClick}
        selectedDate={new Date("2024-03-06T01:30:00Z")}
        startTime={8}
        endTime={17.0}
        selectedResources={selectedResources}
      />
    </div>

  );
};

export default DashboardParent;
