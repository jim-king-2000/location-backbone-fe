import React, { Component } from 'react';
import moment from 'moment';
import { Box, Button, Keyboard, Calendar, MaskedInput,
  DropButton } from 'grommet';

class DropContent extends Component {
  state = this.props;
  
  setDate = date => this.setState({ date: moment(date).format('YYYY-MM-DD') });
  setTime = time => this.setState({ time });
  close = () => this.props.onClose(this.state.date, this.state.time);

  render() {
    const { date, time } = this.state;
    return (
      <Box align='center'>
        <Calendar
          size='small'
          animate={false}
          date={date}
          onSelect={this.setDate}
          showAdjacentDays={false}
        />
        <Box flex={false} pad='xsmall' gap='xsmall'>
          <Keyboard
            onEnter={event => {
              event.preventDefault(); // so drop doesn't re-open
              close();
            }}
          >
            <MaskedInput
              mask={[
                {
                  length: [1, 2],
                  options: [
                    '00', '01', '02', '03',
                    '04', '05', '06', '07',
                    '08', '09', '10', '11',
                    '12', '13', '14', '15',
                    '16', '17', '18', '19',
                    '20', '21', '22', '23',
                  ],
                  regexp: /^[0-2]$|^[0-9]$/,
                  placeholder: 'HH'
                },
                { fixed: ':' },
                {
                  length: 2,
                  options: ['00', '15', '30', '45'],
                  regexp: /^[0-5][0-9]$|^[0-9]$/,
                  placeholder: 'mm'
                },
              ]}
              value={time}
              name='maskedInput'
              onChange={event => this.setTime(event.target.value)}
            />
          </Keyboard>
          <Box flex={false} align='center'>
            <Button label='确定' onClick={this.close} />
          </Box>
        </Box>
      </Box>
    );
  }
};

export class DateTimePicker extends Component {
  state = {
    date: this.props.date || moment().format('YYYY-MM-DD'),
    time: this.props.time || '00:00'
  };

  onClose = (date, time) => {
    this.setState({ date, time, open: false });
    this.props.onChange({ date, time });
  };

  render() {
    const { open, date, time } = this.state;
    return (
      <DropButton
        margin='xsmall'
        open={open}
        disabled={this.props.disabled}
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
        dropContent={
          <DropContent date={date} time={time} onClose={this.onClose} />
        }
      >
        <Box direction='column' pad='xsmall'>
          {date ?
            <>{date}<br />{time}</> :
            'Selete date & time'}
        </Box>
      </DropButton>
    );
  }
}