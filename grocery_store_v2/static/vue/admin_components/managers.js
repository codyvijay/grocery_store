export default{
    name:'admin_managers',
    template:`<div>
    <h2 class="border-bottom p-4 d-flex justify-content-center">Managers</h2> 
    <div v-show="error">
    {{error_message}}
    </div>

    <div class="py-3">
        <div class='card'>
        <h4 class="border-bottom p-4 d-flex justify-content-center">New Application</h4> 
            <div v-show="loading">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

            <div v-show="!loading">

                <div v-show="new_empty">
                    <div id="no_items" class="d-flex justify-content-center p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-fill-dash" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                        </svg>
                    </div>
                    <div id="no_items" class="d-flex justify-content-center p-4">
                        <div>
                            <p>No New Applications!!</p>
                        </div>
                    </div>
                </div>

                <div v-show="!new_empty">
                    <div class=" p-4  bg-body rounded shadow-sm">

                        <table class="table table-bordered table-primary table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(ele, index) in new_application">
                                <th scope="row">{{index+1}}</th>
                                <td>{{ele.email}}</td>
                                <td>
                                    <button id="approve" aria-label="approve" class="btn btn-outline-success p-2" data-bs-toggle="modal" data-bs-target="#confirm_action" @click="action_update(ele, 'Approve', 'new_application')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                        <div>Approve</div>
                                    </button>

                                    <button id="decline" aria-label="decline" class="btn btn-outline-danger p-2" data-bs-toggle="modal" data-bs-target="#confirm_action" @click="action_update(ele, 'Reject', 'new_application')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-slash" viewBox="0 0 16 16">
                                            <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                        </svg>
                                        <div>Reject</div>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="py-3">
        <div class='card'>
            <h4 class="border-bottom p-4 d-flex justify-content-center">Approved</h4> 
            <div v-show="loading">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

            <div v-show="!loading">

                <div v-show="approved_empty">
                    <div id="no_items" class="d-flex justify-content-center p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-fill-exclamation" viewBox="0 0 16 16">
                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5Zm0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"/>
                            </svg>
                    </div>
                    <div id="no_items" class="d-flex justify-content-center p-4">
                        <div>
                            <p>No Approvals!!</p>
                        </div>
                    </div>
                </div>


                <div v-show="!approved_empty">

                    <div class=" p-4  bg-body rounded shadow-sm">
                        <table class="table table-bordered table-success table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(ele, index) in approved">
                                <th scope="row">{{index+1}}</th>
                                <td>{{ele.email}}</td>
                                <td>
                                    <button id="decline" aria-label="decline" class="btn btn-outline-danger p-2" data-bs-toggle="modal" data-bs-target="#confirm_action" @click="action_update(ele, 'Revoke', 'approved')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
                                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z"/>
                                        </svg>
                                        <div>Revoke</div>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="py-3">
        <div class='card'>
            <h4 class="border-bottom p-4 d-flex justify-content-center">Rejected</h4> 
            <div v-show="loading">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

            <div v-show="!loading">

                <div v-show="reject_empty">
                    <div id="no_items" class="d-flex justify-content-center p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-fill-slash" viewBox="0 0 16 16">
                            <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                        </svg>
                    </div>
                    <div id="no_items" class="d-flex justify-content-center p-4">
                        <div>
                            <p>No Rejects!!</p>
                        </div>
                    </div>
                </div>

                <div v-show="!reject_empty">

                    <div class=" p-4  bg-body rounded shadow-sm">

                        <table class="table table-danger table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(ele, index) in rejected">
                                <th scope="row">{{index+1}}</th>
                                <td>{{ele.email}}</td>
                                <td>
                                    <button id="decline" aria-label="decline" class="btn btn-outline-success p-2" data-bs-toggle="modal" data-bs-target="#confirm_action" @click="action_update(ele, 'Approve', 'rejected')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                        <div>Approve</div>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="py-3">
        <div class='card'>
            <h4 class="border-bottom p-4 d-flex justify-content-center">Revoked</h4> 
            <div v-show="loading">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

            <div v-show="!loading">

                <div v-show="revoke_empty">
                    <div id="no_items" class="d-flex justify-content-center p-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z"/>
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z"/>
                        </svg>
                    </div>
                    <div id="no_items" class="d-flex justify-content-center p-4">
                        <div>
                            <p>No Revokes!!</p>
                        </div>
                    </div>
                </div>

                <div v-show="!revoke_empty">

                    <div class=" p-4  bg-body rounded shadow-sm">

                        <table class="table table-warning table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(ele, index) in revoked">
                                <th scope="row">{{index+1}}</th>
                                <td>{{ele.email}}</td>
                                <td>
                                    <button id="decline" aria-label="decline" class="btn btn-outline-success p-2" data-bs-toggle="modal" data-bs-target="#confirm_action" @click="action_update(ele, 'Approve', 'revoked')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                        <div>Approve</div>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <!--Confirm modal-->
    <div class="modal fade" id="confirm_action" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header mx-auto">
            <h3>Confirm Action! </h3>
        </div>
        <div class="modal-body p-4">
            <h3> Are you sure to :  {{action.message}} </h3>
            <br>
            <div>
            <h5 id="cat_name"> Email : {{action.email}} </h5>
            </div>
            <div>
            <br>
            <button id="confirm_delete" class="btn btn-primary" @click="confirm_action()">
            <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show='action_loading'></span>
            Confirm</button>
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal" @click="clear_action">Close</button>
        </div>
        </div>
    </div>
    </div>
    
    </div>`,

    data(){
        return {error:false, error_message:null, action_loading:false,
            loading:true, new_empty:true, approved_empty:true, reject_empty:true, revoke_empty:true, 
            new_application:[], approved:[], rejected:[], revoked:[],
            action:{'email':"", 'message':"", 'called_by':''},
        }

    },

    methods:{
        action_update(ele, action_value, called_by){
            this.action.email=ele.email,
            this.action.message=action_value,
            this.action.called_by=called_by


        },

        clear_action(){
            this.action.email="",
            this.action.message=""


        },

        confirm_action(){
            this.action_loading=true;
            const formdata= new FormData();
            formdata.append('email', this.action.email)
            formdata.append('action', this.action.message)
            fetch('/api/admin_managers', {
                method:'PUT',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:formdata,
            }).then((res)=>{
                if (res.status==200){
                    return res.json()
                }
                else{
                    return Promise.reject(res.json())
                }
            }).then((data)=>{
                if(this.action.called_by=='new_application'){
                    this.new_application = this.new_application.filter(item => item.email !== data.email);
                }
                else if(this.action.called_by=='approved'){
                    this.approved = this.approved.filter(item => item.email !== data.email);
                }
                else if(this.action.called_by=='rejected'){
                    this.rejected = this.rejected.filter(item => item.email !== data.email);
                }
                else if(this.action.called_by=='revoked'){
                    this.revoked = this.revoked.filter(item => item.email !== data.email);
                }
                

                if(this.action.message=='Approve'){
                    this.approved.push(data)
                }
                else if(this.action.message=='Reject'){
                    this.rejected.push(data)
                }
                else if(this.action.message=='Revoke'){
                    this.revoked.push(data)
                }

            }).catch((error)=>{
                this.error=true,
                this.error_message=error
            }).finally(()=>{

                $('#confirm_action').modal('hide');
                this.action.email="",
                this.action.message="",
                this.called_by="",
                this.action_loading=false

            })
            
        },

    },

    mounted:function(){
        document.title='Managers'
        fetch('/api/admin_managers', {
            method:'GET',
            headers:{'Content-Type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            }
        })
        .then((res)=>{
            if(res.status==200){
                return res.json()
            }
            else{
                return Promise.reject(res.json())
            }
        }).then((data)=>{
            for(let i=0; i<data.length; i++){
                if(data[i].role=='manager(Not Approved)'){
                    this.new_application.push(data[i])
                    this.new_empty=false
                }
                else if(data[i].role=='manager'){
                    this.approved.push(data[i])
                    this.approved_empty=false
                }
                else if(data[i].role=='manager(Rejected)'){
                    this.rejected.push(data[i])
                    this.reject_empty=false
                }
                else if(data[i].role=='manager(Revoked)'){
                    this.revoked.push(data[i])
                    this.revoke_empty=false
                }
            }

        }).catch((error)=>{
            console.log(error)
            this.error=true,
            this.error_message=error
        }).finally(()=>{
            this.loading=false
        })

    },

    watch:{
        new_application(newValue){
            this.new_empty=newValue.length===0;

        },

        approved(newValue){
            this.approved_empty=newValue.length===0;
        },

        rejected(newValue){
            this.reject_empty=newValue.length===0;
        },

        revoked(newValue){
            this.revoke_empty=newValue.length===0;

        },

    }

}