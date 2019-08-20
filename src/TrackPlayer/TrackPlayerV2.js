import React, { Component } from 'react';
import assert from 'assert';
import { observer } from 'mobx-react';
import { Box, Button, RangeInput } from 'grommet';
import { FastForward, Rewind } from 'grommet-icons';
import ButtonPlayOrPause from './ButtonPlayOrPause';

const Steps = [
  500,
  1000,
  2000,
  5000,
  10000,
  20000,
  50000,
  100000,
];

function normalize(step) {
  if (step < 0) return 0;
  if (Steps.length <= step) return Steps.length - 1;
  return step;
}

@observer
export class TrackPlayerV2 extends Component {
  onPlay = () => {
    assert.deepEqual(this.props.playerStatus.isPlaying, false);
    const timeline = this.props.timeline;
    const { endTimestamp, currentTimestamp } = timeline;
    const timer = this.props.playerStatus.timer;

    if (timer) {
      assert.fail('Timer should be undefined.');
      this.onPause();
    }
    timer = setInterval(() => {
      if (currentTimestamp >= endTimestamp) {
        this.onPause();
        return;
      }
      timeline.currentTimestamp += Steps[this.props.playerStatus.step || 1];
    }, 700);

    this.props.playerStatus.isPlaying = true;
  }

  onPause = () => {
    assert.deepEqual(this.props.playerStatus.isPlaying, true);
    const timer = this.props.playerStatus.timer;
    clearInterval(timer);
    this.props.playerStatus.timer = undefined;
    this.props.playerStatus.isPlaying = false;
  }

  onFast = () => this.props.playerStatus.step =
    normalize((this.props.playerStatus.step || 1) + 1);
  onSlow = () => this.props.playerStatus.step =
    normalize((this.props.playerStatus.step || 1) - 1);

  render() {
    const { startTimestamp, endTimestamp,
      currentTimestamp } = this.props.timeline;
    const enabled = startTimestamp < endTimestamp;
    const isPlaying = this.props.playerStatus.isPlaying;
    const step = this.props.playerStatus.step || 1;
    return (
      <Box flex={false}>
        <Box align='center' pad='xsmall' flex={false}>
          <RangeInput
            min={startTimestamp}
            max={endTimestamp}
            value={currentTimestamp}
            onChange={e =>
              this.props.timeline.currentTimestamp = Number(e.target.value)} />
        </Box>
        <Box flex={false} direction='row'>
          <ButtonPlayOrPause
            disabled={!enabled}
            isPlaying={isPlaying}
            onPlay={this.onPlay}
            onPause={this.onPause} />
          <Button
            margin='xsmall'
            plain={false}
            disabled={!enabled}
            icon={<Rewind />}
            onClick={this.onSlow} />
          <Button
            margin='xsmall'
            plain={false}
            disabled={!enabled}
            icon={<FastForward />}
            onClick={this.onFast} />
          <Box
            margin='xsmall'
            justify='center'>
            {Steps[step] / 1000}&times;
          </Box>
        </Box>
      </Box>
    );
  }
}