from django.contrib import admin
from .models import FormFillUp

@admin.register(FormFillUp)
class FormFillUpAdmin(admin.ModelAdmin):
    list_display = ('semester', 'start_time', 'end_time', 'is_expired')
    list_filter = ('semester', 'start_time', 'end_time')
    search_fields = ('semester__name',)
    ordering = ('start_time',)

    def is_expired(self, obj):
        return obj.is_expired()
    is_expired.boolean = True
    is_expired.short_description = 'Expired'
