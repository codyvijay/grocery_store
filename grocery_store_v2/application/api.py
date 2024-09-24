from flask_restful import Resource, reqparse
from application.database import db
from application.models import Product, Section, Cart, Order, User, Cat_search, Pro_search, Order_top, Role, Section_Request
from application import tasks
from app import api
from app import cache
from flask import request
from flask_security import current_user, roles_required, auth_required, roles_accepted
from application.security import user_datastore
import os
import datetime
from sqlalchemy import desc
#from time import perf_counter

class CategoryAPI(Resource):
    @auth_required('token')
    @roles_accepted('admin', 'manager', 'user')
    @cache.cached(50, key_prefix="get_category")
    def get(self):
        #start=perf_counter()
        cat=Section.query.all()
        l=[]
        for ele in cat:
            l.append({"section_code": ele.section_code,
                "section_id":ele.section_id,
                "name": ele.name,
                "description": ele.description})
        #end=perf_counter()
        #print("elapsed time : ", end-start)
        return l, 200
          
    @auth_required('token')
    @roles_required('admin')
    def put(self):
        cache.delete('get_category')
        name=request.form.get('category_name')
        description=request.form.get('description')
        section_code=request.form.get('section_code')
        file_selected=request.form.get('file_selected')
        if(file_selected=='true'):
            file = request.files['file']
        
        cat=Section.query.filter_by(section_code=section_code).first()
        if(cat==None):
            return {'message':'no such category found to update!'}, 404
        if(name!=None):
            cat.name=name
        if(description!=None):
            cat.description=description
        if(file_selected=='true'):
            new_filename = str(cat.section_id)+'s.jpg'  
            file.save(os.path.join('static/img/', new_filename))

            
        db.session.commit()

        return {"section_code": cat.section_code,
                    "section_id":cat.section_id,
                    "name": cat.name,
                    "description": cat.description}, 200

    @auth_required('token')
    @roles_required('admin')  
    def delete(self, section_code):
        cache.clear()
        cat=Section.query.filter_by(section_code=section_code).first()
        if(cat==None):
            return {'message': 'No Category Found'}, 404
        r=Section_Request.query.filter_by(section_code=section_code).all()
        pro=Product.query.filter_by(section_code=cat.section_code).all()
        if(pro!=None):
            for ele in pro:
                os.remove('static/img/'+str(ele.product_id)+'p.jpg')
        if(r!=None):
            for ele in r:
                db.session.delete(ele)
        db.session.delete(cat)
        os.remove('static/img/'+str(cat.section_id)+'s.jpg')
        db.session.commit()
        return {'section_code': section_code, 'message':'Deleted'}, 200

    @auth_required('token')
    @roles_required('admin')
    def post(self):
        cache.delete('get_category')
        name=request.form.get('category_name')
        description=request.form.get('description')
        section_code=request.form.get('section_code')
        cat_code=Section.query.filter_by(section_code=section_code).all()
        if(name==None):
            return {'message': 'No Name was given'}, 400
        if(description==None):
            return {'message': 'No description was given'}, 400
        if(section_code==None):
            return {'message':'No Section Code was given'}, 400
        if 'file' not in request.files:
                return {'message': 'No Image File was sent!'}, 400
        
        if(cat_code!=[]):
            return {"message": "already exists"}, 409
        else:
            new_cat=Section(name=name, description=description, section_code=section_code)
            file = request.files['file']
            db.session.add(new_cat)
            db.session.commit()
            cat=Section.query.filter_by(section_code=section_code).first()
            new_filename = str(cat.section_id)+'s.jpg'  
            file.save(os.path.join('static/img/', new_filename))

            return {"section_code": cat.section_code,
                    "section_id":cat.section_id,
                    "name": cat.name,
                    "description": cat.description}, 201
        

