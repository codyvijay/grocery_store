
import navbar from "./admin_components/navbar.js"
import admin from "./admin_components/admin.js"
import ftr from "./components/footer.js"
import managers from "./admin_components/managers.js"
import category from "./admin_components/category.js"
import profile from "./admin_components/profile.js"
import store from "./store/store.js"
import requests from './admin_components/requests.js'
import not_found from "./not_found.js"


const router = new VueRouter({
    routes:[
        {path:'/', name:'admin', component:admin},
        {path:'/category', name:'category', component:category},
        {path:'/managers', name:'managers', component:managers},
        {path:'/profile', name:'profile', component:profile},
        {path:'/requests', name:'requests', component:requests},
        {path:'*', name:'Not Found', component:not_found}
        
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
        ftr, navbar,
    },
    
})

