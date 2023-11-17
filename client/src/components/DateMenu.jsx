import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DateMenu({ startDate, setStartDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Workout Date"
        value={startDate}
        onChange={(newValue) => setStartDate(newValue)}
      />
    </LocalizationProvider>
  );
}

export default DateMenu;
