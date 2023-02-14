from flask import Flask, send_from_directory, json
from flask_restful import Api
from flask_cors import CORS
from flask_socketio import SocketIO, rooms, join_room, send

app = Flask(__name__, static_url_path='', static_folder='client/build')
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

SOCKETIO = SocketIO(app, cors_allowed_origins="*", json=json, manage_session=True, logger=True, engineio_logger=True)

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

@SOCKETIO.on('message')
def handle_message(data):
    print('received message: ' + data)

@SOCKETIO.on('join_game')
def joinGame(message):
    connectedSockets = rooms(message['roomId'])
    print('Received join game request to room:', message['roomId'])
    print('Number of sockets in this room:', len(connectedSockets))

    if len(connectedSockets) >= 2:
        SOCKETIO.emit("room_join_error", {
            'error': "Room is full! Please choose another room to play."
        })
    else:
        roomId = message['roomId']
        join_room(roomId)
        print("A user joined this room: ", roomId)
        print("Number of users in room after joining: ", len(rooms(roomId)))
        send("A new user has joined this room.", to=roomId)
        SOCKETIO.emit("room_joined")

    if (len(connectedSockets) == 2):
        SOCKETIO.emit("start_game", {
            'start': True,
            'symbol': "X"
        })
        SOCKETIO.to(message['roomId']).emit("start_game", {
            'start': False,
            'symbol': "O"
        })

if __name__ == "__main__":
    SOCKETIO.run(
        app=app,
        # host=os.getenv('IP', '0.0.0.0'),
        port=5001,
        debug=True
    )