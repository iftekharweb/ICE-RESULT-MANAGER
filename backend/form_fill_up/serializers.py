from rest_framework import serializers
from .models import FormFillUp,FormFillUpInformation

class FormFillUpSerializer(serializers.ModelSerializer):
    is_expired = serializers.SerializerMethodField()

    class Meta:
        model = FormFillUp
        fields = ['id', 'semester','title', 'start_time', 'end_time', 'description', 'is_expired']

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

