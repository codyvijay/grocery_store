export default{
    name:'register',
    template: `<div>
        <div class="alert alert-danger" role="alert" v-show='error'>
        {{error_response}}
        </div>
        <div class="alert alert-danger" role="alert" v-show='nosubmit'>
            Please enter valid data to submit!
        </div>
    <div class='card-group'>
    <div class="col-6">
        <div class="py-5">
            <h2 class='py-4'>Register</h2>
            <div class="p-2">
                <h5>Email</h5>
                <input type='email' name='email' class='form-control' :class="validation" style='width:200%; max-width:400px;' v-model='credential.email' v-on:input='emailvalidata'/>
                    <div id="valid_email" class="valid-feedback">
                        Looks good!
                    </div>
                    <div id="invalid_email" class="invalid-feedback">
                        Enter valid email!
                    </div>
            </div>
            <div class='fs-gap p-2'>
                <h5>Password</h5>
                <input type='password' name='password' class='form-control' :class="pvalidation" style='width:200%; max-width:400px;' v-model='credential.password' v-on:input='passwordcheck'/>
                    <div id="valid_password" class="valid-feedback">
                        Looks good!
                    </div>
                    <div id="invalid_password" class="invalid-feedback">
                            Password should be of 8 characters!
                    </div>
            </div>
            <div class='fs-gap p-2'>
                <h5>Confirm Password</h5>
                <input type='password' name='confirm password' class='form-control' :class="pcheckvalidation" style='width:200%; max-width:400px;' v-model='credential.confirmpassword' v-on:input='repasswordcheck'/>
                <div id="valid_re_password" class="valid-feedback">
                    Looks good!
                </div>
                <div id="invalid_re_password" class="invalid-feedback">
                        password not matching!
                </div>
            </div>
            <div class='p-2'>
                <h5>Select Account type</h5>
                    <select class="form-select" style='width:200%; max-width:400px;' v-model='accounttype' name='select account type'>
                        <option value="2" selected>Normal User</option>
                        <option value="4">Store Manager</option>
                    </select>
            </div>
            <div class='p-2' width='200%; max-width:400px;'>
                <button class='btn btn-primary' @click='confirm'> 
                <span class="spinner-border spinner-border-sm" aria-hidden="true" v-show='loading'></span>
                 Register </button>
            </div>
            <div class='p-2'>Already have an Account? <router-link to='/login'>Log In</router-link></div>
        </div>
    </div>
    <div class='col'>
        <div class='p-5'>
            <div class="d-flex justify-content-center">
                <img src="/static/img/register.png" class="login_img">
            </div>
        </div>
    </div>
    </div>
    </div>`,

    data(){
        return {
            einvalid:false, evalid:false, pvalid:false, pinvalid:false, pcheckvalid:false, pcheckinvalid:false, nosubmit:false,
            loading:false,
            error:false,
            error_response:'',
            credential:{
                email:null,
                password:null,
                confirmpassword:null,
            },
            accounttype:2,
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

            }
            else{
                this.einvalid=true
                this.evalid=false
                this.nosubmit=false
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
            }
            else{
                this.pvalid=false,
                this.pinvalid=true
                this.nosubmit=false
            }

        },
        repasswordcheck(){
            if(this.credential.confirmpassword==""){
                this.pcheckinvalid=false,
                this.pcheckvalid=false
            }
            else if(this.credential.confirmpassword==this.credential.password){
                this.pcheckvalid=true,
                this.pcheckinvalid=false
                this.nosubmit=false
            }
            else{
                this.pcheckinvalid=true,
                this.pcheckvalid=false
                this.nosubmit=false
            }

        },
        registeruser(){
            this.loading=true;
            fetch('/register', {
                    method:'POST',
                    body : JSON.stringify(this.credential),
                    headers: {
                        'Content-Type':'application/json',
                    },
                }).then((res)=>{
                    return res.json()
                }).then((data)=>{
                    if(data.meta.code==200){
                        return fetch('/api/register', {
                            method:'POST',
                            body : JSON.stringify({'email':this.credential.email, 'role': this.accounttype}),
                            headers : {
                                'content-Type' : 'application/json',
                            },
                        }).then((res)=>{
                           
                            fetch('/logout')
                            return res.json()
                        }).then((data)=>{
                            if(data.status=='200'){
                                return(this.$router.push('/login?register=success'))
                            }
                            else{
                                return(this.$router.push('/login?register=failed'))
                            }
                        }).finally(()=>{
                            this.loading=false;
                        })
                    }
                    else if(data.meta.code==400){
                        this.error=true,
                        this.error_response=data.response.errors[0]
                        this.loading=false;

                    }
                })
        },
        confirm(){
            if(this.evalid && this.pvalid && this.pcheckvalid){
                this.registeruser();
            }
            else{
                this.nosubmit=true

            }

        },
    },

    computed : {
        validation(){
            return {
                'is-valid':this.evalid,
                'is-invalid':this.einvalid,
            };

        },
        pvalidation(){
            return{
                'is-valid':this.pvalid,
                'is-invalid':this.pinvalid
            };
        },
        pcheckvalidation(){
            return {
                'is-valid':this.pcheckvalid,
                'is-invalid':this.pcheckinvalid
            };

        },


    },

    mounted:function(){
        document.title='Register';
    
    }
    
}