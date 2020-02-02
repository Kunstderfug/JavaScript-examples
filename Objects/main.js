// const person = {
//   name: ["Vyacheslav", " Gryaznov"],
//   age: 38,
//   gender: "male",
//   interests: ["music", " skiing", " computer science", " and traveling."],
//   bio: function() {
//     alert(
//       this.name[0] +
//         " " +
//         this.name[1] +
//         " is " +
//         this.age +
//         " years old. He likes " +
//         this.interests +
//         "."
//     );
//   },
//   greeting: function() {
//     alert("Hi! I'm " + this.name[0] + ".");
//   }
// };

// let myDataName = "height";
// let myDataValue = "5.9f";
// person[myDataName] = myDataValue;

// let badHabitsName = "habits";
// let badHabitsValue = "staying awake till the morning";
// person[badHabitsName] = badHabitsValue;

// const button = document.querySelector("button");
// const message = document.querySelector("div");

// const createMessage = () => {
//   message.textContent =
//     person.name +
//     " is " +
//     person.age +
//     " years old and he is interested in " +
//     person.interests;
// };

// button.onclick = function() {
//   createMessage();
//   console.log("you clicked");
// };

function Person(first, last, age, gender, interests) {
  this.name = {
    first: first + " ",
    last: last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;

  this.bio = function() {
    let firstInterest = interests[0] + ",";
    let lastInterest = " and " + interests[interests.length - 1] + ".";
    // let middleInterests = interests
    //   .splice(1, interests.length - 2)
    //   .map(interest => " " + interest);

    if (gender === "male") {
      this.gender = "he";
    } else {
      this.gender = "she";
    }

    if (interests.length <= 1) {
      this.interests = interests[0] + ".";
    } else if (interests.length === 2) {
      firstInterest = interests[0];
      this.interests = firstInterest + lastInterest;
    } else if (interests.length > 2) {
      this.interests =
        interests[0] +
        "," +
        interests
          .splice(1, interests.length - 2)
          .map(interest => " " + interest) +
        lastInterest;
    }

    alert(
      this.name.first +
        this.name.last +
        " is " +
        this.age +
        " years old and " +
        this.gender +
        " likes " +
        this.interests
    );
  };
  this.greeting = function() {
    alert("hi, I'm " + this.name + ".");
  };
}

let slav = new Person("Slav", "Gryaznov", 38, "male", [
  "music",
  "sport",
  "skiing",
  "computer science",
  "photo",
  "sex"
]);
let angie = new Person("Angie", "Kawanishi", 21, "female", [
  "computer science",
  "music"
]);
let alex = new Person("Alex", "Gryaznov", 13, "male", [
  "basketball",
  "games",
  "composing on online sequencer"
]);

//Coding challenge 5

let bills = [124, 48, 268, 50, 180, 42];
let bills1 = [77, 375, 110, 45, 200, 67];

let tips = bills.map(tip => {
  if (tip < 50) {
    return tip * 0.2;
  } else if (tip >= 50 && tip < 200) {
    return tip * 0.15;
  } else {
    return tip * 0.1;
  }
});

let tips1 = bills1.map(tip => {
  if (tip < 100) {
    return tip * 0.2;
  } else if (tip >= 100 && tip < 300) {
    return tip * 0.1;
  } else {
    return tip * 0.25;
  }
});

let totalSum = bills.map((bill, index) => bill + tips[index]);
let totalSum1 = bills1.map((bill, index) => bill + tips[index]);

let total = totalSum.reduce((num, index) => num + index);
let total1 = totalSum1.reduce((num, index) => num + index);

let totalTips = Math.round(tips.reduce((num, index) => num + index));
let totalTips1 = Math.round(tips1.reduce((num, index) => num + index));

let averageTip = Math.round(totalTips / tips.length);
let averageTip1 = Math.round(totalTips1 / tips1.length);
console.log(totalTips, totalTips1);
console.log(averageTip, averageTip1);
if (totalTips < totalTips1) {
  console.log("John's family paid more tips");
} else if (totalTips === totalTips1) {
  console.log("Both families paid the same amount of tips");
} else {
  console.log("Mark's family paid more tips");
}
// let mark = {
//   name: "Mark",
//   height: 1.78,
//   mass: 60,
//   calcBMI: function() {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   }
// };

// let john = {
//   name: "John",
//   height: 1.78,
//   mass: 60,
//   calcBMI: function() {
//     this.bmi = this.mass / (this.height * this.height);
//     return this.bmi;
//   }
// };

// john.calcBMI();
// mark.calcBMI();

// if (john.bmi < mark.bmi) {
//   console.log(
//     "John's BMI is " +
//       john.bmi +
//       ", " +
//       "Mark's BMI is " +
//       mark.bmi +
//       ". " +
//       "Mark's BMI is higher."
//   );
// } else if (john.bmi === mark.bmi) {
//   console.log(
//     "John's BMI is " +
//       john.bmi +
//       ", " +
//       "Mark's BMI is " +
//       mark.bmi +
//       ". " +
//       "They have the same BMI"
//   );
// } else {
//   console.log(
//     "John's BMI is " +
//       john.bmi +
//       ", " +
//       "Mark's BMI is " +
//       mark.bmi +
//       ". " +
//       "John's BMI is higher."
//   );
// }

// let testArray = [1, 2, 3, 4, 5];

// for (let i = testArray.length - 1; i >= 0; i--) {
//   console.log(testArray[i]);
// }
