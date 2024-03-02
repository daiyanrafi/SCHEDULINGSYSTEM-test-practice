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
    const gapItems: { id: string, group: string, title: string, start_time: moment.Moment, end_time: moment.Moment }[] = [];
    filteredBookings.forEach((booking, index) => {
      if (index > 0) {
        const prevBookingEndTime = moment(filteredBookings[index - 1].endtime);
        const currentBookingStartTime = moment(booking.starttime);

        // Check if the previous booking and the current booking are on the same day
        if (prevBookingEndTime.isSame(currentBookingStartTime, 'day')) {
          const gapDuration = moment.duration(currentBookingStartTime.diff(prevBookingEndTime));

          if (gapDuration.asMilliseconds() > 0) {
            // Add a dummy item representing the gap
            gapItems.push({
              id: `gap-${index}`, // You can use a unique ID for gap items
              group: booking.Resource.bookableresourceid,
              title: 'Gap', // Title for gap items
              start_time: prevBookingEndTime,
              end_time: currentBookingStartTime,
            });
          }
        }
      }
    });


    // Combine bookings and gap items
    const items = filteredBookings.map((booking, index) => ({
      id: index,
      group: booking.Resource.bookableresourceid,
      title: booking.name,
      start_time: moment(booking.starttime),
      end_time: moment(booking.endtime),
    }));

    const allItems = [...items, ...gapItems];

    const groups = resources.map(resource => ({
      id: resource.bookableresourceid,
      title: resource.name,
    }));

    return (
      <div style={{ marginTop: "20px", marginLeft: "50px", marginRight: "50px" }}>
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
          <Grid item xs={12} sm={6} md={4} lg={3}> {/* Adjust for middle position use this => "style={{ margin: '0 auto' }}"*/}
            <FormControl style={{ width: '150px', marginTop: '20px', marginBottom: '20px' }}>
              <InputLabel id="day-select-label" style={{ fontFamily: 'Calibri' }}>Select Day</InputLabel>
              <Select
                labelId="day-select-label"
                value={selectedDay}
                onChange={handleDayChange}
                style={{ fontFamily: 'Calibri', width: '100%' }}
              >
                <MenuItem value="saturday" style={{ fontFamily: 'Calibri' }}>Saturday</MenuItem>
                <MenuItem value="sunday" style={{ fontFamily: 'Calibri' }}>Sunday</MenuItem>
                <MenuItem value="monday" style={{ fontFamily: 'Calibri' }}>Monday</MenuItem>
                <MenuItem value="tuesday" style={{ fontFamily: 'Calibri' }}>Tuesday</MenuItem>
                <MenuItem value="wednesday" style={{ fontFamily: 'Calibri' }}>Wednesday</MenuItem>
                <MenuItem value="thursday" style={{ fontFamily: 'Calibri' }}>Thursday</MenuItem>
                <MenuItem value="friday" style={{ fontFamily: 'Calibri' }}>Friday</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Timeline
          groups={groups}
          items={allItems}
          defaultTimeStart={moment("2024-02-25")}
          defaultTimeEnd={moment("2024-04-12")}
        />
      </div>
    );
  };

export default ScheduleDashboard;
