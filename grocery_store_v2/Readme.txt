to start the app:

perform all in bash/linux

flask : python3 app.py
redis : redis-server
celery-worker : celery -A app.celery worker
celery-beat : celery -A app.tasks beat

*this app dosent create the database automatically if deleted from folder, need to improve it.

Mails are configured to be sent to MailHog

open terminal > type > go/bin/MailHog
open browser > http://localhost:8025