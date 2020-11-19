<template>
  <header class="header">
    <img
      class="header-image"
      :src="image"
      :alt="name"
    >
    {{ name }}
    <div class="status">
      <span class="status-count">2</span>
      <div class="status-point" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WorkspaceHeader',
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: '',
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
  color: #ffffff;
}

.header-image {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  border-radius: 8px;
}

.status {
  display: flex;
  align-items: center;
  padding: 1px 5px;
  border-radius: 6px;
  box-shadow: 0 0 0 3px rgba(247, 79, 79, 0.2);
  background-color: #f74f4f;
  margin-left: auto;
}

.status-count {
  font-size: 12px;
  margin-right: 3px;
}

.status-point {
  width: 4px;
  height: 4px;
  background-color: #ffffff;
  border-radius: 2px;
}

</style>