class ProductAPI(Resource):
    
    @auth_required('token')
    @roles_accepted('manager', 'user')
    def get(self):

        user_role = current_user.roles[0].name
        if(user_role=='manager'):
            cache_key_prefix=f"get_products:{user_role}{current_user.user_id}"
        else:
            cache_key_prefix = f"get_products:{user_role}"
        cached_result = cache.get(cache_key_prefix)
        if cached_result is not None:
            return cached_result, 200

        #start=perf_counter()

        if(current_user.roles[0].name=='manager'):
            pro=Product.query.filter_by(created_by=current_user.user_id).all()
        else:
            pro=Product.query.all()
        l=[]
        if(pro!=None):
            for ele in pro:
                u=User.query.filter_by(user_id=ele.created_by).first()
                if(u.roles[0]!='manager'):
                    continue
                cat=Section.query.filter_by(section_code=ele.section_code).first()
                category_name=cat.name
                d={
                    "product_code": ele.product_code,
                    "product_id": ele.product_id,
                    "name": ele.name,
                    "description": ele.description,
                    "price": ele.price,
                    "unit": ele.unit,
                    "quantity": ele.quantity,
                    "section_code": ele.section_code,
                    "created_by":ele.created_by,
                    "category_name":category_name
                    }
                l.append(d)

        #end=perf_counter()
        #print("time elapsed: ", end-start)

        cache.set(cache_key_prefix, l, timeout=50)
        return l, 200
       
    @auth_required('token')
    @roles_accepted('manager')
    def put(self):
        cache.clear()
        name=request.form.get('name')
        description=request.form.get('description')
        section_code=request.form.get('section_code')
        product_code=request.form.get('product_code')
        unit=request.form.get('unit')
        price=request.form.get('price')
        quantity=request.form.get('quantity')
        file_selected=request.form.get('file_selected')
        if(file_selected=='true'):
            file = request.files['file']
        pro=Product.query.filter_by(product_code=product_code).first()
        if(pro==None):
            return {"message": "there is no such product"}, 404
        if(name!=None):
            pro.name=name
        if(description!=None):
            pro.description=description
        if(section_code!=None):
            pro.section_code=section_code
        if(unit!=None):
            pro.unit=unit
        if(price!=None):
            pro.price=price
        if(quantity!=None):
            pro.quantity=quantity
        cat=Section.query.filter_by(section_code=section_code).first()
        if(cat!=None):
            category_name=cat.name
        if(file_selected=='true'):
            new_filename = str(pro.product_id)+'p.jpg'  
            file.save(os.path.join('static/img/', new_filename))
        db.session.commit()
         
        return {
                    "product_code": pro.product_code,
                    "product_id": pro.product_id,
                    "name": pro.name,
                    "description": pro.description,
                    "price": pro.price,
                    "unit": pro.unit,
                    "quantity": pro.quantity,
                    "section_code": pro.section_code,
                    "created_by": pro.created_by,
                    "category_name": category_name
                    }, 200
    
    @auth_required('token')
    @roles_accepted('manager')
    def delete(self, product_code):
        cache.clear()
        pro=Product.query.filter_by(product_code=product_code).first()
        if pro==None:
            return {"message":"no such product"}, 404
        else:
            db.session.delete(pro)
            os.remove('static/img/'+str(pro.product_id)+'p.jpg')
            db.session.commit()
            return {"product_code":product_code}, 200

    @auth_required('token')
    @roles_accepted('manager')
    def post(self):
        cache.clear()
        name=request.form.get('name')
        description=request.form.get('description')
        section_code=request.form.get('section_code')
        unit=request.form.get('unit')
        price=request.form.get('price')
        quantity=request.form.get('quantity')
        if(name==None):
            return {"message": "No Name Provided"}, 400
        if(description==None):
            return {'message': 'No description Provided'}, 400
        if(section_code==None):
            return {'message':'No section_code Provided'}, 400
        if(unit==None):
            return {'message': 'No unit Provided'}
        if(price==None):
            return {'message': ' No Price Provided'}, 400
        if(quantity==None):
            return {'message': 'No quantity Provided'}, 400
        
        try:
            price = float(price)

            # Check if the number is greater than 0
            if price < 0:
                return {'message':'price cannot be less than 0'}
        except ValueError:
            return {'message': 'invalid price'}
        
        try:
            quantity = float(quantity)

            # Check if the number is greater than 0
            if quantity < 0:
                return {'message':'quantity cannot be less than 0'}
        except ValueError:
            return {'message': 'invalid quantity'}
        

        if 'file' not in request.files:
                return {'message': 'No Image File was sent!'}, 400
        file = request.files['file']
        
        cat=Section.query.filter_by(section_code=section_code).first()
        if(cat==None):
            return {"message": "the category dosent exist"}, 400
        created_by=current_user.user_id
        category_name=cat.name
        new_pro=Product(name=name, description=description, section_code=section_code, unit=unit, price=price, quantity=quantity, created_by=created_by)
        db.session.add(new_pro)
        db.session.commit()
        pro=Product.query.filter_by(product_id=new_pro.product_id).first()
        

        pro.product_code='pro'+str(new_pro.product_id)
        db.session.commit()
        new_filename = str(pro.product_id)+'p.jpg'  
        file.save(os.path.join('static/img/', new_filename))
        return {
                "product_code": pro.product_code,
                "product_id": pro.product_id,
                "name": pro.name,
                "description": pro.description,
                "price": pro.price,
                "unit": pro.unit,
                "quantity": pro.quantity,
                "section_code": pro.section_code,
                "created_by": pro.created_by,
                "category_name": category_name
                }, 201

