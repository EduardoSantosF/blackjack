import { getDeck } from './deckAPI';

const deckRemainingCardsEl = document.getElementById('deck-remaining-cards');
const deckShuffledEl = document.getElementById('deck-shuffled');
const player1PileListEl = document.getElementById('player-1-pile');
const player2PileListEl = document.getElementById('player-2-pile');
const player1ScoreEl = document.getElementById('player-1-score');
const player2ScoreEl = document.getElementById('player-2-score');
const player1Result = document.getElementById('player-1-result');
const player2Result = document.getElementById('player-2-result');

export function updateDeckUi(deckId) {
  return getDeck(deckId)
    .then((deck) => {
      deckRemainingCardsEl.innerHTML = deck.remaining || '';
      deckShuffledEl.classList.toggle('hidden', !deck.shuffled);
      return deck;
    });
}

export function updateCardsUi(players) {
  player1ScoreEl.innerHTML = players.player1.score;
  player2ScoreEl.innerHTML = players.player2.score;

  player1PileListEl.innerHTML = players.player1.pile.reduce((prev, card) => `${prev}<img width="100" src=${card.image} />`, '');

  player2PileListEl.innerHTML = players.player2.pile.reduce((prev, card) => `${prev}<img width="100" src=${card.image} />`, '');
}

function toggleResult({ player1Won, player2Won }) {
  player1Result.classList.toggle('win', player1Won);
  player2Result.classList.toggle('win', player2Won);

  player1Result.classList.toggle('lose', player1Won === false);
  player2Result.classList.toggle('lose', player2Won === false);
}

export function updateResultUi({ player1, player2 }) {
  const { score: p1Score } = player1;
  const { score: p2Score } = player2;

  if (p1Score === 0) {
    toggleResult({
      player1Won: null,
      player2Won: null,
    });
  } else {
    const player1Won = (p1Score > p2Score && p1Score <= 21) || p2Score > 21;
    const player2Won = (p2Score >= p1Score && p2Score <= 21) || p1Score > 21;

    toggleResult({
      player1Won,
      player2Won,
    });
  }
  deckShuffledEl.classList.toggle('hidden', true);
}
