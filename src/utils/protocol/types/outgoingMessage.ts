import RequestMessage from './requestMessage';

/**
 * Message that initiated by the client
 */
interface OutgoingMessage extends RequestMessage {
  /**
   * Type of request
   */
  type: string;
}

export default OutgoingMessage;
