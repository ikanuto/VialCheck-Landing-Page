Feature: Panel administrativo municipal y flujo de trabajo de mantenimiento
  Como un operador público de gestión de mantenimiento urbano
  Quiero acceder a un portal web seguro para priorizar reportes críticos y asignar cuadrillas
  Para optimizar los tiempos de respuesta de reparación y hacer seguimiento de las obras

  Scenario: Autenticación segura de la autoridad y carga de datos en el panel (Happy Path)
    Given que un funcionario municipal abre la página de inicio de sesión del portal web de VialCheck
    When el funcionario ingresa un correo institucional válido "ejemplo@municipio.gob.pe"
    And el usuario ingresa la contraseña segura correcta
    And el usuario hace clic en el botón naranja "Ingresar"
    Then el sistema debe autorizar el acceso y cargar el panel administrativo principal
    And la interfaz debe mostrar una tabla de datos interactiva con los últimos 20 registros ciudadanos
