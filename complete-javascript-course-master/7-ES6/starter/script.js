// onclick:
//1. Get the color of the box by selected div class
//2. Create an adjacent HTML element inside of .boxes class with class of .box and the color of the selected div

let Box = function (id, color) {
    this.id = id;
    this.color = color;
}

let boxesArray = [];
const boxes = document.querySelector('.boxes');

const addBox = () => {
    let classArray, clName, element;

    let index = 0;
    //1. Get the color of the box by selected div class
    const getClass = (event => {
        //retrieve the class name on click
        classArray = event.target.className.split(' ');

        //split the class name and get the color
        clName = `${classArray[1]}`;

        element = `<div class="box ${clName}" id="${index}">${clName}</div>`;

        //2. Create an adjacent HTML element inside of .boxes class with class of .box and the color of the selected div
        if (clName.indexOf(undefined) === -1) {
            boxes.insertAdjacentHTML('beforeend', element);
            // boxesArray.push(new Box(index, clName));
            boxesArray = [...boxesArray, new Box(index, clName)]
            index++;
        }
        // console.log(boxesArray);
    })
    //listen to the click events inside the body
    document.querySelector('.buttons').addEventListener('click', getClass);
    boxes.addEventListener('click', delBox);
}

const delBox = (event) => {

    //get the id of the element
    let selectId = event.target.id;

    //1. Selecting element by id
    let element = document.getElementById(selectId);

    //2. array from ids in boxes array
    let index = boxesArray.map(cur => cur.id).indexOf(Number(selectId));

    // deleting the element
    boxes.removeChild(element);
    boxesArray.splice(index, 1);
}

addBox();

function spiral(x, y, start) {
    console.time()

    function createMatrix(x, y, start) {
        //create empty matrix
        let matrix = [];

        //1. Create an empty array with length of x
        let row = [];

        let startPoint = start;
        let endPoint = start + (x - 1);

        //2. create row
        function createRows(start, end, arr) {
            for (let i = start; i <= end; i++) {
                //2. Fill the array with numbers from start with x-1 length
                arr.push(i);
            }
            return arr;
        }

        //3. Push the arrays to the matrix
        for (i = 1; i <= y; i++) {
            row = createRows(startPoint, endPoint, row);
            matrix.push(row);
            row = []; //clear the row to push new numbers into it
            startPoint = startPoint + x;
            endPoint = endPoint + x;
        }
        return matrix;
    }
    const arr = createMatrix(x, y, start);
    const arrCopy = JSON.parse(JSON.stringify(arr));
    console.log(arrCopy);


    //main function
    let spiral = [];
    let n = arr.length - 1; //4
    let m = arr[0].length - 1; //5

    //---- BEGINNING OF THE LOOP ------//
    for (let count = n; count >= 0; count--) {
        //1. all items in m[1] and remove this row;
        if (m >= 0) {
            spiral = [...spiral, ...arr[0].map(num => num)]; //add to the spiral all numbers from the first row
            arr.splice(0, 1); //remove the row from the arr
            n = arr.length - 1; //3, update arr.length
        } else {
            return spiral
        }
        //--------------------------------
        //2. last numbers of the new arr arrays and remove them from the arr
        if (n >= 0) {
            spiral = [...spiral, ...arr.map(arr => arr[m])]; //add last numbers of the each row
            arr.forEach(last => last.splice(m)); //remove the last column from the arr
            m = arr[0].length - 1; //4, update arr[i].length
        } else {
            return spiral
        }
        //--------------------------------
        //3. Last row reversed, remove the last row
        if (m >= 0) {
            spiral = [...spiral, ...arr[n].map(num => num).reverse()]; //add the last row to the spiral, reversed
            arr.splice(n, 1); //delete the last row
            n = arr.length - 1; //2, update arr.length
        } else {
            return spiral
        }
        //--------------------------------
        //4. add the first numbers to the spiral
        if (n >= 0) {
            spiral = [...spiral, ...arr.map(arr => arr[0]).reverse()]; //add the first numbers
            arr.forEach(first => first.splice(0, 1)); //delete the first row
            m = arr[0].length - 1; //3, update arr[i].length
        } else {
            return spiral;
        }
    };
    console.timeLog()
    return spiral;
}

function spiral1(x, y, start) {
    console.time()

    function createMatrix(x, y, start) {
        //create empty matrix
        let matrix = [];

        //1. Create an empty array with length of x
        let row = [];

        let startPoint = start;
        let endPoint = start + (x - 1);

        //2. create row
        function createRows(start, end, arr) {
            for (let i = start; i <= end; i++) {
                //2. Fill the array with numbers from start with x-1 length
                arr.push(i);
            }
            return arr;
        }

        //3. Push the arrays to the matrix
        for (i = 1; i <= y; i++) {
            row = createRows(startPoint, endPoint, row);
            matrix.push(row);
            row = []; //clear the row to push new numbers into it
            startPoint = startPoint + x;
            endPoint = endPoint + x;
        }
        return matrix;
    }
    const matrix = createMatrix(x, y, start);
    const arrCopy = JSON.parse(JSON.stringify(matrix));
    console.log(arrCopy);

    let arr = [];

    //main function
    while (matrix.length) { //this is super beautiful
        arr.push(
            ...matrix.shift(),
            ...matrix.map(a => a.pop()),
            ...(matrix.pop() || []).reverse(),
            ...matrix.map(a => a.shift()).reverse()
        );
    }
    console.timeLog()
    return arr;
}


