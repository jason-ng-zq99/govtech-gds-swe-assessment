from flask import Blueprint
from server.routes import SAVE_MOVE
from server.db import add_move_into_db

game_api = Blueprint('game_api', __name__)

@game_api.route(SAVE_MOVE, methods=['POST'])
def save_move(move):
    add_move_into_db(move)