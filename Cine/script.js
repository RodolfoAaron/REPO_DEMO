
const TICKET_PRICE = 18;
const MAX_SEATS = 6;

const movies = [
    {
        id: 1,
        title: "LOS JUEGOS DEL HAMBRE [2012]",
        duration: "2h 26m",
        rating: "M14",
        format: "2D · COMFORT",
        status: "Re-Estreno",
        image: "images/pelicula1.jpg",
        schedules: ["2:30 PM", "5:30 PM", "8:30 PM"]
    },
    {
        id: 2,
        title: "SPIDER-MAN: UN NUEVO DÍA",
        duration: "2h 30m",
        rating: "APT",
        format: "2D · D-BOX",
        status: "Estreno",
        image: "images/pelicula2.jpg",
        schedules: ["3:00 PM", "6:00 PM", "9:00 PM"]
    },
    {
        id: 3,
        title: "COYOTE VS ACME",
        duration: "1h 44m",
        rating: "APT",
        format: "2D · D-BOX · SALA XD",
        status: "Estreno",
        image: "images/pelicula3.jpg",
        schedules: ["2:00 PM", "4:30 PM", "7:00 PM"]
    },
    {
        id: 4,
        title: "NOCHE DEL DEMONIO: ESTÁN ENTRE NOSOTROS",
        duration: "1h 46m",
        rating: "M14",
        format: "2D · SALA XD · D-BOX",
        status: "Estreno",
        image: "images/pelicula4.jpg",
        schedules: ["3:30 PM", "6:30 PM", "9:00 PM"]
    },
    {
        id: 5,
        title: "LA ODISEA",
        duration: "2h 53m",
        rating: "M14",
        format: "2D · COMFORT · SALA XD · D-BOX",
        status: "Preventa",
        image: "images/pelicula5.jpg",
        schedules: ["2:00 PM", "5:30 PM", "9:00 PM"]
    }
];

let selectedMovie = null;
let selectedSchedule = "";
let selectedSeats = [];

const moviesGrid = document.getElementById("moviesGrid");
const noMovies = document.getElementById("noMovies");

const searchInput = document.getElementById("searchInput");
const ratingFilter = document.getElementById("ratingFilter");

const movieSelect = document.getElementById("movieSelect");
const scheduleSelect = document.getElementById("scheduleSelect");
const scheduleButtons = document.getElementById("scheduleButtons");

const seatMap = document.getElementById("seatMap");
const seatCounter = document.getElementById("seatCounter");

const summaryPoster = document.getElementById("summaryPoster");
const summaryMovie = document.getElementById("summaryMovie");
const summarySchedule = document.getElementById("summarySchedule");
const summarySeats = document.getElementById("summarySeats");
const summaryTickets = document.getElementById("summaryTickets");
const summaryTotal = document.getElementById("summaryTotal");

const customerName = document.getElementById("customerName");
const customerDni = document.getElementById("customerDni");
const customerEmail = document.getElementById("customerEmail");

const confirmButton = document.getElementById("confirmButton");
const formMessage = document.getElementById("formMessage");

const confirmationModal = document.getElementById("confirmationModal");
const closeModal = document.getElementById("closeModal");
const newReservationButton = document.getElementById("newReservationButton");

const historyButton = document.getElementById("historyButton");
const historySection = document.getElementById("historySection");
const reservationHistory = document.getElementById("reservationHistory");
const clearHistoryButton = document.getElementById("clearHistoryButton");


/* ==============================
   MOSTRAR CARTELERA
============================== */

