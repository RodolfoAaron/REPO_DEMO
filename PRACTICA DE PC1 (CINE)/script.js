// --- 1. DATOS DE LAS PELÍCULAS ---
const moviesData = [
    {
        id: "mario-bros-2",
        title: "SUPER MARIO BROS 2",
        duration: "1 hr 45 min",
        rating: "APT",
        price: 22,
        room: "01", // Sala asignada
        poster: "https://upload.wikimedia.org/wikipedia/en/4/44/The_Super_Mario_Bros._Movie_poster.jpg", 
        description: "Mario y Luigi regresan en una nueva aventura épica a través del Reino Champiñón para enfrentar una amenaza estelar.",
        times: ["03:30 PM", "05:45 PM", "08:00 PM"],
        availableDates: ["15 sep", "16 sep", "17 sep"]
    },
    {
        id: "john-wick-4",
        title: "JOHN WICK 4",
        duration: "2 hrs 49 min",
        rating: "+18",
        price: 26,
        room: "04", // Sala asignada
        poster: "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
        description: "John Wick descubre un camino para derrotar a la Alta Mesa, pero antes de ganar su libertad, debe enfrentarse a un nuevo enemigo con alianzas globales.",
        times: ["04:15 PM", "07:30 PM", "10:20 PM"],
        availableDates: ["15 sep", "17 sep", "18 sep"]
    },
    {
        id: "avatar-3",
        title: "AVATAR: FUEGO Y CENIZA",
        duration: "3 hrs 10 min",
        rating: "+14",
        price: 30,
        room: "IMAX", // Sala asignada
        poster: "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg",
        description: "Jake Sully y Neytiri descubren una agresiva tribu Na'vi de ceniza, desatando un nuevo conflicto en los rincones de Pandora.",
        times: ["02:00 PM", "06:15 PM", "09:40 PM"],
        availableDates: ["15 sep", "16 sep", "18 sep"]
    },
    {
        id: "deadpool-wolverine",
        title: "DEADPOOL & WOLVERINE",
        duration: "2 hrs 07 min",
        rating: "+18",
        price: 25,
        room: "02", // Sala asignada
        poster: "https://upload.wikimedia.org/wikipedia/en/4/4c/Deadpool_%26_Wolverine_poster.jpg",
        description: "Wade Wilson se une a un Logan muy reacio en una misión que cambiará el multiverso para siempre.",
        times: ["05:00 PM", "08:15 PM", "10:45 PM"],
        availableDates: ["16 sep", "17 sep", "18 sep"] 
    },
    {
        id: "intensamente-2",
        title: "INTENSAMENTE 2",
        duration: "1 hr 36 min",
        rating: "APT",
        price: 20,
        room: "03", // Sala asignada
        poster: "https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg",
        description: "Riley entra en la adolescencia y el cuartel general sufre una demolición para dar paso a nuevas y complejas emociones.",
        times: ["03:00 PM", "05:20 PM"],
        availableDates: ["15 sep", "16 sep", "17 sep", "18 sep"]
    }
];

// --- VARIABLES GLOBALES ---
let currentMovie = null;
let currentTime = null;
let selectedDateId = "15 sep"; 
let selectedDateText = "Hoy 15 septiembre"; 
let timerInterval;

// Capturamos elementos
const viewMovies = document.getElementById('view-movies');
const viewSeats = document.getElementById('view-seats');
const movieListContainer = document.getElementById('movie-list');
const datesCarousel = document.getElementById('dates-carousel');
const seatGrid = document.getElementById('seat-grid');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const totalPriceEl = document.getElementById('total-price');

// --- 2. GENERAR FECHAS DINÁMICAS E INTERACTIVAS ---
function renderDates() {
    const dates = [
        { label: "Hoy", day: "15", month: "septiembre", id: "15 sep" },
        { label: "Mañana", day: "16", month: "septiembre", id: "16 sep" },
        { label: "Jueves", day: "17", month: "septiembre", id: "17 sep" },
        { label: "Viernes", day: "18", month: "septiembre", id: "18 sep" }
    ];

    datesCarousel.innerHTML = ''; 

    dates.forEach((dateObj, index) => {
        const dateBox = document.createElement('div');
        dateBox.classList.add('date-box');
        if (index === 0) dateBox.classList.add('active'); 

        dateBox.innerHTML = `<div>${dateObj.label}</div><div>${dateObj.day}</div><div>${dateObj.month}</div>`;
        
        dateBox.addEventListener('click', () => {
            document.querySelectorAll('.date-box').forEach(box => box.classList.remove('active'));
            dateBox.classList.add('active');
            
            selectedDateId = dateObj.id;
            selectedDateText = `${dateObj.label} ${dateObj.day} ${dateObj.month}`;
            
            renderMovies();
        });

        datesCarousel.appendChild(dateBox);
    });
}

