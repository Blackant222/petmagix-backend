from datetime import datetime
from api import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    points = db.Column(db.Integer, default=0)
    pets = db.relationship('Pet', backref='owner', lazy=True)

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    species = db.Column(db.String(50))
    breed = db.Column(db.String(100))
    age = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    health_records = db.relationship('HealthRecord', backref='pet', lazy=True)

class HealthRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    weight = db.Column(db.Float)
    activity_level = db.Column(db.String(50))
    diet_notes = db.Column(db.Text)
    hydration = db.Column(db.Float)
    symptoms = db.Column(db.Text)
    behavioral_notes = db.Column(db.Text)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)