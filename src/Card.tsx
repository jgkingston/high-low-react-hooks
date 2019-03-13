import React from 'react'
import { DeckCard } from './types';

interface CardProps extends Partial<DeckCard> {
  isDeck?: boolean;
}

const Card: React.SFC<CardProps> = (props) => {
  return (
    <div
      style={{
        backgroundImage: props.isDeck ? "url('cardback.png')" : undefined,
        backgroundSize: props.isDeck ? '100% auto' : undefined,
        height: 140,
        width: 100,
      }}
    >
      {
        props.image && (
          <img
            src={props.image}
            style={{
              height: 'auto',
              width: '100%'
            }}
          />
        )
      }
    </div>
  )
}

export default Card
