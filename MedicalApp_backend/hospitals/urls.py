from rest_framework.routers import DefaultRouter
from .views import HospitalViewSet, DocHospViewSet

router = DefaultRouter()
router.register(r'hospitals', HospitalViewSet, basename='hospital')
router.register(r'dochosp', DocHospViewSet, basename='dochosp')
urlpatterns = router.urls
