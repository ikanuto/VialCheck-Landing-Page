Feature: Validación de campos obligatorios en el formulario de reporte
  Como un usuario de la aplicación móvil de VialCheck
  Quiero que el sistema valide los datos del formulario antes de procesarlos
  Para evitar el envío de reportes incompletos o erróneos a la municipalidad

  Scenario: Intento de envío de reporte sin adjuntar la evidencia fotográfica obligatoria (Unhappy Path)
    Given que el usuario se encuentra completando el formulario de "Nuevo Reporte"
    When el usuario presiona el botón "Detectar mi ubicación actual"
    And selecciona la categoría "Semáforos y Señales"
    And deja el área de carga de fotografía completamente vacía
    And presiona el botón naranja "Enviar Reporte"
    Then el sistema debe bloquear el envío del formulario
    And la aplicación debe mostrar un mensaje de error en color rojo que indique "Error: Campos incompletos"

  Scenario: Error en el ingreso de datos de texto por caracteres inválidos (Unhappy Path)
    Given que el usuario está llenando los campos de texto del formulario
    When ingresa caracteres especiales no permitidos en el campo de descripción
    And presiona el botón "Enviar Reporte"
    Then la aplicación debe resaltar el borde del campo de entrada en color rojo
    And debe mostrar un mensaje dinámico debajo indicando que el formato es incorrecto
