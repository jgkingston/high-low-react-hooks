import React from 'react'
import { DeckCard } from './types';

interface CardProps extends Partial<DeckCard> {
  isDeck?: boolean;
}

const Card: React.SFC<CardProps> = (props) => {
  return (
    <div
      style={{
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
      {
        !props.image && props.isDeck && (
          <img
            src={'cardback.png'}
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
