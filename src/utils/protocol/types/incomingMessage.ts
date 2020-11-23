import { Message } from './message';

/**
 * Message that API sent
 */
interface IncomingMessage extends Message {
  /**
   * Message id which we use to send response with this id
   */
  messageId: string;
  /**
   * Type of message
   */
  type: string;
}

export default IncomingMessage;
