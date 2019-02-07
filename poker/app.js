const deck = require('./deck');

const myCards = [];

const getRandomId = () => Math.floor(Math.random() * 52);

const giveCards = (() => {
  for (let i = 0; myCards.length < 5; i++) {
    const index = getRandomId();
    if (!myCards.includes(deck[index])) {
      myCards.push(deck[index]);
    }
  }
})();

const sortCards = cards => {
  cards.sort((firstCard, nextCard) => firstCard.value - nextCard.value);
  return cards;
};

const sortedCards = sortCards(myCards);

const checkIfRoyalPoker = cards => {
  const pokerValues = [1, 10, 11, 12, 13];

  let suit = cards[0].suit;

  for (let i = 0; i < pokerValues.length; i++) {
    if (
      sortedCards[i].value !== pokerValues[i] ||
      sortedCards[i].suit !== suit
    ) {
      return;
    }
  }

  return 'royal poker';
};

const checkIfPoker = () => {
  let prevValue = sortedCards[0].value;
  let suit = sortedCards[0].suit;
  if (prevValue === 1) {
    //obsługa gdy as został posortowany jako najniższa karta
    prevValue = 9;
  }
  for (let i = 1; i < sortedCards.length; i++) {
    if (
      sortedCards[i].value !== prevValue + 1 ||
      sortedCards[i].suit !== suit
    ) {
      return;
    }
    prevValue++;
  }
  return 'poker';
};

const checkIfFourOfKind = cards => {
  const firstValue = cards[0].value;
  const secondValue = cards[1].value;

  const cardsSameAsFirst = cards.filter(card => card.value === firstValue);

  if (cardsSameAsFirst.length === 4) {
    return 'Four of Kind';
  }

  const cardsSameAsSecond = cards.filter(card => card.value === secondValue);

  if (cardsSameAsSecond.length === 4) {
    return 'Four of Kind';
  }
};

const checkIfFullHouse = cards => {
  const tempCards = cards;
  const firstValue = tempCards[0].value;

  const withoutFirstValue = tempCards.filter(card => card.value !== firstValue);

  if (withoutFirstValue.length !== 2 && withoutFirstValue.length !== 3) {
    return;
  }

  const secondValue = withoutFirstValue[0].value;
  const otherThanSecondValue = withoutFirstValue.filter(
    card => card.value !== secondValue
  );

  if (!otherThanSecondValue.length) {
    return 'Full House';
  }
};

const checkIfFlush = cards => {
  const firstCardSuit = cards[0].suit;

  const cardsSameAsFirst = cards.filter(card => card.suit === firstCardSuit);

  if (cardsSameAsFirst.length === 5) {
    return 'Flush';
  }
};

const checkIfStreigh = () => {
  let prevValue = sortedCards[0].value;
  if (sortedCards[4].value === 13) {
    //obsługa gdy as został posortowany jako najniższa karta
    prevValue = 9;
  }
  for (let i = 1; i < sortedCards.length; i++) {
    if (sortedCards[i].value !== prevValue + 1) {
      return;
    }
    prevValue++;
  }
  return 'Streigh';
};

const checkIfThreeOfAKind = () => {
  if (
    sortedCards[0].value === sortedCards[2].value ||
    sortedCards[2].value === sortedCards[4].value
  ) {
    return 'Three of a kind';
  }
};

const checkIfTwoPairs = cards => {
  const firstCardValue = cards[0].value;

  const cardsOtherThanFirst = cards.filter(
    card => card.value !== firstCardValue
  );

  if (cardsOtherThanFirst.length !== 4 && cardsOtherThanFirst.length !== 3) {
    return;
  }

  const secondCardValue = cardsOtherThanFirst[0].value;

  const cardsOtherThanSecond = cardsOtherThanFirst.filter(
    card => card.value !== secondCardValue
  );

  if (
    cardsOtherThanSecond.length === 1 ||
    (cardsOtherThanSecond[0].value === cardsOtherThanSecond[1].value &&
      cardsOtherThanSecond.length === 2)
  ) {
    return 'Two Pairs';
  }
};

const checkIfPair = () => {
  for (let i = 0; i < sortedCards.length - 1; i++) {
    if (sortedCards[i].value === sortedCards[i + 1].value) {
      return 'Pair';
    }
  }
};

const checkIfHightCard = () => {
  const higherCard = sortedCards[4];

  return `Hight card with ${higherCard.value} ${higherCard.suit}`;
};

const findMySystem = (() => {
  let system = '';
  const checkingFunctions = [
    checkIfRoyalPoker,
    checkIfPoker,
    checkIfFourOfKind,
    checkIfFullHouse,
    checkIfFlush,
    checkIfStreigh,
    checkIfThreeOfAKind,
    checkIfTwoPairs,
    checkIfPair,
    checkIfHightCard
  ];
  for (let checkingFunction of checkingFunctions) {
    const result = checkingFunction(myCards);
    if (result) {
      system = result;
      console.log(`Twoj uklad to ${system}`);
      return;
    }
  }
})();
