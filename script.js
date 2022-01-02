const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLS();
calculateTotal();

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', (e) => {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    let selectedSeatArry = [];
    let seatArry = [];

    selectedSeats.forEach((seat) => {
        selectedSeatArry.push(seat);
    });

    seats.forEach((seat) => {
        seatArry.push(seat);
    });

    let selectedSeatsIndex = selectedSeatArry.map((seat) => {
        return seatArry.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    // save to LS
    saveToLS(selectedSeatsIndex);
}

function saveToLS(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}

// get from LS

function getFromLS() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}