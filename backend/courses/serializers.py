from rest_framework import serializers
from academy.serializers import DepartmentSerializer
from semesters.serializers import SemesterSerializer
from .models import Course, Section

class CourseSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    semester = SemesterSerializer()
    sections = serializers.PrimaryKeyRelatedField(many=True, read_only=True, source='section_set')

    class Meta:
        model = Course
        fields = ['code', 'title', 'department', 'semester', 'type', 'credit', 'sections']

class SectionSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Section
        fields = ['id', 'course', 'section']