function renderMovies(list = movies) {

    moviesGrid.innerHTML = "";

    if (list.length === 0) {
        noMovies.style.display = "block";
        return;
    }

    noMovies.style.display = "none";

    list.forEach(movie => {

        const card = document.createElement("article");
        card.className = "movie-card";

        const image = document.createElement("div");
        image.className = "movie-image";

        const poster = document.createElement("img");
        poster.src = movie.image;
        poster.alt = movie.title;

        image.appendChild(poster);

        const status = document.createElement("span");
        status.className = "movie-status";
        status.textContent = movie.status;

        image.appendChild(status);

        const info = document.createElement("div");
        info.className = "movie-info";

        const title = document.createElement("h3");
        title.textContent = movie.title;

        info.appendChild(title);

        const meta = document.createElement("div");
        meta.className = "movie-meta";

        const duration = document.createElement("span");
        duration.textContent = movie.duration;

        const rating = document.createElement("span");
        rating.textContent = movie.rating;

        meta.appendChild(duration);
        meta.appendChild(rating);

        info.appendChild(meta);

        const format = document.createElement("p");
        format.className = "movie-format";
        format.textContent = movie.format;

        info.appendChild(format);

        const reserve = document.createElement("button");
        reserve.className = "movie-button";
        reserve.type = "button";
        reserve.textContent = "RESERVAR";

        reserve.addEventListener("click", function () {
            selectMovie(movie.id);
        });

        info.appendChild(reserve);

        card.appendChild(image);
        card.appendChild(info);

        moviesGrid.appendChild(card);
    });
}


/* ==============================
   BUSCADOR
============================== */

function filterMovies() {

    const search = searchInput.value.toLowerCase().trim();
    const rating = ratingFilter.value;

    const filtered = movies.filter(movie => {

        const matchesName =
            movie.title.toLowerCase().includes(search);

        const matchesRating =
            rating === "all" || movie.rating === rating;

        return matchesName && matchesRating;
    });

    renderMovies(filtered);
}

if (searchInput) {
    searchInput.addEventListener("input", filterMovies);
}

if (ratingFilter) {
    ratingFilter.addEventListener("change", filterMovies);
}


/* ==============================
   SELECTOR DE PELÍCULAS
============================== */

function loadMovieSelect() {

    movieSelect.innerHTML = `
        <option value="">Selecciona una película</option>
    `;

    movies.forEach(movie => {

        const option = document.createElement("option");

        option.value = movie.id;
        option.textContent = movie.title;

        movieSelect.appendChild(option);
    });
}


/* ==============================
   SELECCIONAR PELÍCULA
============================== */

function selectMovie(movieId) {

    selectedMovie = movies.find(movie => movie.id === movieId);

    if (!selectedMovie) {
        return;
    }

    selectedSchedule = "";
    selectedSeats = [];

    movieSelect.value = selectedMovie.id;

    scheduleSelect.innerHTML = `
        <option value="">Selecciona un horario</option>
    `;

    scheduleButtons.innerHTML = "";

    selectedMovie.schedules.forEach(schedule => {

        const option = document.createElement("option");

        option.value = schedule;
        option.textContent = schedule;

        scheduleSelect.appendChild(option);

        const button = document.createElement("button");

        button.type = "button";
        button.className = "schedule-button";
        button.textContent = schedule;

        button.addEventListener("click", function () {

            scheduleSelect.value = schedule;
            selectSchedule(schedule);

        });

        scheduleButtons.appendChild(button);
    });

    scheduleSelect.disabled = false;

    updateSummary();
    clearMessage();

    const reservationSection = document.getElementById("reserva");

    if (reservationSection) {
        reservationSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ==============================
   CAMBIO DE PELÍCULA
============================== */

movieSelect.addEventListener("change", function () {

    const movieId = Number(this.value);

    if (!movieId) {

        selectedMovie = null;
        selectedSchedule = "";
        selectedSeats = [];

        scheduleSelect.disabled = true;
        scheduleButtons.innerHTML = "";

        createEmptySeats();
        updateSummary();

        return;
    }

    selectMovie(movieId);
});


/* ==============================
   SELECCIONAR HORARIO
============================== */

function selectSchedule(schedule) {

    selectedSchedule = schedule;
    selectedSeats = [];

    clearMessage();

    highlightSchedule(schedule);
    createSeats();
    updateSummary();
}

scheduleSelect.addEventListener("change", function () {

    if (!this.value) {

        selectedSchedule = "";
        selectedSeats = [];

        scheduleButtons.innerHTML = "";

        createEmptySeats();
        updateSummary();

        return;
    }

    selectSchedule(this.value);
});


/* ==============================
   RESALTAR HORARIO
============================== */

function highlightSchedule(schedule) {

    const buttons =
        document.querySelectorAll(".schedule-button");

    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.textContent === schedule
        );
    });
}


