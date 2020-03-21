from flask import Flask
from flask_cors import CORS
from matcher.api import api

__author__ = """SWAG"""
from matcher.config import app_config


def create_app(config_name: str):
    app = Flask(__name__)
    app.config.from_object(app_config[config_name])
    CORS(app)
    app.register_blueprint(api, url_prefix='/api')
    return app
