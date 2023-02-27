from channels.exceptions import StopConsumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class NotificationsConsumer(AsyncJsonWebsocketConsumer):
    groups = ["notification"]

    async def connect(self):
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        print("Message recieved from client...", text_data)

    async def push(self, event):
        await self.send_json(content={"notifications": event["message"]})
