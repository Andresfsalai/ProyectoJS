const conciertos = [
    { tipo: "Música Clásica", edadMinima: 12, img: "classical.jpg" },
    { tipo: "Rock", edadMinima: 16, img: "rock.jpg" },
    { tipo: "Reggaetón", edadMinima: 18, img: "reggaeton.jpg" }
];

const userForm = document.getElementById('userForm');
const concertSelection = document.getElementById('concertSelection');
const purchaseSummary = document.getElementById('purchaseSummary');
const summary = document.getElementById('summary');
const confirmPurchase = document.getElementById('confirmPurchase');

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu)$/i;
    return regex.test(correo);
}

function mostrarConciertos(edad) {
    concertSelection.style.display = 'flex';
    const concertCards = document.querySelectorAll('.concert-card');
    concertCards.forEach((card, index) => {
        const concierto = conciertos[index];
        if (edad < concierto.edadMinima) {
            card.style.opacity = '0.5';
            card.style.pointerEvents = 'none';
        } else {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
            card.addEventListener('click', () => seleccionarConcierto(concierto));
        }
    });
}

function seleccionarConcierto(concierto) {
    localStorage.setItem('conciertoSeleccionado', JSON.stringify(concierto));
    resumenCompra(concierto);
}

function resumenCompra(concierto) {
    concertSelection.style.display = 'none';
    purchaseSummary.style.display = 'block';
    const userData = JSON.parse(localStorage.getItem('usuario'));
    summary.innerHTML = `
        <strong>Nombre:</strong> ${userData.nombre} ${userData.apellido}<br>
        <strong>Edad:</strong> ${userData.edad}<br>
        <strong>Correo:</strong> ${userData.correo}<br>
        <strong>Concierto:</strong> ${concierto.tipo}<br>
        <strong>Edad mínima:</strong> ${concierto.edadMinima}<br>
    `;
}

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
    const correo = document.getElementById('correo').value.trim();

    if (!validarCorreo(correo)) {
        alert("El correo debe terminar en .com, .net, .org, o .edu");
        return;
    }

    if (edad < 12) {
        alert("Lo sentimos, no puedes asistir a los conciertos debido a tu edad.");
        return;
    }

    const usuario = { nombre, apellido, edad, correo };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    userForm.style.display = 'none';
    mostrarConciertos(edad);
});

confirmPurchase.addEventListener('click', () => {
    alert("¡Gracias por tu compra! Nos vemos en el concierto.");
    localStorage.clear();
    location.reload();
});
