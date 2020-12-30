import { AuthorizeMessage, GetWorkspacesMessage, AuthorizeMessagePayload } from './requests';
import { AuthorizeResponse, GetWorkspacesResponse, DevopsToolboxAuthData } from './responses';
import { WorkspaceUpdated } from './messageUpdate';

/**
 * The type described all available API response messages
 */
export type ApiResponse =
  | AuthorizeResponse
  | GetWorkspacesResponse;

/**
 * The type described all available API request messages
 */
export type ApiRequest =
  | AuthorizeMessage
  | GetWorkspacesMessage;

/**
 * The type described all available outgoing messages that can be sent by API
 */
export type ApiUpdate =
  | WorkspaceUpdated;

export {
  /**
   * Authorize message payload
   */
  AuthorizeMessagePayload,

  /**
   * Authorize response message payload
   */
  DevopsToolboxAuthData
};
