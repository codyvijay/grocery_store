import manager_home from './manager_components/manager_home.js'
import manager_navbar from './manager_components/manager_navbar.js'
import ftr from "./components/footer.js"
import manager_products from "./manager_components/manager_products.js"
import manager_categories from "./manager_components/manager_categories.js"
import orders from "./manager_components/orders.js"
import manager_profile from "./manager_components/manager_profile.js"
import store from './store/store.js'
import manager_requests from './manager_components/manager_requests.js'
import manager_search from './manager_components/manager_search.js'
import not_found from './not_found.js'


const router = new VueRouter({
    routes:[
        {path:'/', name:'manager home', component:manager_home},
        {path:'/category', name:'manager categories', component:manager_categories},
        {path:'/products', name:'manager products', component:manager_products},
        {path:'/orders', name:'manager orders', component:orders},
        {path:'/profile', name:'manager profile', component:manager_profile},
        {path:'/requests', name: 'manager request', component:manager_requests},
        {path:'/search', name: 'manger search', component:manager_search},
        {path:'*', name:'Not found', component:not_found}

        
    ],

    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
      },
})


new Vue({
    el:'#app',
    router,
    store,
    components :{
        ftr, manager_navbar,
    }
    
})