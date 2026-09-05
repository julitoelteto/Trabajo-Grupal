// actualizacion.js - Versión Mejorada

function obtenerEstudiantesGuardados() {
    return JSON.parse(localStorage.getItem('estudiantes')) || [];
}

/**
 * Modifica los datos de un estudiante registrado según su código
 * @param {string} codigo - Código del estudiante a modificar
 * @param {Object} nuevosDatos - Objeto con los campos a actualizar {nombres, carrera, email}
 */
function actualizarEstudiante(codigo, nuevosDatos) {
    if (!codigo || !codigo.trim()) {
        console.error(" Error: Debe proporcionar un código válido para actualizar.");
        return { exito: false, mensaje: "Código no válido." };
    }

    let estudiantes = obtenerEstudiantesGuardados();
    const indice = estudiantes.findIndex(est => est.codigo.toUpperCase() === codigo.trim().toUpperCase());

    if (indice === -1) {
        console.warn(` No se encontró al estudiante con código: ${codigo}`);
        return { exito: false, mensaje: "Estudiante no encontrado." };
    }

    // Actualizar campos manteniendo los anteriores si no se envían nuevos
    estudiantes[indice].nombres = nuevosDatos.nombres ? nuevosDatos.nombres.trim() : estudiantes[indice].nombres;
    estudiantes[indice].carrera = nuevosDatos.carrera ? nuevosDatos.carrera.trim() : estudiantes[indice].carrera;
    estudiantes[indice].email = nuevosDatos.email ? nuevosDatos.email.trim() : estudiantes[indice].email;
    estudiantes[indice].fechaUltimaModificacion = new Date().toLocaleString();

    // Guardar cambios en localStorage
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

    console.log(" Datos actualizados con éxito:", estudiantes[indice]);
    return { exito: true, mensaje: "Estudiante actualizado correctamente.", estudiante: estudiantes[indice] };
}

/**
 * Elimina un estudiante de la base de datos por su código
 * @param {string} codigo 
 */
function eliminarEstudiante(codigo) {
    let estudiantes = obtenerEstudiantesGuardados();
    const listaFiltrada = estudiantes.filter(est => est.codigo.toUpperCase() !== codigo.trim().toUpperCase());

    if (estudiantes.length === listaFiltrada.length) {
        return { exito: false, mensaje: "No se encontró el estudiante a eliminar." };
    }

    localStorage.setItem('estudiantes', JSON.stringify(listaFiltrada));
    console.log(` Estudiante con código ${codigo} eliminado.`);
    return { exito: true, mensaje: "Estudiante eliminado correctamente." };
}
