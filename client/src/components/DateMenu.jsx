import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DateMenu({ menuDate, setMenuDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Workout Date"
        value={menuDate}
        onChange={(newValue) => setMenuDate(newValue)}
      />
    </LocalizationProvider>
  );
}

export default DateMenu;
