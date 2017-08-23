///<reference path="../webassembly.d.ts" />
import * as fs from 'fs';

const path = './addOne.wasm';
const buffer = fs.readFileSync(path);

const importObject = {
  env: {
    addOne: function (arg) {
      return arg + 1;
    }
  }
};

const mod = new WebAssembly.Module(buffer);

const instance = new WebAssembly.Instance(mod, importObject);
// ->Instance { exports: { add: [Function: 1], memory: Memory {} } }

const result = instance.exports.add(4, 5); // ->10
