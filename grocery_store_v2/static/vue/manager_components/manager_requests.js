export default{
    name:'manager_Requests',
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

            <h2 class="border-bottom p-4 d-flex justify-content-center">My Requests</h2> 
            <div v-show="error">
                {{error_message}}
            </div>

            <div class="py-3">
                
                    <div v-show="rloading">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-success" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>

                    <div v-show="!rloading">

                        <div v-show="new_empty">
                            <div id="no_requests" class="d-flex justify-content-center p-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-clipboard-x-fill" viewBox="0 0 16 16">
                                    <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm4 7.793 1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708L8 9.293Z"/>
                                </svg>
                            </div>
                            <div id="no_requests" class="d-flex justify-content-center p-4">
                                <div>
                                    <p><h3>No requests made by you!!</h3></p>
                                </div>
                            </div>
                        </div>

                        <div v-show="!new_empty">

                            <div class="row row-cols-2 py-3">
                                <div class="col-lg-2 p-3 card" v-for="ele in request_data" :key="ele.ele_id">
                                    <div class="d-flex justify-content-center ">
                                        <div v-if="ele.request=='create'">
                                            <img :src="'/static/img/'+ele.id+'r.jpg'+ '?v=' + imageversion" class="img-thumbnail rounded" alt="category">
                                        </div>

                                        <div v-else>
                                            <img :src="'/static/img/'+ele.id+'s.jpg'+ '?v=' + imageversion" class="img-thumbnail rounded" alt="category">
                                        </div>

                                    </div>
                                    <div class="d-flex justify-content-center"><strong>ID : {{ele.ele_id}}</strong></div>
                                    <div class="d-flex justify-content-center">
                                        <strong>
                                            <div v-if="ele.request=='delete'">
                                                <div class="text-danger">
                                                    {{ele.request}}
                                                </div>
                                            </div>
                                            <div v-if="ele.request=='update'">
                                                <div class="text-primary">
                                                    {{ele.request}}
                                                </div>
                                            </div>
                                            <div v-if="ele.request=='create'">
                                                <div class="text-success">
                                                    {{ele.request}}
                                                </div>
                                            </div>
                                        </strong>
                                    </div>
                                    <h4 class="fw-normal d-flex justify-content-center">{{ele.name}}</h4>
                                    <div class="d-flex justify-content-center">{{ele.section_code}}</div>
                                    <div class="d-flex justify-content-center">{{ele.description}}</div>
                                    <div class="btn-group btn-group-sm">
                                        <button id="update" aria-label="update" class="btn btn-outline-danger p-2" data-bs-toggle="modal" data-bs-target="#delete_request" @click="delete_r(ele)" > Delete
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                
            </div>

            <!--delete requests modal-->
            <div class="modal fade" id="delete_request" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header mx-auto">
                    <h3>Confirm Delete! </h3>
                </div>
                <div class="modal-body p-4">
                    Are you sure you want to Delete this Request?
                    <br>
                    <br>
                    <div>
                    <div><h5 id="request_id"><strong> ID : {{delete_r_data.id}} </strong></h5></div>
                    <div><h5 id="request"><strong>Request : {{delete_r_data.request}}</strong></h5></div>
                    <h5 id="cat_name"> Name : {{delete_r_data.name}} </h5>
                    </div>
                    
                    <br>
                    <div>
                    <button id="confirm_delete" class="btn btn-danger" @click="delete_request()">Delete</button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>   
    </div>`,

    data(){
        return { rloading:true, error:false, error_message:"", request_data:[], imageversion:0, delete_r_data:{"name":"", "request_id":"", "request":""}
            
        }
    },
    computed : {
        user : function () {

            //this.$store.dispatch('fetchUser'); //intentionally kept this off. so you may need to refresh to get fresh manager role
            
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

        new_empty : function(){
            return this.request_data.length===0
        }
    },

    methods:{

        delete_r(ele){
            this.delete_r_data.name=ele.name
            this.delete_r_data.id=ele.ele_id
            this.delete_r_data.request=ele.request

        },

        delete_request(){
            const formdata= new FormData();
            formdata.append('id', this.delete_r_data.id)
            

            fetch('/api/requests', {
                method:'DELETE',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:formdata

            }).then((res)=>{
                if (res.ok){
                    return res.json()
                }
                else{
                    return Promise.reject(res.status)
                }
            }).then((data)=>{
                this.request_data = this.request_data.filter(item => item.ele_id != data.ele_id);
                $('#delete_request').modal('hide')

            }).catch((error)=>{
                this.error=true,
                this.error_message=error
                console.log(error)
            })

        },

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
                fetch('/api/requests', {
                    method: 'GET',
                    headers:{
                        'auth-token':localStorage.getItem('auth-token')
                    }
                }).then((res)=>{
                    if(res.ok){
                        return res.json()
                    }
                    else{
                        return Promise.reject(res.json())
                    }
                }).then((data)=>{
                    this.request_data=data
                }).catch((error)=>{
                    this.error=true,
                    this.error_message=error
                }).finally(()=>{
                    this.rloading=false
                })
                const now = new Date();
                this.imageversion = now.toLocaleString();
                
            }
        }).catch((error)=>{
            this.error=true,
            this.error_message=error
        })

    },

    mounted(){
        document.title='Requests'
    }

}