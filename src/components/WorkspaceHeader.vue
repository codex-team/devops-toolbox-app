<template>
  <header class="header">
    <img
      class="header__image"
      :src="image"
      :alt="name"
    >
    {{ name }}
    {{ isAuth }}
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WorkspaceHeader',
  props: {
    /**
     * Workspace name
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Workspace image
     */
    image: {
      type: String,
      required: false,
      default: '',
    },
    isAuth: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style>

.header {
  display: flex;
  padding: 10px 0;
  margin-bottom: 11px;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: var(--color-text-main);

  &__image {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border-radius: 8px;
  }
}

</style>
