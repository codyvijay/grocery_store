from .database import db
from flask_security import UserMixin, RoleMixin


roles_users=db.Table('roles_users', 
                     db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
                     db.Column('role_id', db.Integer, db.ForeignKey('role.id')))


class User(db.Model, UserMixin):
    __tablename__="user"

    user_id=db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname=db.Column(db.String)
    lname=db.Column(db.String)
    password=db.Column(db.String)
    last_visit=db.Column(db.String)
    active=db.Column(db.Boolean)
    email=db.Column(db.String, unique=True)
    fs_uniquifier = db.Column(db.String, unique=True, nullable=False)
    store_name=db.Column(db.String)
    def id(self):
        return self.user_id
    

    roles=db.relationship('Role', secondary=roles_users, backref=db.backref('user', lazy='dynamic'))
    added=db.relationship("Product",  secondary='cart', viewonly=True)


class Section(db.Model):
    __tablename__="section"
    section_id=db.Column(db.Integer, autoincrement=True, primary_key=True)
    section_code=db.Column(db.String, unique=True, nullable=False)
    name=db.Column(db.String, nullable=False)
    description=db.Column(db.String)

    product=db.relationship('Product', back_populates='section', cascade="all, delete")


class Section_Request(db.Model):
    __tablename__="section_request"
    id=db.Column(db.Integer, autoincrement=True, primary_key=True)
    uid=db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    section_code=db.Column(db.String)
    request=db.Column(db.String, nullable=False)
    name=db.Column(db.String)
    description=db.Column(db.String)


class Product(db.Model):
    __tablename__="product"
    product_id=db.Column(db.Integer, autoincrement=True, primary_key=True)
    product_code=db.Column(db.String)
    name=db.Column(db.String, nullable=False)
    description=db.Column(db.String)
    price=db.Column(db.Integer, nullable=False)
    quantity=db.Column(db.Integer, nullable=False)
    section_code=db.Column(db.Integer, db.ForeignKey("section.section_code"), nullable=False)
    unit=db.Column(db.String, nullable=False)
    created_by=db.Column(db.Integer, nullable=False)

    section=db.relationship("Section", back_populates='product')
    carted=db.relationship("Cart", backref='product', cascade='all, delete')


class Cart(db.Model):
    __tablename__="cart"
    cart_id=db.Column(db.Integer, autoincrement=True, primary_key=True)
    quantity=db.Column(db.Integer)
    uid=db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    pid=db.Column(db.Integer, db.ForeignKey("product.product_id"), nullable=False)


class Order(db.Model):
    __tablename__="order"
    order_id=db.Column(db.Integer, autoincrement=True, primary_key=True)
    quantity=db.Column(db.Integer)
    order_no=db.Column(db.Integer, db.ForeignKey('order_top.order_no'), nullable=False)
    product_code=db.Column(db.String, nullable=False)
    product_name=db.Column(db.String, nullable=False)
    description=db.Column(db.String)
    price=db.Column(db.Integer, nullable=False)
    unit=db.Column(db.String, nullable=False)
    product_id=db.Column(db.Integer, nullable=False)
    created_by=db.Column(db.Integer, nullable=False)

    top=db.relationship('Order_top', back_populates='bottom')


class Order_top(db.Model):
    __tablename__='order_top'
    order_no=db.Column(db.Integer, autoincrement=True, primary_key=True)
    uid=db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
    total=db.Column(db.Integer, nullable=False)
    time=db.Column(db.String, nullable=False)

    bottom=db.relationship('Order', back_populates='top')

    
class Cat_search(db.Model):
    __tablename__='cat_search'
    rowid=db.Column(db.Integer, primary_key=True)
    section_code=db.Column(db.String)
    name=db.Column(db.String)
    description=db.Column(db.String)


class Pro_search(db.Model):
    __tablename__='pro_search'
    rowid=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    description=db.Column(db.String)
    price=db.Column(db.Integer)
    quantity=db.Column(db.Integer)
    

class Role(db.Model, RoleMixin):
    __tablename__='role'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, unique=True)
    description=db.Column(db.String)