check_user_present=reqparse.RequestParser()
check_user_present.add_argument('email')


class CheckuserAPI(Resource):
    def post(self):
        args=check_user_present.parse_args()
        email=args.get('email')
        u=User.query.filter_by(email=email).first()
        print(u)
        if(u==None):
            return{'status':'200'}
        else:
            return {'status':'409'}

register_user_parser=reqparse.RequestParser()
register_user_parser.add_argument('email')
register_user_parser.add_argument('role')


class RegisterAPI(Resource):

    def post(self):     
        cache.clear()
        args=register_user_parser.parse_args()
        email=args.get('email')
        role=args.get('role')
        u=User.query.filter_by(email=email).first()
        r=Role.query.filter_by(id=role).first()
        u.roles.append(r)
        db.session.commit()
        return {'status' : '200'}


class Admin_managersAPI(Resource):

    @auth_required('token')
    @roles_required('admin')
    @cache.cached(50, key_prefix='all_managers')
    def get(self):
        managers=User.query.all()
        l=[]
        for ele in managers:
            d={'email':ele.email, 'role':ele.roles[0].name}
            l.append(d)
        return(l), 200
    
    @auth_required('token')
    @roles_required('admin')
    def put(self):
        cache.clear()
        email=request.form.get('email')
        action=request.form.get('action')
        manager=User.query.filter_by(email=email).first()
        if(manager==None):
            return {"message":"no such email"}, 404
        else:
            if(action=='Approve'):
                r=Role.query.filter_by(id=3).first()
                role_name=r.name
                manager.roles=[r]
            elif(action=='Reject'):
                r=Role.query.filter_by(id=5).first()
                role_name=r.name
                manager.roles=[r]
            elif(action=='Revoke'):
                r=Role.query.filter_by(id=6).first()
                role_name=r.name
                manager.roles=[r]
        db.session.commit()
        return {"email": email, "role":role_name}, 200


class CurrentUserAPI(Resource):

    @auth_required('token')
    def get(self):
        return {"email": current_user.email, "role":current_user.roles[0].name, "user_id":current_user.user_id,
                "fname":current_user.fname, "lname":current_user.lname, "last_visit": current_user.last_visit, "store_name":current_user.store_name}, 200

    @auth_required('token')
    def post(self):
        data=request.get_json()
        uid=data.get('user_id')
        fname=data.get('fname')
        lname=data.get('lname')
        store_name=data.get('store_name')
        u=User.query.filter_by(user_id=uid).first()
        if(u!=None):
            u.fname=fname
            u.lname=lname
            u.store_name=store_name
        db.session.commit()
        return {"email": current_user.email, "role":current_user.roles[0].name, "user_id":current_user.user_id,
                "fname":current_user.fname, "lname":current_user.lname, "last_visit": current_user.last_visit, "store_name":current_user.store_name}, 200


