export const formatearFecha = fecha => {
    const fechaFormat = fecha.split("T")[0].split("-")
    const nuevaFecha = new Date(fechaFormat)

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}