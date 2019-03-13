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
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        {
          isEditing ? (
            <input
              autoFocus
              id={props.id}
              onBlur={toggleEditing}
              onChange={props.onChange}
              value={props.name}
            />
          ) : (
            <>
              {
                React.createElement(
                  props.isActive ? 'b' : 'span',
                  {},
                  props.name,
                )
              }
              <button
                onClick={toggleEditing}
                role="button"
                style={{
                  marginLeft: 8,
                }}
              >
                edit
              </button>
            </>
          )
        }
      </div>
      <span>
        Score: {props.pile.length}
      </span>
    </div>
  );
}

export default PlayerStatus