class Manager_reapplyAPI(Resource):

    @auth_required('token')
    @roles_accepted('manager(Rejected)', 'manager(Revoked)', 'manager', 'manager(Not Approved)')
    def put(self):
        cache.delete('all_managers')
        data=request.get_json()
        email=data.get('email')
        u=user_datastore.find_user(email=email)
        if(u.roles[0].name=='manager(Rejected)' or u.roles[0].name=='manager(Revoked)'):
            r=user_datastore.remove_role_from_user(u, u.roles[0].name)
            a=user_datastore.add_role_to_user(u, 'manager(Not Approved)')
            user_datastore.commit()
            if(r and a):
                return {"message":'success re-applying'}, 200
            else:
                return {"message":'couldn\'t remove and add user'}, 400
        elif(u.roles[0].name=="manager" or u.roles[0].name=="manager(Not Approved)"):
            return {"message": "was already re-applied or approved"}, 200
        else:
            return {"message" : "bad request!"},  400


class Manager_requestsAPI(Resource):

    @auth_required('token')
    @roles_accepted('manager', 'admin')
    def get(self):

        if current_user.roles[0].name=='manager':
            r=Section_Request.query.filter_by(uid=current_user.user_id)
        else:
            r=Section_Request.query.all()
        l=[]
        for ele in r:
            if(ele.request=='delete'):
                cat=Section.query.filter_by(section_code=ele.section_code).first()
                d={'ele_id':ele.id, 'id':cat.section_id, 'section_code':ele.section_code, 'name':cat.name, "description":cat.description, "uid":ele.uid, "request":ele.request}
                l.append(d)
            elif(ele.request=='update'):
                cat=Section.query.filter_by(section_code=ele.section_code).first()
                d={'ele_id':ele.id, 'id':cat.section_id, 'section_code':ele.section_code, 'name':ele.name, "description":ele.description, "uid":ele.uid, "request":ele.request}
                l.append(d)
            else:
                d={'ele_id':ele.id, 'id':ele.id, 'section_code':ele.section_code, 'name':ele.name, "description":ele.description, "uid":ele.uid, "request":ele.request}
                l.append(d)

        return l, 200

    @auth_required('token')
    @roles_accepted('manager', 'admin')
    def delete(self):
        id=request.form.get('id')
        delete_image=False
        r=Section_Request.query.filter_by(id=id).first()
        if(r==None):
            return {'ele_id':id}, 200
        if(r.request=='create'):
            delete_image=True
        db.session.delete(r)
        db.session.commit()
        if(delete_image):
            os.remove('static/img/'+str(id)+'r.jpg')
        return {'ele_id':id}, 200

    @auth_required('token')
    @roles_required('manager')
    def post(self):
        cache.clear()
        request_type=request.form.get('request_type')

        if request_type=='create':
            name=request.form.get('category_name')
            description=request.form.get('description')
            file = request.files['file']
            uid=current_user.user_id
            new_request=Section_Request(name=name, description=description, uid=uid, request=request_type)
            db.session.add(new_request)
            db.session.commit()
            section_code='catr'+str(new_request.id)
            request_done=Section_Request.query.filter_by(id=new_request.id).first()
            request_done.section_code=section_code
            db.session.commit()
            new_filename = str(new_request.id)+'r.jpg'  
            file.save(os.path.join('static/img/', new_filename))
            return "", 200
        
        elif request_type=='delete':
            uid=current_user.user_id
            code=request.form.get('section_code')
            new_request=Section_Request(section_code=code, uid=uid, request=request_type)
            db.session.add(new_request)
            db.session.commit()
            return "", 200
        
        elif request_type=='update':
            uid=current_user.user_id
            code=request.form.get('section_code')
            name=request.form.get('category_name')
            description=request.form.get('description')
            new_request=Section_Request(section_code=code, uid=uid, description=description, request=request_type, name=name)
            db.session.add(new_request)
            db.session.commit()
            return "", 200
        
        else:
            return {'message':'something went wrong'}, 400


