// // Function constractor

// const Person = function(name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// };

// Person.prototype.calculateAge = function() {
//   console.log(2020 - this.yearOfBirth);
// };

// let john = new Person("John", 1990, "teacher");
// let mark = new Person("Mark", 1957, "retired");
// let jane = new Person("Jane", 1998, "prostitute");

// john.calculateAge();
// mark.calculateAge();
// jane.calculateAge();

//Primitives & objects

// Passing functions as arguments
/*
let years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  let arrRes = [];
  arr.forEach(element => {
    arrRes.push(fn(element));
  });
  return arrRes;
}

function calcAge(el) {
  let currentDate = new Date().getFullYear();
  return currentDate - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHRate(el) {
  return Math.round(206.9 - 0.67 * el);
}

let ages = arrayCalc(years, calcAge);
let fullAges = arrayCalc(ages, isFullAge);
let maxHeartRate = arrayCalc(ages, maxHRate);
*/

// CLOSURES
/*
function retirement(retAge) {
  let a = " years left until retirement";
  let currentYear = new Date().getFullYear();
  return function(birthYear) {
    let age = currentYear - birthYear;
    console.log(retAge - age + a);
  };
}

let retUS = retirement(66);
retirement(60)(1982);

function intQ(job) {
  const desQ = ", can you please explain what UX design is?";
  const teaQ = "What subject do you teach, ";
  const musQ = ", what music do you like?";
  const defQ = ", what do you do?";

  return function(name) {
    if (job === "designer") {
      console.log(name + desQ);
    } else if (job === "teacher") {
      console.log(name + teaQ + "?");
    } else if (job === "musician") {
      console.log(name + musQ);
    } else {
      console.log("hello " + name + defQ);
    }
  };
}

intQ("designer")("John");
intQ("musician")("Slav");
*/

//BIND, CALL & APPLY
let years = [1995, 1965, 1937, 2005, 2003];

function arrayCalc(arr, fn) {
  let arrRes = [];
  arr.forEach(el => {
    arrRes.push(fn(el));
  });
  return arrRes;
}

function calcAge(el) {
  let currentDate = new Date().getFullYear();
  return currentDate - el;
}

function isFullAge(limit, el) {
  return el >= limit;
}

function maxHRate(el) {
  return Math.round(206.9 - 0.67 * el);
}

// let ages = arrayCalc(years, calcAge);
// console.log("TCL: ages", ages);

// let fullAgeJapan = arrayCalc(ages, isFullAge.bind(this, 20));
// console.log("TCL: fullAgeJapan", fullAgeJapan);

let a = [1, 2, 2, 5, 5, 6, 1, 7, 5, 1];
let len = a.length;

//for loop
/*
for (let i = 0; i < len; i++) {
  if (b.indexOf(a[i]) === -1) {
    b.push(a[i]);
  }
}
*/

//sort
/*
a.sort();
for (let i = 0; i < len; i++) {
  let sameNum = i - 1;
  if (a[i] !== a[i + 1]) {
    b.push(a[i]);
  }
}


//SET
b = [...new Set(a)];

console.log("TCL: myNewArr", b);
*/
// Day starts at 7, ends at 19
// You have to find free minimum of 30 minutes windows for a meeting with the second person

let busy1 = [
  [7.0, 9.2],
  [11.1, 12.3],
  [16.4, 17.5]
];
let busy2 = [
  [8.5, 10.3],
  [11.0, 13.2],
  [14.3, 16.1],
  [18.0, 19.0]
];

//1. Find who starts the day earlier
// If start1 is less or equal than start2 - main person is 1, else - 2.
//if 7.0 <= 8.5 = true, main person is 1

//2. Find the end time and start for the each person.
//If there 30 or more minutes difference between end and start times - add the time to the array of possible timeslots.
//free1 [9.2 - 11.1, 12.3 - 16.4, 17.5 - 19.0]
//free2 [10.3 - 11.0, 13.2 - 14.3, 16.1 - 18.0] //not useful data

// Function to calculate the difference
// (starttime1 - endtime2 - 0.4) * 100 (11.1 - 10.3 = 0.8 - 0.4 = 0.4 * 100 = 40)
// (16.4 - 16.1)
//3. Find the end time for the second person.
// endTime2 [10.3, 13.2, 16.1; 19.0]

//4. If the end time is at least 30 minutes less than the next start time of the first person, add this time slot to the array of available time.
