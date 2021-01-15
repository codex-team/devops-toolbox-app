import { Store } from 'vuex';
import { Workspace } from '@/types';

declare module '@vue/runtime-core' {
  interface State {
    workspaces: Workspace[],
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
