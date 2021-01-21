<template>
  <div class="server">
    <header
      class="server__header"
      @click="openTerminal"
    >
      <span class="server__title">{{ name }}</span>
      <TerminalSvg class="bash" />
      <div class="server__hotkey">
        {{ platformHotkey }}
      </div>
    </header>
    <Service
      v-for="(service, index) in services"
      :key="index"
      :type="service.type"
      :projects="service.payload"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { remote } from 'electron';
import TerminalSvg from '../assets/terminal.svg';
import openSession from '../utils/session';
import Service from '@/components/Service.vue';

export default defineComponent({
  name: 'Server',
  components: {
    Service,
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
    services: {
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

  &__title:hover {
    text-shadow: 0 0 2px color-mod(var(--color-text-main) alpha(30%));
  }

  &__header {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: var(--color-text-main);
    margin-bottom: 10px;
    cursor: pointer;
  }

  &__hotkey {
    margin-left: auto;
    letter-spacing: 0.35px;
    color: var(--color-text-second);
  }
}

.bash {
  margin-left: 8px;
}

</style>
