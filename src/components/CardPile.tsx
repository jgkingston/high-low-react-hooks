import React from 'react'
import { DeckCard } from '../types';
import { Badge, Tooltip } from '@material-ui/core';

interface CardProps extends Partial<DeckCard> {
  showCardBack?: boolean;
  cardsInPile: number;
}

const CardPile: React.SFC<CardProps> = (props) => {
  return (
    <Badge
      badgeContent={
        <Tooltip
          placement="top"
          title={props.showCardBack
            ? `Cards in deck: ${props.cardsInPile}`
            : `Card in pile: ${props.cardsInPile}`
          }
        >
          <span>{props.cardsInPile}</span>
        </Tooltip>
      }
      color={props.showCardBack
        ? 'primary'
        : 'secondary'
      }
    >
      <div
        style={{
          backgroundImage: props.showCardBack ? "url('cardback.png')" : undefined,
          backgroundSize: props.showCardBack ? 'cover' : undefined,
          height: '56vw',
          maxHeight: 314,
          maxWidth: 226,
          width: '40vw',
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
    </Badge>
  )
}

export default CardPile
