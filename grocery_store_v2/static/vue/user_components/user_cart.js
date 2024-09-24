export default{
    name:'user_cart',
    template:`<div> 
    <h2 class="border-bottom p-4 d-flex justify-content-center">My Cart</h2>

    <div v-show="error">
        <div class="alert alert-danger" role="alert">
            Error : {{error_message}}
        </div>

    </div>

        
    <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-center">
                <div v-show='cart_loading'>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>

                <div v-show="!cart_loading">
                    <div v-show="not_carted || grand_total==0">
                        <button type="button" class="btn btn-primary" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                            </svg>
                            Proceed to checkout!
                        </button>
                    </div>
                    <div v-show="!not_carted && grand_total!=0">
                        <router-link to="/checkout" type="button" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                            </svg>
                            Proceed to checkout!
                            <div>
                            <h3> Total : ₹{{grand_total}} </h3>
                            </div>
                        </router-link>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
    <div v-show="cart_loading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div v-show="!cart_loading">

        <div v-show="not_carted">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-cart-dash-fill" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z"/>
                </svg>
            </div>
            <div id="no_items_in_cart" class="d-flex justify-content-center">
                <div class="p-2">
                    <h1>The cart is Empty!</h1>
                </div>
            </div>
        </div>

        <div v-show="!not_carted">
            <div class="row row-cols-1 p-3">
                <div class="col col-lg-6 card d-flex justify-content-center"  v-for="(ele, index) in cart" :key="index">
                    <div class="row d-flex align-items-center">
                        <div class="col-6 col-md-3 p-3">
                            <img :src="'/static/img/'+ele.pid+'p.jpg'" class="img-thumbnail rounded imgt" alt="product">
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="row">
                            <h4>{{ get_name(ele.pid)}} </h4>
                            
                            </div>
                            <div class="row">
                                <b class="text-success" v-if="get_stock(ele.pid)"> In stock </b>
                                <b class="text-danger" v-else> out of stock </b>
                            
                            </div>
                            <div class="row">
                                <span>{{get_price(ele.pid)}} {{get_unit(ele.pid)}}</span>
                            </div>
                            <div class="row">
                            <h2> ₹{{get_total_pro_price(ele.pid, ele.quantity)}} </h2> 
                            </div>
                            
                        </div>
                        <div class="col-6 col-md-3 d-flex justify-content-center">
                            <div class="py-3">
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete_from_cart" @click="item(ele)"> Remove </button>
                            </div>
                        </div>
                        <div class="col-6 col-md-3 d-flex justify-content-center" v-if="get_stock(ele.pid)">
                            <div class="btn-group py-3" role="group" aria-label="increase or decrease">
                                <button type="button" class="btn btn-success" @click="remove_from_cart(ele.pid, ele.quantity)" >-</button>
                                <button type="button" class="btn btn-success" disabled>{{ele.quantity}}</button>
                                <button type="button" class="btn btn-success" @click="add_to_cart(ele.pid)">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-show="!get_enough_stock(ele.pid)" p-2>
                        <div class="alert alert-warning" role="alert" v-if="getquantityofproduct(ele.pid)!=0">
                            Please reduce qty to continue!
                            <b>In stock : {{getquantityofproduct(ele.pid)}} </b>
                        </div>
                        <div class="alert alert-warning" role="alert" v-else>
                            Out of stock!
                            <b>In stock : {{getquantityofproduct(ele.pid)}} </b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--remove from cart modal-->
        <div class="modal fade" id="delete_from_cart" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header mx-auto">
                <h3>Confirm Removal!</h3>
            </div>
            <div class="modal-body p-4">
                Are you sure you want to Remove this Product from Cart?
                <br>
                <br>
                <div>
                <h5 id="pro_name">Product Name : {{get_name(delete_item.pid)}} </h5>
                </div>
                <div><h5 id="pro_qty"> Quantity : {{delete_item.quantity}} </h5></div>
                <br>
                <br>
                <div>
                <button id="confirm_remove" class="btn btn-danger" @click="delete_from_cart(delete_item.pid)">Delete</button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    
    </div>`,

    data(){
        return {
            products:[], error:false, error_message:"", delete_item:{},
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
        },

        cart_loading: function(){
            return this.$store.getters.get_cartloading;
        },

        grand_total: function(){
            let total_price=0
            for(let i=0; i<this.cart.length;i++){
                for(let j=0; j<this.products.length; j++){
                    if((this.cart[i].pid==this.products[j].product_id) &&(this.products[j].quantity>0.9) &&(this.products[j].quantity>=this.cart[i].quantity)){
                        total_price+=parseFloat((this.cart[i].quantity*this.products[j].price).toFixed(2))
                    }
                }
            }
            return total_price
        }

      },

      methods:{

        get_name(pid){
            const cartItem = this.products.find(item => item.product_id === pid);
            return cartItem?cartItem.name:""
        },

        get_stock(pid){
            const cartItem = this.products.find(item => item.product_id === pid);
            return cartItem?cartItem.quantity>0.9:false

        },

        get_unit(pid){
            const cartItem = this.products.find(item => item.product_id === pid);
            return cartItem?cartItem.unit:""

        },

        get_price(pid){
            const cartItem = this.products.find(item => item.product_id === pid);
            return cartItem?parseFloat((cartItem.price).toFixed(2)):0
            

        },

        get_total_pro_price(pid, quantity){
            const cartItem = this.products.find(item => item.product_id === pid); //here cartItem is the actual product not the product in cart!
            if(cartItem){
                if(parseInt(cartItem.quantity)>0.9 && (cartItem.quantity>=quantity)){
                    return parseFloat((cartItem.price*quantity).toFixed(2))
                }
                else{
                    return 0
                }
            }
            else{
                return 0
            }

        },

        add_to_cart(pid){
            let item_quantity=this.getquantityofproduct(pid);
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

        remove_from_cart(pid, quantity){
            if(quantity>1){
            this.$store.dispatch('update_cart', {update_type:'decrease', pid:pid, 'cart':this.cart});
            }
        },

        delete_from_cart(pid){
            this.$store.dispatch('delete_cart_item', {pid:pid, cart:this.cart})
            $('#delete_from_cart').modal('hide')
        },

        getQuantityInCart(productId) {
            const cartItem = this.cart.find(item => item.pid === productId);
            return cartItem ? cartItem.quantity : 0;
        },

        isProductInCart(productId) {                                 //cart is filterred by user so no need of user_id
            return this.cart.some(item => item.pid == productId);
        },

        getquantityofproduct(pid){

            const cartItem = this.products.find(item => item.product_id === pid);
            return cartItem ? cartItem.quantity : 0;

        },

        item(ele){
            this.delete_item=ele

        },

        get_enough_stock(pid){
            let qty_incart=this.getQuantityInCart(pid)
            let qty_instock=this.getquantityofproduct(pid)
            if(qty_incart<=qty_instock){
                return true
            }
            else{
                return false
            }
        }

      },

      created(){
        fetch('/api/product', {
            method:'GET',
            headers:{
                'Content-Type':'application.json',
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
        })

      },

      mounted: function(){
        document.title='Cart'
       this.$store.dispatch('fetchcart')

      }
}