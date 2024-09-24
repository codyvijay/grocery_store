export default{
    name:'navbar',
    template : `
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
                <router-link to="/" type='button' class="btn">Home</router-link>
            </li>
            </ul>
            <div class="d-flex py-2" id="sign in" @click="check">
            <router-link to="/login" type="button" class="btn btn-primary me-1">
            LogIn   
            </router-link>
            </div>
            <div class="d-flex py-2" id="register" @click="check">
                <router-link to="/register" type="button" class="btn btn-success me-1">
                Register  
                </router-link>
            </div>
        </div>
    </div>
</nav>

`,

methods:{
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