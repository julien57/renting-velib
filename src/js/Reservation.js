export default class Reservation {

    constructor(station, time) {
        this.station = station;
        this.time = time;
    }

    reservationConfirme() {
        // Remove setInterval in progress
        clearInterval(intervalId);

        // Recording webstorage
        sessionStorage.setItem('station', this.station);
        this.station = sessionStorage.getItem('station');
        sessionStorage.setItem('time', this.time);
        this.time = sessionStorage.getItem('time');

        // Start setInterval in method gestionTemps each second
        intervalId = setInterval(Reservation.gestionTemps, 1000);
    }

    static gestionTemps() {
        let tempsRestant = Number(sessionStorage.getItem('time'));
        const reservationOK = document.getElementById('reservation_ok');

        if (sessionStorage.getItem('time') === null) {
            reservationOK.textContent = 'Aucune réservation';
            sessionStorage.clear();
            clearInterval(intervalId);

        } else if (sessionStorage.getItem('time') > 0) {
            tempsRestant--;
            sessionStorage.setItem('time', tempsRestant);
            reservationOK.textContent = `Une réservation à la station ${sessionStorage.getItem('station').toLowerCase()}, temps restant : ${Math.floor(tempsRestant / 60)}m ${tempsRestant % 60}s.`;

        } else {
            reservationOK.textContent = "Aucune réservation";
            sessionStorage.clear();
            clearInterval(this.intervalId);
        }
    }
}

let intervalId;