const quiz = new Map();

quiz.set('question', 'what is JS').set(1, 'Jerry Springer').set(2, 'Java Summer').set(3, 'Java Script').set('correct', 3).set(true, 'absolutely').set(false, 'not quite');


const answer = function (question) {
    const correct = question.get('correct');

    for ([key, value] of question.entries()) {
        if (typeof (key) === 'number') {
            console.log(`${key}: ${value}`);
        }
    }
    let userA = Number(prompt('type the number'));

    console.log(question.get(userA === correct));
}


//new Class method in ES6
class Person {
    constructor(name, yOfBirth, job) {
        this.name = name;
        this.yOfBirth = yOfBirth;
        this.job = job;
    }

    calcAge() {
        const age = new Date().getFullYear() - this.yOfBirth;
        return age;
    }
}

//extending the class
class Musician extends Person {
    constructor(name, yOfBirth, job, competitions, prizes, start) { //parameters that we want the class to inherit
        super(name, yOfBirth, job); ///we don't explicitly call them(this.parameter = parameter), we just use super(all the parameters)
        this.competitions = competitions; //add only new parameters and methods to the class
        this.prizes = prizes;
        this.age = this.calcAge();
        this.start = start;
        this.career = this.career();
    }

    wonPrize() {
        this.prizes++
    };


    career() {
        const career = new Date().getFullYear() - this.start;
        return career;
    }
}

let slav = new Musician('Slav', 1982, 'pianist & arranger', new Map().set(1997, 'Rubinstein Piano Competition').set(2001, 'Rachmaninoff Piano Competition, Italy').set(2007, 'Tbilisi International Piano Competition').set(2016, 'NYCA International Piano Competition'), 5, 2008);

let alex = new Musician('Alex', 2006, 'composer & arranger', new Map().set(2013, 'Family Duo Festival').set(2014, 'Bach Competition').set(2015, 'Artobolevskaya Piano Competition'), 3, 2016);

let People = [];
People.push(slav, alex);
// console.log(People);

const pass = (len) => Math.random().toString(36).slice(2).repeat(3).slice(0, len);

const pass1 = (len) => {
    const str1 = '1234567890+-=qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const str2 = '!?@#$%^&*_';
    let pass = '';
    len = len / 2;
    while (len > 0) {
        pass += str1[Math.floor(Math.random() * str1.length)] + str2[Math.floor(Math.random() * str2.length)];
        len--;
    }
    return pass;
}

class School {
    constructor(name, buildYear, departments) {
        this.name = name;
        this.buildYear = buildYear;
        this.departments = departments;
    }
    calcPeople(people) {
        people = this.departments;
        let arr = []
        for (let [key, value] of people) {
            arr.push(value);
        }
        return arr.reduce((cur, acc) => cur + acc);
    }

    calcDensity(people) {
        return Math.round(people / this.departments.size);
    }

}

//1. Class density
//2. Average age of the students
//3. How many departments are in University
//4. Number and models of pianos produced by piano factory
//5. Which model is leading
//6. Size clarification for all departments in the University: small, normal, big, huge. If unknown - normal

class University extends School {
    constructor(name, buildYear, departments) {
        super(name, buildYear, departments);
        this.students = this.calcPeople(this.students);
        this.density = this.calcDensity(this.students);
    }
}

class Pianofabric extends School {
    constructor(name, buildYear, pianos) {
        super(name, buildYear, pianos);
        this.workers = this.calcPeople(this.workers)
        this.density = this.calcDensity(this.workers);
        // this.workers = this.calcPeople(this.pianos);
    }
}

const yale = new University('Yale', 1701, new Map().set('Piano', 20).set('Strings', 125).set('Woodwinds', 38).set('Percussion', 10).set('Theory', 5));

const fabric = new Pianofabric('Zarya', 1921, new Map().set('Yamaha', 20).set('Kawai', 36).set('Steinway', 4).set('Moskva', 156).set('Zarya', 341))


function printDep(map, obj) {
    let name = () => obj.name === 'Yale' ? 'University' : 'Pianofabric';
    let people = () => obj.name === 'Yale' ? 'students' : 'workers';
    let department = () => obj.name === 'Yale' ? 'department' : 'piano line';
    console.log(`---${name()} Report---\n\nThe ${obj.name} ${name()} built in ${obj.buildYear}, has ${obj.departments.size} ${department()}s.`);

    for (let [key, value] of map) {
        console.log(`${key} ${department()} has ${value} ${people()}`);
    }
    console.log(`There are ${obj.calcPeople()} ${people()} with the average density of ${obj.density}\n--------------`);
}

printDep(yale.departments, yale);
printDep(fabric.departments, fabric);