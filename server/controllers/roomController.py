from flask_socketio import join_room, leave_room
from app import SOCKETIO

@SOCKETIO.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    SOCKETIO.send(username + ' has entered the room.', to=room)

@SOCKETIO.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    SOCKETIO.send(username + ' has left the room.', to=room)