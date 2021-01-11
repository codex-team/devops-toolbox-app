import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  interface State {
    isAuth: boolean,
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
