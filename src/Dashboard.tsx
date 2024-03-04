import React, { useState } from "react";
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import { MenuItem, Select, FormControl, InputLabel, Grid } from '@material-ui/core';
import { DatePicker } from "@mui/x-date-pickers";

const ScheduleDashboard: React.FC<{
  resources: any[];
  bookings: any[];
}> = ({
  resources,
  bookings,
}) => {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleDayChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedDay(event.target.value as string);
    };

    const handleStartDateChange = (date: Date | null) => {
      setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
      setEndDate(date);
    };

    // Filtering bookings based on selected day and date range
    const filteredBookings = bookings.filter(booking => {
      const bookingDate = moment(booking.starttime);
      const bookingStartTime = bookingDate.startOf('day').toDate();
      const bookingEndTime = bookingDate.endOf('day').toDate();
      return (selectedDay ? bookingDate.format('dddd').toLowerCase() === selectedDay.toLowerCase() : true) &&
        (startDate && endDate ? (bookingStartTime >= startDate && bookingEndTime <= endDate) : true);
    });

    // Calculate gaps between consecutive bookings within the same day
    const gapItems = filteredBookings.reduce((accumulator, booking, index) => {
      if (index > 0) {
        const prevBookingEndTime = moment(filteredBookings[index - 1].endtime);
        const currentBookingStartTime = moment(booking.starttime);

        // Check if the previous booking and the current booking are on the same day
        if (prevBookingEndTime.isSame(currentBookingStartTime, 'day')) {
          const gapDuration = moment.duration(currentBookingStartTime.diff(prevBookingEndTime));

          if (gapDuration.asMilliseconds() > 0) {
             // Add a dummy item representing the gap
            accumulator.push({
              id: `gap-${index}`, // You can use a unique ID for gap items
              group: booking.Resource.bookableresourceid,
              title: 'Gap', // Title for gap items
              start_time: prevBookingEndTime,
              end_time: currentBookingStartTime,
              itemProps: {
                style: {
                  // background: randomColor({ luminosity: "light", seed: booking.name }) // Specify your custom color for gap items here
                  background: 'green' // Specify your custom color for gap items here
                }
              }
            });
          }
        }
      }
      return accumulator;
    }, []);

    const items = filteredBookings.map((booking, index) => ({
      id: index,
      group: booking.Resource.bookableresourceid,
      title: booking.name,
      start_time: moment(booking.starttime),
      end_time: moment(booking.endtime),
      // itemProps: {
      //   style: {
      //     background: randomColor({ luminosity: "light", seed: booking.name })
      //   }
      // }
    }));
    

    const allItems = [...items, ...gapItems];

    const groups = resources.map(resource => ({
      id: resource.bookableresourceid,
      title: resource.name,
    }));

    return (
      <div style={{ marginTop: "20px", marginLeft: "50px", marginRight: "50px", marginBottom: '20px', }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              format="dd-MM-YYYY"
            />
          </Grid>
          <Grid item>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              format="dd-MM-YYYY"
            />
          </Grid>
          <Grid item>
            <FormControl style={{ width: '150px', marginTop: '20px', marginBottom: '20px', height: '53px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <InputLabel
                id="day-select-label"
                style={{ marginLeft: '10px', marginTop: '-6px', backgroundColor: '#FFF', paddingLeft: '4px' }}
              >
                Select Day
              </InputLabel>
              <Select
                value={selectedDay}
                onChange={handleDayChange}
                style={{ width: '100%', height: '100%', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', paddingTop: '5px', paddingLeft: '10px' }} // Adjusted padding
              >
                <MenuItem value="saturday">Saturday</MenuItem>
                <MenuItem value="sunday">Sunday</MenuItem>
                <MenuItem value="monday">Monday</MenuItem>
                <MenuItem value="tuesday">Tuesday</MenuItem>
                <MenuItem value="wednesday">Wednesday</MenuItem>
                <MenuItem value="thursday">Thursday</MenuItem>
                <MenuItem value="friday">Friday</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        </Grid>

        <Timeline
          groups={groups}
          items={allItems}
          defaultTimeStart={moment("2024-02-28 08:00:00")}
          defaultTimeEnd={moment("2024-02-29 08:00:00")}
        />
      </div>
    );

  };

export default ScheduleDashboard;
