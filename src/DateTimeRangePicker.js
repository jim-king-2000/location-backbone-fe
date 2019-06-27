import React from 'react';
import moment from 'moment';
import { Box } from 'grommet';
import { DateTimePicker } from './DateTimePicker';

export const DateTimeRangePicker = ({
  startTime = { date: moment().format('YYYY-MM-DD'), time: '00:00' },
  endTime = { date: moment().format('YYYY-MM-DD'), time: '00:00' },
  disabled, onChangeStartTime, onChangeEndTime }) => (
  <Box direction='row' justify='center' align='center'>
    <DateTimePicker
      date={startTime.date}
      time={startTime.time}
      disabled={disabled}
      onChange={onChangeStartTime} />
    {'至'}
    <DateTimePicker
      date={endTime.date}
      time={endTime.time}
      disabled={disabled}
      onChange={onChangeEndTime} />
  </Box>
);