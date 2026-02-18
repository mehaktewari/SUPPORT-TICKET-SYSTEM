from django.db.models import Count, Avg
from django.db.models.functions import TruncDay
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .llm import classify_ticket

@api_view(['POST'])
def classify_ticket_view(request):
    description = request.data.get("description", "")
    result = classify_ticket(description)

    return Response({
        "suggested_category": result["category"],
        "suggested_priority": result["priority"]
    })

@api_view(['GET'])
def ticket_stats(request):
    total = Ticket.objects.count()
    open_tickets = Ticket.objects.filter(status='open').count()

    avg = (
        Ticket.objects
        .annotate(day=TruncDay('created_at'))
        .values('day')
        .annotate(c=Count('id'))
        .aggregate(avg=Avg('c'))['avg'] or 0
    )

    return Response({
        "total_tickets": total,
        "open_tickets": open_tickets,
        "avg_tickets_per_day": round(avg, 2),
        "priority_breakdown": dict(
            Ticket.objects.values_list('priority').annotate(c=Count('id'))
        ),
        "category_breakdown": dict(
            Ticket.objects.values_list('category').annotate(c=Count('id'))
        )
    })
