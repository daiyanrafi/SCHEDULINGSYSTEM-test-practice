import React, { useEffect } from 'react';
import resources from './data/resource.json';
import bookings from './data/bookings.json';
import { Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import ScheduleManagement from './schedule/ScheduleManagement';

const ScheduleDashboard: React.FC = () => {
  const startDate = new Date('2024-02-25T23:00:00Z');
  const endDate = new Date('2024-04-12T23:00:00Z');
  const selectedDay: Number = 3;
  const [noofDays, setnoofDays] = React.useState<number>(0);
  const [headers, setHeaders] = React.useState<IScheduleColumn[]>([]);


  const getbookingsforaday = (bookings: any, resourceid: string, day: number, month: number, year: number) => {
    let bookingtext = '';
    let daybookings: any = [];
    bookings.map((booking: any) => {
      const bdate = new Date(booking.starttime);
      if (booking.Resource.bookableresourceid === resourceid && bdate.getDate() === day && bdate.getMonth() + 1 === month && bdate.getFullYear() === year) {
        bookingtext += ' ' + bdate.getHours() + ':' + bdate.getMinutes() + ' ' + booking.name + `,`;
        daybookings.push(booking);
      }
    })
    return <TableCell sx={{ fontFamily: 'Calibri', border: '1px solid black', padding: '8px', textAlign: 'center' }}><ScheduleManagement schedule={daybookings} /></TableCell>;
  }

  const columns = (headers: IScheduleColumn[], resourceid: string) => {

    return headers.map((header: IScheduleColumn) => {
      // return <td>{header.day} {header.month} {header.year}</td>
      return getbookingsforaday(bookings, resourceid, header.day, header.month, header.year);
    });
  }

  const setHeaderSettings = (startDate: Date, endDate: Date) => {


    if (!startDate || !endDate) return [];

    const headersl = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (selectedDay === undefined || currentDate.getDay() === selectedDay) {
        const header: IScheduleColumn = { month: currentDate.getMonth() + 1, day: currentDate.getDate(), year: currentDate.getFullYear() }
        headersl.push(header);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setHeaders(headersl);
  }

  const tableheader = (startDate: Date, endDate: Date) => {
    //return <tr>{columnheader('this si sour header')}</tr>


    if (!startDate || !endDate) return [];

    const headers = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (selectedDay === undefined || currentDate.getDay() === selectedDay) {
        const headerTitle = currentDate.toLocaleDateString('en-AU', {
          weekday: 'long',
          day: 'numeric',
          month: 'short'
        });
        headers.push(
          <TableCell
            key={currentDate.toISOString()}
            sx={{
              fontFamily: 'Calibri',
              border: '1px solid black',
              padding: '8px',
              textAlign: 'center',
              backgroundColor: '#f0f0f0', // Light gray background color
              color: '#333', // Dark gray text color
              fontWeight: 'bold', // Bold text
              textTransform: 'uppercase' // Uppercase text
            }}
          >
            {headerTitle}
          </TableCell>
        );
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return headers;
  }

  useEffect(() => {
    setHeaderSettings(startDate, endDate);

  }, []);

  console.log(resources);
  return (
    <div style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: 'Calibri', fontWeight: 'bold', border: 'none', padding: '8px' }}>Resource</TableCell>
            {tableheader(startDate, endDate)}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            resources.map((resource, index) => ( // Added index parameter to map function
            <TableRow key={resource.bookableresourceid}>
                <TableCell 
                    sx={{ 
                        fontFamily: 'Calibri', 
                        fontWeight: 'bold', 
                        // border: index === resources.length - 1 ? 'none' : '1px solid black', // Remove border from the last row
                        padding: '8px' 
                  }}
                >
                  {resource.name}
                </TableCell>
                {columns(headers, resource.bookableresourceid)}
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default ScheduleDashboard;

interface IScheduleColumn {
  month: number;
  day: number;
  year: number;
}
