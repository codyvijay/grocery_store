export default{
  name:'admin_navbar',
    template:`<nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary p-3">
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
            <router-link to='/managers' class="nav-link">Managers</router-link>
          </li>
          <li class="nav-item" @click="check">
            <router-link to='/requests' class="nav-link">Requests</router-link>
          </li>
        </ul>
       
        <div class="me-3" @click="check"> 
          <router-link to='/profile' class="btn">Admin</router-link>
        </div>

        <div>
          <button class="btn btn-outline-danger" @click='logout'>
          <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show='loading'></span>
          Log out</button>
        </div>
      </div>
    </div>
  </nav>`,

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
  }
}