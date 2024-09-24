import os
basedir= os.path.abspath(os.path.dirname(__file__))


class configuration():
    SQLITE_DB_DIR=os.path.join(basedir, "../database_folder")
    SQLALCHEMY_DATABASE_URI="sqlite:///"+os.path.join(SQLITE_DB_DIR, "database_file.sqlite3")
    DEBUG=True
    SECRET_KEY="YTYE678fgsvyuyeHHhgh73UHUS"
    SECURITY_PASSWORD_HASH="bcrypt"
    SECURITY_PASSWORD_SALT="HGS6hghgh67TGHGHGthjhg6"
    SECURITY_REGISTERABLE=True
    SECURITY_SEND_REGISTER_EMAIL=False
    SECURITY_UNAUTHORIZED_VIEW=None
    #SECURITY_USERNAME_ENABLE=True
    SECURITY_CHANGEABLE=True
    SECURITY_POST_CHANGE_VIEW='/change'
    SECURITY_SEND_PASSWORD_CHANGE_EMAIL=False
    WTF_CSRF_ENABLED=False
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SECURITY_TOKEN_AUTHENTICATION_HEADER='auth-token'
    CELERY_BROKER_URL="redis://localhost:6379/1"
    CELERY_RESULT_BACKEND="redis://localhost:6379/2"
    CACHE_TYPE="RedisCache"
    CACHE_REDIS_HOST="localhost"
    CACHE_REDIS_PORT=6379
    


