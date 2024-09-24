export default{
    name:'user_checkout',
    template:`<div>

    <h2 class="border-bottom p-4 d-flex justify-content-center">Checkout</h2>

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                            Buy!
                        </button>
                    </div>
                    <div v-show="!not_carted && grand_total!=0">
                        <button type="button" class="btn btn-primary" @click="begin_buy">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                            Buy!
                            <div>
                            <h3> Total : ₹{{grand_total}} </h3>
                            </div>
                        </button>
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
                <div class="col col-lg-6 card d-flex justify-content-center"  v-for="(ele, index) in cart" :key="index" v-if="get_enough_stock(ele.pid) && (getquantityofproduct(ele.pid)>0)">
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
                            
                        </div>
                        <div class="col-6 col-md-3 d-flex justify-content-center">
                            <h2> ₹{{get_total_pro_price(ele.pid, ele.quantity)}} </h2>   
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    </div>`,

    data(){
        return {
            error:false, error_message:"", products:[],
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
        },

        processed_cart: function(){
            let p_cart=[]
            for(let i=0; i<this.cart.length; i++){
                if(this.get_enough_stock(this.cart[i].pid) && (this.getquantityofproduct(this.cart[i].pid)>0 )){
                    p_cart.push(this.cart[i])

                }
            }
            return p_cart
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

        get_enough_stock(pid){
            let qty_incart=this.getQuantityInCart(pid)
            let qty_instock=this.getquantityofproduct(pid)
            if(qty_incart<=qty_instock){
                return true
            }
            else{
                return false
            }
        },

        begin_buy(){
            this.$store.dispatch('buy_cart_items', {items_to_buy: this.processed_cart})
            this.$router.push('/buy')
            
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
        document.title='Checkout'
       this.$store.dispatch('fetchcart')
      

      }
}