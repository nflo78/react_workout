import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function Calendar({ setDay }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={(newVal) => { setDay(newVal); }} />
    </LocalizationProvider>
  );
}

export default Calendar;
