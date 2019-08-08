import { Box, CheckBox } from 'grommet';
import { observer } from 'mobx-react';

export const FlatSelector = observer(({
  disabled, vehicles, onChange, ...props }) => (
  <Box {...props}>
    {vehicles.map(v =>
      <CheckBox
        disabled={disabled}
        key={v.thingId}
        label={v.thingName}
        checked={!!v.enabled}
        onChange={e => onChange(v, e.target.checked)} />)}
  </Box>
));
