import random
import time
from datetime import datetime

import schedule
import slack

from app import models
from project.settings import SLACK_TOKEN

client = slack.WebClient(token=SLACK_TOKEN)


def publishMessage(channel_id):
    client.chat_postMessage(
        channel=channel_id,
        text="Please update your availability",
        blocks=[
            {
                "dispatch_action": True,
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "plain_text_input-action",
                },
                "label": {
                    "type": "plain_text",
                    "text": "Hi, on which task you are working?",
                    "emoji": True,
                },
            },
        ],
    )


def sendMessage():
    idsToSendMessagesTo = []

    org_ids = models.OrganizationModule.objects.filter(
        module__slug=models.Module.ModuleType.AVAILABILITY_MESSAGES
    ).values_list("organization_id", flat=True)
    employees = models.Employee.objects.filter(organization_id__in=org_ids)

    for emp in employees:
        if (
            emp.availability_start_time
            and emp.availability_end_time
            and datetime.now().time() >= emp.availability_start_time
            and datetime.now().time() <= emp.availability_end_time
        ):
            if emp.slack_id is None:
                data = client.users_lookupByEmail(email=emp.user.email)
                emp.slack_id = data.get("user").get("id")
                emp.save()
            idsToSendMessagesTo.append(emp.slack_id)

    timestamps = []
    for id in idsToSendMessagesTo:
        timestamps.append(random.randint(1, 60))
    count = 0
    while count <= 60:
        if count in timestamps:
            publishMessage(idsToSendMessagesTo[timestamps.index(count)])
            count += 1
        else:
            count += 1
        time.sleep(60)


def run():
    schedule.every(0).hours.do(sendMessage)

    while True:
        try:
            schedule.run_pending()
            time.sleep(1)
        except Exception as e:
            print(e)
