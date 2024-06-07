from rest_framework import serializers
from .models import FormFillUp

class FormFillUpSerializer(serializers.ModelSerializer):
    is_expired = serializers.SerializerMethodField()

    class Meta:
        model = FormFillUp
        fields = ['id', 'semester','title', 'start_time', 'end_time', 'description', 'is_expired']

    def get_is_expired(self, obj):
        return obj.is_expired()
