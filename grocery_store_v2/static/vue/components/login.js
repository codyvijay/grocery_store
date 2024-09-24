
export default {
    name:'login',
    template:`<div>
        <div class="alert alert-danger" role="alert" v-show='error'>
        {{error_response}}
        </div>
        <div class="alert alert-success" role="alert" v-show='showsuccess'>
        Your registration is successful! Please Login to continue.
        </div>
        <div class="alert alert-danger" role="alert" v-show='showfailed'>
        Your registration failed! Please try again.
        </div>
        <div class="alert alert-danger" role="alert" v-show='nosubmit'>
            Please enter valid data to Login!
        </div>
        <div class='card-group'>
            <div class='col-6'>
                <div class='py-5'>
                    <h2 class="py-4">Login</h2>
                    <div class='p-2'>
                        <h5>Email</h5>
                        <input type='email' name='email' class='form-control' :class="validation" style='width:200%; max-width:400px;' v-model='credential.email' v-on:input='emailvalidata'/>
                            <div id="invalid_email" class="invalid-feedback">
                                Enter valid email!
                            </div>
                    </div>
                    <div class='fs-gap p-2'>
                        <h5>Password</h5>
                        <input type='password' name='password' class='form-control' :class="pvalidation" style='width:200%; max-width:400px;' v-model='credential.password' v-on:input='passwordcheck'/>
                        <div id="invalid_password" class="invalid-feedback">
                                Password should be of 8 characters!
                        </div>
                    </div>
                    <div class='p-2' width='200%; max-width:400px;'>
                        <button class='btn btn-primary' @click='confirm'>
                        <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show='loading'></span>
                         Login </button>
                    </div>
                    <div class='p-2'>Don't have an Account? <router-link to='/register'>Register</router-link></div>
                </div>
            </div>
            <div class="col">
                <div class="p-5">
                    <div class="d-flex justify-content-center">
                    <img src="/static/img/user_login.png" class="login_img">
                    </div>
                </div>
            </div>
        </div>
    </div>`,

    data(){
        return {einvalid:false, evalid:false, pvalid:false, pinvalid:false, nosubmit:false, loading:false,
            error_response:'',
            error:false,
            showsuccess:false,
            showfailed:false,
            credential:{
                email:null,
                password:null,
            }
        }
    },

    methods:{
        emailvalidata(){
            const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

            if(this.credential.email==""){
                this.einvalid=false,
                this.evalid=false

            }
            else if (emailPattern.test(this.credential.email)){
                this.evalid=true,
                this.einvalid=false
                this.nosubmit=false
                this.error=false

            }
            else{
                this.einvalid=true
                this.evalid=false
                this.nosubmit=false
                this.error=false
            }

        },
        passwordcheck(){
            if(this.credential.password==""){
                this.pvalid=false,
                this.pinvalid=false
            }
            else if(this.credential.password.length>=8){
                this.pvalid=true,
                this.pinvalid=false
                this.nosubmit=false
                this.error=false
            }
            else{
                this.pvalid=false,
                this.pinvalid=true
                this.nosubmit=false
                this.error=false
            }

        },

        loginuser(){
            this.loading=true;
            fetch('/login?include_auth_token', {
                method: 'POST',
                body: JSON.stringify(this.credential),
                headers: {
                    'Content-Type':'application/json',
                },
            }).then((res)=>{
                return res.json()  
            }).then((data)=>{
                if(data.meta.code==200){
                localStorage.setItem('auth-token', data.response.user.authentication_token)
                }
                else{
                    return Promise.reject(data.response.errors[0])
                }
            }).then(()=> {window.location.href="/"}).catch((error)=>{
                this.error=true,
                this.error_response=error
            }).finally(()=>{
                this.loading=false;
            })
            
            
            

        },


        confirm(){
            if(this.evalid && this.pvalid){
                this.loginuser();
            }
            else{ 
                this.nosubmit=true

            }
        },

    },

    computed : {
        validation(){
            return {
                'is-invalid':this.einvalid,
            };

        },
        pvalidation(){
            return{
                'is-invalid':this.pinvalid
            };
        },

    },

    mounted: function(){
        document.title='Login';

        if(this.$route.query.register=='success'){
            this.showsuccess=true

        }
        else if(this.$route.query.register=='failed'){
            this.showfailed=true
        }
        else{
            this.showsuccess=false,
            this.showfailed=false,
            this.present=false
        }
    }
}