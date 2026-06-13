document.addEventListener("DOMContentLoaded", () => {
    // Elementos de la columna izquierda
    const btnGps = document.getElementById("btn-gps");
    const textoUbicacion = document.getElementById("texto-ubicacion");
    const inputManual = document.getElementById("ubicacion-manual");
    
    // Elementos de la columna derecha
    const formReporte = document.getElementById("form-reporte");
    const msgError = document.getElementById("msg-error");
    const msgExito = document.getElementById("msg-exito");
    const pantallaFormulario = document.getElementById("pantalla-formulario");
    const pantallaConfirmacion = document.getElementById("pantalla-confirmacion");

    // Lógica para el botón de archivo
    const inputArchivo = document.getElementById("foto-evidencia");
    const textoArchivo = document.getElementById("texto-archivo");

    inputArchivo.addEventListener("change", function(evento) {
        if (evento.target.files.length > 0) {
            const nombreArchivo = evento.target.files[0].name;
            textoArchivo.textContent = "Archivo cargado: " + nombreArchivo;
            textoArchivo.style.color = "#10B981"; // Cambia a verde
        } else {
            textoArchivo.textContent = "Haz clic aquí para subir una foto desde tu PC";
            textoArchivo.style.color = "#64748B";
        }
    });

    // 1. Simulación del botón GPS automático
    btnGps.addEventListener("click", () => {
        btnGps.textContent = "Procesando coordenadas...";
        inputManual.value = ""; // Limpia el campo manual si se usa el GPS
        
        setTimeout(() => {
            btnGps.textContent = "Ubicación confirmada";
            textoUbicacion.textContent = "Lat: -12.1764, Lng: -77.0163 (Chorrillos, Lima)";
            textoUbicacion.className = "texto-detectado";
        }, 1500);
    });

    // 2. Lógica para el ingreso manual (Actualiza en tiempo real)
    inputManual.addEventListener("input", (evento) => {
        const direccionEscrita = evento.target.value.trim();
        
        if (direccionEscrita !== "") {
            textoUbicacion.textContent = direccionEscrita;
            textoUbicacion.className = "texto-detectado";
            btnGps.textContent = "Detectar mi ubicación automática"; // Resetea el texto del botón GPS
        } else {
            textoUbicacion.textContent = "Esperando ubicación...";
            textoUbicacion.className = "texto-esperando";
        }
    });

    // 3. Validación y Guardado de Formulario
    formReporte.addEventListener("submit", (evento) => {
        evento.preventDefault(); 

        const selectCategoria = document.getElementById("categoria");
        const categoriaValor = selectCategoria.value;
        const categoriaTexto = selectCategoria.options[selectCategoria.selectedIndex].text; // Obtiene el texto (ej. "Bache o hueco")
        
        const tiempo = document.getElementById("tiempo").value;
        const descripcion = document.getElementById("descripcion").value;

        msgError.style.display = "none";
        msgExito.style.display = "none";

        if (categoriaValor === "" || tiempo === "" || descripcion.trim() === "" || textoUbicacion.textContent === "Esperando ubicación...") {
            msgError.textContent = "Error: Completa todos los campos y define una ubicación.";
            msgError.style.display = "block";
        } else {
            msgExito.style.display = "block";
            
            // --- NUEVO: GUARDAR EL REPORTE EN LOCALSTORAGE ---
            const nuevoReporte = {
                id: 'RPT-' + Math.floor(1000 + Math.random() * 9000), // Genera un ID aleatorio (ej. RPT-4821)
                dir: textoUbicacion.textContent,
                hora: new Date().toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'}), // Hora actual
                estado: 'Pendiente',
                colorEstado: '#F59E0B',
                tipo: categoriaTexto,
                visto: 'Recién enviado',
                desc: descripcion
            };

            // Traer la lista guardada previamente (o crear una vacía si es la primera vez)
            let listaReportes = JSON.parse(localStorage.getItem('vialcheck_reportes')) || [];
            listaReportes.unshift(nuevoReporte); // Agrega el nuevo reporte al principio de la lista
            localStorage.setItem('vialcheck_reportes', JSON.stringify(listaReportes)); // Guarda en la memoria
            // --------------------------------------------------

            setTimeout(() => {
                pantallaFormulario.style.display = "none";
                pantallaConfirmacion.style.display = "flex";
            }, 1500);
        }
    });
});