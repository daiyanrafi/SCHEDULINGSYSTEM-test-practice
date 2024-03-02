import React, { useState } from "react";
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import { MenuItem, Select, FormControl, InputLabel, Grid } from '@material-ui/core';
// import { DatePicker } from "@mui/x-date-pickers";

import 'react-calendar-timeline/lib/Timeline.css';
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

    // Filtering bookings based on selected day
    const filteredBookings = bookings.filter(booking => {
      const bookingDate = moment(booking.starttime);
      return selectedDay ? bookingDate.format('dddd').toLowerCase() === selectedDay.toLowerCase() : true;
    });

    // Filtering bookings based on selected date range
    const filteredDateRangeBookings = filteredBookings.filter(booking => {
      const bookingDate = moment(booking.starttime);
      return startDate && endDate ? bookingDate.isBetween(startDate, endDate, 'day', '[]') : true;
    });

    const groups = resources.map(resource => ({
      id: resource.bookableresourceid,
      title: resource.name,
    }));

    const items = filteredDateRangeBookings.map((booking, index) => ({
      id: index,
      group: booking.Resource.bookableresourceid,
      title: booking.name,
      start_time: moment(booking.starttime),
      end_time: moment(booking.endtime),
    }));

    return (
      <div style={{ marginTop: "20px", marginLeft: "50px", marginRight: "50px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4} lg={3} > {/* Adjust the size and centering of the Grid item "style={{ margin: '0 auto' }}"*/}
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

          <Grid item>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          format="yyyy-MM-dd" 
        />
      </Grid>
      <Grid item>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          format="yyyy-MM-dd" 
        />
      </Grid>
      
        </Grid>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment("2024-02-25")}
          defaultTimeEnd={moment("2024-04-12")}
        />
      </div>
    );


  };

export default ScheduleDashboard;
