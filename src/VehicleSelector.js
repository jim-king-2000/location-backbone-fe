import { Box, CheckBox } from 'grommet';

export const VehicleSelector = ({ vehicles, onChange, ...props }) => (
  <Box {...props}>
    {vehicles.map(v =>
      <CheckBox
        key={v.thingId}
        label={v.thingName}
        checked={!!v.enabled}
        onChange={e => onChange(v, e.target.checked)} />)}
  </Box>
);
