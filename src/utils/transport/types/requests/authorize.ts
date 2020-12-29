import type { NewMessage } from 'ctproto';

export interface AuthorizeMessagePayload {
  /**
   * JWT Token
   */
  token: string;
}

/**
 * Describes the request for authorize
 */
export default interface AuthorizeMessage extends NewMessage<AuthorizeMessagePayload> {
  type: 'authorize';
}
