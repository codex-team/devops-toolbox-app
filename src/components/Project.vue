<template>
  <div
    class="project"
    :class="'project--status-'+(status ? 'ok' : 'warning')"
  >
    {{ name }}
    <div class="project__status" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
});
</script>

<style>

.project {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 500;

  &__status  {
    width: 4px;
    height: 4px;
    margin-left: 5px;
    border-radius: 2px;
  }

  &--status-warning {
    color: var(--color-text-warning);
  }

  &--status-ok {
    color: var(--color-text-second);
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
