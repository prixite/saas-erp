import json

from asgiref.sync import async_to_sync
from channels.consumer import SyncConsumer
from channels.exceptions import StopConsumer

from app import models


class MySyncConsumer(SyncConsumer):
    def websocket_connect(self, event):
        print("Web socket connected", event)
        print("Channel layer ", self.channel_layer)
        print("Channel name", self.channel_name)
        self.send({"type": "websocket.accept"})
        group_name = models.User.objects.get(
            email=self.scope["user"].username
        ).first_name
        print(group_name)
        async_to_sync(self.channel_layer.group_add)(group_name, self.channel_name)

    def websocket_receive(self, event):
        print("Web socket recieved", event["text"])
        print(event["text"])
        data = json.loads(event["text"])
        user = data["user"]
        message = data["notification"]
        user_obj = models.User.objects.get(username=user)
        notification = models.Notification(user=user_obj, message=message)
        notification.save()
        async_to_sync(self.channel_layer.group_send)(
            user, {"type": "notification.send", "message": event["text"]}
        )

    # event handler, which is sending data to client
    def notification_send(self, event):
        print("Event...", event)
        print(event["message"])
        self.send({"type": "websocket.send", "text": event["message"]})

    def websocket_disconnect(self, event):
        print("Web socket disconnect", event)
        async_to_sync(self.channel_layer.group_discard)(
            "notification", self.channel_name
        )
        raise StopConsumer()
