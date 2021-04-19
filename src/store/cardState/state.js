export default function () {
  return {
    //Lista de los principales arreglos que se usan en la aplicacion 
    Reportes: [],
    ReportesAux: [],
    Usuarios: [],
    UsuariosAux: [],
    Equipos: [],
    EquiposAux: [],
    Mantenimientos: [],
    MantenimientosAux: [],
    Estadisticas: [],

    // Actualmente seleccionados en la app
    EquipoSelected: [],
    MantenimientoSelected: [],
    UserSelected: [],
    IDEM: '',
    MaintenanceSectionSelected: '', //obj de fecha de section de los mantenimientos
    ReportSectionSelected: '', //obj de fecha de section de los mantenimientos
    StatisticSectionSelected: '', //obj de fecha de section de las estadisticas


    // Paginaciones    
    LastEvaluatedKey: '',
    LastEvaluatedKeyUsers: '',
    LastEvaluatedKeyReports: '',
    LastEvaluatedKeyMaintenances: ''
  }
}
