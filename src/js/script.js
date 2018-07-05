import Slider from "./Slider";
import Reservation from "./Reservation.js";
import Map from "./Map.js";

window.onload = () => {

    /* invisible elements to start */
    document.querySelector('fieldset').style.display = 'none';
    document.getElementById('signature').style.display = 'none';

    const slider = new Slider();
    slider.decrire();

    const map = new Map();
    const configMap = map.initMap();
    map.initMarkers(
        'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=e5108e6a624c0893e1e3155785f8116190947008',
        configMap
    );

    if (sessionStorage.getItem('time') !== null) {
        const reservation = new Reservation(sessionStorage.getItem('station'), sessionStorage.getItem('time'));
        reservation.reservationConfirme();
    } else {
        document.getElementById('reservation_ok').textContent = 'Aucune réservation en cours';
    }
};
