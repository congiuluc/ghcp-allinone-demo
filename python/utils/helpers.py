"""
Utility helper functions.
Demonstrates Copilot generating utility functions.
"""

from functools import wraps
from flask import jsonify, request

def validate_email(email):
    """
    Validate email format
    
    Args:
        email (str): Email address to validate
        
    Returns:
        bool: True if valid, False otherwise
    """
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_gpa(gpa):
    """
    Validate GPA value
    
    Args:
        gpa (float): GPA value to validate
        
    Returns:
        bool: True if valid (0.0 to 4.0), False otherwise
    """
    try:
        gpa_float = float(gpa)
        return 0.0 <= gpa_float <= 4.0
    except (ValueError, TypeError):
        return False

def require_json(f):
    """
    Decorator to require JSON content type
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.is_json:
            return jsonify({'error': 'Request must be JSON'}), 400
        return f(*args, **kwargs)
    return decorated_function

def handle_errors(f):
    """
    Decorator to handle common errors
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except ValueError as e:
            return jsonify({'error': f'Invalid value: {str(e)}'}), 400
        except Exception as e:
            return jsonify({'error': f'Server error: {str(e)}'}), 500
    return decorated_function
