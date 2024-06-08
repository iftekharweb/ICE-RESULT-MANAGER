from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ValidationError
from .models import FormFillUp, FormFillUpInformation
from .serializers import FormFillUpSerializer, FormFillUpInformationSerializer
from .renderers import CustomErrorRenderer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action

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

    # Define allowed methods explicitly
    http_method_names = ['get', 'patch', 'post']

    