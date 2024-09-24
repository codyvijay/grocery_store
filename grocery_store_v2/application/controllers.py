from flask import request, redirect, render_template
from flask import current_app as app
from application.database import db
from application.models import User
import datetime
from flask_security import  current_user, roles_required, roles_accepted



@app.route("/", methods=["GET","POST"])
def start():
    if current_user.is_authenticated:
        roles=current_user.roles
        if(roles[0]=='admin'):
            u=User.query.filter_by(user_id=current_user.user_id).first()
            time=datetime.datetime.now()
            u.last_visit=time
            db.session.commit()
            return redirect('/admin')
        if(roles[0]=='manager' or roles[0]=='manager(Not Approved)' or roles[0]=='manager(Rejected)' or roles[0]=='manager(Revoked)'):
            u=User.query.filter_by(user_id=current_user.user_id).first()
            time=datetime.datetime.now()
            u.last_visit=time
            db.session.commit()
            return redirect('/manager')
        if(roles[0]=='user'):
            u=User.query.filter_by(user_id=current_user.user_id).first()
            time=datetime.datetime.now()
            u.last_visit=time
            db.session.commit()
            return redirect('/user')
    else:
        return redirect('/home')
    

@app.route("/home", methods=["GET", "POST"])
def home():
    return render_template('main.html')


@app.route("/admin", methods=["GET", "POST"])
@roles_required('admin')
def admin():
    if(request.method=="GET"):
        return  render_template("admin_home.html")  
    

@app.route("/manager", methods=['GET','POST'])
@roles_accepted('manager', 'manager(Not Approved)', 'manager(Rejected)', 'manager(Revoked)')
def manager():
    return render_template('manager_home.html')


@app.route("/user", methods=['GET', 'POST'])
@roles_required('user')
def user_home():
    return render_template('user_homepage.html') 






