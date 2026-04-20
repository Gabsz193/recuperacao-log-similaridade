from flask import Flask
from flask_cors import CORS
from .config import config_setup
import os

def create_app(test_config=None):    
    app = Flask(__name__)
    CORS(app)
    
    env = os.environ.get('FLASK_ENV', 'default')
    app.config.from_object(config_setup[env])
    
    from .logs import bp
    app.register_blueprint(bp, url_prefix='/logs')

    return app
