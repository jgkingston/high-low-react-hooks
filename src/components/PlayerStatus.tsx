import React, { useState } from 'react'
import { Player } from '../types';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

interface Props extends Player {
  isActive: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const PlayerStatus: React.SFC<Props> = (props) => {
  return (
    <TextField
      id={props.id}
      InputProps={{
        endAdornment: <InputAdornment position="end">{`${props.pile.length}`}</InputAdornment>,
      }}
      label={props.isActive ? 'Active': ' '}
      onChange={props.onChange}
      style={{
        marginLeft: 32,
        marginRight: 32,
      }}
      value={props.name}
    />
  );
}

export default PlayerStatus
