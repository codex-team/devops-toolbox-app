<template>
  <div class="server">
    <header class="server-header">
      {{ name }}
      <div class="bash">
        >.
      </div>
      <div class="server-hotkey">
        {{ platformHotkey }}
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
import { remote } from 'electron';
import Project from './Project.vue';

export default defineComponent({
  name: 'Server',
  components: {
    Project,
  },
  props: {
    /**
     * Server name
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Server`s project name
     */
    projects: {
      type: Array,
      required: true,
    },
    /**
     * Server`s hotkey
     */
    hotkey: {
      type: Number,
      required: true,
    },
  },
  computed: {
    /**
     * Server`s hotkey depended on platform
     *
     * @returns {string}
     */
    platformHotkey(): string {
      return (remote.process.platform === 'darwin' ? '⌘' : 'Ctrl+') + this.hotkey;
    },
  },
});
</script>

<style>

.server {
  margin-bottom: 14px;

  &-header {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: var(--color-text-header);
    margin-bottom: 10px;
  }

  &-hotkey {
    margin-left: auto;
    letter-spacing: 0.35px;
    color: var(--color-text-second);
  }
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

</style>