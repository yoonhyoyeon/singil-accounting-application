import Vue from 'vue';
import Router from 'vue-router';
import Enter from '@/spa/Enter/Enter';
import Views from '@/spa/Views/Views';
import SalesOverall from '@/spa/SalesOverall/SalesOverall';
import SalesList from '@/spa/SalesList/SalesList';
import SalesCard from '@/spa/SalesCard/SalesCard';
import SalesTmoney from '@/spa/SalesTmoney/SalesTmoney';
import SalesCashbee from '@/spa/SalesCashbee/SalesCashbee';
import WarehousingOverall from '@/spa/WarehousingOverall/WarehousingOverall';
import WarehousingManage from '@/spa/WarehousingManage/WarehousingManage';
import SyncAstems from '@/spa/SyncAstems/SyncAstems';
import SyncYeosin from '@/spa/SyncYeosin/SyncYeosin';
import AccountInfo from '@/spa/AccountInfo/AccountInfo';
import LinkInfo from '@/spa/LinkInfo/LinkInfo';
import AccountPassChange from '@/spa/AccountPassChange/AccountPassChange';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Enter',
      component: Enter,
      beforeEnter: (to, from, next) => {
        console.log(this.a.app.$session.getAll())
        const auth = this.a.app.$session.get('accessToken')
        // 인증 상태 검사
        if(!auth) { // 인증 X
          next();
        }
        else { // 인증 O
          next('/views');
        }
      }
    },
    {
      path: '/views',
      name: 'views',
      component: Views,
      redirect: '/views/salesoverall',
      children: [
        {
          path: 'salesoverall',
          component: SalesOverall
        },
        {
          path: 'saleslist',
          component: SalesList
        },
        {
          path: 'salescard',
          component: SalesCard
        },
        {
          path: 'salestmoney',
          component: SalesTmoney
        },
        {
          path: 'salescashbee',
          component: SalesCashbee
        },
        {
          path: 'warehousingoverall',
          component: WarehousingOverall
        },
        {
          path: 'warehousingmanage',
          component: WarehousingManage
        },
        {
          path: 'syncastems',
          component: SyncAstems
        },
        {
          path: 'syncyeosin',
          component: SyncYeosin
        },
        {
          path: 'linkinfo',
          component: LinkInfo,
        },
        {
          path: 'accountinfo',
          component: AccountInfo
        },
        {
          path: 'accountpasschange',
          component: AccountPassChange
        },
      ],
      beforeEnter: (to, from, next) => {
        console.log(this.a.app.$session.getAll())
        const auth = this.a.app.$session.get('accessToken')
        // 인증 상태 검사
        if(auth) { // 인증 O
          next();
        }
        else { // 인증 X
          next('/');
        }
      }
    },
  ],
})