/* ==============================
   MAPA VACÍO
============================== */

function createEmptySeats() {

    seatMap.innerHTML = `
        <p class="empty-seats">
            Selecciona una película y un horario.
        </p>
    `;

    seatCounter.textContent = "0 seleccionados";
}


/* ==============================
   CREAR ASIENTOS
============================== */

function createSeats() {

    if (!selectedMovie || !selectedSchedule) {
        createEmptySeats();
        return;
    }

    seatMap.innerHTML = "";

    const rows = ["A", "B", "C", "D", "E"];
    const occupiedSeats = getOccupiedSeats();

    rows.forEach(row => {

        const rowElement = document.createElement("div");
        rowElement.className = "seat-row";

        const rowLabel = document.createElement("span");
        rowLabel.className = "row-label";
        rowLabel.textContent = row;

        rowElement.appendChild(rowLabel);

        for (let number = 1; number <= 6; number++) {

            const seatId = row + number;

            const button = document.createElement("button");

            button.type = "button";
            button.className = "seat-button";
            button.textContent = number;
            button.dataset.seat = seatId;

            if (occupiedSeats.includes(seatId)) {

                button.classList.add("occupied");
                button.disabled = true;

            } else {

                button.classList.add("available");

                button.addEventListener("click", function () {
                    toggleSeat(button);
                });
            }

            rowElement.appendChild(button);
        }

        seatMap.appendChild(rowElement);
    });

    updateSeatCounter();
}


/* ==============================
   STORAGE DE ASIENTOS
============================== */

function getStorageKey() {

    return `cineCayetano_asientos_${selectedMovie.id}_${selectedSchedule}`;
}

function getOccupiedSeats() {

    if (!selectedMovie || !selectedSchedule) {
        return [];
    }

    const key = getStorageKey();
    const saved = localStorage.getItem(key);

    if (saved) {

        try {
            return JSON.parse(saved);

        } catch (error) {
            return [];
        }
    }

    return [
        "A3",
        "B2",
        "C5",
        "D4"
    ];
}


/* ==============================
   SELECCIONAR ASIENTO
============================== */

function toggleSeat(button) {

    const seatId = button.dataset.seat;

    if (selectedSeats.includes(seatId)) {

        selectedSeats =
            selectedSeats.filter(seat => seat !== seatId);

        button.classList.remove("selected");
        button.classList.add("available");

        updateSeatCounter();
        updateSummary();

        return;
    }

    if (selectedSeats.length >= MAX_SEATS) {

        showMessage(
            "Puedes seleccionar máximo 6 asientos.",
            "error"
        );

        return;
    }

    selectedSeats.push(seatId);

    button.classList.remove("available");
    button.classList.add("selected");

    updateSeatCounter();
    updateSummary();

    clearMessage();
}


/* ==============================
   CONTADOR
============================== */

function updateSeatCounter() {

    const total = selectedSeats.length;

    seatCounter.textContent =
        `${total} ${
            total === 1
                ? "seleccionado"
                : "seleccionados"
        }`;
}


/* ==============================
   GUARDAR ASIENTOS
============================== */

function saveOccupiedSeats() {

    const key = getStorageKey();

    const currentOccupied = getOccupiedSeats();

    const allOccupied = [
        ...new Set([
            ...currentOccupied,
            ...selectedSeats
        ])
    ];

    localStorage.setItem(
        key,
        JSON.stringify(allOccupied)
    );
}


