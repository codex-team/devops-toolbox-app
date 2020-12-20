/**
 * Tell the TypeScript compiler (and the IDE) how to handle .svg files
 */
declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
