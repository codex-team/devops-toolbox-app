<template>
  <div>
    <Project
      v-for="project in projects"
      :key="project.name"
      :name="project.serverName"
      :status="project.status"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Project from '@/components/Project.vue';

export default defineComponent({
  name: 'Service',
  components: {
    Project,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
    },
  },
});
</script>
