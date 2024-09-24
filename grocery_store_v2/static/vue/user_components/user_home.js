export default{
    name:'user_home',
    template: `<div> 

    <div id="carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/static/img/banner1.jpg" class="d-block w-100 carousels"  alt="...">
        </div>
        <div class="carousel-item">
          <img src="/static/img/banner2.jpg" class="d-block w-100 carousels" alt="...">
        </div>
        <div class="carousel-item">
          <img src="/static/img/banner3.jpg" class="d-block w-100 carousels " alt="...">
        </div>
        <div class="carousel-item">
          <img src="/static/img/banner4.jpg" class="d-block w-100 carousels " alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div v-show="error">
        <div class="alert alert-danger" role="alert">
        Error : {{error_message}}
        </div>
    </div>

    <h2 class="border-bottom p-4 d-flex justify-content-center">Categories</h2>

    <div v-show="cloading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div v-show="!cloading">

        <div v-show="cat_empty">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4">
            <div>
                <h1>There are no categories!!</h1>
            </div>
            </div>
            <hr class="featurette-divider">
        </div>

        <div v-show="!cat_empty">

            <div class="row row-cols-2">
            
                <div class="col-lg-2 p-3" v-for="(ele, index) in categories" :key="index" v-if="index < 5">
                    <div class="d-flex justify-content-center ">
                        <img :src="'/static/img/'+ele.section_id+'s.jpg'" class="rounded-image img-thumbnail" alt="category">
                    </div>
                    <h5 class="fw-normal d-flex justify-content-center">{{ele.name}}</h5>
                    <p class="d-flex justify-content-center"><router-link :to="'/category/'+ele.section_code+'/'+ele.name" class="btn btn-success">View</router-link></p>   
                </div>
                
                <div class="col-lg-2 p-3">
                    <div class="d-flex justify-content-center">
                        <img src="/static/img/all_categories.jpg" class="rounded-image img-thumbnail" alt="...">
                    </div>
                    <h5 class="fw-normal d-flex justify-content-center">All Categories</h5>
                    <p class="d-flex justify-content-center"><router-link to="/category" class="btn btn-primary">View</router-link></p>
                </div>
            </div>
            <hr class="featurette-divider">
        </div>
    </div>


    


    <h2 class="border-bottom p-4 d-flex justify-content-center">Products</h2>

    <div v-show="ploading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </div>

    <div v-show="!ploading">

        <div v-show="pro_empty">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-bag-x" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z"/>
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4">
                <div>
                    <h1>There are no Products!!</h1>
                </div>
            </div>
            
        </div>

        <div v-show="!pro_empty">

            <div class="row row-cols-2 py-3">
                <div class="col-sm-2 p-3 card" v-for="(ele, index) in products" :key="ele.product_id" v-if="index < 11">
                    <div class="d-flex justify-content-center ">
                        <img :src="'/static/img/'+ele.product_id+'p.jpg'" class="img-thumbnail rounded" alt="product">
                    </div>
                    <h4 class="fw-normal d-flex justify-content-center">{{ele.name}}</h4>
                    <div class="d-flex justify-content-center">{{ele.category_name}}</div>

                    <div class="d-flex justify-content-center"><strong>Stock : {{ele.quantity}}</strong></div>

                    <div class="d-flex justify-content-center"><strong>₹{{ele.price}} {{ele.unit}}</strong></div>
                    <div v-if="ele.quantity>0.9">
                        <div v-if=isProductInCart(ele.product_id)>
                            <div class="btn-group d-flex justify-content-center py-3" role="group" aria-label="increase or decrease">
                                <button type="button" class="btn btn-success" @click="remove_from_cart(ele.product_id)">-</button>
                                <button type="button" class="btn btn-success" disabled>{{ getQuantityInCart(ele.product_id) }}</button>
                                <button type="button" class="btn btn-success" @click="add_to_cart(ele.product_id, ele.quantity)">+</button>
                            </div>
                        </div>
                        <div v-else class="d-flex justify-content-center py-3">
                            <button type="button" class="btn btn-outline-success" @click="add_to_cart(ele.product_id, ele.quantity)">+ ADD</button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="d-flex justify-content-center text-danger py-3">
                            <strong> OUT OF STOCK! </strong>
                        </div>
                    </div> 
                </div>
                <div class="col-lg-2 p-3 card bg-primary-subtle d-flex flex-column align-items-center justify-content-center">
                   <h4 class="fw-normal">All Products</h4>
                    <p class="d-flex justify-content-center"><router-link to='/product' class="btn btn-primary" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                    </router-link></p>
                </div>
                <br>
            </div>
        </div>
    </div>    
    </div>`,



    data(){
        return {
            categories:[], products:[], cloading:true, ploading:true, error:false, error_message:""
        }
    },

    computed:{
        cat_empty: function(){
            return this.categories.length==0
        },

        pro_empty: function(){
            return this.products.length==0
        },

        cart: function(){
            return this.$store.getters.get_cart;
        },

        not_carted:function(){
            return this.cart.length==0
        },

        user:function(){
            return this.$store.getters.get_user;

        },

    },

    methods:{
        add_to_cart(pid, item_quantity){
            let cart_quantity=this.getQuantityInCart(pid);
            let product_present=this.isProductInCart(pid);
            if(cart_quantity<item_quantity){
                if(product_present==true){
                    this.$store.dispatch('update_cart', {update_type:'increase', pid:pid, 'cart':this.cart});  
                }
                else{
                    this.$store.dispatch('update_cart', {update_type:'add', pid:pid, 'cart':this.cart, 'uid':this.user.user_id});
                    
                }
            } 
        },

        remove_from_cart(pid){
            this.$store.dispatch('update_cart', {update_type:'decrease', pid:pid, 'cart':this.cart});
        },

        isProductInCart(productId) {                                 //cart is filterred by user so no need of user_id
            return this.cart.some(item => item.pid == productId);
          },

        getQuantityInCart(productId) {
        const cartItem = this.cart.find(item => item.pid === productId);
        return cartItem ? cartItem.quantity : 0;
        }
        

    },

    created: function(){
        fetch('/api/section', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            }
        }).then((res)=>{
            if (res.ok){
                return res.json()
            }
            else{
                return Promise.reject(res.json())
            }
        }).then((data)=>{
            this.categories=data


        }).catch((error)=>{
            this.error=true,
            this.error_message=error,
            console.log(error)

        }).finally(()=>{
            this.cloading=false
        })

        fetch('/api/product', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            }
        }).then((res)=>{
            if(res.ok){
                return res.json()
            }
            else{
                return Promise.reject(res.statusText)
            }
        }).then((data)=>{
            this.products=data

        }).catch((error)=>{
            this.error=true,
            this.error_message=error,
            console.log(error)
        }).finally(()=>{
            this.ploading=false
        })

        this.$store.dispatch('fetchcart')
    },

    mounted(){
        document.title='User Home'
    }


}