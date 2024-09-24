export default{
    name:'user_category',
    template:`<div> 

    <div v-show="error">
        <div class="alert alert-danger" role="alert">
        Error : {{error_message}}
        </div>

    </div>

    <h2 class="border-bottom p-4 d-flex justify-content-center">Categories</h2>

    <div v-show="cloading">
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </div>

    <div v-show="!cloading">

        <div v-show="cat_empty">
            <div id="no_items" class="d-flex justify-content-center p-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                </svg>
            </div>
            <div id="no_items" class="d-flex justify-content-center p-4">
            <div>
                <h1>There are no categories!!</h1>
            </div>
            </div>
            <hr class="featurette-divider">
        </div>

        <div v-show="!cat_empty">

            <div class="row row-cols-2">
            
                <div class="col-lg-2 p-3" v-for="(ele, index) in categories" :key="index">
                    <div class="d-flex justify-content-center ">
                        <img :src="'/static/img/'+ele.section_id+'s.jpg'" class="rounded-image img-thumbnail" alt="category">
                    </div>
                    <h5 class="fw-normal d-flex justify-content-center">{{ele.name}}</h5>
                    <p class="d-flex justify-content-center"><router-link :to="'/category/'+ele.section_code+'/'+ele.name" class="btn btn-success">View</router-link></p>   
                </div>
            </div>
        </div>
    </div>
    
    </div>`,

    data(){
        return{
            cloading:true, error:false, error_message:false, categories:[]
        }
    },

    computed:{
        cat_empty: function(){
            return this.categories.length==0
        },

    },

    created: function(){
        fetch('/api/section', {
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
            this.categories=data
        }).catch((error)=>{
            this.error=true,
            this.error_message=error,
            console.log(error)
        }).finally(()=>{
            this.cloading=false
        })
    },

    mounted(){
        document.title='Category'
    }
}