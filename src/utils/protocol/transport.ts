import Config from '../../config';
import { v4 } from 'uuid';
import { OutgoingMessage, MessagePayload, IncomingMessage } from '../protocol/types';

export default class Transport {
  private messageIds: string[] = [];
  private socket: WebSocket = new WebSocket(Config.url);

  constructor() {
    this.socket.onmessage = this.onmessage;
  }

  public async send(type: string, payload: MessagePayload): Promise<void> {
    const messageId = v4();

    this.messageIds.push(messageId);

    const message: OutgoingMessage = {
      messageId,
      type,
      payload,
    };

    this.socket.send(JSON.stringify(message));
  }

  private onmessage(event: MessageEvent): void {
    const incomingMessage: IncomingMessage = JSON.parse(event.data.toString());

    console.log(incomingMessage);
  }
}
