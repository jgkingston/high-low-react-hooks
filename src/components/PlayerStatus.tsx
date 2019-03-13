import React, { useState } from 'react'
import { Player } from '../types';

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
    <div>
      <input
        autoFocus
        id={props.id}
        onBlur={toggleEditing}
        onChange={props.onChange}
        style={{
          width: 60,
        }}
        value={props.name}
      >
      </input>
      <span>
        : {props.pile.length}
      </span>
    </div>
  );
}

export default PlayerStatus
