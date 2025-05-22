from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"])  # Enable CORS for the frontend

    from .routes import main
    app.register_blueprint(main)

    return app