class Request_updateAPI(Resource):

    @auth_required('token')
    @roles_required('admin')
    def post(self):
        cache.clear()
        id=request.form.get('ele_id')
        name=request.form.get('name')
        description=request.form.get('description')
        section_code=request.form.get('section_code')
        cat=Section.query.filter_by(section_code=section_code).first()
        if(cat!=None):
            return {"message":"conflict"}, 409
        new_cat=Section(name=name, description=description, section_code=section_code)
        db.session.add(new_cat)
        db.session.commit()

        r=Section_Request.query.filter_by(id=id).first()
        if r!=None:
            db.session.delete(r)
        db.session.commit()

        current_filepath = os.path.join('static/img', str(id)+'r.jpg')
        new_filepath = os.path.join('static/img', str(new_cat.section_id)+'s.jpg')

        os.rename(current_filepath, new_filepath)

        return {'ele_id': id}, 200

    @auth_required('token')
    @roles_required('admin')
    def put(self):
        cache.clear()
        id=request.form.get('ele_id')
        section_code=request.form.get('section_code')
        name=request.form.get('name')
        description=request.form.get('description')
        cat=Section.query.filter_by(section_code=section_code).first()
        if cat!=None:
            cat.name=name
            cat.description=description
            db.session.commit()
        r=Section_Request.query.filter_by(id=id).first()
        if(r!=None):
            db.session.delete(r)
            db.session.commit()
        return {'ele_id':id}, 200

    @auth_required('token')
    @roles_required('admin')
    def delete(self):
        cache.clear()
        section_code=request.form.get('section_code')
        id=request.form.get('ele_id')
        cat=Section.query.filter_by(section_code=section_code).first()
        if(cat!=None):
            pro=Product.query.filter_by(section_code=cat.section_code).all()
            if(pro!=None):
                for ele in pro:
                    os.remove('static/img/'+str(ele.product_id)+'p.jpg')
            db.session.delete(cat)
            db.session.commit()
            os.remove('static/img/'+str(cat.section_id)+'s.jpg')

        r=Section_Request.query.filter_by(section_code=section_code).all()
        if (r!=None):
            for ele in r:
                db.session.delete(ele)
            db.session.commit()
        return {"ele_id":id, "section_code":section_code}, 200


class CartAPI(Resource):

    @auth_required('token')
    @roles_required('user')
    def get(self):
        cart=Cart.query.filter_by(uid=current_user.user_id).all()
        l=[]
        if(cart!=None):
            for ele in cart:
                d={'quantity':ele.quantity, 'pid':ele.pid, 'uid':ele.uid }
                l.append(d)
        return l, 200
        
    @auth_required('token')
    @roles_required('user')
    def post(self):
        data=request.get_json()
        pid=data.get('pid')
        uid=current_user.user_id
        pro=Product.query.filter_by(product_id=pid).first()
        if(pro!=None):
            new_item=Cart(uid=uid,pid=pid,quantity=1)
            db.session.add(new_item)
        db.session.commit()
        return {'message':"added"}, 200
    
    @auth_required('token')
    @roles_required('user')
    def put(self):
        data=request.get_json()
        pid=data.get('pid')
        uid=current_user.user_id
        update_type=data.get('update_type')
        item=Cart.query.filter_by(uid=uid, pid=pid).first()
        if(item!=None):
            if(update_type=='increase'):
                item.quantity+=1
            elif(update_type=='decrease'):
                item.quantity-=1
        db.session.commit()
        return {'message':'updated'}, 200
    
    @auth_required('token')
    @roles_required('user')
    def delete(self):
        data=request.get_json()
        pid=data.get('pid')
        uid=current_user.user_id
        item=Cart.query.filter_by(uid=uid, pid=pid).first()
        if(item!=None):
            db.session.delete(item)
        db.session.commit()
        return {'message':'deleted'}, 200


