<template>
  <div class="server">
    <header
      class="server__header"
      :class="{
        'server__header--clickable': server.sshConnectionInfo
      }"
      @click="openTerminal"
    >
      <span class="server__title">{{ server.name }}</span>
      <TerminalSvg
        v-if="server.sshConnectionInfo"
        class="bash"
      />
      <div
        v-if="server.sshConnectionInfo"
        class="server__hotkey"
      >
        {{ platformHotkey }}
      </div>
    </header>
    <Service
      v-for="(service, index) in server.services"
      :key="index"
      :type="service.type"
      :projects="service.payload"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { remote } from 'electron';
import TerminalSvg from '../assets/terminal.svg';
import openSession from '../utils/session';
import Service from '@/components/Service.vue';
import { Server } from '@/types';

export default defineComponent({
  name: 'Server',
  components: {
    Service,
    TerminalSvg,
  },
  props: {
    /**
     * Information about server
     */
    server: {
      type: Object as PropType<Server>,
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
      if (!this.server.sshConnectionInfo) {
        return;
      }
      let command = `ssh ${this.server.sshConnectionInfo.username}@${this.server.sshConnectionInfo.ip}`;

      if (this.server.sshConnectionInfo.port) {
        command += ` -p ${this.server.sshConnectionInfo.port}`;
      }

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
    cursor: default;

    &--clickable {
      cursor: pointer;
    }
  }

  &__hotkey {
    margin-left: auto;
    letter-spacing: 0.35px;
    color: color-mod(var(--color-text-second) alpha(30%));
  }
}

.bash {
  margin-left: 8px;
}

</style>