/* ==============================
   RESUMEN
============================== */

function updateSummary() {

    if (!selectedMovie) {

        summaryPoster.src = "images/pelicula1.jpg";

        summaryMovie.textContent =
            "Selecciona una película";

        summarySchedule.textContent = "-";
        summarySeats.textContent = "-";
        summaryTickets.textContent = "0";
        summaryTotal.textContent = "S/ 0.00";

        return;
    }

    summaryPoster.src = selectedMovie.image;
    summaryPoster.alt = selectedMovie.title;

    summaryMovie.textContent = selectedMovie.title;

    summarySchedule.textContent =
        selectedSchedule || "-";

    summarySeats.textContent =
        selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "-";

    summaryTickets.textContent =
        selectedSeats.length;

    const total =
        selectedSeats.length * TICKET_PRICE;

    summaryTotal.textContent =
        `S/ ${total.toFixed(2)}`;
}


/* ==============================
   VALIDAR FORMULARIO
============================== */

function validateForm() {

    if (!selectedMovie) {

        showMessage(
            "Selecciona una película.",
            "error"
        );

        return false;
    }

    if (!selectedSchedule) {

        showMessage(
            "Selecciona un horario.",
            "error"
        );

        return false;
    }

    if (selectedSeats.length === 0) {

        showMessage(
            "Selecciona al menos un asiento.",
            "error"
        );

        return false;
    }

    const name = customerName.value.trim();

    if (name.length < 3) {

        showMessage(
            "Ingresa tu nombre completo.",
            "error"
        );

        customerName.focus();

        return false;
    }

    const dni = customerDni.value.trim();

    if (!/^\d{8}$/.test(dni)) {

        showMessage(
            "El DNI debe tener exactamente 8 dígitos.",
            "error"
        );

        customerDni.focus();

        return false;
    }

    const email = customerEmail.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        showMessage(
            "Ingresa un correo electrónico válido.",
            "error"
        );

        customerEmail.focus();

        return false;
    }

    return true;
}


/* ==============================
   MENSAJES
============================== */

