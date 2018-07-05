import Reservation from './Reservation.js';

export default function Signature(station) {
    document.querySelector('fieldset').style.display = 'none';
    document.getElementById('signature').style.display = 'block';

    const confirmeStation = document.getElementById('confirmeStation');
    confirmeStation.innerHTML = '';

    const stationConfirme = station;
    confirmeStation.appendChild(document.createTextNode(`Confirmation pour la station ${stationConfirme}`));

    const signatureMessage = document.getElementById('signature_message');
    signatureMessage.textContent = '';

    // Create Canvas
    const canvas = document.getElementById("canvas");
    canvas.width = canvas.width;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWith = 3;

    // If signature is not present, value = false
    let acceptSignature = false;

    // Init mouse events
    let drawing = false;
    let mousePos = { x:0, y:0 };
    let lastPos = mousePos;
    canvas.addEventListener("mousedown", (e) => {
        acceptSignature = true;
        drawing = true;
        lastPos = getMousePos(canvas, e);
    }, false);
    canvas.addEventListener("mouseup", () => {
        drawing = false;
    }, false);
    canvas.addEventListener("mousemove", (e) => {
        mousePos = getMousePos(canvas, e);
    }, false);

    // Mouse position in Canvas
    function getMousePos(canvasDom, mouseEvent) {
        const rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    }

    // Regular interval in display
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };
    })();

    // Drawing in Canvas
    function renderCanvas() {
        if (drawing) {
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
            lastPos = mousePos;
        }
    }

    // Animation authorization
    (function drawLoop () {
        requestAnimFrame(drawLoop);
        renderCanvas();
    })();

    // Events for mobils (tactile)
    canvas.addEventListener("touchstart", (e) => {
        mousePos = getTouchPos(canvas, e);
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchend", () => {
        const mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    // Poisition in Canvas
    function getTouchPos(canvasDom, touchEvent) {
        const rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    // Stop the scrolling for signature
    document.body.addEventListener("touchstart", (e) => {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

    document.body.addEventListener("touchend", (e) => {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

    document.body.addEventListener("touchmove", (e) => {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

    // Reset button action
    document.getElementById('reinitialisation').addEventListener('click', () => {
        canvas.width = canvas.width;
        acceptSignature = false;
    });


    // Validation button action (with signature control)
    document.getElementById('validation').addEventListener('click', () => {
        if (acceptSignature === false) {
            signatureMessage.textContent = 'Merci de confirmer par signature.';
        } else {
            acceptSignature = false;
            document.getElementById('signature').style.display = 'none';
            const temps = 1200;

            const reservation = new Reservation(stationConfirme, temps);
            reservation.reservationConfirme();
        }
    });
}
