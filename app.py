from flask import Flask, render_template, request, make_response, abort
from flask_sitemap import Sitemap
import requests
import datetime
import os
from flask_talisman import Talisman


app = Flask(__name__)

ext = Sitemap(app=app)

Talisman(app)

@app.before_request
def block_metadata():
    if request.remote_addr == '169.254.169.254':
        abort(403)  # Forbidden

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():    
    from_currency = request.form.get("from_currency")
    to_currency = request.form.get("to_currency")
    amount = float(request.form.get("amount"))
    if from_currency is None or to_currency is None or amount is None:
        error = "You have to fill all of the inputs!"
        return render_template("index.html", error=error)
    
    from_currency_placeholder = from_currency
    to_currency_placeholder = to_currency
    amount_placeholder = amount
    primary_api_key = os.environ.get('EXCHANGE_API_KEY_PRIMARY')
    secondary_api_key = os.environ.get('EXCHANGE_API_KEY_SECONDARY')
    try:
        response = requests.get(f"https://v6.exchangerate-api.com/v6/{primary_api_key}/latest/{from_currency}")
        data = response.json()
    except:
        response = requests.get(f"https://v6.exchangerate-api.com/v6/{secondary_api_key}/latest/{from_currency}")
        data = response.json()  

    if response.status_code == 200:
        rate = data["conversion_rates"][to_currency]
        result = amount * rate
        res = f"{result:,}"
        return render_template("indexPlus.html", res=res, from_currency_placeholder= from_currency_placeholder, to_currency_placeholder=to_currency_placeholder, amount_placeholder=amount_placeholder)
    else:
        error = "Can't reach the currency"
        return render_template("index.html", error=error)
    
@app.route("/version")
def version():
    return render_template("version.html")

@app.route("/download")
def download():
    return render_template("download.html")

@app.route('/sitemap.xml')
def sitemap():
    pages = []

    # Static pages
    ten_days_ago = (datetime.datetime.now() - datetime.timedelta(days=10)).date().isoformat()
    for rule in app.url_map.iter_rules():
        if "GET" in rule.methods and len(rule.arguments) == 0:
            pages.append(
                ["https://imhotepcc.vercel.app" + str(rule.rule), ten_days_ago]
            )

    sitemap_xml = render_template('sitemap_template.xml', pages=pages)
    response = make_response(sitemap_xml)
    response.headers["Content-Type"] = "application/xml"

    return response

@app.after_request
def add_header(response):
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    return response

@app.after_request
def remove_csp_header(response):
    if 'Content-Security-Policy' in response.headers:
        del response.headers['Content-Security-Policy']
    return response

@app.after_request
def set_content_type_options(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    return response