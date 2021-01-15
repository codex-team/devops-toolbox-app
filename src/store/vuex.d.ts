import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { Workspace } from '@/types';

declare module '@vue/runtime-core' {
  interface State {
    isAuth: boolean,
    workspaces: Workspace[],
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
