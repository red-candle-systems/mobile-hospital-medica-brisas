(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"34a7":function(t,e,a){"use strict";a("bd99")},"79d3":function(t,e,a){"use strict";a("ce96")},aaa5:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"q-pa-md"},[s("q-layout",{attrs:{id:"q-app-2",view:"lHh Lpr lFf"}},[s("q-header",{staticClass:"glossy",class:t.drawerState?" bg-Mycolor":"bg-primary",staticStyle:{height:"150px","border-radius":"0 0 1rem 1rem"}},[s("q-toolbar",{staticClass:"justify-center"},[s("q-img",{staticClass:"shadow-7",staticStyle:{"margin-top":"0.5rem",height:"60px",width:"100%","border-radius":"0.5rem"},attrs:{basic:"",src:a("5dfc")}}),s("div",{staticClass:"fixed-top-right"},[s("UserAccount")],1)],1),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-2 col-2"},[s("q-img",{staticClass:"fixed-top-left",staticStyle:{height:"4.1rem",width:"4.1rem",margin:"0.4rem","border-radius":"0.5rem"},attrs:{basic:"",src:a("67dc")}}),s("q-btn",{staticClass:"fixed-top-left",staticStyle:{height:"4.1rem",width:"4.1rem",margin:"0.4rem","border-radius":"0.5rem"},attrs:{to:"/Home"}})],1),s("div",{staticClass:"col-12",staticStyle:{"text-align":"center","margin-top":"-0.8rem"}},[s("h5",{staticStyle:{padding:"0.5rem",margin:"2rem 1rem 0rem 1rem","border-radius":"0.5rem","background-color":"#193d5c"}},[t._v("\n            Reportes\n          ")])])])],1),s("q-page-container",[s("ReportsTable"),s("br")],1)],1)],1)},r=[],o=a("3a8f"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("q-table",{staticStyle:{width:"100%"},attrs:{title:"Lista de reportes",data:t.data,columns:t.columns,"row-key":"Fecha",loading:t.loading,pagination:t.initialPagination},scopedSlots:t._u([{key:"loading",fn:function(){return[1==t.loading?a("q-spinner-cube",{staticClass:"self-center",staticStyle:{margin:"1rem"},attrs:{indeterminate:"",showing:"",reverse:"",size:"70px",thickness:1,color:t.drawerState?"white":"primary","track-color":"light-blue"}}):t._e()]},proxy:!0},{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e},on:{click:function(a){return t.SelectEquipo(e.row)}}},[a("q-td",{key:"Reporte"},[a("div",{staticClass:"my-table-details"},[t._v("\n            "+t._s(e.row.Reporte)+"\n          ")])]),a("q-td",{key:"Fecha"},[a("div",{staticClass:"my-table-details"},[t._v("\n            "+t._s(e.row.Fecha)+"\n          ")])]),a("q-td",{key:"Dia"},[a("div",{staticClass:"my-table-details"},[t._v("\n            "+t._s(e.row.Dia)+"\n          ")])]),a("q-td",{key:"Status",attrs:{props:e}},[a("q-btn-toggle",{staticClass:"my-custom-toggle",attrs:{"no-caps":"",rounded:"",disable:!e.row.Status,unelevated:"",size:"sm","toggle-color":"primary",color:"white","text-color":"primary",options:[{label:"Pendiente",value:!0},{label:"Verificado",value:!1}]},on:{click:function(a){return t.ChangeStatus(e.row)}},model:{value:e.row.Status,callback:function(a){t.$set(e.row,"Status",a)},expression:"props.row.Status"}})],1)],1)]}}])})],1)},n=[],l=(a("e6cf"),a("5d36")),c={data(){return{alert:!1,loading:!0,initialPagination:{rowsPerPage:50},columns:[{Reporte:"Reporte",align:"left",label:"Reporte",field:"Reporte",sortable:!0},{Fecha:"Fecha",align:"left",label:"Año - Mes",field:"Fecha",sortable:!0},{name:"Dia",align:"left",label:"Dia - hora",field:"Dia",sortable:!0},{name:"Status",align:"left",label:"Estatus",field:"Status",sortable:!0}],data:[]}},created(){this._getReports()},methods:{async _getReports(){try{await this.$store.dispatch("cardState/getReportsByIdAction",this.IDEM),this.$data.data=this.Reportes}catch(t){this.$q.notify({color:"red",textColor:"white",icon:"search_off",message:"Error cargando los reportes para este equipo "+t})}await this.data.forEach(((t,e)=>{t.index=e})),0==this.data.length?(this.loading=!1,this.$q.notify({color:"blue-10",textColor:"white",icon:"search_off",timeout:1e3,message:"Aun no hay reportes para este equipo"})):this.loading=!1},async ChangeStatus(t){if(1==this.Usuario.rol||2==this.Usuario.rol){var e={Fecha:t.Fecha,Dia:t.Dia,Status:t.Status};try{await l["a"].updateReport(e)}catch(a){}}},SelectEquipo(t){if(t.Status){var e=t,a={reporte:e,lastRoute:this.$router.currentRoute.path};this.Flags=a,this.$router.push({path:"/MaintenanceCreate/"}),this.$q.notify({color:"orange",textColor:"white",icon:"notification_important",message:"Deberías realizar un mantenimiento de tipo correctivo"})}}},computed:{IDEM:{get(){return this.$store.state.cardState.IDEM},set(t){this.$store.commit("cardState/updateIDEM",t)}},Usuario:{get(){return this.$store.state.global.Usuario},set(t){this.$store.commit("global/updateUsuario",t)}},Flags:{get(){return this.$store.state.global.Flags},set(t){this.$store.commit("global/updateFlags",t)}},Reportes:{get(){return this.$store.state.cardState.Reportes},set(t){this.$store.commit("updateReportes",t)}},drawerState:{get(){return this.$store.state.showcase.drawerState?this.$q.dark.set(!0):this.$q.dark.set(!1),this.$store.state.showcase.drawerState},set(t){this.$store.commit("showcase/updateDrawerState",t)}}}},d=c,u=(a("34a7"),a("2877")),h=a("eaac"),p=a("a6a3"),m=a("bd08"),g=a("db86"),b=a("6a67"),w=a("eebe"),f=a.n(w),y=Object(u["a"])(d,i,n,!1,null,null,null),S=y.exports;f()(y,"components",{QTable:h["a"],QSpinnerCube:p["a"],QTr:m["a"],QTd:g["a"],QBtnToggle:b["a"]});var $={name:"EquipmentDetail",components:{UserAccount:o["a"],ReportsTable:S},data(){return{leftDrawerOpen:!1,alert:!1,seleccionado:0,home:!1,basic:!1,fixed:!1,reporte:""}},methods:{MaintenanceCreate(){1!=this.Usuario.rol&&2!=this.Usuario.rol||this.$router.push({path:"/MaintenanceCreate/"}),3!=this.Usuario.rol||this.$q.notify({position:"bottom",timeout:2500,textColor:"white",type:"warning",message:"No tienes los permisos para crear un Mantenimiento"})},obtenerSeleccionado(){1!=this.Usuario.rol&&2!=this.Usuario.rol||(this.fixed=!0,this.reporte=this.ReportSelected[0].Reporte,0===this.ReportSelected.length&&this.$q.notify({position:"bottom",timeout:2500,textColor:"white",color:"yellow-10",message:"Seleccione un mantenimiento de la lista!!"})),3!=this.Usuario.rol||this.$q.notify({position:"bottom",timeout:2500,textColor:"white",color:"yellow-10",message:"No tienes los permisos para ver un Mantenimiento"})}},computed:{ReportSelected:{get(){return this.$store.state.cardState.ReportSelected}},drawerState:{get(){return this.$store.state.showcase.drawerState?this.$q.dark.set(!0):this.$q.dark.set(!1),this.$store.state.showcase.drawerState},set(t){this.$store.commit("showcase/updateDrawerState",t)}},Usuario:{get(){return this.$store.state.global.Usuario},set(t){this.$store.commit("global/updateUsuario",t)}}}},q=$,C=(a("79d3"),a("4d5a")),v=a("e359"),R=a("65c6"),x=a("068f"),k=a("9c40"),_=a("09e3"),D=Object(u["a"])(q,s,r,!1,null,null,null);e["default"]=D.exports;f()(D,"components",{QLayout:C["a"],QHeader:v["a"],QToolbar:R["a"],QImg:x["a"],QBtn:k["a"],QPageContainer:_["a"]})},bd99:function(t,e,a){},ce96:function(t,e,a){}}]);