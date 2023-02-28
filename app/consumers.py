from channels.db import database_sync_to_async
from channels.exceptions import StopConsumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from app import models


class NotificationsConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        user = await database_sync_to_async(models.User.objects.get)(
            email=self.scope["user"].email
        )
        self.group_name = f"{user.id}"
        await self.channel_layer.group_add(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        print("Message recieved from client...", text_data)

    async def push(self, event):
        await self.send_json(content={"notifications": event["message"]})

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        raise StopConsumer()
