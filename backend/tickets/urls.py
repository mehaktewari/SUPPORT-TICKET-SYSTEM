from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, ticket_stats, classify_ticket_view

router = DefaultRouter()
router.register('tickets', TicketViewSet)

urlpatterns = router.urls + [
    path('tickets/stats/', ticket_stats),
    path('tickets/classify/', classify_ticket_view),
]
