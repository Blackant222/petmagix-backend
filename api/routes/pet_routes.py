from flask import Blueprint, request, jsonify
from api.models import Pet, db

bp = Blueprint('pets', __name__)

@bp.route('/pets', methods=['POST'])
def create_pet():
    data = request.get_json()
    
    new_pet = Pet(
        name=data['name'],
        species=data['species'],
        breed=data['breed'],
        age=data['age'],
        user_id=data['user_id']
    )
    
    db.session.add(new_pet)
    db.session.commit()
    
    return jsonify({
        'id': new_pet.id,
        'name': new_pet.name,
        'species': new_pet.species,
        'breed': new_pet.breed,
        'age': new_pet.age
    }), 201

@bp.route('/pets/<int:user_id>', methods=['GET'])
def get_user_pets(user_id):
    pets = Pet.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': pet.id,
        'name': pet.name,
        'species': pet.species,
        'breed': pet.breed,
        'age': pet.age
    } for pet in pets])