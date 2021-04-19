import service from '../../apiservice/service.js' //  Obtener todos los equipos desde la api
var equipos = []    //  variable global de los equipos para uso exclusico en las actions
var mantenimientos = []  //variable global de los mantenimientos para uso exclusico en las actions
var estadisticas = []  //variable global de los mantenimientos para uso exclusico en las actions
var reportes = []  //variable global de los reportes para uso exclusico en las actions
var usuarios = []  //variable global de los usuarios para uso exclusico en las actions

var ArrayStatistics = [
    {
        Cantidad: 0,
        Numero: 1,
    },
    {
        Cantidad: 0,
        Numero: 2,
    },
    {
        Cantidad: 0,
        Numero: 3,
    },
    {
        Cantidad: 0,
        Numero: 4,
    },
    {
        Cantidad: 0,
        Numero: 5,
    },
]

///////////////////////////////  GET   //////////////////////////////////////////////////////

//Obtener todos los equipos desde la api
export async function getEquipmentsAction({ commit, dispatch }) {
    const response = await service.getEquipments();
    equipos = response.data.Items;

    if (response.data.LastEvaluatedKey != undefined) {
        var lastEK = response.data.LastEvaluatedKey;
        //console.log("Esta es la llave", lastEK);
        commit("updateLastEvaluatedKey", lastEK.ID_Equipo)
        commit("updateEquipmentsAux", equipos)
        commit("updateEquipments", equipos)
        //await dispatch("getMoreEquipmentsAction")
    }
    else {
        commit("updateEquipmentsAux", equipos)
        commit("updateEquipments", equipos)
        commit("updateLastEvaluatedKey", "")
    }

}
//obtener todos los mantenimientos de la api
export async function getMaintenancesAction({ commit, state }) {
    console.log("esta es la fecha: ", state.MaintenanceSectionSelected)

    const response = await service.getAllMantenances(state.MaintenanceSectionSelected);
    mantenimientos = response.data;
    console.log(mantenimientos)
    commit("updateMaintenancesAux", mantenimientos)
    commit("updateMaintenances", mantenimientos)
}
//obtener todos las estadisticas de la api
export async function getStatisticsAction({ commit, state }) {
    //console.log(state.StatisticSectionSelected, "Este es el obj en la accion")
    const response = await service.getStatistics(state.StatisticSectionSelected);
    estadisticas = response.data;
    //console.log(estadisticas);
    commit("updateStatistics", estadisticas);
    //console.log(state.Estadisticas, "El state de las estadisticas en las acciones")
}
//Obtener todos los reportes desde la api
export async function getReportsAction({ commit, state }) {
    const response = await service.getAllReports(state.ReportSectionSelected);
    //console.log("los reportes en las acciones", response.data)
    var reportes = response.data;
    commit("updateReportes", reportes)
    commit("updateReportesAux", reportes)
}
//Obtener todos los usuarios desde la api
export async function getUsersAction({ commit }) {
    var response = await service.getUsers();
    usuarios = response.data.Items;
    commit("updateUsers", usuarios)
    commit("updateUsersAux", usuarios)
}

///////////////////////////////  GET   //////////////////////////////////////////////////////







///////////////////////////////  GETBYID   //////////////////////////////////////////////////////
//obtener todos los mantenimientos por id de equipo de la api
export async function getMaintenancesByIdAction({ commit, state }, IdEquipo) {
    const response = await service.getAllMantenances(state.MaintenanceSectionSelected);

    mantenimientos = response.data;
    var man = mantenimientos.filter((e) =>
        e.ID_Equipo == IdEquipo
    );
    commit("updateMaintenancesAux", man)
    commit("updateMaintenances", man)

    //console.log(man)
}
//obtener todos los reportes por id del equipo de la api
export async function getReportsByIdAction({ commit, state }, IdReporte) {
    const response = await service.getAllReports(state.ReportSectionSelected);
    reportes = response.data;
    var reportes = reportes.filter((r) =>
        r.ID_Equipo == IdReporte
    );

    commit("updateReportes", reportes)
    commit("updateReportesAux", reportes)
    //console.log("Los reporte sen la accion", reportes)
}
///////////////////////////////  GETBYID   //////////////////////////////////////////////////////
























