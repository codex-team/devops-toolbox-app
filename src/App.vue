<template>
  <div>
    <h1>devops-toolbox-app</h1>
    <button id="getWorkspaces" @click="getWorkspaces">Get Workspaces</button>
    <button id="authorization" @click="logIn">Log In</button>
    <div id="workspaces"></div>
  </div>
</template>

<script lang="ts">
import Transport from '@/utils/protocol/transport';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      transport: new Transport(),
    };
  },
  created() {
  },
  methods: {
    getWorkspaces() {
      this.transport.send('getWorkspaces', {
        authToken: 1,
      });
    },
    logIn() {
      this.transport.send('authorization', {
        authToken: 1,
      });
    },
  },
});

</script>
