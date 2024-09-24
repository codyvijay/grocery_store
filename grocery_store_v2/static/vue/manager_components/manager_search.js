export default{
    name:'manager_search',
    template: `<div> 
        <div v-show="loading">
            <div class="d-flex justify-content-center py-5">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>

        <div v-show="!loading">

            <div v-show="error">

            <div class="alert alert-warning" role="alert">
                {{error_message}}
            </div>

            </div>

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
                <div class="py-5">
                    <div class="d-flex" role="search">
                        <div class="input-group">
                            <span class="input-group-text" id="filter">
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#advanced_search" aria-expanded="false" aria-controls="collapseExample">
                                    More
                                </button>
                            </span>
                            <input class="form-control me-2 p-3" type="search" placeholder="Search Product or Category..." aria-label="Search" v-model="query">
                            <button class="btn btn-success"  @click="search">Search</button>
                        </div>
                    </div>
                </div>

                <div class="collapse" id="advanced_search">
                    <div class="card card-body">
                        <div class="row align-items-center">
                            <div class="col-md p-2 d-flex justify-content-center">
                                <div class="form-control-lg">
                                    <label class="form-label d-flex justify-content-center" for="search_in">Search In : </label>
                                    <select class="form-select" v-model='filter' name='filter' id="search_in" @change="re_search">
                                        <option value="all" selected>All</option>
                                        <option value="products">Products</option>
                                        <option value="categories">Categories</option>  
                                    </select>
                                </div> 
                            </div>
                            <div class="col-md p-2 d-flex justify-content-center">
                                <div class="form-control-lg">
                                    <label for="priceRange" class="d-flex justify-content-center">Price Range:</label>
                                    <div class="d-flex justify-content-center">
                                        <input id="priceRange" type="text" data-slider-min="0" data-slider-max="250" data-slider-step="10" data-slider-value="[0,250]" />
                                    </div>
                                    <p class=" d-flex justify-content-center">Selected Range: ₹{{ selectedRange[0] }} - ₹{{ selectedRange[1] }}{{max_reached}}</p>
                                </div>
                            </div>
                        
                            <div class="col-md p-2 d-flex justify-content-center">
                                <div class="form-check form-control-lg form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="only_out_of_stock" @change="re_search">
                                    <label class="form-check-label" for="flexSwitchCheckChecked">Only Out of stock</label>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

                <h3 class="border-bottom p-4">Search Results</h3>
                    <div v-show="pro_updated">
                        <div class="py-3 d-flex justify-content-center">
                            <div class="alert alert-success p-3 m-0 d-flex justify-content-center">
                                The product is Updated!
                                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
                            </div>
                        </div>
                    </div>
                    <div v-show="pro_deleted">
                        <div class="py-3 d-flex justify-content-center">
                            <div class="alert alert-danger p-3 m-0 d-flex justify-content-center">
                                The product has been Deleted!
                                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
                            </div>
                        </div>
                    </div>
                    <div v-show="updated">
                        <div class="py-3 d-flex justify-content-center">
                            <div class="alert alert-success p-3 m-0 d-flex justify-content-center">
                                Update request sent!
                                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
                            </div>
                        </div>
                    </div>
                    <div v-show="deleted">
                        <div class="py-3 d-flex justify-content-center">
                            <div class="alert alert-danger p-3 m-0 d-flex justify-content-center">
                                Delete request sent!
                                <button type="button" class="btn-close px-4" aria-label="Close" @click="close_message"></button>
                            </div>
                        </div>
                    </div>

                <div v-show="sloading">
                    <div class="d-flex justify-content-center p-5">
                        <div class="spinner-grow text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>

                <div v-show="!sloading">

                    <div v-if="((pro_result.length==0) && (cat_result.length==0) )">
                        <div id="no_items" class="d-flex justify-content-center p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </div>
                        <div id="no_items" class="d-flex justify-content-center p-4" v-if="searched==true">
                            <div>
                                <h2>No results found!</h2>
                            </div>
                        </div>
                        <div id="no_items" class="d-flex justify-content-center p-4" v-if="searched==false">
                            <div>
                                <h2>Search, Find or Explore!</h2>
                            </div>
                        </div>
                    </div>
                    <div v-else>

                        <div v-show="!cat_result_empty">
                            <h2 class="border-bottom p-4 d-flex justify-content-center">Categories</h2>
                            <div class="row row-cols-2">
                                <div class="col-lg-2 p-3 card" v-for="ele in categories" :key="ele.section_id" v-if="cat_present_in_result(ele.section_id)">
                                    <div class="d-flex justify-content-center ">
                                        <img :src="'/static/img/'+ele.section_id+'s.jpg'+ '?v=' + imageversion" class="img-thumbnail rounded" alt="product">
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
                            </div>
                        </div>
                        <br>

                        <div v-if="!pro_result_empty && atleast_pro_present">
                            <h2 class="border-bottom p-4 d-flex justify-content-center">Products</h2>
                            <div class="row row-cols-2 py-3">
                                <div class="col-lg-2 p-3 card" v-for="ele in products" :key="ele.product_id" v-if="pro_present_in_result(ele.product_id)">
                                    <div class="d-flex justify-content-center ">
                                        <img :src="'/static/img/'+ele.product_id+'p.jpg'+ '?v=' + imageversion" class="img-thumbnail rounded" alt="product">
                                    </div>
                                    <h4 class="fw-normal d-flex justify-content-center">{{ele.name}}</h4>
                                    <div class="d-flex justify-content-center"> {{ele.category_name}}</div>
                                    <div class="d-flex justify-content-center"><strong>quantity : {{ele.quantity}}</strong></div>
                                    <div class="d-flex justify-content-center"><strong>₹{{ele.price}} {{ele.unit}}</strong></div>
                                    <div class="btn-group btn-group-sm">
                                        <button id="update" aria-label="update" class="btn btn-outline-info p-2" data-bs-toggle="modal" data-bs-target="#update_product_form" @click="pupdate_item_function(ele)">
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
                        <div v-else-if="!pro_result_empty && !atleast_pro_present">
                        <h2 class="border-bottom p-4 d-flex justify-content-center">Products</h2>

                        <div id="no_items" class="d-flex justify-content-center p-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </div>
                        <div id="no_items" class="d-flex justify-content-center p-4" v-if="searched==true">
                            <div>
                                <h2>No Products found!</h2>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        
        

        <!--delete category modal-->
            <div class="modal fade" id="delete_category" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header mx-auto">
                    <h3>Confirm Request! </h3>
                </div>
                <div class="modal-body p-4">
                    Are you sure to send Delete Request?
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
                    <button id="confirm_delete" class="btn btn-danger" @click="delete_category(delete_item.section_code)">send</button>
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
                    <h3>Update Request </h3>
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
                        <div class="py-2">
                            <button type="submit" class="btn btn-primary" @click="ucheck">send</button>
                        </div>
            
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click='dismiss_errors'>Close</button>
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
                        <input id="update_pro_name" type="text" class="form-control" :class="puname_validation" name="name" v-model="pupdate.name" v-on:input="puname_validate">
                            <div id="invalid_code" class="invalid-feedback">
                                Atleast 2 characters!
                            </div>
                        </div>
                        <div class="col-sm-10 position-relative">
                        <label class="form-label">Description</label>
                        <input id="update_pro_desc" type="text" class="form-control" :class="pudesc_validation"  name="description" v-model="pupdate.desc" v-on:input="pudesc_validate">
                            <div id="invalid_code" class="invalid-feedback">
                                Atleast 2 characters!
                            </div>
                        </div>
                        <div class="col-sm-10 position-relative">
                            <label class="form-label">Price</label>
                            <input type="number" class="form-control" :class="uprice_validation" min="0"  name="price" v-model="pupdate.price" v-on:input="uprice_validate">
                            <div id="invalid_price" class="invalid-feedback">
                                Enter valid price!
                            </div>
                        </div>
                        <div class="col-sm-10 position-relative">
                            <label class="form-label">Quantity</label>
                            <input type="number" class="form-control" :class="uqty_validation" min="0"  name="quantity" v-model="pupdate.quantity" v-on:input="uqty_validate">
                            <div id="invalid_quantity" class="invalid-feedback">
                                Enter valid quantity!
                            </div>
                        </div>
                        <div class="col-sm-10 position-relative">
                            <label class="form-label">Category</label>
                            <select class="form-select" v-model='pupdate.section_code' name='category' :class="ucat_validation" @change='ucat_validate'>
                                <option v-for="ele in categories" :value="ele.section_code">{{ele.name}}</option>
                            </select>
                            <div id="invalid_category" class="invalid-feedback">
                                Please select category!
                            </div>
                        </div>
                        <div class="col-sm-10 position-relative">
                            <label class="form-label">Unit</label>
                            <select class="form-select" v-model='pupdate.unit' name='unit' :class="uunit_validation" @change='uunit_validate'>
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
                        <input type="file" class="form-control"  name="file" id="update_image"  ref='ufileinput' @change='puselected'>
                        </div>
                        <div class="py-2">
                            <button type="submit" class="btn btn-primary" @click="pucheck">Update</button>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click='dismiss_errors'>Close</button>
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
    </div>`,

    data(){
        return { alreadyexists:false, cloading:true, 
            delete_item:{name:""},
            uname:false, udesc:false, uselect:false,
            puname:false, pudesc:false, uqty:false, uprice:false, ucat:false, uunit:false,
            imageversion:0,
            update:{code:"", name:"", desc:"", file:""},
            pupdate:{name:"", desc:"", price:"", section_code:"", quantity:"", unit:"", file:"", product_code:""},
            error:false, error_message:'',
            query:"", sloading:false, filter:"all", pro_result:[], cat_result:[],
            products:[], categories:[], searched:false, selectedRange: [0, 250], only_out_of_stock:false,
            updated:false, deleted:false, pro_updated:false, pro_deleted:false

            
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

        puname_validation(){
            return {
                'is-invalid':this.puname,
            }
        },

        pudesc_validation(){
            return {
                'is-invalid':this.pudesc,
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
    
        pro_result_empty(){
            return this.pro_result.length==0;
        },

        cat_result_empty(){
            return this.cat_result.length==0;
        },

        user:function(){
            return this.$store.getters.get_user;

        },

        stock: function(){
            if(this.only_out_of_stock==false){
                return 'all'
            }
            else {
                return 'out_of_stock'
            }
        },

        max_reached: function(){
            if(this.selectedRange[1]>=250){
            return '+'}
        },

        atleast_pro_present: function(){
            let count=0
            for(let i=0; i<this.products.length; i++){
                for(let j=0; j<this.pro_result.length; j++){
                    if(this.products[i].product_id==this.pro_result[j].product_id){
                        count+=1

                    }
                }
            }
            if(count>0){
                return true
            }
            else{
                return false
            }
        }
    },

    methods:{

        close_message(){
            this.pro_updated=false,
            this.pro_deleted=false,
            this.updated=false,
            this.deleted=false

        },

        uselected(event){
            this.uselect=true,
            this.update.file=event.target.files[0];

        },

        puselected(event){
            this.uselect=true,
            this.pupdate.file=event.target.files[0];

        },

        delete_product(code){
            
            fetch('/api/product/'+code, {
                method:'DELETE',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                }
            }).then((res)=>{
                
                if(res.status==200){
                    this.pro_updated=false,
                    this.pro_deleted=true
                    this.updated=false,
                    this.deleted=false
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

        delete_category(code){
            const formdata= new FormData();
            formdata.append('section_code', code);
            formdata.append('request_type', 'delete')

            
            fetch('/api/requests', {
                method:'POST',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                },
                body: formdata,
            }).then((res)=>{
                
                if(res.status==200){
                    return res.json()
                }
                else{
                    return Promise.reject(res.status)
                }
            }).then((data)=>{
                this.pro_updated=false,
                this.pro_deleted=false
                this.updated=false,
                this.deleted=true
                $('#delete_category').modal('hide')
                
            }).catch((error)=>{
                console.log(error)
                this.error=true,
                this.error_message=error
            })
            

        },

        dismiss_errors(){
            this.uname=false,
            this.udesc=false,
            this.puname=false,
            this.pudesc=false,
            this.uqty=false,
            this.uprice=false,
            this.ucat=false,
            this.uunit=false,
            this.uselect=false
            var fileinput = this.$refs.ufileinput;
            if (fileinput) {
            fileinput.value = '';}



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

        pucheck(){
            let price=parseFloat(this.pupdate.price)
            let quantity=parseFloat(this.pupdate.quantity)
             

            if(this.pupdate.name.length>=2 && this.pupdate.desc.length>=2 && price>=0 && quantity>=0){
                this.pro_proceed_update();

            }
            else{ 
                if(this.pupdate.name==""){
                    this.puname=true
                }
                if(this.pupdate.desc==""){
                    this.pudesc=true
                }
                if(quantity<0 || this.pupdate.quantity===''){
                    this.uqty=true
                }
                if(price<0 || this.pupdate.price===""){
                    this.uprice=true
                }
                if(this.pupdate.unit==""){
                    this.uunit=true
                }
                if(this.pupdate.section_code==""){
                    this.ucat=true
                }
    
            } 

        },

        pro_proceed_update(){
            let price=parseFloat((parseFloat(this.pupdate.price)).toFixed(2))
            let quantity=parseFloat(parseFloat((this.pupdate.quantity)).toFixed(2))

            const formdata= new FormData();
            formdata.append('name', this.pupdate.name);
            formdata.append('section_code', this.pupdate.section_code);
            formdata.append('product_code', this.pupdate.product_code);
            formdata.append('description', this.pupdate.desc);
            formdata.append('file', this.pupdate.file)
            formdata.append('unit', this.pupdate.unit)
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
                    this.pro_updated=true,
                    this.pro_deleted=false
                    this.updated=false,
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
                this.pupdate.name='',
                this.pupdate.desc='',
                this.pupdate.price='',
                this.pupdate.quantity='',
                this.pupdate.section_code='',
                this.pupdate.unit='',
                this.uselect=false
                var fileinput = this.$refs.ufileinput;
                if (fileinput) {
                fileinput.value = '';}
                $('#update_product_form').modal('hide');
                })

            
        },

        proceed_update(){
            const formdata= new FormData();
            formdata.append('category_name', this.update.name);
            formdata.append('section_code', this.update.code);
            formdata.append('description', this.update.desc);
            formdata.append('request_type', 'update');

            fetch('/api/requests' ,{
                method: 'POST',
                headers:{
                    'auth-token':localStorage.getItem('auth-token')
                },
                body: formdata,
            }).then((res)=>{
                if(res.status==200){
                    this.pro_updated=false,
                    this.pro_deleted=false
                    this.updated=true,
                    this.deleted=false
                    return res.json()
                }
                else{
                    return Promise.reject(res.json())
                }
            }).then((data)=>{
                this.update.code='',
                this.update.name='',
                this.update.desc='',
                $('#update_category_form').modal('hide');
                
                
            }).catch((error)=>{
                console.log('something went wrong!!', error)

            })


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

        pudesc_validate(){
            if(this.pupdate.desc==""){
                this.pudesc=false
            }
            else if(this.pupdate.desc.length>=2){
                
                this.pudesc=false
            }
            else{
                this.pudesc=true
            }

        },

        puname_validate(){
            if(this.pupdate.name==""){
                this.puname=false
            }
            else if(this.pupdate.name.length>=2){
                this.puname=false
            }
            else{
                this.puname=true
            }

        },

        uprice_validate(){
            if(this.pupdate.price==""){
                this.uprice=false
            }
            else if(this.pupdate.price>=0){
                
                this.uprice=false
            }
            else{
                this.uprice=true
            }

        },

        uqty_validate(){
            if(this.pupdate.quantity==""){
                this.uqty=false
            }
            else if(this.pupdate.quantity>=0){
                
                this.uqty=false
            }
            else{
                this.uqty=true
            }

        },

        uunit_validate(){
            if(this.pupdate.unit==""){
                this.uunit=false
            }
            else if(this.pupdate.unit.length>0){
                
                this.uunit=false
            }
            else{
                this.uunit=true
            }

        },

        ucat_validate(){
            if(this.pupdate.section_code==""){
                this.ucat=false
            }
            else if(this.pupdate.section_code.length>0){
                
                this.ucat=false
            }
            else{
                this.ucat=true
            }

        },

        item(ele){
            this.delete_item=ele

        },

        update_item_function(ele){
            this.update.code=ele.section_code,
            this.update.name=ele.name,
            this.update.desc=ele.description

        },

        pupdate_item_function(ele){
            
            this.pupdate.name=ele.name,
            this.pupdate.desc=ele.description,
            this.pupdate.unit=ele.unit,
            this.pupdate.price=ele.price,
            this.pupdate.quantity=ele.quantity,
            this.pupdate.section_code=ele.section_code
            this.pupdate.product_code=ele.product_code


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

        search(){
            this.sloading=true
            fetch('api/search',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },

                body:JSON.stringify({'query':this.query, 'f':this.filter, 'stock': this.stock, 'mini': this.selectedRange[0], 'maxi': this.selectedRange[1]})
            }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                else{
                    return Promise.reject(res.statusText)
                }
            }).then((data)=>{
                this.cat_result=data.categories,
                this.pro_result=data.products
            }).catch((error)=>{
                this.error=true,
                this.error_message=error,
                console.log(error)
            }).finally(()=>{
                this.sloading=false
                this.searched=true
            })
        },

        re_search(){
            this.search()

        },

        cat_present_in_result(section_id){
            const cat = this.cat_result.find(result => result.cat_id == section_id);
            return cat?true:false
            
        },

        pro_present_in_result(pid){
            const pro = this.pro_result.find(result => result.product_id == pid);
            return pro?true:false
        },
    },


    created() {
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
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('auth-token')
                    }
                }).then((res)=>{
                    if (res.ok){
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
    
                fetch('/api/product', {
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
                    this.products=data
    
                }).catch((error)=>{
                    this.error=true,
                    this.error_message=error,
                    console.log(error)
                }).finally(()=>{
                    this.ploading=false
                })
            }
        }).catch((error)=>{
            this.error=true,
            this.error_message=error
        })
        
      },

      mounted(){
        document.title='Search'

        const priceRangeSlider = new Slider("#priceRange", {});
        priceRangeSlider.on("slide", (values) => {
          this.selectedRange = values;
        });
        priceRangeSlider.on("slideStop", () => {
            this.re_search();
          });

      }

}