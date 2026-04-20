from flask import Flask
from flask_cors import CORS

def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)

    from .logs import bp
    app.register_blueprint(bp, url_prefix='/logs')

    print(app.url_map)

    return app
