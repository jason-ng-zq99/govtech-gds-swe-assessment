from flask import Flask, send_from_directory, json
from flask_restful import Api
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__, static_url_path='', static_folder='client/build')
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

SOCKETIO = SocketIO(
    app, cors_allowed_origins="*", json=json, manage_session=False
)

@app.route("/", defaults={'path':''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@SOCKETIO.on('connect')
def on_connect():
    """This connects the socket"""
    print('User connected!')

@SOCKETIO.on('disconnect')
def on_disconnect():
    """This tests the user connection"""
    print('User disconnected!')

if __name__ == "__main__":
    SOCKETIO.run(
        app=app,
        # host=os.getenv('IP', '0.0.0.0'),
        port=5001,
        debug=True
    )