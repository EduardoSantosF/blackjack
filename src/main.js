import { drawCard, getNewDeck, shuffleDeck } from './utils/deckAPI';
import getCardValue from './utils/getCardValue';
import { updateCardsUi, updateDeckUi, updateResultUi } from './utils/uiUpdate';
import './style.css';

let deckId = '';
let players = {
  player1: { pile: [], score: 0 },
  player2: { pile: [], score: 0 },
};

const startGameButton = document.getElementById('start-game-button');
const stopGameButton = document.getElementById('stop-game-button');
const drawCardButton = document.getElementById('draw-card-button');

startGameButton.addEventListener('click', startNewGame);
stopGameButton.addEventListener('click', stopGame);
drawCardButton.addEventListener('click', () => drawCardToPlayer('player1'));

function startNewGame() {
  players = {
    player1: { pile: [], score: 0 },
    player2: { pile: [], score: 0 },
  };

  updateCardsUi(players);
  updateResultUi(players);

  getNewDeck()
    .then(shuffleDeck)
    .then(updateDeckUi)
    .then((deck) => {
      deckId = deck.deck_id;
      drawCardButton.disabled = false;
      stopGameButton.disabled = false;
      startGameButton.disabled = true;
    });
}

function drawCardToPlayer(player) {
  return drawCard(deckId)
    .then((data) => {
      players[player].pile.push(data.cards[0]);
      players[player].score += getCardValue(data.cards[0]);
    })
    .then(() => updateDeckUi(deckId))
    .then(() => updateCardsUi(players));
}

function stopGame() {
  startGameButton.disabled = false;
  stopGameButton.disabled = true;
  drawCardButton.disabled = true;
  Promise.all([drawCardToPlayer('player2'), drawCardToPlayer('player2'), drawCardToPlayer('player2')])
    .then(() => updateCardsUi(players))
    .then(() => updateResultUi(players));
}

// startNewGame();
