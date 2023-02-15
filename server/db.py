from firebase_admin import credentials, firestore, initialize_app
import server.config as config

cred = credentials.Certificate(
    {
        "type": config.DB_TYPE,
        "project_id": config.DB_PROJECT_ID,
        "private_key_id": config.DB_PRIVATE_KEY_ID,
        "private_key": config.DB_PRIVATE_KEY,
        "client_email": config.DB_CLIENT_EMAIL,
        "client_id": config.DB_CLIENT_ID,
        "auth_uri": config.DB_AUTH_URI,
        "token_uri": config.DB_TOKEN_URI,
        "auth_provider_x509_cert_url": config.DB_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": config.DB_CLIENT_X509_CERT_URL
    }
)

initialize_app(cred)
db = firestore.client()

def add_move_into_db(move):
    collection_ref = db.collection('history')
    collection_ref.add({
        'game_id': move.get('game_id'),
        'move_number': move.get('move_number'),
        'room_number': move.get('room_number'),
        'placed_symbol': move.get('placed_symbol'),
    })