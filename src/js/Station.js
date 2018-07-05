import Signature from "./Signature.js";

export default class Station {

    constructor(location, name, address, status, nbBike, availableBikes) {
        this.location = location;
        this.name = name;
        this.address = address;
        this.status = status;
        this.nbBike = nbBike;
        this.availableBikes = availableBikes;
    }

    detailStation() {
        // add details for current station
        document.getElementById('signature').style.display = 'none';
        document.querySelector('fieldset').style.display = 'block';

        const stationName = document.getElementById('nom_station');
        stationName.textContent = this.name;

        const stationAdress = document.getElementById('adresse');
        stationAdress.textContent = this.address;

        const stationStatus = document.getElementById('etat');
        stationStatus.textContent = Station.statusTranslation(this.status);

        const nbBikeStation = document.getElementById('nb_velos');
        nbBikeStation.textContent = this.nbBike;

        const availaibleBikesStation = document.getElementById('velos_disponibles');
        availaibleBikesStation.textContent = this.availableBikes;

        Station.disponibiliteVelos(this.availableBikes);

        if (document.getElementById('reservationVelo')) {
            document.getElementById('reservationVelo').addEventListener('click', () => {
                Signature(stationName.textContent);
            });
        }
    }

    static disponibiliteVelos(availableBikes) {

        const divReservation = document.getElementById('bouton_reservation');

        if (availableBikes > 0) {
            const boutonRes = document.createElement('button');
            boutonRes.setAttribute('id', 'reservationVelo');
            boutonRes.textContent = 'Réservez un vélo';
            divReservation.innerHTML = '';
            divReservation.appendChild(boutonRes);
        } else {
            divReservation.textContent = 'Aucun vélo de disponible...';
        }
    }

    static statusTranslation(status) {
        // Translate status
        if (status === 'OPEN') {
            status = 'Ouverte';
        } else {
            status = 'Fermée';
        }
        return status;
    }
}