///////////////////////////////  POST   //////////////////////////////////////////////////////
//Crear un reporte en la api
export async function postReportAction(context, reporte) {
    const response = await service.createReport(reporte);/* add nuevo a la api*/
    reportes = [...context.state.Reportes]               /* llenamos con los actuales del state*/
    reportes.push(response.data)                         /* add nuevo a var local*/
    context.commit("updateReportes", reportes)           /* llenamos state*/
    context.dispatch("postStatisticAction");             // HACER ESTADISTICAS
}

//Crear un equipo en la api
export async function postEquipmentAction(context, equipo) {
    const response = await service.createEquipment(equipo);/*add nuevo a la api*/
    equipos = [...context.state.Equipos]                   /*llenamos con los actuales del state*/
    equipos.push(response.data)                            /*add nuevo a var local*/
    context.commit("updateEquipments", equipos)            /*llenamos state*/
    context.commit("updateEquipmentsAux", equipos)         /*llenamos state auxiliar*/
    context.dispatch("postStatisticAction");             // HACER ESTADISTICAS
}

//Crear un mantenimiento en la api
export async function postMaintenanceAction(context, mantenimiento) {
    const response = await service.createMaintenance(mantenimiento);/*add nuevo a la api*/
    mantenimientos = [...context.state.Mantenimientos]                   /*llenamos con los actuales del state*/
    mantenimientos.push(response.data)                            /*add nuevo a var local*/
    context.commit("updateMaintenances", mantenimientos)            /*llenamos state*/
    context.commit("updateMaintenancesAux", mantenimientos)         /*llenamos state auxiliar*/
    context.dispatch("postStatisticAction");             // HACER ESTADISTICAS
}

// Crear una estadistica en la api
export async function postStatisticAction({ dispatch, state }) {
    console.log("ENTRAMOS A CREAR ESTADISTICAS");
    let mes; //Varibale del mes
    let length = new Date().getMonth().toString().length; //Obtenemos la longitud del mes actual
    //Le agregamos un cero a la izquierda en caso de ser necesario
    if (length == 1) {
        mes = "0" + (new Date().getMonth() + 1).toString();
    }
    //creamos el obj con el año y la fecha
    let obj = {
        Mes: mes,
        Año: new Date().getFullYear(),
    };
    // Hacemos las estadisticas de este mes
    await dispatch("doOperationsStatistics");
    //OBJ con la fecha y el año
    let estadisticaOBJ = {
        Fecha: obj.Año.toString() + '-' + obj.Mes,
        Estadisticas: state.Estadisticas
    }
    //Subir arreglo a la api
    console.log(estadisticaOBJ);
    const response = await service.createStatistic(estadisticaOBJ); /*add nuevo a la api*/
}

///////////////////////////////  POST   //////////////////////////////////////////////////////














///////////////////////////////  PUT   //////////////////////////////////////////////////////


///////////////////////////////  PUT   //////////////////////////////////////////////////////








///////////////////////////////  DELETE   //////////////////////////////////////////////////////


///////////////////////////////  DELETE   //////////////////////////////////////////////////////











/////////////////////////PAGINACIONES/////////////////////////////////////////////

//Obtener todos los equipos desde la api
export async function getMoreEquipmentsAction({ commit, dispatch, state }) {
    const response = await service.getMoreEquipments(state.LastEvaluatedKey);
    //console.log(response.data.Items);
    equipos = state.Equipos
    equipos = [...equipos, ...response.data.Items];
    //console.log("los equipos en total son ", equipos);
    if (response.data.LastEvaluatedKey != undefined) {
        var lastEK2 = response.data.LastEvaluatedKey.ID_Equipo;
        commit("updateEquipmentsAux", equipos)
        commit("updateEquipments", equipos)
        commit("updateLastEvaluatedKey", lastEK2);
        dispatch("getMoreEquipmentsAction")
    }
    else {

        commit("updateEquipmentsAux", equipos)
        commit("updateEquipments", equipos)
        commit("updateLastEvaluatedKey", "")

    }

}

/////////////////////////PAGINACIONES/////////////////////////////////////////////

