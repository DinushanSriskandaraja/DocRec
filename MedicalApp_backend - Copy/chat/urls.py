from django.urls import path
from .views import ChatStartAPIView, ChatAnswerAPIView

urlpatterns = [
    path('chat', ChatStartAPIView.as_view(), name='chat_start'),
    path('chat/answer', ChatAnswerAPIView.as_view(), name='chat_answer'),
]
