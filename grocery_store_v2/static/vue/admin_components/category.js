export default{
    name:'admin_category',
    template:`<div>
    
    <h2 class="border-bottom p-4 d-flex justify-content-center">Categories</h2> 

    <div v-show="error">
        <div class="alert alert-danger" role="alert">
        Error : {{error_message}}
        </div>
    </div>

    <div class="card">
    <div class="card-body">
    <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#category_form">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
            <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"></path>
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"></path>
            </svg>
            Add Categories
        </button>
    </div>
    <div v-show="alreadyexists">
        <div class="py-3 d-flex justify-content-center">
            <div class="alert alert-primary p-3 m-0 d-flex justify-content-center">
                The category already exists!
                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
            </div>
        </div>
    </div>
    <div v-show="added">
        <div class="py-3 d-flex justify-content-center">
            <div class="alert alert-success p-3 m-0 d-flex justify-content-center">
                The category has been added!
                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
            </div>
        </div>
    </div>
    <div v-show="updated">
        <div class="py-3 d-flex justify-content-center">
            <div class="alert alert-success p-3 m-0 d-flex justify-content-center">
                The category is Updated!
                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
            </div>
        </div>
    </div>
    <div v-show="deleted">
        <div class="py-3 d-flex justify-content-center">
            <div class="alert alert-danger p-3 m-0 d-flex justify-content-center">
                The category has been Deleted!
                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
            </div>
        </div>
    </div>
    </div>
    </div>


    <div v-show="loading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div v-show="!loading">

        <div v-show="empty">
            <div id="no_items" class="d-flex justify-content-center p-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
            </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4">
                <div>
                    <h1>No categories!!</h1>
                </div>
            </div>
        </div>

        <div v-show="!empty">
            <div class="row row-cols-2 py-3">
                <div class="col-lg-2 p-3 card" v-for="ele in categories" :key="ele.section_id">
                    <div class="d-flex justify-content-center ">
                        <img :src="'/static/img/'+ele.section_id+'s.jpg'+ '?v=' + imageversion" class="img-thumbnail rounded" alt="category">
                    </div>
                    <h4 class="fw-normal d-flex justify-content-center">{{ele.name}}</h4>
                    <div class="d-flex justify-content-center">{{ele.section_code}}</div>
                    <div class="d-flex justify-content-center">{{ele.description}}</div>
                    <div class="btn-group btn-group-sm">
                        <button id="update" aria-label="update" class="btn btn-outline-info p-2" data-bs-toggle="modal" data-bs-target="#update_category_form" @click="update_item_function(ele)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                            <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                            </svg>
                        </button>
                        <button id="delete" aria-label="delete" class="btn btn-outline-danger p-2" data-bs-toggle="modal" data-bs-target="#delete_category" @click="item(ele)">
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

        <!-- New category Modal-->
        <div class="modal fade" id="category_form" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header mx-auto">
                <h3>Add Category </h3>
            </div>
            <div class="modal-body p-4">
                <div class="col-sm-10 position-relative">
                    <label  class="form-label">Category Code</label>
                    <input type="text" class="form-control" :class="ccode_validation" name="section_code" v-model="create.code" v-on:input="ccode_validate">
                    <div id="invalid_code" class="invalid-feedback">
                            Atleast 2 characters!
                    </div>
                </div>
                <div class="col-sm-10 position-relative">
                    <label  class="form-label">Category name</label>
                    <input type="text" class="form-control" :class="cname_validation"  name="category_name" v-model="create.name" v-on:input="cname_validate">
                    <div id="invalid_code" class="invalid-feedback">
                        Atleast 2 characters!
                    </div>
                </div>
                <div class="col-sm-10 position-relative">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" :class="cdesc_validation"  name="description" v-model="create.desc" v-on:input="cdesc_validate">
                    <div id="invalid_code" class="invalid-feedback">
                        Atleast 2 characters!
                    </div>
                </div>
                <div class="col-sm-10 position-relative">
                    <label class="form-label">Image</label>
                    <input type="file" class="form-control" :class="cfile_validation"  name="file" ref='fileinput'  @change='selected'>
                    <div id="invalid_code" class="invalid-feedback">
                        Select a file!
                    </div>
                </div>
                <div class="py-2">
                    <button type="submit" class="btn btn-primary" @click="check">Create</button>
                </div>
            </div>
            <div class="modal-footer">
                <button id='closemodal' type="button" class="btn btn-secondary" data-bs-dismiss="modal"  @click='dismiss_errors'>Close</button>
            </div>
            </div>
        </div>
        </div>

        <!--delete category modal-->
        <div class="modal fade" id="delete_category" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header mx-auto">
                <h3>Confirm Delete! </h3>
            </div>
            <div class="modal-body p-4">
                Are you sure you want to Delete this Category?
                <br>
                <br>
                <div>
                <h5 id="cat_name"> Name : {{delete_item.name}} </h5>
                </div>
                <div><h5 id="cat_code"> Code : {{delete_item.section_code}} </h5></div>
                <br>
                <div><h5> *remember doing so will remove all the products in this category! </h5></div>
                <br>
                <div>
                <button id="confirm_delete" class="btn btn-danger" @click="delete_category(delete_item.section_code)">Delete</button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

        <!--Update category modal-->
        <div class="modal fade" id="update_category_form" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header mx-auto">
                <h3>Update Category </h3>
                </div>
                <div class="modal-body p-4">
                    <div class="col-sm-10 position-relative">
                    <label  class="form-label">Category Code</label>
                    <input  id="update_code" type="text" class="form-control"  name="section_code" v-model="update.code" disabled>
                    </div>
                    <div class="col-sm-10 position-relative">
                    <label  class="form-label">Category name</label>
                    <input id="update_name" type="text" class="form-control" :class="uname_validation" name="name" v-model="update.name" v-on:input="uname_validate">
                        <div id="invalid_code" class="invalid-feedback">
                            Atleast 2 characters!
                        </div>
                    </div>
                    <div class="col-sm-10 position-relative">
                    <label class="form-label">Description</label>
                    <input id="update_desc" type="text" class="form-control" :class="udesc_validation"  name="description" v-model="update.desc" v-on:input="udesc_validate">
                        <div id="invalid_code" class="invalid-feedback">
                            Atleast 2 characters!
                        </div>
                    </div>
                    <div class="col-sm-10 position-relative">
                    <label class="form-label">Image</label>
                    <input type="file" class="form-control"  name="file" id="update_image"  ref='ufileinput' @change='uselected'>
                    </div>
                    <div class="py-2">
                        <button type="submit" class="btn btn-primary" @click="ucheck">Update</button>
                    </div>
        
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click='dismiss_errors'>Close</button>
                </div>
            </div>
            </div>
        </div>

    </div>
    </div>
    </div>`,

    data(){
        return { imageversion:0,
            alreadyexists:false, added:false, updated:false, deleted:false, empty:true, loading:true, delete_item:{name:""},
            ccode:false, cname:false, cdesc:false, cfile:false, select:false, 
            uname:false, udesc:false, uselect:false,
            create:{code:"", name:"", desc:"", file:""},
            update:{code:"", name:"", desc:"", file:""},
            categories:[], error:false, error_message:''
        }
    },

    methods:{

        dismiss_errors(){
            this.ccode=false,
            this.cname=false,
            this.cdesc=false,
            this.cfile=false,
            this.uname=false,
            this.udesc=false


        },

        item(ele){
            this.delete_item=ele

        },

        update_item_function(ele){
            this.update.code=ele.section_code,
            this.update.name=ele.name,
            this.update.desc=ele.description

        },

        delete_category(code){
            
            fetch('/api/section/'+code, {
                method:'DELETE',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                }
            }).then((res)=>{
                
                if(res.status==200){
                    return res.json()
                }
                else{
                    return Promise.reject(res.statusText)
                }
            }).then((data)=>{
                this.categories = this.categories.filter(item => item.section_code !== data.section_code);
                if(this.categories.length==0){
                    this.empty=true
                }
                this.deleted=true,
                this.updated=false,
                this.added=false,
                this.alreadyexists=false
                $('#delete_category').modal('hide')
                
            }).catch((error)=>{
                this.error=true,
                this.error_message=error
            })
            

        },

        close_message(){
            this.alreadyexists=false,
            this.added=false,
            this.updated=false,
            this.deleted=false

        },

        selected(event){
            this.select=true,
            this.cfile=false,
            this.create.file=event.target.files[0];

        },

        uselected(event){
            this.uselect=true,
            this.update.file=event.target.files[0];

        },

        ccode_validate(){
            if(this.create.code==""){
            this.ccode=false}

            else if(this.create.code.length>=2){
                this.ccode=false

            }
            else{
                this.ccode=true
            }

        },

        cname_validate(){
            if(this.create.name==""){
                this.cname=false
            }
            else if(this.create.name.length>=2){
                
                this.cname=false
            }
            else{
                this.cname=true
            }

        },

        uname_validate(){
            if(this.update.name==""){
                this.uname=false
            }
            else if(this.update.name.length>=2){
                this.uname=false
            }
            else{
                this.uname=true
            }

        },

        cdesc_validate(){
            if(this.create.desc==""){
                this.cdesc=false
            }
            else if(this.create.desc.length>=2){
                
                this.cdesc=false
            }
            else{
                this.cdesc=true
            }

        },

        udesc_validate(){
            if(this.update.desc==""){
                this.udesc=false
            }
            else if(this.update.desc.length>=2){
                
                this.udesc=false
            }
            else{
                this.udesc=true
            }

        },

        check(){
            if(this.create.code.length>=2 && this.create.name.length>=2 && this.create.desc.length>=2 && this.select==true){
                this.proceed_create();

            }
            else{ 
                if(this.select==false){
                this.cfile=true}
                if(this.create.code==""){
                    this.ccode=true
                }
                if(this.create.name==""){
                    this.cname=true
                }
                if(this.create.desc==""){
                    this.cdesc=true
                }
    
            } 

        },

        ucheck(){
            if(this.update.name.length>=2 && this.update.desc.length>=2){
                this.proceed_update();

            }
            else{ 
                if(this.update.name==""){
                    this.uname=true
                }
                if(this.update.desc==""){
                    this.udesc=true
                }
    
            } 

        },

        proceed_create(){
            const formdata= new FormData();
            formdata.append('category_name', this.create.name);
            formdata.append('section_code', this.create.code);
            formdata.append('description', this.create.desc);
            formdata.append('file', this.create.file)


            fetch('/api/section', {
                method:'POST',
                headers:{ 
                    'auth-token': localStorage.getItem('auth-token')

                },
                body:formdata,
            }).then((res)=>{
                if(res.status==201){
                    this.added=true
                    this.alreadyexists=false,
                    this.updated=false,
                    this.deleted=false,
                    this.empty=false
                    return res.json()
                }
                else{
                    return Promise.reject(res.status)
                }
            }).then((data)=>{
                this.categories.push(data)
                
            }).catch((error)=>{
                if(error==409){
                    this.alreadyexists=true
                    this.added=false,
                    this.deleted=false,
                    this.updated=false
                }
                else{
                    this.error=true,
                    this.error_message=error
                }
            })

            this.create.code='',
            this.create.name='',
            this.create.desc='',
            this.select=false
            var fileinput = this.$refs.fileinput;
            if (fileinput) {
            fileinput.value = '';}
            $('#category_form').modal('hide');

        },

        proceed_update(){
            const formdata= new FormData();
            formdata.append('category_name', this.update.name);
            formdata.append('section_code', this.update.code);
            formdata.append('description', this.update.desc);
            formdata.append('file_selected', this.uselect);
            formdata.append('file', this.update.file)

            fetch('/api/section',{
                method: 'PUT',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                },
                body: formdata,
            }).then((res)=>{
                if(res.status==200){
                    this.added=false
                    this.alreadyexists=false,
                    this.updated=true,
                    this.deleted=false
                    return res.json()
                }
                else{
                    return Promise.reject(res.statusText)
                }
            }).then((data)=>{
                const indexToRemove = this.categories.findIndex(item => item.section_id == data.section_id);

                if (indexToRemove !== -1) {
                this.categories.splice(indexToRemove, 1, data);
                }
                
                const now = new Date();
                this.imageversion = now.toLocaleString();
                

            }).catch((error)=>{
               this.error=true,
               this.error_message=error

            })

            this.update.code='',
            this.update.name='',
            this.update.desc='',
            this.uselect=false
            var fileinput = this.$refs.ufileinput;
            if (fileinput) {
            fileinput.value = '';}
            $('#update_category_form').modal('hide');



        },

    },

    computed:{
        ccode_validation(){
            return{
                'is-invalid':this.ccode,
            }

        },

        cname_validation(){
            return {
                'is-invalid':this.cname,
            }
        },

        cdesc_validation(){
            return {
                'is-invalid':this.cdesc,
            }

        },

        cfile_validation(){
            return {
                'is-invalid':this.cfile,
            }

        },

        uname_validation(){
            return {
                'is-invalid':this.uname,
            }
        },

        udesc_validation(){
            return {
                'is-invalid':this.udesc,
            }

        },

    },

    mounted: function(){
        document.title='Category'

        fetch('/api/section', {
            headers: {
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('auth-token')
            }
        })
        .then((res)=>{
            if(res.ok){
            return res.json()}
            else{
                return Promise.reject(res.statusText)
            }
        }).then((data)=>{
            
            if(data.length!=0){
                this.empty=false
                this.categories=data
            }
            else{
                this.empty=true
            }
        }).finally(()=>{
            this.loading=false
        }).catch((error)=>{
            this.error=true,
            this.error_message=error
        })


        const now = new Date();
        this.imageversion = now.toLocaleString();
    }
}