import axios from 'axios';
export default class service {

  static endpoint = "https://gxmbd43v2c.execute-api.us-east-1.amazonaws.com/prod1/Equipo";
  static endpointGetBySection = "https://5jsnk7xft1.execute-api.us-east-1.amazonaws.com/prod1/Mantenimientos";
  static endpointMant = "https://mas4zhpar9.execute-api.us-east-1.amazonaws.com/v2/Mantenimiento/equipo";
  static endpointUser = "https://y6y4p1mcb5.execute-api.us-east-1.amazonaws.com/prod1/Usuario";
  static endpointStepper = "https://flpzxhsyx2.execute-api.us-east-1.amazonaws.com/prod1/Instructivo";
  static endpointCreateReport = "https://qorte6xs53.execute-api.us-east-1.amazonaws.com/prod1/Reportes";
  static endpointReport = "https://mqxn2jw3zf.execute-api.us-east-1.amazonaws.com/v2/Reporte/equipo"
  static endpointStatistic = "https://dpvid1oioc.execute-api.us-east-1.amazonaws.com/prod1/Estadisticas"

  //Obtiene todos los equipos
  static getEquipments() {
    return axios.get(
      service.endpoint,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        }
      }
    );
  }


  //Obtiene mas equipos
  static getMoreEquipments(obj) {
    console.log(obj)
    return axios.get(
      `${service.endpoint}/pag/${obj}`,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        },
      }
    );
  }


  //Obtiene mas usuarios
  static getMoreUsers(obj) {
    return axios.get(
      `${service.endpointUser}/pag/${obj}`,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        },
      }
    );
  }




  //Obtiene mas mantenimientos
  static getMoreMaintenances(obj) {
    console.log(obj)
    return axios.get(
      `${service.endpointGetBySection}/pag/${obj}`,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        },
      }
    );
  }
  /*Obtiene mas equipos
  static getEquipmentsByParameter(obj) {
    console.log(obj)
    return axios.get(
      `${service.endpoint}/${obj.byParameter}/${obj.parameter}`,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        },
      }
    );
  }
*/
  //Obtiene todos los usuarios
  static getUsers() {
    return axios.get(service.endpointUser, {
      headers: {
        "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
      }
    });
  }

  //Obtiene todos los mantenimientos
  static getAllMantenances(obj) {
    return axios.get(`${service.endpointGetBySection}/${obj.Año}-${obj.Mes}`, {
      headers: {
        "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
      }
    });
  }

  //Obtiene todos los reportes por mes y año
  static getAllReports(obj) {
    return axios.get(`${service.endpointCreateReport}/${obj.Año}-${obj.Mes}`, {
      headers: {
        "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
      }
    });
  }

  //Obtiene los equipos por id 
  static getEquipmentById(idEquipo) {
    return axios.get(`${service.endpoint}/${idEquipo}`, {
      headers: {
        "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
      }
    });
  }

  //Obtiene todos los mantenimientos de un equipo
  static getMantenances(id) {
    return axios.get(`${service.endpointMant}/${id}`, {
      headers: {
        "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
      }
    });
  }



  //Obtiene los pasos para el uso de un equipo
  static getSteps(id) {
    return axios.get(`${service.endpointStepper}/${id}`, {
      headers: {
        "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
      }
    });
  }


  //Obtiene los grupos de estadisticas por mes
  static getStatistics(obj) {
    return axios.get(`${service.endpointStatistic}/${obj.Año}-${obj.Mes}`, {
      headers: {
        "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
      }
    });
  }

  //crea un nuevo equipo
  static createEquipment(equipo) {
    return axios.post(
      service.endpoint,
      equipo,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        }
      }
    );
  }

  static createMaintenance(mantenimiento) {
    return axios.post(
      service.endpointGetBySection,
      mantenimiento,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        }
      }
    );
  }

  static createReport(reporte) {
    return axios.post(
      service.endpointCreateReport,
      reporte, {
      headers: {
        "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
      }
    }
    );
  }

  static createUser(user) {
    return axios.post(
      service.endpointUser,
      user,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        }
      }
    );
  }

  static createStep(STEP) {
    return axios.post(
      service.endpointStepper,
      STEP,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        }
      }
    );
  }

  //Crear un grupo de estadisticas 
  static createStatistic(statistic) {
    return axios.post(
      service.endpointStatistic,
      statistic,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        }
      }
    );
  }

  static updateEquipment(idEquipo, equipo) {
    console.log(idEquipo)
    return axios.patch(
      `${service.endpoint}/${idEquipo}`,
      equipo,
      {
        headers: {
          'Content-Type': 'application/json',
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"

        }
      }
    );
  }

  static updateReport(reporte) {
    console.log(reporte)
    return axios.patch(
      service.endpointCreateReport,
      reporte,
      {
        headers: {
          'Content-Type': 'application/json',
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB"
        }
      }
    );
  }

  static updateUser(idusuario, usuario) {
    return axios.patch(
      `${service.endpointUser}/${idusuario}`,
      usuario,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB",
          'Content-Type': 'application/json'
        }
      }
    );
  }

  //Update Step
  static updateStep(STEP) {
    return axios.patch(
      `${service.endpointStepper}/${STEP.ID_Equipo}`,
      STEP,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB",
          'Content-Type': 'application/json'

        }
      }
    );
  }

  //Delete step
  static deleteStep(ID_Equipo) {
    return axios.delete(
      `${service.endpointStepper}/${ID_Equipo}`,
      {
        headers: {
          "x-api-key": "x1BFY70CR52pPiERZcByx7YJ1JWHNMUA4iB4USRB",
          'Content-Type': 'application/json'
        }
      }
    );
  }
}