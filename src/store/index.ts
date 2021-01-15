import { createStore } from 'vuex';
import { Workspace } from '@/types';

export default createStore({
  state: {
    workspaces: new Array<Workspace>(),
  },
  mutations: {
    workspacesUpdate(state, workspaces: Workspace[]) {
      state.workspaces = workspaces;
    },
    workspaceUpdate(state, workspace: Workspace) {
      const index = state.workspaces.findIndex(w => workspace.name === w.name);

      state.workspaces[index] = workspace;
    },
  },
});
