export default{
    name:'user_Products',
    template:`<div> 
    <div v-show="error">
        <div class="alert alert-danger" role="alert">
            Error : {{error_message}}
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
                <div class="col-lg-2 p-3 card" v-for="(ele, index) in products" :key="ele.product_id">
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
    </div>`,

    data(){
        return {
            products:[],  ploading:true, error:false, error_message:""
        }
    },

    computed:{
       
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
        document.title='Products'
    }

}