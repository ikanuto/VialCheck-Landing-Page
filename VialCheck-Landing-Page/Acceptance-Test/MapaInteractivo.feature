Feature: Mapa interactivo de riesgos viales e historial de seguimiento
  Como un ciudadano que transita por la ciudad
  Quiero ver pines de incidencias geolocalizadas en tiempo real y consultar mi historial
  Para planificar rutas seguras y verificar el avance del mantenimiento municipal

  Scenario: Exploración del mapa interactivo y visualización de detalles (Happy Path)
    Given que el usuario está autenticado en la aplicación
    And la aplicación ha cargado el módulo "Mapa de Vías"
    When el usuario toca un pin rojo etiquetado como "Bache (Alto Riesgo)"
    Then una tarjeta desplegable (Bottom Sheet) debe emerger desde la parte inferior
    And debe mostrar la dirección exacta "Av. Arequipa 245", el tiempo "Hace 2 días" y el nivel de urgencia
