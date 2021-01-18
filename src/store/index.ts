import { createStore } from 'vuex';
import { Workspace } from '@/types';

export default createStore({
  state: {
    workspaces: new Array<Workspace>(),
  },
  mutations: {
    /**
     * Update workspace list
     *
     * @param state - storage state
     * @param workspaces - actual user workspaces
     */
    workspacesUpdate(state, workspaces: Workspace[]) {
      state.workspaces = workspaces;
    },
    /**
     * Workspace update
     *
     * @param state - storage state
     * @param workspace - updated workspace
     */
    workspaceUpdate(state, workspace: Workspace) {
      const index = state.workspaces.findIndex(w => workspace._id === w._id);

      state.workspaces[index] = workspace;
    },
  },
});
