"""
Student model entity.
Demonstrates Copilot generating SQLAlchemy models.
"""

from datetime import datetime
from app import db

class Student(db.Model):
    """
    Student entity representing a student record.
    Demonstrates model creation with validation.
    """
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    major = db.Column(db.String(100), nullable=False)
    gpa = db.Column(db.Float, default=0.0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Student {self.name}>'

    def to_dict(self):
        """Convert model to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'major': self.major,
            'gpa': self.gpa,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    @staticmethod
    def from_dict(data):
        """Create model from dictionary"""
        return Student(
            name=data.get('name'),
            email=data.get('email'),
            major=data.get('major'),
            gpa=data.get('gpa', 0.0),
            is_active=data.get('is_active', True)
        )

    # DEMO Step 1: Generate instance method to check honor student
    def is_honor_student(self):
        """
        DEMO: Check if student is honor student
        
        Instructions for Copilot:
        "Generate a method that:
        - Returns True if GPA is 3.5 or higher
        - Returns False otherwise
        - Add docstring explaining honor student criteria"
        """
        # TODO: Let Copilot suggest the implementation
        raise NotImplementedError("TODO: Implement with Copilot suggestion")

    # DEMO Step 2: Generate method to get class year
    def get_year_of_study(self):
        """
        DEMO: Calculate year of study
        
        Instructions for Copilot:
        "Generate a method that:
        - Calculates years since created_at date
        - Returns year as integer (1-4)
        - Caps at 4 for 4th year
        - Uses datetime calculations"
        """
        # TODO: Let Copilot suggest the implementation
        raise NotImplementedError("TODO: Implement with Copilot suggestion")
