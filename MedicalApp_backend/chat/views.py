from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ChatSession
from django.conf import settings
import httpx

TOTAL_STEPS = 10

def call_chatgpt(prompt):
    headers = {"Authorization": f"Bearer {settings.CHATGPT_API_KEY}"}
    payload = {"model":"gpt-4o-mini","messages":[{"role":"user","content":prompt}]}
    r = httpx.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
    return r.json()["choices"][0]["message"]["content"]

class ChatStartAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        symptoms = request.data.get('symptoms')
        session = ChatSession.objects.create(user=request.user, current_step=1, metadata={})
        prompt = f"Patient symptoms: {symptoms}\nAsk the first follow up question."
        question = call_chatgpt(prompt)
        return Response({"question": question, "step": 1, "totalSteps": TOTAL_STEPS, "sessionId": str(session.id)})

class ChatAnswerAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        session_id = request.data.get('sessionId')
        step = int(request.data.get('step'))
        answer = request.data.get('answer')
        session = ChatSession.objects.get(id=session_id)
        session.metadata = session.metadata or {}
        session.metadata[f"q_{step}"] = answer
        session.current_step = step + 1
        session.save()
        if step >= TOTAL_STEPS:
            prompt = f"Based on the answers: {session.metadata}, suggest possible conditions and doctors."
            result = call_chatgpt(prompt)
            return Response({"prediction": result})
        else:
            prompt = f"Previous answers: {session.metadata}. Ask next follow-up question."
            question = call_chatgpt(prompt)
            return Response({"nextQuestion": question, "step": session.current_step, "totalSteps": TOTAL_STEPS})
