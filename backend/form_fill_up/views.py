from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ValidationError
from .models import FormFillUp, FormFillUpInformation
from .serializers import FormFillUpSerializer, FormFillUpInformationSerializer
from .renderers import CustomErrorRenderer

class FormFillUpViewSet(viewsets.ModelViewSet):
    queryset = FormFillUp.objects.all()
    serializer_class = FormFillUpSerializer
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        """Override destroy to delete only if expired."""
        if instance.is_expired():
            instance.delete()
        else:
            raise ValidationError("Cannot delete as the end time has not expired.")


class FormFillUpInformationViewSet(viewsets.ModelViewSet):
    queryset = FormFillUpInformation.objects.all()
    serializer_class = FormFillUpInformationSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = [CustomErrorRenderer]