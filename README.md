# devops-toolbox-app

Tray app for checking health status of your servers

## Develop

Install all dependencies

`yarn`

Run the app locally

`yarn dev`

### Build

To package the application for distribution you need to call:

`yarn build:app`

Steps scheme description: 

- `yarn build:app` — build the app 
  - `yarn electron:icons-gen`— generate icons collection 
    - `yarn electron:icons-gen:postrun` — get a few icons and remove the rest 
  - `yarn electron:build` — build a dist app 
