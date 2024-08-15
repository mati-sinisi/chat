import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';

@WebSocketGateway()
// Implement OnModuleInit to be able to use it in the constructor
export class ChatGateway implements OnModuleInit {
  // Con este decorador, le paso a server toda la informacion del servidor, clientes conectados...
  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatService) {}
  onModuleInit() {
    // Esta funcionalidad es como un hook
    // socket es el cliente conectado
    this.server.on('connection', (socket) => {
      const { name, token } = socket.handshake.auth;

      if (!name) {
        socket.disconnect();
        return;
      }

      // Agregar cliente al listado
      this.chatService.onClientConnected({
        id: socket.id,
        name
      });

      // Mensaje de bievenida
      socket.emit('welcome-message', {
        message: `Hola ${name}, bienvenido al chat`
      });

      // Listado de clientes conectados
      this.server.emit('on-clients-changed', this.chatService.getClients());

      socket.on('disconnect', () => {
        this.server.emit('on-clients-changed', this.chatService.getClients());
        this.chatService.onClientDisconnected(socket.id);
      });
    });
  }

  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket
  ) {
    const { name, token } = client.handshake.auth;

    if (!message) {
      return;
    }

    this.server.emit('on-message', {
      userId: client.id,
      message,
      name
    });
  }
}
