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

GET_CUSTOMER_PAYMENT = "https://dashboard.stripe.com/v1/payment_intents/pi_3LMOB9I0Ar8cBxuY1zsfRhjj?expand[]=source&expand[]=customer&expand[]=invoice&expand[]=payment_method&expand[]=charges.data.customer&expand[]=charges.data.refunds.data.balance_transaction.automatic_transfer&expand[]=charges.data.balance_transaction.automatic_transfer&expand[]=charges.data.dispute.balance_transactions.automatic_transfer&expand[]=charges.data.review&expand[]=charges.data.application_fee&expand[]=charges.data.early_fraud_warning&include_only[]=id,object,created,amount,amount_received,currency,cross_border_classification,status,description,statement_descriptor,created_with_api_performance_mode,transfer_group,order,order_automatic_tax_applied,confirmation_method,setup_future_usage,payment_method_types,metadata,canceled_at,cancellation_reason,payment_page,automatic_tax.enabled,invoice.id,redaction.status,charges.count,next_action.type,next_action.use_stripe_sdk,last_payment_error.code,last_payment_error.decline_code,transfer_data.amount,transfer_data.destination,shipping.name,shipping.phone,shipping.carrier,shipping.tracking_number,payment_method.id,payment_method.object,payment_method.type,payment_method.created,payment_method.setup_by,customer.id,customer.object,customer.created,customer.email,customer.name,customer.description,customer.deleted,source.id,source.object,source.last4,source.dynamic_last4,source.three_d_secure,source.brand,source.name,source.currency,source.address_line1,source.address_line2,source.address_city,source.address_state,source.address_zip,source.address_country,source.country,source.tokenization_method,source.exp_month,source.exp_year,source.cvc_check,source.address_line1_check,source.address_zip_check,source.setup_by,source.funding,source.fingerprint,source.deleted,source.created,source.bank_name,source.livemode,source.status,source.type,source.usage,source.statement_descriptor,source.customer,source.flow,payment_method.netbanking.bank,payment_method.upi.vpa,customer.shipping.name,source.paypal.transaction_id,source.interac_present.last4,source.eps.reference,source.chf_credit_transfer.participant_number,source.bacs_debit.last4,source.au_becs_debit.last4,next_action.konbini_display_details.expires_at,invoice.automatic_tax.enabled,payment_method.au_becs_debit.bsb_number,payment_method.au_becs_debit.last4,source.oxxo.number,source.oxxo.expires_after,source.sepa_credit_transfer.bic,source.sepa_credit_transfer.iban,source.acss_debit.bank_name,source.acss_debit.last4,source.ach_debit.bank_name,source.ach_debit.last4,source.p24.bank,source.p24.reference,source.open_banking.bank,source.open_banking.payee_reference,source.owner.name,source.owner.email,next_action.oxxo_display_details.number,next_action.oxxo_display_details.expires_after,next_action.boleto_display_details.number,next_action.boleto_display_details.hosted_voucher_url,payment_method.bacs_debit.fingerprint,payment_method.bacs_debit.last4,payment_method.bacs_debit.sort_code,source.receiver.amount_charged,source.receiver.amount_received,source.receiver.amount_returned,source.ideal.bank,source.ideal.bic,source.ideal.iban_last4,source.id_credit_transfer.bank_name,source.id_credit_transfer.account_number,source.id_credit_transfer.display_name,source.bitcoin.address,source.bitcoin.amount,source.bitcoin.amount_received,source.three_d_secure_2_eap.brand,source.three_d_secure_2_eap.last4,source.three_d_secure_2_eap.dynamic_last4,source.three_d_secure_2.brand,source.three_d_secure_2.last4,source.three_d_secure_2.dynamic_last4,source.sofort,source.sepa_debit,source.bancontact,source.ach_credit_transfer,source.giropay,payment_method.us_bank_account,payment_method.acss_debit,last_payment_error.payment_method,next_action.display_bank_transfer_instructions,source.paper_check,payment_method.sepa_debit,shipping.address,source.card_present,payment_method.card,source.alipay,source.gbp_credit_transfer,source.multibanco,source.card,source.wechat,source.boleto_pilot,source.jp_credit_transfer,source.paysecure,source.klarna,source.fpx,charges.data,payment_method_options.acss_debit,payment_method.billing_details,source.owner.address&include[]=charges.data.balance_transaction.automatic_transfer&include[]=charges.data.refunds.data.balance_transaction.automatic_transfer&include[]=charges.data.dispute.balance_transactions.automatic_transfer"
GET_PRODUCT_PAYMENT = "https://dashboard.stripe.com/ajax/payment_pages?expand[]=invoice.subscription.items.data.plan.tiers&expand[]=invoice.subscription.items.data.plan.product&include_only[]=id,shipping.name,shipping.address.city,shipping.address.country,shipping.address.line1,shipping.address.line2,shipping.address.postal_code,shipping.address.state,line_item_group.currency,line_item_group.subtotal,line_item_group.shipping_rate.id,line_item_group.shipping_rate.amount,line_item_group.shipping_rate.currency,line_item_group.shipping_rate.display_name,line_item_group.tax_amounts.amount,line_item_group.tax_amounts.inclusive,line_item_group.tax_amounts.tax_rate.display_name,line_item_group.tax_amounts.tax_rate.percentage,line_item_group.tax_amounts.tax_rate.jurisdiction,line_item_group.tax_amounts.tax_rate.description,line_item_group.tax_amounts.tax_rate.inclusive,line_item_group.discount_amounts.amount,line_item_group.discount_amounts.coupon.amount_off,line_item_group.discount_amounts.coupon.currency,line_item_group.discount_amounts.coupon.code,line_item_group.discount_amounts.coupon.name,line_item_group.discount_amounts.coupon.percent_off,line_item_group.discount_amounts.promotion_code.code,line_item_group.total,line_item_group.line_items.id,line_item_group.line_items.description,line_item_group.line_items.quantity,line_item_group.line_items.images,line_item_group.line_items.subtotal,line_item_group.line_items.total,line_item_group.line_items.price.id,line_item_group.line_items.price.custom_unit_amount.id,line_item_group.line_items.price.custom_unit_amount.default,line_item_group.line_items.price.unit_amount,line_item_group.line_items.price.product.name,line_item_group.line_items.price.product.id,line_item_group.line_items.price.currency,tax_meta.computation_type,invoice.id,invoice.object,invoice.number,invoice.deleted,invoice.subscription.id,invoice.subscription.created,invoice.subscription.items.data.id,invoice.subscription.items.data.created,invoice.subscription.items.data.object,invoice.subscription.items.data.plan.id,invoice.subscription.items.data.quantity,invoice.subscription.items.data.plan.object,invoice.subscription.items.data.plan.amount,invoice.subscription.items.data.plan.amount_decimal,invoice.subscription.items.data.plan.created,invoice.subscription.items.data.plan.name,invoice.subscription.items.data.plan.currency,invoice.subscription.items.data.plan.interval,invoice.subscription.items.data.plan.interval_count,invoice.subscription.items.data.plan.usage_type,invoice.subscription.items.data.plan.aggregate_usage,invoice.subscription.items.data.plan.transform_usage.divide_by,invoice.subscription.items.data.plan.transform_usage.round,invoice.subscription.items.data.plan.tiers.flat_amount,invoice.subscription.items.data.plan.tiers.flat_amount_decimal,invoice.subscription.items.data.plan.tiers.unit_amount,invoice.subscription.items.data.plan.tiers.unit_amount_decimal,invoice.subscription.items.data.plan.tiers.up_to,invoice.subscription.items.data.plan.tiers_mode,invoice.subscription.items.data.plan.nickname,invoice.subscription.items.data.plan.product.id,invoice.subscription.items.data.plan.product.created,invoice.subscription.items.data.plan.product.name,invoice.subscription.items.data.plan.product.object,invoice.subscription.items.data.plan.product.deleted&payment_intent=pi_3LMOB9I0Ar8cBxuY1zsfRhjj"

ONE_DAY = 1
ONE_WEEK = 7
    
def get_intents(duration = ONE_DAY):
    past_time = int(time.time()) - 86400 * duration
    intents = stripe.PaymentIntent.list(created={"gte": past_time}, limit=100) # FIXME: limit
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
    intents = get_intents(ONE_WEEK)
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

schedule.every().monday.do(main)
