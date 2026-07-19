import { compileSource } from './compiler.js';
import { createCompileHandler } from './ui.js';

const codeBox = document.querySelector('#code');
const output = document.querySelector('#output');
const compileButton = document.querySelector('#compile');

const handleCompile = createCompileHandler({
  compileSource,
  codeBox,
  output,
  compileButton,
});

compileButton.addEventListener('click', handleCompile);
