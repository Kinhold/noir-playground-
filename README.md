# Noir Playground

## Status: minimal browser compiler prototype

This repository contains a small browser UI that compiles one in-memory Noir
program with `@noir-lang/noir_wasm`.

It does **not** run circuit tests, calculate a witness, generate or verify a
proof, manage dependencies, persist projects, or provide a security audit.
Compiler success only means the source was accepted by the bundled compiler.

## Develop and check

Node.js 22.12 or newer is required by the current Vite toolchain.

```sh
npm ci
npm run dev
```

Before publishing a change:

```sh
npm test
npm run build
```

`npm test` is a compile-action UI smoke test with a stub compiler. `npm run
build` bundles the real Noir WASM compiler and verifies the browser import
path. The generated static site is written to `dist/`.

## Repository hygiene

Dependencies are described by `package.json` and locked in
`package-lock.json`; `node_modules/` is intentionally ignored and must not be
committed.

## Prototype constraints

- Source remains in the browser, but loading the site and its dependencies is
  still subject to the hosting environment.
- Large or hostile source can consume significant browser CPU and memory.
- The UI currently supports a single `src/main.nr` file with no dependencies.
- The pinned Noir beta compiler may not accept programs written for other Noir
  releases.
