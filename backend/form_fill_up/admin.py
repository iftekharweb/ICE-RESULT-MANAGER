from django.contrib import admin
from .models import FormFillUp, FormFillUpInformation

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

@admin.register(FormFillUpInformation)
class FormFillUpInformationAdmin(admin.ModelAdmin):
    list_display = ('form_id', 'student', 'section', 'is_allowed', 'is_formed', 'is_added')
    list_filter = ('is_allowed', 'is_formed', 'is_added', 'form_id', 'section')
    search_fields = ('student__name', 'section__name', 'form_id__semester__name')

    fieldsets = (
        (None, {
            'fields': ('form_id', 'student', 'section')
        }),
        ('Status', {
            'fields': ('is_allowed', 'is_formed', 'is_added'),
        }),
    )

    readonly_fields = ('is_allowed', 'is_formed', 'is_added')
    autocomplete_fields = ['student', 'section', 'form_id']


