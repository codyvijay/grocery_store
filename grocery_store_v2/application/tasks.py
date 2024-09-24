from app import celery
from application.database import db
from application.models import Order, User, Order_top
import csv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email import encoders
import datetime
from celery.schedules import crontab
from jinja2 import Template
from weasyprint import HTML
import mimetypes

celery.conf.timezone = 'Asia/Calcutta'
@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(crontab(hour=16, minute=0), 
                             daily_reminder.s(), name="daily reminder")
    
    sender.add_periodic_task( crontab(hour=7, minute=0, day_of_month=1), 
                             monthly_report.s(), name="Monthly Report")

SMPTP_SERVER_HOST="localhost"
SMPTP_SERVER_PORT=1025
SENDER_ADDRESS="dailybread@email.com"
SENDER_PASSWORD=""

def send_email(to_address, subject, message, content="text", attachments=None):
    msg=MIMEMultipart()
    msg["From"]=SENDER_ADDRESS
    msg["To"]=to_address
    msg["Subject"]=subject

    if content=="html":
        msg.attach(MIMEText(message, "html"))
    else:
        msg.attach(MIMEText(message, "plain"))
    
    if attachments:
        for attachment_file in attachments:
            mime_type, _ = mimetypes.guess_type(attachment_file)
            if mime_type is None:
                mime_type = "application/octet-stream"
            with open(attachment_file, "rb") as attachment:
                part = MIMEBase(mime_type, "octet-stream")
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                filename = attachment_file.split("/")[-1] 
                part.add_header(
                    "Content-Disposition", f"attachment; filename={filename}"
                )
                msg.attach(part)



    if(subject in image_subjects):
        for i in range(image_subjects[subject][0]):
            image_path = image_subjects[subject][1]
            with open(image_path, 'rb') as image_file:
                image_data = image_file.read()
                image = MIMEImage(image_data)
                image.add_header('Content-ID', '<image'+str(i)+'>')
                msg.attach(image)
    
    s=smtplib.SMTP(host=SMPTP_SERVER_HOST, port=SMPTP_SERVER_PORT)
    s.login(SENDER_ADDRESS, SENDER_PASSWORD)
    s.send_message(msg)
    s.quit()
    return True

image_subjects={       
    'Daily Reminder':[1, 'static/img/daily_reminder.jpg'],       # to send image 
    'Monthly Report':[1, 'static/img/report_front.jpg']           # first index : no. of images and then comma seperated image path

}


@celery.task
def export_orders(id):
    orders=Order.query.filter_by(created_by=id).all()
    csv_file_path = 'static/order_data.csv'
    
    with open(csv_file_path, 'w', newline="") as csvfile:
        fieldnames=['orderID', 'product_name', 'product_code', 'order_no', 'quantity', 'description', 'price', 'unit', 'time', 'user_ID']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for order in orders:
            o_top=Order_top.query.filter_by(order_no=order.order_no).first()
            writer.writerow({
                'orderID': order.order_id,
                'product_name': order.product_name,
                'product_code': order.product_code,
                'order_no':order.order_no,
                'quantity':order.quantity,
                'description':order.description,
                'price':order.price,
                'unit':order.unit,
                'time':o_top.time,
                'user_ID': o_top.uid  
            })

    return csv_file_path

@celery.task
def daily_reminder():

    current_time=datetime.datetime.now()
    u=User.query.all()
    for user in u:
        if(user.roles[0]=='user'):
            visited=user.last_visit
            db_datetime = datetime.datetime.strptime(visited, "%Y-%m-%d %H:%M:%S.%f")
            time_elapsed = (current_time - db_datetime).total_seconds() / 3600
            #print('time-elapsed', time_elapsed)
            if(time_elapsed>=24):
                send_email(
                    to_address=user.email,
                    subject="Daily Reminder",
                    message='''<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Daily Reminder</title>
                            </head>
                            <body>
                                <div style="display: flex; justify-content: center; align-items: center;">  
                                    <a href="http://127.0.0.1:5000"> <img src="cid:image0" style="width: 450px; height: 600px; object-fit: cover;"> </a>    
                                </div> 
                            </body>
                            </html>''',
                    content='html'
                    )

    return "email sent for reminder"

