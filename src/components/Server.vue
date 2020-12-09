<template>
  <div class="server">
    <header class="server__header">
      <span class="server__title">{{ name }}</span>
      <svg
        class="bash"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          fill-rule="evenodd"
        >
          <path
            d="M6.41 0h3.18c2.23 0 3.037.232 3.852.668a4.543 4.543 0 011.89 1.89c.436.815.668 1.623.668 3.852v3.18c0 2.23-.232 3.037-.668 3.852a4.543 4.543 0 01-1.89 1.89c-.815.436-1.623.668-3.852.668H6.41c-2.23 0-3.037-.232-3.852-.668a4.543 4.543 0 01-1.89-1.89C.232 12.627 0 11.82 0 9.59V6.41c0-2.23.232-3.037.668-3.852a4.543 4.543 0 011.89-1.89C3.373.232 4.18 0 6.41 0z"
            fill="#000"
          />
          <path
            d="M3.73 9.15c.213 0 .417-.07.61-.21l1.92-1.41a.794.794 0 00.355-.685.873.873 0 00-.365-.705L4.39 4.72a1.177 1.177 0 00-.345-.18.753.753 0 00-.405-.01.644.644 0 00-.37.24c-.16.227-.215.438-.165.635.05.197.175.368.375.515l1.34.98-1.18.85c-.5.36-.637.727-.41 1.1.12.2.287.3.5.3zm4.78.85c.293 0 .525-.088.695-.265a.934.934 0 00.255-.675.956.956 0 00-.255-.675c-.17-.183-.402-.275-.695-.275-.3 0-.533.092-.7.275a.967.967 0 00-.25.675c0 .273.083.498.25.675.167.177.4.265.7.265z"
            fill="#FFF"
            fill-rule="nonzero"
          />
        </g>
      </svg>
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

  &__title:hover {
     text-shadow: 0 0 2px var(--color-text-shadow-header);
   }

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
  color: #ffffff;
}

</style>
