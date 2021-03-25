<template>
  <div class="container">
    <Workspace
      v-for="workspace in getActualWorkspaces"
      :key="workspace._id"
      :name="workspace.name"
      :image="image"
      :servers="workspace.servers"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ipcRenderer } from 'electron';
import Workspace from '@/components/Workspace.vue';
import { Workspace as IWorkspace } from '@/types';

export default defineComponent({
  name: 'App',
  components: {
    Workspace,
  },
  data() {
    return {
      image: 'https://avatars1.githubusercontent.com/u/16060815?s=60&v=4',
    };
  },
  computed: {
    /**
     * Return actual user workspace list
     *
     * @returns - workspaces
     */
    getActualWorkspaces(): IWorkspace[] {
      return this.$store.state.workspaces;
    },
  },
  mounted() {
    ipcRenderer.on('workspaces-updated', (event, data) => {
      this.$store.commit('workspacesUpdate', data);
      ipcRenderer.send('shortcuts-update', data);
    });

    ipcRenderer.on('workspace-updated', (event, data) => {
      this.$store.commit('workspaceUpdate', data);
      ipcRenderer.send('shortcuts-update', data);
    });
  },
});
</script>

<style>
@import './styles/variables.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  -webkit-font-smoothing: antialiased;
}

#app {
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
  object-fit: contain;
  background: var(--color-bg-app);
  border-radius: 14px;
}

#app::-webkit-scrollbar {
  display: none;
}

.container {
  height: 100%;
  padding-left: 15px;
  padding-right: 17px;
}

</style>
