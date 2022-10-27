// Passa um objeto card (igual ao da API) e retorna o valor da carta
export default function getCardValue(card) {
  switch (card.value) {
    case 'KING':
      return 10;
    case 'QUEEN':
      return 10;
    case 'JACK':
      return 10;
    case 'ACE':
      return 1;
    default:
      return Number(card.value);
  }
}
