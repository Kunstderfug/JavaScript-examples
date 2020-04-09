const budgetController = (function () {
  //Expenses function constructor with 3 arguments
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

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
      if (type === "exp") {
        item = new Expense(ID, desc, val);
      } else if (type === "inc") {
        item = new Income(ID, desc, val);
      }

      //Add the Expense or Income object into the array in the data structure
      dataItems.push(item);
      //returns the new element
      return item;
    },
    //Function calculates the budget
    calculateBudget: function () {
      //1. Calculate totals for income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      //2. Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //3. Calculate the percentage of what we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
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
      console.log(data);
    },
  };
})();

const UIController = (function () {
  //Declaring all the DOM elements we need in case we would want to change something in the HTML
  const DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
  };

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

    addListItem: function (obj, type) {
      let html, newHtml, element;

      //Create th html strings with placeholders
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //which will be replaced with the actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //Insert the element into the DOM
      document.querySelector(element).insertAdjacentHTML("afterbegin", newHtml);
    },

    //Display the budget values in the upper section
    displayBudget: function (obj) {
      let sign = "";
      if (obj.budget > 0) {
        sign = "+";
      } else {
        sign = "";
      }

      document.querySelector(
        DOMstrings.budgetLabel
      ).textContent = `${sign}${obj.budget}`;

      document.querySelector(
        DOMstrings.incomeLabel
      ).textContent = `${sign} ${obj.totalInc}`;

      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = `- ${obj.totalExp}`;

      if (obj.percentage > 0) {
        document.querySelector(
          DOMstrings.percentageLabel
        ).textContent = `${obj.percentage}%`;
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "--";
      }
    },

    //Clear fileds function
    clearFields: function () {
      let fields;

      //Select all fields which should be cleared
      fields = document.querySelectorAll(
        `${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`
      );

      //making an array from the list of fields and clearing
      fields.forEach((current) => {
        current.value = "";
      });
      document.querySelector(DOMstrings.inputType).focus();
    },

    // Exporting the DOM strings to make them accessable outside of this UIController
    getDOMstrings: function () {
      return DOMstrings;
    },
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
    addItemButton.addEventListener("click", ctrlAddItem);

    //the main function runs also when the user presses Enter (keyCode 13)
    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
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

  // Function which will take the input data from the UI and stores it into variable 'input'
  const ctrlAddItem = function () {
    let input, newItem;

    //1. Getting the field input data from the UICtrl
    input = UICtrl.getInput();

    if (input.description !== "" && input.value !== NaN && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      budgetController.testing(); //logging the data ogject into console

      //3. Add th item to the UI
      UICtrl.addListItem(newItem, input.type);

      //4. Clear the fields
      UICtrl.clearFields();

      //5. Update the budget
      updateBudget();
    }
  };

  return {
    init: function () {
      setupEventListeners();
      console.log("App has started");
    },
  };
})(budgetController, UIController);

AppController.init();
