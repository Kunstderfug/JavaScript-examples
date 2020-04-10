const budgetController = (function () {
  //Expenses function constructor with 3 arguments
  const Expense = function (id, description, value, percentage) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100)
    } else {
      this.percentage = -1;
    }
  }

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  }

  //Income function constructor with 3 arguments
  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach((cur) => (sum += cur.value));
    data.totals[type] = sum;
  };

  // Data with two objects: for all items and totals
  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  //Returning the object with public functions
  return {
    addItem: function (type, desc, val) {
      //var for simplicity. Sets the data.allItems[type]: 'exp' or 'inc' arrays of objects
      let dataItems = data.allItems[type];
      let item, ID;

      //Setting the ID to be the last ID + 1 in the data.allItems[type].id
      if (dataItems.length > 0) {
        ID = dataItems[dataItems.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Creates either Expense or Income object depending on 'exp' or 'inc' type
      if (type === 'exp') {
        item = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        item = new Income(ID, desc, val);
      }

      //Add the Expense or Income object into the array in the data structure
      dataItems.push(item);
      //returns the new element
      return item;
    },
    //Deletes the item from the data structure
    deleteItem: function (type, id) {
      let dataItems = data.allItems[type];
      //we need to know the index of the item in the exp or inc array
      let ids, index;

      ids = dataItems.map(current => current.id); //returns the array only with ids
      index = ids.indexOf(id);

      if (index !== -1) {
        dataItems.splice(index, 1);
      }
    },

    //Function calculates the budget
    calculateBudget: function () {

      //1. Calculate totals for income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      //2. Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //3. Calculate the percentage of what we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    //Calculate percentages for each item in the expenses list comparing to the budget
    calculatePercentages: function () {
      data.allItems.exp.forEach(cur => cur.calcPercentage(data.totals.inc));
    },

    //Get percentages
    getPercentages: function () {
      let allPercentages = data.allItems.exp.map(cur => cur.getPercentage());
      return allPercentages;
    },

    //Function returns the budget
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    testing: function () {
      // console.log(data);
    },
  };
})();

const UIController = (function () {
  //Declaring all the DOM elements we need in case we would want to change something in the HTML
  const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    itemPercentage: '.item__percentage',
    date: '.budget__title--month',
  };

  //display a date
  const formatDate = () => new Date().toDateString();

  //Formatting the numbers in the string
  const formatNumbers = (num, type) => {
    num = Intl.NumberFormat('en-US', { //formatting to international standard
      style: 'currency',
      currency: 'USD'
    }).format(num);

    // + or - sign
    return `${(type === 'inc' ? '+' : '-')} ${num}`;
  }

  const formatNegative = (num) => {
    num = Intl.NumberFormat('en-US', { //formatting to international standard
      style: 'currency',
      currency: 'USD'
    }).format(num);

    // + or - sign
    return num;
  }

  //returning the public object with functions
  return {
    // Getting the input data from the user and returning the public function so we can access it from the AppController
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // either 'inc' or 'exp' type
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: Number(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    //Getting the income or expense item and placing it into the inc / exp container in the UI
    addListItem: function (obj, type) {
      let html, newHtml, element;

      //Create th html strings with placeholders
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage"></div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //which will be replaced with the actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumbers(obj.value, type));

      //Insert the element into the DOM
      document.querySelector(element).insertAdjacentHTML('afterbegin', newHtml);
    },

    //Display the budget values in the upper section
    displayBudget: function (obj) {
      const budgetLabel = document.querySelector(DOMstrings.budgetLabel);
      const incomeLabel = document.querySelector(DOMstrings.incomeLabel);
      const expensesLabel = document.querySelector(DOMstrings.expensesLabel);
      const percentageLabel = document.querySelector(
        DOMstrings.percentageLabel
      );
      const itemPercentage = document.querySelector(DOMstrings.itemPercentage);

      const formatDate = () => new Date().toDateString();
      //display + sign if the budget is positive
      if (obj.budget >= 0) {
        budgetLabel.textContent = formatNumbers(obj.budget, 'inc');
      } else {
        budgetLabel.textContent = formatNegative(obj.budget);
      }
      //display nothing in the income if it is O and + if there is any
      if (obj.totalInc > 0) {
        incomeLabel.textContent = formatNumbers(obj.totalInc, 'inc');
      } else {
        incomeLabel.textContent = formatNegative(obj.totalInc);
      }
      //display nothing in the expenses if the it is O and - if there is any
      if (obj.totalExp > 0) {
        expensesLabel.textContent = formatNumbers(obj.totalExp, 'exp');
      } else {
        expensesLabel.textContent = formatNegative(obj.totalExp);
      }


      //display --- string if the percentage is -1, and if there is any - percentage sign
      if (obj.percentage > 0) {
        percentageLabel.textContent = `${obj.percentage}%`;
      } else {
        percentageLabel.textContent = '---';
      }
    },

    deleteListItem: function (selectorID) {
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    //Clear fields function
    clearFields: function () {
      let fields;

      //Select all fields which should be cleared
      fields = document.querySelectorAll(
        `${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`
      );

      //making an array from the list of fields and clearing
      fields.forEach((current) => {
        current.value = '';
      });
      document.querySelector(DOMstrings.inputType).focus();
    },

    displayPercentages: function (percentages) { //percentages is an array
      //1. Access to all item percentage fields in the DOM
      let fields = document.querySelectorAll(DOMstrings.itemPercentage);

      //2. Process all of them to add the value of the percentage
      Array.from(fields).forEach((current, index) => { //current is an array and index is the current index. For every item in fields reversed array we pass the function that adds textContent to it.
        if (percentages[index] > 0) {
          current.textContent = `${percentages[index]}%`;
        } else {
          current.textContent = '---';
        }
      })
    },

    // Exporting the DOM strings to make them accessable outside of this UIController
    getDOMstrings: function () {
      return DOMstrings;
    },
    //Exporting function
    getDate: function () {
      let date = formatDate();
      document.querySelector(DOMstrings.date).textContent = date;
    },

    //Changing the UI to reflect on whether Inc or Exp input is happening(green or red)
    changedType: function () {
      const fields = document.querySelectorAll(
        `${DOMstrings.inputType},${DOMstrings.inputDescription},${DOMstrings.inputValue}`
      )

      Array.from(fields).forEach(current => current.classList.toggle('red-focus'));
      document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    }
  };
})();

// Function that takes two parameters (BungetController, UIController)
const AppController = (function (budgetCtrl, UICtrl) {
  //Function for storing the event listeners
  const setupEventListeners = function () {
    // Getting the DOM strings from the UIController
    const DOM = UICtrl.getDOMstrings();
    //Set focus to the 'type' selector
    document.querySelector(DOM.inputType).focus();

    // Button which listens to click event and runs the function getInput from the UICtrl
    const addItemButton = document.querySelector(DOM.inputBtn);
    addItemButton.addEventListener('click', ctrlAddItem);

    const deleteItemButton = document.querySelector(DOM.container);
    deleteItemButton.addEventListener('click', ctrlDeleteItem);

    //the main function runs also when the user presses Enter (keyCode 13)
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
  };

  //Function to calculate and update budget
  const updateBudget = function () {
    //1. Calculate the budget
    budgetCtrl.calculateBudget();

    //2. Return the budget
    let budget = budgetCtrl.getBudget();
    console.log(budget);

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  //Calculate percentage for each item in the expenses list
  const updatePercentage = function () {
    //1. Calculate the budget percentages
    budgetCtrl.calculatePercentages();

    //2. Read them from the budget ctrl
    let percentages = budgetCtrl.getPercentages().reverse();

    //3. Update the UI
    UICtrl.displayPercentages(percentages);

  }

  // Function which will take the input data from the UI and stores it into variable 'input'
  const ctrlAddItem = function () {
    let input, newItem;

    //1. Getting the field input data from the UICtrl
    input = UICtrl.getInput();

    if (input.description !== '' && input.value !== NaN && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      budgetController.testing(); //logging the data object into console

      //3. Add th item to the UI
      UICtrl.addListItem(newItem, input.type);

      //4. Clear the fields
      UICtrl.clearFields();

      //5. Update the budget
      updateBudget();

      //6. Calculate and update percentages
      updatePercentage();
    }
  };

  //Function for deleting the item from the data, and updating UI and budget
  const ctrlDeleteItem = function (event) {
    let itemID, splitID, type, ID;
    //getting the id of the parent element by delegating method (going from the element which fired the event all the way to the div with actual ID information)
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(itemID);

    // if the id exists
    if (itemID) {
      splitID = itemID.split('-'); // we split the id 'inc-1' into an array with two items, inc and 1
      type = splitID[0]; //type will be inc or exp
      ID = Number(splitID[1]); //converting the string id to a number so the function in the budget ctrl can compare it to the (-1) to run.

      //1. Find and delete the item from the data object
      budgetCtrl.deleteItem(type, ID);

      //2. Delete the item from the UI
      UICtrl.deleteListItem(itemID);

      //3. Update the budget
      updateBudget();
      UICtrl.clearFields();

      //4. Calculate and update percentages
      updatePercentage();

    }
  };



  return {
    init: function () {
      setupEventListeners();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      UICtrl.getDate()
      console.log('App has started');
    },
  };
})(budgetController, UIController);

AppController.init();