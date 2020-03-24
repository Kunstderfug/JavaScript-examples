let a = [1, 4, 56, 2, 42, 4, 1, 34, 56, 4, 1, 2, 5, 56];
let b = 'hey guys, what is going on tomorrow';
let c = 'oh, everythin is closed from tomorrow. Should we buy something?';

function findDuplicates(arr) {
  let dupl = {};
  let counter = 1;
  let sorted = arr.sort();

  for (i = 0; i < sorted.length; i++) {
    let number = sorted[i];
    dupl[number] = counter;
    if (sorted[i] === sorted[i + 1]) {
      counter++;
      dupl[number] = counter;
    } else {
      counter = 1;
    }
  }
  return dupl;
}

let duplicates = findDuplicates(a);

function checkWords(arr) {
  return arr.length > 1 ? 'a few words' : 'a word';
}

function longestWord(str) {
  let words = str.split(' ');
  let lWord = '';
  let longest = [];
  let wordsWithComma = [];
  let wordsOrWord;

  for (let word of words) {
    let mark = word[word.length - 1];
    if (mark === ',' || mark === '!' || mark === '?' || mark === '.') {
      word = word.slice(0, word.length - 1);
      wordsWithComma.push(word);
      word.length = word.length - 1;
    }
    if (word.length >= lWord.length) {
      lWord = word;
    }
    longest.pop();
    longest.push(lWord);
  }

  wordsOrWord = checkWords(wordsWithComma);

  if (longest.length >= 2) {
    return `We have ${wordsOrWord} with punctuation marks: \n ${wordsWithComma} \n\nthe longest words from \n||${str}|| are: \n'${longest}'`;
  } else {
    return `We have ${wordsOrWord} with punctuation marks: \n ${wordsWithComma} \n\nthe longest word from \n||${str}|| is: \n'${lWord}'`;
  }
}
