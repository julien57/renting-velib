const imagesDiapo = ['img/slide1.jpg', 'img/slide2.jpg', 'img/slide3.jpg'];
const descriptionsDiapo = [
	'Vous pouvez réserver votre vélib directement sur le site',
	'Sur la carte, cliquez sur le marqueur de votre choix',
	'Signez ensuite pour confirmer la réservation'
];

export default class Slider {

	constructor() {
		this.image = imagesDiapo;
		this.description = descriptionsDiapo;
		this.position = 0;
	}

	decrire() {
		$('#slide1 img').attr('src', this.image[this.position]);
		$('#description_slide').text(this.description[this.position]);
	}

	avancer() {
		if (this.position < this.image.length - 1) {
			this.position++;

		} else {
			this.position = 0;
		}
		Slider.decrire();
	}

	reculer() {
		if (this.position > 0) {
			this.position--;
		} else {
			this.position = this.image.length -1;
		}
		this.decrire();
	}
};

$('#suiv').click(function () {
	Slider.avancer();
});

$('#prec').click(function () {
	Slider.reculer();
});

$('body').keydown(function (e) {
	switch (e.which) {
		case 39:
			Slider.avancer();
			break;
		case 37:
			Slider.reculer();
			break;
		default:
			console.log("Utiliser les flèches du clavier pour utiliser le diaporama.");
	}
});