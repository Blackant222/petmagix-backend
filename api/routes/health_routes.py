from flask import Blueprint, request, jsonify
from api.models import HealthRecord, User, db
from api.utils.ai_insights import get_ai_insights

bp = Blueprint('health', __name__)

@bp.route('/health-records/<int:pet_id>', methods=['POST'])
def create_health_record():
    data = request.get_json()
    
    new_record = HealthRecord(
        weight=data.get('weight'),
        activity_level=data.get('activity_level'),
        diet_notes=data.get('diet_notes'),
        hydration=data.get('hydration'),
        symptoms=data.get('symptoms'),
        behavioral_notes=data.get('behavioral_notes'),
        pet_id=data['pet_id']
    )
    
    db.session.add(new_record)
    
    # Add points for logging health data
    pet_owner = User.query.join(Pet).filter(Pet.id == data['pet_id']).first()
    if pet_owner:
        pet_owner.points += 10
    
    db.session.commit()
    
    # Get AI insights
    insights = get_ai_insights(new_record)
    
    return jsonify({
        'record': {
            'id': new_record.id,
            'date': new_record.date,
            'weight': new_record.weight,
            'activity_level': new_record.activity_level,
            'diet_notes': new_record.diet_notes,
            'hydration': new_record.hydration,
            'symptoms': new_record.symptoms,
            'behavioral_notes': new_record.behavioral_notes
        },
        'insights': insights
    }), 201

@bp.route('/health-records/<int:pet_id>', methods=['GET'])
def get_pet_health_records(pet_id):
    records = HealthRecord.query.filter_by(pet_id=pet_id).order_by(HealthRecord.date.desc()).all()
    return jsonify([{
        'id': record.id,
        'date': record.date,
        'weight': record.weight,
        'activity_level': record.activity_level,
        'diet_notes': record.diet_notes,
        'hydration': record.hydration,
        'symptoms': record.symptoms,
        'behavioral_notes': record.behavioral_notes
    } for record in records])