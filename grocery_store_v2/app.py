from flask import Flask
from application.database import db
from application.config import configuration
from application import workers
from flask_restful import Api
from flask_cors import CORS
from application.security import user_datastore, security
from flask_caching import Cache
import logging



app=Flask(__name__, template_folder="template", static_folder="static")
CORS(app)
app.config.from_object(configuration)
db.init_app(app)
api=Api(app)
security.init_app(app, user_datastore)
logging.getLogger('weasyprint').setLevel(logging.ERROR)
logging.getLogger('fontTools').setLevel(logging.ERROR)
app.app_context().push()


celery=workers.celery
celery.conf.update(
    broker_url=app.config["CELERY_BROKER_URL"],
    result_backend=app.config["CELERY_RESULT_BACKEND"]
)

celery.Task=workers.ContextTask
app.app_context().push()

cache=Cache(app)
app.app_context().push()


from application.api import *
from application.controllers import *

if __name__ == '__main__':
    #app.run(host='0.0.0.0', ssl_context='adhoc') # this is to use to send over https
    app.run(host='0.0.0.0')
    


