export default{
    name:'user_profile',
    template: `<div> 

    <div v-show="error">
        <div class="alert alert-danger" role="alert">
            {{error_message}}
        </div>
    </div>

    <div v-show="loading">
        <div class="d-flex justify-content-center py-5">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div v-show="!loading">

        <h2 class="border-bottom p-4 d-flex justify-content-center">Profile</h2>
        <div v-show="updated">
            <div class="py-3 d-flex justify-content-center">
                <div class="alert alert-info p-3 m-0 d-flex justify-content-center">
                    Profile is Updated!
                    <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
                </div>
            </div>
        </div>


        <div class="card-group">

            <div class='col-6'>
                <div class='py-5'>
                <h4 class="py-4">Required Info</h4>
                    <div class='p-2'>
                        <h4>Email</h4>
                        <input type='email' name='email' class='form-control' style='width:200%; max-width:400px;' v-model='credential.email' disabled/>
                    </div>
                    <div class='fs-gap p-2'>
                        <h4>Role</h4>
                        <input type='text' name='role' class='form-control'  style='width:200%; max-width:400px;' v-model='credential.role' disabled/>
                    </div>
                    <div class='fs-gap p-2'>
                        <h4>User ID</h4>
                        <input type='text' name='user_id' class='form-control'  style='width:200%; max-width:400px;' v-model='credential.user_id' disabled/>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class='py-5'>
                <h4 class="py-4">Personal Info</h4>
                    <div class='p-2'>
                        <h4>First Name</h4>
                        <input type='text' name='fname' class='form-control' style='width:200%; max-width:400px;' v-model='credential.fname' />
                    </div>
                    <div class='fs-gap p-2'>
                        <h4>Last Name</h4>
                        <input type='text' name='lname' class='form-control'  style='width:200%; max-width:400px;' v-model='credential.lname'/>
                    </div>
                    <div class='p-2' width='200%; max-width:400px;'>
                        <button class='btn btn-primary' @click='confirm'>
                        <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show='uloading'></span>
                        Update </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>`,

    data(){
        return{
            credential:{
                'email':'', "last_visit":'', "role":'', "fname":'', "lname":'',
                'store_name':'', 'user_id':'' //user_id is the store id
            }, loading:false, error:false, error_message:"", uloading:false, updated:false
        }
    },

    methods:{
        close_message(){
            this.updated=false
        },

        confirm(){
            this.uloading=true
            fetch('/api/current_user', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:JSON.stringify(this.credential)
            }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                else{
                    return Promise.reject(res.statusText)
                }
            }).then((data)=>{
                this.credential=data
                this.updated=true
                
            }).catch((error)=>{
                this.error=true,
                this.error_message=error
            }).finally(()=>{
                this.uloading=false,
                this.$store.dispatch('fetchUser')
            })
        }
    },

    created(){
        this.loading=true
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
            this.credential=data
        }).catch((error)=>{
            this.error=true,
            this.error_message=error
        }).finally(()=>{
            this.loading=false
        })
    },

    mounted(){
        document.title='Profile'
    }
}