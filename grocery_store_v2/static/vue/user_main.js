import user_navbar from "./user_components/user_navbar.js"
import user_home from "./user_components/user_home.js"
import ftr from "./components/footer.js"
import store from "./store/store.js"
import user_cart from "./user_components/user_cart.js"
import user_category from "./user_components/user_category.js"
import user_products from "./user_components/user_products.js"
import user_profile from "./user_components/user_profile.js"
import my_orders from "./user_components/my_orders.js"
import pro_cat from "./user_components/user_pro_in_cat.js"
import user_checkout from "./user_components/user_checkout.js"
import user_buy from "./user_components/user_buy.js"
import user_search from "./user_components/user_search.js"
import not_found from "./not_found.js"



const router = new VueRouter({
    routes:[
        {path:'/', name:'user home', component:user_home},
        {path:'/category', name:'user category', component:user_category},
        {path:'/product', name: 'user product', component:user_products},
        {path:'/my_orders', name:'user orders', component:my_orders},
        {path:'/cart', name:'user cart', component:user_cart},
        {path:'/profile', name:'user profile', component:user_profile},
        {path:'/category/:id/:name', name:'product in category', component:pro_cat},
        {path:'/checkout', name:'user checkout', component:user_checkout},
        {path:'/buy', name:'user buy', component:user_buy},
        {path:'/search', name:'user search', component: user_search},
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
        ftr, user_navbar,
    },
    
})