const conciertos = [
    { tipo_de_concierto: "Música Clásica", edadMinima: 12 },
    { tipo_de_concierto: "Rock", edadMinima: 16 },
    { tipo_de_concierto: "Reggaetón", edadMinima: 18 }
];

function obtenerDatosUsuario() {
    let nombre;
    let apellido;

    do {
        nombre = prompt("¡Bienvenido a la tiquetera! ¿Cuál es tu nombre?");
        
        let valido = true;
        for (let i = 0; i < nombre.length; i++) {
            if (!isNaN(nombre[i])) {
                valido = false;
                break;
            }
        }

        if (!valido || nombre === "" || nombre === null) {
            alert("El nombre no puede contener números ni símbolos. Intenta nuevamente.");
        }

    } while (nombre === "" || nombre === null || !isNaN(nombre));

    do {
        apellido = prompt("¿Cuál es tu apellido?");
        
        let valido = true;
        for (let i = 0; i < apellido.length; i++) {
            if (!isNaN(apellido[i])) {
                valido = false;
                break;
            }
        }

        if (!valido || apellido === "" || apellido === null) {
            alert("El apellido no puede contener números ni símbolos. Intenta nuevamente.");
        }

    } while (apellido === "" || apellido === null || !isNaN(apellido));

    let edad;
    do {
        edad = prompt("¿Cuántos años tienes?");
        edad = parseInt(edad);
        if (isNaN(edad) || edad <= 0) {
            alert("Por favor, ingresa una edad válida.");
        }
    } while (isNaN(edad) || edad <= 0);

    let id;
    let tipoID;
    do {
        tipoID = prompt("Por favor, elige tu tipo de ID:\n1. ID Nacional\n2. Pasaporte\n3. ID Gubernamental");
    } while (tipoID !== "1" && tipoID !== "2" && tipoID !== "3");

    do {
        id = prompt("Ingresa tu número de ID (debe ser un número de entre 7 y 9 dígitos).");
        if (id.length < 7 || id.length > 9 || isNaN(id)) {
            alert("El ID debe ser un número de entre 7 y 9 dígitos. Intenta nuevamente.");
        }
    } while (id.length < 7 || id.length > 9 || isNaN(id));

    return { nombre, apellido, edad, id, tipoID };
}

function obtenerCorreoElectronico() {
    let correo;
    do {
        correo = prompt("Ingresa tu correo electrónico para enviar las boletas:");
        if (!correo.includes('@') || !correo.endsWith('.com')) {
            alert("El correo electrónico no es válido. Debe contener '@' y terminar en '.com'. Intenta nuevamente.");
        }
    } while (!correo.includes('@') || !correo.endsWith('.com'));
    return correo;
}

function mostrarOpcionesConciertos() {
    let opciones = "Elige un concierto:\n";
    for (let i = 0; i < conciertos.length; i++) {
        opciones += (i + 1) + ". " + conciertos[i].tipo_de_concierto + " (Edad mínima: " + conciertos[i].edadMinima + " años)\n";
    }
    let seleccion = parseInt(prompt(opciones));
    return seleccion - 1;
}

function validarEdad(concierto, edad) {
    return edad >= concierto.edadMinima;
}

function solicitarCantidadBoletos() {
    let cantidadBoletos;
    do {
        cantidadBoletos = prompt("¿Cuántos boletos deseas comprar? (Máximo 5)");
        cantidadBoletos = parseInt(cantidadBoletos);
        if (cantidadBoletos > 5 || cantidadBoletos < 1) {
            alert("Solo puedes comprar un máximo de 5 boletos.");
        }
    } while (isNaN(cantidadBoletos) || cantidadBoletos < 1 || cantidadBoletos > 5);
    return cantidadBoletos;
}

function confirmarCompra() {
    let respuesta = prompt("¿Estás seguro que deseas asistir a este concierto? (Sí/No)").toLowerCase();
    return respuesta === "sí" || respuesta === "si";
}

function seleccionarMetodoPago() {
    let pago;
    do {
        pago = prompt("Elige tu método de pago: 1. Tarjeta 2. PayPal 3. Efectivo");
        switch (pago) {
            case "1":
                return "Tarjeta";
            case "2":
                return "PayPal";
            case "3":
                return "Efectivo";
            default:
                alert("Opción no válida. Por favor elige 1, 2 o 3.");
        }
    } while (true);
}

function tiquetera() {
    let usuario = obtenerDatosUsuario();

    if (usuario.edad < 12) {
        alert("Lo siento, no tienes la edad mínima para asistir a cualquiera de nuestros conciertos.");
        return;
    }

    let continuar = true;
    while (continuar) {
        let conciertoSeleccionado = mostrarOpcionesConciertos();

        if (validarEdad(conciertos[conciertoSeleccionado], usuario.edad)) {
            let cantidadBoletos = solicitarCantidadBoletos();

            if (confirmarCompra()) {
                let metodoPago = seleccionarMetodoPago();
                let correo = obtenerCorreoElectronico();

                alert("Gracias " + usuario.nombre + " " + usuario.apellido + " por tu compra.\n" +
                    "ID de usuario: " + usuario.id + "\n" +
                    "Tipo de ID: " + (usuario.tipoID === "1" ? "ID Nacional" : usuario.tipoID === "2" ? "Pasaporte" : "ID Gubernamental") + "\n" +
                    "Concierto: " + conciertos[conciertoSeleccionado].tipo_de_concierto + "\n" +
                    "Cantidad de boletos: " + cantidadBoletos + "\n" +
                    "Método de pago: " + metodoPago + "\n" +
                    "Correo: " + correo + "\n" +
                    "¡Nos vemos en el concierto!");

                continuar = false;
            } else {
                alert("No se ha realizado la compra. Elige un concierto nuevamente.");
            }
        } else {
            alert("Lo siento, no tienes la edad suficiente para este concierto.");
            let deseaOtroConcierto = confirm("¿Quieres elegir otro concierto?");
            if (!deseaOtroConcierto) {
                continuar = false;
            }
        }
    }
}

tiquetera();
