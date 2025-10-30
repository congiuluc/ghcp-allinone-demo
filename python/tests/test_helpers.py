"""
Unit tests for helper utility functions.
Tests validation functions and decorators.
"""

import pytest
from utils.helpers import validate_email, validate_gpa


class TestValidateEmail:
    """Test suite for email validation function."""

    def test_valid_email_formats(self):
        """Test that valid email formats are accepted."""
        valid_emails = [
            'user@example.com',
            'test.user@domain.com',
            'first.last@example.co.uk',
            'user+tag@example.com',
            'user123@test-domain.com',
            'a@b.co'
        ]
        for email in valid_emails:
            assert validate_email(email) is True, f"Failed for valid email: {email}"

    def test_invalid_email_formats(self):
        """Test that invalid email formats are rejected."""
        invalid_emails = [
            'notanemail',
            '@example.com',
            'user@',
            'user@.com',
            'user@domain',
            'user @domain.com',
            'user@domain .com',
            '',
            'user@@domain.com'
        ]
        for email in invalid_emails:
            assert validate_email(email) is False, f"Failed for invalid email: {email}"

    def test_email_with_special_characters(self):
        """Test emails with allowed special characters."""
        assert validate_email('user_name@example.com') is True
        assert validate_email('user-name@example.com') is True
        assert validate_email('user.name@example.com') is True


class TestValidateGpa:
    """Test suite for GPA validation function."""

    def test_valid_gpa_values(self):
        """Test that valid GPA values are accepted."""
        valid_gpas = [0.0, 1.5, 2.0, 3.5, 4.0, 2.75, 3.25]
        for gpa in valid_gpas:
            assert validate_gpa(gpa) is True, f"Failed for valid GPA: {gpa}"

    def test_invalid_gpa_values(self):
        """Test that invalid GPA values are rejected."""
        invalid_gpas = [-0.1, -1.0, 4.1, 5.0, 10.0]
        for gpa in invalid_gpas:
            assert validate_gpa(gpa) is False, f"Failed for invalid GPA: {gpa}"

    def test_gpa_boundary_values(self):
        """Test GPA boundary values."""
        assert validate_gpa(0.0) is True  # Lower boundary
        assert validate_gpa(4.0) is True  # Upper boundary
        assert validate_gpa(-0.01) is False  # Just below lower boundary
        assert validate_gpa(4.01) is False  # Just above upper boundary

    def test_gpa_string_conversion(self):
        """Test that string GPA values are properly converted."""
        assert validate_gpa('3.5') is True
        assert validate_gpa('0.0') is True
        assert validate_gpa('4.0') is True

    def test_gpa_invalid_types(self):
        """Test that invalid types are handled correctly."""
        assert validate_gpa('not a number') is False
        assert validate_gpa(None) is False
        assert validate_gpa('') is False
        assert validate_gpa([]) is False
        assert validate_gpa({}) is False

    def test_gpa_integer_values(self):
        """Test that integer GPA values work correctly."""
        assert validate_gpa(0) is True
        assert validate_gpa(1) is True
        assert validate_gpa(4) is True
        assert validate_gpa(5) is False
