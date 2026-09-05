// reportes.js - Versión Mejorada

function obtenerEstudiantesGuardados() {
    return JSON.parse(localStorage.getItem('estudiantes')) || [];
}

/**
 * Genera estadísticas generales sobre los estudiantes registrados
 */
function obtenerEstadisticasGenerales() {
    const estudiantes = obtenerEstudiantesGuardados();
    const totalEstudiantes = estudiantes.length;

    // Agrupar y contar por carrera
    const estudiantesPorCarrera = estudiantes.reduce((acc, est) => {
        const carrera = est.carrera || 'Sin Especificar';
        acc[carrera] = (acc[carrera] || 0) + 1;
        return acc;
    }, {});

    const reporte = {
        totalRegistrados: totalEstudiantes,
        desglosePorCarrera: estudiantesPorCarrera,
        fechaGeneracion: new Date().toLocaleString()
    };

    console.log("=== RESUMEN ESTADÍSTICO DE MATRÍCULA ===", reporte);
    return reporte;
}

/**
 * Imprime un reporte detallado en la consola con formato
 */
function imprimirReporteConsola() {
    const estudiantes = obtenerEstudiantesGuardados();
    console.log("=========================================");
    console.log("     REPORTE DETALLADO DE ESTUDIANTES    ");
    console.log("=========================================");

    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados en el sistema.");
        return;
    }

    estudiantes.forEach((est, index) => {
        console.log(${index + 1}. [${est.codigo}] ${est.nombres});
        console.log(`   Carrera: ${est.carrera} | Email: ${est.email}`);
        console.log(`   Fecha Registro: ${est.fechaRegistro}`);
        console.log("-----------------------------------------");
    });
}
