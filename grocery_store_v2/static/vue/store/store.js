
const store = new Vuex.Store({
    state: {
        user: {'email':'', 'role':'', 'user_id':"", 'fname':"", 'lname':"", 'store_name':"", 'last_visit':"" },
        loading:false, cart:[], cart_loading:false, buy_status:"", buy_loading:false, buy_failed:[]
    },

    mutations: {
        setUser(state, user) {
            state.user = user;

        },

        setloading(state, loading){
            state.loading=loading;

        },

        setcartloading(state, loading){
            state.cart_loading=loading;

        },

        setcart(state, cart){
            state.cart=cart
        },

        setbuy(state, status){
            state.buy_status=status
        },

        setbuyloading(state, loading){
            state.buy_loading=loading
        },

        setbuyfailed(state, items){
            state.buy_failed=items
        }

    },

    actions: {
        fetchUser({ commit }) {

            const userData = {
                email: '',
                role: '',
                user_id:"",
                fname:"",
                lname:"",
                last_visit:"",
                store_name:"",
            };

            commit('setloading', true)

            fetch('/api/current_user', {
                method:'Get',
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
                userData.email=data.email
                userData.role=data.role
                userData.user_id=data.user_id
                userData.fname=data.fname,
                userData.lname=data.lname,
                userData.last_visit=data.last_visit,
                userData.store_name=data.store_name

            }).catch((error)=>{
                console.log(error)
            }).finally(()=>{
                commit('setloading', false)
            })

            commit('setUser', userData);
        },

        fetchcart({commit}){

            commit('setcartloading', true)
            fetch('/api/cart', {
                method:'GET',
                headers:{
                    'content-Type':'application/json',
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
                commit('setcart', data)
            }).catch((error)=>{
                console.log(error)
            }).finally(()=>{
                commit('setcartloading', false)
            })
        },

        update_back_cartitem({}, payload){
            fetch('/api/cart', {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:JSON.stringify({'pid':payload.pid, 'update_type':payload.update_type})
            }).then((res)=>{
                if(res.ok){
                    console.log('updated')
                }
            })


        },

        delete_back_cartitem({},payload){
            fetch('/api/cart', {
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:JSON.stringify({'pid':payload.pid})
            }).then((res)=>{
                if(res.ok){
                    console.log('deleted')
                }
            })

        },

        add_back_cartitem({}, payload){
            console.log(payload.pid)
            fetch('/api/cart', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body:JSON.stringify({'pid':payload.pid})

            }).then((res)=>{
                if(res.ok){
                    console.log('item added')
                }
            })

        },

        update_cart({commit, dispatch}, payload ){
            if(payload.update_type=='increase'){
                let temp_cart=payload.cart
                const cartItem = temp_cart.find(item => item.pid === payload.pid);
                cartItem.quantity+=1
                commit('setcart', temp_cart)
                //this.update_back_cartitem(payload.pid, 'increase')
                dispatch('update_back_cartitem', {pid:payload.pid, update_type:'increase'})
                
            }
            else if(payload.update_type=='decrease'){
                let temp_cart=payload.cart
                const cartItem = temp_cart.find(item => item.pid === payload.pid);
                if(cartItem.quantity==1){
                    const indexToDelete = temp_cart.findIndex(item => item.pid === payload.pid);
                    temp_cart.splice(indexToDelete ,1)
                    dispatch('delete_back_cartitem', {pid:payload.pid})
                }
                else{
                    cartItem.quantity-=1
                    //this.update_back_cartitem(payload.pid, 'decrease')
                    dispatch('update_back_cartitem', {pid:payload.pid, update_type:'decrease'})
                }
                commit('setcart', temp_cart)


            }
            else if(payload.update_type=='add'){
                let temp_cart=payload.cart
                let new_item={'quantity':1, 'uid': payload.uid, 'pid': payload.pid}
                temp_cart.push(new_item)
                commit('setcart', temp_cart)
                //this.add_back_cartitem(payload.pid)
                dispatch('add_back_cartitem', {pid:payload.pid})
                

            }

        },

        delete_cart_item({commit, dispatch}, payload){
            let temp_cart=payload.cart
            const indexToDelete = temp_cart.findIndex(item => item.pid === payload.pid);
            temp_cart.splice(indexToDelete ,1)
            commit('setcart', temp_cart)
            dispatch('delete_back_cartitem', {pid:payload.pid})


        },

        buy_cart_items({commit, dispatch}, payload){
            commit('setbuyloading', true)
            let items={products:payload.items_to_buy}

            fetch('/api/buy', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                },
                body: JSON.stringify(items)
            }).then((res)=>{
                if(res.status==200){
                    commit('setbuy', 'success')

                }
                else if(res.status==202){
                    commit('setbuy', 'partial')
                    return res.json()
                }
                else{
                    commit('setbuy', 'failed')
                    return res.json()
                }
            }).then((data)=>{
                commit('setbuyfailed', data)

            }).finally(()=>{
                commit('setbuyloading', false)
                dispatch('fetchcart')

            })
            
        },

        fetch_export_order({}, payload){
            let id=payload.id
            const intervalId = setInterval(() => {
                fetch('/api/export',{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('auth-token')
                    },
                    body:JSON.stringify({'id':id})
                }).then((res)=>{
                    if(res.ok){
                        return res.json()
                    }
                    else{
                        return Promise.reject(res.statusText)
                    }
                })
                  .then((data) => {
                    if (data.status === 'completed') {
                      clearInterval(intervalId);
                      window.location.href=data.file_url
                    } else if (data.status === 'failed') {
                      console.log('falied')
                      clearInterval(intervalId);
                    }
                  }).catch((error)=>{
                    console.log(error)
                    clearInterval(intervalId);

                  })
                  
                  ;
              }, 1000);
        }
    },


    getters: {
        get_user : function(state){
            return state.user;
        },

        get_loading :function(state){
            return state.loading

        },

        get_cart: function(state){
            return state.cart
        },

        get_cartloading: function(state){
            return state.cart_loading

        },

        get_buy_status: function(state){
            return state.buy_status
        },

        get_buy_loading: function(state){
            return state.buy_loading
        },

        get_buy_failed: function(state){
            return state.buy_failed
        }
        
    },
    
});

export default store;



