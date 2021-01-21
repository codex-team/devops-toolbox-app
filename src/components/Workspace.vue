<template>
  <div>
    <WorkspaceHeader
      :name="name"
      :image="image"
    />
    <Server
      v-for="(server, index) in servers"
      :key="server.name"
      :name="server.name"
      :services="server.services"
      :hotkey="index+1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WorkspaceHeader from '@/components/WorkspaceHeader.vue';
import Server from '@/components/Server.vue';

export default defineComponent({
  name: 'Workspace',
  components: {
    WorkspaceHeader,
    Server,
  },
  props: {
    /**
     * Workspace name
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Workspace image
     */
    image: {
      type: String,
      required: true,
    },
    /**
     * Workspace servers
     */
    servers: {
      type: Object,
      required: true,
    },
  },
});
</script>
