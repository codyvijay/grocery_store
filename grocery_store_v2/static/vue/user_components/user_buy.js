export default{
    name:'user_buy',
    template:`<div>

    <div v-show="error">
        <div class="alert alert-danger" role="alert">
            Error : {{error_message}}
        </div>
    </div>

    <div v-show="buy_loading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div v-show="!buy_loading">

        <div v-if="buy_status=='success'">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4">
                <div>
                    <h1>Order is Successful!</h1>
                </div>
            </div>
        </div>
        <div v-else-if="buy_status=='partial'">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4">
                <div>
                    <h1>Partially Successful!</h1>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div class="alert alert-warning d-flex justify-content-center" role="alert">
                    <b> Below items were not ordered! </b>    
                </div>
            </div>
            <div class="row row-cols-1 p-3">
                <div class="col col-lg-6 card d-flex justify-content-center"  v-for="(ele, index) in buy_failed" :key="index">
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
                           
                        </div>
                        <div class="col-6 col-md-3 d-flex justify-content-center">
                            <strong class="text-danger p-2"> Item not Ordered! </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="buy_status=='failed'">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="red" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4">
                <div>
                    <h1>Sorry order was not placed!</h1>
                </div>
            </div>
        </div>

    </div>

    </div>`,

    data(){
        return { error:false, error_message:"", products:[]
            
        }
    },

    computed:{
        user : function () {
            return this.$store.getters.get_user;
        },

        buy_status: function(){
            return this.$store.getters.get_buy_status;
        },

        buy_loading: function(){
            return this.$store.getters.get_buy_loading;
        },

        buy_failed : function(){
            return this.$store.getters.get_buy_failed;
        }
    },

    methods : {
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

      mounted(){
        document.title='Buy'
      }



}