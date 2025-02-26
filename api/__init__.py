from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    CORS(app)
    db.init_app(app)

    from api.routes import pet_routes, health_routes, user_routes
    app.register_blueprint(pet_routes.bp)
    app.register_blueprint(health_routes.bp)
    app.register_blueprint(user_routes.bp)

    with app.app_context():
        db.create_all()

    return app