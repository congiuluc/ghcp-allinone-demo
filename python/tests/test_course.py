"""
Unit tests for Course model.
Tests course validation, status, and equality.
"""

import pytest
from models.course import Course


class TestCourseInitialization:
    """Test suite for Course initialization."""

    def test_create_course_with_all_parameters(self):
        """Test creating a course with all parameters."""
        course = Course(
            id=1,
            name="Introduction to Python",
            credits=3,
            description="Learn Python programming",
            is_active=True
        )
        assert course.id == 1
        assert course.name == "Introduction to Python"
        assert course.credits == 3
        assert course.description == "Learn Python programming"
        assert course.is_active is True

    def test_create_course_with_default_values(self):
        """Test creating a course with default values."""
        course = Course(
            id=2,
            name="Data Structures",
            credits=4
        )
        assert course.id == 2
        assert course.name == "Data Structures"
        assert course.credits == 4
        assert course.description == ""
        assert course.is_active is True


class TestCourseValidation:
    """Test suite for course validation methods."""

    def test_validate_credits_valid_range(self):
        """Test that credits in valid range (1-6) pass validation."""
        for credits in range(1, 7):
            course = Course(id=1, name="Test Course", credits=credits)
            assert course.validate_credits() is True

    def test_validate_credits_invalid_range(self):
        """Test that credits outside valid range (1-6) fail validation."""
        invalid_credits = [0, -1, 7, 10, 100]
        for credits in invalid_credits:
            course = Course(id=1, name="Test Course", credits=credits)
            assert course.validate_credits() is False


class TestCourseStatus:
    """Test suite for course status methods."""

    def test_get_status_active(self):
        """Test that active course returns 'Active' status."""
        course = Course(id=1, name="Active Course", credits=3, is_active=True)
        assert course.get_status() == "Active"

    def test_get_status_inactive(self):
        """Test that inactive course returns 'Inactive' status."""
        course = Course(id=2, name="Inactive Course", credits=3, is_active=False)
        assert course.get_status() == "Inactive"


class TestCourseAvailability:
    """Test suite for course enrollment availability."""

    def test_available_for_enrollment_when_active(self):
        """Test that active courses are available for enrollment."""
        course = Course(id=1, name="Available Course", credits=3, is_active=True)
        assert course.is_available_for_enrollment() is True

    def test_not_available_for_enrollment_when_inactive(self):
        """Test that inactive courses are not available for enrollment."""
        course = Course(id=2, name="Unavailable Course", credits=3, is_active=False)
        assert course.is_available_for_enrollment() is False


class TestCourseRepresentation:
    """Test suite for course string representation."""

    def test_repr_format(self):
        """Test that __repr__ returns expected format."""
        course = Course(id=1, name="Test Course", credits=3)
        repr_str = repr(course)
        assert "Course" in repr_str
        assert "Test Course" in repr_str


class TestCourseEquality:
    """Test suite for course equality comparison."""

    def test_courses_equal_by_id(self):
        """Test that courses with same id are equal."""
        course1 = Course(id=1, name="Course A", credits=3)
        course2 = Course(id=1, name="Course B", credits=4)
        assert course1 == course2

    def test_courses_not_equal_different_id(self):
        """Test that courses with different ids are not equal."""
        course1 = Course(id=1, name="Course A", credits=3)
        course2 = Course(id=2, name="Course A", credits=3)
        assert course1 != course2

    def test_course_not_equal_to_non_course(self):
        """Test that course is not equal to non-course objects."""
        course = Course(id=1, name="Test Course", credits=3)
        assert course != "not a course"
        assert course != 1
        assert course != None
        assert course != {"id": 1}
