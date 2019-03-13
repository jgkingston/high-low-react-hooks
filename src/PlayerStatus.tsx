import React, { useState } from 'react'
import { Player } from './types';

interface Props extends Player {
  isActive: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const PlayerStatus: React.SFC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState (false);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  return (
    <div
      style={{
        fontWeight: props.isActive ? 'bold' : 'normal',
      }}
    >
      <span
        contentEditable
        onChange={props.onChange}
      >
        {props.name}
      </span>
      <span>
        : {props.pile.length}
      </span>
    </div>
  );
}

export default PlayerStatus
