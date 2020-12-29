<template>
  <div class="container">
    <WorkspaceHeader
      :name="name"
      :image="image"
    />
    <Server
      v-for="(server, index) in servers"
      :key="server.name"
      :name="server.name"
      :projects="server.projects"
      :hotkey="index+1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Server from '@/components/Server.vue';
import WorkspaceHeader from '@/components/WorkspaceHeader.vue';
// eslint-disable-next-line no-unused-vars
import { transport } from '@/background';
// eslint-disable-next-line no-unused-vars
import { logger } from '@/utils/logger';

export default defineComponent({
  name: 'App',
  components: {
    WorkspaceHeader,
    Server,
  },
  data() {
    return {
      name: 'CodeX',
      image: 'https://avatars1.githubusercontent.com/u/16060815?s=60&v=4',
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
  // mounted() {
  //   try {
  //     this.getWorkspaces();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },
  // methods: {
  //   getWorkspaces: function () {
  //     try {
  //       transport.send('get-workspaces', {}).then((response) => {
  //         console.log(response);
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  // },
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
