"""
Blueprint containing student API routes.
Demonstrates Copilot generating REST endpoints and CRUD operations.
"""

from flask import Blueprint, request, jsonify
from datetime import datetime
from app import db
from models.student import Student

student_bp = Blueprint('students', __name__, url_prefix='/api/v1/students')

@student_bp.route('', methods=['GET'])
def get_all_students():
    """
    Get all students
    GET /api/v1/students
    """
    try:
        students = Student.query.all()
        return jsonify([student.to_dict() for student in students]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@student_bp.route('/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """
    Get student by ID
    GET /api/v1/students/{id}
    """
    try:
        student = Student.query.get(student_id)
        if not student:
            return jsonify({'error': 'Student not found'}), 404
        return jsonify(student.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@student_bp.route('', methods=['POST'])
def create_student():
    """
    Create new student
    POST /api/v1/students
    """
    try:
        data = request.get_json()
        
        if not data or not all(k in data for k in ['name', 'email', 'major']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if email already exists
        existing = Student.query.filter_by(email=data['email']).first()
        if existing:
            return jsonify({'error': 'Email already exists'}), 409
        
        student = Student.from_dict(data)
        db.session.add(student)
        db.session.commit()
        
        return jsonify(student.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@student_bp.route('/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """
    Update student
    PUT /api/v1/students/{id}
    """
    try:
        student = Student.query.get(student_id)
        if not student:
            return jsonify({'error': 'Student not found'}), 404
        
        data = request.get_json()
        
        if 'name' in data:
            student.name = data['name']
        if 'email' in data:
            # Check if new email is unique
            existing = Student.query.filter_by(email=data['email']).first()
            if existing and existing.id != student_id:
                return jsonify({'error': 'Email already exists'}), 409
            student.email = data['email']
        if 'major' in data:
            student.major = data['major']
        if 'gpa' in data:
            student.gpa = data['gpa']
        if 'is_active' in data:
            student.is_active = data['is_active']
        
        student.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify(student.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@student_bp.route('/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """
    Delete student
    DELETE /api/v1/students/{id}
    """
    try:
        student = Student.query.get(student_id)
        if not student:
            return jsonify({'error': 'Student not found'}), 404
        
        db.session.delete(student)
        db.session.commit()
        
        return '', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@student_bp.route('/major/<major>', methods=['GET'])
def get_students_by_major(major):
    """
    Get students by major
    GET /api/v1/students/major/{major}
    """
    try:
        students = Student.query.filter_by(major=major).all()
        return jsonify([student.to_dict() for student in students]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# DEMO 1: Type the implementation
# Hint: Start with: students = Student.query.filter_by(
# Watch Copilot suggest the rest
@student_bp.route('/filter/active', methods=['GET'])
def get_active_students():
    """Get all active students"""
    # TODO: DEMO - Type the implementation

# DEMO 2: Type the implementation
# Hint: Start with: min_gpa = request.args.get(
# Watch Copilot suggest query parameter parsing
@student_bp.route('/filter/gpa-range', methods=['GET'])
def get_students_by_gpa_range():
    """Get students by GPA range"""
    # TODO: DEMO - Type the implementation

# DEMO 3: Type the implementation
# Hint: Start with: query = request.args.get(
# Watch Copilot suggest filter logic
@student_bp.route('/search', methods=['GET'])
def search_students():
    """Search students by name, email, or major"""
    # TODO: DEMO - Type the implementation
