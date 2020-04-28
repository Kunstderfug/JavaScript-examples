const currencyEl_one = document.getElementById('currency-one')
const amountEl_one = document.getElementById('amount-one')
const currencyEl_two = document.getElementById('currency-two')
const amountEl_two = document.getElementById('amount-two')

const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

//fetch exchange rates and updates the UI
const calculate = () => {
    const currency_one = currencyEl_one.value
    const currency_two = currencyEl_two.value

    fetch(`http://data.fixer.io/api/latest?access_key=7c6965b0c79e0dffa6703fa1d5f4da19`)
        .then(res => res.json())
        .then(data => {
            // const rate = data.rates[currency_two]
            const rate = data.rates[currency_two] / data.rates[currency_one]
            rateEl.innerText = `1 ${currency_one} is ${rate.toFixed(5)} ${currency_two}`

            if (amountEl_one.value < 1) { //making sure the amount is at least 1
                amountEl_one.value = 1
            } else {
                amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
            }
        })
}

const swapCurrency = () => {
    const temp = currencyEl_one.value
    currencyEl_one.value = currencyEl_two.value
    currencyEl_two.value = temp

    calculate()
}

//Event listeners
currencyEl_one.addEventListener('change', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
amountEl_two.addEventListener('input', calculate)
swap.addEventListener('click', swapCurrency)

calculate()