class BuyAPI(Resource):

    @auth_required('token')
    @roles_required('user')
    def post(self):
        #cache.clear()
        data=request.get_json()
        items_to_buy=data.get('products')
        uid=current_user.user_id
        count=0
        total=0
        buy_failed=[]
        current_time=datetime.datetime.now()
        if(items_to_buy!=[]):
            for ele in items_to_buy:
                pro=Product.query.filter_by(product_id=ele['pid']).first()
                if(pro!=None and pro.quantity>=ele['quantity']):
                    total=round(total+(pro.price*ele['quantity']),2)
            if(total>0):
                new_order=Order_top(uid=uid,total=total, time=current_time)
                db.session.add(new_order)
                db.session.commit()
        cache.clear()
        order_no=new_order.order_no
        if(items_to_buy!=[]):
            for ele in items_to_buy:
                pro=Product.query.filter_by(product_id=ele['pid']).first()
                if(pro!=None and pro.quantity>=ele['quantity']):
                    item_total=round(pro.price*ele['quantity'], 2)
                    
                    add_items=Order(quantity=ele['quantity'], order_no=order_no, 
                                    product_code=pro.product_code, product_name=pro.name, 
                                    description=pro.description, price=item_total, 
                                    unit=pro.unit, product_id=pro.product_id, created_by=pro.created_by)
                    db.session.add(add_items) #add items
                    pro.quantity=round(pro.quantity-ele['quantity'])
                    cart_item=Cart.query.filter_by(uid=ele['uid'], pid=ele['pid']).first()
                    db.session.delete(cart_item) #delete from cart
                    count+=1
                else:
                    buy_failed.append(ele)
        db.session.commit()
        if(count==len(items_to_buy) and total!=0):
            return {"message":"buy success"}, 200
        elif(count!=0 and total!=0):
            return buy_failed, 202
        elif(count==0 and total==0):
            return items_to_buy, 500


class OrdersAPI(Resource):

    @auth_required('token')
    @roles_accepted('user', 'manager')
    def get(self):
        cache_key_prefix=f"get_orders:{current_user.user_id}" 
        cached_result = cache.get(cache_key_prefix)
        if cached_result is not None:
            return cached_result, 200

        send_orders=[]
        if(current_user.roles[0].name=='user'):
            orders=Order_top.query.filter_by(uid=current_user.user_id).order_by(desc('order_no')).all()
            for ele in orders:
                temp=[]
                for items in ele.bottom:
                    d_bottom={'order_no':items.order_no, "quantity": items.quantity, "product_code":items.product_code,
                              'product_name': items.product_name, 'description': items.description,  'price':items.price, 'unit': items.unit,
                                 'product_id':items.product_id, 'created_by':items.created_by}
                    temp.append(d_bottom)
                d={'order_no': ele.order_no, 'uid': ele.uid, 'total': ele.total,  'time':ele.time,
                    'products': temp}
                send_orders.append(d)
        elif(current_user.roles[0].name=="manager"):
            orders=Order.query.filter_by(created_by=current_user.user_id).all()
            for ele in orders:
                top_details=Order_top.query.filter_by(order_no=ele.order_no).first()
                time=top_details.time
                uid=top_details.uid
                user=User.query.filter_by(user_id=uid).first()
                email=user.email
                d={'order_no': ele.order_no, 'user':email, 'time':time, 'quantity':ele.quantity, 'product_name':ele.product_name, 
                   'product_code':ele.product_code, 'description': ele.description, 'price': ele.price, 'unit': ele.unit, 'product_id':ele.product_id}
                send_orders.append(d)
        

        cache.set(cache_key_prefix, send_orders, timeout=50)  
        return send_orders, 200

    
