# devops-toolbox-app

Tray app for checking health status of your servers

## Develop

Install all dependencies

`yarn`

Run the app locally

`yarn dev`

## Logs

You can find log files in the application supports directory. One log file per day.

MacOS: `~/Library/Application\ Support/DevOps\ Toolbox/logs/`
Win: `...`
Linux: `...`

## Build 

To package the application for distribution locally you need to call only one command:

`yarn build`

#### Steps scheme description

- `yarn build` — build the app 
  - `yarn electron:prebuild` — prepare the app for building
    - `yarn electron:icons-gen`— generate icons collection 
      - `yarn electron:icons-gen:postrun` — get a few icons and remove the rest 
  - `yarn electron:build` — build a dist app 

## Release

To emit release action, push changes and with a new tag.

1. Make your changes.
2. When you need to bump version, use `yarn version (--patch|--minor|--major)`.

Version will be bumped, and a new tag with this version will be created.

`postversion` command automatically pushes changes and tags to GitHub.

Action [release.yml](./.github/workflows/release.yml) will build and create a new release draft in `Releases` page.

3. Fill the release name and description then `publish` it.

You're rock!

Now restart your desktop app or wait until it will check for updates itself.
