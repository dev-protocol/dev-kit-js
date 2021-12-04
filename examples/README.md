# dev-kit-js examples

## Usage

`package.json`

```
{
  "name": "devkit-examples-sandbox",
  "version": "0.0.1",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@devprotocol/dev-kit": "^5.8.1",
    "ethers": "^5.5.2"
  }
}
```

copy the script file you want to run into index.js.
Then `yarn install` to prepare for execution.

```
$ cp xxx.js index.js
$ yarn install
$ tree -L 1
.
├── index.js
├── node_modules
├── package.json
└── yarn.lock
```

run example script (with local ethereum node. like this `http://localhost:8545`):

```
$ yarn start
```

run example script (with infura)
```
$ WEB3_PROVIDER_URL=https://mainnet.infura.io/v3/xxxx yarn start
```
