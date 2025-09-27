from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings
import uuid

class ChatSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    current_step = models.IntegerField(default=0)
    metadata = models.JSONField(null=True, blank=True)  # store only minimal answers
    created_at = models.DateTimeField(auto_now_add=True)
