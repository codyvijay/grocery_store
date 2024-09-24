export default{
  name:'admin_home',
    template:`<div>
    <h2 class="border-bottom p-4 d-flex justify-content-center">Dashboard</h2> 
    
    
    <div class="row row-cols-2">
          
            <div class="col-lg-2 p-3 card-body">
              <img src="static/img/categories.jpg" class="card-img-top admin-home-image" alt="...">
              <div class="">
                <h5 class="card-title">Categories</h5>
                <p class="card-text">Click here to view / Update / Delete categories</p>
                <router-link to="/category" class="btn btn-primary">Categories</router-link>
              </div>
            </div>

            <div class="col-lg-2 p-3 card-body ">
              <img src="static/img/managers.jpg" class="card-img-top admin-home-image" alt="...">
              <div class="">
                <h5 class="card-title">Managers</h5>
                <p class="card-text">Click here to view / approve / Delete managers</p>
                <router-link to="/managers" class="btn btn-primary">Managers</router-link>
              </div>
            </div>

            <div class="col-lg-2 p-3 card-body ">
              <img src="static/img/requests.jpg" class="card-img-top admin-home-image" alt="...">
            
              <div class="">
                <h5 class="card-title">Requests</h5>
                <p class="card-text">Click here to view / approve / Delete Requests</p>
                <router-link to="/requests" class="btn btn-primary">Requests</router-link>
              </div>
            </div>
        </div> 
      </div>  `,

      mounted(){
        document.title='Admin Home'
      }
}