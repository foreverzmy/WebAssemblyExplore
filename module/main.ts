///<reference path="../webassembly.d.ts" />
import * as fs from 'fs';

const path = './addOne.wasm';
const buffer = fs.readFileSync(path);

const mod = new WebAssembly.Module(buffer);

console.log(WebAssembly.Module.exports(mod));
console.log(WebAssembly.Module.imports(mod));
console.log(WebAssembly.Module.customSections(mod, 'add'))

const importObject = {
  env: {
    addOne: function (arg) {
      return arg + 1;
    }
  }
};

WebAssembly.instantiate(mod, importObject)
  .then((instance: any) => {
    const result = instance.exports.add(4, 5);
    console.log(result);
  });
