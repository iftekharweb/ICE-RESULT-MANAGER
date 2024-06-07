from django.db import models
from django.utils import timezone
from semesters.models import Semester 

class FormFillUp(models.Model):
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Form Fill Up for {self.semester} from {self.start_time} to {self.end_time}"

    def save(self, *args, **kwargs):
        if self.end_time <= timezone.now():
            raise ValueError("End time must be in the future.")
        super().save(*args, **kwargs)

    def is_expired(self):
        return timezone.now() > self.end_time

    def delete_if_expired(self):
        if self.is_expired():
            self.delete()

