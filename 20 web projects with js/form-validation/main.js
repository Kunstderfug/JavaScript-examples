const form = document.getElementById('form')
const userName = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


//Show input error message
const showError = ((input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
})

//Show success
const showSuccess = (input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
})

const checkEmail = (input => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(input.value.trim())) {
        showError(input, `Email is not valid`)
    } else {
        showSuccess(input)
    }
    // return ;
})

const getFieldName = (input => input.id.charAt(0).toUpperCase() + input.id.slice(1))

// Check required
const checkRequired = (inputArr => {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
})

// Check Length of the username and a password
const checkLength = ((input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} char`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be at less than ${max} char`)
    } else {
        showSuccess(input)
    }
})

//Function for validating numbers and symbols in password
const checkSymNum = ((str, input) => {
    let obj = {
        'true': 0,
        'false': 0
    }
    const passArr = input.value.split('')

    passArr.forEach(el => {
        str.includes(el) ? obj.true++ : obj.false++
    })

    obj.true > 0 ? showSuccess(input) : showError(input, 'Use !@#$%^&*()_+')
})

//Check if password contain numbers and special symbol
const checkPassword = (input => {
    const string = '1234567890!@#$%^&*()_+'
    checkSymNum(string, input)
})

//Check passwords match
const checkPasswordMatch = ((input1, input2) => {
    if (input1.value === input2.value) {
        showSuccess(input2)
    } else {
        showError(input2, 'Passwords don\'t match')
    }
})

//Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault()

    checkRequired([userName, email, password, password2])
    checkLength(userName, 3, 15)
    checkLength(password, 6, 25)
    checkEmail(email)
    checkPassword(password)
    checkPasswordMatch(password, password2)
})