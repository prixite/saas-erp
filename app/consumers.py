import json

from channels.db import database_sync_to_async
from channels.exceptions import StopConsumer
from channels.generic.websocket import AsyncWebsocketConsumer

from app import models


class MyAsyncWebSocketConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("Web socket connected")
        print("Channel layer ", self.channel_layer)
        print("Channel name", self.channel_name)
        await self.accept()
        user = await database_sync_to_async(models.User.objects.get)(
            email=self.scope["user"].username
        )
        self.group_name = user.first_name
        print(self.group_name)
        await self.channel_layer.group_add(self.group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        print("Message recieved from client...", text_data)

    async def notification_send(self, event):
        print(event)
        await self.send(text_data=json.dumps({"msg": event["message"]}))

    async def disconnect(self, close_code):
        print("Web socket disconnect")
        await self.channel_layer.group_discard(self.group_name, self.channel_name)
        raise StopConsumer()
