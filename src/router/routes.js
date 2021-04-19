const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '/',
      component: () => import('pages/LoginPage.vue')
    }, {
      path: '/Home',
      component: () => import('pages/CardsPage.vue')
    },
    {
      path: '/EquipmentCreate',
      component: () => import('pages/EquipmentCreate.vue')
    },
    {
      path: '/MaintenanceList',
      component: () => import('pages/MaintenanceList.vue')
    },
    {
      path: '/MaintenanceCreate',
      component: () => import('pages/MaintenanceCreate.vue')
    },
    {
      path: '/MaintenanceDetail',
      component: () => import('pages/MaintenanceDetail.vue')
    },
    {
      path: '/EquipmentDetail',
      component: () => import('pages/EquipmentDetail.vue')
    },
    {
      path: '/UserCards',
      component: () => import('pages/UserCards.vue')
    },
    {
      path: '/CreateUser',
      component: () => import('pages/CreateUser.vue')
    },
    {
      path: '/UserDetail',
      component: () => import('pages/UserDetailPage.vue')
    },
    {
      path: '/Statistics',
      component: () => import('pages/Statistics.vue')
    },
    {
      path: '/Calendar',
      component: () => import('pages/MaintenancesCalendar.vue')
    },
    {
      path: '/ReportsList',
      component: () => import('pages/ReportsList.vue')
    },
    {
      path: '/AllMaintenanceList',
      component: () => import('pages/AllMaintenanceList.vue')
    },
    {
      path: '/AllReportsList',
      component: () => import('pages/AllReportsList.vue')
    },
    {
      path: '/MaintenanceSection',
      component: () => import('pages/MaintenanceSectionPage.vue')
    },
    {
      path: '/StatisticsSection',
      component: () => import('pages/StatisticsSectionPage.vue')
    },
    {
      path: '/MaintenanceSectionEquipment',
      component: () => import('pages/MaintenanceSectionEquipmentPage.vue')
    },
    {
      path: '/ReportsSection',
      component: () => import('pages/ReportsSectionPage.vue')
    },
    {
      path: '/ReportsEquipmentSection',
      component: () => import('pages/ReportsSectionEquipmentPage.vue')
    }
  ]
},

// Always leave this as last one,
// but you can also remove it
{
  path: '*',
  component: () => import('pages/Error404.vue')
}
]

export default routes
