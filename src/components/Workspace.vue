<template>
  <div>
    <WorkspaceHeader
      :name="name"
      :image="image"
    />
    <Server
      v-for="(server, index) in servers"
      :key="index"
      :server="server"
      :hotkey="index+1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import WorkspaceHeader from '@/components/WorkspaceHeader.vue';
import Server from '@/components/Server.vue';
import IServer from '@/types/server';

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
      type: Array as PropType<Array<IServer>>,
      required: true,
    },
  },
});
</script>
