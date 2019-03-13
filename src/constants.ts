export const FaceCardValueMap: Record<string, number> = {
    ACE: 14,
    KING: 13,
    QUEEN: 12,
    JACK: 11,
}

export const GUESS_TYPE_HIGHER = 'Higher';
const GUESS_TYPE_LOWER = 'Lower';

export const GUESS_TYPES = [GUESS_TYPE_HIGHER, GUESS_TYPE_LOWER];

export const flipCardSound = new Audio('flip-card.mp3')
export const shuffleSound = new Audio('shuffling-cards-1.mp3')
