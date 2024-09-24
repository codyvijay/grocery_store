export default{
  name:'manager_navbar',
    template: `
    <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary p-3">
    <div class="container-fluid">
      <div @click="check">
        <router-link to='/' class="navbar-brand">DailyBread</router-link>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" @click="check">
            <router-link to='/category' class="nav-link" aria-current="page">Categories</router-link>
          </li>
          <li class="nav-item" @click="check">
            <router-link to='/products' class="nav-link">Products</router-link>
          </li>
          <li class="nav-item" @click="check">
            <router-link to='/orders' class="nav-link">Orders</router-link>
          </li>
          <li class="nav-item" @click="check">
            <router-link to='/requests' class="nav-link">Requests</router-link>
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
       
        <div class="me-3" @click="check"> 
          <router-link to='/profile' class="btn">{{user.email}}</router-link>
        </div>

        <div class="p-1">
          <button class="btn btn-outline-danger" @click='logout'>
          <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show='loading'></span>
          Log out</button>
        </div>
      </div>
    </div>
  </nav>
    `,

    data(){
        return{ loading:false,
    
        }
      },
    
      methods: {
        logout(){
          this.loading=true,
          
          fetch('/logout').then(()=>{
            localStorage.removeItem('auth-token')
            window.location.href='/'
          }).finally(()=>{
            this.loading=false
            
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
        }
      },

      mounted: function(){
      return this.$store.dispatch('fetchUser')

      }
}