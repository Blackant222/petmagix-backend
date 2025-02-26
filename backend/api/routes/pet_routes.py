from flask import Blueprint, request, jsonify
from api.models import User, db
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint('users', __name__, url_prefix='/api')  # Add url_prefix

@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate input data
        if not data or not data.get('email') or not data.get('password'):
            print("Registration failed: Missing email or password")  # Debug log
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Check if email exists
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            print(f"Registration failed: Email already exists - {data['email']}")  # Debug log
            return jsonify({'error': 'Email already exists'}), 409
        
        # Create new user with hashed password
        hashed_password = generate_password_hash(data['password'], method='sha256')
        new_user = User(
            email=data['email'],
            password=hashed_password
        )
        
        # Save to database
        db.session.add(new_user)
        db.session.commit()
        
        print(f"User registered successfully: {data['email']}")  # Debug log
        return jsonify({'message': 'User created successfully'}), 201
        
    except Exception as e:
        print(f"Registration error: {str(e)}")  # Debug log
        db.session.rollback()
        return jsonify({'error': 'Registration failed'}), 500

@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate input data
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        # Check user exists and verify password
        if user and check_password_hash(user.password, data['password']):
            return jsonify({
                'user_id': user.id,
                'email': user.email,
                'points': user.points
            }), 200
        
        return jsonify({'error': 'Invalid credentials'}), 401
        
    except Exception as e:
        print(f"Login error: {str(e)}")  # Debug log
        return jsonify({'error': 'Login failed'}), 500

# Debug route to test API connection
@bp.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'User routes are working!'}), 200

# Debug route to list users (remove in production)
@bp.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    return jsonify({
        'users': [{'id': u.id, 'email': u.email, 'points': u.points} for u in users]
    })