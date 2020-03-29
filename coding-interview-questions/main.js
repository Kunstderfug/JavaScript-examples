let a = [1, 4, 56, 2, 42, 4, 1, 34, 56, 4, 1, 2, 5, 56];
let b = "hey guys, what is going on yyyyy tomorrow";
let c =
  "oh, disappointing! everything is closed from tomorrow. Should we buy something? It's so frustrating!";
let d = "hey guys what is going on tomorrow";
let e = [2, 4, 6, 8];
let f = [3, 9, 27];
let g = [3, 5, 4, 78, 6, 890];
let h = [12, 22, 32, 42, 52, 62, 72, 82, 65];
let i = [10, 100, 1000, 10, 100, 1000];
let j = [0, 10, 50, 90];
let k = [3, 9, 27, 30];
let l = "fghgf";
let m = "fghjkgf";
let n = "dfghjkl";
let o = "cvbdfgert";

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

function checkWords(arr) {
  return arr.length > 1 ? "a few words" : "a word";
}

function sameLength(arr) {
  let lastWord = arr[arr.length - 1];
  let longestWords = [];
  for (let word of arr) {
    if (word.length === lastWord.length) {
      longestWords.push(`-${word}-`);
    }
  }
  // console.log("longestWords: ", longestWords);
  return longestWords;
}

function isWithMark(arr) {
  if (arr.length > 0) {
    return true;
  } else {
    return false;
  }
}

function longestWord(str) {
  let words = str.split(" ");
  let lWord = "";
  let longest = [];
  let wordsWithComma = [];
  let wordsOrWord;
  let withMark;

  for (let word of words) {
    let mark = word[word.length - 1];

    if (
      mark === "," ||
      mark === "!" ||
      mark === "?" ||
      mark === "." ||
      mark === ";" ||
      mark === ":"
    ) {
      word = word.slice(0, word.length - 1);
      wordsWithComma.push(`${word}(${mark})`);
      word.length = word.length - 1;
    }
    if (word.length >= lWord.length) {
      lWord = word;
      longest.push(lWord);
    }
  }

  longest = sameLength(longest);
  wordsOrWord = checkWords(wordsWithComma);
  withMark = isWithMark(wordsWithComma);

  const answer = function() {
    if (withMark) {
      return `We have ${wordsOrWord} with punctuation marks: \n ${wordsWithComma} \n\n`;
    } else {
      return "";
    }
  };

  const answerOneWord = `the longest word from \n||${str}|| is: \n'${lWord}'`;
  const answerTwoWords = `the longest words from \n||${str}|| are: \n'${longest}'`;

  if (longest.length >= 2) {
    return answer() + answerTwoWords;
  } else {
    return answer() + answerOneWord;
  }
}

function mathEq(arr) {
  let x, y, arithmetic, geometric;
  for (let i = 1; i < arr.length - 1; i++) {
    x = arr[i] - arr[i - 1];
    arithmetic = arr[i + 1] - arr[i];
    y = arr[i] / arr[i - 1];
    geometric = arr[i + 1] / arr[i];
    if (arithmetic !== x && geometric !== y) {
      return `No sequence found. The first failure has been found at index ${i -
        1}\nThe invalid sequence is ${arr[i - 1]} - ${arr[i]} - ${arr[i + 1]}`;
    }
  }
  if (arithmetic === x) {
    return "Arithmetic";
  }
  if (geometric === y) {
    return "Geometric";
  }
}

function capFirstLetter(str) {
  let capArr = str
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return capArr;
}

function unique(str) {
  //method 5, lastIndexOf

  for (let letter of str) {
    let firstLetter = str.indexOf(letter);
    let lastLetter = str.lastIndexOf(letter);
    if (lastLetter > firstLetter) {
      return false;
    }
  }
  return true;
  //method 4, Object
  // let values = {};
  // for (let letter of str) {
  //   if (values[letter]) {
  //     return false;
  //   }
  //   values[letter] = letter;
  //   console.log(values);
  // }

  // return true;
  //method 3, indexOf
  // let values = [];

  // for (let letter of str) {
  //   if (values.indexOf(letter) !== -1) {//Checks if there is already an index of the letter in the values array
  //     return false;
  //   }
  //   values = [...values, letter];//Otherwise pushes the letter into the array
  // }
  // return true;
  //method 2, Object keys
  /* let arrOfLetters = str.split("");
  let result = {};

  for (let letter of arrOfLetters) {
    result[letter] = arrOfLetters.indexOf(letter);
  }

  let condencedArray = Object.keys(result);

  if (condencedArray.length < arrOfLetters.length) {
    return false;
  } else {
    return true;
  }
 */
  //method 1, sort
  /*   let arr = str.split("").sort();

  for (let letter of arr) {
    let counter = 0;
    if (letter === arr[counter + 1]) {
      console.log(letter, arr[counter + 1]);

      return false;
    } else {
      counter++;
      return true;
    }
  } */
}

let p = [3, 5, 7, 30, 15];
let q = [3, 17, 7, 5, 31];

const arraySum = arr => {
  let maxNum = Math.max(...arr);
  return arr.reduce((a, b) => (b !== maxNum ? a + b : a)) === maxNum;
  // let sum1 = arr.sort((a, b) => a - b).pop();
  // return sum1 === arr.reduce((a, b) => a + b);
};

const uniqueStr = str => new Set(str).size === str.length;

let products = [
  { item: "Galaxy 8", company: "Samsung" },
  { item: "iPhone 8", company: "Apple" },
  { item: "iPhone 9", company: "Apple" },
  { item: "iPhone 10", company: "Apple" },
  { item: "Nexus", company: "Google" },
  { item: "Phone", company: "Microsoft" },
  { item: "Redmi 5", company: "Xiaomi" }
];

const uniqueProd = arr => new Set(arr.map(item => item.company).sort());

let r = "Javascript is the greatest programming language";
let s = "ert dfg hjk tyu vbn jkl";

//return the first word with the most repeated letter
const countLetters = str => {
  let arrFromStr = str.split(" ");
  let setsFromArr = arrFromStr.map(word => new Set(word));

  let counter = 0;
  let diff = {};
  let repLetters = 0;
  let longest = "";

  for (let set of setsFromArr) {
    let value = arrFromStr[counter];

    diff[value] = value.length - set.size;

    if (diff[value] <= repLetters) {
    } // console.log(longest);
    if (diff[value] > repLetters) {
      repLetters = diff[value];
      longest = value;
    }
    counter++;
  }
  if (longest) {
    return `The longest word with the most repeated letters in\n'${str}'\nis\n'${longest}'`;
  } else {
    return "There are no any word with repeated letters";
  }
};