/*
export async function searchEquipments({ commit, dispatch, state }, obj) {
    //console.log(obj.byParameter, obj.parameter)
    var ByPar = obj.byParameter
    if (ByPar == "Numero de Serie") ByPar = "Serie"
    obj.byParameter = ByPar
    try {
        const response = await service.getEquipmentsByParameter(obj);
        //console.log(response.data.Items);
        equipos = [...response.data.Items];

        if (equipos.length > 0) {
            commit("updateEquipments", equipos)
        }
        else {
            return 0
        }
    } catch (error) {
        //console.log(error);
    }
}*/

/////////////////////////  FUNCIONES GLOBALES  ///////////////////////////////////

//Verificar que si hay un back up de las estadisticas de este mes -1 en este año
export async function doOperationsStatistics({ dispatch, state, commit }) {
    //Declaracion de variables
    await dispatch("getEquipmentsAction");
    await dispatch("getMaintenancesAction");
    await dispatch("getReportsAction");

    console.log(state.Mantenimientos);

    /////////////////////// ACCIONES ASINCRONAS ////////////////
    let AtencionFalla = [], MantenimientosCorrectivos = [], EquiposInactivos = [], MantenimientosPreventivos = [], TotalReportes, ReemplazoDaño, FallaRepentina, MantenimientoVigente, CumplirProgramados, MantenimientosPreventivosProgramados = 0;
    TotalReportes = state.Reportes;

    for (var i = 0; i < state.Mantenimientos.length; i++) {
        if (state.Mantenimientos[i].Tipo_Mantenimiento === "Preventivo") {
            MantenimientosPreventivos.push(state.Mantenimientos[i]);
        } else if (
            state.Mantenimientos[i].Tipo_Mantenimiento === "Correctivo"
        ) {
            MantenimientosCorrectivos.push(state.Mantenimientos[i]);
        }
    }

    for (var i = 0; i < equipos.length; i++) {
        if (equipos[i].Estado_Servicio === false) {
            EquiposInactivos.push(equipos[i]);
        }
        let Month = new Date().getMonth() + 1;
        if ((Month).toString().length == 1) {
            Month = "0" + Month.toString();
        }
        if (equipos[i].Siguiente_Mantenimiento.slice(0, 7) == new Date().getFullYear().toString() + '-' + Month) {
            MantenimientosPreventivosProgramados += 1;
        }
    }

    //ATENCION POR FALLA 
    AtencionFalla = (MantenimientosCorrectivos.length / TotalReportes.length) * 100;
    AtencionFalla = AtencionFalla.toFixed(2);
    ArrayStatistics[0].Cantidad = parseFloat(AtencionFalla);

    //REEMPLAZO POR OBSOLENCIA O DAÑO
    ReemplazoDaño = (EquiposInactivos.length / equipos.length) * 100;
    ReemplazoDaño = ReemplazoDaño.toFixed(2);
    ArrayStatistics[1].Cantidad = parseFloat(ReemplazoDaño);

    //FALLA REPENTINA
    FallaRepentina = (MantenimientosCorrectivos.length / equipos.length) * 100;
    FallaRepentina = FallaRepentina.toFixed(2);
    ArrayStatistics[2].Cantidad = parseFloat(FallaRepentina);

    //CERTIFICADO DE MANTENIMEINTO VIGENTE
    MantenimientoVigente = (MantenimientosPreventivos.length / equipos.length) * 100;
    MantenimientoVigente = MantenimientoVigente.toFixed(2);
    ArrayStatistics[3].Cantidad = parseFloat(MantenimientoVigente);

    //CUMPLIMIENTO DE MANTENIMIENTOS PREVENTIVOS PROGRAMADOS
    CumplirProgramados = (MantenimientosPreventivos.length / MantenimientosPreventivosProgramados) * 100;
    CumplirProgramados = CumplirProgramados.toFixed(2);
    ArrayStatistics[4].Cantidad = parseFloat(CumplirProgramados);
    console.log(MantenimientosPreventivos.length, MantenimientosPreventivosProgramados);
    console.log(ArrayStatistics);

    commit("updateStatistics", ArrayStatistics);
}





























