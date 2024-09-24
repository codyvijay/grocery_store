export default{
    name:'admin_requests',
    template: `<div> 
        
    <h2 class="border-bottom p-4 d-flex justify-content-center">All Requests</h2> 
    <div v-show="error">
        {{error_message}}
    </div>

    <div v-show="alreadyexists">
        <div class="py-3 d-flex justify-content-center">
            <div class="alert alert-primary p-3 m-0 d-flex justify-content-center">
                The category already exists!
                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
            </div>
        </div>
    </div>

    <div v-show="approved_request">
        <div class="py-3 d-flex justify-content-center">
            <div class="alert alert-success p-3 m-0 d-flex justify-content-center">
                The request has been approved!
                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
            </div>
        </div>
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
                        <p><h3>No requests to show!! </h3></p>
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
                        <div class="d-flex justify-content-center"><strong>User ID : {{ele.uid}}</strong></div>
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
                            <button id="update" aria-label="update" class="btn btn-outline-success p-2" data-bs-toggle="modal" data-bs-target="#approve_request" @click="confirm_r(ele)" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg>
                            </button>
                            <button id="update" aria-label="update" class="btn btn-outline-danger p-2" data-bs-toggle="modal" data-bs-target="#delete_request" @click="delete_r(ele)" >
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

        <!--Accept requests modal-->
        <div class="modal fade" id="approve_request" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header mx-auto">
                        <h3>Confirm Request! </h3>
                    </div>
                    <div class="modal-body p-4">
                        Are you sure you want to Approve this Request?
                        <br>
                        <br>
                        <div>
                        <div><h5 id="request_id"><strong> ID : {{approve_r_data.ele_id}} </strong></h5></div>
                        <div><h5 id="request"><strong>Request : {{approve_r_data.request}}</strong></h5></div>
                            <h5 id="cat_name"> Name : {{approve_r_data.name}} </h5>
                        </div>
                        
                        <br>
                        <div>
                            <button id="confirm_approve" class="btn btn-success" @click="approve_request()">Approve</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
          
    </div>`,

    data(){
        return { rloading:true, error:false, error_message:"", request_data:[], imageversion:0, delete_r_data:{"name":"", "request_id":"", "request":""},
            approve_r_data:{"name":"", "request_id":"", "request":""},
            alreadyexists:false,
            approved_request:false,
        }
    },

    computed : {

        new_empty : function(){
            return this.request_data.length===0
        }
    },

    methods:{

        close_message(){
            this.alreadyexists=false,
            this.approved_request=false
        },

        confirm_r(ele){
            this.approve_r_data=ele

        },

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

        approve_request(){
            const formdata= new FormData();
            formdata.append('ele_id', this.approve_r_data.ele_id)
            formdata.append('section_code', this.approve_r_data.section_code)
            formdata.append('name', this.approve_r_data.name)
            formdata.append('description', this.approve_r_data.description)
            formdata.append('uid', this.approve_r_data.uid)
            formdata.append('id', this.approve_r_data.id)
            formdata.append('request', this.approve_r_data.request)


            if(this.approve_r_data.request=='create'){

                fetch('/api/approve_request', {
                    method:'POST',
                    headers:{
                        'auth-token':localStorage.getItem('auth-token')
                    },
                    body:formdata,
                }).then((res)=>{
                    if (res.status==200){
                        return res.json()
                    }
                    else{
                        return Promise.reject(res.status)
                    }
                }).then((data)=>{
                    this.request_data = this.request_data.filter(item => item.ele_id != data.ele_id);
                    $('#approve_request').modal('hide')

                }).catch((error)=>{
                    if(error==409){
                        this.alreadyexists=true
                    }
                    else{
                    this.error=true,
                    this.error_message=error
                    console.log(error)
                    }
                })

            }

            else if(this.approve_r_data.request=='update'){
                fetch('/api/approve_request', {
                    method:'PUT',
                    headers:{
                        'auth-token':localStorage.getItem('auth-token')
                    },
                    body:formdata,
                }).then((res)=>{
                    if (res.ok){
                        return res.json()
                    }
                    else{
                        return Promise.reject(res.json())
                    }
                }).then((data)=>{
                    this.request_data = this.request_data.filter(item => item.ele_id != data.ele_id);
                    $('#approve_request').modal('hide')

                }).catch((error)=>{
                    this.error=true,
                    this.error_message=error
                    console.log(error)
                })

            }

            else if(this.approve_r_data.request=='delete'){
                fetch('/api/approve_request', {
                    method:'DELETE',
                    headers:{
                        'auth-token':localStorage.getItem('auth-token')
                    },
                    body:formdata,
                }).then((res)=>{
                    if (res.ok){
                        return res.json()
                    }
                    else{
                        return Promise.reject(res.json())
                    }
                }).then((data)=>{
                    this.request_data = this.request_data.filter(item => item.section_code != data.section_code);
                    $('#approve_request').modal('hide')

                }).catch((error)=>{
                    this.error=true,
                    this.error_message=error
                    console.log(error)
                })

            }
  
        }
  
    },

    mounted: function(){
        document.title='requests',
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
}