import { NewMessage } from 'ctproto';

export interface GetWorkspacesMessagePayload {
  /**
   * JWT Token
   */
  token: string;
}

/**
 * Describes the request for get workspaces
 */
export default interface GetWorkspacesMessage extends NewMessage<GetWorkspacesMessagePayload> {
  type: 'get-workspaces';
}
