export default{
    name:'manager_orders',
    template: `<div> 
         <div v-show="loading">
            <div class="d-flex justify-content-center py-5">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

        <div v-show="!loading">

            <div v-show='isnew'>
                <div class='py-5'>
                    <div class="card text-center p-5">
                        <div class="card-header">
                            Information
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Your status of manager Role : </h5>
                            <p class="card-text">You have successfully submitted the application!!</p>
                            <div class='p-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                </svg>
                            </div>
                            <button class="btn btn-primary" @click="refresh_role">Refresh</button>
                        </div>
                        <div class="card-footer text-body-secondary">
                        For more information contact Admin.
                        </div>
                    </div>
                </div>
            </div>

            <div v-show='isrejected'>
                <div class='py-5'>
                    <div class="card text-center p-5">
                        <div class="card-header">
                            Information
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Your status of manager Role : </h5>
                            <p class="card-text">You are rejected for the role!</p>
                            <div class='p-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-person-fill-slash" viewBox="0 0 16 16">
                                    <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                </svg>
                            </div>
                            <button class="btn btn-primary" @click="re_apply">Re-apply</button>
                        </div>
                        <div class="card-footer text-body-secondary">
                        For more information contact Admin.
                        </div>
                    </div>
                </div>
            </div>

            <div v-show='isrevoked'>
                <div class='py-5'>
                    <div class="card text-center p-5">
                        <div class="card-header">
                            Information
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Your status of manager Role : </h5>
                            <p class="card-text">You are Revoked From the role!</p>
                            <div class='p-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z"/>
                                </svg>
                            </div>
                            <button class="btn btn-primary" @click="re_apply">Re-apply</button>
                        </div>
                        <div class="card-footer text-body-secondary">
                        For more information contact Admin.
                        </div>
                    </div>
                </div>

            </div>

            <div v-show='isapproved'>
                <h2 class="border-bottom p-4 d-flex justify-content-center">Orders</h2>

                <div class="card" v-show="!orders_empty">
                    <div class="card-body">
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-primary" @click="toast">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                Export orders
                            </button>
                        </div> 

                    </div>
                </div>


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

                <div v-show="!oloading" class="py-3">

                    <div v-show="orders_empty">
                        <div id="no_items" class="d-flex justify-content-center p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-border-width" viewBox="0 0 16 16">
                                <path d="M0 3.5A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-2zm0 5A.5.5 0 0 1 .5 8h15a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1zm0 4a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </div>
                        <div id="no_items" class="d-flex justify-content-center p-4">
                            <div>
                                <h1>There are no orders!</h1>
                            </div>
                        </div>
                    </div>
                    <div v-show="!orders_empty">
                        <div class="card p-3">
                            <div class="p-2 d-flex justify-content-center">
                                <h4 class="text-success">Products sold</h4> 
                            </div>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="table-info">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">user</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Units</th>
                                        <th scope="col">Total</th> 
                                    </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                    <tr v-for="(product, index) in orders">
                                        <th scope="row">{{index+1}}</th>
                                        <td><b>{{product.product_name}}</b></td>
                                        <td style="white-space: nowrap;"><b>{{product.time.slice(0,16)}}</b></td>
                                        <td><b>{{product.user}}</b></td>
                                        <td><b>{{product.quantity}}</b></td>
                                        <td>₹{{(product.price)/(product.quantity)}}</td>
                                        <td>{{product.unit}}</td>
                                        <td><b>₹{{product.price}}</b></td>   
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="p-3">
                            <h3>Total Earned: ₹{{total_profit}}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast custom-toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
                <div class="toast-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/>
                    </svg>
                    <strong class="me-auto p-2">Export Message</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body d-flex justify-content-center">
                    <div class="px-3 py-1">
                    The File will download once Ready!
                    </div>
                </div>
            </div>
        </div>

    
    </div>`,

    data(){
        return { orders:[], oloading:true, error:false, error_message:"",
            
        }
    },

    computed : {
        user : function () {
            
            return this.$store.getters.get_user;
        },

        isnew :function(){
            return this.user.role=='manager(Not Approved)'
        },

        isrejected : function(){
            return this.user.role=='manager(Rejected)'
        },

        isapproved : function(){
            return this.user.role=='manager'
        },

        isrevoked : function(){
            return this.user.role=='manager(Revoked)'
        },

        loading : function(){
            return this.$store.getters.get_loading;
        },

        orders_empty: function(){
            return this.orders.length==0
        },

        total_profit: function(){
            let total=0
            for(let i=0; i<this.orders.length; i++){
                total+=this.orders[i].price

            }
            return total

        }
    },

    methods:{
        refresh_role(){
            this.$store.dispatch('fetchUser')   

        },

        re_apply(){

            fetch('/api/manager_reapply',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:JSON.stringify({'email': this.user.email}),
            }).then((res)=>{
                if(res.ok){
                    this.$store.dispatch('fetchUser')  
                }
                else{
                    return Promise.reject(res.json())
                }
            }).catch((error)=>{
                console.log(error)
            })

        },

        toast(){
            const toastLiveExample = document.getElementById('liveToast')
            var myToast = new bootstrap.Toast(toastLiveExample);
            myToast.show()
            fetch("/api/export", {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                }
            }).then((res)=>{
                if(!res.ok){
                    return Promise.reject(res.statusText)
                }
                else{
                    return res.json()
                }
            }).then((data)=>{
                this.$store.dispatch('fetch_export_order', {id:data.job_id})
            })
            .catch((error)=>{
                this.error=true,
                this.error_message=error
            })
        }
    },


    created(){
        fetch('/api/current_user', {
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
            if(data.role=='manager'){
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
                
                
            }
        }).catch((error)=>{
            this.error=true,
            this.error_message=error
        })
    },

    mounted(){
        document.title='Orders'
    }
}