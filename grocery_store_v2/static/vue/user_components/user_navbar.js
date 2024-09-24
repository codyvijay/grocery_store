export default{
  name:'user_navbar',
    template:`
    <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary p-3">
      <div class="container-fluid ">
        <div @click="check">
          <router-link to="/" class="navbar-brand">DailyBread</router-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item" @click="check">
                <router-link to="/category" class="nav-link" aria-current="page">Categories</router-link>
                </li>
                <li class="nav-item" @click="check">
                <router-link to="/product" class="nav-link">Products</router-link>
                </li>
                <li class="nav-item" @click="check"> 
                <router-link to="/my_orders" class="nav-link">My Orders</router-link>
                </li>
            </ul>

            <div class="p-1" @click="check">
              <router-link to="/search" class="btn btn-outline-success">
                  Search
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
              </router-link>
            </div>

            
            <div @click="check"> 
                <router-link to="/profile" class="btn"> {{user.email}}</router-link>
            </div>
           
      
            <div class="p-1">
                <button class="btn btn-outline-danger" @click='logout'>
                <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show='logout_loading'></span>
                Log out</button>
            </div>

            <div class="p-1" @click="check">
    
              <router-link to="/cart"  type="button" class="btn btn-success position-relative">
                <div id="badge_cart">
                  <div v-show="!not_carted">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {{cart.length}}
                      <span class="visually-hidden">Items in Cart</span>
                    </span>
                  </div>
                  
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket-fill" viewBox="0 0 16 16">
                  <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z"></path>
                </svg>
                Cart
              </router-link>
            </div>
        </div>
      </div>
    </nav>
    
    `,

    data(){
        return{ logout_loading:false,
    
        }
      },
    
      methods: {
        logout(){
          this.logout_loading=true,
          
          fetch('/logout').then(()=>{
            localStorage.removeItem('auth-token')
            window.location.href='/'
          }).finally(()=>{
            this.logout_loading=false
            
          })
    
        },

        check(){
          const nav_button=document.querySelector('.navbar-toggler')
          if(nav_button){
              const expanded=nav_button.getAttribute('aria-expanded')
              if(expanded=='true'){
                  $(".navbar-toggler").click();
              }
          }
  
      }
      },

      computed : {
        user : function () {
            return this.$store.getters.get_user;
        },

        cart: function(){
          return this.$store.getters.get_cart;
        },

        not_carted:function(){
            return this.cart.length==0
        }

      },

      mounted: function(){
       this.$store.dispatch('fetchUser')
       this.$store.dispatch('fetchcart')

      }
}