function showMessage(message, type) {

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

function clearMessage() {

    formMessage.textContent = "";
    formMessage.className = "form-message";
}


/* ==============================
   CÓDIGO DE RESERVA
============================== */

function generateReservationCode() {

    const number =
        Math.floor(
            100000 + Math.random() * 900000
        );

    return `CAY-${number}`;
}


/* ==============================
   CONFIRMAR RESERVA
============================== */

confirmButton.addEventListener("click", function () {

    if (!validateForm()) {
        return;
    }

    const total =
        selectedSeats.length * TICKET_PRICE;

    const reservation = {

        code: generateReservationCode(),

        movieId: selectedMovie.id,

        movie: selectedMovie.title,

        schedule: selectedSchedule,

        seats: [...selectedSeats],

        customer: customerName.value.trim(),

        dni: customerDni.value.trim(),

        email: customerEmail.value.trim(),

        total: total,

        date: new Date().toLocaleString()
    };

    const reservations =
        JSON.parse(
            localStorage.getItem(
                "cineCayetano_reservas"
            )
        ) || [];

    reservations.push(reservation);

    localStorage.setItem(
        "cineCayetano_reservas",
        JSON.stringify(reservations)
    );

    saveOccupiedSeats();

    document.getElementById("reservationCode").textContent =
        reservation.code;

    document.getElementById("confirmationMovie").textContent =
        reservation.movie;

    document.getElementById("confirmationSchedule").textContent =
        reservation.schedule;

    document.getElementById("confirmationSeats").textContent =
        reservation.seats.join(", ");

    document.getElementById("confirmationCustomer").textContent =
        reservation.customer;

    document.getElementById("confirmationTotal").textContent =
        `S/ ${reservation.total.toFixed(2)}`;

    confirmationModal.classList.add("active");

    createSeats();
    renderHistory();
});


/* ==============================
   CERRAR MODAL
============================== */

closeModal.addEventListener("click", function () {

    confirmationModal.classList.remove("active");
});

confirmationModal.addEventListener("click", function (event) {

    if (event.target === confirmationModal) {

        confirmationModal.classList.remove("active");
    }
});


/* ==============================
   NUEVA RESERVA
============================== */

newReservationButton.addEventListener("click", function () {

    confirmationModal.classList.remove("active");

    selectedMovie = null;
    selectedSchedule = "";
    selectedSeats = [];

    movieSelect.value = "";

    scheduleSelect.innerHTML = `
        <option value="">
            Selecciona un horario
        </option>
    `;

    scheduleSelect.disabled = true;

    scheduleButtons.innerHTML = "";

    customerName.value = "";
    customerDni.value = "";
    customerEmail.value = "";

    createEmptySeats();
    updateSummary();
    clearMessage();

    const cartelera =
        document.getElementById("cartelera");

    if (cartelera) {

        cartelera.scrollIntoView({
            behavior: "smooth"
        });
    }
});


/* ==============================
   HISTORIAL
============================== */

function renderHistory() {

    const reservations =
        JSON.parse(
            localStorage.getItem(
                "cineCayetano_reservas"
            )
        ) || [];

    reservationHistory.innerHTML = "";

    if (reservations.length === 0) {

        const emptyCard =
            document.createElement("div");

        emptyCard.className = "history-card";

        const title =
            document.createElement("h3");

        title.textContent =
            "No tienes reservas todavía.";

        const text =
            document.createElement("p");

        text.textContent =
            "Cuando realices una reserva aparecerá aquí.";

        emptyCard.appendChild(title);
        emptyCard.appendChild(text);

        reservationHistory.appendChild(emptyCard);

        return;
    }

    reservations
        .slice()
        .reverse()
        .forEach(reservation => {

            const card =
                document.createElement("div");

            card.className = "history-card";

            const left =
                document.createElement("div");

            const code =
                document.createElement("span");

            code.className = "history-code";

            code.textContent =
                reservation.code;

            const title =
                document.createElement("h3");

            title.textContent =
                reservation.movie;

            const schedule =
                document.createElement("p");

            schedule.textContent =
                `🕐 ${reservation.schedule}`;

            const seats =
                document.createElement("p");

            seats.textContent =
                `💺 ${reservation.seats.join(", ")}`;

            const customer =
                document.createElement("p");

            customer.textContent =
                `👤 ${reservation.customer}`;

            left.appendChild(code);
            left.appendChild(title);
            left.appendChild(schedule);
            left.appendChild(seats);
            left.appendChild(customer);

            const right =
                document.createElement("div");

            const total =
                document.createElement("strong");

            total.textContent =
                `S/ ${reservation.total.toFixed(2)}`;

            const date =
                document.createElement("p");

            date.textContent =
                reservation.date;

            right.appendChild(total);
            right.appendChild(date);

            card.appendChild(left);
            card.appendChild(right);

            reservationHistory.appendChild(card);
        });
}


/* ==============================
   MOSTRAR / OCULTAR HISTORIAL
============================== */

historyButton.addEventListener("click", function () {

    renderHistory();

    historySection.classList.toggle("hidden");

    if (!historySection.classList.contains("hidden")) {

        historySection.scrollIntoView({
            behavior: "smooth"
        });
    }
});


/* ==============================
   LIMPIAR HISTORIAL
============================== */

clearHistoryButton.addEventListener("click", function () {

    const confirmDelete =
        confirm(
            "¿Deseas eliminar todas las reservas guardadas?"
        );

    if (!confirmDelete) {
        return;
    }

    localStorage.removeItem(
        "cineCayetano_reservas"
    );

    renderHistory();
});


/* ==============================
   INICIO
============================== */

renderMovies();
loadMovieSelect();
createEmptySeats();
updateSummary();
renderHistory();
