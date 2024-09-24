export default{
  name:'home',
    template:`<div>
    <div class="card-group">
      <div class="col">
        <div class="d-flex justify-content-center">
          <img src="/static/img/test.png" class="alpha"> 
        </div>
        
      </div>
      <div class="col">
        <div class="d-flex justify-content-center">
          <img src="/static/img/test2.png" class="beta">
        </div>
      </div>
    </div>

    
    <div class="row">
      <div class="d-flex justify-content-center pb-5">
        <div class="btn-group" role="group">
          <div class="p-2"><router-link to='/login' class="btn btn-primary p-3">LogIn</router-link></div>
          <div class="p-2"><router-link to='/register' class="btn btn-success p-3" >Register</router-link></div>
        </div>
      </div>
    </div>
  </div>`,

  mounted(){
    document.title='Home Page'
  }
}