class SearchAPI(Resource):

    @auth_required('token')
    @roles_accepted('user', 'manager')
    def post(self):
        data=request.get_json()
        query=data.get('query')
        f=data.get('f')
        stock=data.get('stock')
        mini=data.get('mini')
        maxi=data.get('maxi')
        if(maxi>=250):
            maxi=float('inf')
        pro_result=[]
        cat_result=[]


        if(query!=''):
            if(f=='all' or f=='categories' or f==None):
                cat_result=Cat_search.query.filter(db.or_(Cat_search.name.match(f'{query}*'), Cat_search.description.match(f'{query}*'))).all()
            if(f=='all' or f=='products' or f==None):
                if(stock=='in_stock'):
                    pro_result=Pro_search.query.filter(db.or_(Pro_search.description.match(f'{query}*'), Pro_search.name.match(f'{query}*')), Pro_search.quantity>0, Pro_search.price.between(mini, maxi)).all()
                elif(stock=='out_of_stock'):
                    pro_result=Pro_search.query.filter(db.or_(Pro_search.description.match(f'{query}*'), Pro_search.name.match(f'{query}*')), Pro_search.quantity==0, Pro_search.price.between(mini, maxi)).all()
                else:
                    pro_result=Pro_search.query.filter(db.or_(Pro_search.description.match(f'{query}*'), Pro_search.name.match(f'{query}*')), Pro_search.price.between(mini, maxi)).all()
        else:
            if(f=='all' or f=='categories' or f==None):
                cat_result=Cat_search.query.all()
            if(f=='all' or f=='products' or f==None):
                if(stock=='in_stock'):
                    pro_result=Pro_search.query.filter( Pro_search.quantity>0, Pro_search.price.between(mini, maxi)).all()
                elif(stock=='out_of_stock'):
                    pro_result=Pro_search.query.filter( Pro_search.quantity==0, Pro_search.price.between(mini, maxi)).all()
                else:
                    pro_result=Pro_search.query.filter( Pro_search.price.between(mini, maxi)).all()

        products=[]
        categories=[]
        for ele in pro_result:
            d={'product_id':ele.rowid, 'name':ele.name, 'description': ele.description, 'quantity': ele.quantity, 'price': ele.price}
            products.append(d)
        for cat in cat_result:
            d_cat={'cat_id': cat.rowid, 'name':cat.name, 'description':cat.description}
            categories.append(d_cat)
        
        result={'products':products, 'categories':categories}
        
        return result, 200


class ExportAPI(Resource):

    @auth_required('token')
    @roles_required('manager')
    def get(self):
        job=tasks.export_orders.delay(current_user.user_id)
        return {'job_id':job.id, "job_result": job.result, "job_state": job.state}, 200
    
    @auth_required('token')
    @roles_required('manager')
    def put(self):
        data=request.get_json()
        id=data.get('id')
        task = tasks.export_orders.AsyncResult(id)
        if task.state == 'SUCCESS':
            # Task is completed, return the file URL or path
            return {'status': 'completed', 'file_url': task.result}
        elif task.state == 'PENDING':
            return {'status': 'pending'}
        else:
            return {'status': 'failed'}


api.add_resource(CategoryAPI, "/api/section", "/api/section/<string:section_code>")  #crud on sections
api.add_resource(ProductAPI, "/api/product", "/api/product/<string:product_code>")   #crud on products
api.add_resource(RegisterAPI, "/api/register")                                       #register user
api.add_resource(CheckuserAPI, "/api/checkuser")                                     #checking during registration if already user present
api.add_resource(Admin_managersAPI, "/api/admin_managers")                           #show all managers for admin
api.add_resource(CurrentUserAPI, "/api/current_user")                                #check current user
api.add_resource(Manager_reapplyAPI, '/api/manager_reapply')                         #reapply for manager role
api.add_resource(Manager_requestsAPI, '/api/requests')                               #requests by manager    
api.add_resource(Request_updateAPI, '/api/approve_request')                          #update requests by admin
api.add_resource(CartAPI, '/api/cart')                                               #add to cart
api.add_resource(BuyAPI, '/api/buy')                                                 #buy products
api.add_resource(OrdersAPI, '/api/orders')                                           #view orders
api.add_resource(SearchAPI, '/api/search')                                           #search functionality
api.add_resource(ExportAPI, '/api/export')                                           #export job for manager