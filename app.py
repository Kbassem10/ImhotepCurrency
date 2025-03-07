from flask import Flask, render_template, request, make_response, redirect
from flask_sitemap import Sitemap
import requests
import datetime
import os

app = Flask(__name__)

ext = Sitemap(app=app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calculate", methods=["POST", "GET"])
def calculate():
    if request.method == "GET":
        return redirect("/")    
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

    try:
        response = requests.get(f"https://imhotepexchangeratesapi.pythonanywhere.com/latest_rates/{primary_api_key}/{from_currency}")
        data = response.json()
        rate = data["data"]

    except requests.RequestException as e:
        print(f"Failed to fetch exchange rates: {e}")
        return None

    if response.status_code == 200:
        rate = data["data"][to_currency]
        result = amount * rate
        res = "{:,.2f}".format(result)
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

@app.route("/terms")
def terms():
    return render_template("terms.html")

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route('/sitemap.xml')
def sitemap():
    """Generate a secure sitemap.xml file."""
    # Use a fixed list of routes instead of automatic discovery
    # This is more secure and ensures only public routes are included
    routes = [
        {"url": "https://imhotepcc.vercel.app/", "date": "2025-03-07"},
        {"url": "https://imhotepcc.vercel.app/version", "date": "2025-03-07"},
        {"url": "https://imhotepcc.vercel.app/download", "date": "2025-03-07"},
        {"url": "https://imhotepcc.vercel.app/terms", "date": "2025-03-07"},
        {"url": "https://imhotepcc.vercel.app/privacy", "date": "2025-03-07"}
    ]
    
    # Generate the XML using your template file
    xml_content = render_template('sitemap.xml', routes=routes)
    
    # Create a response with proper headers
    response = make_response(xml_content)
    response.headers["Content-Type"] = "application/xml"
    return response

# @app.after_request
# def add_header(response):
#     response.headers['X-Frame-Options'] = 'SAMEORIGIN'
#     return response

# @app.after_request
# def remove_csp_header(response):
#     if 'Content-Security-Policy' in response.headers:
#         del response.headers['Content-Security-Policy']
#     return response

# @app.after_request
# def set_content_type_options(response):
#     response.headers['X-Content-Type-Options'] = 'nosniff'
#     return response

# @app.after_request
# def add_header(response):
#     response.headers['X-Frame-Options'] = 'SAMEORIGIN'
#     response.headers['X-Content-Type-Options'] = 'nosniff'
#     return response

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error_handle.html', error_code = "404", error_description = "We can't find that page."), 404

@app.errorhandler(400)
def session_expired(error):
    return render_template('error_handle.html', error_code = "400", error_description= "Session Expired."), 400

@app.errorhandler(429)
def request_amount_exceed(error):
    return render_template('error_handle.html', error_code = "429", error_description= "You exceeded the Maximum amount of requests! Please Try Again Later"), 429

@app.errorhandler(405)
def page_not_found(error):
    return render_template('error_handle.html', error_code = "405", error_description = "Method Not Allowed."), 405

@app.errorhandler(Exception)
def server_error(error):
    return render_template('error_handle.html', error_code = "500", error_description = "Something went wrong."), 500

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('error_handle.html', error_code = "500", error_description="Something Went Wrong."), 500