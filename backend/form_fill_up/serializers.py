from rest_framework import serializers
from .models import FormFillUp,FormFillUpInformation

class FormFillUpSerializer(serializers.ModelSerializer):
    is_expired = serializers.SerializerMethodField()

    class Meta:
        model = FormFillUp
        fields = ['id', 'semester','title', 'start_time', 'end_time', 'description', 'is_expired', 'can_mark']

    def get_is_expired(self, obj):
        return obj.is_expired()

class FormFillUpInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormFillUpInformation
        fields = '__all__'
    
    def create(self, validated_data):
        form_id = validated_data.get('form_id')
        student = validated_data.get('student')
        section = validated_data.get('section')
        if FormFillUpInformation.objects.filter(
            form_id=form_id,
            student=student,
            section=section
        ).exists():
            raise serializers.ValidationError({
                'detail': "This combination of form, student, and section already exists."
            })
        return super().create(validated_data)
    

class CourseResultSerializer(serializers.ModelSerializer):
    course_code = serializers.CharField(source='section.course.code')
    course_title = serializers.CharField(source='section.course.title')
    final_marks = serializers.DecimalField(max_digits=10, decimal_places=2)
    ct_marks = serializers.DecimalField(max_digits=10, decimal_places=2)
    attend_marks = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_marks = serializers.SerializerMethodField()

    class Meta:
        model = FormFillUpInformation
        fields = ['course_code', 'course_title', 'final_marks', 'ct_marks', 'attend_marks', 'total_marks']

    def get_total_marks(self, obj):
        return obj.final_marks + obj.ct_marks + obj.attend_marks


