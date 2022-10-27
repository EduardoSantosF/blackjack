const fetchAPI = (endpoint) => {
  const url = `https://deckofcardsapi.com/api/deck/${endpoint}`;
  return fetch(url).then((response) => response.json());
};

export const getNewDeck = () => fetchAPI('new').then((data) => data.deck_id);

export const shuffleDeck = (deckId) => fetchAPI(`${deckId}/shuffle/?remaining=true`)
  .then((data) => data.deck_id);

export const drawCard = (deckId) => fetchAPI(`${deckId}/draw`);

export const getDeck = (deckId) => fetchAPI(deckId);
