import React, { useState } from 'react'
import { Player } from '../types';

import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';

interface Props extends Player {
  isActive: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const PlayerStatus: React.SFC<Props> = (props) => {
  return (
    <div>
      <InputBase
        id={props.id}
        endAdornment={<InputAdornment position="end">{`${props.pile.length}`}</InputAdornment>}
        onChange={props.onChange}
        value={props.name}
      />
    </div>
  );
}

export default PlayerStatus
