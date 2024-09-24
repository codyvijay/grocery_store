export default{
    name:'user_search',
    template:`<div> 

    <div class="py-5">
        <div class="d-flex" role="search">
            <div class="input-group">
                <span class="input-group-text" id="filter">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#advanced_search" aria-expanded="false" aria-controls="collapseExample">
                        More
                    </button>
                </span>
                <input class="form-control me-2 p-3" type="search" placeholder="Search Product or Category..." aria-label="Search" v-model="query">
                <button class="btn btn-success"  @click="search">Search</button>
            </div>
        </div>
    </div>

    <div class="collapse" id="advanced_search">
        <div class="card card-body">
            <div class="row align-items-center">
                <div class="col-md p-2 d-flex justify-content-center">
                    <div class="form-control-lg">
                        <label class="form-label d-flex justify-content-center" for="search_in">Search In : </label>
                        <select class="form-select" v-model='filter' name='filter' id="search_in" @change="re_search">
                            <option value="all" selected>All</option>
                            <option value="products">Products</option>
                            <option value="categories">Categories</option>  
                        </select>
                    </div> 
                </div>
                <div class="col-md p-2 d-flex justify-content-center">
                    <div class="form-control-lg">
                        <label for="priceRange" class="d-flex justify-content-center">Price Range:</label>
                        <div class="d-flex justify-content-center">
                            <input id="priceRange" type="text" data-slider-min="0" data-slider-max="250" data-slider-step="10" data-slider-value="[0,250]" />
                        </div>
                        <p class=" d-flex justify-content-center">Selected Range: ₹{{ selectedRange[0] }} - ₹{{ selectedRange[1] }}{{max_reached}}</p>
                    </div>
                </div>
            
                <div class="col-md p-2 d-flex justify-content-center">
                    <div class="form-check form-control-lg form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="only_in_stock" @change="re_search">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Only In stock</label>
                    </div> 
                </div>
            </div>
        </div>
    </div>


    <div v-show="error">
        <div class="alert alert-danger" role="alert">
            Error : {{error_message}}
        </div>
    </div>

    <h3 class="border-bottom p-4">Search Results</h3>

    <div v-show="sloading">
        <div class="d-flex justify-content-center p-5">
            <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div v-show="!sloading">


        <div v-if="(pro_result.length==0) && (cat_result.length==0)">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4" v-if="searched==true">
                <div>
                    <h2>No results found!</h2>
                </div>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4" v-if="searched==false">
                <div>
                    <h2>Search, Find or Explore!</h2>
                </div>
            </div>
        </div>
        <div v-else>

            <div v-show="!cat_result_empty">
                <h2 class="border-bottom p-4 d-flex justify-content-center">Categories</h2>
                <div class="row row-cols-2">
                    <div class="col-lg-2 p-3" v-for="(ele, index) in categories" :key="index" v-if="cat_present_in_result(ele.section_id)">
                        <div class="d-flex justify-content-center ">
                            <img :src="'/static/img/'+ele.section_id+'s.jpg'" class="rounded-image img-thumbnail" alt="category">
                        </div>
                        <h5 class="fw-normal d-flex justify-content-center">{{ele.name}}</h5>
                        <p class="d-flex justify-content-center"><router-link :to="'/category/'+ele.section_code+'/'+ele.name" class="btn btn-success">View</router-link></p>   
                    </div>
                </div>
            </div>

            <div v-show="!pro_result_empty">
                <h2 class="border-bottom p-4 d-flex justify-content-center">Products</h2>
                <div class="row row-cols-2 py-3">
                    <div class="col-lg-2 p-3 card" v-for="(ele, index) in products" :key="ele.product_id" v-if="pro_present_in_result(ele.product_id)">
                        <div class="d-flex justify-content-center ">
                            <img :src="'/static/img/'+ele.product_id+'p.jpg'" class="img-thumbnail rounded" alt="product">
                        </div>
                        <h4 class="fw-normal d-flex justify-content-center">{{ele.name}}</h4>
                        <div class="d-flex justify-content-center"> {{ele.category_name}}</div>
                        <div class="d-flex justify-content-center"><strong>In stock : {{ele.quantity}}</strong></div>
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
                    <br>
                </div>
            </div>
        </div>
    </div>
    
    </div>`,


    data(){
        return{
            error:false, error_message:"", sloading:false, query:"", filter:"all", pro_result:[], cat_result:[],
            products:[], categories:[], searched:false, selectedRange: [0, 250], only_in_stock:false,
        }
    },

    computed:{

        pro_result_empty(){
            return this.pro_result.length==0;
        },

        cat_result_empty(){
            return this.cat_result.length==0;
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

        stock: function(){
            if(this.only_in_stock==false){
                return 'all'
            }
            else {
                return 'in_stock'
            }
        },

        max_reached: function(){
            if(this.selectedRange[1]>=250){
            return '+'}
        }



    },

    methods:{
        search(){
            this.sloading=true
            fetch('api/search',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },

                body:JSON.stringify({'query':this.query, 'f':this.filter, 'stock': this.stock, 'mini': this.selectedRange[0], 'maxi': this.selectedRange[1]})
            }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                else{
                    return Promise.reject(res.statusText)
                }
            }).then((data)=>{
                this.cat_result=data.categories,
                this.pro_result=data.products
            }).catch((error)=>{
                this.error=true,
                this.error_message=error,
                console.log(error)
            }).finally(()=>{
                this.sloading=false
                this.searched=true
            })
        },

        re_search(){
            this.search()

        },

        cat_present_in_result(section_id){
            const cat = this.cat_result.find(result => result.cat_id == section_id);
            return cat?true:false
            
        },

        pro_present_in_result(pid){
            const pro = this.pro_result.find(result => result.product_id == pid);
            return pro?true:false
        },

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

    mounted() {
        document.title='Search'

        const priceRangeSlider = new Slider("#priceRange", {});
        priceRangeSlider.on("slide", (values) => {
          this.selectedRange = values;
        });
        priceRangeSlider.on("slideStop", () => {
            this.re_search();
          });
      },


}