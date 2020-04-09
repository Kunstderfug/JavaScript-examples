/* let slav = {
  name: "Slav",
  job: "concert pianist and arranger",
  birthYear: 1982,
  age: function () {
    return new Date().getFullYear() - this.birthYear;
  },
  workStart: 14,
  exp: function () {
    return this.age() - this.workStart;
  },
  greeting: function (style, timeOfDay) {
    if (style === "formal") {
      return `Good ${timeOfDay}, ladies and gentelmen. My name is ${
        this.name
      }. I am ${this.age()} years old and have been working as a ${
        this.job
      } for more than ${this.exp()} years.`;
    } else if (style === "casual") {
      return `What's up guys? My name is ${
        this.name
      }. I am ${this.age()} years old and have been working as a ${
        this.job
      } for more than ${this.exp()} years. Have a nice ${timeOfDay}!`;
    }
  },
};

let emily = {
  name: "Emily",
  job: "singer and songwriter",
  birthYear: 1998,
  age: slav.age,
  workStart: 12,
  exp: slav.exp,
  // greeting: slav.greeting,
};

slav.greeting("casual", "evening");

slav.greeting.call(emily, "formal", "morning");

const slavFriendly = slav.greeting.bind(slav, "casual");
const emilyFormal = slav.greeting.bind(emily, "formal");
/* console.log(slavFriendly("evening"));
console.log(emilyFormal("morning")); 

const years = [1990, 1967, 2000, 2006, 1982, 2010, 1998, 2002];
const arrCalc = (arr, fn) => arr.map((item) => fn(item));
const ageCalc = (el) => new Date().getFullYear() - el;
const isFullAge = (limit, age) => age >= limit;
/* let ages = arrCalc(years, ageCalc);
console.log(ages);

let fullAgeJapan = arrCalc(ages, isFullAge.bind(this, 20));
console.log(fullAgeJapan);
let fullAgeUsa = arrCalc(ages, isFullAge.bind(this, 18));
console.log(fullAgeUsa); */

//Quiz Game

(function () {
  //function constructor
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  //Questions
  const q1 = new Question(
    "Is JavaScript is the most popular language?",
    ["no", "yes"],
    1
  );
  const q2 = new Question(
    "Who is your daddy?",
    ["I am your daddy", "You are my daddy", "I have several daddies"],
    0
  );
  const q3 = new Question(
    "Who is the teacher of this course?",
    ["Bess", "Mess", "Kiss", "Jonas"],
    3
  );
  const q4 = new Question(
    "In which country you date the most beautiful girls?",
    ["USA", "China", "Russia"],
    1
  );

  const questions = [q1, q2, q3, q4];
  let userScore = 0;

  // Initial setup
  Question.prototype.displayQuestion = function () {
    console.log(`=================\n${this.question}`);
    let count = 0;
    this.answers.map((answer) => console.log(`${count++}: ${answer}`));
  };

  Question.prototype.checkAnswer = function (ans, callback) {
    const rightAnswer = this.correct;
    let sc;

    if (Number(ans) === rightAnswer) {
      // userScore++;
      sc = callback(true);
      console.log(
        `-----------\nThe right answer is number ${rightAnswer}. Your answer is correct`
      );
    } else {
      sc = callback(false);
      console.log(
        `-----------\nHmm. The right answer is number ${rightAnswer}. Try again`
      );
    }

    this.displayScore(sc);
  };

  Question.prototype.displayScore = function (score) {
    console.log(`Your score is: ${score}`);
  };

  const score = function () {
    let sc = 0;
    return function (correct) {
      if (correct) {
        sc++;
      }
      return sc;
    };
  };

  const keepScore = score();

  const mainGameFunction = () => {
    let n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    let userAnswer = prompt("enter the correct answer number");

    if (userAnswer !== "exit") {
      questions[n].checkAnswer(userAnswer, keepScore);
      mainGameFunction();
    } else {
      exitGame();
      questions[n].displayScore(keepScore());
    }
  };

  function exitGame() {
    console.log(`-----------\nyou leaved the game`);
  }

  mainGameFunction();
})();
