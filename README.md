# Invent IMDb
## Table of Contents
  1. [Quick Start](#quick-start)
  1. [Built With](#built-with)
  1. [Directory Structure](#directory-structure)
  1. [Glossary](#glossary)
## Quick Start

- Clone repo
```bash
    # clone the repo
    $ git clone git@github.com:kadirosmanust/invent-imdb.git

    # go into app directory
    $ cd invent-imdb
```

- Package installation
```bash
    # install app dependencies with yarn
    $ yarn
```
- Husky setup
```bash
    $ yarn prepare 
```

#### Environment
- Create `.env` file
```bash
    $ touch .env
```

- Add environment variables into `.env` file
```bash
   VITE_BASE_URL=http://www.omdbapi.com/
   VITE_API_KEY=f3fd1523
```
#### Usage
- Start
```bash
    # start application with hot reload at http://localhost:5173/
    $ yarn dev
```
#### Build
- Run `build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
    # build for production with minification
    $ yarn build
```
## Built With
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)

## Directory Structure
```
Invent-imdb
├── src/                #project root
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── containers/
│   ├── pages/
│   ├── store/
│   ├── types/
│   ├── styles/
│   ├── App.tsx
│   ├── App.scss
│   ├── index.css
│   ├── main.tsx
│
└── package.json
```
## Glossary
- `.eslintrc.cjs`: Sets the default lint rules for quality of codebase.

- `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

- `package.json`: Sets project's package dependencies and scripts etc. for managing project environment

- `.prettierrc`: Sets the default standarts for making your codebase beautiful