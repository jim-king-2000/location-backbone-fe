import { Box, Button } from 'grommet';
import { Home, Add, Subtract } from 'grommet-icons';

export const PluginZoom = ({ __map__, ...props }) => (
  <Box margin='xsmall' gap='xsmall' {...props}>
    <Button plain={false} icon={<Home />}
      onClick={() => __map__.setFitView()} />
    <Button plain={false} icon={<Add />}
      onClick={() => __map__.zoomIn()} />
    <Button plain={false} icon={<Subtract />}
      onClick={() => __map__.zoomOut()} />
  </Box>
);