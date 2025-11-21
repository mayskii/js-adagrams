const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

const LETTER_SCORE = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10
};

export const drawLetters = () => {
  let hand = [];

  const remainingLetters = { ...LETTER_POOL };
  const letters = Object.keys(LETTER_POOL);

  // draw 10 letters randomly into the hand from letters
  while (hand.length < 10) {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    if (remainingLetters[randomLetter] > 0) {
      hand.push(randomLetter);
      remainingLetters[randomLetter]--;
    }
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {

  if (input.length > lettersInHand.length) {
    return false;
  }
  // create frequency of letters in lettersInHand
  const frequency = {};
  lettersInHand.forEach(letter => {
    frequency[letter] = (frequency[letter] || 0) + 1;
  });

  // check whether the letters exist in the frequency
  for (const letter of input){
    if (!frequency[letter]) {
      return false;
    }
    frequency[letter]--;
  }
  return true;
};

export const scoreWord = (word) => {

  if (!word) return 0;
  let score = 0;

  // calculate the score for the word
  for (const letter of word.toUpperCase()){
    score += LETTER_SCORE[letter];
  }
  return word.length >= 7 ? score + 8 : score;
};

export const highestScoreFrom = (words) => {
  let bestWord = '';
  let bestWordScore = 0;

  // calculate the score for the word
  for (const word of words){
    const score = scoreWord(word);

    // check the word's score and compare it to bestWordScore (reassign if the current word has a higher score)
    if (score > bestWordScore) {
      bestWord = word;
      bestWordScore = score;
    } else if (score === bestWordScore){
      if (bestWord.length == 10) continue;
      if (word.length === 10 || word.length < bestWord.length) {
        bestWord = word;
      }
    }
  }
  return { word: bestWord, score: bestWordScore };
};