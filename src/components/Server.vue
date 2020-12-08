<template>
  <div class="server">
    <header class="server__header">
      {{ name }}
      <TerminalSvg
        class="bash"
        @click="openTerminal"
      />
      <div class="server__hotkey">
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
import TerminalSvg from '../assets/terminal.svg';
import openSession from './../../actions/session';

export default defineComponent({
  name: 'Server',
  components: {
    Project,
    TerminalSvg,
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
  /**
   * Methods for processing activities
   */
  methods: {
    /**
     * Function for open terminal with custom command
     */
    openTerminal(): void {
      const command = 'ssh root@stage.hawk.so';

      openSession(command);
    },
  },
});
</script>

<style>

.server {
  margin-bottom: 14px;

  &__header {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: var(--color-text-header);
    margin-bottom: 10px;
  }

  &__hotkey {
    margin-left: auto;
    letter-spacing: 0.35px;
    color: var(--color-text-second);
  }
}

.bash {
  margin-left: 8px;

  &:hover {
    cursor: pointer;
  }
}

</style>
