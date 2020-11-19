<template>
  <div class="server">
    <header class="server-header">
      {{ name }}
      <div class="bash">
        >.
      </div>
      <div class="server-hotkey">
        ⌘{{ hotkey }}
      </div>
    </header>
    <Project
      v-for="project in projects"
      :key="project.name"
      :name="project.name"
      :status="project.status"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Project from './Project.vue';

export default defineComponent({
  name: 'Server',
  components: {
    Project,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
    },
    hotkey: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style>

.server {
  margin-bottom: 14px;
}

.server-header {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
}

.bash {
  width: 16px;
  height: 16px;
  padding: 2px 6px 4px 2px;
  margin-left: 8px;
  background-color: black;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: -0.3px;
  color: #ffffff;
}

.server-hotkey {
  margin-left: auto;
  letter-spacing: 0.35px;
  color: #cadafb;
}
</style>
