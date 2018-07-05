import Station from "./Station.js";

export default class Map {

    initMap() {
        const myLatLng = new google.maps.LatLng(45.762, 4.845);
        let configMap;
        return configMap = {
            center: myLatLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }

    initMarkers(url, configMap) {
        const map = new google.maps.Map(document.getElementById('map'), configMap);

        Map.ajaxGet(url, function(reponse) {
            const marqueurs = JSON.parse(reponse);

            for (let marqueur of marqueurs) {
                let marker = new google.maps.Marker({
                    position: marqueur.position,
                    title: marqueur.name,
                    map: map,
                    draggable: true,
                    animation: google.maps.Animation.DROP
                });

                marker.addListener('click', () => {
                    console.log(marqueur.address);
                    const myMarker = new Station(
                        marqueur.position ,
                        marqueur.name,
                        marqueur.address,
                        marqueur.status,
                        marqueur.bike_stands,
                        marqueur.available_bikes
                    );
                    myMarker.detailStation();
                });
            }
        });
    }

    static ajaxGet(url, callback) {
        const req = new XMLHttpRequest();
        req.open('GET', url);
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                callback(req.responseText);
            } else {
                console.error(req.status + ' ' + req.statusText + ' ' + url);
            }
        });
        req.addEventListener('error', function () {
            console.error('Erreur réseau avec l\'URL ' + url);
        });
        req.send(null);
    }

}