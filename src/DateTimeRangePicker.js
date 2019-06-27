import React from 'react';
import { Box } from 'grommet';
import { DateTimePicker } from './DateTimePicker';

export const DateTimeRangePicker = ({
  disabled, startTime, endTime,
  onChangeStartTime, onChangeEndTime }) => (
  <Box direction='row' justify='center' align='center'>
    <DateTimePicker
      date={startTime && startTime.date}
      time={startTime && startTime.time}
      disabled={disabled}
      onChange={onChangeStartTime} />
    {'至'}
    <DateTimePicker
      date={endTime && endTime.date}
      time={endTime && endTime.time}
      disabled={disabled}
      onChange={onChangeEndTime} />
  </Box>
);