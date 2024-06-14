from django.contrib import admin
from .models import FormFillUp, FormFillUpInformation

@admin.register(FormFillUp)
class FormFillUpAdmin(admin.ModelAdmin):
    list_display = ('semester', 'start_time', 'end_time', 'is_expired', 'can_mark')
    list_filter = ('semester', 'start_time', 'end_time')
    search_fields = ('semester__name',)
    ordering = ('start_time',)

    def is_expired(self, obj):
        return obj.is_expired()
    is_expired.boolean = True
    is_expired.short_description = 'Expired'

    def can_mark(self, obj):
        return obj.can_mark()
    can_mark.boolean = True
    can_mark.short_description = 'Can Teachers Mark'

@admin.register(FormFillUpInformation)
class FormFillUpInformationAdmin(admin.ModelAdmin):
    list_display = ('form_id', 'student', 'section', 'is_allowed', 'is_formed', 'is_added','is_marks_added')
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


