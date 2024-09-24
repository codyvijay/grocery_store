import login from "./components/login.js"
import home from "./components/home.js"
import register from "./components/register.js"
import ftr from './components/footer.js'
import navbar from './components/navbar.js'
import not_found from './not_found.js'

const router = new VueRouter({
    routes:[
        {path:'/', name:'home', component:home},
        {path:'/login', name:'login', component:login},
        {path:'/register',  name:'register', component:register},
        {path:'*', name:'Not Found', component:not_found}
    ],

    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
      },
})

new Vue({
    el:'#app',
    router,
    components :{
        ftr, navbar, home, register, login,
    },
    
})