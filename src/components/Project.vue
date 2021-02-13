<template>
  <div
    class="project"
    :class="{
      'project--status-ok': status === true,
      'project--status-warning': status === false,
      'project--clickable': name,
    }"
    @click.native="openProject"
  >
    {{ name || 'Unnamed host' }}
    <div
      v-if="status !== undefined"
      class="project__status"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import openUrl from '../utils/openUrl';

export default defineComponent({
  name: 'Project',
  props: {
    /**
     * Project name
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Project status
     */
    status: {
      type: Boolean,
      required: true,
    },
  },
  /**
   * Methods for processing activities
   */
  methods: {
    /**
     * Function for opening project in a browser
     */
    openProject(): void {
      if (!this.name) {
        return;
      } else {
        openUrl('https://' + this.name);
      }
    },
  }
});
</script>

<style>

.project {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-second);

    &--clickable {
      cursor: pointer;
    }

  &__status {
    position: relative;
    width: 4px;
    height: 4px;
    margin-left: 5px;
    border-radius: 2px;
    top: 2px;
  }

  &--status-warning {
    color: var(--color-text-warning);
  }

  &--status-warning &__status {
    background-color: var(--color-bg-warning);
    box-shadow: 0 0 4px 2px var(--color-box-shadow-warning);
  }

  &--status-ok &__status {
    background-color: var(--color-bg-success);
  }
}

</style>