// --- 3. RENDERIZAR CARTELERA ---
function renderMovies() {
    movieListContainer.innerHTML = ''; 
    
    const moviesForToday = moviesData.filter(movie => movie.availableDates.includes(selectedDateId));

    if(moviesForToday.length === 0) {
        movieListContainer.innerHTML = '<h2 style="text-align:center; padding:40px; color:#aaa;">No hay funciones programadas para este día.</h2>';
        return;
    }

    moviesForToday.forEach(movie => {
        let timesHTML = '';
        movie.times.forEach(time => {
            timesHTML += `<button class="btn-time" onclick="openSeatSelection('${movie.id}', '${time}')">${time}</button>`;
        });

        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-item');
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/160x240/333/fff?text=Poster'">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p class="meta">${movie.duration} | ${movie.rating} | Sala: ${movie.room}</p>
                <p class="desc">${movie.description}</p>
                <div class="times-container">
                    ${timesHTML}
                </div>
            </div>
        `;
        movieListContainer.appendChild(movieCard);
    });
}

// --- 4. ABRIR SELECCIÓN DE ASIENTOS ---
function openSeatSelection(movieId, time) {
    currentMovie = moviesData.find(m => m.id === movieId);
    currentTime = time;

    document.getElementById('detail-poster').src = currentMovie.poster;
    document.getElementById('detail-title').innerText = currentMovie.title;
    document.getElementById('detail-info').innerText = `${currentMovie.duration} | ${currentMovie.rating}`;
    document.getElementById('detail-time').innerText = time;
    document.getElementById('detail-date').innerText = selectedDateText; 
    document.getElementById('detail-room').innerText = currentMovie.room; // Cambia la sala en el ticket
    
    viewMovies.classList.add('hidden');
    viewSeats.classList.remove('hidden');

    generateSeats();
    startTimer(5 * 60);
    updateTotal();
}

// --- 5. GENERAR MAPA DE ASIENTOS ---
function generateSeats() {
    seatGrid.innerHTML = ''; 
    
    const storageKey = `reserva_${currentMovie.id}_${selectedDateId}_${currentTime}`;
    const occupiedSeats = JSON.parse(localStorage.getItem(storageKey)) || [];

    for (let r = 0; r < 10; r++) {
        const row = document.createElement('div');
        row.classList.add('seat-row');
        
        for (let c = 0; c < 16; c++) {
            const seat = document.createElement('div');
            seat.classList.add('seat-circle');
            
            const seatId = `${r}-${c}`;
            seat.dataset.id = seatId;

            if (occupiedSeats.includes(seatId)) {
                seat.classList.add('occupied');
            }

            seat.addEventListener('click', () => {
                if (!seat.classList.contains('occupied')) {
                    seat.classList.toggle('selected');
                    updateTotal();
                }
            });

            row.appendChild(seat);
        }
        seatGrid.appendChild(row);
    }
}

// --- 6. ACTUALIZAR PRECIO TOTAL Y DESCUENTO ---
function updateTotal() {
    const selectedSeatsCount = document.querySelectorAll('.seat-grid .selected').length;
    const subtotal = selectedSeatsCount * currentMovie.price;
    const discount = subtotal * 0.10; // 10% discount
    const finalTotal = subtotal - discount;

    subtotalEl.innerText = subtotal.toFixed(2);
    discountEl.innerText = discount.toFixed(2);
    totalPriceEl.innerText = finalTotal.toFixed(2);
}

// --- 7. TEMPORIZADOR ---
function startTimer(duration) {
    clearInterval(timerInterval);
    let timer = duration;
    const countdownEl = document.getElementById('countdown');
    
    timerInterval = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        countdownEl.textContent = minutes + ":" + seconds;
        
        if (--timer < 0) {
            clearInterval(timerInterval);
            alert("Tu tiempo de reserva ha expirado.");
            goBack();
        }
    }, 1000);
}

// --- 8. CONFIRMAR RESERVA ---
document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const selectedSeats = document.querySelectorAll('.seat-grid .selected');
    if (selectedSeats.length === 0) {
        alert("Debes seleccionar al menos un asiento.");
        return;
    }

    const buyerName = document.getElementById('buyer-name').value;
    const storageKey = `reserva_${currentMovie.id}_${selectedDateId}_${currentTime}`;
    
    let occupiedSeats = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    selectedSeats.forEach(seat => {
        occupiedSeats.push(seat.dataset.id);
    });

    localStorage.setItem(storageKey, JSON.stringify(occupiedSeats));

    const finalTotal = totalPriceEl.innerText;

    alert(`¡Reserva Exitosa, ${buyerName}!\nPelícula: ${currentMovie.title}\nSala: ${currentMovie.room}\nFecha: ${selectedDateText}\nHora: ${currentTime}\nEntradas: ${selectedSeats.length}\nTotal pagado: S/ ${finalTotal}`);
    
    document.getElementById('buyer-name').value = '';
    goBack(); 
});

// --- 9. BOTÓN ATRÁS ---
function goBack() {
    clearInterval(timerInterval);
    viewSeats.classList.add('hidden');
    viewMovies.classList.remove('hidden');
}
document.getElementById('btn-back').addEventListener('click', goBack);

// Iniciar aplicación
renderDates();
renderMovies();
