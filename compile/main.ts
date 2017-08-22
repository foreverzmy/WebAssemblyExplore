///<reference path="../webassembly.d.ts" />

import * as fs from 'fs';
import { EventEmitter } from 'events';

const path = './addOne.wasm';
const buffer = fs.readFileSync(path);

const emitter = new EventEmitter();

WebAssembly.compile(buffer).then(mod => emitter.emit('mod', mod));

const importObject = {
  env: {
    addOne: function (arg) {
      return arg + 1;
    }
  }
};

emitter.addListener('mod', mod => {
  console.log('module received from main thread');
  WebAssembly.instantiate(mod, importObject)
    .then((instance: any) => {
      const result = instance.exports.add(4, 5);
      console.log(result);
    });
  const exports = WebAssembly.Module.exports(mod);
})
