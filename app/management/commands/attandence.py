from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db import models as dj_models
from django.db import transaction
from django.utils.timezone import now

from app import models
from app.utils import email_weekly_attandence


class Command(BaseCommand):
    @transaction.atomic
    def handle(self, *args, **options):
        employee = models.Employee.objects.all()
        last_monday = now().date() - timedelta(days=now().weekday(), weeks=1)
        last_friday = last_monday + timedelta(days=4)
        for i in employee:
            attendance = (
                models.Attendance.objects.filter(
                    employee=i, created_at__date__range=[last_monday, last_friday]
                )
                .values(
                    "employee",
                )
                .annotate(
                    time_in=dj_models.F("time_in"),
                    time_out=dj_models.F("time_out"),
                    total_time=dj_models.ExpressionWrapper(
                        dj_models.F("time_out") - dj_models.F("time_in"),
                        output_field=dj_models.fields.DurationField(),
                    ),
                )
            )
            total_working_hours = attendance.aggregate(
                total_time=dj_models.Sum(
                    dj_models.F("time_out") - dj_models.F("time_in")
                )
            )["total_time"]
            current_month_Leave = models.Leave.objects.filter(
                employee=i, created_at__month=now().month
            ).count()
            email_weekly_attandence(
                total_working_hours, current_month_Leave, attendance, i
            )

        self.stdout.write(
            self.style.SUCCESS("Weekly Attandence of employee email Successfully.")
        )
