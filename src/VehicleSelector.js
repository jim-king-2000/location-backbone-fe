import { Box, CheckBox } from 'grommet';
import { observer } from 'mobx-react';

export const VehicleSelector = observer(({ vehicles, onChange, ...props }) => (
  <Box {...props}>
    {vehicles.map(v =>
      <CheckBox
        key={v.thingId}
        label={v.thingName}
        checked={!!v.enabled}
        onChange={onChange(v, e.target.checked)} />)}
  </Box>
));
