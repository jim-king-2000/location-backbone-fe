import { Button } from 'grommet';
import { Pause, Play } from 'grommet-icons';

export default ({ disabled, isPlaying, onPlay, onPause }) => (
  <Button
    margin='xsmall'
    plain={false}
    disabled={disabled}
    icon={isPlaying ? <Pause /> : <Play />}
    onClick={isPlaying ? onPause : onPlay}
    name='onPlayOrPause' />
);