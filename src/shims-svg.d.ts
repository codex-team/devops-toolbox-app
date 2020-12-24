/**
 * Tell the TypeScript compiler (and the IDE) how to handle .svg files
 */
declare module '*.svg' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
