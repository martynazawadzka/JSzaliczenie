const deck = (() => {
  const deck = [];
  const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  for (const suit of suits) {
    for (let value of values) {
      deck.push({ suit: suit, value: value });
    }
  }
  return deck;
})();

module.exports = deck;
