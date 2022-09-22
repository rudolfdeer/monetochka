import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from './user.service';

type ShareExpensesPayload = {
  userId: string;
  email: string;
  sum: number;
};

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly userService: UserService) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('initialized', server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('connected');
    const userId = client.handshake.query.userId as string;
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected');
  }

  @SubscribeMessage('user:put')
  async handleEvent(
    @MessageBody()
    payload: ShareExpensesPayload,
  ): Promise<void> {
    const { userId, email, sum } = payload;
    const user = await this.userService.shareExpenses(userId, email, sum);
    this.server.emit('user:put', user);
  }
}
