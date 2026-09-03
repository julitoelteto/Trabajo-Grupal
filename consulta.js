// Obtener el listado guardado
function obtenerEstudiantes() {
    return JSON.parse(localStorage.getItem('estudiantes')) || [];
}

/**
 * Buscar estudiante por su código de identificación
 * @param {string} codigo - Código a buscar
 */
function buscarPorCodigo(codigo) {
    if (!codigo.trim()) {
        console.warn(" Ingrese un código válido para la búsqueda.");
        return null;
    }

    const estudiantes = obtenerEstudiantes();
    const resultado = estudiantes.find(est => est.codigo.toUpperCase() === codigo.trim().toUpperCase());

    if (resultado) {
        console.log(" Estudiante encontrado:", resultado);
        return resultado;
    } else {
        console.log(` No se encontró ningún estudiante con el código ${codigo}.`);
        return null;
    }
}

/**
 * Buscar estudiantes por coincidencia de nombre
 * @param {string} nombreBusqueda - Nombre o apellido parcial
 */
function buscarPorNombre(nombreBusqueda) {
    if (!nombreBusqueda.trim()) return [];

    const estudiantes = obtenerEstudiantes();
    const resultados = estudiantes.filter(est => 
        est.nombres.toLowerCase().includes(nombreBusqueda.trim().toLowerCase())
    );

    console.log(` Se encontraron ${resultados.length} coincidencias:`, resultados);
    return resultados;
}

/**
 * Listar todos los estudiantes ordenados alfabéticamente por nombre
 */
function obtenerListadoOrdenado() {
    const estudiantes = obtenerEstudiantes();
    return estudiantes.sort((a, b) => a.nombres.localeCompare(b.nombres));
}
