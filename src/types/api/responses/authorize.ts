import { ResponseMessage } from 'ctproto';

/**
 * This data will be saved (and returned to client)
 * after successful authorization
 */
export interface DevopsToolboxAuthData {
  /**
   * Owned workspaces ids
   */
  workspaceIds: string[];
}

/**
 * Describes the response of the getting user workspaces request
 */
export default interface AuthorizeResponse extends ResponseMessage<DevopsToolboxAuthData> {
}
