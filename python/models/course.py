"""
Course model for student courses.
See README.md DEMO 3 for step-by-step instructions.
"""

from datetime import datetime
from typing import Optional, List


class Course:
    """Course model with validation and status tracking."""
    
    def __init__(self, id: int, name: str, credits: int, description: str = "", is_active: bool = True):
        # TODO: Initialize properties
        self.id = id
        self.name = name
        self.credits = credits
        self.description = description
        self.is_active = is_active
    
    def validate_credits(self) -> bool:
        # TODO: Validate credits between 1-6
        return 1 <= self.credits <= 6
    
    def get_status(self) -> str:
        # TODO: Return "Active" or "Inactive" based on is_active
        return "Active" if self.is_active else "Inactive"
    
    def is_available_for_enrollment(self) -> bool:
        # TODO: Check if course is active and available for enrollment
        return self.is_active
    
    def __repr__(self) -> str:
        # TODO: Return formatted string representation
        return f'<Course {self.name}>'
    
    def __eq__(self, other) -> bool:
        # TODO: Compare courses by id
        if not isinstance(other, Course):
            return False
        return self.id == other.id
