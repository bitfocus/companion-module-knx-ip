# KNX/IP Interface - Dev-Docs

## Getting Started

- install `node` and `yarn`
- clone repo into the `module-local-dev` folder of a companion installation
- enter the `companion-module-knxip` folder
- run `yarn install` to install the dev-dependencies
- run `yarn dev` to start the hot-reload typescript-compiler
- in another terminal, start the companion in dev-mode by accessing the companion directory and running `yarn dev`

## Unit-Tests

- run `yarn test`
- To add more Tests, just create `.spec.ts` files
- See https://jestjs.io/ for more documentation

Changes in the Module-Code are compiled on save and trigger a companion reload.

## Production Build

- run `yarn build && yarn pack` to create a .tgz package or
- run `yarn build && yarn publish` to publish to the registry
