<template>
  <div
    class="project"
    :style="{ color: (status ? '#cadafb' : '#f74f4f') }"
  >
    {{ name }}
    <div
      class="project-status"
      :class="'project-status-'+(status ? 'green' : 'red')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Project',
  props: {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style>

.project {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 500;
  color: #cadafb;
}

.project-status {
  width: 4px;
  height: 4px;
  margin-left: 5px;
  background-color: #ffffff;
  border-radius: 2px;
}

.project-status-red {
  background-color: #f74f4f;
  box-shadow: 0 0 4px 2px rgba(247, 79, 79, 0.2);
}

.project-status-green {
  background-color: #08ff84;
}

</style>
