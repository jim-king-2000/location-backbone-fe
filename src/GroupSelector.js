import React, { Component } from 'react';
import { Collapsible, CheckBox, Box, Text } from 'grommet';
import { FormNext, FormDown } from 'grommet-icons';

function buildIndex(vehicles) {
  const index = new Map();
  vehicles.forEach(v => {
    const troop = index.get(v.groupId);
    if (undefined === troop) index.set(v.groupId, [v])
    else troop.push(v);
  });
  return index;
}

export class GroupSelector extends Component {
  state = {
    groups: this.props.groups,
    vehicleIndex: buildIndex(this.props.vehicles)
  }

  onOpen = (e, group) => {
    e.preventDefault();
    group.open = !group.open;
    this.setState({ groups: this.state.groups });
  }

  onChangeGroup = (group, e) => {
    group.enabled = e.target.checked;
    group.indeterminate = false;
    const troop = this.state.vehicleIndex.get(group.id);
    Array.isArray(troop) && troop.forEach(v => v.enabled = group.enabled);
    this.setState({
      groups: this.state.groups,
      vehicleIndex: this.state.vehicleIndex
    });
  }

  onChangeVehicle = (v, e, group) => {
    v.enabled = e.target.checked;
    const troop = this.state.vehicleIndex.get(v.groupId);
    group.enabled = troop.every(v => v.enabled);
    group.indeterminate = troop.some(v => v.enabled) &&
      troop.some(v => !v.enabled);
    this.setState({
      groups: this.state.groups,
      vehicleIndex: this.state.vehicleIndex
    });
  }

  render() {
    const disabled = this.props.disabled;
    const groups = this.state.groups;
    const vehicleIndex = this.state.vehicleIndex;
    return (
      <Box
        height={{max: '275px'}}
        overflow='auto'>
        <Box pad='xsmall' flex={false}>
          {Array.isArray(groups) && groups.map(group => (
            <React.Fragment key={group.id}>
              <CheckBox
                disabled={!!disabled}
                checked={!!group.enabled}
                indeterminate={!!group.indeterminate}
                onChange={e => this.onChangeGroup(group, e)}
                label={
                  <Box
                    direction='row'
                    align='center'
                    onClick={e => this.onOpen(e, group)}
                  >
                    {group.open ? <FormDown /> : <FormNext />}
                    <Text wordBreak='keep-all'>{group.name}</Text>
                  </Box>
                }
              />
              <Collapsible open={!!group.open}>
                <Box margin={{ left: 'medium' }}>
                  {Array.isArray(vehicleIndex.get(group.id)) &&
                    vehicleIndex.get(group.id).map(v => (
                      <CheckBox
                        disabled={!!disabled}
                        key={v.thingId}
                        label={v.thingName}
                        checked={!!v.enabled}
                        onChange={
                          e => this.onChangeVehicle(v, e, group)
                        }
                      />
                    ))
                  }
                </Box>
              </Collapsible>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    );
  }
}