@celery.task
def monthly_report():
    current_time=datetime.datetime.now()
    previous_day = current_time - datetime.timedelta(days=1)
    month = previous_day.strftime("%B")
    u=User.query.all()
    for user in u:
        if(user.roles[0]=='user'):
            no_of_orders=0
            no_of_items=0
            total_spent=0
            uid=user.user_id
            email=user.email
            items_brought=[]
            o_top=Order_top.query.filter_by(uid=uid).all()
            for orders in o_top:
                time_ordered=orders.time
                db_datetime = datetime.datetime.strptime(time_ordered, "%Y-%m-%d %H:%M:%S.%f")
                time_elapsed = (current_time - db_datetime).days
                if(time_elapsed<=30):
                    no_of_orders+=1
                    total_spent+=orders.total
                    items=Order.query.filter_by(order_no=orders.order_no).all()
                    for ele in items:
                        d={'order_no':ele.order_no, 'name':ele.product_name, 'quantity':ele.quantity, 'unit':ele.unit, 'price':ele.price}
                        items_brought.append(d)
                    no_of_items+=len(items)
            
            user_data={'no_of_orders': no_of_orders, 'no_of_items': no_of_items, 'total_spent': total_spent, 'email':email, 'orders':items_brought, 'month':month}
            template=''' <html>
            <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Fredoka+One">
            <style>table {
                        width: 100%;
                        margin-bottom: 1rem;
                        background-color: #fff;
                        border-collapse: collapse;
                    }

                    table th,
                    table td {
                        padding: 0.75rem;
                        vertical-align: top;
                        border-top: 1px solid #dee2e6;
                    }

                    table thead th {
                        vertical-align: bottom;
                        border-bottom: 2px solid #dee2e6;
                    }

                    table tbody + tbody {
                        border-top: 2px solid #dee2e6;
                    }

                    table .table-bordered {
                        border: 1px solid #dee2e6;
                    }

                    table .table-striped tbody tr:nth-of-type(odd) {
                        background-color: rgba(0, 0, 0, 0.05);
                    }

                    table .table-hover tbody tr:hover {
                        background-color: rgba(0, 0, 0, 0.075);
                    } </style>
              <title>Monthly Report</title>
            </head>

            <body>
            <div style="display: flex; justify-content: center; font-family: 'Fredoka One', sans-serif; font-size:xx-large; padding-bottom:10px;"> {{data.month}} report   </div>

                <div> 
                    <img src="file:///mnt/c/Users/Vijay/Documents/project_iitm/grocery_store/static/img/report.jpg" style="height: 100%; width: 100%; object-fit: cover;"/> 
                    <div style="position: absolute; top: 44.5%; left: 50%; transform: translate(-50%, -50%); background-color:  rgb(3, 10, 105); color: white; padding: 10px; font-family: 'Fredoka One', sans-serif; font-size: x-large; border-radius: 10px;">
                        {{data.email}}
                    </div>
                    
                    <div style="position: absolute; top: 71%; left:20%; transform: translate(-50%, -50%); background-color: rgb(3, 10, 105); color: white; padding: 10px; font-family: 'Fredoka One', sans-serif; font-size: 30px; border-radius: 10px;">
                        {{data.no_of_orders}}
                    </div>
                    <div style="position: absolute; top: 71%; left: 50%; transform: translate(-50%, -50%); background-color: rgb(3, 10, 105); color: white; padding: 10px; font-family: 'Fredoka One', sans-serif; font-size: 30px; border-radius: 10px;">
                        {{data.no_of_items}}
                    </div>
                    <div style="position: absolute; top: 71%; right: 20%; transform: translate(50%, -50%); background-color: rgb(3, 10, 105); color: white; padding: 10px; font-family: 'Fredoka One', sans-serif; font-size: 30px; border-radius: 10px;">
                        ₹{{data.total_spent}}
                    </div>  
                </div>

                <div style="display: flex; justify-content: center; font-family: 'Fredoka One', sans-serif; font-size:xx-large; padding:20px;"> Products Breakdown   </div>

                <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {% for ele in data.orders %}
                            <tr>
                            <th scope="row">{{loop.index}}</th>
                            <td>{{ele.order_no}}</td>
                            <td>{{ele.name}}</td>
                            <td>{{ele.quantity}}</td>
                            <td>{{ele.unit}}</td>
                            <td>₹{{ele.price}}</td>
                            </tr>
                        {% endfor %}
                        </tbody>
                        </table>
                </div>
            </body>
            <html>
                
               '''
            jinja_template=Template(template)
            email_template = jinja_template.render(data=user_data)
            html = HTML(string=email_template)

            pdf_path = "static/report.pdf"
            html.write_pdf(pdf_path)

            send_email(
                    to_address=user.email,
                    subject="Monthly Report",
                    message='''<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Daily Reminder</title>
                            </head>
                            <body>
                                <div style="display: flex; justify-content: center; align-items: center;">  
                                    <a href="http://127.0.0.1:5000"> <img src="cid:image0" style="width: 50%; height: 50%; object-fit: cover;"> </a>    
                                </div> 
                            </body>
                            </html>''',
                    content='html',
                    attachments=['static/report.pdf']
                    )
    return "monthly report sent!"



                
    

    