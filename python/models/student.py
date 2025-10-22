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

    # DEMO 1: Type the implementation
    # Hint: Start with: return self.gpa >= 3.5
    def is_honor_student(self):
        """Check if student is honor student (GPA >= 3.5)"""
        # TODO: DEMO - Type the implementation
        pass

    # DEMO 2: Type the implementation
    # Hint: Start with: from datetime import datetime
    def get_year_of_study(self):
        """Calculate year of study (1-4)"""
        # TODO: DEMO - Type the implementation
        pass
