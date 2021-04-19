export function updateFilter(state, typeSearch) {
      state.TypeSearch = typeSearch
}
export function updateFilterUser(state, typeSearchUser) {
      state.TypeSearchUser = typeSearchUser
}
export function updateActividades(state, a) {
      state.Actividades = a
}
export function updateMateriales(state, m) {
      state.Materiales = m
}
export function updateCantidades(state, c) {
      state.Cantidades = c
}
export function updateObservaciones(state, o) {
      state.Observaciones = o
}
export function updateHerramientas(state, h) {
      state.Herramientas = h
}
export function updateUsuario(state, u) {
      state.Usuario = u
}
export function updateSteps(state, st) {
      state.Steps = st
}

//Las flags son un objeto de flags globales .reporte nos dice si un reporte deberia ser verificado automaticamente
export function updateFlags(state, f) {
      state.Flags = f
}




