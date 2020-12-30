import { Workspace } from '../../index';
import { NewMessage } from 'ctproto';

/**
 * Data about the updated workspace
 */
interface WorkspaceUpdatedPayload {
  /**
   * The updated workspace
   */
  workspace: Workspace;
}

/**
 * Describes the outgoing message that will be sent when some workspace is updated
 */
export default interface WorkspaceUpdatedMessage extends NewMessage<WorkspaceUpdatedPayload> {
  type: 'workspace-updated';
}
