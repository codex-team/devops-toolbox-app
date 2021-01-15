import { ResponseMessage } from 'ctproto';
import { Workspace } from '@/types';

/**
 * This data will be saved (and returned to client)
 * after successful authorization
 */
export interface DevopsToolboxAuthData {
  /**
   * Owned workspaces ids
   */
  workspaces: Workspace[];
}

/**
 * Describes the response of the getting user workspaces request
 */
export default interface AuthorizeResponse extends ResponseMessage<DevopsToolboxAuthData> {
}
