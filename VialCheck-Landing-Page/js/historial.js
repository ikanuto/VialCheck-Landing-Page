document.addEventListener("DOMContentLoaded", () => {
    cargarReportes();
});

// Variable global para almacenar los datos temporalmente
let reportesGuardados = [];

function cargarReportes() {
    const contenedorLista = document.getElementById('contenedor-lista-tarjetas');
    const vistaDetalle = document.getElementById('vista-detalle');
    
    // Leer la memoria del navegador
    reportesGuardados = JSON.parse(localStorage.getItem('vialcheck_reportes')) || [];

    // SI NO HAY REPORTES: Mostrar mensaje de vacío
    if (reportesGuardados.length === 0) {
        contenedorLista.innerHTML = `
            <div style="text-align:center; padding: 60px 20px; color: #64748B;">
                <span style="font-size: 50px;">📭</span>
                <p style="margin-top:15px; font-weight:700; font-size: 18px; color: #1A365D;">Aún no tienes reportes</p>
                <p style="font-size:14px; margin-top: 5px;">Las incidencias que reportes en el mapa aparecerán aquí.</p>
                <a href="reporte.html" style="display:inline-block; margin-top: 20px; background-color: #FF6B00; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">Hacer mi primer reporte</a>
            </div>
        `;
        vistaDetalle.style.display = 'none'; // Oculta la columna derecha
        document.querySelector('.btn-filtro.activo .badge').textContent = '0';
        return;
    }

    // SI HAY REPORTES: Mostrarlos en la lista
    vistaDetalle.style.display = 'block'; // Muestra la columna derecha
    contenedorLista.innerHTML = ''; // Limpiar el contenedor

    reportesGuardados.forEach((rep, index) => {
        const tarjeta = document.createElement('div');
        // Si es el primer elemento (index 0), le pone la clase activa por defecto
        tarjeta.className = `tarjeta-reporte ${index === 0 ? 'activa' : ''}`;
        tarjeta.onclick = () => mostrarDetalle(index, tarjeta);

        tarjeta.innerHTML = `
            <div class="tarjeta-header">
                <span class="num-reporte">${rep.id}</span>
                <span class="etiqueta-estado" style="background-color:${rep.colorEstado}">${rep.estado}</span>
            </div>
            <div class="tarjeta-body">
                <p><strong>Dirección:</strong> ${rep.dir}</p>
                <p><strong>Hora:</strong> ${rep.hora}</p>
                <p><strong>Tipo:</strong> ${rep.tipo}</p>
            </div>
            <button class="btn-ver-detalles">Ver detalles</button>
        `;
        contenedorLista.appendChild(tarjeta);
    });

    // Cargar automáticamente los datos del primer reporte en la tarjeta de la derecha
    mostrarDatosEnDetalle(reportesGuardados[0]);
    
    // Actualizar el número del filtro superior
    document.querySelector('.btn-filtro.activo .badge').textContent = reportesGuardados.length;
}

function mostrarDetalle(index, elementoTarjeta) {
    // 1. Quitar la clase "activa" de todas las tarjetas
    document.querySelectorAll('.tarjeta-reporte').forEach(t => t.classList.remove('activa'));
    // 2. Poner la clase "activa" a la tarjeta a la que se le hizo clic
    elementoTarjeta.classList.add('activa');
    // 3. Mostrar esos datos a la derecha
    mostrarDatosEnDetalle(reportesGuardados[index]);
}

function mostrarDatosEnDetalle(data) {
    document.getElementById('det-num').textContent = data.id;
    document.getElementById('det-dir').textContent = data.dir;
    document.getElementById('det-hora').textContent = data.hora;
    
    const estadoElem = document.getElementById('det-estado');
    estadoElem.textContent = data.estado;
    estadoElem.style.color = data.colorEstado;

    document.getElementById('det-tipo').textContent = data.tipo;
    document.getElementById('det-visto').textContent = data.visto;
    document.getElementById('det-desc').textContent = data.desc;
}

// Función extra para poder borrar todos los reportes y probar el mensaje de "vacío"
function borrarHistorial() {
    if(confirm('¿Estás seguro de que deseas borrar todo tu historial de reportes?')) {
        localStorage.removeItem('vialcheck_reportes');
        cargarReportes(); // Recarga la pantalla
    }
}