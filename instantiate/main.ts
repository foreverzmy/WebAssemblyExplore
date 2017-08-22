///<reference path="../webassembly.d.ts" />

import * as fs from 'fs';

const path = './addOne.wasm';
const buffer = fs.readFileSync(path);

const valid = WebAssembly.validate(buffer);
console.log(valid);

const importObject = {
  env: {
    addOne: function (arg) {
      return arg + 1;
    }
  }
};

WebAssembly.instantiate(buffer, importObject)
  .then((mod: any) => {
    const result = mod.instance.exports.add(4, 5);
    console.log(result);
  })