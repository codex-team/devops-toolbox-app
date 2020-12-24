# devops-toolbox-app

Tray app for checking health status of your servers

## Develop

Install all dependencies

`yarn`

Run the app locally

`yarn dev`

### Build

To package the application for distribution you need to call only one command:

`yarn build`

#### Steps scheme description

- `yarn build` — build the app 
  - `yarn electron:prebuild` — prepare the app for building
    - `yarn electron:icons-gen`— generate icons collection 
      - `yarn electron:icons-gen:postrun` — get a few icons and remove the rest 
  - `yarn electron:build` — build a dist app 
