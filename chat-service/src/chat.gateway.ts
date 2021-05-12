import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(): void {
    this.logger.log('Chat gateway initialized');
  }

  @SubscribeMessage('newMessage')
  handleMessage(client: Socket, message: string): void {
    this.server.emit('message', message, client.id);
  }
}
