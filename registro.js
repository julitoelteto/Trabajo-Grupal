// Función para registrar nuevo estudiante
// Base de datos local simulada en el navegador
function obtenerEstudiantesGuardados() {
    return JSON.parse(localStorage.getItem('estudiantes')) || [];
}

/**
 * Función para registrar un nuevo estudiante
 * @param {string} codigo - Código único del estudiante (ej. N00123456)
 * @param {string} nombres - Nombres y apellidos completos
 * @param {string} carrera - Carrera profesional
 * @param {string} email - Correo institucional o personal
 */
function registrarEstudiante(codigo, nombres, carrera, email) {
    // 1. Validar campos vacíos
    if (!codigo.trim() || !nombres.trim() || !carrera.trim() || !email.trim()) {
        console.error(" Error: Todos los campos son obligatorios.");
        return { exito: false, mensaje: "Todos los campos son obligatorios." };
    }

    const listaEstudiantes = obtenerEstudiantesGuardados();

    // 2. Validar código duplicado
    const existe = listaEstudiantes.some(est => est.codigo.toUpperCase() === codigo.trim().toUpperCase());
    if (existe) {
        console.warn(` El código ${codigo} ya se encuentra registrado.`);
        return { exito: false, mensaje: "El código de estudiante ya existe." };
    }

    // 3. Crear el nuevo objeto estudiante
    const nuevoEstudiante = {
        codigo: codigo.trim().toUpperCase(),
        nombres: nombres.trim(),
        carrera: carrera.trim(),
        email: email.trim(),
        fechaRegistro: new Date().toLocaleString()
    };

    // 4. Guardar en el arreglo y actualizar localStorage
    listaEstudiantes.push(nuevoEstudiante);
    localStorage.setItem('estudiantes', JSON.stringify(listaEstudiantes));

    console.log(" Estudiante registrado con éxito:", nuevoEstudiante);
    return { exito: true, mensaje: "Estudiante registrado correctamente.", estudiante: nuevoEstudiante };
}
