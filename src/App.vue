<template>
  <div class="container">
    <Workspace
      v-for="workspace in actualWorkspaces"
      :key="workspace.name"
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
      name: 'CodeX',
      image: 'https://avatars1.githubusercontent.com/u/16060815?s=60&v=4',
      isAuth: this.$store.state.isAuth,
      servers: [
        {
          name: 'Centaur',
          projects: [
            {
              name: 'codex.so',
              status: true,
            },
            {
              name: 'editorjs.io',
              status: true,
            },
            {
              name: 'stage1.codex.so',
              status: false,
            },
          ],
        },
        {
          name: 'Neptune',
          projects: [
            {
              name: 'api.notes.codex.so',
              status: true,
            },
            {
              name: 'media.codex.so',
              status: true,
            },
            {
              name: 'featmap.codex.so',
              status: true,
            },
          ],
        },
        {
          name: 'Hawk Workers',
          projects: [
            {
              name: 'Grouper',
              status: true,
            },
            {
              name: 'Source Map Worker',
              status: true,
            },
          ],
        },
      ],
    };
  },
  computed: {
    actualWorkspaces(): IWorkspace[] {
      return this.$store.state.workspaces;
    },
  },
  mounted() {
    ipcRenderer.on('successful-authorization', (event, data) => {
      this.$store.commit('workspacesUpdate', data);
    });

    ipcRenderer.on('workspace-updated', (event, data) => {
      this.$store.commit('workspaceUpdate', data);
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
  background: rgba(31, 59, 88, 0.78)
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
