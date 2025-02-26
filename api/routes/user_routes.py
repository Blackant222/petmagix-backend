from flask import Blueprint, request, jsonify
from api.models import User, db

bp = Blueprint('users', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    new_user = User(
        email=data['email'],
        password=data['password']  # In a real app, hash this password!
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.password == data['password']:  # In a real app, verify hash!
        return jsonify({
            'user_id': user.id,
            'email': user.email,
            'points': user.points
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401