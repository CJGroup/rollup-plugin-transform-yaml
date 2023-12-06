# rollup-plugin-transform-yaml
A [rollup.js](https://rollupjs.org) plugin that can transform yaml files in a certain directory into json files.

## Preface
I have worked on [Koishi.js](https://koishi.chat) for a long time. In its latest versions, it added a useful feature called [i18n files](https://koishi.chat/zh-CN/guide/i18n/translation.html). It allows plugin developers to decouple their translations of text in commands from the code.   
Usually, Koishi.js regulate that i18n files is written in yaml. However, Node.js does not support yaml natively. It can only be directly imported after being converted to json. Offical build tools [yakumo](https://github.com/shigma/yakumo) support tranform yaml i18n files into json, but I don't like use it. Instead, I prefer to use rollup.js to build my plugins.   
Yet, rollup's offical yaml plugin [@rollup/plugin-yaml](https://github.com/rollup/plugins/tree/master/packages/yaml/#readme) can only bundle yaml files into the js file it generated. And at the same time it cannot identify the CommonJS require() function (As I use TypeScript and [rollup-plugin-ts](https://github.com/wessberg/rollup-plugin-ts), it may cannot correctly import the yaml file through require()). So I write this plugin to solve this problem.

## Installation

### npm
```bash
npm install --save-dev rollup-plugin-transform-yaml
```

### yarn
```bash
yarn add -D rollup-plugin-transform-yaml
```

### pnpm
```bash
pnpm add -D rollup-plugin-transform-yaml
```

## Usage
Create a `rollup.config.js` configuration file and then import the plugin:
```js
// rollup.config.js
import yaml from 'rollup-plugin-transform-yaml';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    yaml()
  ]
}
```
Then call `rollup` either via the CLI or the API.  
If you have a directory structure like this:
```
.
├── lib
├── package.json
├── rollup.config.js
└── src
    ├── index.js
    └── locales
        ├── en-US.yaml
        └── zh-CN.yaml
```
After building, you will get a directory structure like this:
```
.
├── lib
│   └── locales
│       ├── en-US.json
│       └── zh-CN.json
├── package.json
├── rollup.config.js
└── src
    ├── index.js
    └── locales
        ├── en-US.yaml
        └── zh-CN.yaml
```

## Options
### `dir`
Type: `string`  
Default: `'src/locales'`

The directory where the yaml files are located. Only relative paths are supported.