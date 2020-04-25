const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
const clearSeats = document.getElementById('clearseats')

let ticketPrice = +movieSelect.value

//Update total count
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length

    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))

    count.textContent = selectedSeatsCount
    total.textContent = selectedSeatsCount * ticketPrice
}

//Save movie data into local storage
const setMovieData = (index, price) => {
    localStorage.setItem('movieIndex', index)
    localStorage.setItem('ticketPrice', price)
}

const init = () => {
    //Get all the data from the localStorage
    const getMovieData = localStorage.getItem('movieIndex')
    const getSeatsSelected = JSON.parse(localStorage.getItem('selectedSeats'))
    const getTicketPrice = localStorage.getItem('ticketPrice')
    //Check if there is any data in the seats selected array
    if (getSeatsSelected !== null && getSeatsSelected.length !== 0) {
        //if yes, we add the class .selected to the each seat in the DOM with the indexes of the seats Array
        getSeatsSelected.forEach(i => seats[i].classList.add('selected'))
    }
    //settings up the rest of the UI (checking first if the localStorage data is saved)
    if (getMovieData !== null && getTicketPrice !== null) {
        movieSelect.selectedIndex = getMovieData
        ticketPrice = getTicketPrice
        // count.textContent = getSeatsSelected.length
        // total.textContent = getSeatsSelected.length * ticketPrice
    }
}

//Clearing seats selection
clearSeats.addEventListener('click', () => {
    seats.forEach(seat => seat.classList.remove('selected'))
    updateSelectedCount()
})

//Movie selector
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, ticketPrice);
    updateSelectedCount()

})

//Seat selector
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})

init()
updateSelectedCount()