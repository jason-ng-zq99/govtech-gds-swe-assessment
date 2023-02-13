from flask import Flask, send_from_directory
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='client/build')
CORS(app)
api = Api(app)

@app.route("/", defaults={'path':''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

if __name__ == "__main__":
    app.run()