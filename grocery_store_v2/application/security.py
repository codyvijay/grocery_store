from flask_security import Security, SQLAlchemySessionUserDatastore
from application.models import User, Role
from application.database import db

user_datastore=SQLAlchemySessionUserDatastore(db.session, User, Role)
security = Security()