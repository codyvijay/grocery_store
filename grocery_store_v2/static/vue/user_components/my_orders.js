export default{
    name:'user_orders',
    template:`<div> 

    <h2 class="border-bottom p-4 d-flex justify-content-center">My orders</h2>

    <div v-show="error">
        <div class="alert alert-danger" role="alert">
            Error : {{error_message}}
        </div>
    </div>

    <div v-show="oloading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div v-show="!oloading">
        <div v-show="orders_empty">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-border-width" viewBox="0 0 16 16">
                    <path d="M0 3.5A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-2zm0 5A.5.5 0 0 1 .5 8h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4">
                <div>
                    <h1>My Order is Empty!</h1>
                </div>
            </div>
        </div>

        <div v-show="!orders_empty">
            <div class="py-2" v-for="order in orders">
                <div class="card p-3">
                    <div class="p-2 d-flex justify-content-center">
                        <h2 class="text-success">Order No. {{order.order_no}}</h2> 
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="table-info">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Units</th>
                                <th scope="col">Total</th> 
                            </tr>
                            </thead>
                            <tbody class="table-group-divider">
                            <tr v-for="(product, index) in order.products">
                                <th scope="row">{{index+1}}</th>
                                <td><b>{{product.product_name}}</b></td>
                                <td><b>{{product.quantity}}</b></td>
                                <td>₹{{(product.price)/(product.quantity)}}</td>
                                <td>{{product.unit}}</td>
                                <td><b>₹{{product.price}}</b></td>   
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class='p-3'>
                        <h3>Total: ₹{{order.total}} </h3>  
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>`,

    data(){
        return{
            error:false, error_message: "", orders:[], oloading:true,
        }
    },
    computed:{
        orders_empty: function(){
            return this.orders.length==0
        }

    },

    created(){
        fetch('/api/orders', {
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
            this.orders=data
        }).catch((error)=>{
            this.error=true,
            this.error_message=error,
            console.log(error)
        }).finally(()=>{
            this.oloading=false
        })

    },

    mounted(){
        document.title='Orders'
    }
}