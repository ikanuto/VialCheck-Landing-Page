Feature: Reporte rápido de incidencias viales por parte del ciudadano
  Como un ciudadano registrado en movimiento
  Quiero enviar una incidencia vial con ubicación automática y una foto
  Para notificar a la municipalidad rápidamente sin interrumpir mi trayecto

  Background:
    Given que el ciudadano ha iniciado sesión en la aplicación móvil de VialCheck
    And el dispositivo tiene los permisos de ubicación GPS activados
    And el usuario se encuentra en la pantalla de inicio "Bienvenido"

  Scenario: Registro exitoso de una incidencia vial en menos de un minuto (Happy Path)
    When el usuario presiona el botón "Nuevo Reporte"
    And el usuario presiona "Detectar mi ubicación actual"
    Then el sistema debe obtener las coordenadas GPS exactas y mostrar la dirección
    When el usuario selecciona "Baches y Pistas" en el selector de categorías
    And el usuario escribe "Bache profundo en el carril derecho" en el campo de descripción
    And el usuario toca el área de adjuntar imagen para subir una foto en tiempo real
    And el usuario presiona el botón naranja "Enviar Reporte"
    Then el sistema debe procesar los datos en menos de 5 segundos
    And la aplicación debe redirigir a la pantalla de "Confirmación"
    And se debe mostrar un ícono de check verde gigante con el estado "Pendiente"
