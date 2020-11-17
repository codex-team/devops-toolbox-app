import WebSocket from 'ws';
import Config from '../config';
import Request from '../types/request';
import Response from '../types/respose';

export default class Connection {
  public socket: WebSocket = new WebSocket(Config.url);
  private messageIds: string[] = [];

  constructor() {
    this.socket.on('message', async (data: string) => {
      const dataObj: Response = JSON.parse(data.toString());

      let result;

      switch (dataObj.type) {
        case 'getWorkspaces':
          break;
      }
    });
  }

  public async send(req: Request): Promise<void> {
    this.messageIds.push(req.messageId!);
    await this.socket.send(req);
  }
}

// + Авторизацию
