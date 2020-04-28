const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const double = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const sort = document.getElementById('sort')
const totalText = document.getElementById('total')
const people = document.getElementById('people')

let data = []

//Generate id
const genID = () => Math.random().toString(36).slice(2)

//Format money
const formatMoney = (num) => num.toLocaleString('en-En', {
    style: 'currency',
    currency: 'USD'
})

//Calculate total 
const calcTotal = () => {
    const total = data.reduce((acc, user) => (acc + user.money), 0)
    return total
}

//Update DOM
const updateDOM = (providedData = data) => {
    // main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`
    const total = calcTotal()
    totalText.innerHTML = `<strong>The Total wealth is:</strong>${formatMoney(total)}`
    people.innerHTML = ''

    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.setAttribute('id', item.id)
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
        people.appendChild(element)
    })
}

//Adds user to the data
const addData = (obj) => {
    data.push(obj)
    updateDOM()
}

// fetch random user and add money
const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api/')
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
        id: genID()
    }

    addData(newUser)
}

//Double the money
const doubleMoney = () => {
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        }
    })
    updateDOM()
}

//Sort by richest
const sortByRichest = () => {
    data = data.sort((a, b) => b.money - a.money)
    updateDOM()
}

//Filter millionaires
const filterMillionaires = () => {
    data = data.filter(person => person.money >= 1000000)
    updateDOM()
}

//Delete user
const delUser = (e) => {
    const el = e.target.closest('.person')
    if (data.length && el.id !== null) {
        const index = data.findIndex(user => user.id === el.id)
        data.splice(index, 1)
        people.removeChild(el)

        updateDOM()
    }
}

//Event listeners
addUser.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
sort.addEventListener('click', sortByRichest)
showMillionaires.addEventListener('click', filterMillionaires)
people.addEventListener('click', delUser)

calcTotal()