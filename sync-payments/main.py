import requests
import csv
import schedule
import smtplib
import stripe
import os
import time
from datetime import datetime
from pprint import pprint
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from enum import Enum
from email import encoders
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

load_dotenv()

stripe.api_key = os.environ["TOKEN"]

def get_intents():
    past_time = int(time.time()) - 86400 # one day
    res = []
    intents = stripe.PaymentIntent.list(created={"gte": past_time}, limit=100)
    while intents["has_more"]:
        intents = stripe.PaymentIntent.list(starting_after=intents[-1], created={"gte": past_time}, limit=100)
        res.extend(intents)
    return intents.data

def scrape_receipts(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    product_name = soup.select_one(".Table-description.Font.Font--body")
    return product_name.getText().strip()

def send_email(receiver_address, attachment):
    sender_address = os.environ["EMAIL"] 
    sender_pass = os.environ["PASSWORD"]
    today = datetime.today().strftime('%Y-%m-%d')

    message = MIMEMultipart()
    message['From'] = sender_address
    message['To'] = receiver_address
    message['Subject'] = f'MONOGATARI MEDIA EDITORIAL ORDER REQUESTS {today}'

    # message.attach(MIMEText(mail_content, 'plain'))
    
    part = MIMEBase('application', "octet-stream")
    part.set_payload(open(attachment, "rb").read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment', filename=attachment)  # or
    message.attach(part)

    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls()
    session.login(sender_address, sender_pass)
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    session.quit()

def main():
    intents = get_intents()
    headers = [ "Book", "Address", "Name", "Email"]
    rows = [headers]
    for intent in intents:
        charge = intent["charges"]["data"][0]
        email = charge["billing_details"]["email"]
        name = charge["billing_details"]["name"]
        city = charge["billing_details"]["address"]["city"]
        country = charge["billing_details"]["address"]["country"]
        line1 = charge["billing_details"]["address"]["line1"]
        line2 = charge["billing_details"]["address"]["line2"]
        postal_code = charge["billing_details"]["address"]["postal_code"]
        state = charge["billing_details"]["address"]["state"]
        book_name = scrape_receipts(charge["receipt_url"])
        address = f"{line1} {line2} {city}, {state}, {country}, {postal_code}"
        rows.append([book_name, address, name, email])
    
    with open("temp.csv", "w") as f:
        writer = csv.writer(f)
        writer.writerows(rows)

    send_email(os.environ["RECEIVER_EMAIL"], 'temp.csv')

schedule.every().day.do(main)
while True:
    schedule.run_pending()
    time.sleep(1)
