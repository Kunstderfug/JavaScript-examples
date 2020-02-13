const companies = [
  { name: 'Company One', category: 'Finance', start: 1981, end: 2004 },
  { name: 'Company Two', category: 'Retail', start: 1992, end: 2008 },
  { name: 'Company Three', category: 'Auto', start: 1999, end: 2007 },
  { name: 'Company Four', category: 'Retail', start: 1989, end: 2010 },
  { name: 'Company Five', category: 'Technology', start: 2009, end: 2014 },
  { name: 'Company Six', category: 'Finance', start: 1987, end: 2010 },
  { name: 'Company Seven', category: 'Auto', start: 1986, end: 1996 },
  { name: 'Company Eight', category: 'Technology', start: 2011, end: 2016 },
  { name: 'Company Nine', category: 'Retail', start: 1981, end: 1989 }
];

const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

// const companyName = companies.map(company => company.name + company.category);

const companyNames = companies.map(
  company =>
    `The ${company.name} was created in ${company.start} and lasted till ${company.end}`
);

console.log(companyNames);
// for (const company of companies) {
//   console.log(company.name, company.start + '-' + company.end);
// }

// const coSorted = companies.map(item => item.category);
// console.log(coSorted);

// for (let i = 0; i < companies.length; i++) {
//   console.log(companies[i]);
// }

// forEach

// companies.forEach(function(company) {
//   console.log(company.name + company.start);
// });

// filter

// Get 21 and older

// let candrink = [];
// for (let i = 0; i < ages.length; i++) {
//   if (ages[i] >= 21) {
//     candrink.push(ages[i]);
//   }
// }

// const canDrink = ages.filter(function(ages) {
//   if (ages >= 21) {
//     return true;
//   }
// });

// const canDrink = ages.filter(ages => ages >= 21);

// console.log(canDrink);

// Filter retail companies

// const retailCompanies = companies.filter(function(company) {
//   if(company.category === 'Retail') {
//     return true;
//   }
// });

// const retailCo = companies.filter(company => company.category === "Retail");
// console.log(retailCo);

// Get 80s companies

// const oldCo = companies.filter(
//   company => company.start >= 1980 && company.start < 1990
// );
// console.log(oldCo);

// Get companies that lasted 10 years or more

// const bigCo = companies.filter(company => company.end - company.start >= 10);
// console.log(bigCo);

// map

// Create array of company names

// const coNames = companies.map(function(company) {
//   return `${company.name}, [${company.start} - ${company.end}]`;
// });

// const coNames = companies.map(
//   company => `${company.name}, ${company.start} - ${company.end}`
// );

// console.log(coNames);

// const ageMap = ages
//   .map(age => Math.sqrt(age))
//   .map(age => age * 2);

// sort

// Sort companies by start year
// const coYears = companies.sort((a, b) => (a.start > b.start ? 1 : -1));
// const longCo = companies.sort((a, b) =>
//   a.end - a.start > b.end - b.start ? 1 : -1
// );

// console.log(longCo);

// reduce

// const agesSum = ages.reduce((total, age) => total + age, 0);

// console.log(agesSum);

// // Get total years for all companies
// const totalYears = companies.reduce(
//   (total, years) => total + (years.end - years.start),
//   0
// );

// console.log(totalYears);

// const totalYears = companies.reduce(
//   (total, company) => total + (company.end - company.start),
//   0
// );

// Combine Methods

// const combined = ages
//   .map(age => age * 2)
//   .filter(age => age >= 40)
//   .sort((a, b) => a - b)
//   .reduce((a, b) => a + b, 0);

// console.log(combined);
