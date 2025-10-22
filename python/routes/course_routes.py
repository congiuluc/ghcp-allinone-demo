"""
Blueprint containing course API routes.
See README.md DEMO 3 for step-by-step instructions.
"""

from flask import Blueprint, request, jsonify
from datetime import datetime
from models.course import Course

course_bp = Blueprint('courses', __name__, url_prefix='/api/v1/courses')


@course_bp.route('', methods=['GET'])
def get_all_courses():
    # TODO: Implement GET all courses with optional sorting
    pass


@course_bp.route('/<int:course_id>', methods=['GET'])
def get_course(course_id):
    # TODO: Implement GET course by ID with error handling
    pass


@course_bp.route('', methods=['POST'])
def create_course():
    # TODO: Implement POST create course with validation
    pass


@course_bp.route('/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    # TODO: Implement PUT update course with partial updates
    pass


@course_bp.route('/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    # TODO: Implement DELETE course
    pass


@course_bp.route('/search', methods=['GET'])
def search_courses():
    # TODO: Implement search with filters and pagination
    pass


@course_bp.route('/stats', methods=['GET'])
def get_course_stats():
    # TODO: Implement aggregate statistics
    pass
