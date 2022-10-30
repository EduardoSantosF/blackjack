export function fetchAPI(endpoint) {
  return fetch(`https://deckofcardsapi.com/api/deck/${endpoint}`)
    .then((response) => response.json());
}

export function shuffleDeck(deckId) {
  return fetchAPI(`${deckId}/shuffle`);
}

export function drawNewCard(deckId) {
  return fetchAPI(`${deckId}/draw`);
}

export function getNewDeck() {
  return fetchAPI('new');
}
