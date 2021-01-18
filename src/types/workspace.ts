import Server from './server';

/**
 * Interface for workspace
 */
export default interface Workspace {
  /**
   * Workspace id
   */
  _id: string;

  /**
   * Workspace name
   */
  name: string;

  /**
   * User personal token to identify the owner of the workspace
   */
  authToken: string;

  /**
   * Workspace servers
   */
  servers: Server[];
}
