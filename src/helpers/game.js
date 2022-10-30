import { drawNewCard, getNewDeck, shuffleDeck } from './api';

let playersScore = {
  1: 0,
  2: 0,
};
let deckId;

const shuffleButton = document.querySelector('.shuffle');
const drawButton = document.querySelector('.draw');
const stopButton = document.querySelector('.stop');

export function addCardToPlayer(card, playerNumber) {
  const img = document.createElement('img');
  img.src = card.image;
  img.alt = `${card.value} of ${card.suit}`;
  img.classList.add('card');
  document.querySelector(`.player-${playerNumber}.cards`).appendChild(img);

  if (card.value === 'JACK' || card.value === 'QUEEN' || card.value === 'KING') {
    playersScore[playerNumber] += 10;
  } else if (card.value === 'ACE') {
    playersScore[playerNumber] += 1;
  } else {
    playersScore[playerNumber] += Number(card.value);
  }

  document.querySelector(`.player-${playerNumber}.score`).textContent = playersScore[playerNumber];
}

function restartGame() {
  playersScore = {
    1: 0,
    2: 0,
  };
  document.querySelector('.player-1.score').textContent = 0;
  document.querySelector('.player-2.score').textContent = 0;
  document.querySelector('.player-1.cards').innerHTML = '';
  document.querySelector('.player-2.cards').innerHTML = '';
  document.querySelector('.result').classList.add('hidden');
}

export function startNewGame() {
  restartGame();
  getNewDeck()
    .then((data) => shuffleDeck(data.deck_id))
    .then((data) => {
      deckId = data.deck_id;
      shuffleButton.disabled = true;
      drawButton.disabled = false;
      stopButton.disabled = false;
    });
}

export function drawCard() {
  drawNewCard(deckId)
    .then((data) => {
      const card = data.cards[0];
      addCardToPlayer(card, 1);

      if (playersScore[1] >= 21) {
        stopGame();
      }
    });
}

function showResult(result) {
  const resultElement = document.querySelector('.result');
  resultElement.src = result === 'win' ? 'src/imgs/win.png' : 'src/imgs/lose.png';
  resultElement.classList.remove('hidden');
}

async function dealerTurn() {
  const data = await drawNewCard(deckId);
  const card = data.cards[0];
  addCardToPlayer(card, 2);

  if (playersScore[2] < 17) { // dealer deve comprar até atingir 17 pontos ou mais
    await dealerTurn(); // explicar recursividade
  }
}

export async function stopGame() {
  drawButton.disabled = true;
  stopButton.disabled = true;
  shuffleButton.disabled = false;

  if (playersScore[1] > 21) {
    return showResult('lose');
  }

  await dealerTurn();

  if (playersScore[1] > playersScore[2] || playersScore[2] > 21) {
    showResult('win');
  } else {
    showResult('lose');
  }
}
