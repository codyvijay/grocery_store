export default{
    name:'manager_products',
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
                <h2 class="border-bottom p-4 d-flex justify-content-center">Products</h2>

                <div class="card">
                <div class="card-body">

                    <div v-show="cloading">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-success" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>

                    <div v-show="!cloading">
                        <div v-show="categories_empty">
                            <div class="d-flex justify-content-center">
                                <button type="button" class="btn btn-primary" disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
                                    <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"></path>
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"></path>
                                    </svg>
                                    Please have atleast 1 category!
                                </button>
                            </div>

                        </div>
                        <div v-show="!categories_empty">
                            <div class="d-flex justify-content-center">
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#product_form">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
                                    <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"></path>
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"></path>
                                    </svg>
                                    Add Products
                                </button>
                            </div> 
                        </div>
                    </div>
                    <div v-show="added">
                        <div class="py-3 d-flex justify-content-center">
                            <div class="alert alert-success p-3 m-0 d-flex justify-content-center">
                                The product has been added!
                                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
                            </div>
                        </div>
                    </div>
                    <div v-show="updated">
                        <div class="py-3 d-flex justify-content-center">
                            <div class="alert alert-success p-3 m-0 d-flex justify-content-center">
                                The product is Updated!
                                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
                            </div>
                        </div>
                    </div>
                    <div v-show="deleted">
                        <div class="py-3 d-flex justify-content-center">
                            <div class="alert alert-danger p-3 m-0 d-flex justify-content-center">
                                The product has been Deleted!
                                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div v-show="ploading">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>

                <div v-show="!ploading">

                    <div v-show="products_empty">
                        <div id="no_items" class="d-flex justify-content-center p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-bag-x-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293 6.854 8.146z"/>
                            </svg>
                        </div>
                        <div id="no_items" class="d-flex justify-content-center p-4">
                            <div>
                                <h1>No Products!!</h1>
                            </div>
                        </div>
                    </div>

                    <div v-show="!products_empty">

                    <div class="row row-cols-2 py-3">
                        <div class="col-lg-2 p-3 card" v-for="ele in products" :key="ele.product_id">
                            <div class="d-flex justify-content-center ">
                                <img :src="'/static/img/'+ele.product_id+'p.jpg'+ '?v=' + imageversion" class="img-thumbnail rounded" alt="product">
                            </div>
                            <h4 class="fw-normal d-flex justify-content-center">{{ele.name}}</h4>
                            <div class="d-flex justify-content-center"> {{ele.category_name}}</div>
                            <div class="d-flex justify-content-center"><strong>quantity : {{ele.quantity}}</strong></div>
                            <div class="d-flex justify-content-center"><strong>₹{{ele.price}} {{ele.unit}}</strong></div>
                            <div class="btn-group btn-group-sm">
                                <button id="update" aria-label="update" class="btn btn-outline-info p-2" data-bs-toggle="modal" data-bs-target="#update_product_form" @click="update_item_function(ele)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-recycle" viewBox="0 0 16 16">
                                    <path d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"/>
                                    </svg>
                                </button>
                                <button id="delete" aria-label="delete" class="btn btn-outline-danger p-2" data-bs-toggle="modal" data-bs-target="#delete_product" @click="item(ele)">
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
        </div> 
        
        

        <!-- New product Modal-->
        <div class="modal fade" id="product_form" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header mx-auto">
                <h3>Add Product</h3>
            </div>
            <div class="modal-body p-4">
                <div class="col-sm-10 position-relative">
                    <label  class="form-label">Product name</label>
                    <input type="text" class="form-control" :class="cname_validation"  name="product_name" v-model="create.name" v-on:input="cname_validate">
                    <div id="invalid_name" class="invalid-feedback">
                        Atleast 2 characters!
                    </div>
                </div>
                <div class="col-sm-10 position-relative">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" :class="cdesc_validation"  name="description" v-model="create.desc" v-on:input="cdesc_validate">
                    <div id="invalid_description" class="invalid-feedback">
                        Atleast 2 characters!
                    </div>
                </div>
                <div class="col-sm-10 position-relative">
                    <label class="form-label">Price</label>
                    <input type="number" class="form-control" :class="cprice_validation" min="0"  name="price" step="0.01" v-model="create.price" v-on:input="cprice_validate">
                    <div id="invalid_price" class="invalid-feedback">
                        Enter valid price!
                    </div>
                </div>
                <div class="col-sm-10 position-relative">
                    <label class="form-label">Quantity</label>
                    <input type="number" class="form-control" :class="cqty_validation" min="0"  name="quantity" step="0.01" v-model="create.quantity" v-on:input="cqty_validate">
                    <div id="invalid_quantity" class="invalid-feedback">
                        Enter valid quantity!
                    </div>
                </div>
                <div class="col-sm-10 position-relative">
                    <label class="form-label">Category</label>
                    <select class="form-select" v-model='create.section_code' name='category' :class="ccat_validation" @change='ccat_validate'>
                        <option v-for="ele in categories" :value="ele.section_code">{{ele.name}}</option>
                    </select>
                    <div id="invalid_category" class="invalid-feedback">
                        Please select category!
                    </div>
                </div>
                <div class="col-sm-10 position-relative">
                    <label class="form-label">Unit</label>
                    <select class="form-select" v-model='create.unit' name='unit' :class="cunit_validation" @change='cunit_validate'>
                        <option value="Rs./Unit" selected>Rs./Unit</option>
                        <option value="Rs./Kg">Rs./Kg</option>
                        <option value="Rs./Liter">Rs./Liter</option>
                        <option value="Rs./Dozen">Rs./Dozen</option>
                        <option value="Rs./Box">Rs./Box</option>
                        <option value="Rs./500g">Rs./500g</option>
                    </select>
                    <div id="invalid_unit" class="invalid-feedback">
                        Please select Unit!
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

        <!--delete product modal-->
        <div class="modal fade" id="delete_product" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header mx-auto">
                <h3>Confirm Delete! </h3>
            </div>
            <div class="modal-body p-4">
                Are you sure you want to Delete this Product?
                <br>
                <br>
                <div>
                <h5 id="pro_name">Product Name : {{delete_item.name}} </h5>
                </div>
                <div><h5 id="pro_code"> Code : {{delete_item.product_code}} </h5></div>
                <div><h5 id="pro_code"> Product category : {{delete_item.category_name}} </h5></div>
                <br>
                <br>
                <div>
                <button id="confirm_delete" class="btn btn-danger" @click="delete_product(delete_item.product_code)">Delete</button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>


        <!--Update product modal-->
        <div class="modal fade" id="update_product_form" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header mx-auto">
                <h3>Update Product </h3>
                </div>
                <div class="modal-body p-4">
                    <div class="col-sm-10 position-relative">
                    <label  class="form-label">Product name</label>
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
                        <label class="form-label">Price</label>
                        <input type="number" class="form-control" :class="uprice_validation" min="0"  name="price" v-model="update.price" v-on:input="uprice_validate">
                        <div id="invalid_price" class="invalid-feedback">
                            Enter valid price!
                        </div>
                    </div>
                    <div class="col-sm-10 position-relative">
                        <label class="form-label">Quantity</label>
                        <input type="number" class="form-control" :class="uqty_validation" min="0"  name="quantity" v-model="update.quantity" v-on:input="uqty_validate">
                        <div id="invalid_quantity" class="invalid-feedback">
                            Enter valid quantity!
                        </div>
                    </div>
                    <div class="col-sm-10 position-relative">
                        <label class="form-label">Category</label>
                        <select class="form-select" v-model='update.section_code' name='category' :class="ucat_validation" @change='ucat_validate'>
                            <option v-for="ele in categories" :value="ele.section_code">{{ele.name}}</option>
                        </select>
                        <div id="invalid_category" class="invalid-feedback">
                            Please select category!
                        </div>
                    </div>
                    <div class="col-sm-10 position-relative">
                        <label class="form-label">Unit</label>
                        <select class="form-select" v-model='update.unit' name='unit' :class="uunit_validation" @change='uunit_validate'>
                            <option value="Rs./Unit" selected>Rs./Unit</option>
                            <option value="Rs./Kg">Rs./Kg</option>
                            <option value="Rs./Liter">Rs./Liter</option>
                            <option value="Rs./Dozen">Rs./Dozen</option>
                            <option value="Rs./Box">Rs./Box</option>
                            <option value="Rs./500g">Rs./500g</option>
                        </select>
                        <div id="invalid_unit" class="invalid-feedback">
                            Please select Unit!
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
    </div>`,

    data(){
        return { categories:[], products:[], ploading:true, error:false, error_message:"", added:false, updated:false,
        deleted:false, cloading:true, create:{name:"", desc:"", price:"", section_code:"", quantity:"", unit:"", file:""},
        update:{name:"", desc:"", price:"", section_code:"", quantity:"", unit:"", file:"", product_code:""},
        cname:false, cdesc:false, cfile:false, cqty:false, cprice:false, select:false, ccat:false, cunit:false,
        uname:false, udesc:false, uqty:false, uprice:false, uselect:false, ucat:false, uunit:false, delete_item:{},
        imageversion:0,
            
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

        categories_empty: function(){
            return this.categories.length==0;
        },

        products_empty: function(){
            return this.products.length==0;

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

        cqty_validation(){
            return {
                'is-invalid':this.cqty,
            }

        },

        cprice_validation(){
            return {
                'is-invalid':this.cprice,
            }

        },

        cunit_validation(){
            return {
                'is-invalid':this.cunit,
            }

        },

        ccat_validation(){
            return {
                'is-invalid':this.ccat,
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

        uqty_validation(){
            return {
                'is-invalid':this.uqty,
            }

        },

        uprice_validation(){
            return {
                'is-invalid':this.uprice,
            }

        },

        uunit_validation(){
            return {
                'is-invalid':this.uunit,
            }

        },

        ucat_validation(){
            return {
                'is-invalid':this.ucat,
            }

        },
    },

    methods:{

        delete_product(code){
            
            fetch('/api/product/'+code, {
                method:'DELETE',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                }
            }).then((res)=>{
                
                if(res.status==200){
                    this.deleted=true,
                    this.updated=false,
                    this.added=false
                    return res.json()
                }
                else{
                    return Promise.reject(res.status)
                }
            }).then((data)=>{
                this.products = this.products.filter(item => item.product_code !== data.product_code);
                $('#delete_product').modal('hide')
                
            }).catch((error)=>{
                console.log(error)
            })
            

        },

        uselected(event){
            this.uselect=true,
            this.update.file=event.target.files[0];

        },

        update_item_function(ele){
            
            this.update.name=ele.name,
            this.update.desc=ele.description,
            this.update.unit=ele.unit,
            this.update.price=ele.price,
            this.update.quantity=ele.quantity,
            this.update.section_code=ele.section_code
            this.update.product_code=ele.product_code


        },

        item(ele){
            this.delete_item=ele

        },

        dismiss_errors(){
            this.cname=false,
            this.cdesc=false,
            this.cfile=false,
            this.cqty=false,
            this.cprice=false
            this.cunit=false,
            this.ccat=false,
            this.uname=false,
            this.udesc=false,
            this.uqty=false,
            this.uprice=false
            this.uunit=false,
            this.ucat=false,
            this.create.name='',
            this.create.desc='',
            this.create.price='',
            this.create.quantity='',
            this.create.section_code='',
            this.create.unit='',
            this.select=false
            var fileinput = this.$refs.fileinput;
            if (fileinput) {
            fileinput.value = '';}
            

        },

        close_message(){
            this.added=false,
            this.updated=false,
            this.deleted=false

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

        cprice_validate(){
            if(this.create.price==""){
                this.cprice=false
            }
            else if(this.create.price>=0){
                
                this.cprice=false
            }
            else{
                this.cprice=true
            }

        },

        cqty_validate(){
            if(this.create.quantity==""){
                this.cqty=false
            }
            else if(this.create.quantity>=0){
                
                this.cqty=false
            }
            else{
                this.cqty=true
            }

        },

        cunit_validate(){
            if(this.create.unit==""){
                this.cunit=false
            }
            else if(this.create.unit.length>0){
                
                this.cunit=false
            }
            else{
                this.cunit=true
            }

        },

        ccat_validate(){
            if(this.create.section_code==""){
                this.ccat=false
            }
            else if(this.create.section_code.length>0){
                
                this.ccat=false
            }
            else{
                this.ccat=true
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

        uprice_validate(){
            if(this.update.price==""){
                this.uprice=false
            }
            else if(this.update.price>=0){
                
                this.uprice=false
            }
            else{
                this.uprice=true
            }

        },

        uqty_validate(){
            if(this.update.quantity==""){
                this.uqty=false
            }
            else if(this.update.quantity>=0){
                
                this.uqty=false
            }
            else{
                this.uqty=true
            }

        },

        uunit_validate(){
            if(this.update.unit==""){
                this.uunit=false
            }
            else if(this.update.unit.length>0){
                
                this.uunit=false
            }
            else{
                this.uunit=true
            }

        },

        ucat_validate(){
            if(this.update.section_code==""){
                this.ucat=false
            }
            else if(this.update.section_code.length>0){
                
                this.ucat=false
            }
            else{
                this.ucat=true
            }

        },

        selected(event){
            this.select=true,
            this.cfile=false,
            this.create.file=event.target.files[0];

        },

        check(){
            let price=parseFloat(this.create.price)
            let quantity=parseFloat(this.create.quantity)
            
            if(this.create.name.length>=2 && this.create.desc.length>=2 && this.select==true && price>=0 && quantity>=0){
                this.proceed_create();

            }
            else{ 
                if(this.select==false){
                this.cfile=true}
                if(this.create.name==""){
                    this.cname=true
                }
                if(this.create.desc==""){
                    this.cdesc=true
                }
                if(this.create.quantity=="" || quantity<0){
                    this.cqty=true
                }
                if(this.create.price=="" || price<0){
                    this.cprice=true
                }
                if(this.create.unit==""){
                    this.cunit=true
                }
                if(this.create.section_code==""){
                    this.ccat=true
                }
            } 

        },

        ucheck(){
            let price=parseFloat(this.update.price)
            let quantity=parseFloat(this.update.quantity)
            
            if(this.update.name.length>=2 && this.update.desc.length>=2 && price>=0 && quantity>=0){
                this.proceed_update();

            }
            else{ 
                if(this.update.name==""){
                    this.uname=true
                }
                if(this.update.desc==""){
                    this.udesc=true
                }
                if(quantity<0 || this.update.quantity===''){
                    this.uqty=true
                }
                if(price<0 || this.update.price===""){
                    this.uprice=true
                }
                if(this.update.unit==""){
                    this.uunit=true
                }
                if(this.update.section_code==""){
                    this.ucat=true
                }
    
            } 

        },

        proceed_create(){
            let price=parseFloat((parseFloat(this.create.price)).toFixed(2))
            let quantity=parseFloat(parseFloat((this.create.quantity)).toFixed(2))

            const formdata= new FormData();
            formdata.append('name', this.create.name);
            formdata.append('section_code', this.create.section_code);
            formdata.append('description', this.create.desc);
            formdata.append('file', this.create.file)
            formdata.append('unit', this.create.unit)
            formdata.append('price', price)
            formdata.append('quantity', quantity)

            fetch('/api/product', {
                method: 'POST', 
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:formdata
            }).then((res)=>{
                if(res.ok){
                    this.added=true
                    this.updated=false,
                    this.deleted=false
                    return res.json()
                }
                else{
                    return Promise.reject(res.statusText)
                }
            }).then((data)=>{
                this.added=true,
                this.products.push(data)

            }).catch((error)=>{
                this.error=true,
                this.error_message=error,
                console.log(message)
            }).finally(()=>{
                this.create.name='',
                this.create.desc='',
                this.create.price='',
                this.create.quantity='',
                this.create.section_code='',
                this.create.unit='',
                this.select=false
                var fileinput = this.$refs.fileinput;
                if (fileinput) {
                fileinput.value = '';}
                $('#product_form').modal('hide');
            })

            




        },

        proceed_update(){
            let price=parseFloat((parseFloat(this.update.price)).toFixed(2))
            let quantity=parseFloat(parseFloat((this.update.quantity)).toFixed(2))

            const formdata= new FormData();
            formdata.append('name', this.update.name);
            formdata.append('section_code', this.update.section_code);
            formdata.append('product_code', this.update.product_code);
            formdata.append('description', this.update.desc);
            formdata.append('file', this.update.file)
            formdata.append('unit', this.update.unit)
            formdata.append('price', price)
            formdata.append('quantity', quantity)
            formdata.append('file_selected', this.uselect)

            fetch('api/product', {
                method:'PUT',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')

                },
                body:formdata
            }).then((res)=>{
                if(res.ok){
                    this.added=false
                    this.updated=true,
                    this.deleted=false
                    return res.json()
                }
                else{
                    return Promise.reject(res.status)
                }
            }).then((data)=>{
                const indexToRemove = this.products.findIndex(item => item.product_id == data.product_id);

                if (indexToRemove !== -1) {
                this.products.splice(indexToRemove, 1, data);
                }

                const now = new Date();
                this.imageversion = now.toLocaleString();
                


            }).catch((error)=>{
                this.error=true,
                this.error_message=error,
                console.log(error)
            }).finally(()=>{
                this.update.name='',
                this.update.desc='',
                this.update.price='',
                this.update.quantity='',
                this.update.section_code='',
                this.update.unit='',
                this.uselect=false
                var fileinput = this.$refs.ufileinput;
                if (fileinput) {
                fileinput.value = '';}
                $('#update_product_form').modal('hide');
                })

            
        }

    },

    mounted : function(){ 
        document.title='Products'

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

                fetch('/api/section', {
                    method:'GET',
                    headers: {
                        'Content-Type':'application/json',
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
                    this.categories=data
        
                }).catch((error)=>{
                    this.error=true,
                    this.error_message=error,
                    console.log(error)
                }).finally(()=>{
                    this.cloading=false
                })
        
                fetch('/api/product',{
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
                        return Promise.reject(res.json())
                    }
                }).then((data)=>{
                    this.products=data
        
                }).catch((error)=>{
                    this.error=true,
                    this.error_message=error,
                    console.log(error)
                }).finally(()=>{
                    this.ploading=false
                })
                const now = new Date();
                this.imageversion = now.toLocaleString();
            }
        }).catch((error)=>{
            this.error=true,
            this.error_message=error
        })
        
        

    }
}