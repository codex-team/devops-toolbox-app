import { NewMessage } from 'ctproto';

/**
 * 'get-workspaces' request payload
 */
export interface GetWorkspacesMessagePayload {
  /**
   * There are no fields here because when authorizing API remembers the token
   */
}

/**
 * Describes the request for get workspaces
 */
export default interface GetWorkspacesMessage extends NewMessage<GetWorkspacesMessagePayload> {
  type: 'get-workspaces';
}
