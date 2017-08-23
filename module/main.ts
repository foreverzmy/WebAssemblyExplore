///<reference path="../webassembly.d.ts" />
import * as fs from 'fs';

const path = './addOne.wasm';
const buffer = fs.readFileSync(path);

const mod = new WebAssembly.Module(buffer);

WebAssembly.Module.exports(mod); // ->[{ name: 'memory', kind: 'memory' }, { name: 'add', kind: 'function' }]
const imp = WebAssembly.Module.imports(mod); // ->[ { module: 'env', name: 'addOne', kind: 'function' } ]
const cus = WebAssembly.Module.customSections(mod, 'name'); // ->[]

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
    console.log(result); // >10
  });
