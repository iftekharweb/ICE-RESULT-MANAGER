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
    
    def validate(self, data):
        if FormFillUpInformation.objects.filter(
            form_id=data['form_id'],
            student=data['student'],
            section=data['section']
        ).exists():
            raise serializers.ValidationError({
                'detail': "This combination of form, student, and section already exists."
            })
        return data

