import React, { Component } from 'react';
import { Collapsible, CheckBox, Button, Box, Text } from 'grommet';
import { FormNext, FormDown } from 'grommet-icons';

export const GroupSelector = ({ groups, vehicles, disabled }) => (
  <div style={{
    maxHeight: '275px',
    overflowX: 'auto',
    overflowY: 'scroll'
  }}>
    <Box pad='xsmall' flex={false}>
      {Array.isArray(groups) && groups.map(group => (
        <React.Fragment key={group.id}>
          <CheckBox
            disabled={disabled}
            checked={!!group.checked}
            indeterminate={!!group.indeterminate}
            label={
              <Box direction='row' align='center'>
                {group.open ? <FormDown /> : <FormNext />}
                <Text wordBreak='keep-all'>{group.name}</Text>
              </Box>
            }
          />
          <Collapsible>
            <Box>
              {}
            </Box>
          </Collapsible>
        </React.Fragment>
      ))}
    </Box>
  </div>
);
